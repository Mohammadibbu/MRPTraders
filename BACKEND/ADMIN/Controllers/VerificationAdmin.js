import { verifyToken } from "../../utils/jwt.js";

const verifyVerificationToken = (req, res) => {
  const tokenForVerification = req.body?.verificationToken;

  if (!tokenForVerification) {
    return res.status(400).json({
      message: "Verification token is required.",
      verification: false,
      success: false,
    });
  }

  const verification = verifyToken(tokenForVerification);

  if (!verification) {
    return res.status(401).json({
      message: "Unauthorized access. Invalid verification token.",
      verification: false,
      success: false,
    });
  }

  return res.status(200).json({
    message: "Verification successful.",
    verification: true,
    success: true,
  });
};

export { verifyVerificationToken };
