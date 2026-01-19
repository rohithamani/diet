import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Smartphone, Heart, Zap, ShieldCheck, Users } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
        <div className="landing-page">
            <section className="hero container">
                <div className="hero-content animate-fade">
                    <div className="hero-badge">
                        <Zap size={16} />
                        AI-Powered Nutrition
                    </div>
                    <h1 className="hero-title">
                        {user.name ? `Welcome back, ${user.name}!` : 'Traditional Indian Wisdom, '}
                        <span className="text-gradient">Modern AI</span> Intelligence.
                    </h1>
                    <p className="hero-description">
                        {user.name
                            ? `Continue your weight journey towards ${user.preferences.goal} with personalized ${user.preferences.cuisine} diet plans.`
                            : "Get personalized Indian diet plans based on your culture, state, and health needs. From Tamil Nadu to Punjab, we've got your nutrition covered."
                        }
                    </p>
                    <div className="hero-btns">
                        <button className="btn btn-primary btn-lg" onClick={() => navigate('/chat')}>
                            {user.name ? 'Generate Plan' : 'Get Started'} <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-outline btn-lg" onClick={() => navigate('/profile')}>
                            View My Stats
                        </button>
                    </div>
                </div>

                <div className="hero-image animate-slide">
                    <div className="image-wrapper">
                        {/* High-quality generated hero image */}
                        <img
                            src="/assets/hero_indian_diet_ai.png"
                            alt="Healthy Indian Meal AI"
                            className="hero-main-img"
                        />

                        <div className="floating-card active-users glass-card">
                            <Users size={20} color="var(--primary)" />
                            <div>
                                <strong>10,000+</strong>
                                <p>Active Users</p>
                            </div>
                        </div>
                        <div className="floating-card ml-accuracy glass-card">
                            <ShieldCheck size={20} color="var(--primary)" />
                            <div>
                                <strong>98%</strong>
                                <p>Diet Accuracy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="spices-section container animate-fade">
                <div className="spices-banner glass-card">
                    <div className="spices-content">
                        <h2>Rooted in <span className="text-gradient">Nature</span></h2>
                        <p>Our algorithms analyze thousands of traditional Indian ingredients to find the perfect balance for your body.</p>
                    </div>
                    <img
                        src="/assets/vibrant_indian_spices_abstract.png"
                        alt="Indian Spices"
                        className="spices-img"
                    />
                </div>
            </section>

            <section className="features container">
                <div className="section-header">
                    <h2>Why Choose Swasthya AI?</h2>
                    <p>We combine deep knowledge of Indian cuisine with advanced nutrition science.</p>
                </div>

                <div className="feature-grid">
                    <div className="feature-card glass-card">
                        <div className="icon-box"><Smartphone color="var(--primary)" /></div>
                        <h3>Culturally Rooted</h3>
                        <p>We understand the difference between a Kerala Sadya and a Rajasthani Thali.</p>
                    </div>
                    <div className="feature-card glass-card">
                        <div className="icon-box"><Heart color="var(--primary)" /></div>
                        <h3>Health Focused</h3>
                        <p>Specific plans for Diabetes, PCOS, Thyroid, and Heart Health.</p>
                    </div>
                    <div className="feature-card glass-card">
                        <div className="icon-box"><Zap color="var(--primary)" /></div>
                        <h3>Instant Analysis</h3>
                        <p>Get your diet plan in seconds through our friendly AI agent.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
