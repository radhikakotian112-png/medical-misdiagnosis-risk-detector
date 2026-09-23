import { useState } from 'react'

const initialForm = {
  age: '',
  symptoms: '',
  duration: '',
  history: 'no',
  risk: 'medium',
}

const navItems = [
  { label: 'Dashboard', icon: '⌂' },
  { label: 'Patients', icon: '◎' },
  { label: 'Alerts', icon: '▲' },
  { label: 'Reports', icon: '⬢' },
  { label: 'Settings', icon: '⚙' },
]

const patientList = [
  { id: 1, name: 'Mia Torres', age: 48, condition: 'Chest discomfort', risk: 'High', status: 'Review' },
  { id: 2, name: 'Noah Blake', age: 34, condition: 'Shortness of breath', risk: 'Medium', status: 'Monitor' },
  { id: 3, name: 'Ava Patel', age: 57, condition: 'Recurring fever', risk: 'High', status: 'Urgent' },
  { id: 4, name: 'Leo Martin', age: 29, condition: 'Headache & fatigue', risk: 'Low', status: 'Observe' },
]

export default function Dashboard({ page = 'dashboard', onLogout }) {
  const [formData, setFormData] = useState(initialForm)
  const currentPage = page

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const renderDashboardContent = () => (
    <>
      <section className="overview-grid">
        <article className="glass-card hero-card">
          <div>
            <p className="section-label">Patient overview</p>
            <h3>Calm, intelligent monitoring for better care decisions.</h3>
            <p>
              Review symptoms, track concern levels, and guide next steps with a polished clinical dashboard.
            </p>
          </div>
          <div className="metric-strip">
            <div>
              <strong>87%</strong>
              <span>Accuracy focus</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Monitoring</span>
            </div>
            <div>
              <strong>4.8</strong>
              <span>Clarity score</span>
            </div>
          </div>
        </article>

        <article className="glass-card stats-card">
          <div className="card-heading">
            <h3>Weekly trend</h3>
            <span className="tag">+12%</span>
          </div>
          <svg viewBox="0 0 220 120" className="line-chart" role="img" aria-label="Weekly risk trend chart">
            <path d="M5 90 C35 70, 55 72, 80 55 S125 45, 150 60 S190 80, 215 25" />
            <circle cx="80" cy="55" r="5" />
            <circle cx="150" cy="60" r="5" />
            <circle cx="215" cy="25" r="5" />
          </svg>
        </article>
      </section>

      <section className="content-grid">
        <article className="glass-card form-card">
          <div className="card-heading">
            <h3>Patient form</h3>
            <span className="tag soft">Live assessment</span>
          </div>

          <form>
            <label>
              Age
              <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter age" min="1" max="120" readOnly />
            </label>

            <label>
              Symptoms
              <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} placeholder="Describe visible symptoms" rows="3" readOnly />
            </label>

            <label>
              Duration
              <select name="duration" value={formData.duration} onChange={handleChange} disabled>
                <option value="">Select duration</option>
                <option value="less-than-24-hours">Less than 24 hours</option>
                <option value="1-to-3-days">1 to 3 days</option>
                <option value="more-than-3-days">More than 3 days</option>
              </select>
            </label>

            <label>
              Previous medical history
              <select name="history" value={formData.history} onChange={handleChange} disabled>
                <option value="no">No previous concern</option>
                <option value="yes">Yes, previous concern exists</option>
              </select>
            </label>

            <label>
              Risk level
              <select name="risk" value={formData.risk} onChange={handleChange} disabled>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </label>

            <button type="button" className="primary-btn full-width" disabled>Preview form</button>
          </form>

          <div className="result-box preview-box"></div>
        </article>

        <article className="glass-card insight-card">
          <div className="card-heading">
            <h3>Care insights</h3>
            <span className="tag">Smart view</span>
          </div>

          <div className="bar-list">
            <div>
              <span>Chest symptoms</span>
              <div className="bar"><i style={{ width: '78%' }} /></div>
            </div>
            <div>
              <span>Respiratory concern</span>
              <div className="bar"><i style={{ width: '64%' }} /></div>
            </div>
            <div>
              <span>Follow-up readiness</span>
              <div className="bar"><i style={{ width: '88%' }} /></div>
            </div>
          </div>

          <div className="mini-cards">
            <div>
              <strong>18</strong>
              <span>Critical alerts</span>
            </div>
            <div>
              <strong>6</strong>
              <span>New patients</span>
            </div>
          </div>
        </article>
      </section>
    </>
  )

  const renderPatientsContent = () => (
    <>
      <section className="overview-grid">
        <article className="glass-card hero-card">
          <div>
            <p className="section-label">Patient roster</p>
            <h3>Manage patient intake and case prioritization.</h3>
            <p>
              Review active patients, assign next actions, and keep clinical risk under control from one unified view.
            </p>
          </div>
          <div className="metric-strip">
            <div>
              <strong>42</strong>
              <span>Total patients</span>
            </div>
            <div>
              <strong>9</strong>
              <span>High risk cases</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Urgent reviews</span>
            </div>
          </div>
        </article>

        <article className="glass-card stats-card">
          <div className="card-heading">
            <h3>Patient activity</h3>
            <span className="tag">Live status</span>
          </div>
          <div className="patient-summary">
            <p>24 new visits this week.</p>
            <p>7 patients scheduled for follow-up today.</p>
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="glass-card form-card">
          <div className="card-heading">
            <h3>Patients list</h3>
            <span className="tag soft">Current cases</span>
          </div>

          <div className="table-wrap">
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Condition</th>
                  <th>Risk</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {patientList.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.condition}</td>
                    <td>{patient.risk}</td>
                    <td>{patient.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="glass-card insight-card">
          <div className="card-heading">
            <h3>Case summary</h3>
            <span className="tag">Fast triage</span>
          </div>

          <div className="bar-list">
            <div>
              <span>High-risk patients</span>
              <div className="bar"><i style={{ width: '82%' }} /></div>
            </div>
            <div>
              <span>Follow-up scheduled</span>
              <div className="bar"><i style={{ width: '56%' }} /></div>
            </div>
            <div>
              <span>New admissions</span>
              <div className="bar"><i style={{ width: '71%' }} /></div>
            </div>
          </div>

          <div className="mini-cards">
            <div>
              <strong>4</strong>
              <span>ER referrals</span>
            </div>
            <div>
              <strong>15</strong>
              <span>Follow-up slots</span>
            </div>
          </div>
        </article>
      </section>
    </>
  )

  const renderAlertsContent = () => (
    <>
      <section className="overview-grid">
        <article className="glass-card hero-card">
          <div>
            <p className="section-label">Clinical alerts</p>
            <h3>Stay ahead of urgent patient risk signals.</h3>
            <p>
              Track critical events, alert frequency, and intervention readiness from one fast-response workspace.
            </p>
          </div>
          <div className="metric-strip">
            <div>
              <strong>14</strong>
              <span>Active alerts</span>
            </div>
            <div>
              <strong>5</strong>
              <span>High severity</span>
            </div>
            <div>
              <strong>92%</strong>
              <span>Response rate</span>
            </div>
          </div>
        </article>

        <article className="glass-card stats-card">
          <div className="card-heading">
            <h3>Alert timeline</h3>
            <span className="tag">Realtime</span>
          </div>
          <div className="patient-summary">
            <p>Most alerts resolve within 12 minutes of triage.</p>
            <p>2 cases are pending clinician approval.</p>
          </div>
        </article>
      </section>

      <section className="content-grid alert-grid">
        <article className="glass-card form-card">
          <div className="card-heading">
            <h3>Current alerts</h3>
            <span className="tag soft">Action needed</span>
          </div>
          <div className="alert-list">
            {[
              { title: 'Rapid heart rate', patient: 'Mia Torres', status: 'Urgent' },
              { title: 'Oxygen drop', patient: 'Noah Blake', status: 'High' },
              { title: 'Fever spike', patient: 'Ava Patel', status: 'Review' },
              { title: 'Medication delay', patient: 'Leo Martin', status: 'Monitor' },
            ].map((alert) => (
              <div key={alert.title} className="alert-card">
                <strong>{alert.title}</strong>
                <span>{alert.patient}</span>
                <span>{alert.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card insight-card">
          <div className="card-heading">
            <h3>Risk breakdown</h3>
            <span className="tag">Alert trends</span>
          </div>
          <div className="bar-list">
            <div>
              <span>High severity</span>
              <div className="bar"><i style={{ width: '78%' }} /></div>
            </div>
            <div>
              <span>Moderate risk</span>
              <div className="bar"><i style={{ width: '52%' }} /></div>
            </div>
            <div>
              <span>Low priority</span>
              <div className="bar"><i style={{ width: '32%' }} /></div>
            </div>
          </div>
        </article>
      </section>
    </>
  )

  const renderReportsContent = () => (
    <>
      <section className="overview-grid">
        <article className="glass-card hero-card">
          <div>
            <p className="section-label">Clinical reports</p>
            <h3>Generate insights for every patient review.</h3>
            <p>
              Build assessment summaries, care plans, and outcome reports with one modern reporting experience.
            </p>
          </div>
          <div className="metric-strip">
            <div>
              <strong>11</strong>
              <span>Reports ready</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Drafts in progress</span>
            </div>
            <div>
              <strong>98%</strong>
              <span>Review accuracy</span>
            </div>
          </div>
        </article>

        <article className="glass-card stats-card">
          <div className="card-heading">
            <h3>Report pipeline</h3>
            <span className="tag">Latest</span>
          </div>
          <div className="patient-summary">
            <p>3 outcome reports need clinician sign-off.</p>
            <p>5 summaries were exported this week.</p>
          </div>
        </article>
      </section>

      <section className="content-grid report-grid">
        <article className="glass-card form-card">
          <div className="card-heading">
            <h3>Recent reports</h3>
            <span className="tag soft">Ready to share</span>
          </div>
          <div className="report-list">
            {[
              { title: 'Cardiac risk summary', type: 'Summary', status: 'Signed' },
              { title: 'Respiratory follow-up', type: 'Plan', status: 'Draft' },
              { title: 'Patient discharge note', type: 'Discharge', status: 'Ready' },
              { title: 'Weekly care audit', type: 'Audit', status: 'Review' },
            ].map((report) => (
              <div key={report.title} className="report-card">
                <strong>{report.title}</strong>
                <span>{report.type}</span>
                <span>{report.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card insight-card">
          <div className="card-heading">
            <h3>Reporting tools</h3>
            <span className="tag">Optimized</span>
          </div>
          <div className="bar-list">
            <div>
              <span>Automated insights</span>
              <div className="bar"><i style={{ width: '66%' }} /></div>
            </div>
            <div>
              <span>Data export</span>
              <div className="bar"><i style={{ width: '88%' }} /></div>
            </div>
            <div>
              <span>Review time</span>
              <div className="bar"><i style={{ width: '54%' }} /></div>
            </div>
          </div>
        </article>
      </section>
    </>
  )

  const renderSettingsContent = () => (
    <>
      <section className="overview-grid">
        <article className="glass-card hero-card">
          <div>
            <p className="section-label">System settings</p>
            <h3>Configure the workflow and clinician experience.</h3>
            <p>
              Adjust notifications, preferences, and clinical display settings for a safer patient review environment.
            </p>
          </div>
          <div className="metric-strip">
            <div>
              <strong>5</strong>
              <span>Notification channels</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Review workflows</span>
            </div>
            <div>
              <strong>1</strong>
              <span>Theme active</span>
            </div>
          </div>
        </article>

        <article className="glass-card stats-card">
          <div className="card-heading">
            <h3>Account access</h3>
            <span className="tag">Secure</span>
          </div>
          <div className="patient-summary">
            <p>Two-factor authentication is enabled.</p>
            <p>Notifications are set to clinician priority.</p>
          </div>
        </article>
      </section>

      <section className="content-grid settings-grid">
        <article className="glass-card form-card">
          <div className="card-heading">
            <h3>Preferences</h3>
            <span className="tag soft">Clinic defaults</span>
          </div>
          <form className="settings-form">
            <label>
              Alert notifications
              <select disabled>
                <option>Push + Email</option>
              </select>
            </label>
            <label>
              Default dashboard view
              <select disabled>
                <option>Patient overview</option>
              </select>
            </label>
            <label>
              Review mode
              <select disabled>
                <option>Standard triage</option>
              </select>
            </label>
          </form>
        </article>

        <article className="glass-card insight-card">
          <div className="card-heading">
            <h3>Clinical options</h3>
            <span className="tag">Personalized</span>
          </div>
          <div className="bar-list">
            <div>
              <span>Alert priority</span>
              <div className="bar"><i style={{ width: '74%' }} /></div>
            </div>
            <div>
              <span>Data refresh</span>
              <div className="bar"><i style={{ width: '92%' }} /></div>
            </div>
            <div>
              <span>Report quality</span>
              <div className="bar"><i style={{ width: '68%' }} /></div>
            </div>
          </div>
        </article>
      </section>
    </>
  )

  const renderPageContent = () => {
    switch (currentPage) {
      case 'patients':
        return renderPatientsContent()
      case 'alerts':
        return renderAlertsContent()
      case 'reports':
        return renderReportsContent()
      case 'settings':
        return renderSettingsContent()
      default:
        return renderDashboardContent()
    }
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-icon">✚</div>
          <div>
            <h2>MediRisk</h2>
            <p>Clinical Insight</p>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const route = `#/${item.label.toLowerCase()}`
            const isActive = item.label.toLowerCase() === currentPage
            return (
              <a
                key={item.label}
                href={route}
                className={isActive ? 'nav-item active' : 'nav-item'}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="sidebar-card">
          <p>Live screening</p>
          <h3>12 cases flagged today</h3>
          <button type="button">Review alerts</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow"></p>
            <h1>
              {currentPage === 'patients' && 'Patient directory'}
              {currentPage === 'alerts' && 'Clinical alerts'}
              {currentPage === 'reports' && 'Reports center'}
              {currentPage === 'settings' && 'Settings'}
              {currentPage === 'dashboard' && 'Medical Misdiagnosis Risk Dashboard'}
            </h1>
          </div>
          <div className="topbar-actions">
            <div className="search-pill">
              🔎 {currentPage === 'patients' ? 'Search patients' : currentPage === 'alerts' ? 'Search alerts' : currentPage === 'reports' ? 'Search reports' : 'Search settings'}
            </div>
            <button type="button" className="logout-btn" onClick={onLogout}>Logout</button>
            <div className="avatar">DR</div>
          </div>
        </header>

        {renderPageContent()}
      </main>
    </div>
  )
}
