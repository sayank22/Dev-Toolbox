import React from 'react';
import { useDarkMode } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode(); // ✅ FIXED: Call the hook

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)} 
      className="px-6 py-2 bg-gray-800 dark:bg-gray-800 text-yellow-600 dark:text-orange-400 rounded-md transition-all"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
