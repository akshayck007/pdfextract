import React from "react";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { logout } = useLogout();
  return (
    <button onClick={logout} className="btn-secondary">
      Logout
    </button>
  );
}

export default LogoutButton;
