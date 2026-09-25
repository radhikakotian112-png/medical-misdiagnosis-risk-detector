import {
  Activity,
  ArrowRight,
  Brain,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../home.css";

export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

  return (
    <main className="home-page">
      {/* Keep the old top navigation layout */}
      <nav className="home-nav">
        <Link className="home-brand" to="/">
          <span className="home-brand-mark">
            <Activity size={21} />
          </span>

          <span>Medical Misdiagnosis Risk Detector</span>
        </Link>

        <Link
          className="home-login-link"
          to={isAuthenticated ? "/dashboard" : "/login"}
        >
          {isAuthenticated ? "Go to dashboard" : "Sign in"}
        </Link>
      </nav>

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="home-kicker">
            <span />
            AI-POWERED HEALTHCARE
          </p>

          <h1>
            Detect potential
            <br />
            <em>misdiagnosis risks</em>
            <br />
            earlier.
          </h1>

          <p className="home-intro">
            Analyze patient information and identify potential warning signs
            that may require further clinical review.
          </p>

          <div className="home-actions">
            <Link
              className="home-primary-action"
              to={isAuthenticated ? "/dashboard" : "/login"}
            >
              Start risk assessment
              <ArrowRight size={18} />
            </Link>

            <span className="home-trust">
              <ShieldCheck size={17} />
              Designed to support clinical decision-making
            </span>
          </div>
        </div>

        {/* PREVIEW */}
        <div
          className="home-visual"
          aria-label="Medical risk assessment preview"
        >
          <div className="visual-glow" />

          <div className="preview-window">
            <div className="preview-topbar">
              <span className="preview-dots">
                <i />
                <i />
                <i />
              </span>

              <span>Risk assessment</span>

              <span className="preview-status">
                AI analysis
              </span>
            </div>

            <div className="preview-body">
              <div className="preview-heading">
                <div>
                  <small>MEDICAL RISK DETECTOR / ANALYSIS</small>

                  <h2>Patient risk overview</h2>
                </div>

                <span className="preview-date">
                  Live
                </span>
              </div>

              <div className="preview-metrics">
                <div>
                  <small>Risk indicators</small>
                  <strong>03</strong>
                  <span>detected</span>
                </div>

                <div>
                  <small>Confidence</small>
                  <strong>92%</strong>
                  <span className="warm">analysis score</span>
                </div>

                <div>
                  <small>Review status</small>
                  <strong>AI</strong>
                  <span className="blue">requires review</span>
                </div>
              </div>

              <div className="preview-chart firm-principles">
                <div className="chart-label">
                  <span>Risk assessment</span>
                  <small>Clinical review</small>
                </div>

                <div className="principle-line">
                  <span>Symptom mismatch</span>
                  <b>01</b>
                </div>

                <div className="principle-line">
                  <span>Medication concerns</span>
                  <b>02</b>
                </div>

                <div className="principle-line">
                  <span>Diagnosis inconsistency</span>
                  <b>03</b>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-note">
            <span>
              <Users size={17} />
            </span>

            <div>
              <strong>Patient safety first</strong>
              <small>Additional clinical review support</small>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-content">
        <div className="content-heading">
          <p className="home-kicker">
            <span />
            HOW IT WORKS
          </p>

          <h2>
            Smarter analysis.
            <br />
            <em>Safer decisions.</em>
          </h2>

          <p>
            The Medical Misdiagnosis Risk Detector analyzes available patient
            information and highlights potential risk indicators for further
            review.
          </p>
        </div>

        <div className="attorney-list">
          <div>
            <Brain size={20} />
            <span>
              <strong>AI-assisted analysis</strong>
              <small>
                Analyze patient information for potential warning signs.
              </small>
            </span>
          </div>

          <div>
            <Activity size={20} />
            <span>
              <strong>Risk detection</strong>
              <small>
                Identify patterns that may require additional attention.
              </small>
            </span>
          </div>

          <div>
            <ShieldCheck size={20} />
            <span>
              <strong>Clinical review support</strong>
              <small>
                Provide useful information to support professional review.
              </small>
            </span>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="home-practice">
        <div className="practice-intro">
          <p className="home-kicker">
            <span />
            SIMPLE WORKFLOW
          </p>

          <h2>
            From patient data
            <br />
            to risk insights.
          </h2>

          <p>
            Enter the available patient information, run the analysis, and
            review the identified risk indicators.
          </p>
        </div>

        <div className="practice-list">
          <div>
            <Activity size={18} />

            <div>
              <strong>1. Enter patient information</strong>
              <span>
                Provide the available symptoms, diagnosis and relevant details.
              </span>
            </div>
          </div>

          <div>
            <Brain size={18} />

            <div>
              <strong>2. Run AI analysis</strong>
              <span>
                The system analyzes the information for potential risk signals.
              </span>
            </div>
          </div>

          <div>
            <ShieldCheck size={18} />

            <div>
              <strong>3. Review the results</strong>
              <span>
                Examine the identified indicators and determine whether further
                professional review is appropriate.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}