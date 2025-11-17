import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { showtoast } from "../../utils/Toast";
import DialogComponent from "../UI/DialogModel";
const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const [logoutDialog, setLogoutDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();
    navigate("/admin/login");
    showtoast(
      "Logged out",
      "You have been successfully logged out",
      "success",
      5000
    );
  };

  return (
    <header className="bg-white shadow px-6 py-2.5 flex items-center justify-between border-b">
      <h1 className="text-xl font-semibold text-primary">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button
          className="bg-primary inline-flex font-bold text-white px-4 py-1.5 rounded hover:bg-primary-light transition"
          onClick={() => setLogoutDialog(true)}
        >
          Logout
          <LogOut className="ml-4" />
        </button>

        {/* Logout Confirmation Dialog */}
        <DialogComponent
          open={logoutDialog}
          setOpen={setLogoutDialog}
          heading="Logout Confirmation"
          messageDescription="Are you sure you want to log out?"
          okText="Logout"
          cancelText="Cancel"
          icon={<LogOut className="h-6 w-6 text-red-500" />}
          okButtonColor="bg-red-600 hover:bg-red-700"
          cancelButtonColor="bg-gray-100 text-primary hover:bg-gray-200"
          okButtonAction={handleLogout}
        />
      </div>
    </header>
  );
};

export default AdminHeader;
