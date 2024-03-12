import React from "react";
import useLogout from "../../hooks/useLogout";
import { CiLogout } from "react-icons/ci";

function LogoutButton() {
  const { logout } = useLogout();
  return (
    <button onClick={logout} className="logoutbtn btn-secondary">
      <div className="text">Logout</div>
      <span className="logoutIcon">
        <CiLogout />
      </span>
    </button>
  );
}

export default LogoutButton;
