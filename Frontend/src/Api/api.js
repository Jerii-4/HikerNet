import axios from "axios";

// Replace with your computer's IP address!
const API_URL = "http://10.79.113.154:5000/api/auth";

const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;
