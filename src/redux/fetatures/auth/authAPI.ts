import axiosInstance from "../../../services/axiosInstance";
import { LoginForm } from "./authTypes";

export const authApi = {
    userLogin: (data: LoginForm) => axiosInstance.post('/auth/user/login')
} 