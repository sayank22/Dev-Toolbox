import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("encode");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!input.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const endpoint =
        mode === "encode"
          ? `${import.meta.env.VITE_API_URL}/api/encode`
          : `${import.meta.env.VITE_API_URL}/api/decode`;

      const res = await axios.post(endpoint, {
        text: input,
      });

      setOutput(res.data.result);

      toast.success(
        mode === "encode"
          ? "Text encoded successfully"
          : "Text decoded successfully"
      );
    } catch {
      setError("Conversion failed. Invalid input.");
      toast.error("Conversion failed");
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
          Base64 Tool
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Encode plain text to Base64 or decode Base64 back to readable text.
        </p>
      </div>

      {/* Mode Switch */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setMode("encode")}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${
              mode === "encode"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          Encode
        </button>

        <button
          onClick={() => setMode("decode")}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${
              mode === "decode"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          Decode
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder={
          mode === "encode"
            ? "Enter text to encode..."
            : "Enter Base64 text to decode..."
        }
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
          onClick={handleConvert}
          disabled={loading}
          className="
            bg-green-600
            hover:bg-green-700
            disabled:opacity-50
            text-white
            px-5
            py-2.5
            rounded-lg
            font-medium
            transition-all
          "
        >
          {loading
            ? "Converting..."
            : mode === "encode"
            ? "Encode"
            : "Decode"}
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-3 mt-5">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>

          <span className="text-sm text-green-600 dark:text-green-400">
            Processing...
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
              Result
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

export default Base64Tool;