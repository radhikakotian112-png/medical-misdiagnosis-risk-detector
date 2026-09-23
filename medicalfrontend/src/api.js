const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function authHeaders(headers = {}) {
  const token = localStorage.getItem("accessToken");
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: authHeaders(options.headers) });
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedIn");
  }
  return response;
}

export async function login(email, password) {
  const response = await request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || "Invalid email or password");
  return data;
}

export async function register(email, password) {
  const response = await request("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || "Could not create account");
  return data;
}

export async function createPatient(patient) {
  const response = await request("/api/patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Could not save patient assessment");
  }

  return response.json();
}

export async function getPatients() {
  const response = await request("/api/patients");
  if (!response.ok) throw new Error("Could not load patient assessments");
  return response.json();
}

export async function getPatient(id) {
  const response = await request(`/api/patients/${id}`);
  if (!response.ok) throw new Error("Could not load patient assessment");
  return response.json();
}

export async function updatePatient(id, patient) {
  const response = await request(`/api/patients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Could not update patient assessment");
  }

  return response.json();
}

export async function deletePatient(id) {
  const response = await request(`/api/patients/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Could not delete patient assessment");
  }
}

export async function getStatistics() {
  const response = await request("/api/statistics");
  if (!response.ok) throw new Error("Could not load statistics");
  return response.json();
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await request("/api/documents", {
    method: "POST",
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || "Could not upload medical document");
  return data;
}

export async function predictRisk(patientData) {
  const response = await request("/api/predict-risk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientData),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || "Could not generate prediction");
  return data;
}

export async function getModelStatus() {
  const response = await request("/api/model-status");
  if (!response.ok) throw new Error("Could not check model status");
  return response.json();
}