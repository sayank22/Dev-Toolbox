import React from "react";
import { useDarkMode } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        px-4 py-2
        rounded-lg
        border
        border-gray-300
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        text-gray-700
        dark:text-gray-200
        hover:bg-gray-100
        dark:hover:bg-gray-700
        transition-all
        duration-200
        shadow-sm
      "
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;