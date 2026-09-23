import { useEffect, useMemo, useState } from "react";
import { Download, Printer, Search } from "lucide-react";
import { getPatients } from "../api";
import "./Reports.css";

const sampleReport = {
  id: "sample", patientId: "PT-0194", name: "Sample patient", assessmentId: "AS-20481", date: "June 18, 2026",
  symptoms: "Persistent headache, fatigue, and intermittent dizziness over the last three weeks.", weight: "72 kg (previous: 74 kg, 3 months ago)", physicalChanges: "Elevated blood pressure observed during assessment; no acute physical distress.", diagnosis: "Hypertension", treatment: "Amlodipine 5 mg daily; lifestyle modification plan.", previousReports: "Routine follow-up report, March 2026", imaging: "Brain MRI, March 2026: no acute findings", surgery: "No previous surgeries reported", risk: "High", score: 82, factors: "Symptom duration, previous diagnosis, elevated blood pressure", explanation: "The assessment indicates an elevated likelihood of clinical concern based on persistent symptoms, relevant history, and observed vital-sign changes. A clinician review is recommended to confirm next steps.",
};

function toReport(patient) {
  const payload = patient.payload || patient;
  const createdAt = patient.createdAt ? new Date(patient.createdAt) : null;
  return {
    ...sampleReport,
    id: patient.id,
    patientId: `PT-${String(patient.id).padStart(4, "0")}`,
    name: patient.name,
    assessmentId: `AS-${String(patient.id).padStart(5, "0")}`,
    date: createdAt && !Number.isNaN(createdAt.getTime()) ? createdAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "Not available",
    symptoms: payload.symptoms || "None reported",
    weight: payload.currentWeight ? `${payload.currentWeight} kg${payload.previousWeight ? ` (previous: ${payload.previousWeight} kg)` : ""}` : "Not recorded",
    physicalChanges: payload.changesSinceLastVisit || "No changes reported",
    diagnosis: patient.previousDiagnosis || payload.previousDiagnosis || "None reported",
    treatment: payload.previousTreatment || payload.currentMedication || "None reported",
    previousReports: payload.medicalReport || "None attached",
    imaging: ["xray", "ctScan", "mri", "ultrasound", "pathology"].filter((key) => payload[key] === "Yes").join(", ") || "None reported",
    surgery: payload.previousSurgery || "None reported",
    risk: patient.risk,
    score: patient.riskScore,
    factors: (patient.riskFactors || []).join(", ") || "No risk factors recorded",
    explanation: `This report was generated from ${patient.name}'s saved patient assessment. Clinical review is recommended before making treatment decisions.`,
  };
}

function downloadReport(report) {
  const content = `Clinical assessment report\nPatient: ${report.name} (${report.patientId})\nAssessment: ${report.assessmentId}\nRisk: ${report.risk} (${report.score}/100)\n\nExplanation\n${report.explanation}`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
  link.download = `${report.assessmentId}-report.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function Reports() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPatients().then(setPatients).catch((loadError) => setError(loadError.message)).finally(() => setLoading(false));
  }, []);

  const reports = useMemo(() => patients.map(toReport), [patients]);
  const matchingReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return reports.filter((item) => `${item.name} ${item.patientId} ${item.assessmentId}`.toLowerCase().includes(normalizedQuery));
  }, [reports, query]);
  const report = matchingReports[0] || (query ? null : reports[0] || sampleReport);

  return <div className="reports-page">
    <header className="report-header"><div><p className="page-kicker">Clinical records / Documentation</p><h1>Assessment report</h1><p className="page-subtitle">Review a complete patient assessment before clinical sign-off.</p></div><div className="report-actions"><button type="button" onClick={() => window.print()}><Printer size={17} /> Print report</button>{report && <button type="button" className="primary-action" onClick={() => downloadReport(report)}><Download size={17} /> Download</button>}</div></header>
    <section className="report-search-panel"><label htmlFor="report-patient-search"><Search size={18} /><span className="sr-only">Search patient</span><input id="report-patient-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patient by name or ID" /></label><span>{loading ? "Loading patient records..." : `${matchingReports.length} patient${matchingReports.length === 1 ? "" : "s"} found`}</span></section>
    {report ? <ReportDocument report={report} isSample={report === sampleReport} /> : <p className="empty-report">No patient matches “{query}”.</p>}
    {error && <p className="report-load-error">{error}</p>}
  </div>;
}

function ReportDocument({ report, isSample }) {
  return <article className="report-document"><div className="report-document-head"><div><span className="report-mark">MV</span><div><p className="report-overline">MedVista clinical intelligence</p><h2>Risk assessment report</h2><p className="report-patient-name">{report.name}</p></div></div>{isSample && <span className="sample-badge">Frontend sample data</span>}</div><div className="report-meta"><div><span>Patient ID</span><strong>{report.patientId}</strong></div><div><span>Assessment ID</span><strong>{report.assessmentId}</strong></div><div><span>Assessment date</span><strong>{report.date}</strong></div><div><span>Report status</span><strong className="status-pill review">Review recommended</strong></div></div><section className="risk-callout"><div><p className="panel-eyebrow">Overall risk level</p><strong>{report.risk}</strong><p>Clinical review recommended</p></div><div className="risk-score"><span>Risk score</span><strong>{report.score}<small>/100</small></strong></div></section><div className="report-sections"><ReportSection title="Current presentation"><Detail label="Current symptoms" value={report.symptoms} /><Detail label="Weight history" value={report.weight} /><Detail label="Physical changes" value={report.physicalChanges} /></ReportSection><ReportSection title="Clinical history"><Detail label="Previous diagnosis" value={report.diagnosis} /><Detail label="Treatment history" value={report.treatment} /><Detail label="Previous reports" value={report.previousReports} /><Detail label="Previous imaging" value={report.imaging} /><Detail label="Previous surgeries" value={report.surgery} /></ReportSection><ReportSection title="Clinical interpretation"><Detail label="Key risk factors" value={report.factors} /><Detail label="Explanation" value={report.explanation} /></ReportSection></div><footer className="report-footer">Generated for clinician review. This report supports clinical decision-making and does not replace professional medical judgment.</footer></article>;
}

function ReportSection({ title, children }) { return <section className="report-section"><h3>{title}</h3><div className="detail-grid">{children}</div></section>; }
function Detail({ label, value }) { return <div className="detail"><span>{label}</span><p>{value}</p></div>; }
