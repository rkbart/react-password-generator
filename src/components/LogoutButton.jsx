import React from "react";
import { logout } from "../api/auth";

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
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
