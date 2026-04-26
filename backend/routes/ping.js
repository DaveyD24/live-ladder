import {Router} from 'express';

const router = Router();
export let clientLastSeen = Date.now();

router.get('/ping', (req, res) => {
    clientLastSeen = Date.now();
});

export default router;