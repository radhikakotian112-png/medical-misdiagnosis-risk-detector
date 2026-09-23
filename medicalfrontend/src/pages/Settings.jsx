import { Bell, Check, FileCheck, Languages, LayoutGrid, MessageSquare, Moon, RotateCcw, Save, Sun } from "lucide-react";
import "./Settings.css";

function Settings({ settings, t, onChange, onReset }) {
  const setPreference = (name, value) => onChange({ [name]: value });

  return <div className="settings-page">
    <header className="settings-heading"><div><p className="page-kicker">{t.workspacePreferences}
      </p>
      <h1>{t.settings}</h1><p>{t.settingsDescription}
      </p>
      </div>
      <span className="settings-saved"><Check size={15} /> {t.savedAutomatically}
      </span>
      </header>

    <section className="settings-section">
      <div className="settings-section-title"><Sun size={19} />
      <div>
        <h2>{t.appearance}</h2>
        <p>{t.appearanceDescription}</p>
        </div></div>
        <div className="theme-options" role="radiogroup" aria-label={t.appearance}>
        <ThemeOption icon={<Sun size={18} />} title={t.light} description={t.lightDescription} 
        selected={settings.theme === "light"}
        onClick={() => setPreference("theme", "light")} />
        <ThemeOption icon={<Moon size={18} />} title={t.dark} description={t.darkDescription} 
        selected={settings.theme === "dark"}
        onClick={() => setPreference("theme", "dark")} />
        <ThemeOption icon={<span className="contrast-icon">◐</span>} title={t.highContrast} description={t.highContrastDescription} 
        selected={settings.theme === "contrast"} 
        onClick={() => setPreference("theme", "contrast")} /></div><PreferenceRow icon={<LayoutGrid size={18} />} title={t.compactLayout} description={t.compactDescription} 
        control={<Toggle checked={settings.compactMode}
        onChange={(value) => setPreference("compactMode", value)} 
        label={t.compactLayout} t={t} />} /></section>

    <section className="settings-section">
      <div className="settings-section-title"><Save size={19} /><div><h2>{t.clinicalWorkflow}</h2><p>{t.workflowDescription}</p></div></div><PreferenceRow icon={<FileCheck size={18} />} title={t.autoSaveReports} description={t.autoSaveDescription} 
      control={<Toggle checked={settings.autoSaveReports} 
      onChange={(value) => setPreference("autoSaveReports", value)} 
      label={t.autoSaveReports} t={t} />} /><PreferenceRow icon={<Bell size={18} />} title={t.emailNotifications} description={t.emailDescription} control={<Toggle checked={settings.emailNotifications} 
      onChange={(value) => setPreference("emailNotifications", value)} label={t.emailNotifications} t={t} />} /><PreferenceRow icon={<MessageSquare size={18} />} title={t.smsNotifications} description={t.smsDescription} 
      control={<Toggle checked={settings.smsNotifications}
      onChange={(value) => setPreference("smsNotifications", value)} 
      label={t.smsNotifications} t={t} />} /></section>

    <section className="settings-section"><div className="settings-section-title"><Languages size={19} /><div>
      <h2>{t.regionalPreferences}</h2><p>{t.regionalDescription}</p></div></div>
      <label className="language-field" htmlFor="settings-language"><span>{t.interfaceLanguage}</span>
    <select id="settings-language" value={settings.language} 
    onChange={(event) => setPreference("language", event.target.value)}>
      <option value="English">{t.languageEnglish}</option><option value="Spanish">{t.languageSpanish}</option>
      <option value="French">{t.languageFrench}</option><option value="Hindi">{t.languageHindi}</option>
      <option value="Kannada">{t.languageKannada}</option><option value="Tulu">{t.languageTulu}</option>
      </select></label></section>

    <button type="button" className="reset-settings" 
    onClick={onReset}><RotateCcw size={16} /> {t.resetSettings}</button>
  </div>;
}

function ThemeOption({ icon, title, description, selected, onClick }) {
  return <button type="button" className={`theme-option${selected ? " selected" : ""}`} 
  onClick={onClick} aria-pressed={selected}>
    <span className="theme-icon">{icon}</span>
  <span><strong>{title}</strong><small>{description}</small></span>{selected && <Check className="theme-check" size={17} />}</button>;
}

function PreferenceRow({ icon, title, description, control }) {
  return <div className="preference-row">
  <span className="preference-icon">{icon}</span>
  <div className="preference-copy"><strong>{title}</strong><p>{description}</p></div>{control}</div>;
}

function Toggle({ checked, onChange, label, t }) {
  return <button type="button" className={`toggle${checked ? " checked" : ""}`}
   onClick={() => onChange(!checked)} aria-pressed={checked} aria-label={`${label}: ${checked ? t.on : t.off}`}><span /></button>;
}

export default Settings;