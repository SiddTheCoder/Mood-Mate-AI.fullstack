import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api/v1",
  withCredentials: true, // because you're using cookies for JWT
});

export default axiosInstance;
