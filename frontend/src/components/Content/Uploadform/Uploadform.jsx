import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import "./uploadForm.scss";

function Uploadform({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleSelection(event) {
    onFileUpload(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div className="uploadForm">
      <h3>Upload Your PDF HERE</h3>
      <label htmlFor="pdfinput" className="inputForm">
        <div className="uploadIcon btn-primary">
          <FaFileUpload />
        </div>
        <input
          id="pdfinput"
          onChange={handleSelection}
          type="file"
          accept="application/pdf"
        />
      </label>
      {selectedFile && (
        <div className="info">
          <h3>Name: {selectedFile.name}</h3>
          <p>size: {(selectedFile.size / (1024 * 1024)).toFixed(2)}MB</p>
        </div>
      )}
    </div>
  );
}

export default Uploadform;
