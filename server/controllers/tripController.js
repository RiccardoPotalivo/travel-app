import Trip from '../models/Trip.js';
import Day from '../models/Day.js';

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
        const trip = await Trip.findById(req.params.id).populate('days');
        console.log('trip back', trip);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new trip with days
export const createTripWithDays = async (req, res) => {
    try {
        const { title, description, startDate, endDate } = req.body;

        // Create and save the new trip
        const newTrip = await Trip.create({
            title,
            description,
            startDate,
            endDate
        });

        // Calculate number of days between start and end dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        // Create an array of days
        const days = [];

        for (let i = 0; i < dayCount; i++) {
            const dayDate = new Date(start);
            dayDate.setDate(start.getDate() + i);

            // Create and save each day
            const day = await Day.create({
                title: `${i + 1}° Giorno`,
                date: dayDate,
                trip: newTrip._id
            });

            days.push(day._id); // Push the ID of the created day into the days array
        }

        // Update the trip with the array of day IDs and save
        newTrip.days = days;
        await newTrip.save();

        // Populate the trip with the days and return the result
        const tripWithDays = await Trip.findById(newTrip._id).populate('days');
        res.status(201).json(tripWithDays);

    } catch (error) {
        res.status(500).json({ message: "Error creating trip with days", error });
    }
};