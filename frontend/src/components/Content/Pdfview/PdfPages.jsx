import React, { useState } from "react";
import { Page } from "react-pdf";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./pdfpages.scss";
import axios from "axios";

function PdfPages({ pdfName, pageCount }) {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedPages, setSelectedPages] = useState([]);
  const [align, setAlign] = useState(false);
  const [showAllPages, setShowAllPages] = useState(true);

  function handleFunctionalBtnClick(btnName) {
    setSelectedButton(btnName);
    if (btnName === "align") {
      setAlign(true);
      setShowAllPages(false);
    } else {
      setAlign(false);
      setShowAllPages(true);
    }
  }

  function handleSelectionClick(pageNum) {
    if (selectedButton && selectedButton === "select") {
      setSelectedPages((prevPages) => {
        if (prevPages.includes(pageNum)) {
          return prevPages.filter((item) => item !== pageNum);
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

  function onDragEnd(result) {
    if (!result.destination) return;

    const reorderedPages = Array.from(selectedPages);
    const [removed] = reorderedPages.splice(result.source.index, 1);
    reorderedPages.splice(result.destination.index, 0, removed);

    setSelectedPages(reorderedPages);
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="selectedPages">
            {(provided) => (
              <div
                className="gridContainer"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {selectedPages.map((pageNum, index) => (
                  <Draggable
                    key={pageNum}
                    draggableId={pageNum.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleSelectionClick(pageNum)}
                        className={`gridItem ${
                          selectedButton === "align" ? "align" : ""
                        } ${selectedPages.includes(pageNum) ? "selected" : ""}`}
                      >
                        <Page width={250} pageNumber={pageNum} />
                        <p>Page Number: {pageNum}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default PdfPages;
