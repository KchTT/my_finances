import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL


const axiosPublic = axios.create({
    baseURL: BASE_URL
});

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosPrivate.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("MFT");
    return config;
})


export { axiosPublic, axiosPrivate };
