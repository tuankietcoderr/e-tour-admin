import { ACCESS_TOKEN_NAME, BASE_API_URL } from "@/constants/server";
import axios from "axios";

let apiInstance = axios.create({
  baseURL: BASE_API_URL,
});

apiInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default apiInstance;
