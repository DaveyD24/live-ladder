import { teamHandleDictionary } from "../static/handles.js";

export function parseRound(json) {
    let games = [];
    let byes = [];
    for (const fixture of json["fixtures"]) {
        const homeKey = fixture["homeTeam"]["nickName"]
        const awayKey = fixture["awayTeam"]["nickName"]
        games.push({
            round: fixture["roundTitle"].toString().split(" ")[1],
            homeTeam: {
                localName: teamHandleDictionary[homeKey]["prefix"],
                teamName: homeKey === "Wests Tigers" ? "Tigers" : homeKey,
                threeLetterCode: teamHandleDictionary[homeKey]["three-letter-code"],
                score: fixture["homeTeam"]["score"] ? fixture["homeTeam"]["score"] : 0
            },
            awayTeam: {
                localName: teamHandleDictionary[awayKey]["prefix"],
                teamName: awayKey === "Wests Tigers" ? "Tigers" : awayKey,
                threeLetterCode: teamHandleDictionary[awayKey]["three-letter-code"],
                score: fixture["awayTeam"]["score"] ? fixture["awayTeam"]["score"] : 0
            },
            kickoff: DeconstructKickOffLong(fixture["clock"]["kickOffTimeLong"]),
            progress: {
                minutes: fixture["clock"]["gameTime"].split(":")[0],
                seconds: fixture["clock"]["gameTime"].split(":")[1]
            },
            stadium: fixture["venue"],
            matchState: DetermineMatchState({ minutes: fixture["clock"]["gameTime"].split(":")[0], seconds: fixture["clock"]["gameTime"].split(":")[1]}),
            summary: ""
        });
    }
    if (json["byes"]) {
        for (const bye of json["byes"]) {
            const teamKey = bye["teamNickName"];
            byes.push({
                round: bye["roundTitle"].toString().split(" ")[1],
                team: {
                    localName: teamHandleDictionary[teamKey]["prefix"],
                    teamName: teamKey === "Wests Tigers" ? "Tigers" : teamKey
                }
            });
        }
    }

    return {
        "games": games,
        "byes": byes
    };
}

export function parseLadder(json) {
    let teams = []
    for (const position of json["positions"]) {
        const teamKey = position["teamNickname"];
        teams.push({
            localName: teamHandleDictionary[teamKey]["prefix"],
            teamName: teamKey === "Wests Tigers" ? "Tigers" : teamKey,
            shorthand: teamHandleDictionary[teamKey]["shorthand"],
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
    if (parseInt(minutes) === 0 && parseInt(seconds) === 0) { return "UPCOMING"; }
    else if (parseInt(minutes) >= 80 && parseInt(seconds) >= 40) { return "GOLDENPOINT"; }
    else if (parseInt(minutes) === 40 && parseInt(seconds) <= 40) { return "HALFTIME"; }
    else if (parseInt(minutes) < 80) { return "PROGRESS"; }
    else { return "COMPLETED"; }
}