import React, { useEffect, useState } from "react";
import { getPasswordEntries } from "../api/passwords";
import { FaEye, FaEyeSlash, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import "./PasswordVault.css";

const PasswordVault = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState({});

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

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="password-vault">
      <h2 className="vault-header">My Saved Passwords</h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : entries.length > 0 ? (
        <div className="vault-table-container">
          <table className="vault-table">
            <thead>
              <tr>
                <th>Application</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.app_name}</td>
                  <td>{entry.username || "-"}</td>
                  <td className="password-cell">
                    {visiblePasswords[entry.id] ? (
                      <span className="password-text">{entry.password}</span>
                    ) : (
                      <span className="password-mask">••••••••</span>
                    )}
                    <button
                      className="icon-btn visibility-btn"
                      onClick={() => togglePasswordVisibility(entry.id)}
                      aria-label={
                        visiblePasswords[entry.id]
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {visiblePasswords[entry.id] ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
                      className="reveal-btn"
                      onClick={() =>
                        navigator.clipboard.writeText(entry.password)
                      }
                    >
                      <FaCopy />
                    </button>
                  </td>
                  <td>
                    <button className="action-btn edit-btn">
                      <FaEdit />
                    </button>
                    <button className="action-btn delete-btn">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-entries">No password entries found.</div>
      )}
    </div>
  );
};

export default PasswordVault;
