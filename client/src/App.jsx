import React, { useState } from "react";
import Tabs from "./components/Tabs";
import JsonFormatter from "./components/JsonFormatter";
import Base64Tool from "./components/Base64Tool";
import JsonHistory from "./components/JsonHistory";
import PasswordGenerator from "./components/PasswordGenerator";
import DarkModeToggle from "./components/DarkModeToggle";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  const [activeTab, setActiveTab] = useState("json");

  const renderTabContent = () => {
    switch (activeTab) {
      case "json":
        return <JsonFormatter />;
      case "base64":
        return <Base64Tool />;
      case "history":
        return <JsonHistory />;
      case "password":
        return <PasswordGenerator />;
      default:
        return <JsonFormatter />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Developer Toolbox
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A collection of essential developer utilities including JSON
              formatting, Base64 encoding/decoding, password generation, and
              history tracking.
            </p>
          </div>

          {/* Navigation Tabs */}
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Content */}
          <div className="mt-8">
            {renderTabContent()}
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex justify-center mt-8">
            <DarkModeToggle />
          </div>

          {/* <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            Built with React, Express, MongoDB & Tailwind CSS
          </div> */}

        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;