import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ChatAgent from './pages/ChatAgent';
import Profile from './pages/Profile';
import Disclaimer from './pages/Disclaimer';
import Auth from './pages/Auth';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/chat" element={<ChatAgent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </main>

      <footer className="footer container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Swasthya AI</h3>
            <p>Culturally rooted nutrition for a better life.</p>
          </div>
          <div className="footer-links">
            <a href="/disclaimer">Disclaimer</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Swasthya AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
