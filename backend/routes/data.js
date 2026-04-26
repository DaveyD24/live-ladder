import {Router} from 'express';
import * as Cache from "../cache.js";

const router = Router();

router.get('/data', (req, res) => {
    res.json(Cache.data);
});

export default router;