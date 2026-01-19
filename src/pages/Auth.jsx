import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

import { useUser } from '../context/UserContext';

const Auth = () => {
    const { updateUser } = useUser();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login/signup
        if (!isLogin && name) {
            updateUser({ name, email });
        }
        navigate('/chat');
    };

    return (
        <div className="auth-container container">
            <div className="auth-card glass-card animate-fade">
                <div className="auth-tabs">
                    <button
                        className={isLogin ? 'active' : ''}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={!isLogin ? 'active' : ''}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="auth-content">
                    <h2>{isLogin ? 'Welcome Back' : 'Join Swasthya AI'}</h2>
                    <p>{isLogin ? 'Continue your health journey' : 'Start your personalized nutrition plan'}</p>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="input-group">
                                <UserPlus size={20} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="input-group">
                            <Mail size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <Lock size={20} />
                            <input type="password" placeholder="Password" required />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">
                            {isLogin ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>Or continue with</span>
                    </div>

                    <button className="btn btn-outline btn-block google-btn">
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/layout/google.svg" alt="Google" width="18" />
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
