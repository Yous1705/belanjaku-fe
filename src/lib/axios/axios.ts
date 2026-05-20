import axios from "axios";
import { token } from "../token";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const currentToken = token.getToken();
    if (currentToken && config.headers) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
