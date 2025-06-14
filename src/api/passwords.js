import api from "./axios";

export const savePasswordEntry = (entry) =>
  api.post("/password_entries", { password_entry: entry });

export const getPasswordEntries = () =>
  api.get("/password_entries");

export const deletePasswordEntry = (id) =>
  api.delete(`/password_entries/${id}`);

export const updatePasswordEntry = (id, entry) =>
  api.put(`/password_entries/${id}`, { password_entry: entry });


// import axios from "axios";

// const API_URL = "http://localhost:3000";

// const getAuthHeaders = () => ({
//   "access-token": localStorage.getItem("access-token"),
//   client: localStorage.getItem("client"),
//   uid: localStorage.getItem("uid"),
// });

// export const savePasswordEntry = (entry) =>
//   axios.post(`${API_URL}/password_entries`, { password_entry: entry }, {
//     headers: getAuthHeaders()
//   });

// export const getPasswordEntries = () =>
//   axios.get(`${API_URL}/password_entries`, {
//     headers: getAuthHeaders()
//   });

// export const deletePasswordEntry = (id) =>
//   axios.delete(`${API_URL}/password_entries/${id}`, {
//     headers: getAuthHeaders()
//   });

//   export const updatePasswordEntry = (id, entry) =>
//   axios.put(`${API_URL}/password_entries/${id}`, { password_entry: entry }, {
//     headers: getAuthHeaders()
//   });