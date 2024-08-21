import express from 'express';
import {
    getTrips,
    getTrip,
    createTrip,
} from '../controllers/tripController.js';

const router = express.Router();


router.route('/')
    .post(createTrip)
    .get(getTrips)

router.route('/:id').get(getTrip);

export default router