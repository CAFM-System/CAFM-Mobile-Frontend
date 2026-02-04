import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("access_token");
        console.log("Token from localStorage:", token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default apiClient;
