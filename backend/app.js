import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import connectDB from "./db/conncectDB.js";
const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`listening at ${PORT}`);
});
