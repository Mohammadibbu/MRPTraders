import axios from "axios";
// http://localhost:5000/MRPTraders/v1/
const baseURL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const GoogleSheetApi = import.meta.env.VITE_GOOGLE_SHEET_API_URL;

const AdminLoginApi = baseURL + "/admin/login";
const adminTableApi = baseURL + "/admin/alladmins";
const adminDeleteApi = baseURL + "/admin/deleteAdmin";

// for verification
const verificationApi = baseURL + "/admin/verifyadmin";
export {
  GoogleSheetApi,
  AdminLoginApi,
  adminTableApi,
  adminDeleteApi,
  verificationApi,
};
export default axiosInstance;
