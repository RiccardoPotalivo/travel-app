import express from 'express';
import {
    getTrips,
    getTrip,
    createTripWithDays,
} from '../controllers/tripController.js';

const router = express.Router();


router.route('/')
    .post(createTripWithDays)
    .get(getTrips)

router.route('/:id').get(getTrip);

export default router