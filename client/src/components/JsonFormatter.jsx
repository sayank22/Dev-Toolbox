import React, { useState } from 'react';
import axios from 'axios';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/format-json', {
        text: input,
      });
      setOutput(res.data.result);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setOutput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
        <pre className="mt-4 p-4 bg-gray-200 rounded overflow-x-auto">
          {output}
        </pre>
      )}
    </div>
  );
};

export default JsonFormatter;
