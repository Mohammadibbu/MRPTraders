// components/AdminLayout/AdminLayout.tsx
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Users,
  Package,
  PlusCircle,
  Menu,
  ChevronLeft,
  Upload,
  User2,
  TableProperties,
} from "lucide-react";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    // {
    //   name: "Add Product",
    //   path: "/admin/products/add",
    //   icon: <PlusCircle size={20} />,
    // },
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
      name: "Bulk upload",
      path: "/admin/products/bulkupload",
      icon: <Upload size={20} />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen && (
            <span className="text-xl font-semibold text-primary">
              Admin Panel
            </span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {isSidebarOpen ? <ChevronLeft /> : <Menu />}
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 text-sm font-medium px-3 py-2 rounded transition
                ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-primary hover:text-white"
                }
              `}
            >
              {item.icon}
              {isSidebarOpen && item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden  ">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 bg-secondarylight">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
