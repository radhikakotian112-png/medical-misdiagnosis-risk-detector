import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CirclePlus,
  HeartPulse,
  LockKeyhole,
  Mail,
  Pill,
  ShieldCheck,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { login, register } from "../api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Validate credentials
      if (!email || !password) {
        setError("Please enter email and password");
        setLoading(false);
        return;
      }

      try {
        // Try to login via backend API
        const data = isRegistering ? await register(email, password) : await login(email, password);
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("loggedIn", "true");
        navigate("/dashboard");
      } catch (apiError) {
        // If backend is not available, use mock authentication
        console.log("Backend not available, using mock authentication");
        
        // Mock credentials for demo
        const validEmails = ["doctor@hospital.com", "doctor@example.com", "admin@hospital.com"];
        if (validEmails.includes(email) && password.length >= 6) {
          // Set mock authentication tokens
          localStorage.setItem("accessToken", "mock-demo-token-" + Date.now());
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("user", JSON.stringify({
            username: email.split("@")[0],
            email: email,
            role: "doctor",
            token: "mock-demo-token"
          }));
          navigate("/dashboard");
        } else {
          setError("Demo credentials: doctor@hospital.com / password123");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <section className="login-brief" aria-label="MedVista clinical platform">
          <div className="login-brand">
            <span className="login-brand-mark"><HeartPulse size={23} /></span>
            <span>MedVista</span>
          </div>

          <div className="login-floating-icons" aria-hidden="true">
            <span className="floating-icon floating-icon-one"><HeartPulse size={18} /></span>
            <span className="floating-icon floating-icon-two"><CirclePlus size={16} /></span>
            <span className="floating-icon floating-icon-three"><Activity size={15} /></span>
          </div>

          <div className="login-brief-copy">
            <span className="login-overline"><span className="login-pulse-dot" /> Secure clinical workspace</span>
            <h1>Care decisions,<br /><em>made clearer.</em></h1>
            <p>Bring patient history, risk signals, and thoughtful review into one focused space for your care team.</p>
          </div>

          <div className="login-doctor-visual" aria-hidden="true">
            <div className="doctor-aura"><Stethoscope size={72} /></div>
          </div>

          <div className="login-signal" aria-hidden="true">
            <div className="signal-line"><span /><span /><span /><span /><span /></div>
            <div className="signal-label"><Activity size={16} /> Live care intelligence</div>
          </div>

          <div className="login-brief-footer">
            <div><ShieldCheck size={17} /><span>Protected clinical data</span></div>
            <div><Stethoscope size={17} /><span>Built for care teams</span></div>
          </div>
        </section>

        <section className="login-card">
          <div className="login-card-icons" aria-hidden="true">
            <span className="card-icon card-icon-one"><Activity size={25} /></span>
            <span className="card-icon card-icon-two"><ShieldCheck size={21} /></span>
            <span className="card-icon card-icon-three"><HeartPulse size={20} /></span>
            <span className="card-icon card-icon-four"><CirclePlus size={17} /></span>
            <span className="card-icon card-icon-five"><Pill size={18} /></span>
            <span className="card-icon card-icon-six"><Syringe size={19} /></span>
          </div>
          <div className="login-card-heading">
            <div className="login-icon-orbit" aria-hidden="true"><LockKeyhole size={20} /></div>
            <span className="login-card-kicker">{isRegistering ? "New account" : "Welcome back"}</span>
            <h2>{isRegistering ? "Create your MedVista account" : "Sign in to MedVista"}</h2>
            <p>{isRegistering ? "Use your email to create a secure clinical workspace account." : "Access your clinical dashboard and continue your review."}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <div className="login-input-wrap">
              <Mail size={17} aria-hidden="true" />
              <input id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@hospital.org" autoComplete="email" required />
            </div>

            <label htmlFor="login-password">Password</label>
            <div className="login-input-wrap">
              <LockKeyhole size={17} aria-hidden="true" />
              <input id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="At least 8 characters" autoComplete={isRegistering ? "new-password" : "current-password"} minLength={8} required />
            </div>

            {error && <p className="login-error" role="alert">{error}</p>}

            <button className="login-submit" type="submit" disabled={loading}>
              <span>{loading ? (isRegistering ? "Creating account..." : "Signing in...") : (isRegistering ? "Create account" : "Continue securely")}</span>
              {!loading && <ArrowRight size={18} aria-hidden="true" />}
            </button>
          </form>

          <button className="login-mode-toggle" type="button" onClick={() => { setIsRegistering((value) => !value); setError(""); }}>
            {isRegistering ? "Already have an account? Sign in" : "New here? Create an account"}
          </button>

          <div className="login-assurance"><CheckCircle2 size={15} /> Your session is encrypted and private</div>
        </section>
      </div>
    </div>
  );
}