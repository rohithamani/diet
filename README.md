# 🥗 AI Diet Planner

## About the Project

AI Diet Planner is a web application that helps users generate personalized diet plans based on their health goals and dietary preferences. Instead of searching through multiple websites for meal suggestions, users can simply enter their details and receive an AI-generated diet plan within seconds.

This project was built to explore the integration of Generative AI into a real-world healthcare and fitness use case while creating a simple, responsive, and user-friendly interface.

**Live Demo:** https://diet-lemon-eight.vercel.app/

---

## Features

- Generate personalized diet plans using AI
- Supports different fitness goals such as:
  - Weight Loss
  - Weight Gain
  - Weight Maintenance
- User-friendly and responsive interface
- Fast AI response generation
- Clean and modern design
- Works on both desktop and mobile devices

---

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Tailwind CSS

### AI
- Google Gemini API
- Prompt Engineering

### Deployment
- Vercel

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/diet-planner.git
```

### Install dependencies

```bash
npm install
```

### Run the application

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the project root and add your Gemini API key.

```env
VITE_GEMINI_API_KEY=YOUR_API_KEY
```

---

## How It Works

1. Enter your personal information.
2. Choose your fitness goal.
3. Mention your dietary preferences.
4. Submit the form.
5. The application sends your input to the Gemini API.
6. AI generates a personalized diet plan based on your requirements.

---

## Future Improvements

There are several features that can be added in the future, such as:

- User authentication
- Save previous diet plans
- BMI calculator
- Calorie tracking
- Nutrition analysis
- Workout recommendations
- Download diet plan as PDF
- Dark mode
- Multi-language support

---

## Project Structure

```
src/
├── components/
├── pages/
├── assets/
├── App.jsx
├── main.jsx

public/

package.json
README.md
```

---

## Learning Outcomes

While building this project, I gained practical experience in:

- Building responsive web applications using React
- Working with REST APIs
- Integrating Google Gemini API
- Writing effective AI prompts
- Managing application state
- Deploying applications using Vercel
- Creating clean and reusable UI components

---

## Author

**Rohitha Periyasamy**

Thank you for checking out this project. Feedback and suggestions are always welcome!
