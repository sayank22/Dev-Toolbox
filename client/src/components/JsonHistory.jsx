import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const JsonHistory = () => {
  const [jsons, setJsons] = useState([]);
  const [filteredJsons, setFilteredJsons] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/json-history`
      );

      setJsons(res.data);
      setFilteredJsons(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load history.");
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const filtered = jsons.filter((item) =>
      item.formattedJson
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredJsons(filtered);
  }, [search, jsons]);

  const handleCopy = async (json) => {
    try {
      await navigator.clipboard.writeText(json);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = (json, id) => {
    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `history-${id}.json`;

    a.click();

    URL.revokeObjectURL(url);

    toast.success("Downloaded");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/json-history/${id}`
      );

      const updatedJsons = jsons.filter((item) => item._id !== id);
      setJsons(updatedJsons);
      setFilteredJsons((prev) => prev.filter((item) => item._id !== id));

      toast.success("History entry deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete history entry");
    }
  };

  const totalEntries = useMemo(
    () => jsons.length,
    [jsons]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>

        <span className="ml-3 text-blue-500 font-medium">
          Loading history...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
        {error}
      </div>
    );
  }

  const handleClearAll = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete all history entries?"
  );

  if (!confirmed) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/json-history`
    );

    setJsons([]);
    setFilteredJsons([]);

    toast.success("History cleared");
  } catch (err) {
    console.error(err);
    toast.error("Failed to clear history");
  }
};

  return (
    <div className="app-card p-6">
      <div className="flex flex-wrap justify-between gap-4 items-center mb-5">
        <div>
          <h2 className="section-title">
            JSON History
          </h2>

          <p className="section-subtitle mt-1">
            Previously formatted JSON entries.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          className="btn-secondary"
        >
          🔄 Refresh
        </button>

        <button
        onClick={handleClearAll}
        className="btn-secondary bg-red-500 text-white border-red-500 hover:bg-red-600"
        >
          🗑️ Delete All
          </button>
      </div>

      <div className="flex mb-4">
  <input
    type="text"
    placeholder="Search history..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      flex-1
      p-4
      rounded-l-lg
      border
      border-gray-300
      dark:border-gray-700
      bg-gray-50
      dark:bg-gray-800
      text-gray-900
      dark:text-gray-100
      focus:outline-none
    "
  />

  <button
    onClick={() => {
      setSearch("");
      toast.success("Search cleared");
    }}
    className="
      px-4
      rounded-r-lg
      border-y
      border-r
      border-gray-300
      dark:border-gray-700
      bg-blue-600
      hover:bg-blue-700
      text-white
      transition-all
    "
  >
    Clear
  </button>
</div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-5">
        <div className="app-surface p-3 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Entries
          </div>

          <div className="font-semibold">
            {totalEntries}
          </div>
        </div>
      </div>

      {filteredJsons.length === 0 ? (
        <div className="app-surface p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No history entries found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJsons.map((item) => (
            <div
              key={item._id}
              className="app-surface p-4"
            >
              <div className="flex flex-wrap justify-end gap-2 mb-3">
                <button
                  onClick={() =>
                    handleCopy(
                      item.formattedJson
                    )
                  }
                  className="btn-secondary"
                >
                  📋 Copy
                </button>

                <button
                  onClick={() =>
                    handleDownload(
                      item.formattedJson,
                      item._id
                    )
                  }
                  className="btn-secondary"
                >
                  ⬇ Download
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      item._id
                    )
                  }
                  className="btn-secondary bg-red-400 text-white border-red-400 hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
              </div>

              <pre className="font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                {item.formattedJson}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JsonHistory;