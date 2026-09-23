"""
Medical Risk Prediction Module
Loads trained XGBoost model and makes predictions
"""

import joblib
import pandas as pd
import os
from pathlib import Path

class MedicalRiskPredictor:
    def __init__(self):
        """Initialize and load trained model"""
        model_dir = Path(__file__).parent
        
        self.model_path = model_dir / 'xgb_model.pkl'
        self.encoder_path = model_dir / 'label_encoder.pkl'
        self.features_path = model_dir / 'feature_names.pkl'
        
        self.model = None
        self.label_encoder = None
        self.feature_names = None
        self.is_loaded = False
        
        self._load_model()
    
    def _load_model(self):
        """Load model from disk"""
        try:
            if self.model_path.exists() and self.encoder_path.exists():
                self.model = joblib.load(self.model_path)
                self.label_encoder = joblib.load(self.encoder_path)
                self.feature_names = joblib.load(self.features_path)
                self.is_loaded = True
                print("✅ ML Model loaded successfully")
            else:
                print("⚠️  Model files not found. Please run train_model.py first")
                self.is_loaded = False
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            self.is_loaded = False
    
    def predict(self, patient_data: dict) -> dict:
        """
        Predict diagnosis and risk score
        
        Args:
            patient_data: Dictionary with patient metrics
                {
                    'age': 45,
                    'fever_temp': 102.5,
                    'cough_days': 3,
                    'shortness_of_breath': 1,
                    'chest_pain': 5,
                    'fatigue': 1,
                    'oxygen_saturation': 94.5,
                    'respiratory_rate': 22,
                    'heart_rate': 98,
                    'blood_pressure_systolic': 145,
                    'smoker': 0,
                    'diabetes': 0,
                    'hypertension': 1,
                    'previous_infections': 2
                }
        
        Returns:
            Prediction result with diagnosis and confidence
        """
        if not self.is_loaded:
            return {
                'error': 'Model not loaded',
                'diagnosis': 'Unable to predict',
                'risk_score': 0,
                'confidence': 0,
                'factors': []
            }
        
        try:
            # Create DataFrame with correct feature order
            df = pd.DataFrame([patient_data])
            
            # Ensure all features are present
            for feature in self.feature_names:
                if feature not in df.columns:
                    df[feature] = 0
            
            # Reorder columns to match training data
            X = df[self.feature_names]
            
            # Get prediction and probabilities
            prediction = self.model.predict(X)[0]
            probabilities = self.model.predict_proba(X)[0]
            
            # Decode prediction
            diagnosis = self.label_encoder.inverse_transform([prediction])[0]
            confidence = float(max(probabilities))
            
            # Calculate risk score (0-100)
            risk_score = round(confidence * 100)
            
            # Get feature importance for this prediction
            feature_importance = dict(zip(self.feature_names, self.model.feature_importances_))
            top_factors = sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)[:5]
            
            # Get all diagnoses with probabilities
            all_diagnoses = []
            for idx, prob in enumerate(probabilities):
                diagnosis_name = self.label_encoder.inverse_transform([idx])[0]
                all_diagnoses.append({
                    'diagnosis': diagnosis_name,
                    'probability': round(float(prob) * 100, 2)
                })
            
            all_diagnoses = sorted(all_diagnoses, key=lambda x: x['probability'], reverse=True)
            
            return {
                'primary_diagnosis': diagnosis,
                'risk_score': risk_score,
                'confidence': round(float(confidence) * 100, 2),
                'all_diagnoses': all_diagnoses,
                'top_factors': [{'factor': name, 'importance': round(imp, 4)} for name, imp in top_factors],
                'recommendation': self._get_recommendation(diagnosis, risk_score)
            }
        
        except Exception as e:
            return {
                'error': str(e),
                'diagnosis': 'Prediction error',
                'risk_score': 0,
                'confidence': 0,
                'factors': []
            }
    
    def _get_recommendation(self, diagnosis: str, risk_score: int) -> str:
        """Get clinical recommendation based on diagnosis and risk"""
        if risk_score >= 75:
            if diagnosis == 'Pneumonia':
                return 'High Risk - Recommend immediate hospitalization and chest X-ray'
            elif diagnosis == 'Cardiac Risk':
                return 'High Risk - Recommend ECG and cardiology consultation'
            elif diagnosis == 'Influenza':
                return 'High Risk - Recommend antiviral therapy and monitoring'
            else:
                return 'High Risk - Immediate medical attention recommended'
        
        elif risk_score >= 50:
            return 'Medium Risk - Close monitoring and follow-up care recommended'
        
        else:
            return 'Low Risk - Continue routine monitoring'


# Global predictor instance
_predictor = None

def get_predictor() -> MedicalRiskPredictor:
    """Get or create predictor instance"""
    global _predictor
    if _predictor is None:
        _predictor = MedicalRiskPredictor()
    return _predictor
