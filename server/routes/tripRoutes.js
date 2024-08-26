import express from 'express';
import {
    getTrips,
    getTrip,
    createTripWithDays,
} from '../controllers/tripController.js';

const router = express.Router();

router.route('/trips')
    .post(createTripWithDays)
    .get(getTrips)

router.route('/trips/:tripSlug').get(getTrip);

export default router