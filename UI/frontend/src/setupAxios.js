import axios from 'axios';
 
const instance = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for your API
});
 
// Request interceptor to add token to headers
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; 
    },
    (error) => Promise.reject(error)
);
 
// Response interceptor to handle errors globally
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle specific errors here, e.g., token expiration
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors (e.g., token expired)
            localStorage.removeItem('token');
            window.location.href = '/logandreg  '; // Redirect to login page
        }
        return Promise.reject(error);
    }
);
 
export default instance;