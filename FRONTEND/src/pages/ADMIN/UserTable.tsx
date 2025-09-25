import React, { useState, useEffect } from "react";
import axios, {
  adminTableApi,
  adminDeleteApi,
  addadminapi,
} from "../../utils/AxiosInstance";
import { showtoast } from "../../utils/Toast";
import SkeletonLoader from "../UI/SkeletonLoader";
import GradientButton from "../UI/GradientButton";
import { motion } from "framer-motion";
import { Trash2, Users, RotateCcw, PlusCircle, Edit } from "lucide-react";
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [adding, setAdding] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(adminTableApi);
      setUsers(res.data.data);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Errors
  const handleError = (error: any) => {
    if (error?.response?.data?.Token === false) {
      showtoast(
        "Session Expired",
        "Your session has expired. Please log in again.",
        "error"
      );
      navigate("/admin/login");
    } else {
      showtoast(
        "Error",
        error?.response?.data?.message || "An unexpected error occurred.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add Admin
  const handleAddAdmin = async () => {
    const { username, password } = newAdmin;
    if (!username || !password) {
      showtoast(
        "Missing Fields",
        "Both username and password are required.",
        "warning"
      );
      return;
    }

    setAdding(true);
    try {
      const response = await axios.post(addadminapi, { username, password });
      if (response?.data?.status === "error") {
        showtoast(
          "Failed",
          response?.data?.message || "Could not add admin. Try again.",
          "error"
        );
        return;
      }
      showtoast("Success", "Admin added successfully.", "success");
      fetchUsers();
      setAddDialogOpen(false);
    } catch (error) {
      handleError(error);
    } finally {
      setAdding(false);
    }
  };

  // Delete Admin
  const handleDelete = async () => {
    if (!selectedUserId) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${adminDeleteApi}/${selectedUserId}`);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
      showtoast("Success", "Admin deleted successfully.", "success");
    } catch (error) {
      handleError(error);
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl min-h-screen">
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
            onClick={() => {
              setAddDialogOpen(true);
              setNewAdmin({ username: "", password: "" });
            }}
            className="flex items-center gap-1 text-sm font-medium text-primary border border-primary px-3 py-1.5 rounded-md hover:bg-primary hover:text-white transition"
          >
            <PlusCircle className="w-4 h-4" />
            Add Admin
          </button>
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
                        icon={Edit}
                        onClick={() => {
                          showtoast(
                            "Not Allowed",
                            "This feature is under development",
                            "info"
                          );
                        }}
                        className="min-w-0"
                        disabled={user.role === "superadmin"}
                      >
                        Edit
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
                        disabled={user.role === "superadmin"}
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

      {/* Add Admin Dialog */}
      <DialogComponent
        open={addDialogOpen}
        setOpen={setAddDialogOpen}
        heading="Add New Admin"
        messageDescription={
          <div className="my-7 sm:flex">
            <div className="mb-3 sm:mr-5">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={newAdmin.username}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, username: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm"
                placeholder="Enter admin username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm"
                placeholder="Enter password"
              />
            </div>
          </div>
        }
        okText={adding ? "Adding..." : "Add Admin"}
        cancelText="Cancel"
        loading={adding}
        icon={<Users className="h-6 w-6 text-primary" />}
        okButtonAction={handleAddAdmin}
        okButtonColor="bg-primary hover:bg-primary/90"
        cancelButtonColor="bg-gray-100 text-primary hover:bg-gray-200"
      />

      {/* Delete Confirmation Dialog */}
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
