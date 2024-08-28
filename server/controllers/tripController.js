import generateSlug from '../utils/generateSlug.js';
import Trip from '../models/Trip.js';
import Day from '../models/Day.js';
import Stop from '../models/Stop.js';

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
        const trip = await Trip.findOne({ slug: req.params.tripSlug })
        .populate({
            path: 'days',
            populate: {
                path: 'stops',
                model: 'Stop'
            }
        });
        // console.log('trip back', trip);
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
        const { 
            title, 
            description, 
            startDate, 
            endDate 
        } = req.body;
        
        // Genera lo slug per il viaggio
        const slug = await generateSlug(title, Trip);
        // console.log("Generated slug:", slug);

        // Crea e salva il nuovo viaggio
        const newTrip = new Trip({
            title,
            description,
            startDate,
            endDate,
            slug
        });
        await newTrip.save();

        // Calcola il numero di giorni tra le date
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        // Crea un array di giorni
        const days = [];

        for (let i = 0; i < dayCount; i++) {
            const dayDate = new Date(start);
            dayDate.setDate(start.getDate() + i);

            // Crea e salva ogni giorno
            const daySlug = await generateSlug(`${newTrip.slug} Day ${i + 1}`, Day);
            const day = new Day({
                title: `Day ${i + 1}`,
                slug: daySlug,
                date: dayDate,
                trip: newTrip._id
            });

            await day.save();
            days.push(day._id); // Aggiungi l'ID del giorno creato all'array dei giorni
        }

        // Aggiorna il viaggio con l'array degli ID dei giorni e salva
        newTrip.days = days;
        await newTrip.save();

        // Popola il viaggio con i giorni e restituisci il risultato
        const tripWithDays = await Trip.findById(newTrip._id).populate('days');
        res.status(201).json(tripWithDays);

    } catch (error) {
        console.error("Error creating trip with days:", error);
        res.status(500).json({ message: "Error creating trip with days", error });
    }
};
