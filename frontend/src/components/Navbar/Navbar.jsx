import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "./LogoutButton";
import { IoLibrary } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

function Navbar() {
  const { authUser } = useAuthContext();
  return (
    <React.Fragment>
      <div className="fillerNav"></div>
      <div className="navbar">
        <div className="logoContainer">
          <Link to="/">
            <h2>
              PDF<span>EXTRACT</span>
            </h2>
          </Link>
        </div>
        <div className="profile">
          {authUser ? (
            <React.Fragment>
              <div className="profileInfo">
                <p>{authUser.username}</p>
                <Link to={`/${authUser.userId}/library`}>
                  <IoLibrary />
                </Link>
                <Link to="/">
                  <FaHome />
                </Link>
              </div>
              <LogoutButton />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/login" className="loginBtn btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="signupBtn btn-primary">
                Sign Up
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
