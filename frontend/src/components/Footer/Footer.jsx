import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <p className="credits">&copy;pdfextract.com</p>
      <div className="social">
        <a href="#">
          <FaFacebook /> <span>facebook</span>
        </a>
        <a href="#">
          <FaInstagram /> <span>instagram</span>
        </a>
        <a href="#">
          <FaTwitter />
          <span>twitter</span>
        </a>
      </div>
    </div>
  );
}

export default Footer;
