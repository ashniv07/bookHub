import axios from 'axios';
 
const instance = axios.create({
    baseURL: 'http://localhost:8080',
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
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/logandreg  '; 
        }
        return Promise.reject(error);
    }
);
 
export default instance;