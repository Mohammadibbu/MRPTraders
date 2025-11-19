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
} from "lucide-react";
import DialogComponent from "../UI/DialogModel";
import { showtoast } from "../../utils/Toast";
import { removeItem } from "../../utils/LocalDB";
// 1. Update AdminHeader to accept 'toggleSidebar' as a prop
const AdminHeader = ({ toggleSidebar }: any) => {
  const navigate = useNavigate();
  const [logoutDialog, setLogoutDialog] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();
    try {
      await removeItem("admincategories");
      await removeItem("adminproducts");
    } catch (e) {
      console.log(e);
    }
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
      <div className="flex items-center">
        {/* --- NEW: Mobile Menu Button --- */}
        {/* This is only visible on mobile (md:hidden) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 mr-2 text-dustyTaupe hover:bg-secondary rounded-md"
        >
          <Menu size={24} />
        </button>

        {/* Dashboard Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-primary truncate mr-4">
          Admin Dashboard
        </h1>
      </div>

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
          <span className="hidden sm:inline">Logout</span>
          <LogOut className="w-5 h-5 sm:ml-2" />
        </button>

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

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <User2 size={20} /> },
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
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
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
              : "w-10 -translate-x-full md:w-16 md:translate-x-0"
          }
        `}
        // Note: I changed w-16 to w-0 on mobile closed state above to prevent overflow issues
      >
        <div className="flex items-center justify-between p-4 border-b border-secondary h-[64px]">
          {isSidebarOpen && (
            <span className="text-xl font-bold text-dustyTaupe truncate">
              Admin Panel
            </span>
          )}

          {/* This button inside the sidebar is for closing it */}
          <button
            onClick={toggleSidebar}
            className="text-dustyTaupe p-1 rounded-md hover:bg-secondary/50 focus:outline-none transition-colors"
          >
            {isSidebarOpen ? (
              <ChevronLeft size={24} className="text-dustyTaupe" />
            ) : (
              // Only show this Menu icon on Desktop collapsed state
              <Menu size={24} className="text-dustyTaupe hidden md:block" />
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
        {/* 2. Pass the toggleSidebar function to the Header */}
        <AdminHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
