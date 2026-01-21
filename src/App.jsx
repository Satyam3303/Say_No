import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  /* -------------------- STATE -------------------- */
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Theme state: "light" | "dark"
  const [theme, setTheme] = useState("light");

  /* -------------------- HANDLERS -------------------- */

  // Submit handler
  const handleCapture = async (e) => {
    e.preventDefault();

    // Validation
    if (!value.trim()) {
      setError("Please enter what work you want to get completed.");
      setAnswer("");
      return;
    }

    setError("");
    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.get("https://naas.isalman.dev/no");
      setAnswer(res.data.reason);
    } catch (error) {
      setAnswer("Something went wrong. Please try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Input change handler
  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError("");
  };

  // Theme toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /* -------------------- THEME STYLES -------------------- */
  const isDark = theme === "dark";

  return (
<div
  className={`w-100 min-vh-100 d-flex align-items-center justify-content-center ${
    isDark ? "bg-dark text-light" : "bg-light text-dark"
  }`}
>
      {/* Card Container */}
      <div
        className={`card shadow-lg p-4`}
        style={{ maxWidth: "500px", width: "100%" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Work Assistant</h4>

          {/* Theme Switch */}
          <button
            className={`btn btn-sm ${
              isDark ? "btn-outline-light" : "btn-outline-dark"
            }`}
            onClick={toggleTheme}
          >
            {isDark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {/* Question */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            What work would you like to get completed?
          </label>

          <input
            type="text"
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder="Type your question here..."
            value={value}
            onChange={handleChange}
          />

          {error && (
            <div className="invalid-feedback d-block">{error}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="d-grid mb-3">
          <button
            className="btn btn-primary"
            onClick={handleCapture}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status" />
          </div>
        )}

        {/* Answer Box */}
        {answer && !loading && (
          <div className={`alert ${isDark ? "alert-dark" : "alert-secondary"}`}>
            <h6 className="fw-bold mb-1">Answer</h6>
            <p className="mb-0">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
