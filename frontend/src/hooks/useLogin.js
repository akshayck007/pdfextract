import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  async function login({ username, password }) {
    const success = handleInputErrors({ username, password });
    if (success) {
      setLoading(true);
      try {
        const response = await axios.post("/api/auth/login", {
          username,
          password,
        });
        const data = response.data;
        if (data.error) throw new Error(response.error);
        localStorage.setItem("user-info", JSON.stringify(data));
        setAuthUser(data);
      } catch (error) {
        return toast.error(error.message);
      }
    }
  }
  return { loading, login };
}

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Fill in all the columns");
    return false;
  }

  return true;
}
