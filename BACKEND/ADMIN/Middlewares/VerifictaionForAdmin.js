import dotenv from "dotenv";
dotenv.config({ quiet: true });
const verifyAdminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer-")) {
    return res.status(401).json({
      error: "ADMIN- Missing or invalid Authorization header",
    });
  }

  const idToken = authHeader.split("Bearer-")[1];

  try {
    if (idToken !== process.env.admin_AuthKey) {
      return res
        .status(403)
        .json({ error: "ADMIN- Access denied. Admins only." });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default verifyAdminAuth;
