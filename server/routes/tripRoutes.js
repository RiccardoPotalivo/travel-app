import express from 'express';
import {
    createTrip,
    getTrips
} from '../controllers/tripController.js';

const router = express.Router();

router.route('/').post(createTrip).get(getTrips);

export default router;
