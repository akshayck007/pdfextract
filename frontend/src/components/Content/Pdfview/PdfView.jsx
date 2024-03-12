import React, { useState } from "react";
import { Document, pdfjs, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

import "./pdfview.scss";
import PdfPages from "./PdfPages";

function PdfView({ uploadedPdf }) {
  const publicPath = `/backend/uploads/${uploadedPdf}`;
  console.log("publicPath at pdfVIew: ", publicPath);
  const [pageCount, setPageCount] = useState(null);

  function onFileLoad({ numPages }) {
    setPageCount(numPages);
  }

  return (
    <div className="pdfview">
      <Document onLoadSuccess={onFileLoad} file={publicPath}>
        {pageCount && <PdfPages pdfName={uploadedPdf} pageCount={pageCount} />}
      </Document>
    </div>
  );
}

export default PdfView;
