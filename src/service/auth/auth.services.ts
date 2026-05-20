import axiosInstance from "@/lib/axios/axios";
import { register } from "module";

export const authService = {
  async login(email: string, password: string) {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  async register(name: string, email: string, password: string) {
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },
};
