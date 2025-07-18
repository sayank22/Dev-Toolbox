import React, { useState } from "react";
import axios from "axios";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("encode");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const endpoint =
        mode === "encode"
          ? `${import.meta.env.VITE_API_URL}/api/encode`
          : `${import.meta.env.VITE_API_URL}/api/decode`;

      const res = await axios.post(endpoint, { text: input });
      setOutput(res.data.result);
    } catch (err) {
      setError("Conversion failed. Invalid input.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-semibold mb-4">
        Base64 {mode === "encode" ? "Encoder" : "Decoder"}
      </h2>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded transition ${
            mode === "encode"
              ? "bg-blue-600 text-white"
              : "bg-gray-400 dark:bg-gray-600 hover:bg-sky-400"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded transition ${
            mode === "decode"
              ? "bg-blue-600 text-white"
              : "bg-gray-400 dark:bg-gray-600 hover:bg-sky-400"
          }`}
        >
          Decode
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        placeholder="Enter text here..."
        className="w-full p-2 border rounded mb-4 font-mono dark:text-amber-800 dark:bg-gray-900"
      />

      <button
        onClick={handleConvert}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
          <span className="ml-3 text-green-600 font-medium">Converting...</span>
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
            className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm px-2 py-1 rounded"
          >
            📋 Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default Base64Tool;
