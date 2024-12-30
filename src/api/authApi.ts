import axiosClient from "./axiosClient";

interface RegisterData {
    username: string;
    password: string;
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

    register(data: RegisterData) {
        const url = '/auth/local/register';
        return axiosClient.post(url, data);
    },

    login(data: LoginData): Promise<AuthResponse> {
        const url = '/v1/sporty-shop/auth/login';
        return axiosClient.post(url, data);
    },
}

export default authApi;