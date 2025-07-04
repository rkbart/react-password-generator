import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordVault from "./components/PasswordVault";
import LogoutButton from "./components/LogoutButton";
import { getPasswordEntries } from "./api/passwords";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access-token")
  );
  const [showLogin, setShowLogin] = useState(true); // 🔁 Toggle between login/signup
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getPasswordEntries();
      setEntries(response.data);
    } catch (err) {
      console.error("Error:", err);
      if (err.response?.status === 401) {
        handleLogout(); // Auto-logout if unauthorized
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchData(); // Fetch entries immediately after login
  };

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    setIsLoggedIn(false);
    setEntries([]); // Clear entries on logout
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  return (
    <div className="main-container h-full">
      {isLoggedIn ? (
        <>
          <div className="flex justify-end p-4">
            <LogoutButton onLogout={handleLogout} />
          </div>
          <PasswordGenerator setEntries={setEntries} fetchData={fetchData} />
          <PasswordVault
            entries={entries}
            loading={loading}
            setEntries={setEntries}
            fetchData={fetchData}
          />
        </>
      ) : showLogin ? (
        <Login onLogin={handleLogin} onToggle={() => setShowLogin(false)} />
      ) : (
        <SignUp onSignUp={handleLogin} onToggle={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;
