import { Router } from "express";
import api from "../../apibaseconfig.js";
import {
  GetAllAdmins,
  CreateAdmin,
  DeleteAdmin,
  AdminLogin,
} from "../Controllers/Admin.js";
import verifyAdminAuth from "../Middlewares/VerifictaionForAdmin.js";

const router = Router();
// GET /alladmins - get all admins
router.get(api("alladmins"), GetAllAdmins);

// POST /createadmin - create a new admin
router.post(api("createAdmin"), verifyAdminAuth, CreateAdmin);

//DELETE /deleteadmin/:id - delete an admin by ID
router.delete(api("deleteAdmin/:id"), verifyAdminAuth, DeleteAdmin);

router.post(api("login"), AdminLogin);

export default router;
