import React from 'react';

// Tabs.jsx
const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => setActiveTab("json")}
        className={`px-4 py-2 rounded transition-all 
          ${activeTab === "json" 
            ? "bg-blue-500 text-white" 
            : "bg-teal-400 text-white hover:bg-sky-400"}`}
      >
        JSON Formatter
      </button>

      <button
        onClick={() => setActiveTab("base64")}
        className={`px-4 py-2 rounded transition-all 
          ${activeTab === "base64" 
            ? "bg-blue-500 text-white" 
            : "bg-purple-400 text-white hover:bg-sky-400"}`}
      >
        Base64 Tool
      </button>

      <button
        onClick={() => setActiveTab("history")}
        className={`px-4 py-2 rounded transition-all 
          ${activeTab === "history" 
            ? "bg-blue-500 text-white" 
            : "bg-rose-400 text-white hover:bg-sky-400"}`}
      >
        History
      </button>
    </div>
  );
};

export default Tabs;
