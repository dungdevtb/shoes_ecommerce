/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:8080";
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        token: ''
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.token = localStorage.getItem("token");
        return config;
    },
    (error) => Promise.reject(error)
)

export default axiosInstance
