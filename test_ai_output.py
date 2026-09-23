"""
Test AI Prediction Module Output
"""
import requests
import json

# Test data (patient with pneumonia-like symptoms)
patient_data = {
    "age": 55,
    "fever_temp": 103.5,
    "cough_days": 5,
    "shortness_of_breath": 1,
    "chest_pain": 3,
    "fatigue": 1,
    "oxygen_saturation": 92,
    "respiratory_rate": 24,
    "heart_rate": 105,
    "blood_pressure_systolic": 145,
    "smoker": 0,
    "diabetes": 1,
    "hypertension": 1,
    "previous_infections": 2
}

print("=" * 70)
print("🔬 TESTING AI PREDICTION MODULE")
print("=" * 70)

# First, check model status
print("\n1️⃣  Checking Model Status...")
try:
    response = requests.get("http://localhost:8000/api/model-status")
    status = response.json()
    print(f"   Status: {status['status']}")
    print(f"   Model Loaded: {status['model_loaded']}")
    print(f"   Message: {status['message']}")
except Exception as e:
    print(f"   ❌ Error: {e}")
    exit(1)

if not status['model_loaded']:
    print("\n❌ Model not loaded! Run 'python train_model.py' first")
    exit(1)

# Test prediction (without auth for this demo)
print("\n2️⃣  Sending Prediction Request...")
print(f"   Patient Data: {json.dumps(patient_data, indent=6)}")

try:
    response = requests.post(
        "http://localhost:8000/api/predict-risk",
        json=patient_data,
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer test-token"  # Dummy token for testing
        }
    )
    
    if response.status_code == 200:
        prediction = response.json()
        
        print("\n3️⃣  ✅ AI OUTPUT RECEIVED:")
        print("   " + "=" * 66)
        print(f"\n   🎯 PRIMARY DIAGNOSIS: {prediction['primary_diagnosis']}")
        print(f"   ⚠️  RISK SCORE: {prediction['risk_score']}%")
        print(f"   📊 CONFIDENCE: {prediction['confidence']}%")
        
        print(f"\n   💊 RECOMMENDATION:\n      {prediction['recommendation']}")
        
        print(f"\n   🏥 ALL POSSIBLE DIAGNOSES:")
        for diag in prediction['all_diagnoses']:
            print(f"      • {diag['diagnosis']}: {diag['probability']}%")
        
        print(f"\n   🔍 TOP CONTRIBUTING FACTORS:")
        for i, factor in enumerate(prediction['top_factors'], 1):
            print(f"      {i}. {factor['factor']}: {factor['importance']*100:.2f}%")
        
        print("\n   " + "=" * 66)
        print("\n✅ AI Module is working perfectly!\n")
        
        # Save full output
        with open('test_output.json', 'w') as f:
            json.dump(prediction, f, indent=2)
        print("   📁 Full output saved to: test_output.json")
        
    else:
        print(f"   ❌ Error: {response.status_code}")
        print(f"   Response: {response.text}")
        
except Exception as e:
    print(f"   ❌ Connection Error: {e}")
    print("   Make sure backend is running: python main.py")

print("\n" + "=" * 70)
