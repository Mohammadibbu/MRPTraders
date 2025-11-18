import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useState } from "react";
import React from "react";
import DialogComponent from "../UI/DialogModel";
import { showtoast } from "../../utils/Toast";
const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const [logoutDialog, setLogoutDialog] = useState(false);

  // Custom color classes used: primary, accent, secondary, dustyTaupe, secondary/70

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
    <header className="bg-white shadow px-4 sm:px-6 py-3 flex items-center justify-between border-b border-secondary">
      {/* Dashboard Title - Decreased font size on small screens (text-xl) */}
      <h1 className="text-xl sm:text-2xl font-bold text-primary truncate mr-4">
        Admin Dashboard
      </h1>

      {/* Logout Action */}
      <div className="flex items-center">
        <button
          className="
            inline-flex items-center font-semibold text-white 
            px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg 
            bg-accent hover:bg-opacity-90 
            transition duration-200 shadow-md shadow-accent/40
          "
          onClick={() => setLogoutDialog(true)}
        >
          {/* Hide "Logout" text on xs screens, show it on sm and above */}
          <span className="hidden sm:inline">Logout</span>
          {/* Ensure icon positioning is correct regardless of text visibility */}
          <LogOut className="w-5 h-5 sm:ml-2" />
        </button>

        {/* Logout Confirmation Dialog */}
        <DialogComponent
          open={logoutDialog}
          setOpen={setLogoutDialog}
          heading="Logout Confirmation"
          messageDescription="Are you sure you want to log out?"
          okText="Logout"
          cancelText="Cancel"
          icon={<LogOut className="h-6 w-6 text-accent" />}
          // Use custom colors for dialog buttons
          okButtonColor="bg-accent hover:bg-opacity-90 text-white"
          cancelButtonColor="bg-secondary text-dustyTaupe hover:bg-secondary/70"
          okButtonAction={handleLogout}
        />
      </div>
    </header>
  );
};

export default AdminHeader;
