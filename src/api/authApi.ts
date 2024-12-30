import axiosClient from "./axiosClient";

interface RegisterData {
  fullName: string;
  phoneNumber: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  userName: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  userId: string;
}

const authApi = {
  register(data: RegisterData): Promise<AuthResponse> {
    const url = "/v1/sporty-shop/auth/register";
    return axiosClient.post(url, data);
  },

  login(data: LoginData): Promise<AuthResponse> {
    const url = "/v1/sporty-shop/auth/login";
    return axiosClient.post(url, data);
  },
};

export default authApi;
