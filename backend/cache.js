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
export function clear() {
    data.ladder = [];
    data.games = [];
    data.byes = [];
}
export function hoistLiveGame() {
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
export function setRoundAndYear(round, year) {
    data.round = round;
    data.year = year;
}