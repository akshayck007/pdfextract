import React, { useEffect, useState } from "react";
import { Document, pdfjs, Page } from "react-pdf";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import "./library.scss";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Library() {
  const [library, setLibrary] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    async function getPdfs() {
      try {
        const formData = new FormData();
        formData.append("userId", authUser.userId);
        const response = await axios.post("/api/pdf/library", formData);
        const data = response.data;
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data.library);
        setLibrary(data.library);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getPdfs();
  }, [authUser.userId]);
  return (
    <div className="library">
      {library ? (
        <>
          {library.map((item, index) => (
            <div key={index} className="libfile">
              <div className="thumb">
                <Document file={`${item.dirUrl}`}>
                  <Page width={120} pageNumber={1} />
                </Document>
              </div>
              <div className="pdf-info">
                <p>{item.pdfTitle}</p>
                <a className="btn-secondary" href={item.dirUrl}>
                  Download
                </a>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h3>No Pdf Files</h3>
      )}
    </div>
  );
}

export default Library;
