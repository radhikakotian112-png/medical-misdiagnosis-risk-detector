"""
Medical Risk Prediction ML Model Training
Trains XGBoost model on sample medical data
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import joblib
import os

# Create synthetic medical training data
def create_training_data():
    """Generate sample medical data for training"""
    np.random.seed(42)
    
    n_samples = 500
    
    data = {
        'age': np.random.randint(18, 85, n_samples),
        'fever_temp': np.random.uniform(98, 105, n_samples),  # Fahrenheit
        'cough_days': np.random.randint(0, 21, n_samples),
        'shortness_of_breath': np.random.choice([0, 1], n_samples),
        'chest_pain': np.random.randint(0, 11, n_samples),  # 0-10 scale
        'fatigue': np.random.choice([0, 1], n_samples),
        'oxygen_saturation': np.random.uniform(85, 100, n_samples),
        'respiratory_rate': np.random.randint(12, 35, n_samples),
        'heart_rate': np.random.randint(60, 120, n_samples),
        'blood_pressure_systolic': np.random.randint(90, 160, n_samples),
        'smoker': np.random.choice([0, 1], n_samples),
        'diabetes': np.random.choice([0, 1], n_samples),
        'hypertension': np.random.choice([0, 1], n_samples),
        'previous_infections': np.random.randint(0, 5, n_samples),
    }
    
    df = pd.DataFrame(data)
    
    # Create diagnosis labels based on rules (for demo)
    diagnosis = []
    for idx, row in df.iterrows():
        risk_score = 0
        
        # Fever + cough + low O2 → Pneumonia
        if row['fever_temp'] > 101 and row['cough_days'] > 2 and row['oxygen_saturation'] < 95:
            diagnosis.append('Pneumonia')
        # High fever + fatigue → Flu
        elif row['fever_temp'] > 102 and row['fatigue'] == 1:
            diagnosis.append('Influenza')
        # Chest pain + high HR + high BP → Cardiac Risk
        elif row['chest_pain'] > 5 and row['heart_rate'] > 100 and row['blood_pressure_systolic'] > 140:
            diagnosis.append('Cardiac Risk')
        # Cough + low O2 → Bronchitis
        elif row['cough_days'] > 5 and row['oxygen_saturation'] < 96:
            diagnosis.append('Bronchitis')
        # Shortness of breath → Asthma
        elif row['shortness_of_breath'] == 1 and row['respiratory_rate'] > 20:
            diagnosis.append('Asthma')
        else:
            diagnosis.append('Normal')
    
    df['diagnosis'] = diagnosis
    return df


def train_model():
    """Train XGBoost model on medical data"""
    print("🏥 Generating synthetic medical training data...")
    df = create_training_data()
    
    print(f"📊 Dataset shape: {df.shape}")
    print(f"Diagnoses distribution:\n{df['diagnosis'].value_counts()}\n")
    
    # Prepare features and target
    X = df.drop('diagnosis', axis=1)
    y = df['diagnosis']
    
    # Encode target labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42
    )
    
    print("🤖 Training XGBoost model...")
    
    # Train XGBoost classifier
    model = xgb.XGBClassifier(
        n_estimators=100,
        max_depth=7,
        learning_rate=0.1,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        objective='multi:softprob',
        num_class=len(label_encoder.classes_),
        eval_metric='mlogloss'
    )
    
    model.fit(X_train, y_train, verbose=False)
    
    # Evaluate
    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    
    print(f"✅ Training accuracy: {train_score:.2%}")
    print(f"✅ Testing accuracy: {test_score:.2%}\n")
    
    # Save model
    model_dir = os.path.dirname(__file__)
    model_path = os.path.join(model_dir, 'xgb_model.pkl')
    encoder_path = os.path.join(model_dir, 'label_encoder.pkl')
    features_path = os.path.join(model_dir, 'feature_names.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(label_encoder, encoder_path)
    joblib.dump(X.columns.tolist(), features_path)
    
    print(f"💾 Model saved to {model_path}")
    print(f"💾 Label encoder saved to {encoder_path}")
    print(f"💾 Feature names saved to {features_path}")
    
    # Print feature importance
    print("\n📈 Feature Importance (Top 10):")
    feature_importance = dict(zip(X.columns, model.feature_importances_))
    for feature, importance in sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  {feature}: {importance:.4f}")


if __name__ == "__main__":
    train_model()
