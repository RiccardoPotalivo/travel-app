import generateSlug from '../utils/generateSlug.js';
import Trip from '../models/Trip.js';
import Day from '../models/Day.js';
import Stop from '../models/Stop.js';

// Get a single stop
export const getStop = async (req, res) => {
    const { tripSlug, daySlug, stopSlug } = req.params;

    try {
        // Find the trip using the slug
        const trip = await Trip.findOne({ slug: tripSlug });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Find the day using the slug
        const day = await Day.findOne({ slug: daySlug, trip: trip._id });

        if (!day) {
            return res.status(404).json({ message: 'Day not found for this trip' });
        }

        // Find the stop using the slug
        const stop = await Stop.findOne({ slug: stopSlug, day: day._id });

        if (!stop) {
            return res.status(404).json({ message: 'Stop not found for this day' });
        }

        res.status(200).json(stop);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the stop', error });
    }
};

// Create a new stop
export const createStop = async (req, res) => {
    try {
        const { daySlug } = req.params;
        const {
            name,
            position,
            arrivalTime,
            departureTime,
            images,
            food,
            curiosities
        } = req.body;

        const slug = await generateSlug(name, Stop);
        // console.log("Generated slug:", slug);

        // Find the day using the slug
        const day = await Day.findOne({ slug: daySlug });

        if (!day) {
            return res.status(404).json({ message: 'Day not found for this trip' });
        }

        const dayDate = new Date(day.date);

        const createDateTime = (dayDate, timeString) => {
            if (!timeString) return null;

            const [hours, minutes] = timeString.split(':').map(Number);
            const dateTime = new Date(dayDate);
            dateTime.setHours(hours);
            dateTime.setMinutes(minutes);
            dateTime.setSeconds(0);
            dateTime.setMilliseconds(0);

            return dateTime;
        }

        const arrivalDate = createDateTime(dayDate, arrivalTime);
        const departureDate = createDateTime(dayDate, departureTime);

        // Create a new stop
        const newStop = new Stop({
            name,
            slug,
            position,
            arrivalTime: arrivalDate,
            departureTime: departureDate,
            images,
            food,
            curiosities,
            day: day._id,
        });
        // console.log(newStop);

        await newStop.save();

        // Add the stop to the day
        day.stops.push(newStop._id);
        await day.save();

        res.status(201).json(newStop);
    } catch (error) {
        res.status(500).json({ message: 'Error creating the stop', error });
    }
}