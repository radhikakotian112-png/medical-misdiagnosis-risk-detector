import { useEffect, useState } from "react";
import {
  ClipboardPlus,
  LogIn,
  HeartPulse,
  ShieldCheck,
  Activity,
  Stethoscope,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { FiActivity, FiClock, FiShield } from "react-icons/fi";
import DoctorIllustration from "../components/DoctorIllustration";

import { Link } from "react-router-dom";
import { getStatistics } from "../api";

import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatistics()
      .then(setStats)
      .catch(err => console.error("Failed to load statistics:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="analytics-dashboard">

      {/* =========================================
          ANIMATED BACKGROUND
      ========================================= */}

      <div className="dashboard-orb orb-one"></div>
      <div className="dashboard-orb orb-two"></div>
      <div className="dashboard-orb orb-three"></div>


      {/* =========================================
          HEADER
      ========================================= */}

      <header className="dashboard-header">

        <div className="dashboard-heading">

          <p className="page-kicker">
            CLINICAL INTELLIGENCE / OVERVIEW
          </p>

          <h1>
            Assessment
            <span> Dashboard</span>
          </h1>

          <p className="page-subtitle">
            A focused workspace for reviewing patient signals, assessing risk,
            and making more informed clinical decisions.
          </p>

        </div>


        <div className="dashboard-header-actions">

          <span className="sample-badge">
            <span className="live-indicator"></span>
            AI System Online
          </span>


          <Link
            className="dashboard-login-icon"
            to="/login"
            aria-label="Open login page"
            title="Open login page"
          >
            <LogIn size={18} />
          </Link>


          <Link
            className="new-assessment-icon"
            to="/patient"
            aria-label="Start a new assessment"
            title="Start a new assessment"
          >
            <ClipboardPlus size={19} />

            <span>
              New Assessment
            </span>

            <ArrowUpRight size={16} />

          </Link>

        </div>

      </header>

      <section className="dashboard-context" aria-label="Clinical workspace status">
        <div className="context-item">
          <span className="context-icon"><FiActivity /></span>
          <div>
            <strong>Live decision support</strong>
            <span>Risk indicators are ready for clinical review.</span>
          </div>
        </div>
        <div className="context-item">
          <span className="context-icon"><FiClock /></span>
          <div>
            <strong>Built for faster review</strong>
            <span>Keep symptoms, vitals, and history in one place.</span>
          </div>
        </div>
        <div className="context-item">
          <span className="context-icon"><FiShield /></span>
          <div>
            <strong>Clinician-led workflow</strong>
            <span>AI highlights patterns; care teams make the decision.</span>
          </div>
        </div>
      </section>


      {/* =========================================
          HERO WELCOME CARD
      ========================================= */}

      <Link
        to="/patient"
        className="dashboard-welcome"
        aria-label="Start a new clinical assessment"
      >

        <div className="welcome-content">

          <p className="panel-eyebrow">
            <Sparkles size={14} />
            NEXT STEP
          </p>

          <h2>
            Start with a clearer
            <span> view of patient risk.</span>
          </h2>

          <p>
            Capture the patient story, review the model's risk signals, and
            document the next step with a structured assessment.
          </p>


          <span className="dashboard-welcome-link">
            <span>
              Start Assessment
            </span>

            <ClipboardPlus size={17} />

          </span>

        </div>

        <div className="welcome-doctor" aria-hidden="true">
          <DoctorIllustration />
          <span>CLINICAL REVIEW</span>
        </div>

      </Link>


      {/* =========================================
          ANIMATED FEATURE CARDS
      ========================================= */}

      <section className="clinical-cards">

        <article className="clinical-card card-ai">
          <div className="card-badge"><Sparkles size={12} /></div>
          <p className="card-label">INTELLIGENCE</p>
          <h3>AI Clinical Analysis</h3>
          <p>
            Cross-check symptoms, history, and risk signals to surface
            subtle patterns that may otherwise be missed during routine review.
          </p>
          <div className="card-line"></div>
          <span className="card-status">AI READY</span>
        </article>

        <article className="clinical-card card-risk">
          <div className="card-badge"><HeartPulse size={12} /></div>
          <p className="card-label">MONITORING</p>
          <h3>Patient Risk Detection</h3>
          <p>
            Track deteriorating signals over time and highlight emerging
            clinical concerns before they become critical decision points.
          </p>
          <div className="risk-wave">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </article>

        <article className="clinical-card card-safety">
          <div className="card-badge"><ShieldCheck size={12} /></div>
          <p className="card-label">SAFETY</p>
          <h3>Clinical Safety Layer</h3>
          <p>
            Support safer practice with structured evidence, alerts, and
            review checkpoints that encourage careful and consistent evaluation.
          </p>
          <div className="shield-ring"><ShieldCheck /></div>
        </article>

        <article className="clinical-card card-monitor">
          <div className="card-badge"><Activity size={12} /></div>
          <p className="card-label">ANALYTICS</p>
          <h3>Clinical Monitoring</h3>
          <p>
            Review patient information and trend indicators in one focused
            workspace to improve visibility across assessment workflows.
          </p>
          <div className="activity-bars">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </article>

        <article className="clinical-card card-workflow">
          <div className="card-badge"><Stethoscope size={12} /></div>
          <p className="card-label">WORKFLOW</p>
          <h3>Care Team Coordination</h3>
          <p>
            Keep clinicians aligned with shared patient context, prior notes,
            and structured follow-up steps that support timely treatment planning.
          </p>
          <div className="workflow-dots">
            <span></span><span></span><span></span><span></span>
          </div>
        </article>

        <article className="clinical-card card-review">
          <div className="card-badge"><ClipboardPlus size={12} /></div>
          <p className="card-label">REVIEW</p>
          <h3>Evidence-Based Assessment</h3>
          <p>
            Compare findings against risk factors and historical context to promote
            more informed review and reduce the chance of oversight in complex cases.
          </p>
          <div className="review-lines">
            <span></span><span></span><span></span>
          </div>
        </article>
      </section>


      {/* =========================================
          STATISTICS SECTION
      ========================================= */}

      {loading && <p className="dashboard-loading">Loading statistics...</p>}

      {stats && !loading && (
        <section className="dashboard-stats">
          <div className="stats-header">
            <h2>Assessment activity</h2>
            <p>Live data from completed clinical reviews</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Assessments</p>
              <strong className="stat-value">{stats.totalAssessments}</strong>
            </div>
            <div className="stat-card high-risk">
              <p className="stat-label">High Risk Cases</p>
              <strong className="stat-value">{stats.highRiskCount}</strong>
            </div>
            {Object.entries(stats.statisticsByRisk).map(([risk, count]) => (
              <div key={risk} className={`stat-card risk-${risk.toLowerCase()}`}>
                <p className="stat-label">{risk} Risk</p>
                <strong className="stat-value">{count}</strong>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* =========================================
          BOTTOM STRIP
      ========================================= */}

      <section className="clinical-strip">

        <div className="strip-icon">
          <Stethoscope />
        </div>

        <div>

          <strong>
            Keep the clinician in control
          </strong>

          <p>
            Use AI findings as a second perspective alongside examination,
            history, and professional judgement.
          </p>

        </div>

        <div className="strip-pulse">
          <span></span>
          System Active
        </div>

      </section>

    </div>
  );
}