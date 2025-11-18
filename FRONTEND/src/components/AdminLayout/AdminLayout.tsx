import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  Menu,
  ChevronLeft,
  Upload,
  User2,
  TableProperties,
  LogOut,
  RefreshCw,
} from "lucide-react";
import DialogComponent from "../UI/DialogModel";
import { showtoast } from "../../utils/Toast";

// 3. AdminHeader Component (Embedded)
const AdminHeader = () => {
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
    <header className="bg-white shadow px-4 sm:px-6 py-3 flex items-center justify-between border-b border-secondary">
      {/* Dashboard Title - Responsive text size */}
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
          okButtonColor="bg-accent hover:bg-opacity-90 text-white"
          cancelButtonColor="bg-secondary text-dustyTaupe hover:bg-secondary/70"
          okButtonAction={handleLogout}
        />
      </div>
    </header>
  );
};
// --- END MOCK DEPENDENCIES ---

const AdminLayout = () => {
  // Hide sidebar on smaller screens by default
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); // Start open on desktop

  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <User2 size={20} />,
    },
    {
      name: "Manage Admins",
      path: "/admin/Alladmins",
      icon: <Users size={20} />,
    },
    {
      name: "Manage Categories",
      path: "/admin/categories",
      icon: <TableProperties size={20} />,
    },
    {
      name: "Manage Products",
      path: "/admin/products",
      icon: <Package size={20} />,
    },
    {
      name: "Bulk Upload",
      path: "/admin/products/bulkupload",
      icon: <Upload size={20} />,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    // Close sidebar on link click if it's a mobile view (optional but good UX)
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    // Use secondarylight for the overall background
    <div className="flex h-screen bg-secondarylight">
      {/* Overlay for Mobile View */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static inset-y-0 left-0 z-50
          bg-white border-r border-secondary shadow-xl md:shadow-none
          transform transition-all duration-300 ease-in-out 
          ${
            isSidebarOpen
              ? "w-64 translate-x-0"
              : "w-16 -translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-secondary h-[64px]">
          {" "}
          {/* Matched height to AdminHeader */}
          {isSidebarOpen && (
            <span className="text-xl font-bold text-dustyTaupe truncate">
              Admin Panel
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="text-dustyTaupe p-1 rounded-md hover:bg-secondary/50 focus:outline-none transition-colors"
          >
            {/* Show Menu icon when collapsed on desktop, ChevronLeft when open */}
            {isSidebarOpen ? (
              <ChevronLeft size={24} className="text-dustyTaupe" />
            ) : (
              <Menu size={24} className="text-dustyTaupe hidden md:block" />
            )}
            {/* On mobile, only show Menu when closed, ChevronLeft when open. We use the overlay to close it. */}
            {!isSidebarOpen && window.innerWidth < 768 && (
              <Menu size={24} className="text-dustyTaupe" />
            )}
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={handleLinkClick}
              className={`
                flex items-center text-sm font-medium rounded-lg transition-all duration-150
                ${
                  isSidebarOpen ? "py-2 px-3 gap-3" : "py-2 px-1 justify-center"
                }
                ${
                  location.pathname === item.path
                    ? "bg-primary text-white shadow-md"
                    : "text-dustyTaupe hover:bg-secondary hover:text-dustyTaupe"
                }
              `}
              title={item.name}
            >
              {item.icon}
              {isSidebarOpen && <span className="truncate">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Use the AdminHeader component here */}
        <AdminHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
