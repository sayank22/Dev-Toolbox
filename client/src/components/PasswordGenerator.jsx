// src/components/PasswordGenerator.jsx

import React, { useState } from "react";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const getStrength = () => {
    let score = 0;

    if (length >= 8) score++;
    if (length >= 12) score++;
    if (includeUpper) score++;
    if (includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) {
      return {
        label: "Weak",
        className: "text-red-500",
        barClass: "bg-red-500 w-1/3",
      };
    }

    if (score <= 4) {
      return {
        label: "Medium",
        className: "text-yellow-500",
        barClass: "bg-yellow-500 w-2/3",
      };
    }

    return {
      label: "Strong",
      className: "text-green-500",
      barClass: "bg-green-500 w-full",
    };
  };

  const generatePassword = () => {
    let chars = "";

    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      toast.warning("Select at least one character type");
      return;
    }

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let generated = "";

    for (let i = 0; i < length; i++) {
      generated += chars[randomValues[i] % chars.length];
    }

    setPassword(generated);
    toast.success("Password generated");
  };

  const copyPassword = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied");
    } catch {
      toast.error("Failed to copy password");
    }
  };

  const strength = getStrength();

  return (
    <div className="app-card p-6">
      <div className="mb-5">
        <h2 className="section-title">
          Password Generator
        </h2>

        <p className="section-subtitle mt-1">
          Generate strong and secure passwords instantly.
        </p>
      </div>

      {/* Length */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Password Length
        </label>

        <div className="flex gap-4 items-center">
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) =>
              setLength(Number(e.target.value))
            }
            className="flex-1"
          />

          <input
            type="number"
            min="4"
            max="64"
            value={length}
            onChange={(e) =>
              setLength(Number(e.target.value))
            }
            className="app-input w-24 p-2 text-center"
          />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={() =>
              setIncludeUpper(!includeUpper)
            }
          />
          Uppercase
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeLower}
            onChange={() =>
              setIncludeLower(!includeLower)
            }
          />
          Lowercase
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() =>
              setIncludeNumbers(!includeNumbers)
            }
          />
          Numbers
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() =>
              setIncludeSymbols(!includeSymbols)
            }
          />
          Symbols
        </label>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generatePassword}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              generatePassword();
            }
          }}
          className="btn-primary"
        >
          Generate Password
        </button>

        {password && (
          <button
            onClick={generatePassword}
            className="btn-secondary"
          >
            🔄 Regenerate
          </button>
        )}
      </div>

      {/* Output */}
      {password && (
        <div className="mt-6">
          <div className="flex gap-2 mb-3">
            <input
              value={password}
              readOnly
              className="app-input font-mono flex-1"
            />

            <button
              onClick={copyPassword}
              className="btn-secondary"
            >
              📋 Copy
            </button>
          </div>

          {/* Strength */}
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strength.barClass}`}
              />
            </div>

            <p
              className={`mt-2 font-medium ${strength.className}`}
            >
              Strength: {strength.label}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="app-surface p-3 text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Length
              </div>

              <div className="font-semibold">
                {password.length}
              </div>
            </div>

            <div className="app-surface p-3 text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Numbers
              </div>

              <div className="font-semibold">
                {includeNumbers ? "Yes" : "No"}
              </div>
            </div>

            <div className="app-surface p-3 text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Symbols
              </div>

              <div className="font-semibold">
                {includeSymbols ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;