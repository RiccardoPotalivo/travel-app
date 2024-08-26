import Day from "../models/Day.js";
import Trip from "../models/Trip.js";

// Get a single day
export const getDay = async (req, res) => {
    const { tripSlug, daySlug } = req.params;

    try {
        // Find the trip using the slug
        const trip = await Trip.findOne({ slug: tripSlug });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Find the day using the slug
        const day = await Day.findOne({ slug: daySlug, trip: trip._id }).populate('stops');
        console.log(day)

        if (!day) {
            return res.status(404).json({ message: 'Day not found for this trip' });
        }

        res.status(200).json(day);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the day', error });
    }
};