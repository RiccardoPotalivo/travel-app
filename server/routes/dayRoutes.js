import express from 'express';
import { getDay } from '../controllers/dayController.js';

const router = express.Router();

router.route('/trips/:tripSlug/days/:daySlug').get(getDay);

export default router