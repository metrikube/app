import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:${import.meta.env.VITE_API_PORT}/api/v1`,
    timeout: 5000,
});

export {
    axiosInstance
}