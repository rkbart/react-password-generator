import React, { useState } from "react";
import Login from "./components/Login";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordVault from "./components/PasswordVault";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access-token")
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="main-container">
      {isLoggedIn ? (
        <>
          <LogoutButton onLogout={handleLogout} />
          <PasswordGenerator />
          <PasswordVault />
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
