import { ArrowRight, Gavel, HeartPulse, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import "../home.css";

const attorneys = [
	["Boyd F. Hovde", "https://www.hovdelaw.com/attorney/hovde-f-boyd/"],
	["Robert T. Dassow", "https://www.hovdelaw.com/attorney/dassow-robert-t/"],
	["Nicholas C. Deets", "https://www.hovdelaw.com/attorney/deets-nicholas-c-nick/"],
	["Frederick R. (Rick) Hovde", "https://www.hovdelaw.com/attorney/hovde-frederick-r-rick/"],
	["Tyler Zipes", "https://www.hovdelaw.com/attorney/zipes-tyler/"],
	["Quinn McCoy", "https://www.hovdelaw.com/attorney/mccoy-quinn/"],
];

const practiceAreas = [
	["Vehicle accidents", "Car, truck, motorcycle and ATV collisions"],
	["Medical malpractice", "Medication, surgical and birth injuries"],
	["Workplace injuries", "Workers' compensation and job-site injuries"],
	["Toxic exposures", "Cancer and long-term illness caused by toxic chemicals"],
	["Other personal injury", "Nursing home abuse, premises liability and aviation injuries"],
];

export default function Home() {
	const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

	return (
		<main className="home-page">
			<nav className="home-nav">
				<Link className="home-brand" to="/">
					<span className="home-brand-mark"><Gavel size={21} /></span>
					<span>Hovde Dassow + Deets</span>
				</Link>
				<Link className="home-login-link" to={isAuthenticated ? "/dashboard" : "/login"}>
					{isAuthenticated ? "Go to dashboard" : "Client sign in"}
				</Link>
			</nav>

			<section className="home-hero">
				<div className="home-hero-copy">
					<p className="home-kicker"><span /> Indiana trial lawyers</p>
					<h1>Fearless advocates for people and their families.</h1>
					<p className="home-intro">At Hovde Dassow + Deets, we represent people who have been seriously injured or lost a loved one because of negligence, misconduct or corporate wrongdoing.</p>
					<div className="home-actions">
						<a className="home-primary-action" href="https://www.hovdelaw.com/case-results/">Explore our results <ArrowRight size={18} /></a>
						<span className="home-trust"><ShieldCheck size={17} /> More than 100 years of collective experience</span>
					</div>
				</div>

				<div className="home-visual" aria-label="Hovde Dassow + Deets firm highlights">
					<div className="visual-glow" />
					<div className="preview-window">
						<div className="preview-topbar"><span className="preview-dots"><i /><i /><i /></span><span>Firm overview</span><span className="preview-status">Established advocacy</span></div>
						<div className="preview-body">
							<div className="preview-heading"><div><small>HOVDE DASSOW + DEETS / ADVOCACY</small><h2>Results that create change</h2></div><span className="preview-date">Indiana</span></div>
							<div className="preview-metrics"><div><small>Collective experience</small><strong>100+</strong><span>years</span></div><div><small>Cases over $1M</small><strong>100+</strong><span className="warm">in 10 years</span></div><div><small>Medical malpractice</small><strong>50+</strong><span className="blue">near statutory cap</span></div></div>
							<div className="preview-chart firm-principles"><div className="chart-label"><span>What guides our work</span><small>People first</small></div><div className="principle-line"><span>Fearless advocacy</span><b>01</b></div><div className="principle-line"><span>Accountability</span><b>02</b></div><div className="principle-line"><span>Positive change</span><b>03</b></div></div>
						</div>
					</div>
					<div className="floating-note"><span><Users size={17} /></span><div><strong>A team you can trust</strong><small>Trial advocates for Indiana families</small></div></div>
				</div>
			</section>

			<section className="home-content">
				<div className="content-heading"><p className="home-kicker"><span /> The people behind the advocacy</p><h2>Experienced lawyers. <em>Personal commitment.</em></h2><p>Our attorneys are regularly recognized by their peers and leading legal organizations. Two partners are Past Presidents of the Indiana Trial Lawyers Association, three are members of the American College of Trial Lawyers and the International Academy of Trial Lawyers, and all partners have been recognized by Super Lawyers and Best Lawyers in America for more than a decade.</p></div>
				<div className="attorney-list">{attorneys.map(([name, url]) => <a key={name} href={url}>{name}<ArrowRight size={15} /></a>)}</div>
			</section>

			<section className="home-practice"><div className="practice-intro"><p className="home-kicker"><span /> How we help</p><h2>Zealously representing clients in personal injury matters.</h2><p>We handle the cases that change lives, from severe injuries and wrongful death to insurance misconduct and corporate wrongdoing.</p></div><div className="practice-list">{practiceAreas.map(([title, description]) => <div key={title}><HeartPulse size={18} /><div><strong>{title}</strong><span>{description}</span></div></div>)}</div></section>
		</main>
	);
}
