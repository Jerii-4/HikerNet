import axios from "axios";

// Replace with your computer's IP address!

const apiClient = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
});

export default apiClient;
