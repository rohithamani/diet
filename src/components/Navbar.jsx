import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, MessageSquare } from 'lucide-react';

import { useUser } from '../context/UserContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <Leaf size={32} fill="currentColor" />
                <span>Swasthya AI</span>
            </Link>

            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/chat" className="nav-link">Diet AI</Link>
                <Link to="/profile" className="nav-link">My Profile</Link>
                <Link to="/disclaimer" className="nav-link">Health Info</Link>
            </div>

            <div className="nav-actions">
                {user.name ? (
                    <button className="btn btn-primary" onClick={() => navigate('/profile')}>
                        <User size={18} /> Hi, {user.name}
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => navigate('/login')}>
                        Get Started
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
