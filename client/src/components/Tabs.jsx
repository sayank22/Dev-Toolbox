// src/components/Tabs.jsx

import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "json", label: "JSON Formatter" },
    { id: "base64", label: "Base64 Tool" },
    { id: "history", label: "History" },
    { id: "password", label: "Password Generator" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            px-5 py-2.5 rounded-lg font-medium
            transition-all duration-200
            border
            ${
              activeTab === tab.id
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : `
                  bg-white text-gray-700 border-gray-300
                  hover:bg-gray-100
                  dark:bg-gray-800
                  dark:text-gray-200
                  dark:border-gray-700
                  dark:hover:bg-gray-700
                `
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;