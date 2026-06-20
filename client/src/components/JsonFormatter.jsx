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

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    toast.success("Cleared");
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();

    URL.revokeObjectURL(url);

    toast.success("Downloaded JSON");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setInput(event.target.result);
      toast.success("JSON file loaded");
    };

    reader.readAsText(file);
  };

  const stats = output
    ? {
        lines: output.split("\n").length,
        chars: output.length,
        size: (output.length / 1024).toFixed(2),
      }
    : null;

  return (
    <div className="app-card p-6">
      <div className="mb-5">
        <h2 className="section-title">JSON Formatter</h2>

        <p className="section-subtitle mt-1">
          Format and beautify raw JSON instantly.
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            handleFormat();
          }
        }}
        rows={10}
        placeholder='Paste JSON here... e.g. {"name":"Sayan"}'
        className="app-input font-mono text-sm resize-none"
      />

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={handleFormat}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "Formatting..." : "Format JSON"}
        </button>

        <button
          onClick={handleClear}
          className="btn-secondary"
        >
          Clear
        </button>

        <label className="btn-secondary cursor-pointer">
          Upload JSON
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Tip: Press Ctrl + Enter to format quickly.
      </p>

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
          <div className="flex flex-wrap justify-between items-center gap-3 mb-3">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Formatted Output
            </h3>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="btn-secondary"
              >
                📋 Copy
              </button>

              <button
                onClick={handleDownload}
                className="btn-secondary"
              >
                ⬇ Download
              </button>
            </div>
          </div>

          <pre className="output-box">
            {output}
          </pre>

          {stats && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="app-surface p-3 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Lines
                </div>
                <div className="font-semibold">
                  {stats.lines}
                </div>
              </div>

              <div className="app-surface p-3 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Characters
                </div>
                <div className="font-semibold">
                  {stats.chars}
                </div>
              </div>

              <div className="app-surface p-3 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Size
                </div>
                <div className="font-semibold">
                  {stats.size} KB
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;