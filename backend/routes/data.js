import {Router} from 'express';
import * as Cache from "../cache.js";

const router = Router();

router.get('/data', async (req, res) => {
    if (!["points", "wins", "percent"].includes(req.query.sort)) {
        res.status(404);
    }
    if (!["true", "false", ""].includes(req.query.historical)) {
        res.status(404);
    }
    let dataSource = req.query.historical === "true" ? Cache.historical_snapshot : Cache.data;

    res.json({
        "ladder": dataSource.ladder[req.query.sort],
        "games": dataSource.games,
        "byes": dataSource.byes,
        "year": dataSource.year,
        "round": dataSource.round
    });
});

export default router;