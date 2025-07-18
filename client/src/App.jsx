import React, { useState } from 'react';
import Tabs from './components/Tabs';
import JsonFormatter from './components/JsonFormatter';
import Base64Tool from './components/Base64Tool';
import JsonHistory from './components/JsonHistory';

const App = () => {
  const [activeTab, setActiveTab] = useState('json');

  const renderTabContent = () => {
    if (activeTab === 'json') return <JsonFormatter />;
    if (activeTab === 'base64') return <Base64Tool />;
    if (activeTab === 'history') return <JsonHistory />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Dev Toolbox</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
