export function parseRound(json) {
    let games = [];
    let byes = [];
    for (const fixture of json["fixtures"]) {
        games.push({
            round: fixture["roundTitle"].toString().split(" ")[1],
            isActive: fixture["matchMode"] === "Live",
            isCompleted: fixture["matchMode"] === "Post",
            homeTeam: {
                localName: PrefixOf( fixture["homeTeam"]["nickName"]),
                teamName: fixture["homeTeam"]["nickName"] === "Wests Tigers" ? "Tigers" : fixture["homeTeam"]["nickName"],
                score: fixture["homeTeam"]["score"] ? fixture["homeTeam"]["score"] : 0
            },
            awayTeam: {
                localName: PrefixOf( fixture["awayTeam"]["nickName"]),
                teamName: fixture["awayTeam"]["nickName"] === "Wests Tigers" ? "Tigers" : fixture["awayTeam"]["nickName"],
                score: fixture["awayTeam"]["score"] ? fixture["awayTeam"]["score"] : 0
            },
            kickoff: DeconstructKickOffLong(fixture["clock"]["kickOffTimeLong"]),
            progress: {
                minutes: fixture["clock"]["gameTime"].split(":")[0],
                seconds: fixture["clock"]["gameTime"].split(":")[1]
            },
            stadium: fixture["venue"],
            matchState: DetermineMatchState({ minutes: fixture["clock"]["gameTime"].split(":")[0], seconds: fixture["clock"]["gameTime"].split(":")[1]})
        });
    }
    for (const bye of json["byes"]) {
        byes.push({
            round: bye["roundTitle"].toString().split(" ")[1],
            team: {
                localName: PrefixOf( bye["teamNickName"]),
                teamName: bye["teamNickName"] === "Wests Tigers" ? "Tigers" : bye["teamNickName"]
            }
        });
    }
    return {
        "games": games,
        "byes": byes
    };
}

export function parseLadder(json) {
    
}

function PrefixOf(teamName) {
    switch (teamName) {
        case "Broncos" : return "Brisbane";
        case "Bulldogs" : return "Canterbury Bankstown";
        case "Raiders" : return "Canberra";
        case "Sharks" : return "Cronulla";
        case "Titans" : return "Gold Coast";
        case "Sea Eagles" : return "Manly Warringah";
        case "Storm" : return "Melbourne";
        case "Warriors" : return "New Zealand";
        case "Knights" : return "Newcastle";
        case "Cowboys" : return "North Queensland";
        case "Eels" : return "Parramatta";
        case "Panthers" : return "Penrith";
        case "Dragons" : return "St George Illawarra";
        case "Rabbitohs" : return "South Sydney";
        case "Roosters" : return "Sydney";
        case "Dolphins" : return "Redcliffe";
        case "Wests Tigers" : return "Wests";
    }
}
function DeconstructKickOffLong(kickOffLong) {
    const date = new Date(kickOffLong);
    const options = {timeZone : "Australia/Sydney"};

    const day = new Intl.DateTimeFormat("en-AU", { weekday: "long", ...options }).format(date);
    const dateOfMonth = new Intl.DateTimeFormat("en-AU", {day: "numeric", ...options}).format(date);
    const month = new Intl.DateTimeFormat("en-AU", { month: "long", ...options}).format(date);
    const time = new Intl.DateTimeFormat("en-AU", {hour: "2-digit", minute: "2-digit", hour12: false, ...options}).format(date);

    return {
        day: day,
        date: dateOfMonth,
        month: month,
        time: time
    };
}
function DetermineMatchState({minutes, seconds}) {
    if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
        return "UPCOMING";
    }
    else if (parseInt(minutes) >= 80 && parseInt(seconds) >= 40) {
        return "GOLDENPOINT";
    }
    else if (parseInt(minutes) === 40 && parseInt(seconds) <= 40) {
        return "HALFTIME";
    }
    else if (parseInt(minutes) < 80) {
        return "PROGRESS";
    }
    else {
        return "COMPLETED";
    }
}