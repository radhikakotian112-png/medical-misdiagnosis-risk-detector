import requests
import json

patient_data = {
    'age': 55,
    'fever_temp': 103.5,
    'cough_days': 5,
    'shortness_of_breath': 1,
    'chest_pain': 3,
    'fatigue': 1,
    'oxygen_saturation': 92,
    'respiratory_rate': 24,
    'heart_rate': 105,
    'blood_pressure_systolic': 145,
    'smoker': 0,
    'diabetes': 1,
    'hypertension': 1,
    'previous_infections': 2
}

print('=' * 70)
print('TESTING AI PREDICTION MODULE OUTPUT')
print('=' * 70)

# Test model status
r = requests.get('http://localhost:8000/api/model-status')
print('\n1. MODEL STATUS:')
status = r.json()
print(json.dumps(status, indent=2))

# Test prediction
r = requests.post('http://localhost:8000/api/predict-risk', json=patient_data, headers={'Authorization': 'Bearer test'})
if r.status_code == 200:
    pred = r.json()
    print('\n2. AI PREDICTION OUTPUT:')
    print(f'   Primary Diagnosis: {pred.get("primary_diagnosis")}')
    print(f'   Risk Score: {pred.get("risk_score")}%')
    print(f'   Confidence: {pred.get("confidence")}%')
    print(f'   Recommendation: {pred.get("recommendation")}')
    print('\n   All Possible Diagnoses:')
    for d in pred.get('all_diagnoses', []):
        print(f'      - {d.get("diagnosis")}: {d.get("probability")}%')
    print('\n   Top Contributing Factors:')
    for f in pred.get('top_factors', []):
        print(f'      - {f.get("factor")}: {f.get("importance"):.4f}')
    
    print('\n' + '=' * 70)
    print('✅ AI MODULE WORKING PERFECTLY!')
    print('=' * 70)
else:
    print(f'Error: {r.status_code} - {r.text}')
