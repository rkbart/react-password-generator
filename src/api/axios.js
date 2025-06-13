// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Automatically attach auth headers to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  if (token && client && uid) {
    config.headers["access-token"] = token;
    config.headers["client"] = client;
    config.headers["uid"] = uid;
  }

  return config;
});

// Automatically update tokens from response headers
api.interceptors.response.use(
  (response) => {
    const newToken = response.headers["access-token"];
    if (newToken) {
      localStorage.setItem("access-token", newToken);
      localStorage.setItem("client", response.headers["client"]);
      localStorage.setItem("uid", response.headers["uid"]);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("client");
      localStorage.removeItem("uid");
      // optionally redirect or notify user
    }
    return Promise.reject(error);
  }
);

export default api;
