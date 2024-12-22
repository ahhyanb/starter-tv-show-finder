// utils/fetchShowData.js
import axios from "axios";

const BASE_URL = "https://api.tvmaze.com/";

export async function fetchShowData(endpoint) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

