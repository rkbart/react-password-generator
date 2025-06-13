import React from "react";
import { logout, getAuthHeaders } from "../api/auth";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      // Get headers before logging out
      const headers = getAuthHeaders();
      await logout(headers);

      // Clear tokens
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
      
    >
      Logout
    </button>
  );
};

export default LogoutButton;
