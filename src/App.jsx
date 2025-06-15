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
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPasswordEntries();
        setEntries(response.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
      {isLoggedIn ? (
        <>
          <LogoutButton onLogout={handleLogout} />
          <PasswordGenerator setEntries={setEntries} />
          <PasswordVault entries={entries} loading={loading} setEntries={setEntries} />
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
