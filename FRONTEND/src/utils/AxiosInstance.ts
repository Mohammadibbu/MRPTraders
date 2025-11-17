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
const addadminapi = baseURL + "/admin/createAdmin";

// for verification
const verificationApi = baseURL + "/admin/verifyadmin";

//Handling Products
const AddProductApi = baseURL + "/admin/addproduct";
const AddBulkProductApi = baseURL + "/admin/addproduct/bulkupload";
const getProductsApi = baseURL + "/admin/allproducts";
const productcount = baseURL + "/admin/productcount";
const DeleteProductApi = baseURL + "/admin/delproduct";
//categories
const getcategoriesApi = baseURL + "/admin/allcategories";
const AddcategoriesApi = baseURL + "/admin/addcategories";
const DeleteCategoryApi = baseURL + "/admin/delcategory";
const categoriescount = baseURL + "/admin/categoriescount";
export {
  GoogleSheetApi,
  AdminLoginApi,
  adminTableApi,
  adminDeleteApi,
  addadminapi,
  verificationApi,
  //product
  AddProductApi,
  DeleteProductApi,
  getProductsApi,
  AddBulkProductApi,
  productcount,
  //categories
  getcategoriesApi,
  AddcategoriesApi,
  DeleteCategoryApi,
  categoriescount,
};
export default axiosInstance;
