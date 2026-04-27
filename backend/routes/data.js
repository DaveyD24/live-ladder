import {Router} from 'express';
import * as Cache from "../cache.js";

const router = Router();

router.get('/data', (req, res) => {
    res.json({
        "ladder": Cache.data.ladder[req.query.sort],
        "games": Cache.data.games,
        "byes": Cache.data.byes
    });
});

export default router;