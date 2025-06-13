import axios from "axios";

const API_URL = "http://localhost:3000";

export const signup = (data) => axios.post(`${API_URL}/auth`, data);
export const login = (data) => axios.post(`${API_URL}/auth/sign_in`, data);
export const logout = (headers) => axios.delete(`${API_URL}/auth/sign_out`, { headers });

export const getAuthHeaders = () => ({
  "access-token": localStorage.getItem("access-token"),
  client: localStorage.getItem("client"),
  uid: localStorage.getItem("uid"),
});
