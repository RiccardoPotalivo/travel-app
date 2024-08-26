import express from 'express';
import { createStop } from '../controllers/stopController.js';

const router = express.Router();

router.route('/trips/:tripSlug/days/:daySlug/stops').post(createStop);

export default router