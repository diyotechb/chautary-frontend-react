import axios, { type AxiosError } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response);
  },
);

API.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error: AxiosError) => {
    return Promise.reject(error.response);
  },
);
export { API };
