import express from "express";
import { extract, library, upload } from "../controllers/pdf.controller.js";

const router = express.Router();

router.post("/upload", upload);
router.post("/extract", extract);
router.post("/library", library);

export default router;
