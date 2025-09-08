import express, { json } from "express";
import cors from "cors";
const app = express();

const port = 5000;
app.use(json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
