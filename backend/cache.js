export let data = {
    ladder: {
        points: [],
        wins: [],
        percent: []
    },      
    games: [],
    byes: []
}
export function clear() {
    data.ladder = [];
    data.games = [];
    data.byes = [];
}