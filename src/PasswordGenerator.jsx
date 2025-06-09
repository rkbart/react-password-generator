import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let charset = "";
    if (includeUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset.charAt(randomIndex);
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h2>Password Generator</h2>

      <label>Password Length: {length}</label>
      <input
        type="range"
        min="4"
        max="32"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUpperCase}
            onChange={(e) => setIncludeUpperCase(e.target.checked)}
          />
          Include Uppercase
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includeLowerCase}
            onChange={(e) => setIncludeLowerCase(e.target.checked)}
          />
          Include Lowercase
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>

      <button onClick={generatePassword} style={{ marginTop: 10 }}>
        Generate Password
      </button>

      {password && (
        <div style={{ marginTop: 20 }}>
          <input
            value={password}
            readOnly
            style={{ width: "80%", padding: 10 }}
          />
          <button onClick={copyToClipboard} style={{ marginLeft: 10 }}>
            <FaCopy />
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
