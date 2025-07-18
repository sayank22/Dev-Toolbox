import React, { useState } from 'react';
import axios from 'axios';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/format-json`, {
        text: input,
      });
      setOutput(res.data.result);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid JSON. Please check your input.');
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-sky-200 max-w-4xl mx-auto">
      <textarea
        rows="10"
        className="w-full p-3 border rounded mb-4"
        placeholder="Enter raw JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleFormat}
      >
        Format JSON
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {output && (
        <div className="mt-4 relative">
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto font-mono text-sm whitespace-pre-wrap">
          {output}
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-sm px-2 py-1 rounded"
          >
            📋 Copy
          </button>
        </pre>
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;
