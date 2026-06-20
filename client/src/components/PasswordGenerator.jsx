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

    if (score <= 2)
      return { label: "Weak", className: "text-red-500" };
    if (score <= 4)
      return { label: "Medium", className: "text-yellow-500" };

    return { label: "Strong", className: "text-green-500" };
  };

  const generatePassword = () => {
    let chars = "";

    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      toast.info("Select at least one character type.");
      return;
    }

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let generated = "";

    for (let i = 0; i < length; i++) {
      generated += chars[randomValues[i] % chars.length];
    }

    setPassword(generated);
  };

  const copyPassword = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy password.");
    }
  };

  const strength = getStrength();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Password Generator
      </h2>

      <div className="mb-5">
        <label className="block mb-2 font-medium dark:text-white">
          Password Length: {length}
        </label>

        <input
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 dark:text-white">
        <label>
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={() => setIncludeUpper(!includeUpper)}
            className="mr-2"
          />
          Uppercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeLower}
            onChange={() => setIncludeLower(!includeLower)}
            className="mr-2"
          />
          Lowercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="mr-2"
          />
          Symbols
        </label>
      </div>

      <button
        onClick={generatePassword}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Generate Password
      </button>

      {password && (
        <div className="mt-6">
          <div className="relative">
            <input
              value={password}
              readOnly
              className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white pr-24"
            />

            <button
              onClick={copyPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Copy
            </button>
          </div>

          <p className={`mt-3 font-semibold ${strength.className}`}>
            Strength: {strength.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;