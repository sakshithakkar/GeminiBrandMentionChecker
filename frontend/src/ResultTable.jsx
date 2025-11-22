export default function ResultTable({ rows }) {
  if (rows.length === 0) return null;

  const downloadCSV = () => {
    const header = "Prompt,Brand,Mentioned,Position\n";
    const body = rows
      .map(
        (r) =>
          `${r.prompt},${r.brand},${r.mentioned ? "Yes" : "No"},${
            r.position || ""
          }`
      )
      .join("\n");

    const blob = new Blob([header + body], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "results.csv";
    a.click();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={downloadCSV}
        style={{
          background: "#4f46e5",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
        onMouseOver={(e) => (e.target.style.background = "#4338ca")}
        onMouseOut={(e) => (e.target.style.background = "#4f46e5")}
      >
        Download CSV
      </button>

      <table
        style={{
          marginTop: "15px",
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={thStyle}>Prompt</th>
            <th style={thStyle}>Brand</th>
            <th style={thStyle}>Mentioned</th>
            <th style={thStyle}>Position</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ cursor: "pointer" }}>
              <td style={tdStyle}>{r.prompt}</td>
              <td style={tdStyle}>{r.brand}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    background: r.mentioned ? "#dcfce7" : "#fee2e2",
                    color: r.mentioned ? "#166534" : "#991b1b",
                  }}
                >
                  {r.mentioned ? "Yes" : "No"}
                </span>
              </td>
              <td style={tdStyle}>{r.position || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px 14px",
  fontSize: "14px",
  fontWeight: "700",
  color: "#374151",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "12px 14px",
  fontSize: "14px",
  color: "#374151",
  borderBottom: "1px solid #f1f1f1",
};
