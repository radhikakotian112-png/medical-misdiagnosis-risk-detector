import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { getPatients } from "../api";
import "./PatientHistory.css";

export default function PatientHistory() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("All risk levels");

  useEffect(() => {
    getPatients()
      .then(setAssessments)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => assessments.filter((item) => {
      const searchable = `${item.name} ${item.previousDiagnosis || ""} ${item.symptoms || ""}`.toLowerCase();
      return searchable.includes(query.toLowerCase()) &&
        (risk === "All risk levels" || item.risk === risk);
    }),
    [assessments, query, risk]
  );

  return (
    <div className="history-page">
      <header className="history-header">
        <div>
          <p className="page-kicker">Clinical records / Timeline</p>
          <h1>Patient history</h1>
          <p className="page-subtitle">Review prior assessments and identify cases that need attention.</p>
        </div>
        <span className="sample-badge">Database records</span>
      </header>
      <section className="history-toolbar">
        <div className="history-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patient or diagnosis" /></div>
        <div className="history-filter"><SlidersHorizontal size={17} /><select value={risk} onChange={(event) => setRisk(event.target.value)}><option>All risk levels</option><option>Low</option><option>Medium</option><option>High</option></select></div>
        <span className="result-count">{filtered.length} assessments</span>
      </section>
      <section className="history-table-panel">
        <div className="table-heading"><div><h2>Assessment history</h2><p>Most recent clinical assessments</p></div><span className="storage-note">{loading ? "Loading database records..." : error || "Stored in SQLite"}</span></div>
        <div className="history-table-wrap"><table className="history-table"><thead><tr><th>Patient</th><th>Date</th><th>Previous diagnosis</th><th>Main symptoms</th><th>Risk level</th><th>Risk score</th><th>Review status</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td className="strong-cell">{item.name}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td>{item.previousDiagnosis || "None reported"}</td><td className="symptom-cell">{item.symptoms || "None reported"}</td><td><span className={`risk-pill ${item.risk.toLowerCase()}`}>{item.risk}</span></td><td><strong>{item.riskScore}</strong><span className="score-max"> / 100</span></td><td><span className={`status-pill ${item.risk === "Low" ? "complete" : "review"}`}>{item.risk === "Low" ? "Complete" : "Review recommended"}</span></td></tr>)}</tbody></table></div>
        {!loading && filtered.length === 0 && <p className="empty-history">{error || "No assessments match the current filter."}</p>}
      </section>
    </div>
  );
}
