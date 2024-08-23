import axios from "axios";

const API_URL = "http://localhost:5000/api/trips";

// Fetch a single day
export const fetchDay = async (tripSlug, daySlug) => {
    try {
        // console.log(`Fetching day with tripSlug: ${tripSlug} and daySlug: ${daySlug}`);
        const response = await axios.get(`${API_URL}/${tripSlug}/days/${daySlug}`);
        // console.log('Fetched day:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching day with tripSlug ${tripSlug} and daySlug ${daySlug}:`, error.response?.data || error.message);
        throw error;
    }
}