import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import connectDB from "./db/conncectDB.js";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();
dotenv.config();
app.use(cors());

app.use(
  "/backend/uploads",
  express.static(path.join(__dirname, "backend", "uploads"))
);

app.use(fileUpload());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`listening at ${PORT}`);
});
