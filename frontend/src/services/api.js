import axios from 'axios';

// Create generic Axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor for potential auth token injection
apiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor for unified error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// Services
export const ChatService = {
    /**
     * Send a general design requirement to the AI Crew API.
     */
    async submitDesignRequirement(requirement, history = []) {
        try {
            const response = await apiClient.post('/api/design/', { requirement, history });
            return response.data;
        } catch (err) {
            console.error("Backend request failed:", err);
            // Throw error back out so the UI hook can process it and display it
            throw new Error(err.response?.data?.message || err.message || "Failed to reach AI Engine. Backend may be down.");
        }
    },
};
