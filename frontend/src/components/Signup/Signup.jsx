import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.scss";
import useSignup from "../../hooks/useSignup";

function Signup() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const { loading, signup } = useSignup();
  async function handleSubmission(e) {
    e.preventDefault();
    await signup(inputs);
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmission} className="signupForm" action="">
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
        <div>
          <label htmlFor="cpassinput">Confirm Password :</label>
          <input
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
            type="password"
            id="cpassinput"
          />
        </div>
        <div>
          <label htmlFor="emailinput">Email :</label>
          <input
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            type="email"
            id="emailinput"
          />
        </div>
        <button className="btn-primary">Sign Up</button>
        <p>
          Already have an account ?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
