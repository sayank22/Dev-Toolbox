import React, { useState } from "react";
import axios from "axios";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormat = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/format-json`, {
        text: input,
      });
      setOutput(res.data.result);
    } catch (err) {
      setError("Invalid JSON. Please check your input.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-white">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Paste your JSON here..."
        className="w-full p-2 border rounded mb-4 font-mono dark:text-amber-800 dark:bg-gray-900"
      />

      <button
        onClick={handleFormat}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Formatting..." : "Format"}
      </button>

      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-blue-500 font-semibold">Formatting JSON...</span>
        </div>
      )}

      {error && <div className="text-red-500 mt-2">{error}</div>}

      {output && (
        <div className="mt-4 relative">
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto font-mono text-sm whitespace-pre-wrap">
            {output}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-sm px-2 py-1 rounded dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            📋 Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;
