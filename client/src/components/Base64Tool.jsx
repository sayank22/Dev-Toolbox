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

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    toast.success("Cleared");
  };

  const handleUseAsInput = () => {
    setInput(output);
    toast.success("Result moved to input");
  };

  const handleDownload = () => {
    const blob = new Blob([output], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
      mode === "encode"
        ? "encoded.txt"
        : "decoded.txt";

    a.click();

    URL.revokeObjectURL(url);

    toast.success("Downloaded");
  };

  const stats = output
    ? {
        chars: output.length,
        size: (output.length / 1024).toFixed(2),
      }
    : null;

  return (
    <div className="app-card p-6">
      <div className="mb-5">
        <h2 className="section-title">
          Base64 Tool
        </h2>

        <p className="section-subtitle mt-1">
          Encode plain text to Base64 or decode Base64 back to readable text.
        </p>
      </div>

      {/* Mode Switch */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setMode("encode")}
          className={
            mode === "encode"
              ? "btn-primary"
              : "btn-secondary"
          }
        >
          Encode
        </button>

        <button
          onClick={() => setMode("decode")}
          className={
            mode === "decode"
              ? "btn-primary"
              : "btn-secondary"
          }
        >
          Decode
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            handleConvert();
          }
        }}
        rows={8}
        placeholder={
          mode === "encode"
            ? "Enter text to encode..."
            : "Enter Base64 text to decode..."
        }
        className="app-input font-mono text-sm resize-none"
      />

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={handleConvert}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading
            ? "Converting..."
            : mode === "encode"
            ? "Encode"
            : "Decode"}
        </button>

        <button
          onClick={handleClear}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Tip: Press Ctrl + Enter to convert.
      </p>

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
          <div className="flex flex-wrap justify-between items-center gap-3 mb-3">
            <h3 className="font-medium">
              Result
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

          <button
            onClick={handleUseAsInput}
            className="btn-secondary mt-3"
          >
            ↻ Use Result as Input
          </button>

          {stats && (
            <div className="grid grid-cols-2 gap-3 mt-4">
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

export default Base64Tool;