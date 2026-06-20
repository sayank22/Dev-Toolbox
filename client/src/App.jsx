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
<div className="relative mb-8">

  {/* Dark Mode Toggle */}
  <div className="flex justify-center md:absolute md:top-0 md:right-0 mb-4 md:mb-0">
    <DarkModeToggle />
  </div>

  <div className="text-center">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
      Developer Toolbox
    </h1>

    <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      A collection of essential developer utilities including JSON
      formatting, Base64 encoding/decoding, password generation, and
      history tracking.
    </p>
  </div>

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


          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
  
  <a
    href="https://sayan-kundu-portfolio.netlify.app"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-secondary bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:from-teal-600 hover:to-purple-600"
  >
    Built by Sayan Kundu
  </a>

  <a
    href="https://digitalheroesco.com"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-primary bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
  >
    Built for Digital Heroes
  </a>

  <a
    href="mailto:sayank10023@gmail.com"
     className="
    text-sm
    text-gray-600
    dark:text-gray-400
    hover:text-blue-500
    transition-colors
  "
  >
    sayank10023@gmail.com
  </a>

</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;