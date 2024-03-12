import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  async function logout() {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/logout");
      if (response.error) {
        throw new Error(response.error);
      }
      localStorage.removeItem("user-info");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, logout };
}

export default useLogout;
