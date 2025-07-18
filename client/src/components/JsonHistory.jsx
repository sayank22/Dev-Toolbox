// JsonHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const JsonHistory = () => {
  const [jsons, setJsons] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/json-history`);
        setJsons(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to load history. Please try again.");
      }
    };

    fetchHistory();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-amber-900">Formatted JSON History</h2>
      {jsons.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <ul className="space-y-4">
          {jsons.map((item) => (
            <li key={item._id} className="bg-gray-200 p-2 rounded font-mono text-sm whitespace-pre-wrap dark:bg-gray-600">
              {item.formattedJson}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JsonHistory;
