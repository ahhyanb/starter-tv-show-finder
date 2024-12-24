import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: process.REACT_APP_API_URL, // Dynamically set the base URL
});

// Optional: Add interceptors for logging, error handling, or authentication
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error); // Always propagate the error
  }
);

export default api;
