import express from 'express';
import { 
    createStop,
    getStop
 } from '../controllers/stopController.js';

const router = express.Router();

router.route('/trips/:tripSlug/days/:daySlug/stops').post(createStop);
router.route('/trips/:tripSlug/days/:daySlug/stops/:stopSlug').get(getStop);

export default router