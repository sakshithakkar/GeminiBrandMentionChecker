import React, { useState } from "react";
import { checkBrand } from "./api";
import ResultTable from "./ResultTable";

function App() {
  const [prompt, setPrompt] = useState("");
  const [brand, setBrand] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

 const runCheck = async () => {
  if (!prompt || !brand) {
    alert("Both fields required");
    return;
  }

  setLoading(true);

  try {
    const res = await checkBrand(prompt, brand);

    // RESET previous results
    setRows([
      {
        prompt,
        brand,
        mentioned: res.mentioned,
        position: res.position
      }
    ]);
  } catch (err) {
    alert("Server error");
  }

  setLoading(false);
};


  return (
    <div style={{ maxWidth: "600px", margin: "auto", paddingTop: "20px" }}>
      <h2>Gemini Brand Mention Checker</h2>

      <textarea
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: "100px" }}
      />

      <input
        placeholder="Enter brand name"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <button
        onClick={runCheck}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Checking..." : "Run"}
      </button>

      <ResultTable rows={rows} />
    </div>
  );
}

export default App;
