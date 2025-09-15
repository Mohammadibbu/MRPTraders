import React, { useState, useEffect } from "react";
import axios from "axios";
import { showtoast } from "../../utils/Toast"; // Make sure this imports your custom toast function

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
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center">
                  {/* You can optionally show a loading text or a static message here */}
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-primary text-white px-4 py-2 rounded mr-2">
                      View
                    </button>
                    {/* <button className="bg-secondary text-white px-4 py-2 rounded mr-2">
                      Edit
                    </button> */}
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded"
                      onClick={() => DeletehandleClick(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center">
                  <span className="bg-red-200 px-5 py-2 rounded-lg text-red-500">
                    Details Not Found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
