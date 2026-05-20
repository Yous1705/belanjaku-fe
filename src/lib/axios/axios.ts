import axios from "axios";
import { token } from "../token";
import { decodeJwt } from "../jwt";

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

    if (currentToken) {
      const decoded = decodeJwt(currentToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded && decoded.exp < currentTime) {
        token.clear();
        window.location.href = "/login";
        return Promise.reject(new Error("Token expired"));
      }

      if (config.headers) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
