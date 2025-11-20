import { Router } from "express";
import { AdminRoutes } from "../../utils/apibaseconfig.js";
import {
  GetAllAdmins,
  CreateAdmin,
  DeleteAdmin,
  AdminLogin,
} from "../Controllers/Admin.js";
import { AdminAuth } from "../Middlewares/AdminAuth.js";
import { verifyVerificationToken } from "../Controllers/VerificationAdmin.js";
import {
  addbulkproduct,
  addProduct,
  DeleteProduct,
  getProducts,
  ProductCounts,
  //categories
  addProductCategory,
  getAllCategories,
  deleteCategory,
  CategoriesCounts,
  //cacheVersion
  CacheVersion,
} from "../Controllers/HandleProducts.js";
const router = Router();
// GET /alladmins - get all admins
router.get(AdminRoutes.FetchAllAdminEndPoint, AdminAuth, GetAllAdmins);

// POST /createadmin - create a new admin
router.post(AdminRoutes.CreateAdminEndPOint, AdminAuth, CreateAdmin);

//DELETE /deleteadmin/:id - delete an admin by ID
router.delete(AdminRoutes.DeleteAdmin, AdminAuth, DeleteAdmin);

router.post(AdminRoutes.AdminLogin, AdminLogin);

router.post(AdminRoutes.AdminVerification, AdminAuth, verifyVerificationToken);

router.post(AdminRoutes.AdminAddProduct, AdminAuth, addProduct);

router.post(AdminRoutes.AdminAddBulkProduct, AdminAuth, addbulkproduct);

router.delete(AdminRoutes.AdminDeleteProduct, AdminAuth, DeleteProduct);

//categories
// router.get(AdminRoutes.AdminGetcategory,)
router.post(AdminRoutes.AdminAddcategory, AdminAuth, addProductCategory);

router.delete(AdminRoutes.AdminDeletecategory, AdminAuth, deleteCategory);

//without Auth Routes
//Handle Products
router.get(AdminRoutes.AdminGetProduct, getProducts);
// Count Products
router.get(AdminRoutes.Productcounts, ProductCounts);
// getAllCategories
router.get(AdminRoutes.AdminGetcategory, getAllCategories);
// Count Categories
router.get(AdminRoutes.CategoriesCounts, CategoriesCounts);

//get Cache Version
router.get(AdminRoutes.CacheVersion, CacheVersion);

export default router;
