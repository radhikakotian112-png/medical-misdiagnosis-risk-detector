import { useState } from "react";
import { Activity, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import "./Contact.css";

const contactDetails = [
  { icon: Mail, label: "Email us", value: "care@medvista.health", href: "mailto:care@medvista.health" },
  { icon: Phone, label: "Call support", value: "+1 (800) 555-0148", href: "tel:+18005550148" },
  { icon: MapPin, label: "Visit our office", value: "1200 Care Avenue, Boston, MA", href: "https://maps.google.com" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <div><p className="page-kicker">MedVista/ Support</p><h1>We are here to help.</h1><p className="page-subtitle">Questions about assessments, reports, or your clinical workspace? Reach out to our care technology team.</p></div>
        <span className="contact-status"><Sparkles size={14} /><i /> Support team online</span>
      </header>

      <section className="contact-layout">
        <div className="contact-info">
          <div className="contact-intro"><span className="contact-intro-icon"><MessageCircle size={22} /><Activity className="contact-intro-pulse" size={13} /></span><div><h2>Talk to our team</h2><p>We respond to support requests during business hours and help teams get the most from MedVista.</p></div></div>
          <div className="contact-detail-list">{contactDetails.map(({ icon: Icon, label, value, href }) => <a className="contact-detail" href={href} key={label}><span className="contact-detail-icon"><Icon size={18} /></span><span><small>{label}</small><strong>{value}</strong></span></a>)}</div>
          <div className="social-block"><p>Follow MedVista</p><div className="social-links"><a href="https://www.linkedin.com" aria-label="LinkedIn" title="LinkedIn"><FaLinkedinIn size={16} /></a><a href="https://twitter.com" aria-label="X / Twitter" title="X / Twitter"><FaTwitter size={16} /></a><a href="https://www.facebook.com" aria-label="Facebook" title="Facebook"><FaFacebookF size={16} /></a><a href="https://www.instagram.com" aria-label="Instagram" title="Instagram"><FaInstagram size={16} /></a></div></div>
        </div>
        <section className="contact-form-card"><div className="contact-form-heading"><p className="panel-eyebrow">Send a message</p><h2>How can we help?</h2><p>Share a few details and our team will get back to you.</p></div><form onSubmit={handleSubmit} className="contact-form"><label>Name<input name="name" placeholder="Your full name" required /></label><label>Email<input name="email" type="email" placeholder="you@example.com" required /></label><label>Subject<select name="subject" defaultValue=""><option value="" disabled>Select a topic</option><option>Assessment support</option><option>Report question</option><option>Account help</option><option>Other</option></select></label><label>Message<textarea name="message" rows="5" placeholder="Tell us how we can help..." required /></label><button type="submit"><Send size={16} /> Send message</button>{sent && <p className="contact-success" role="status">Thanks. Your message has been prepared for our support team.</p>}</form></section>
      </section>

      {/* <section className="team-section"><div className="team-heading"><div><p 
      className="page-kicker">The people behind MedVista</p>
      <h2>Meet our team</h2>
      <p>Connect with the clinical and patient-support specialists who keep your care experience moving.</p>
      </div>
      </div> 
      <div className="team-grid">{teamMembers.map((member) => <article className="team-card" key={member.id || member.name}>{member.image ? 
        <img src={member.image} alt={member.name} /> : <div className="team-avatar-fallback">{member.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>}<div>
        <h3>{member.name}</h3><p>{member.role}</p><small>{member.education}</small></div></article>)}</div>
        <div className="team-video-card"><div><p className="page-kicker">Meet the care team</p>
        <h2>How our clinicians support better decisions</h2>
        <p>Watch the team introduction and learn how MedVista brings clinical review into one connected workflow.</p>
        </div>
        <video
  autoPlay
  muted
  loop
  playsInline
  className="team-video"
>
  <source
    src="/images/doctorteamvedio.mp4"
    type="video/mp4"
  />
  Your browser does not support video playback.
</video> 
</div>
</section>*/}
</div>
  );
}
