import React, { useEffect, useState } from "react";
import axios from "axios";

const JsonHistory = () => {
  const [jsons, setJsons] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/json-history`);
        setJsons(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to load history. Please try again.");
      } finally {
        setLoading(false); 
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-blue-500 font-semibold">Loading history...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 dark:text-amber-500">Formatted JSON History</h2>
      {jsons.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <ul className="space-y-4">
          {jsons.map((item) => (
            <li
              key={item._id}
              className="bg-gray-200 p-2 rounded font-mono text-sm whitespace-pre-wrap dark:bg-gray-600"
            >
              {item.formattedJson}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JsonHistory;
