import React from 'react';
import { useDarkMode } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode(); 

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)} 
      className="px-6 py-2 bg-gray-800 dark:bg-gray-600 text-yellow-600 dark:text-orange-400 rounded-md transition-all hover:bg-yellow-800"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
