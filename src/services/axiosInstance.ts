import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        throw error;
    }
)
export default axiosInstance