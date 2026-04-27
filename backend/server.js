import express from 'express';
import cors from 'cors';

import dataRoute from "./routes/data.js";
import pingRoute from "./routes/ping.js";
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

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    await updateData();

    setInterval(async () => {
        if (!ActiveClient) {
            console.log("No active client. API call aborted");
            return;
        }
        await updateData();
    }, 30000);
})

async function updateData() {
    Cache.clear();
    const ladderData = await fetchLadderForRound(CurrentRound()-1)
    const roundData = await fetchGamesForRound(CurrentRound());
    Cache.data.ladder = generateLadder(ladderData, roundData);
    roundData.games.forEach(game => { Cache.data.games.push(game); });
    roundData.byes.forEach(bye => { Cache.data.byes.push(bye); });
}

function ActiveClient() {
    return (Date.now() - clientLastSeen) < 10000;
}