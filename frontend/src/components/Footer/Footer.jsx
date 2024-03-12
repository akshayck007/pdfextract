import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <p className="credits">&copy;pdfextract.com</p>
      <div className="social">
        <a href="#">
          <FaFacebook /> facebook
        </a>
        <a href="#">
          <FaInstagram /> instagram
        </a>
        <a href="#">
          <FaTwitter /> twitter
        </a>
      </div>
    </div>
  );
}

export default Footer;
