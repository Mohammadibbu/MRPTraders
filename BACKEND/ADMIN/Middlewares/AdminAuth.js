import { verifyToken } from "../../utils/jwt.js";

const AdminAuth = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];

  // if (!token) {
  //   return res
  //     .status(401)
  //     .json({ message: "Authorization token is required", success: false });
  // }

  // const decoded = verifyToken(token);

  // if (!decoded) {
  //   return res
  //     .status(401)
  //     .json({ message: "Invalid or expired token", success: false });
  // }

  // req.user = decoded;
  next();
};

export { AdminAuth };
