import React, { useState, useEffect } from "react";
import axios, {
  adminTableApi,
  adminDeleteApi,
} from "../../utils/AxiosInstance";
import { showtoast } from "../../utils/Toast";
import SkeletonLoader from "../UI/SkeletonLoader";
import GradientButton from "../UI/GradientButton";
import { motion } from "framer-motion";
import { Trash2, Eye, Users, RotateCcw, PlusCircle } from "lucide-react";
import DialogComponent from "../UI/DialogModel";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  username: string;
  role: string;
  createdAt: string;
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(adminTableApi);
      setUsers(res.data.data);
    } catch (error: any) {
      if (error?.response?.data?.Token === false) {
        navigate("/admin/login");
        showtoast(
          "Session Expired",
          "Your login session has expired due to inactivity or unauthorized access. Please log in again.",
          "error",
          5000
        );
      } else {
        showtoast(
          "Failed to Retrieve Data",
          "We were unable to fetch the admin details. Please try again later or contact support.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    if (!selectedUserId) return;

    const adminDelete = `${adminDeleteApi}/${selectedUserId}`;

    try {
      const del = await axios.delete(adminDelete);

      console.log(del);

      setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));

      showtoast("Success", "Admin deleted successfully", "success");
    } catch (error) {
      console.error("Delete error:", error);

      showtoast("Error", "Could not delete user", "error");
    } finally {
      setDeleting(false);
      setOpenDialog(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl min-h-screen select-none ">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex items-center justify-between flex-col sm:flex-row"
      >
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-1 flex items-center gap-2">
            <Users className="text-primary" /> Admin Management
          </h2>
          <p className="text-gray-500 text-sm">
            Manage all platform administrators here
          </p>
        </div>
        <div className="flex space-x-3 mt-5 sm:mt-0">
          <button
            onClick={() =>
              showtoast(
                "Not allowed",
                "This Method is under development. Please check back later.",
                "info"
              )
            }
            className="flex items-center gap-1 text-sm font-medium text-primary border border-primary px-3 py-1.5 rounded-md hover:bg-primary hover:text-white transition"
          >
            <PlusCircle className="w-4 h-4" />
            Add Admin
          </button>
          {/* Refresh Button */}
          <button
            onClick={fetchUsers}
            className="flex items-center gap-1 text-sm font-medium text-primary border border-primary px-3 py-1.5 rounded-md hover:bg-primary hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="overflow-x-auto border border-gray-200 rounded-lg"
      >
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10">
                  <SkeletonLoader type="list" count={1} />
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-gray-800 font-medium">
                        {user.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-primary bg-primary/10 px-3 py-1 rounded-full text-xs font-semibold">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}{" "}
                    {new Date(user.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <GradientButton
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        className="min-w-0"
                      >
                        View
                      </GradientButton>
                      <GradientButton
                        variant="outline"
                        size="sm"
                        icon={Trash2}
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setOpenDialog(true);
                        }}
                        className="min-w-0 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </GradientButton>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <Users size={48} className="text-gray-300 mb-3" />
                    <span className="text-gray-500 font-medium">
                      No administrators found.
                    </span>
                  </motion.div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Global Dialog Component */}
      <DialogComponent
        open={openDialog}
        setOpen={setOpenDialog}
        heading="Delete Confirmation"
        messageDescription="Are you sure you want to delete this user? This action cannot be undone."
        okText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        loading={isDeleting}
        icon={<Trash2 className="h-6 w-6 text-red-500" />}
        okButtonColor="bg-red-600 hover:bg-red-700"
        cancelButtonColor="bg-gray-100 text-primary hover:bg-gray-200"
        okButtonAction={handleDelete}
      />
    </div>
  );
};

export default UserTable;
