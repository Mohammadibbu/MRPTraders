const Base_EndPoint = "/MRPTraders/v1";

const CreateAdminEndPOint = `${Base_EndPoint}/admin/createadmin`;
const FetchAllAdminEndPoint = `${Base_EndPoint}/admin/alladmins`;
const DeleteAdmin = `${Base_EndPoint}/admin/deleteAdmin/:id`;
const AdminLogin = `${Base_EndPoint}/admin/login`;
const AdminVerification = `${Base_EndPoint}/admin/verifyadmin`;

//products
const AdminAddProduct = `${Base_EndPoint}/admin/addproduct`;
const AdminAddBulkProduct = `${Base_EndPoint}/admin/addproduct/bulkupload`;
const AdminGetProduct = `${Base_EndPoint}/admin/allproducts/`;
const AdminDeleteProduct = `${Base_EndPoint}/admin/delProduct/:productid`;
const Productcounts = `${Base_EndPoint}/admin/productcount`;

const AdminRoutes = {
  CreateAdminEndPOint,
  FetchAllAdminEndPoint,
  DeleteAdmin,
  AdminLogin,
  AdminVerification,
  // product
  AdminAddProduct,
  AdminAddBulkProduct,
  AdminGetProduct,
  AdminDeleteProduct,
  Productcounts,
};

export { AdminRoutes };
