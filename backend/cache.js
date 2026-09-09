import { halfTimeScores } from "./data/scores.js";
//TODO: Refactor to class?

const FIRST_VALID_HALFTIME_YEAR = 2013;

export let data = {
    ladder: {
        points: [],
        wins: [],
        percent: []
    },      
    games: [],
    byes: [],
    year: 0,
    round: 0
}
export let historical_snapshot = {
    ladder: {
        points: [],
        wins: [],
        percent: []
    },      
    games: [],
    byes: [],
    year: 0,
    round: 0
}

export function clear(data) {
    data.ladder = [];
    data.games = [];
    data.byes = [];
}

export function hoistLiveGame(data) {
    let liveGameIndex = -1;
    for (let i = 0; i < data.games.length; i++) {
        const game = data.games[i];
        if (game.matchState !== "COMPLETED" && game.matchState !== "UPCOMING") {
            liveGameIndex = i;
            break;
        }
    }
    if (liveGameIndex !== -1) {
        data.games.unshift(data.games.splice(liveGameIndex, 1)[0]);
    }
}

export function setRoundAndYear(data, round, year) {
    data.round = round;
    data.year = year;
}

export function rewriteGameHistory() {
    if (historical_snapshot.year < FIRST_VALID_HALFTIME_YEAR) {
        return;
    }
    const stop = Math.floor(Math.random() * (historical_snapshot.games.length - 1)) + 1;

    for (let i = 0; i < historical_snapshot.games.length; i++) {
        const game = historical_snapshot.games[i];
        if (i === stop) {
            game.matchState = "HALFTIME";
            game.homeTeam.score = parseInt(halfTimeScores[historical_snapshot.year][historical_snapshot.round][stop].home);
            game.awayTeam.score = parseInt(halfTimeScores[historical_snapshot.year][historical_snapshot.round][stop].away);
        }
        if (i > stop) {
            game.matchState = "UPCOMING";
        }
    }
}