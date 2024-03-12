import React, { useEffect } from "react";
import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Library from "./components/Content/Library/Library";

function App() {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser && window.location.pathname.includes("/library")) {
      navigate("/");
    }
  }, [authUser, navigate]);
  return (
    <div className="app">
      <div className="container">
        <Navbar />
        <div className="contentContainer">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route
              path="/signup"
              element={authUser ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={authUser ? <Navigate to="/" /> : <Login />}
            />
            {authUser && (
              <Route
                path={`/${authUser.userId}/library`}
                element={<Library />}
              />
            )}
          </Routes>
          <Toaster />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
