import axios from "axios";

const API_URL = "http://localhost:5000/api/trips";

// Fetch all trips
export const fetchTrips = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

// Fetch a single trip
export const fetchTrip = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching trip", error);
        throw error;
    }
}

// Create a new trip
export const createTrip = async (tripData) => {
    const response = await axios.post(API_URL, tripData);
    return response.data;
}