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

//Handle Products
router.get(AdminRoutes.AdminGetProduct, getProducts);

router.post(AdminRoutes.AdminAddProduct, AdminAuth, addProduct);

router.post(AdminRoutes.AdminAddBulkProduct, AdminAuth, addbulkproduct);

router.delete(AdminRoutes.AdminDeleteProduct, AdminAuth, DeleteProduct);

export default router;
