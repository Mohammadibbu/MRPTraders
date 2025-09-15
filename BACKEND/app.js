import express, { json } from "express";
import cors from "cors";
import router from "./ADMIN/Routes/AdminRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));

app.use(json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
