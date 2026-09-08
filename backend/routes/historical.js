import {Router} from 'express';
import { updateData } from '../server.js';

const router = Router();

export let isHistorical = false;
let historicalRound;
let historicalYear;

function randomYear(minYear, maxYear) {
    return Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);
}

function randomRound(minRound, maxRound) {
    return Math.floor(Math.random() * (maxRound - minRound + 1) + minRound);
}

router.get('/historical', (req, res) => {
    isHistorical = true;
    historicalYear = randomYear(2005, 2025);
    historicalRound = randomRound(1, 24);
    updateData(historicalRound, historicalYear);
});
export default router;