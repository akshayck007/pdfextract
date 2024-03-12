import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  async function signup({ username, password, confirmPassword, email }) {
    const success = handleInputErrors({
      username,
      password,
      confirmPassword,
      email,
    });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          username,
          password,
          confirmPassword,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);

      //localStorage
      localStorage.setItem("user-info", JSON.stringify(data));
      //context
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { signup, loading };
}

export default useSignup;

function handleInputErrors({ username, password, confirmPassword, email }) {
  if (!username || !password || !confirmPassword || !email) {
    toast.error("Please fill in all the columns");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Confirm password not matching");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password length should be atleast 6");
    return false;
  }

  return true;
}
