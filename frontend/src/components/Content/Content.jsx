import React, { useState } from "react";
import "./content.scss";
import Uploadform from "./Uploadform/Uploadform";
import PdfView from "./Pdfview/PdfView";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

function Content() {
  const { authUser } = useAuthContext();
  const [pdfName, setPdfName] = useState("");
  async function handleUpload(file) {
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("userId", authUser?.userId || null);
      const response = await axios.post("/api/pdf/upload", formData);
      if (response.status == 201) {
        setPdfName(response.data.fileName);
      }
    } catch (error) {
      console.log("ERRRORR: ", error);
    }
  }
  return (
    <div className="content">
      <Uploadform onFileUpload={handleUpload} />
      {pdfName && <PdfView uploadedPdf={pdfName} />}
    </div>
  );
}

export default Content;
