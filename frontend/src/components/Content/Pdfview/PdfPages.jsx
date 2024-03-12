import React, { useState } from "react";
import { Page } from "react-pdf";
import "./pdfpages.scss";
import axios from "axios";

function PdfPages({ pdfName, pageCount }) {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedPages, setSelectedPages] = useState([]);

  function handleFunctionalBtnClick(btnName) {
    setSelectedButton(btnName);
  }

  function handleSelectionClick(pageNum) {
    if (selectedButton && selectedButton == "select") {
      setSelectedPages((prevPages) => {
        if (prevPages.includes(pageNum)) {
          return prevPages
            .filter((item) => item !== pageNum)
            .sort((a, b) => a - b);
        } else {
          return [...prevPages, pageNum].sort((a, b) => a - b);
        }
      });
    }
  }

  async function handleDownload() {
    if (selectedPages.length === 0) {
      alert("Please select pages before downloading.");
      return;
    }
    try {
      const { data } = await axios.post("/api/pdf/extract", {
        pdfName,
        selectedPages,
      });

      window.open(data.extractedPdfLink, "_blank");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="pdfPages">
      <div className="functionalBtns">
        <button
          onClick={() => handleFunctionalBtnClick("select")}
          className={
            selectedButton === "select" ? "btn-primary" : "btn-secondary"
          }
        >
          Select Pages
        </button>
        <button
          onClick={() => handleFunctionalBtnClick("align")}
          className={
            selectedButton === "align" ? "btn-primary" : "btn-secondary"
          }
        >
          Align Pages
        </button>
        <button onClick={handleDownload} className="btn-secondary">
          Download
        </button>
      </div>
      <div className="gridContainer">
        {Array.from(new Array(pageCount), (el, index) => (
          <div
            onClick={() => {
              handleSelectionClick(index + 1);
            }}
            key={index + 1}
            className={`gridItem ${
              selectedButton === "select"
                ? "select"
                : selectedButton === "align"
                ? "align"
                : ""
            } ${selectedPages.includes(index + 1) ? "selected" : ""}`}
          >
            <Page width={250} pageNumber={index + 1} />
            <p>Page Number: {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PdfPages;
