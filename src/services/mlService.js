// ML API Service for Swasthya AI
// This service connects your React frontend to the Python ML backend

const ML_API_URL = 'http://localhost:5000/api';

/**
 * Check if ML API server is running
 */
export const checkMLHealth = async () => {
    try {
        const response = await fetch(`${ML_API_URL}/health`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ML API Health Check Failed:', error);
        return { status: 'offline', error: error.message };
    }
};

/**
 * Predict health score for a single food item
 * 
 * @param {Object} nutritionData - Nutritional information
 * @param {number} nutritionData.calories - Calories per 100g
 * @param {number} nutritionData.protein - Protein in grams per 100g
 * @param {number} nutritionData.carbs - Carbohydrates in grams per 100g
 * @param {number} nutritionData.fat - Fat in grams per 100g
 * @param {number} nutritionData.fiber - Fiber in grams per 100g
 * @param {number} [nutritionData.iron] - Iron in mg per 100g (optional)
 * @param {number} [nutritionData.vitamin_c] - Vitamin C in mg per 100g (optional)
 * @returns {Promise<Object>} Prediction result with health score and recommendation
 */
export const predictFood = async (nutritionData) => {
    try {
        const response = await fetch(`${ML_API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nutritionData),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ML Prediction Error:', error);
        throw error;
    }
};

/**
 * Analyze a complete meal with multiple food items
 * 
 * @param {Array<Object>} foods - Array of food items with nutritional data
 * @returns {Promise<Object>} Meal analysis with overall score and individual food scores
 */
export const analyzeMeal = async (foods) => {
    try {
        const response = await fetch(`${ML_API_URL}/analyze-meal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foods }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ML Meal Analysis Error:', error);
        throw error;
    }
};

/**
 * Helper function to format nutrition data from user input
 * 
 * @param {string} foodName - Name of the food
 * @param {Object} nutrition - Nutritional values
 * @returns {Object} Formatted nutrition data
 */
export const formatNutritionData = (foodName, nutrition) => {
    return {
        name: foodName,
        calories: parseFloat(nutrition.calories) || 0,
        protein: parseFloat(nutrition.protein) || 0,
        carbs: parseFloat(nutrition.carbs) || 0,
        fat: parseFloat(nutrition.fat) || 0,
        fiber: parseFloat(nutrition.fiber) || 0,
        iron: parseFloat(nutrition.iron) || 0,
        vitamin_c: parseFloat(nutrition.vitamin_c) || 0,
    };
};

/**
 * Get health recommendation message based on score
 * 
 * @param {number} healthScore - Health score (0-100)
 * @returns {Object} Recommendation with message and emoji
 */
export const getHealthRecommendation = (healthScore) => {
    if (healthScore >= 70) {
        return {
            message: "Excellent choice! This is very healthy.",
            emoji: "🥗",
            color: "#22c55e"
        };
    } else if (healthScore >= 50) {
        return {
            message: "Good choice, but consume in moderation.",
            emoji: "🍽️",
            color: "#f59e0b"
        };
    } else {
        return {
            message: "Consider healthier alternatives.",
            emoji: "🚫",
            color: "#ef4444"
        };
    }
};

// Example usage:
/*
import { predictFood, analyzeMeal } from './services/mlService';

// Single food prediction
const result = await predictFood({
  calories: 370,
  protein: 7.9,
  carbs: 77.2,
  fat: 2.9,
  fiber: 3.5
});

console.log(result.prediction);      // "Healthy"
console.log(result.health_score);    // 85.5
console.log(result.recommendation);  // "✓ Great choice!..."

// Meal analysis
const mealResult = await analyzeMeal([
  { name: "Rice", calories: 370, protein: 7.9, carbs: 77.2, fat: 2.9, fiber: 3.5 },
  { name: "Chicken", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 }
]);

console.log(mealResult.meal_score);   // 88.5
console.log(mealResult.meal_rating);  // "Excellent"
*/
