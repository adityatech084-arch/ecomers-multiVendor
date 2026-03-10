import axios from "axios";


// console.log(import.meta.env.VITE_API_BACKEND_URL)

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_BACKEND_URL,
    withCredentials:true
})

export default axiosInstance;