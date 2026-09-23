import json
from datetime import datetime, timezone
from typing import Any
from bson import ObjectId

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

# MongoDB connection
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "medical_records"
COLLECTION_NAME = "patient_assessments"

try:
    client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    print("✅ Connected to MongoDB successfully")
except (ConnectionFailure, ServerSelectionTimeoutError) as e:
    print(f"❌ MongoDB connection failed: {e}")
    print("Make sure MongoDB is running: mongod")
    raise

app = FastAPI(
    title="Medical Misdiagnosis Risk Detector API",
    description="Backend API for the Medical Misdiagnosis Risk Detector",
    version="1.0.0"
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientAssessment(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    age: int = Field(ge=0, le=150)
    gender: str = Field(min_length=1, max_length=50)
    payload: dict[str, Any] = Field(default_factory=dict)
    risk: str = Field(pattern="^(Low|Medium|High)$")
    riskScore: int = Field(ge=0, le=100)
    riskFactors: list[str] = Field(default_factory=list)


def serialize_assessment(doc: dict) -> dict[str, Any]:
    """Convert MongoDB document to API response format"""
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "age": doc["age"],
        "gender": doc["gender"],
        **doc["payload"],
        "risk": doc["risk"],
        "riskScore": doc["risk_score"],
        "riskFactors": doc["risk_factors"],
        "createdAt": doc["created_at"],
    }


@app.get("/")
def home():
    return {
        "message": "Medical Misdiagnosis Risk Detector API is running (MongoDB)"
    }


@app.get("/health")
def health_check():
    try:
        client.admin.command('ping')
        return {"status": "healthy", "database": "MongoDB"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database unhealthy: {str(e)}")


@app.post("/api/patients", status_code=status.HTTP_201_CREATED)
def create_patient(assessment: PatientAssessment):
    created_at = datetime.now(timezone.utc).isoformat()

    document = {
        "name": assessment.name.strip(),
        "age": assessment.age,
        "gender": assessment.gender,
        "payload": assessment.payload,
        "risk": assessment.risk,
        "risk_score": assessment.riskScore,
        "risk_factors": assessment.riskFactors,
        "created_at": created_at,
    }

    result = collection.insert_one(document)
    document["_id"] = result.inserted_id

    return serialize_assessment(document)


@app.get("/api/patients")
def list_patients():
    patients = list(collection.find().sort("created_at", -1).sort("_id", -1))
    return [serialize_assessment(patient) for patient in patients]


@app.get("/api/patients/{patient_id}")
def get_patient(patient_id: str):
    try:
        patient = collection.find_one({"_id": ObjectId(patient_id)})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID"
        )

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient assessment not found"
        )

    return serialize_assessment(patient)


@app.put("/api/patients/{patient_id}")
def update_patient(patient_id: str, assessment: PatientAssessment):
    try:
        obj_id = ObjectId(patient_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID"
        )

    # Check if patient exists
    existing = collection.find_one({"_id": obj_id})
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient assessment not found"
        )

    update_data = {
        "name": assessment.name.strip(),
        "age": assessment.age,
        "gender": assessment.gender,
        "payload": assessment.payload,
        "risk": assessment.risk,
        "risk_score": assessment.riskScore,
        "risk_factors": assessment.riskFactors,
    }

    collection.update_one({"_id": obj_id}, {"$set": update_data})
    updated = collection.find_one({"_id": obj_id})

    return serialize_assessment(updated)


@app.delete("/api/patients/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(patient_id: str):
    try:
        obj_id = ObjectId(patient_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID"
        )

    # Check if patient exists
    existing = collection.find_one({"_id": obj_id})
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient assessment not found"
        )

    collection.delete_one({"_id": obj_id})


@app.get("/api/statistics")
def get_statistics():
    total = collection.count_documents({})

    risk_counts = {}
    for risk_level in ["Low", "Medium", "High"]:
        count = collection.count_documents({"risk": risk_level})
        if count > 0:
            risk_counts[risk_level] = count

    high_risk_count = risk_counts.get("High", 0)

    return {
        "totalAssessments": total,
        "highRiskCount": high_risk_count,
        "statisticsByRisk": risk_counts
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
