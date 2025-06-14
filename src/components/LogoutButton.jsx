import React from "react";
import { logout } from "../api/auth";
import { CiLogout } from "react-icons/ci";

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

  const uid = localStorage.getItem("uid");
  if (!uid) {
    return null; // Don't render if not logged in
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-lg semibold"> {uid}</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
        title="Logout"
      >
        <CiLogout />
      </button>
    </div>
  );
};

export default LogoutButton;
