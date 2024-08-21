import Trip from '../models/Trip.js';

// Get all trips
export const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        // const trips = await Trip.find().populate('days');
        res.status(200).json(trips);
    } catch (error) {
        next.error(500).json({ message: error.message });
    }
};

// Get a single trip
export const getTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new trip
export const createTrip = async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};