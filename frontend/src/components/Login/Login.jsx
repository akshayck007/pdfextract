import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { loading, login } = useLogin();
  async function handleSubmission(e) {
    e.preventDefault();
    await login(inputs);
  }
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmission} className="loginForm" action="">
        <div>
          <label htmlFor="unameinput">Username :</label>
          <input
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            type="text"
            id="unameinput"
          />
        </div>

        <div>
          <label htmlFor="passinput">Password :</label>
          <input
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            type="password"
            id="passinput"
          />
        </div>

        <button className="btn-secondary">Login</button>
        <p>
          Don&apos;t have an account ?
          <span>
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
