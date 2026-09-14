import * as JSONParser from "./parseJson.js";

const BASE_URL = "https://www.nrl.com";
const COMPETITION_CODE = 111;

export async function fetchGamesForRound(roundNo, year) {
    let results = {games: [], byes: []};
    const path = `${BASE_URL}/draw//data?competition=${COMPETITION_CODE}&round=${roundNo}&season=${year}`;
    await fetch(path)
        .then(res => res.json())
        .then(roundData => {
            results = JSONParser.parseRound(roundData);
        });
    return results;
}

export async function fetchLadderForRound(roundNo, year) {
    let teams = { teams: [] };
    const path = `${BASE_URL}/ladder//data?competition=${COMPETITION_CODE}&round=${roundNo}&season=${year}`;
    await fetch(path)
        .then(res => res.json())
        .then(ladderData => {
            teams = JSONParser.parseLadder(ladderData);
        });
    return teams;
}