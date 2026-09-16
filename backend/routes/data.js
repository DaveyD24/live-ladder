import {Router} from 'express';
import Cache from "../classes/Cache.js";
import ValidationError from '../classes/ValidationError.js';

const router = Router();

router.get('/data', async (req, res, next) => {
    if (!["points", "wins", "percent"].includes(req.query.sort)) {
        const error = new ValidationError("Ladder is only sortable by points, wins or percent", 400);
        return next(error);
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