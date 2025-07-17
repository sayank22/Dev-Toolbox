import React, { useState } from 'react';
import axios from 'axios';

const Base64Tool = () => {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = async () => {
    try {
      const endpoint =
        mode === 'encode'
          ? 'http://localhost:5000/api/encode'
          : 'http://localhost:5000/api/decode';

      const res = await axios.post(endpoint, { text: input });
      setOutput(res.data.result);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Conversion failed');
      setOutput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
      </div>

      <textarea
        rows="8"
        className="w-full p-3 border rounded mb-4"
        placeholder={
          mode === 'encode' ? 'Enter plain text...' : 'Enter base64 string...'
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleConvert}
      >
        {mode === 'encode' ? 'Encode' : 'Decode'}
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

export default Base64Tool;
