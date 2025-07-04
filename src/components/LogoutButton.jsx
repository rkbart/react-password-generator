import React from "react";
import { logout } from "../api/auth";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await logout(); // headers now handled via axios interceptors
      // Clear stored auth tokens manually after logout
      localStorage.removeItem("access-token");
      localStorage.removeItem("client");
      localStorage.removeItem("uid");

      if (onLogout) onLogout();
      alert("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed", err);
      alert("Failed to log out.");
    }
  };

  return (
    <>
    <div className= "flex items-center gap-3.5">
      <div className="flex items-center gap-2 font-semibold">
        <FaUser /> {localStorage.getItem("uid")}
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
        title="Logout"
        >
        <CiLogout />Logout 
      </button>
    </div>
    </>
    
  );
};

export default LogoutButton;
