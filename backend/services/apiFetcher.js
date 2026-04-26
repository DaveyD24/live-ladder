import * as JSONParser from "./parseJson.js";

export async function fetchGamesForRound(roundNo) {
    let results = {games: [], byes: []};
    const path = `https://www.nrl.com/draw//data?competition=111&round=${roundNo}&season=2026`;
    await fetch(path)
        .then(res => res.json())
        .then(roundData => {
            results = JSONParser.parseRound(roundData);
        });
    return results;
}

export async function fetchLadderForRound(roundNo) {
    let teams = { teams: [] };
    const path = `https://www.nrl.com/ladder//data?competition=111&round=${roundNo}&season=2026`;
    await fetch(path)
        .then(res => res.json())
        .then(ladderData => {
            teams = JSONParser.parseLadder(ladderData);
        })
    return teams;
}