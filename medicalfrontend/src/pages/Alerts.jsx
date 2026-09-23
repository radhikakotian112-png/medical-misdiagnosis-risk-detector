import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, AlertCircle, AlertTriangle, BellRing, ClipboardCheck, Eye, ShieldAlert } from "lucide-react";
import "./Alerts.css";

const alerts = [
  "High Risk Patient - Rahul Sharma",
  "Medication Conflict Detected",
  "Blood Pressure Critical",
  "Follow-up Required",
  "Missing Lab Report",
  "Diabetes Screening Recommended",
];

const summary = [
  { label: "Total Assessments", value: "1,248", detail: "+8.4% this month", icon: ClipboardCheck, tone: "blue" },
  { label: "Low Risk", value: "724", detail: "58.0% of assessments", icon: Activity, tone: "green" },
  { label: "Moderate Risk", value: "342", detail: "27.4% of assessments", icon: AlertCircle, tone: "amber" },
  { label: "High Risk", value: "182", detail: "14.6% of assessments", icon: ShieldAlert, tone: "red" },
  { label: "Review Recommended", value: "96", detail: "12 awaiting review", icon: Eye, tone: "purple" },
];

const distribution = [
  { name: "Low risk", value: 724, color: "#258c75" },
  { name: "Moderate risk", value: 342, color: "#d08b32" },
  { name: "High risk", value: 182, color: "#c65353" },
];

const trends = [
  { month: "Jan", assessments: 148, highRisk: 18 },
  { month: "Feb", assessments: 176, highRisk: 24 },
  { month: "Mar", assessments: 192, highRisk: 28 },
  { month: "Apr", assessments: 215, highRisk: 31 },
  { month: "May", assessments: 238, highRisk: 36 },
  { month: "Jun", assessments: 279, highRisk: 45 },
];

const categories = [
  { category: "Cardiovascular", low: 184, moderate: 86, high: 42 },
  { category: "Respiratory", low: 148, moderate: 73, high: 38 },
  { category: "Neurological", low: 122, moderate: 64, high: 31 },
  { category: "Gastrointestinal", low: 98, moderate: 51, high: 25 },
];

const factors = [
  { factor: "Symptom duration", value: 78 },
  { factor: "Previous diagnosis", value: 64 },
  { factor: "Medication history", value: 52 },
  { factor: "Physical changes", value: 47 },
  { factor: "Imaging findings", value: 35 },
];

const tooltipStyle = { border: "1px solid #d8e2e8", borderRadius: 8, background: "#ffffff" };

export default function Alerts() {
  return (
    <div className="alerts-page">
      <header className="alerts-header">
        <div>
          <p className="page-kicker">Clinical intelligence / Monitoring</p>
          <h1>Alerts</h1>
          <p className="page-subtitle">Review active signals and prioritize the patients who need attention.</p>
        </div>
      </header>

      <section className="alert-summary-grid" aria-label="Assessment summary">
        {summary.map(({ label, value, detail, icon: Icon, tone }) => (
          <article className="alert-summary-card" key={label}>
            <div className={`summary-icon ${tone}`}><Icon size={18} /></div>
            <p>{label}</p>
            <strong>{value}</strong>
            <span>{detail}</span>
          </article>
        ))}
      </section>

      <section className="active-alerts" aria-labelledby="active-alerts-title">
        <div className="alerts-title">
          <div>
            <p className="panel-eyebrow">Action queue</p>
            <h2 id="active-alerts-title">Active alerts</h2>
          </div>
          <span className="alert-count"><BellRing size={15} /> {alerts.length} active</span>
        </div>

        <div className="alert-list">
          {alerts.map((alert) => (
            <div key={alert} className="alert-item">
              <span className="alert-icon"><AlertTriangle size={16} /></span>
              <span>{alert}</span>
              <span className="alert-status">Review</span>
            </div>
          ))}
        </div>
      </section>

      <section className="alerts-chart-grid" aria-label="Assessment analytics">
        <article className="alert-panel">
          <PanelHeading eyebrow="Current mix" title="Risk distribution" note="n = 1,248" />
          <div className="alert-pie-layout">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={57} outerRadius={83} paddingAngle={3}>
                  {distribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="alert-legend">
              {distribution.map((item) => (
                <div key={item.name}><i style={{ background: item.color }} /><span>{item.name}</span><strong>{item.value}</strong></div>
              ))}
            </div>
          </div>
        </article>

        <article className="alert-panel">
          <PanelHeading eyebrow="Jan - Jun 2026" title="Assessment trends" note="+8.4%" />
          <ResponsiveContainer width="100%" height={265}>
            <LineChart data={trends} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#e5edf0" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line type="monotone" dataKey="assessments" name="Assessments" stroke="#1d6680" strokeWidth={3} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="highRisk" name="High risk" stroke="#c65353" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className="alert-panel">
          <PanelHeading eyebrow="By clinical area" title="Risk categories" />
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={categories} layout="vertical" margin={{ top: 5, right: 12, left: 10, bottom: 0 }}>
              <CartesianGrid stroke="#e5edf0" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis dataKey="category" type="category" width={100} tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="low" name="Low" stackId="risk" fill="#258c75" />
              <Bar dataKey="moderate" name="Moderate" stackId="risk" fill="#d08b32" />
              <Bar dataKey="high" name="High" stackId="risk" fill="#c65353" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="alert-panel">
          <PanelHeading eyebrow="Signals" title="Contributing factors" />
          <div className="factor-list">
            {factors.map((item) => (
              <div className="factor-row" key={item.factor}>
                <div><span>{item.factor}</span><strong>{item.value}%</strong></div>
                <div className="factor-track"><i style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function PanelHeading({ eyebrow, title, note }) {
  return <div className="panel-heading"><div><p className="panel-eyebrow">{eyebrow}</p><h2>{title}</h2></div>{note && <span className="panel-note">{note}</span>}</div>;
}
