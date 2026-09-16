import {Router} from 'express';
import Cache from "../cache.js";

const router = Router();

router.get('/data', async (req, res) => {
    if (!["points", "wins", "percent"].includes(req.query.sort)) {
        res.status(400);
    }
    if (!["true", "false", ""].includes(req.query.historical)) {
        res.status(400);
    }
    let cacheSource = req.query.historical === "true" ? Cache["historical"] : Cache["current"];

    res.json({
        "ladder": cacheSource.data.ladder[req.query.sort],
        "games": cacheSource.data.games,
        "byes": cacheSource.data.byes,
        "year": cacheSource.data.season,
        "round": cacheSource.data.round
    });
});

export default router;