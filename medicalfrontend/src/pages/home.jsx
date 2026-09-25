import { Activity, Brain, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../home.css";

export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

  return (
    <main className="home-page">
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
          {isAuthenticated ? "Go to Dashboard" : "Sign In"}
        </Link>
      </nav>

      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="home-kicker">
            <span /> AI-Assisted Clinical Decision Support
          </p>

          <h1>
            Detect potential
            <em> misdiagnosis risk.</em>
          </h1>

          <p className="home-intro">
            A clinical decision-support platform designed to help identify
            patterns and risk factors that may require additional medical
            review.
          </p>

          <div className="home-actions">
            <Link
              className="home-primary-action"
              to={isAuthenticated ? "/dashboard" : "/login"}
            >
              {isAuthenticated ? "Open Dashboard" : "Get Started"}
              <ArrowRight size={18} />
            </Link>

            <span className="home-trust">
              <ShieldCheck size={17} />
              Designed for clinical decision support
            </span>
          </div>
        </div>

        <div className="home-visual">
          <div className="visual-glow" />

          <div className="preview-window">
            <div className="preview-topbar">
              <span className="preview-dots">
                <i />
                <i />
                <i />
              </span>
              <span>Risk Analysis</span>
              <span className="preview-status">AI Assisted</span>
            </div>

            <div className="preview-body">
              <div className="preview-heading">
                <div>
                  <small>MEDICAL MISDIAGNOSIS RISK DETECTOR</small>
                  <h2>Clinical Risk Overview</h2>
                </div>
                <span className="preview-date">Analysis</span>
              </div>

              <div className="preview-metrics">
                <div>
                  <small>Patient assessment</small>
                  <strong>AI</strong>
                  <span>assisted</span>
                </div>

                <div>
                  <small>Risk factors</small>
                  <strong>Review</strong>
                  <span className="warm">recommended</span>
                </div>

                <div>
                  <small>Clinical support</small>
                  <strong>24/7</strong>
                  <span className="blue">available</span>
                </div>
              </div>

              <div className="preview-chart">
                <div className="chart-label">
                  <span>Clinical decision support</span>
                  <small>Risk indicators</small>
                </div>

                <div className="risk-lines">
                  <div>
                    <span>Patient information</span>
                    <b>01</b>
                  </div>
                  <div>
                    <span>Clinical indicators</span>
                    <b>02</b>
                  </div>
                  <div>
                    <span>Potential risk factors</span>
                    <b>03</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-note">
            <span>
              <Brain size={17} />
            </span>
            <div>
              <strong>AI-assisted analysis</strong>
              <small>Supporting clinical review</small>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div>
          <Activity />
          <strong>Risk Detection</strong>
          <span>
            Analyze patient information for potential misdiagnosis risk
            indicators.
          </span>
        </div>

        <div>
          <Brain />
          <strong>AI-Assisted Analysis</strong>
          <span>
            Use intelligent analysis to support healthcare decision-making.
          </span>
        </div>

        <div>
          <ShieldCheck />
          <strong>Clinical Support</strong>
          <span>
            Provide an additional layer of information for professional
            clinical review.
          </span>
        </div>
      </section>

      <section className="home-content">
        <div className="content-heading">
          <p className="home-kicker">
            <span /> About the platform
          </p>

          <h2>
            Supporting better
            <em> clinical decisions.</em>
          </h2>

          <p>
            The Medical Misdiagnosis Risk Detector is designed to help
            healthcare professionals identify potential risk patterns and
            support further clinical evaluation.
          </p>
        </div>

        <div className="feature-list">
          <div>
            <strong>Patient assessment</strong>
            <span>Enter and review relevant patient information.</span>
          </div>

          <div>
            <strong>Risk analysis</strong>
            <span>Evaluate factors that may indicate increased risk.</span>
          </div>

          <div>
            <strong>Reports</strong>
            <span>Review analysis results and generated reports.</span>
          </div>

          <div>
            <strong>Patient history</strong>
            <span>Access previous assessments when available.</span>
          </div>
        </div>
      </section>

      <section className="home-practice">
        <div className="practice-intro">
          <p className="home-kicker">
            <span /> Clinical workflow
          </p>

          <h2>From patient data to informed review.</h2>

          <p>
            Use the platform to organize patient information, analyze potential
            risk indicators, and review the results as part of a broader
            clinical workflow.
          </p>
        </div>

        <div className="practice-list">
          <div>
            <Activity size={18} />
            <div>
              <strong>Patient Information</strong>
              <span>Collect relevant clinical details.</span>
            </div>
          </div>

          <div>
            <Brain size={18} />
            <div>
              <strong>AI Analysis</strong>
              <span>Analyze potential risk patterns.</span>
            </div>
          </div>

          <div>
            <ShieldCheck size={18} />
            <div>
              <strong>Clinical Review</strong>
              <span>Use results as decision-support information.</span>
            </div>
          </div>

          <div>
            <ArrowRight size={18} />
            <div>
              <strong>Reports</strong>
              <span>Review and manage assessment results.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}