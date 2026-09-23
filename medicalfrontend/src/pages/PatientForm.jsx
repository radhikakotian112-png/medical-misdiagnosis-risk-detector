import { useEffect, useState } from "react";
import { createPatient, uploadDocument } from "../api";
import { Activity, FileImage, Hospital, MessageCircle, ShieldAlert, Stethoscope } from "lucide-react";

function PatientForm() {
  const initialPatient = {
    // Basic information
    name: "",
    age: "",
    gender: "",
    height: "",
    currentWeight: "",
    previousWeight: "",
    weightChangePeriod: "",

    // Symptoms
    symptoms: "",
    duration: "",
    appetiteChange: "Normal",
    skinColorChange: "No Change",
    skinChanges: "None",
    eyeColorChange: "Normal",
    fatigue: "None",
    swelling: "None",
    sleepChanges: "Normal",
    thirstChanges: "Normal",
    urinationChanges: "Normal",
    bowelChanges: "Normal",
    painPattern: "None",
    breathingChanges: "Normal",
    temperaturePattern: "Normal",

    // Medical history
    history: "",
    previousDiagnosis: "",
    previousSurgery: "No",
    previousHospitalization: "No",
    previousTreatment: "",
    currentMedication: "",
    medicationChanges: "No",
    allergies: "",
    familyHistory: "",

    // Medical measurements
    bloodPressure: "",
    sugar: "",
    heartRate: "",

    // Previous evidence
    bloodTest: "No",
    xray: "No",
    ctScan: "No",
    mri: "No",
    ultrasound: "No",
    pathology: "No",

    // Change since last visit
    changesSinceLastVisit: "",

    // File
    medicalReport: "",
  };

  const [patient, setPatient] = useState(initialPatient);
  const [prediction, setPrediction] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentPreview, setDocumentPreview] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [hospitalSearchStatus, setHospitalSearchStatus] = useState("");

  useEffect(() => () => {
    if (documentPreview) URL.revokeObjectURL(documentPreview);
  }, [documentPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatient({
      ...patient,
      [name]: value,
    });
  };

  const calculateRisk = () => {
    let score = 0;
    const riskFactors = [];
    const possibleConditions = [];
    const seriousConditions = [];

    // AGE
    if (Number(patient.age) >= 65) {
      score += 15;
      riskFactors.push("Advanced age");
    } else if (Number(patient.age) >= 45) {
      score += 8;
      riskFactors.push("Age above 45");
    }

    // WEIGHT CHANGE
    if (patient.currentWeight && patient.previousWeight) {
      const current = Number(patient.currentWeight);
      const previous = Number(patient.previousWeight);

      if (previous > 0) {
        const percentageChange =
          Math.abs((current - previous) / previous) * 100;

        if (percentageChange >= 10) {
          score += 20;
          riskFactors.push("Significant weight change");
        } else if (percentageChange >= 5) {
          score += 10;
          riskFactors.push("Noticeable weight change");
        }
      }
    }

    // APPETITE
    if (patient.appetiteChange !== "Normal") {
      score += 5;
      riskFactors.push("Appetite change");
    }

    // SKIN COLOR
    if (patient.skinColorChange !== "No Change") {
      score += 12;
      riskFactors.push("Skin color change");
    }

    // EYE COLOR
    if (patient.eyeColorChange !== "Normal") {
      score += 10;
      riskFactors.push("Eye color change");
    }

    // SKIN
    if (patient.skinChanges !== "None") {
      score += 5;
      riskFactors.push("Skin changes");
    }

    // FATIGUE
    if (patient.fatigue === "Severe") {
      score += 10;
      riskFactors.push("Severe fatigue");
    } else if (patient.fatigue === "Moderate") {
      score += 5;
      riskFactors.push("Moderate fatigue");
    }

    // SWELLING
    if (patient.swelling !== "None") {
      score += 8;
      riskFactors.push("Swelling");
    }

    // URINATION
    if (patient.urinationChanges !== "Normal") {
      score += 8;
      riskFactors.push("Urination changes");
    }

    // BOWEL
    if (patient.bowelChanges !== "Normal") {
      score += 5;
      riskFactors.push("Bowel changes");
    }

    // BREATHING
    if (patient.breathingChanges !== "Normal") {
      score += 10;
      riskFactors.push("Breathing changes");
    }

    // TEMPERATURE
    if (patient.temperaturePattern !== "Normal") {
      score += 7;
      riskFactors.push("Abnormal temperature pattern");
    }

    // PAIN
    if (patient.painPattern === "New") {
      score += 5;
      riskFactors.push("New pain");
    } else if (patient.painPattern === "Increasing") {
      score += 8;
      riskFactors.push("Increasing pain");
    }

    // PREVIOUS DIAGNOSIS
    if (patient.previousDiagnosis.trim() !== "") {
      score += 5;
      riskFactors.push("Previous diagnosis available");
    }

    // SURGERY
    if (patient.previousSurgery === "Yes") {
      score += 5;
      riskFactors.push("Previous surgery");
    }

    // HOSPITALIZATION
    if (patient.previousHospitalization === "Yes") {
      score += 5;
      riskFactors.push("Previous hospitalization");
    }

    // MEDICATION
    if (patient.medicationChanges === "Yes") {
      score += 5;
      riskFactors.push("Medication recently changed");
    }

    // PREVIOUS REPORTS
    const evidenceCount = [
      patient.bloodTest,
      patient.xray,
      patient.ctScan,
      patient.mri,
      patient.ultrasound,
      patient.pathology,
    ].filter((item) => item === "Yes").length;

    if (evidenceCount > 0) {
      score += 5;
      riskFactors.push("Previous medical evidence available");
    }

    // CHANGES SINCE LAST VISIT
    if (patient.changesSinceLastVisit.trim() !== "") {
      score += 8;
      riskFactors.push("Changes since previous visit");
    }

    // CLASSIC SYMPTOMS
    const symptoms = patient.symptoms.toLowerCase();

    if (
      symptoms.includes("chest") ||
      symptoms.includes("breathing") ||
      symptoms.includes("fainting") ||
      patient.breathingChanges !== "Normal"
    ) {
      possibleConditions.push("Cardiovascular or respiratory condition");
      seriousConditions.push("Acute heart or lung emergency should be ruled out");
    }

    if (
      symptoms.includes("stomach") ||
      symptoms.includes("abdominal") ||
      symptoms.includes("nausea") ||
      symptoms.includes("vomit") ||
      patient.bowelChanges !== "Normal"
    ) {
      possibleConditions.push("Gastrointestinal condition");
    }

    if (
      symptoms.includes("urine") ||
      symptoms.includes("kidney") ||
      patient.urinationChanges !== "Normal"
    ) {
      possibleConditions.push("Urinary or kidney condition");
    }

    if (
      symptoms.includes("yellow") ||
      symptoms.includes("jaundice") ||
      patient.skinColorChange === "Yellowish" ||
      patient.eyeColorChange === "Yellowish"
    ) {
      possibleConditions.push("Liver or gallbladder condition");
      seriousConditions.push("Serious liver or bile-duct disease should be ruled out");
    }

    if (
      symptoms.includes("severe headache") ||
      symptoms.includes("slurred speech") ||
      symptoms.includes("weakness") ||
      symptoms.includes("confusion")
    ) {
      seriousConditions.push("Stroke or another neurological emergency should be ruled out");
    }

    if (
      symptoms.includes("chest") ||
      symptoms.includes("breathing") ||
      symptoms.includes("fainting")
    ) {
      score += 10;
      riskFactors.push("Important symptoms reported");
    }

    // FINAL RISK
    let risk = "Low";

    if (score >= 45) {
      risk = "High";
    } else if (score >= 20) {
      risk = "Medium";
    }

    return {
      score: Math.min(score, 100),
      risk,
      riskFactors,
      possibleConditions,
      seriousConditions,
      recommendations: seriousConditions.length > 0
        ? ["Seek same-day assessment at an emergency department or urgent-care clinic.", "Bring current medicines, allergies, and previous reports for clinician review."]
        : risk === "High"
          ? ["Arrange a prompt appointment with a licensed physician for a full assessment.", "Do not start, stop, or change treatment without clinical advice."]
          : ["Arrange routine follow-up with a primary-care clinician.", "Continue monitoring symptoms and bring this assessment to your next appointment."],
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setPatient({
      ...patient,
      medicalReport: file ? file.name : "",
    });
    setSelectedDocument(file || null);
    setDocumentPreview(file && file.type.startsWith("image/") ? URL.createObjectURL(file) : "");
  };

  const getGuidanceReply = (question) => {
    const text = question.toLowerCase();
    if (text.includes("hospital") || text.includes("where")) {
      return prediction?.seriousConditions.length
        ? "Because this screening found an urgent warning, contact your local emergency department or emergency medical service now. I cannot verify live hospital availability from this app."
        : "For this result, start with a licensed primary-care clinic. Ask them whether a specialist or hospital referral is needed based on examination and test results."
    }
    if (text.includes("treatment") || text.includes("medicine") || text.includes("medication")) {
      return "Treatment depends on a clinician's examination and confirmed diagnosis. Do not start, stop, or change medicines based on this screening. Bring your medicines, allergies, and uploaded report to the appointment."
    }
    if (text.includes("risk") || text.includes("result")) {
      return `The current screening result is ${prediction?.risk || "not available"} risk (${prediction?.score ?? "-"}/100). It highlights areas for clinical review; it does not confirm a disease.`
    }
    return "I can explain the risk result, suggest the appropriate level of care, or explain why a clinician should review the uploaded report. What would you like to know?";
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const question = chatInput.trim();
    if (!question) return;
    setChatMessages((messages) => [
      ...messages,
      { from: "You", text: question },
      { from: "Clinical guide", text: getGuidanceReply(question) },
    ]);
    setChatInput("");
  };

  const findNearbyHospitals = () => {
    if (!navigator.geolocation) {
      setHospitalSearchStatus("Location is not available in this browser. Search for hospitals using your maps app.");
      return;
    }
    setHospitalSearchStatus("Requesting your location...");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const mapUrl = `https://www.google.com/maps/search/hospitals/@${coords.latitude},${coords.longitude},13z`;
        window.open(mapUrl, "_blank", "noopener,noreferrer");
        setHospitalSearchStatus("Nearby hospitals opened in a new map tab.");
      },
      () => setHospitalSearchStatus("Location permission was not granted. Search for hospitals using your maps app."),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");

    if (!patient.name || !patient.age || !patient.gender) {
      setSubmissionError("Please enter Patient Name, Age, and Gender before analyzing.");
      return;
    }

    const analysis = calculateRisk();
    let weightDifference = null;

    if (patient.currentWeight && patient.previousWeight) {
      weightDifference = (
        Number(patient.currentWeight) -
        Number(patient.previousWeight)
      ).toFixed(1);
    }

    try {
      let document = null;
      if (selectedDocument) {
        document = await uploadDocument(selectedDocument);
      }

      setPrediction({ ...analysis, documentName: document?.filename || selectedDocument?.name || "" });

      await createPatient({
        name: patient.name,
        age: Number(patient.age),
        gender: patient.gender,
        payload: { ...patient, weightDifference, document },
        risk: analysis.risk,
        riskScore: analysis.score,
        riskFactors: analysis.riskFactors,
      });

      window.dispatchEvent(new Event("patientsUpdated"));
      setPatient(initialPatient);
      setSelectedDocument(null);
      setChatMessages([
        { from: "Clinical guide", text: "Your screening result is ready. Ask me about the risk result, treatment safety, or what type of hospital or clinic to contact." },
      ]);
    } catch (error) {
      setSubmissionError(error.message);
    }
  };

  return (
    <div className="form-container assessment-page">

      <h1>Patient Clinical Assessment</h1>

      <p className="form-subtitle">
        Enter patient changes, clinical symptoms and previous medical evidence
        for risk assessment.
      </p>

      <form onSubmit={handleSubmit} className="patient-form">

        {/* ================= BASIC INFORMATION ================= */}

        <section className="assessment-section">
          <div className="form-section-title">👤 Basic Patient Information</div>

          <div className="form-grid">

          <div>
            <label>Patient Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter patient name"
              value={patient.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Age</label>

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={patient.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Gender</label>

            <select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Height (cm)</label>

            <input
              type="number"
              name="height"
              placeholder="Height"
              value={patient.height}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Current Weight (kg)</label>

            <input
              type="number"
              step="0.1"
              name="currentWeight"
              placeholder="Current weight"
              value={patient.currentWeight}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Previous Weight (kg)</label>

            <input
              type="number"
              step="0.1"
              name="previousWeight"
              placeholder="Previous weight"
              value={patient.previousWeight}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Weight Change Period</label>

            <select
              name="weightChangePeriod"
              value={patient.weightChangePeriod}
              onChange={handleChange}
            >
              <option value="">Select Period</option>
              <option>Less than 1 month</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>More than 6 months</option>
            </select>
          </div>

          </div>
        </section>

        {/* ================= SYMPTOMS ================= */}

        <section className="assessment-section">
          <div className="form-section-title">🧬 Symptoms & Body Changes</div>

          <div className="form-grid">

          <div>
            <label>Symptoms</label>

            <input
              type="text"
              name="symptoms"
              placeholder="Fever, chest pain, fatigue..."
              value={patient.symptoms}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Duration</label>

            <input
              type="text"
              name="duration"
              placeholder="e.g. 3 Days"
              value={patient.duration}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Appetite Change</label>

            <select
              name="appetiteChange"
              value={patient.appetiteChange}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Increased</option>
              <option>Decreased</option>
            </select>
          </div>

          <div>
            <label>Skin Color Change</label>

            <select
              name="skinColorChange"
              value={patient.skinColorChange}
              onChange={handleChange}
            >
              <option>No Change</option>
              <option>Darkening</option>
              <option>Yellowish</option>
              <option>Pale</option>
              <option>Bluish</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Skin Changes</label>

            <select
              name="skinChanges"
              value={patient.skinChanges}
              onChange={handleChange}
            >
              <option>None</option>
              <option>Rash</option>
              <option>Dryness</option>
              <option>Itching</option>
              <option>Unusual Marks</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Eye Color Change</label>

            <select
              name="eyeColorChange"
              value={patient.eyeColorChange}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Yellowish</option>
              <option>Pale</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Fatigue Level</label>

            <select
              name="fatigue"
              value={patient.fatigue}
              onChange={handleChange}
            >
              <option>None</option>
              <option>Mild</option>
              <option>Moderate</option>
              <option>Severe</option>
            </select>
          </div>

          <div>
            <label>Swelling</label>

            <select
              name="swelling"
              value={patient.swelling}
              onChange={handleChange}
            >
              <option>None</option>
              <option>Face</option>
              <option>Legs</option>
              <option>Abdomen</option>
              <option>Multiple Areas</option>
            </select>
          </div>

          <div>
            <label>Sleep Changes</label>

            <select
              name="sleepChanges"
              value={patient.sleepChanges}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Increased</option>
              <option>Reduced</option>
              <option>Interrupted</option>
            </select>
          </div>

          <div>
            <label>Thirst Changes</label>

            <select
              name="thirstChanges"
              value={patient.thirstChanges}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Increased</option>
              <option>Reduced</option>
            </select>
          </div>

          <div>
            <label>Urination Changes</label>

            <select
              name="urinationChanges"
              value={patient.urinationChanges}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Increased</option>
              <option>Reduced</option>
              <option>Painful</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Bowel Changes</label>

            <select
              name="bowelChanges"
              value={patient.bowelChanges}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Constipation</option>
              <option>Diarrhea</option>
              <option>Color Change</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Pain Pattern</label>

            <select
              name="painPattern"
              value={patient.painPattern}
              onChange={handleChange}
            >
              <option>None</option>
              <option>New</option>
              <option>Increasing</option>
              <option>Recurring</option>
              <option>Unchanged</option>
            </select>
          </div>

          <div>
            <label>Breathing Changes</label>

            <select
              name="breathingChanges"
              value={patient.breathingChanges}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Shortness of Breath</option>
              <option>Difficulty Breathing</option>
            </select>
          </div>

          <div>
            <label>Temperature Pattern</label>

            <select
              name="temperaturePattern"
              value={patient.temperaturePattern}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Recurrent Fever</option>
              <option>Night Sweats</option>
              <option>Other</option>
            </select>
          </div>

          </div>
        </section>

        {/* ================= MEDICAL HISTORY ================= */}

        <section className="assessment-section">
          <div className="form-section-title">🏥 Previous Medical History</div>

          <div className="form-grid">

          <div>
            <label>Medical History</label>

            <input
              type="text"
              name="history"
              placeholder="Diabetes, BP, asthma..."
              value={patient.history}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Previous Diagnosis</label>

            <input
              type="text"
              name="previousDiagnosis"
              placeholder="Previous diagnosis"
              value={patient.previousDiagnosis}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Previous Surgery</label>

            <select
              name="previousSurgery"
              value={patient.previousSurgery}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div>
            <label>Previous Hospitalization</label>

            <select
              name="previousHospitalization"
              value={patient.previousHospitalization}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div>
            <label>Previous Treatment</label>

            <input
              type="text"
              name="previousTreatment"
              placeholder="Previous treatment"
              value={patient.previousTreatment}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Current Medication</label>

            <input
              type="text"
              name="currentMedication"
              placeholder="Current medication"
              value={patient.currentMedication}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Medication Changed?</label>

            <select
              name="medicationChanges"
              value={patient.medicationChanges}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div>
            <label>Known Allergies</label>

            <input
              type="text"
              name="allergies"
              placeholder="Drug / food allergies"
              value={patient.allergies}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Family Medical History</label>

            <input
              type="text"
              name="familyHistory"
              placeholder="Relevant family history"
              value={patient.familyHistory}
              onChange={handleChange}
            />
          </div>

          </div>
        </section>

        {/* ================= MEDICAL MEASUREMENTS ================= */}

        <section className="assessment-section">
          <div className="form-section-title">🩺 Clinical Measurements</div>

          <div className="form-grid">

          <div>
            <label>Blood Pressure</label>

            <input
              type="text"
              name="bloodPressure"
              placeholder="120/80"
              value={patient.bloodPressure}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Blood Sugar</label>

            <input
              type="number"
              name="sugar"
              placeholder="Sugar Level"
              value={patient.sugar}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Heart Rate</label>

            <input
              type="number"
              name="heartRate"
              placeholder="72"
              value={patient.heartRate}
              onChange={handleChange}
            />
          </div>

          </div>
        </section>

        {/* ================= PREVIOUS EVIDENCE ================= */}

        <section className="assessment-section">
          <div className="form-section-title">📄 Previous Medical Evidence</div>

          <div className="form-grid evidence-grid">

          <label>
            <input
              type="checkbox"
              checked={patient.bloodTest === "Yes"}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  bloodTest: e.target.checked ? "Yes" : "No",
                })
              }
            />
            Previous Blood Test
          </label>

          <label>
            <input
              type="checkbox"
              checked={patient.xray === "Yes"}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  xray: e.target.checked ? "Yes" : "No",
                })
              }
            />
            Previous X-Ray
          </label>

          <label>
            <input
              type="checkbox"
              checked={patient.ctScan === "Yes"}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  ctScan: e.target.checked ? "Yes" : "No",
                })
              }
            />
            Previous CT Scan
          </label>

          <label>
            <input
              type="checkbox"
              checked={patient.mri === "Yes"}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  mri: e.target.checked ? "Yes" : "No",
                })
              }
            />
            Previous MRI
          </label>

          <label>
            <input
              type="checkbox"
              checked={patient.ultrasound === "Yes"}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  ultrasound: e.target.checked ? "Yes" : "No",
                })
              }
            />
            Previous Ultrasound
          </label>

          <label>
            <input
              type="checkbox"
              checked={patient.pathology === "Yes"}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  pathology: e.target.checked ? "Yes" : "No",
                })
              }
            />
            Pathology / Biopsy
          </label>

          </div>
        </section>

        {/* ================= CHANGES SINCE LAST VISIT ================= */}

        <section className="assessment-section">
          <div className="form-section-title">🔄 Changes Since Previous Visit</div>

          <div className="form-grid">

          <div className="full-width-field">
            <label>
              Describe changes since the previous consultation
            </label>

            <textarea
              name="changesSinceLastVisit"
              placeholder="New symptoms, worsening symptoms, weight changes, new medication, new test results..."
              value={patient.changesSinceLastVisit}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="full-width-field">
            <label>Upload Previous Medical Report</label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />

            {patient.medicalReport && (
              <small>
                Selected: {patient.medicalReport}
              </small>
            )}
          </div>

          </div>
        </section>

        {/* ================= SUBMIT ================= */}

        <button type="submit" className="submit-btn">
          Analyze Misdiagnosis Risk
        </button>
        {submissionError && <p className="form-error" role="alert">{submissionError}</p>}

      </form>

      {prediction && (
        <section className="prediction-card" aria-live="polite">
          <div className="prediction-heading">
            <div className="result-icon-wrap"><ShieldAlert className="result-icon pulse-icon" size={28} /></div>
            <div>
              <p className="panel-eyebrow">Clinical screening output</p>
              <h2>Prediction Result</h2>
            </div>
          </div>
          <div className="score-display">
            <Activity className="score-icon float-icon" size={34} />
            <h1>{prediction.score}/100</h1>
          </div>
          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${prediction.score}%` }}
            />
          </div>
          <h2 className={prediction.risk === "Low" ? "" : "high-risk"}>
            {prediction.risk.toUpperCase()} RISK
          </h2>
          <h3><Stethoscope size={18} /> Risk factors</h3>
          {prediction.riskFactors.length > 0 ? (
            <ul>
              {prediction.riskFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          ) : (
            <p>No additional risk factors identified.</p>
          )}
          <h3><Stethoscope size={18} /> Possible areas for clinical review</h3>
          {prediction.possibleConditions.length > 0 ? (
            <ul>
              {prediction.possibleConditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          ) : (
            <p>No specific clinical area identified from the entered details.</p>
          )}
          {prediction.seriousConditions.length > 0 && (
            <>
              <h3>Serious conditions to rule out</h3>
              <ul>
                {prediction.seriousConditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
              <p className="high-risk">
                Seek urgent medical assessment for severe, sudden, or worsening symptoms.
              </p>
            </>
          )}
          <h3>Recommended next steps</h3>
          <ul>
            {prediction.recommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
          {documentPreview && (
            <div className="document-preview">
              <h3><FileImage size={18} /> Uploaded image for clinician review</h3>
              <img src={documentPreview} alt="Uploaded medical report preview" />
            </div>
          )}
          {prediction.documentName && !documentPreview && (
            <div className="document-preview">
              <h3><FileImage size={18} /> Uploaded report</h3>
              <p>Attached: {prediction.documentName}. Open it with a licensed clinician for review.</p>
            </div>
          )}
          <div className="guidance-chat">
            <h3><MessageCircle size={18} /> Clinical guidance assistant</h3>
            <p className="chat-disclaimer">Educational guidance only. It cannot diagnose disease, prescribe treatment, or check live hospital beds.</p>
            <button type="button" className="hospital-search-btn" onClick={findNearbyHospitals}>
              <Hospital size={17} /> Find nearby hospitals
            </button>
            {hospitalSearchStatus && <p className="chat-status" role="status">{hospitalSearchStatus}</p>}
            <div className="chat-messages" aria-live="polite">
              {chatMessages.map((message, index) => (
                <p key={`${message.from}-${index}`}><strong>{message.from}:</strong> {message.text}</p>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="chat-form">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about care or the result" aria-label="Ask clinical guidance assistant" />
              <button type="submit">Ask</button>
            </form>
          </div>
          <p>This is a screening aid, not a medical diagnosis.</p>
        </section>
      )}

    </div>
  );
}

export default PatientForm;