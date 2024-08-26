import axios from "axios";

const API_URL = "http://localhost:5000/api/trips";

// Fetch stops
// export const fetchStops = async (tripSlug) => {
//     try {
//         // console.log(`Fetching stops with tripSlug: ${tripSlug}`);
//         const response = await axios.get(`${API_URL}/${tripSlug}/days/${daySlug}/stops`);
//         // console.log('Fetched stops:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching stops with tripSlug ${tripSlug}:`, error.response?.data || error.message);
//         throw error;
//     }
// }

// Fetch a single stop
export const fetchStop = async (tripSlug, daySlug, stopSlug) => {
    try {
        // console.log(`Fetching stop with tripSlug: ${tripSlug}, daySlug: ${daySlug}, stopSlug: ${stopSlug}`);
        const response = await axios.get(`${API_URL}/${tripSlug}/days/${daySlug}/stops/${stopSlug}`);
        // console.log('Fetched stop:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching stop with tripSlug ${tripSlug}, daySlug ${daySlug}, stopSlug ${stopSlug}:`, error.response?.data || error.message);
        throw error;
    }
}

// Create a new stop
export const createStop = async (tripSlug, daySlug, stopData) => {
    try {
        const response = await axios.post(`${API_URL}/${tripSlug}/days/${daySlug}/stops`, stopData);
        console.log('Stop created:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating stop:", error.response?.data || error.message);
        throw error;
    }
}