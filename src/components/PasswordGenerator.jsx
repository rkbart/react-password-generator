import React, { useState } from "react";
import { FaCopy, FaSave } from "react-icons/fa";
import { savePasswordEntry } from "../api/passwords";
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  // Password configuration state
  const [length, setLength] = useState(12);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Password and metadata state
  const [password, setPassword] = useState("");
  const [appName, setAppName] = useState("");
  const [username, setUsername] = useState("");

  const generatePassword = () => {
    let charset = "";
    if (includeUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      alert("Please select at least one character type");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset.charAt(randomIndex);
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (!password) {
      alert("No password to copy");
      return;
    }
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const handleSave = async () => {
    if (!password || !appName) {
      alert("Please generate a password and enter an app name");
      return;
    }

    try {
      await savePasswordEntry({ password, app_name: appName, username });
      alert("Password saved successfully!");
      // Optional: Clear form after save
      // setAppName("");
      // setUsername("");
    } catch (error) {
      alert("Error saving password");
      console.error("Save error:", error);
    }
  };

  return (
    <div className="password-generator-container">
      <h2 className="password-generator-title">Password Generator</h2>

      <div className="password-generator-content">
        {/* Password Configuration - Left Card */}
        <div className="config-card">
          <div className="card-body">
            <div className="form-group">
              <label>Password Length: {length}</label>
              <input
                type="range"
                min="4"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeUpperCase}
                  onChange={(e) => setIncludeUpperCase(e.target.checked)}
                />
                Include Uppercase Letters
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeLowerCase}
                  onChange={(e) => setIncludeLowerCase(e.target.checked)}
                />
                Include Lowercase Letters
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols
              </label>
            </div>

            <button onClick={generatePassword} className="generate-btn">
              Generate Password
            </button>
          </div>
        </div>

        {/* Generated Password - Right Card */}
        {password && (
          <div className="password-card">
            <div className="card-body">
              <div className="password-display">
                <input
                  type="text"
                  value={password}
                  readOnly
                  aria-label="Generated password"
                />
                <button type="button" onClick={copyToClipboard}>
                  <FaCopy /> Copy
                </button>
              </div>

              <div className="form-group">
                <label>Application/Service Name</label>
                <input
                  type="text"
                  placeholder="e.g. Google, Facebook"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Username/Email (Optional)</label>
                <input
                  type="text"
                  placeholder="Your username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <button
                onClick={handleSave}
                className="save-btn"
                disabled={!password || !appName}
              >
                <FaSave /> Save Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;