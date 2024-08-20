import Trip from '../models/Trip.js';

// Create a new trip
export const createTrip = async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all trips
export const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        // const trips = await Trip.find().populate('days');
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};