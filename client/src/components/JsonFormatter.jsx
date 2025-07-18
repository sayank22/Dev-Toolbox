import React, { useState } from "react";
import axios from "axios";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/format-json`, { text: input });
      setOutput(res.data.result);
      setError("");
    } catch (err) {
      setError("Invalid JSON. Please check your input.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">JSON Formatter</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Paste your JSON here..."
        className="w-full p-2 border rounded mb-4 font-mono"
      />
      <button
        onClick={handleFormat}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Format
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      {output && (
        <div className="mt-4 relative">
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto font-mono text-sm whitespace-pre-wrap">{output}</pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-sm px-2 py-1 rounded"
          >
            📋 Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;
