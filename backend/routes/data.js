import {Router} from 'express';
import Cache from "../classes/Cache.js";
import ValidationError from '../classes/ValidationError.js';

const router = Router();

router.get('/data', async (req, res, next) => {
    if (!["points", "wins", "percent"].includes(req.query.sort)) {
        const error = new ValidationError("Malformed sort parameter", 400);
        return next(error);
    }
    if (req.query.historical !== undefined && req.query.historical !== "enabled") {
        const error = new ValidationError("Malformed historical parameter", 400)
        return next(error);
    }
    let cacheSource = req.query.historical === "enabled" ? Cache["historical"] : Cache["current"];

    res.json({
        "ladder": cacheSource.data.ladder[req.query.sort],
        "games": cacheSource.data.games,
        "byes": cacheSource.data.byes,
        "year": cacheSource.data.season,
        "round": cacheSource.data.round
    });
});

export default router;