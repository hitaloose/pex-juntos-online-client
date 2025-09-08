import axios from "axios";

const prefix = "api/v1";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/${prefix}`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }

  return config;
});
