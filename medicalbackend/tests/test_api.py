import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import main
from fastapi.testclient import TestClient


client = TestClient(main.app)


def setup_test_database(tmp_path, monkeypatch):
    database_path = tmp_path / "test.db"
    monkeypatch.setattr(main, "DATABASE_PATH", database_path)
    main.initialise_database()


def login():
    response = client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "password": "ChangeMe123!"},
    )
    assert response.status_code == 200
    return response.json()["access_token"]


def test_login_returns_jwt_and_rejects_wrong_password(tmp_path, monkeypatch):
    setup_test_database(tmp_path, monkeypatch)

    token = login()
    assert token
    assert client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "password": "wrong-password"},
    ).status_code == 401


def test_anyone_can_register_with_a_different_email(tmp_path, monkeypatch):
    setup_test_database(tmp_path, monkeypatch)

    response = client.post(
        "/api/auth/register",
        json={"email": "new.user@example.com", "password": "SecurePass123!"},
    )
    assert response.status_code == 201
    assert response.json()["user"]["email"] == "new.user@example.com"
    assert client.post(
        "/api/auth/login",
        json={"email": "new.user@example.com", "password": "SecurePass123!"},
    ).status_code == 200
    assert client.post(
        "/api/auth/register",
        json={"email": "new.user@example.com", "password": "SecurePass123!"},
    ).status_code == 409


def test_patient_routes_require_valid_jwt(tmp_path, monkeypatch):
    setup_test_database(tmp_path, monkeypatch)

    assert client.get("/api/patients").status_code == 401
    assert client.get(
        "/api/patients", headers={"Authorization": "Bearer invalid"}
    ).status_code == 401
    assert client.get(
        "/api/patients", headers={"Authorization": f"Bearer {login()}"}
    ).status_code == 200


def test_patient_validation_and_persistence(tmp_path, monkeypatch):
    setup_test_database(tmp_path, monkeypatch)
    headers = {"Authorization": f"Bearer {login()}"}
    patient = {
        "name": "Test Patient",
        "age": 40,
        "gender": "Female",
        "payload": {"symptoms": "fatigue"},
        "risk": "Low",
        "riskScore": 10,
        "riskFactors": [],
    }

    created = client.post("/api/patients", json=patient, headers=headers)
    assert created.status_code == 201
    assert created.json()["name"] == "Test Patient"
    assert client.get("/api/patients", headers=headers).json()[0]["name"] == "Test Patient"

    extra_field = {**patient, "unexpected": "blocked"}
    assert client.post("/api/patients", json=extra_field, headers=headers).status_code == 422

    blank_name = {**patient, "name": "   "}
    assert client.post("/api/patients", json=blank_name, headers=headers).status_code == 422


def test_security_headers_are_present(tmp_path, monkeypatch):
    setup_test_database(tmp_path, monkeypatch)

    response = client.get("/health")
    assert response.status_code == 200
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["x-frame-options"] == "DENY"


def test_document_upload_requires_auth_and_validates_type(tmp_path, monkeypatch):
    setup_test_database(tmp_path, monkeypatch)

    assert client.post(
        "/api/documents", files={"file": ("report.pdf", b"%PDF", "application/pdf")}
    ).status_code == 401

    headers = {"Authorization": f"Bearer {login()}"}
    uploaded = client.post(
        "/api/documents",
        headers=headers,
        files={"file": ("report.pdf", b"%PDF", "application/pdf")},
    )
    assert uploaded.status_code == 201
    assert uploaded.json()["filename"] == "report.pdf"

    rejected = client.post(
        "/api/documents",
        headers=headers,
        files={"file": ("notes.txt", b"not allowed", "text/plain")},
    )
    assert rejected.status_code == 415
