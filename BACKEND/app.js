import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import router from "./ADMIN/Routes/AdminRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Security Middleware

app.use(helmet());

// Payload Limits

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// CORS Setup

const allowedOrigins = [
  "https://mrptraders-frontend.onrender.com",
  "https://mrpglobaltraders.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Rate Limiting

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per window
    message: "Too many requests from this IP. Please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(router);

// Centralized Error Handler

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  // Handle CORS errors separately
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
