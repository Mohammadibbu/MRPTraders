import db from "../../FirebaseDB/DBConnection.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt.js";
// getAllAdmins - fetch all admins from Firestore

const GetAllAdmins = async (req, res) => {
  try {
    const snapshot = await db.collection("admin").get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error: Failed to fetch data from database",
    });
  }
};

// Create a new admin
const CreateAdmin = async (req, res) => {
  try {
    const { username, password, role = "admin" } = req.body;

    // Validate required fields
    if (!username || !password || !role) {
      return res.status(400).json({
        status: "error",
        message: "username and password are required.",
      });
    }
    if (username.length <= 2) {
      return res.status(400).json({
        status: "error",
        message: "Username must be at least 3 characters long.",
      });
    }

    if (password.length <= 4) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 5 characters long.",
      });
    }

    // Check if admin with same username already exists
    const existingAdminSnapshot = await db
      .collection("admin")
      .where("username", "==", username)
      .get();

    if (!existingAdminSnapshot.empty) {
      return res.status(409).json({
        status: "error",
        message: "Admin with this username already exists.",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newAdmin = {
      username,
      Hashed_password: hash,
      role,
      createdAt: new Date().toISOString(),
    };

    // Add new admin to the "admin" collection
    const docRef = await db.collection("admin").add(newAdmin);

    res.status(201).json({
      status: "success",
      message: "Admin created successfully",
      id: docRef.id,
    });
  } catch (error) {
    // console.error("Error creating admin:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error : Failed to create admin",
    });
  }
};

// Delete an admin by Firestore document ID
const DeleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ status: "error", message: "Admin ID is required" });
  }

  try {
    const adminRef = db.collection("admin").doc(id);
    const doc = await adminRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found" });
    }

    await adminRef.delete();

    res
      .status(200)
      .json({ status: "success", message: "Admin deleted successfully" });
  } catch (error) {
    // console.error("Error deleting admin:", error);
    res.status(500).json({
      status: "error",
      message: "INTERNAL SERVER ERROR :Failed to delete admin",
    });
  }
};

// admin login
const AdminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      errorCode: "MISSING_FIELDS",
      message: "username and password are required.",
    });
  }

  try {
    // Search admin by username
    const adminQuery = await db
      .collection("admin")
      .where("username", "==", username)
      .limit(1)
      .get();

    if (adminQuery.empty) {
      return res.status(401).json({
        status: "error",
        errorCode: "INVALID_CREDENTIALS",
        message: "Invalid username or password.",
      });
    }

    const adminDoc = adminQuery.docs[0];
    const adminData = adminDoc.data();

    // Compare password hash
    const passwordMatch = await bcrypt.compare(
      password,
      adminData.Hashed_password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        errorCode: "INVALID_CREDENTIALS",
        message: "Invalid username or password.",
      });
    }
    const SECRET_TOKEN = generateToken({
      username: adminData.username,
      role: adminData.role,
    });
    // Login success
    return res.status(200).json({
      status: "success",
      message: "Login successful.",
      // adminId: adminDoc.id,
      // username: adminData.username,
      SECRET_TOKEN,
    });
  } catch (error) {
    // console.error("Login error:", error);
    return res.status(500).json({
      status: "error",
      errorCode: "SERVER_ERROR",
      message: "An unexpected error occurred.",
      details: error.message,
    });
  }
};
export { GetAllAdmins, CreateAdmin, DeleteAdmin, AdminLogin };
