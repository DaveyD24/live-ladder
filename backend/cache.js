import { halfTimeScores } from "./static/scores.js";
class Cache {
    static FIRST_VALID_HALFTIME_YEAR = 2013;

    constructor() {
        this.data = {
            ladder: {
                points: [],
                wins: [],
                percent: []
            },      
            games: [],
            byes: [],
            season: 0,
            round: 0
        }
    }

    clear() {
        this.data.ladder = {
            points: [],
            wins: [],
            percent: []
        }
        this.data.games = []
        this.data.byes = []
    }

    hoistLiveGame() {
        let liveGameIndex = -1;
        for (let i = 0; i < this.data.games.length; i++) {
            const game = this.data.games[i];
            if (game.matchState !== "COMPLETED" && game.matchState !== "UPCOMING") {
                liveGameIndex = i;
                break;
            }
        }
        if (liveGameIndex !== -1) {
            this.data.games.unshift(this.data.games.splice(liveGameIndex, 1)[0]);
        }
    }

    setRoundAndSeason(round, season) {
        this.data.round = round;
        this.data.season = season;
    }

    rewriteGameHistory() {
        if (this.data.season < Cache.FIRST_VALID_HALFTIME_YEAR || this.data.season == 2026) {
            return;
        }
        const stop = Math.floor(Math.random() * (this.data.games.length - 1)) + 1;
        for (let i = 0; i < this.data.games.length; i++) {
            const game = this.data.games[i];
            if (i === stop) {
                game.matchState = "HALFTIME";
                const gameData = halfTimeScores[this.data.season][this.data.round][stop];
                game.homeTeam.score = parseInt(gameData.home);
                game.awayTeam.score = parseInt(gameData.away);
            }
            if (i > stop) {
                game.matchState = "UPCOMING";
            }
        }
    }

}

const caches = {
    current: new Cache(),
    historical: new Cache()
}
export default caches;