import { ArrowRight, BarChart3, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
	const isAuthenticated = localStorage.getItem("loggedIn") === "true";

	return (
		<main className="home-page">
			<nav className="home-nav">
				<Link className="home-brand" to="/">
					<span className="home-brand-mark"><HeartPulse size={21} /></span>
					<span>MedVista</span>
				</Link>
				<Link className="home-login-link" to={isAuthenticated ? "/dashboard" : "/login"}>
					{isAuthenticated ? "Go to dashboard" : "Sign in"}
				</Link>
			</nav>

			<section className="home-hero">
				<div className="home-hero-copy">
					<p className="home-kicker"><span /> Clinical intelligence for better decisions</p>
					<h1>See the whole patient. <em>Act with clarity.</em></h1>
					<p className="home-intro">MedVista brings assessment history, risk signals, and clinical reporting into one calm, focused workspace for care teams.</p>
					<div className="home-actions">
						<Link className="home-primary-action" to={isAuthenticated ? "/dashboard" : "/login"}>Open dashboard <ArrowRight size={18} /></Link>
						<span className="home-trust"><ShieldCheck size={17} /> Built for clinical review</span>
					</div>
				</div>

				<div className="home-visual" aria-label="Dashboard preview">
					<div className="visual-glow" />
					<div className="preview-window">
						<div className="preview-topbar"><span className="preview-dots"><i /><i /><i /></span><span>Assessment overview</span><span className="preview-status">Live view</span></div>
						<div className="preview-body">
							<div className="preview-heading"><div><small>CLINICAL INTELLIGENCE / OVERVIEW</small><h2>Assessment dashboard</h2></div><span className="preview-date">Jun 2026</span></div>
							<div className="preview-metrics"><div><small>Total assessments</small><strong>1,248</strong><span>+8.4%</span></div><div><small>High risk</small><strong>182</strong><span className="warm">14.6%</span></div><div><small>Review queue</small><strong>96</strong><span className="blue">12 awaiting</span></div></div>
							<div className="preview-chart"><div className="chart-label"><span>Assessment trends</span><small>Last 6 months</small></div><svg viewBox="0 0 500 140" preserveAspectRatio="none" role="img" aria-label="Sample assessment trend"><path d="M0 112 C55 100 67 85 112 95 S165 48 214 69 S265 45 310 58 S355 70 397 29 S453 34 500 12" /><path className="chart-fill" d="M0 112 C55 100 67 85 112 95 S165 48 214 69 S265 45 310 58 S355 70 397 29 S453 34 500 12 L500 140 L0 140Z" /></svg></div>
						</div>
					</div>
					<div className="floating-note"><span><Stethoscope size={17} /></span><div><strong>Care team ready</strong><small>12 reviews awaiting attention</small></div></div>
				</div>
			</section>

			<section className="home-features"><div><BarChart3 size={20} /><strong>Understand risk</strong><span>Turn complex signals into a view your team can act on.</span></div><div><HeartPulse size={20} /><strong>Follow the story</strong><span>Keep symptoms, history, and outcomes connected.</span></div><div><ShieldCheck size={20} /><strong>Review with confidence</strong><span>Make every recommendation easier to explain.</span></div></section>
		</main>
	);
}
