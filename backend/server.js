import express from 'express';
import cors from 'cors';

import dataRoute from "./routes/data.js";
import pingRoute from "./routes/ping.js";
import historicalRoute from "./routes/historical.js";
import { isHistorical } from "./routes/historical.js";
import {clientLastSeen} from "./routes/ping.js";
import * as Cache from "./cache.js";
import {fetchGamesForRound, fetchLadderForRound} from "./services/apiFetcher.js";
import { CurrentRound } from './services/currentRound.js';
import { generateLadder } from "./services/ladderGenerator.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/', dataRoute);
app.use('/', pingRoute);
app.use('/', historicalRoute);

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    await updateData(CurrentRound(), 2026);
    setInterval(async () => {
        if (!ActiveClient) {
            console.log("No active client. API call aborted");
            return;
        }
        if (isHistorical) {
            return;
        }
        await updateData(CurrentRound(), 2026);
    }, 30000);
})

export async function updateData(round, year) {
    Cache.clear();
    const ladderData = await fetchLadderForRound(round-1, year)
    const roundData = await fetchGamesForRound(round, year);
    generateLadder(ladderData, roundData);
    roundData.games.forEach(game => { Cache.data.games.push(game); });
    roundData.byes.forEach(bye => { Cache.data.byes.push(bye); });
    Cache.hoistLiveGame();
    Cache.setRoundAndYear(round, year);
}

function ActiveClient() {
    return (Date.now() - clientLastSeen) < 10000;
}