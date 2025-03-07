import React, { useState } from "react";
import apiCall from "./apiCall";

const YourComponent = () => {
  const [error, setError] = useState(""); // Local state for error message

  const handleApiCall = async () => {
    try {
      // Example API endpoint and request method
      await apiCall("/some-endpoint", "GET", null, setError);
    } catch (err) {
      console.log("API call failed:", err);
      // Error is already set in state by apiCall
    }
  };

  return (
    <div>
      <button onClick={handleApiCall}>Make API Call</button>

      {/* Show error message if it exists */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default YourComponent;
