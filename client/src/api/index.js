import axios from 'axios'

const axiosInstance = axios.create({
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return config;
})

export default axiosInstance;