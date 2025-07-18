import React, { useState } from 'react';
import Tabs from './components/Tabs';
import JsonFormatter from './components/JsonFormatter';
import Base64Tool from './components/Base64Tool';
import JsonHistory from './components/JsonHistory';
import DarkModeToggle from './components/DarkModeToggle';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const [activeTab, setActiveTab] = useState('json');

  const renderTabContent = () => {
    if (activeTab === 'json') return <JsonFormatter />;
    if (activeTab === 'base64') return <Base64Tool />;
    if (activeTab === 'history') return <JsonHistory />;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-200 p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-4">Dev Toolbox</h1>
      <DarkModeToggle />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
    </ThemeProvider>
  );
};


export default App;
  