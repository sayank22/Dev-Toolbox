import React from 'react';

// Tabs.jsx
const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => setActiveTab("json")}
        className={`px-4 py-2 rounded ${activeTab === "json" ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}
      >
        JSON Formatter
      </button>
      <button
        onClick={() => setActiveTab("base64")}
        className={`px-4 py-2 rounded ${activeTab === "base64" ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}
      >
        Base64 Tool
      </button>
      <button
        onClick={() => setActiveTab("history")}
        className={`px-4 py-2 rounded ${activeTab === "history" ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}
      >
        History
      </button>
    </div>
  );
};

export default Tabs;
