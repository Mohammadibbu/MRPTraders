import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SkeletonLoader from "../../components/UI/SkeletonLoader";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type AdminContextType = {
  username: string;
  role: string;
};

// Data for the static cards (will eventually come from API)
const dashboardStats = [
  {
    id: 1,
    title: "Total Products",
    value: 120,
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    title: "Categories",
    value: 15,
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 3,
    title: "New Inquiries",
    value: 32,
    icon: ShoppingCart,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: 4,
    title: "Growth Rate",
    value: 9.5,
    suffix: "%",
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const AdminDashboard: React.FC = () => {
  const context = useOutletContext<AdminContextType>();
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // simulate API
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader type="card" count={1} className="h-24 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonLoader type="card" count={4} className="h-32 rounded-2xl" />
        </div>
        <SkeletonLoader type="list" count={1} className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome back, {context?.username ?? "Admin"}!
        </h1>
        <p className="text-gray-500 mt-1">
          Your role:{" "}
          <span className="font-medium text-primary">
            {context?.role ?? "Super Admin"}
          </span>
        </p>
      </motion.div>

      {/* Stats Cards */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-extrabold text-gray-900">
                    {stat.value}
                    {stat.suffix}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl ${stat.bg} ${stat.color} shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div> */}

      {/* Placeholder: Activity Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-64"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
          Activity Overview
        </h3>
        <p className="text-gray-600 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-400" /> Charts and analytics
          coming soon...
        </p>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
