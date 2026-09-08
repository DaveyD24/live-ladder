import {Router} from 'express';
import * as Cache from "../cache.js";

const router = Router();

router.get('/data', (req, res) => {
    if (["points", "wins", "percent"].includes(req.query.sort)) {

    }
    res.json({
        "ladder": Cache.data.ladder[req.query.sort],
        "games": Cache.data.games,
        "byes": Cache.data.byes,
        "year": Cache.data.year,
        "round": Cache.data.round
    });
});

export default router;