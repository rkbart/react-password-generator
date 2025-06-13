import React, { useState } from "react";
import { FaCopy, FaSave } from "react-icons/fa";
import { savePasswordEntry } from "../api/passwords";

const PasswordGenerator = () => {
  const [length, setLength] = useState(6);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

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
    } catch (error) {
      alert("Error saving password");
      console.error("Save error:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5 font-sans">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        Password Generator
      </h2>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Config Card */}
        <div className="flex-1 bg-white rounded-lg shadow p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password Length: {length}
              </label>
              <input
                type="range"
                min="4"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="flex items-center mb-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={includeUpperCase}
                  onChange={(e) => setIncludeUpperCase(e.target.checked)}
                />
                Include Uppercase Letters
              </label>
              <label className="flex items-center mb-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={includeLowerCase}
                  onChange={(e) => setIncludeLowerCase(e.target.checked)}
                />
                Include Lowercase Letters
              </label>
              <label className="flex items-center mb-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers
              </label>
              <label className="flex items-center cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols
              </label>
            </div>

            <button
              onClick={generatePassword}
              className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              Generate Password
            </button>
          </div>
        </div>

        {/* Password Card */}
        {password && (
          <div className="flex-1 bg-white rounded-lg shadow p-5">
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                >
                  <FaCopy /> Copy
                </button>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Application/Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google, Facebook"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Username/Email (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Your username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!password || !appName}
                className={`w-full mt-2 px-4 py-2 rounded text-white flex items-center justify-center gap-2 ${
                  !password || !appName
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
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
