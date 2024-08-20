import axios from "axios";

const API_URL = "http://localhost:5000/api/trips";

// Fetch all trips
export const fetchTrips = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

