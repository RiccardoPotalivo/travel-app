import axios from "axios";

const API_URL = "http://localhost:5000/api/trips";

// Fetch all days
export const fetchDays = (tripId) => {
    return axios.get(`${API_URL}/${tripId}/days`)
        .then(response => response.data)
        .catch((error) => {
            console.error("Error fetching days", error);
            throw error;
        });
}

// Create a new day
export const createDay = async (tripId, dayData) => {
    return axios.post(`${API_URL}/${tripId}/days`, dayData)
        .then(response => response.data)
        .catch((error) => {
            console.error("Error creating day", error);
            throw error;
        });
}