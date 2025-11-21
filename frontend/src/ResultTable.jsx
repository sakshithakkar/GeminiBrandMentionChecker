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
      <button onClick={downloadCSV}>Download CSV</button>

      <table border="1" style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          <tr>
            <th>Prompt</th>
            <th>Brand</th>
            <th>Mentioned</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.prompt}</td>
              <td>{r.brand}</td>
              <td>{r.mentioned ? "Yes" : "No"}</td>
              <td>{r.position || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
