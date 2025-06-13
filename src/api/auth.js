import api from "./axios";

export const signup = (data) => api.post("/auth", data);
export const login = (data) => api.post("/auth/sign_in", data);
export const logout = () => api.delete("/auth/sign_out");

// export const getAuthHeaders = () => ({
//   "access-token": localStorage.getItem("access-token"),
//   client: localStorage.getItem("client"),
//   uid: localStorage.getItem("uid"),
// });
