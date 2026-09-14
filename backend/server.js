import express from 'express';
import cors from 'cors';

import dataRoute from "./routes/data.js";
import pingRoute from "./routes/ping.js";
import {clientLastSeen} from "./routes/ping.js";
import * as Cache from "./cache.js";
import {fetchGamesForRound, fetchLadderForRound} from "./services/apiFetcher.js";
import { CurrentRound, randomRound, randomSeason } from './services/roundService.js';
import { generateLadder } from "./services/ladderGenerator.js";

const app = express();
const PORT = process.env.PORT || 3000;
const CURRENT_SEASON = 2026;
const REFRESH_RATE_SECONDS = 20;

app.use(express.json());
app.use(cors());

app.use('/', dataRoute);
app.use('/', pingRoute);

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    await updateData(Cache.data, CurrentRound(), CURRENT_SEASON);
    await updateData(Cache.historical_snapshot, randomRound(1, 20), randomSeason(2003, CURRENT_SEASON - 1));
    setInterval(async () => {
        if (!ActiveClient) {
            console.log("No active client. API call aborted");
            return;
        }
        await updateData(Cache.data, CurrentRound(), CURRENT_SEASON);
        await updateData(Cache.historical_snapshot, randomRound(1, 20), randomSeason(2003, CURRENT_SEASON - 1));
    }, REFRESH_RATE_SECONDS * 1000);
})

//Move this into the cache class?
async function updateData(dataSource, round, season) {
    Cache.clear(dataSource);

    const ladderData = await fetchLadderForRound(round - 1, season)
    const roundData = await fetchGamesForRound(round, season);
    roundData.games.forEach(game => { dataSource.games.push(game); });
    roundData.byes.forEach(bye => { dataSource.byes.push(bye); });
    Cache.setRoundAndYear(dataSource, round, season);

    Cache.rewriteGameHistory();
    generateLadder(dataSource, ladderData, roundData);
    Cache.hoistLiveGame(dataSource);
}

function ActiveClient() {
    return (Date.now() - clientLastSeen) < 10000;
}