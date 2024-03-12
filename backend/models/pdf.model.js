import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  pdfTitle: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  dirUrl: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PDF = mongoose.model("PDF", pdfSchema);
export default PDF;
