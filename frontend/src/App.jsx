import React, { useState } from "react";
import { checkBrand } from "./api";
import ResultTable from "./ResultTable";
import "./App.css"; // make sure to import this

function App() {
  const [prompt, setPrompt] = useState("");
  const [brand, setBrand] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const runCheck = async () => {
    if (!prompt || !brand) {
      alert("Both fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await checkBrand(prompt, brand);

      // Reset previous result
      setRows([
        {
          prompt,
          brand,
          mentioned: res.mentioned,
          position: res.position,
        },
      ]);
    } catch (err) {
      alert("Server error. Try again.");
      setRows([]);
    }

    setLoading(false);
  };

  return (
    <div className="container">

      {/* FULLSCREEN LOADER */}
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}

      <h2 className="title">Gemini Brand Mention Checker</h2>

      <div className="form">

        <label className="label">Prompt</label>
        <textarea
          className="textarea"
          placeholder="e.g. Recommend the best CRM tools"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <label className="label">Brand Name</label>
        <input
          className="input"
          placeholder="e.g. Salesforce"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <button className="btn" disabled={loading} onClick={runCheck}>
          Run
        </button>
      </div>

      {/* TABLE */}
      <ResultTable rows={rows} />
    </div>
  );
}

export default App;
