import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }

  return config;
});
