import React, { useEffect, useState } from "react";
import { getPasswordEntries, updatePasswordEntry, deletePasswordEntry } from "../api/passwords";
import { FaEye, FaEyeSlash, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import EditEntryModal from "./EditEntryModal";

const PasswordVault = ({ entries, loading, setEntries }) => {
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [editingEntry, setEditingEntry] = useState(null);
  
  

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEditClick = (entry) => {
    setEditingEntry(entry);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deletePasswordEntry(id);
        setEntries(entries.filter(entry => entry.id !== id));
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to delete entry");
      }
    }
  };

  const handleSave = async (updatedData) => {
    try {
      await updatePasswordEntry(editingEntry.id, updatedData);
      
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id ? { ...entry, ...updatedData } : entry
      ));
      
      setEditingEntry(null);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to update entry");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans bg-gray-300 rounded-b-lg mb-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        My Saved Passwords
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : entries.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 border-b">Application</th>
                <th className="px-4 py-3 border-b">Username</th>
                <th className="px-4 py-3 border-b">Password</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b text-sm text-gray-700">
                    {entry.app_name}
                  </td>
                  <td className="px-4 py-3 border-b text-sm text-gray-700">
                    {entry.username || "-"}
                  </td>
                  <td className="px-4 py-3 border-b text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="truncate">
                        {visiblePasswords[entry.id]
                          ? entry.password
                          : "••••••••"}
                      </span>
                      <button
                        className="text-gray-500 hover:text-gray-800 cursor-pointer"
                        onClick={() => togglePasswordVisibility(entry.id)}
                        aria-label={
                          visiblePasswords[entry.id]
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {visiblePasswords[entry.id] ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b text-sm text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        title="Copy Password"
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText(entry.password)
                        }
                        aria-label="Copy password"
                      >
                        <FaCopy />
                      </button>
                      <button
                        title="edit entry"
                        className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                        aria-label="Edit"
                        onClick={() => handleEditClick(entry)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="delete entry"
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        aria-label="Delete"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          No password entries found.
        </div>
      )}

      {editingEntry && (
        <EditEntryModal
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PasswordVault;
