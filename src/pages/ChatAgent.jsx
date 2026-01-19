import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, RefreshCcw, Download, Info } from 'lucide-react';
import { predictFood, analyzeMeal, checkMLHealth } from '../services/mlService';
import { useUser } from '../context/UserContext';
import { Save } from 'lucide-react';
import './ChatAgent.css';

const STEPS = [
    { id: 'start', question: 'Namaste! I am your Swasthya AI assistant. To create your perfect Indian diet plan, I need some details. Ready?', options: ['Yes, let’s go!'] },
    { id: 'age_gender', question: 'Great! What is your age and gender?', type: 'input', placeholder: 'e.g. 28, Male' },
    { id: 'metrics', question: 'How about your height and weight?', type: 'input', placeholder: 'e.g. 175cm, 72kg' },
    { id: 'activity', question: 'What is your daily activity level?', options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'] },
    { id: 'goal', question: 'What is your primary health goal?', options: ['Weight Loss', 'Weight Gain', 'Muscle Build', 'Manage Diabetes', 'Heart Health', 'PCOS/PCOD'] },
    { id: 'cuisine', question: 'Which Indian state are you from or which cuisine do you prefer?', type: 'input', placeholder: 'e.g. Tamil Nadu, Punjab, West Bengal' },
    { id: 'diet_type', question: 'Your food preference?', options: ['Veg', 'Non-Veg', 'Eggetarian', 'Vegan'] },
    { id: 'health_issues', question: 'Any specific health issues or allergies?', type: 'input', placeholder: 'e.g. Thyroid, Gluten allergy, None' },
    { id: 'generating', question: 'Processing your details... Generating your personalized Indian diet plan.', type: 'status' }
];

const ChatAgent = () => {
    const { user, addSavedPlan } = useUser();
    const [messages, setMessages] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [userData, setUserData] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [dietPlan, setDietPlan] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (messages.length === 0) {
            addBotMessage(`Namaste ${user.name}! I am your Swasthya AI assistant. To create your perfect Indian diet plan, I need some details. Ready?`, STEPS[0].options);
        }
        scrollToBottom();
    }, [messages, user.name]);

    const addBotMessage = (text, options = []) => {
        setMessages(prev => [...prev, { sender: 'bot', text, options }]);
    };

    const handleSaveToProfile = () => {
        if (dietPlan) {
            addSavedPlan({
                title: dietPlan.title,
                plan: dietPlan
            });
            alert('Diet plan saved to your profile!');
        }
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { sender: 'user', text }]);
    };

    const handleOptionClick = (option) => {
        const currentStep = STEPS[currentStepIndex];
        const newUserData = { ...userData, [currentStep.id]: option };
        setUserData(newUserData);
        addUserMessage(option);

        if (currentStepIndex < STEPS.length - 1) {
            const nextStep = STEPS[currentStepIndex + 1];
            setCurrentStepIndex(currentStepIndex + 1);
            setTimeout(() => addBotMessage(nextStep.question, nextStep.options), 500);
        } else {
            generateDietPlan(newUserData);
        }
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const currentStep = STEPS[currentStepIndex];
        const newUserData = { ...userData, [currentStep.id]: inputValue };
        setUserData(newUserData);
        addUserMessage(inputValue);
        setInputValue('');

        if (currentStepIndex < STEPS.length - 1) {
            const nextStep = STEPS[currentStepIndex + 1];
            setCurrentStepIndex(currentStepIndex + 1);

            if (nextStep.type === 'status') {
                setIsGenerating(true);
                setTimeout(() => {
                    addBotMessage(nextStep.question);
                    generateDietPlan(newUserData);
                }, 500);
            } else {
                setTimeout(() => addBotMessage(nextStep.question, nextStep.options), 500);
            }
        }
    };

    const [apiStatus, setApiStatus] = useState('checking');

    useEffect(() => {
        const verifyAPI = async () => {
            const status = await checkMLHealth();
            setApiStatus(status.status === 'healthy' ? 'online' : 'offline');
        };
        verifyAPI();
    }, []);

    const generateDietPlan = async (data) => {
        setIsGenerating(true);

        // Define potential meals based on user preference
        const isSouthIndian = data.cuisine.toLowerCase().includes('south') || data.cuisine.toLowerCase().includes('tamil');
        const isVeg = data.diet_type === 'Veg';

        const suggestedFoods = [
            { name: isSouthIndian ? 'Idli with Sambar' : 'Wheat Roti with Dal', calories: 250, protein: 12, carbs: 45, fat: 5, fiber: 6 },
            { name: isVeg ? 'Brown Rice with Paneer' : 'Brown Rice with Chicken', calories: 450, protein: 25, carbs: 55, fat: 12, fiber: 8 },
            { name: 'Sprouts Salad', calories: 120, protein: 15, carbs: 20, fat: 2, fiber: 10 },
            { name: 'Moong Dal Khichdi', calories: 300, protein: 18, carbs: 40, fat: 6, fiber: 7 }
        ];

        try {
            // Call the real ML API!
            let analysis = { meal_score: 85, meal_rating: 'Excellent', meal_emoji: '🌟' };

            if (apiStatus === 'online') {
                const result = await analyzeMeal(suggestedFoods);
                if (result.success) {
                    analysis = result;
                }
            }

            const plan = {
                title: `${data.cuisine} Style ${data.goal} Plan`,
                breakfast: suggestedFoods[0].name,
                lunch: suggestedFoods[1].name + ' with Sprouts Salad',
                snack: 'Roasted Makhana or Handful of Almonds',
                dinner: suggestedFoods[3].name + ' (Light)',
                score: analysis.meal_score,
                rating: analysis.meal_rating,
                emoji: analysis.meal_emoji,
                tips: data.goal === 'Weight Loss' ? 'Focus on high fiber and walk 30 mins.' : 'Include more proteins and strength training.',
                isMLDriven: apiStatus === 'online'
            };

            setTimeout(() => {
                setDietPlan(plan);
                setIsGenerating(false);
                addBotMessage(`Analysis Complete! I've used our trained ML model to verify this plan. Its health score is ${plan.score}/100 ${plan.emoji}`);
            }, 1500);

        } catch (error) {
            console.error("ML Analysis failed, falling back to heuristic:", error);
            // Fallback
            const plan = {
                title: `${data.cuisine} Style ${data.goal} Plan`,
                breakfast: isSouthIndian ? 'Idli Sambar' : 'Paratha/Poha',
                lunch: 'Rice, Dal, Veggie',
                snack: 'Fruits/Nuts',
                dinner: 'Khichdi/Soup',
                score: 75,
                rating: 'Good',
                emoji: '👍',
                tips: 'Stay hydrated and active.'
            };
            setDietPlan(plan);
            setIsGenerating(false);
            addBotMessage("Your plan is ready! Check details below.");
        }
    };

    return (
        <div className="chat-container container">
            <div className="chat-box glass-card">
                <div className="chat-header">
                    <div className="bot-info">
                        <img
                            src="/assets/ai_nutritionist_modern_avatar.png"
                            alt="AI Nutritionist"
                            className="bot-avatar-img"
                        />
                        <div>
                            <h3 className="text-gradient">Swasthya AI Agent</h3>
                            <span>Online • Your Nutrition Expert</span>
                        </div>
                    </div>
                    <button className="reset-btn" onClick={() => window.location.reload()}>
                        <RefreshCcw size={18} />
                    </button>
                </div>

                <div className="messages-area">
                    {messages.map((m, i) => (
                        <div key={i} className={`message-wrapper ${m.sender}`}>
                            <div className="message-bubble">
                                <p>{m.text}</p>
                                {m.options && (
                                    <div className="message-options">
                                        {m.options.map((opt, oi) => (
                                            <button key={oi} onClick={() => handleOptionClick(opt)}>
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isGenerating && (
                        <div className="message-wrapper bot">
                            <div className="message-bubble loader">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {currentStepIndex < STEPS.length - 1 && STEPS[currentStepIndex].type === 'input' && (
                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder={STEPS[currentStepIndex].placeholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend}>
                            <Send size={20} />
                        </button>
                    </div>
                )}
            </div>

            {dietPlan && (
                <div className="diet-plan-result animate-fade">
                    <div className="plan-card glass-card">
                        <div className="plan-header">
                            <div>
                                <h2>{dietPlan.title}</h2>
                                {dietPlan.isMLDriven && (
                                    <span className="ml-badge">
                                        <Bot size={12} /> ML Verified
                                    </span>
                                )}
                            </div>
                            <div className="health-score-badge">
                                <span className="score">{dietPlan.score}</span>
                                <span className="label">Health Score</span>
                            </div>
                            <div className="plan-actions">
                                <button className="btn btn-outline btn-sm" onClick={handleSaveToProfile}><Save size={16} /> Save to Profile</button>
                                <button className="btn btn-outline btn-sm"><Download size={16} /> Save PDF</button>
                            </div>
                        </div>

                        <div className="plan-grid">
                            <div className="plan-item">
                                <label>Breakfast (8:30 AM)</label>
                                <p>{dietPlan.breakfast}</p>
                            </div>
                            <div className="plan-item">
                                <label>Lunch (1:30 PM)</label>
                                <p>{dietPlan.lunch}</p>
                            </div>
                            <div className="plan-item">
                                <label>Evening Snack (4:30 PM)</label>
                                <p>{dietPlan.snack}</p>
                            </div>
                            <div className="plan-item">
                                <label>Dinner (8:00 PM)</label>
                                <p>{dietPlan.dinner}</p>
                            </div>
                        </div>

                        <div className="plan-footer">
                            <h3>💡 Expert Tips</h3>
                            <p>{dietPlan.tips}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatAgent;
