import * as Cache from "../cache.js";

export function generateLadder(ladderData, roundData) {
    roundData.games.forEach(game => {

        const homeTeam = ladderData.teams.find(team => team.localName === game.homeTeam.localName);
        const awayTeam = ladderData.teams.find(team => team.localName === game.awayTeam.localName);

        if (game.matchState !== "COMPLETED" && game.matchState !== "UPCOMING") {
            homeTeam.isPlaying = true;
            awayTeam.isPlaying = true;
        }

        homeTeam.gamesPlayed++, awayTeam.gamesPlayed++;
        homeTeam.pointsFor += game.homeTeam.score;
        homeTeam.pointsAgainst += game.awayTeam.score;
        awayTeam.pointsFor += game.awayTeam.score;
        awayTeam.pointsAgainst += game.homeTeam.score;

        if (game.homeTeam.score === game.awayTeam.score) {
            homeTeam.draws++, awayTeam.draws++;
            homeTeam.points += 1, awayTeam.points += 1;
        }
        else if (game.homeTeam.score > game.awayTeam.score) {
            homeTeam.wins++
            homeTeam.differential = homeTeam.pointsFor - homeTeam.pointsAgainst;
            homeTeam.points += 2;

            awayTeam.losses++
            awayTeam.differential = awayTeam.pointsFor - awayTeam.pointsAgainst;
        }
        else {
            awayTeam.wins++
            awayTeam.differential = awayTeam.pointsFor - awayTeam.pointsAgainst;
            awayTeam.points += 2;

            homeTeam.losses++
            homeTeam.differential = homeTeam.pointsFor - homeTeam.pointsAgainst;
        }

        homeTeam.winPercent = (homeTeam.wins / homeTeam.gamesPlayed * 100).toFixed(0);
        awayTeam.winPercent = (awayTeam.wins / awayTeam.gamesPlayed * 100).toFixed(0);

    })
    roundData.byes.forEach(bye => {
        const team = ladderData.teams.find(team => team.localName === bye.team.localName);
        team.byes++;
        team.points += 2;
        team.winPercent = (team.wins / team.gamesPlayed * 100).toFixed(0);
    })
    
    Cache.data.ladder.points = structuredClone(ladderData)
    Cache.data.ladder.wins = structuredClone(ladderData);
    Cache.data.ladder.percent = structuredClone(ladderData)

    Cache.data.ladder.points.teams.sort((a,b) => (b.points - a.points) || (b.differential - a.differential) || (b.pointsAgainst + a.pointsAgainst));
    Cache.data.ladder.wins.teams.sort((a,b) => (b.wins - a.wins) || (b.differential - a.differential) || (b.pointsAgainst + a.pointsAgainst));
    Cache.data.ladder.percent.teams.sort((a,b) => (b.winPercent - a.winPercent) || (b.differential - a.differential) || (b.pointsAgainst + a.pointsAgainst));

}