import axios from "axios";

const API_URL = "http://localhost:5000/api/trips";

// Fetch all trips
export const fetchTrips = async () => {
    try {
        const response = await axios.get(API_URL);
        // console.log('Fetched trips:', response.data);
        return response.data;
    } catch (error) {
        // console.error("Error fetching trips:", error.response?.data || error.message);
        throw error;
    }
}

// Fetch a single trip
export const fetchTrip = async (slug) => {
    try {
        // console.log(`Fetching trip with slug: ${slug}`);
        const response = await axios.get(`${API_URL}/${slug}`);
        // console.log('Fetched trip:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching trip with slug ${slug}:`, error.response?.data || error.message);
        throw error;
    }
}

// Create a new trip
export const createTrip = async (tripData) => {
    try {
        const response = await axios.post(API_URL, tripData);
        // console.log('Trip created:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating trip:", error.response?.data || error.message);
        throw error;
    }
}