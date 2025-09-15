const Base_EndPoint = "/MRPTraders/v1";

const CreateAdminEndPOint = `${Base_EndPoint}/admin/createadmin`;
const FetchAllAdminEndPoint = `${Base_EndPoint}/admin/alladmins`;
const DeleteAdmin = `${Base_EndPoint}/admin/deleteAdmin/:id`;
const AdminLogin = `${Base_EndPoint}/admin/login`;

const AdminRoutes = {
  CreateAdminEndPOint,
  FetchAllAdminEndPoint,
  DeleteAdmin,
  AdminLogin,
};

export { AdminRoutes };
