import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordVault from "./components/PasswordVault";
import LogoutButton from "./components/LogoutButton";
import { getPasswordEntries } from './api/passwords';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access-token")
  );

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
    <div className="main-container bg-gray-300">
      {isLoggedIn ? (
        <>
          <div className = "flex justify-end p-4 ">
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
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
