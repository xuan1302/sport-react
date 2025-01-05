import { notification } from "antd";
import axios from "axios";
import StorageKeys from "../constants/storage-key";
const baseUrl = import.meta.env.VITE_API_URL_BASE;
const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data;
  },
  function (error) {
    if (error.response) {
      const { status } = error.response;
      // Kiểm tra mã lỗi 401 hoặc mã lỗi token hết hạn từ server
      if (status === 401) {
        notification.error({
          message: "Token đã hết hạn",
          description: "Vui lòng đăng nhập lại để tiếp tục.",
        });
        sessionStorage.removeItem(StorageKeys.TOKEN);
        sessionStorage.removeItem(StorageKeys.USERINFO);
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 2000);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosClient;
