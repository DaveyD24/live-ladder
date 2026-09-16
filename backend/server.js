import express from 'express';
import cors from 'cors';

import dataRoute from "./routes/data.js";
import pingRoute from "./routes/ping.js";
import {clientLastSeen} from "./routes/ping.js";
// import * as Cache from "./cache.js";
import {fetchGamesForRound, fetchLadderForRound} from "./services/apiFetcher.js";
import { CurrentRound, randomRound, randomSeason } from './services/roundService.js';
import { generateLadder } from "./services/ladderGenerator.js";
import Cache from "./classes/Cache.js";

const app = express();
const PORT = process.env.PORT || 3000;
const CURRENT_SEASON = 2026;
const REFRESH_RATE_SECONDS = 20;

const currentCache = Cache["current"]
const historicalCache = Cache["historical"];

app.use(express.json());
app.use(cors());

app.use('/', dataRoute);
app.use('/', pingRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message
    });
});

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    await updateData(currentCache, CurrentRound(), CURRENT_SEASON);
    await updateData(historicalCache, randomRound(1, 20), randomSeason(2003, CURRENT_SEASON - 1));
    setInterval(async () => {
        if (!ActiveClient) {
            console.log("No active client. API call aborted");
            return;
        }
        await updateData(currentCache, CurrentRound(), CURRENT_SEASON);
        await updateData(historicalCache, randomRound(1, 20), randomSeason(2003, CURRENT_SEASON - 1));
    }, REFRESH_RATE_SECONDS * 1000);
})

//Move this into the cache class?
async function updateData(cache, round, season) {
    cache.clear();

    const ladderData = await fetchLadderForRound(round - 1, season)
    const roundData = await fetchGamesForRound(round, season);
    
    roundData.games.forEach(game => { cache.data.games.push(game); });
    roundData.byes.forEach(bye => { cache.data.byes.push(bye); });
    
    cache.data.round = round;
    cache.data.season = season;

    cache.rewriteGameHistory();
    generateLadder(cache, ladderData, roundData);
    cache.hoistLiveGame();
}

function ActiveClient() {
    return (Date.now() - clientLastSeen) < 10000;
}