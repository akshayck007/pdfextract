import path from "path";

import PDF from "../models/pdf.model.js";
import fs from "fs";
import { PDFDocument } from "pdf-lib";
import pdfmerge from "pdf-merge";
import User from "../models/user.model.js";
import { log } from "console";

const __dirname = path.resolve();
export const upload = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ error: "Bad Request, Received no PDF Files" });
    }

    const receivedFile = req.files.pdf;
    const uniqueName =
      Date.now() + "_" + receivedFile.name.split(" ").join("_");
    const uploadsPath = path.join(__dirname, "backend", "uploads", uniqueName);

    receivedFile.mv(uploadsPath, (err) => {
      if (err) {
        console.error("Error uploading file:", err);

        if (err.code === "ENOENT") {
          return res.status(400).json({
            error: "Bad Request",
            details: "Upload directory does not exist.",
          });
        }

        return res.status(400).json({
          error: "Bad Request",
          details: "Error uploading the file.",
        });
      }
    });

    const publicPath = `/backend/uploads/${uniqueName}`;

    // Check if userId is provided
    const { userId } = req.body;
    console.log(userId);
    if (userId !== "null") {
      // Attempt to find the user by userId

      const user = await User.findById(userId);

      if (user) {
        const newPDF = new PDF({
          pdfTitle: uniqueName,
          dirUrl: publicPath,
          user: userId,
        });

        await newPDF.save();

        user.library.push(newPDF);
        await user.save();

        return res.status(201).json({
          message: "File uploaded successfully",
          fileName: uniqueName,
          publicPath,
        });
      }
    } else {
      const newPDF = new PDF({
        pdfTitle: uniqueName,
        dirUrl: publicPath,
      });

      await newPDF.save();

      res.status(201).json({
        message: "File uploaded successfully",
        fileName: uniqueName,
        publicPath,
      });
    }
    // If userId is not provided or the user is not found, store the PDF without associating it with any user
  } catch (error) {
    console.error("Error in upload function:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const extract = async (req, res) => {
  console.log(req.body);
  const { pdfName, selectedPages } = req.body;
  try {
    const pdfPath = path.join(__dirname, "backend", "uploads", pdfName);
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    const extractedPdfDoc = await PDFDocument.create();

    for (const pageNumber of selectedPages) {
      const page = await extractedPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
      extractedPdfDoc.addPage(page[0]);
    }

    const savedName = `_extracted_${Date.now()}_${pdfName}`;
    const outputPath = path.join(__dirname, "backend", "uploads", savedName);

    const extractedPdfBuffer = await extractedPdfDoc.save();
    fs.writeFileSync(outputPath, extractedPdfBuffer);

    res.status(201).json({
      extractedPdfLink: `/backend/uploads/${savedName}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const library = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const user = await User.findById(userId).populate("library");
    if (user) {
      res.status(200).json({ library: user.library });
    }
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};
