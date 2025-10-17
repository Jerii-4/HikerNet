import axios from "axios";

// This creates a central "connector" to your backend.
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export default apiClient;
