import * as JSONParser from "./parseJson.js";

//TODO: Constants

export async function fetchGamesForRound(roundNo, year) {
    let results = {games: [], byes: []};
    const path = `https://www.nrl.com/draw//data?competition=111&round=${roundNo}&season=${year}`;
    await fetch(path)
        .then(res => res.json())
        .then(roundData => {
            results = JSONParser.parseRound(roundData);
        });
    return results;
}

export async function fetchLadderForRound(roundNo, year) {
    let teams = { teams: [] };
    const path = `https://www.nrl.com/ladder//data?competition=111&round=${roundNo}&season=${year}`;
    await fetch(path)
        .then(res => res.json())
        .then(ladderData => {
            teams = JSONParser.parseLadder(ladderData);
        })
        .catch(err => {
            //TODO: Consider if this is needed
            throw new Error(`Ladder does not exist for year ${year}`)
        });
    return teams;
}