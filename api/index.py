from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load ML model
# Vercel's environment might have different pathing, so we use absolute pathing relative to this file
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'food_health_model.joblib')
encoder_path = os.path.join(script_dir, 'label_encoder.joblib')

# Global variables for model and encoder to leverage Vercel's function warm starts
model = None
label_encoder = None

def get_model():
    global model, label_encoder
    if model is None:
        model = joblib.load(model_path)
    if label_encoder is None:
        label_encoder = joblib.load(encoder_path)
    return model, label_encoder

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Swasthya AI ML API is running on Vercel'
    })

@app.route('/api/predict', methods=['POST'])
def predict_food():
    try:
        data = request.get_json()
        model, label_encoder = get_model()
        
        # Extract features
        calories = float(data.get('calories', 0))
        protein = float(data.get('protein', 0))
        carbs = float(data.get('carbs', 0))
        fat = float(data.get('fat', 0))
        fiber = float(data.get('fiber', 0))
        iron = float(data.get('iron', 0))
        vitamin_c = float(data.get('vitamin_c', 0))
        
        # Prepare features array
        features = np.array([[calories, protein, carbs, fat, fiber, iron, vitamin_c]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        
        # Get label
        label = label_encoder.inverse_transform([prediction])[0]
        
        # Calculate health score
        health_score = float(probabilities[2]) * 100  # Healthy probability
        
        # Generate recommendation
        if label == 'Healthy':
            recommendation = f"✓ Great choice! This food is healthy with a score of {health_score:.0f}/100."
            emoji = "🥗"
        elif label == 'Moderate':
            recommendation = f"⚠ Moderate choice with a score of {health_score:.0f}/100."
            emoji = "🍽️"
        else:
            recommendation = f"✗ Not recommended. Health score: {health_score:.0f}/100."
            emoji = "🚫"
        
        return jsonify({
            'success': True,
            'prediction': label,
            'health_score': round(health_score, 1),
            'confidence': {
                'healthy': round(float(probabilities[2]) * 100, 1),
                'moderate': round(float(probabilities[1]) * 100, 1),
                'unhealthy': round(float(probabilities[0]) * 100, 1)
            },
            'recommendation': recommendation,
            'emoji': emoji
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/analyze-meal', methods=['POST'])
def analyze_meal():
    try:
        data = request.get_json()
        foods = data.get('foods', [])
        model, label_encoder = get_model()
        
        results = []
        total_score = 0
        
        for food in foods:
            name = food.get('name', 'Unknown')
            calories = float(food.get('calories', 0))
            protein = float(food.get('protein', 0))
            carbs = float(food.get('carbs', 0))
            fat = float(food.get('fat', 0))
            fiber = float(food.get('fiber', 0))
            iron = float(food.get('iron', 0))
            vitamin_c = float(food.get('vitamin_c', 0))
            
            features = np.array([[calories, protein, carbs, fat, fiber, iron, vitamin_c]])
            prediction = model.predict(features)[0]
            probabilities = model.predict_proba(features)[0]
            label = label_encoder.inverse_transform([prediction])[0]
            health_score = float(probabilities[2]) * 100
            
            results.append({
                'name': name,
                'prediction': label,
                'health_score': round(health_score, 1)
            })
            total_score += health_score
        
        meal_score = total_score / len(foods) if foods else 0
        
        if meal_score >= 70:
            meal_rating = "Excellent"
            meal_emoji = "🌟"
        elif meal_score >= 50:
            meal_rating = "Good"
            meal_emoji = "👍"
        else:
            meal_rating = "Needs Improvement"
            meal_emoji = "⚠️"
        
        return jsonify({
            'success': True,
            'meal_score': round(meal_score, 1),
            'meal_rating': meal_rating,
            'meal_emoji': meal_emoji,
            'foods': results
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

# Vercel needs the 'app' object
if __name__ == '__main__':
    app.run(debug=True)
