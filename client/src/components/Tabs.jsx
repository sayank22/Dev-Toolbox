import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        className={`px-4 py-2 rounded ${
          activeTab === 'json' ? 'bg-blue-600 text-white' : 'bg-white border'
        }`}
        onClick={() => setActiveTab('json')}
      >
        JSON Formatter
      </button>
      <button
        className={`px-4 py-2 rounded ${
          activeTab === 'base64' ? 'bg-blue-600 text-white' : 'bg-white border'
        }`}
        onClick={() => setActiveTab('base64')}
      >
        Base64 Encoder/Decoder
      </button>
    </div>
  );
};

export default Tabs;
