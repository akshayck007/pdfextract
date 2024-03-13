import express from "express";
import {
  deletePdf,
  extract,
  library,
  upload,
} from "../controllers/pdf.controller.js";

const router = express.Router();

router.post("/upload", upload);
router.post("/extract", extract);
router.post("/library", library);
router.post("/delete", deletePdf);

export default router;
