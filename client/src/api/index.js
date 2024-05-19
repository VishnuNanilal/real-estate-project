import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return config;
})

export default axiosInstance;