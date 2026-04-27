export function parseRound(json) {
    let games = [];
    let byes = [];
    for (const fixture of json["fixtures"]) {
        games.push({
            round: fixture["roundTitle"].toString().split(" ")[1],
            homeTeam: {
                localName: PrefixOf( fixture["homeTeam"]["nickName"]),
                teamName: fixture["homeTeam"]["nickName"] === "Wests Tigers" ? "Tigers" : fixture["homeTeam"]["nickName"],
                threeLetterCode: ThreeLetterCodeOf(fixture["homeTeam"]["nickName"]),
                score: fixture["homeTeam"]["score"] ? fixture["homeTeam"]["score"] : 0
            },
            awayTeam: {
                localName: PrefixOf( fixture["awayTeam"]["nickName"]),
                teamName: fixture["awayTeam"]["nickName"] === "Wests Tigers" ? "Tigers" : fixture["awayTeam"]["nickName"],
                threeLetterCode: ThreeLetterCodeOf(fixture["awayTeam"]["nickName"]),
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
    let teams = []
    for (const position of json["positions"]) {
        teams.push({
            localName: PrefixOf(position["teamNickname"]),
            teamName: position["teamNickname"] === "Wests Tigers" ? "Tigers" : position["teamNickname"],
            shorthand: ShortHandOf(position["teamNickname"]),
            gamesPlayed: position["stats"]["played"],
            wins: position["stats"]["wins"],
            draws: position["stats"]["drawn"],
            losses: position["stats"]["lost"],
            byes: position["stats"]["byes"],
            pointsFor: position["stats"]["points for"],
            pointsAgainst: position["stats"]["points against"],
            differential: position["stats"]["points difference"],
            winPercent: 0,
            points: position["stats"]["points"],
            isPlaying: false
        });
    }
    return {
        "teams": teams
    }
}

function PrefixOf(teamName) {
    switch (teamName) {
        case "Broncos" : return "Brisbane";
        case "Bulldogs" : return "Canterbury";
        case "Raiders" : return "Canberra";
        case "Sharks" : return "Cronulla";
        case "Titans" : return "Gold Coast";
        case "Sea Eagles" : return "Manly";
        case "Storm" : return "Melbourne";
        case "Warriors" : return "New Zealand";
        case "Knights" : return "Newcastle";
        case "Cowboys" : return "North QLD";
        case "Eels" : return "Parramatta";
        case "Panthers" : return "Penrith";
        case "Dragons" : return "St George";
        case "Rabbitohs" : return "South Sydney";
        case "Roosters" : return "Sydney";
        case "Dolphins" : return "Redcliffe";
        case "Wests Tigers" : return "Wests";
    }
}
function ThreeLetterCodeOf(teamName) {
    switch (teamName) {
        case "Broncos" : return "BRI";
        case "Bulldogs" : return "CBY";
        case "Raiders" : return "CAN";
        case "Sharks" : return "CRO";
        case "Titans" : return "GLD";
        case "Sea Eagles" : return "MAN";
        case "Storm" : return "MEL";
        case "Warriors" : return "NZD";
        case "Knights" : return "NEW";
        case "Cowboys" : return "NQL";
        case "Eels" : return "PAR";
        case "Panthers" : return "PEN";
        case "Dragons" : return "STG";
        case "Rabbitohs" : return "STH";
        case "Roosters" : return "SYD";
        case "Dolphins" : return "RED";
        case "Wests Tigers" : return "WST";
    }
}
function ShortHandOf(teamName) {
    switch (teamName) {
        case "Broncos" : return null;
        case "Bulldogs" : return null;
        case "Raiders" : return null;
        case "Sharks" : return null;
        case "Titans" : return "GLD COAST";
        case "Sea Eagles" : return null;
        case "Storm" : return null;
        case "Warriors" : return "NZ";
        case "Knights" : return null;
        case "Cowboys" : return "NQLD";
        case "Eels" : return null;
        case "Panthers" : return null;
        case "Dragons" : return "ST.GEORGE";
        case "Rabbitohs" : return "STH.SYD";
        case "Roosters" : return null;
        case "Dolphins" : return null;
        case "Wests Tigers" : return null;
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
    const states = ["UPCOMING", "GOLDENPOINT", "HALFTIME", "PROGRESS", "COMPLETED"];
    return states[Math.floor(Math.random()* states.length)];
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