import React, { useState, useEffect } from "react";
import axios from "axios";
import { showtoast } from "../../utils/Toast"; // Make sure this imports your custom toast function
import SkeletonLoader from "../UI/SkeletonLoader";
import GradientButton from "../UI/GradientButton";
import { motion } from "framer-motion";
import { Trash2, Eye } from "lucide-react";

type User = {
  id: string;
  username: string;
  role: string;
  createdAt: string;
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from API
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/alladmins`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiaWJidTAwOCIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3NTc5NjUzODcsImV4cCI6MTc1Nzk2ODk4N30.-RV5ZCQrvrtoOLgD3FfKi4XyNzMHsgRxRZ7o7H5t8UA",
        },
      })

      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
        // Show success toast
        showtoast(
          "Data Loaded",
          "User data has been successfully fetched.",
          3000,
          "success"
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        // Show error toast
        showtoast(
          "Error",
          "Failed to load user data. Please try again later.",
          5000,
          "error"
        );
      });
  }, []);

  const DeletehandleClick = async (id: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        const deleteAdmin = await axios.delete(
          `${import.meta.env.VITE_API_URL}/admin/deleteAdmin/${id}`,
          {
            headers: {
              Authorization: "Bearertoken",
            },
          }
        );
        console.log(deleteAdmin);

        setUsers(users.filter((user) => user.id !== id));
        showtoast("Success", "User deleted successfully.", 3000, "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showtoast(
        "Error",
        "Failed to delete user. Please try again later.",
        5000,
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Admin Management
        </h1>
        <p className="text-gray-600">
          Manage system administrators and their permissions
        </p>
      </motion.div>

      <motion.div
        className="overflow-x-auto bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-primary to-dustyTaupe text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Username</th>
              <th className="px-6 py-4 text-left font-semibold">Role</th>
              <th className="px-6 py-4 text-left font-semibold">Created At</th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8">
                  <SkeletonLoader type="list" count={1} />
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-dustyTaupe rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-dustyTaupe/10 text-primary border border-primary/20">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <GradientButton
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        iconPosition="left"
                        className="min-w-0"
                      >
                        View
                      </GradientButton>
                      {/* <button className="bg-secondary text-white px-4 py-2 rounded mr-2">
                      Edit
                    </button> */}
                      <GradientButton
                        variant="outline"
                        size="sm"
                        icon={Trash2}
                        iconPosition="left"
                        onClick={() => DeletehandleClick(user.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white min-w-0"
                      >
                        Delete
                      </GradientButton>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <div className="text-6xl mb-4">👥</div>
                    <span className="bg-red-100 px-6 py-3 rounded-xl text-red-600 font-medium">
                      No administrators found
                    </span>
                  </motion.div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default UserTable;
