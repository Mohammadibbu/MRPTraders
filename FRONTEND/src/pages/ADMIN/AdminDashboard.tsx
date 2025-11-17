// pages/ADMIN/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SkeletonLoader from "../../components/UI/SkeletonLoader";

type AdminContextType = {
  username: string;
  role: string;
};

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
        <SkeletonLoader type="card" count={1} />
        <SkeletonLoader type="list" count={1} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {context?.username ?? "Admin"}
        </h1>
        <p className="text-gray-600">Role: {context?.role ?? "Super Admin"}</p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-primary text-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Admins</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>

        <div className="bg-blue-600 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Products</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-medium">New Orders</h2>
          <p className="text-3xl font-bold mt-2">32</p>
        </div>
      </div> */}

      {/* Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Activity Overview
        </h3>
        <p className="text-gray-600">Charts and analytics coming soon...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
