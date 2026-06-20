import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormat = async () => {
    if (!input.trim()) {
      toast.error("Please enter JSON first");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/format-json`,
        {
          text: input,
        }
      );

      setOutput(res.data.result);
      toast.success("JSON formatted successfully");
    } catch {
      setError("Invalid JSON. Please check your input.");
      toast.error("Invalid JSON format");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div
      className="
        bg-white
        dark:bg-gray-900
        border
        border-gray-200
        dark:border-gray-700
        rounded-xl
        shadow-sm
        p-6
      "
    >
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          JSON Formatter
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Format and beautify raw JSON instantly.
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        placeholder='Paste JSON here... e.g. {"name":"Sayan"}'
        className="
          w-full
          p-4
          rounded-lg
          border
          border-gray-300
          dark:border-gray-700
          bg-gray-50
          dark:bg-gray-800
          text-gray-900
          dark:text-gray-100
          font-mono
          text-sm
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleFormat}
          disabled={loading}
          className="
            bg-blue-600
            hover:bg-blue-700
            disabled:opacity-50
            text-white
            px-5
            py-2.5
            rounded-lg
            font-medium
            transition-all
          "
        >
          {loading ? "Formatting..." : "Format JSON"}
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-3 mt-5">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>

          <span className="text-sm text-blue-600 dark:text-blue-400">
            Formatting JSON...
          </span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {output && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Formatted Output
            </h3>

            <button
              onClick={handleCopy}
              className="
                bg-gray-200
                hover:bg-gray-300
                dark:bg-gray-700
                dark:hover:bg-gray-600
                px-3
                py-1.5
                rounded-lg
                text-sm
                transition-all
              "
            >
              📋 Copy
            </button>
          </div>

          <pre
            className="
              bg-gray-50
              dark:bg-gray-800
              border
              border-gray-200
              dark:border-gray-700
              rounded-lg
              p-4
              overflow-x-auto
              font-mono
              text-sm
              whitespace-pre-wrap
              text-gray-800
              dark:text-gray-100
            "
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;