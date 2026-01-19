import React, { useState } from 'react';
import { User, Activity, MapPin, Heart, Target, Calendar, Save, X, Edit3, Download } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...user });
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleSave = () => {
        updateUser(editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...user });
        setIsEditing(false);
    };

    const handleChange = (section, field, value) => {
        if (section) {
            setEditData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            setEditData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleViewPlan = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div className="profile-container container animate-fade">
            <div className="profile-header">
                <div className="avatar-large">
                    <User size={64} color="var(--primary)" />
                </div>
                <div className="user-meta">
                    {isEditing ? (
                        <div className="edit-main-info">
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) => handleChange(null, 'name', e.target.value)}
                                className="edit-input"
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                value={editData.email}
                                onChange={(e) => handleChange(null, 'email', e.target.value)}
                                className="edit-input"
                                placeholder="Email"
                            />
                        </div>
                    ) : (
                        <>
                            <h1>{user.name}</h1>
                            <p>{user.email}</p>
                        </>
                    )}
                </div>
                <div className="profile-actions">
                    {isEditing ? (
                        <>
                            <button className="btn btn-outline btn-sm" onClick={handleCancel}>
                                <X size={16} /> Cancel
                            </button>
                            <button className="btn btn-primary btn-sm" onClick={handleSave}>
                                <Save size={16} /> Save Changes
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                            <Edit3 size={16} /> Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="profile-grid">
                <div className="stats-section glass-card">
                    <h3><Activity size={20} /> Body Metrics</h3>
                    <div className="stat-cards">
                        <div className="stat-node">
                            <span>Weight</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editData.stats.weight}
                                    onChange={(e) => handleChange('stats', 'weight', e.target.value)}
                                />
                            ) : (
                                <strong>{user.stats.weight}</strong>
                            )}
                        </div>
                        <div className="stat-node">
                            <span>Height</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editData.stats.height}
                                    onChange={(e) => handleChange('stats', 'height', e.target.value)}
                                />
                            ) : (
                                <strong>{user.stats.height}</strong>
                            )}
                        </div>
                        <div className="stat-node">
                            <span>BMI</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editData.stats.bmi}
                                    onChange={(e) => handleChange('stats', 'bmi', e.target.value)}
                                />
                            ) : (
                                <strong>{user.stats.bmi}</strong>
                            )}
                        </div>
                        <div className="stat-node">
                            <span>Status</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editData.stats.status}
                                    onChange={(e) => handleChange('stats', 'status', e.target.value)}
                                />
                            ) : (
                                <strong style={{ color: 'var(--primary)' }}>{user.stats.status}</strong>
                            )}
                        </div>
                    </div>
                </div>

                <div className="preferences-section glass-card">
                    <h3><Target size={20} /> Preferences</h3>
                    <ul className="pref-list">
                        <li>
                            <MapPin size={18} />
                            <div>
                                <span>Native Cuisine</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.preferences.cuisine}
                                        onChange={(e) => handleChange('preferences', 'cuisine', e.target.value)}
                                    />
                                ) : (
                                    <p>{user.preferences.cuisine}</p>
                                )}
                            </div>
                        </li>
                        <li>
                            <Heart size={18} />
                            <div>
                                <span>Diet Type</span>
                                {isEditing ? (
                                    <select
                                        value={editData.preferences.diet}
                                        onChange={(e) => handleChange('preferences', 'diet', e.target.value)}
                                        className="edit-select"
                                    >
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Eggetarian">Eggetarian</option>
                                    </select>
                                ) : (
                                    <p>{user.preferences.diet}</p>
                                )}
                            </div>
                        </li>
                        <li>
                            <Target size={18} />
                            <div>
                                <span>Primary Goal</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.preferences.goal}
                                        onChange={(e) => handleChange('preferences', 'goal', e.target.value)}
                                    />
                                ) : (
                                    <p>{user.preferences.goal}</p>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="saved-plans-section glass-card">
                    <h3><Calendar size={20} /> Saved Diet Plans</h3>
                    <div className="plans-list">
                        {user.savedPlans.length > 0 ? (
                            user.savedPlans.map((plan, index) => (
                                <div key={plan.id || index} className="plan-summary-item">
                                    <div>
                                        <strong>{plan.title}</strong>
                                        <span>Generated on {plan.date}</span>
                                    </div>
                                    <button className="btn-icon" onClick={() => handleViewPlan(plan)}>View</button>
                                </div>
                            ))
                        ) : (
                            <p className="no-plans">No saved plans yet. Start chatting with our AI to generate one!</p>
                        )}
                    </div>
                </div>
            </div>

            {selectedPlan && (
                <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
                    <div className="modal-content animate-fade" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h2>{selectedPlan.title}</h2>
                                <span className="date">Generated on {selectedPlan.date}</span>
                            </div>
                            <button className="btn-icon close-btn" onClick={() => setSelectedPlan(null)}><X size={24} /></button>
                        </div>

                        {selectedPlan.plan ? (
                            <div className="modal-body">
                                <div className="plan-stats">
                                    <div className="stat">
                                        <span>Health Score</span>
                                        <strong>{selectedPlan.plan.score}/100</strong>
                                    </div>
                                    <div className="stat">
                                        <span>Rating</span>
                                        <strong>{selectedPlan.plan.rating} {selectedPlan.plan.emoji}</strong>
                                    </div>
                                </div>

                                <div className="meal-grid">
                                    <div className="meal-item">
                                        <label>Breakfast</label>
                                        <p>{selectedPlan.plan.breakfast}</p>
                                    </div>
                                    <div className="meal-item">
                                        <label>Lunch</label>
                                        <p>{selectedPlan.plan.lunch}</p>
                                    </div>
                                    <div className="meal-item">
                                        <label>Snack</label>
                                        <p>{selectedPlan.plan.snack}</p>
                                    </div>
                                    <div className="meal-item">
                                        <label>Dinner</label>
                                        <p>{selectedPlan.plan.dinner}</p>
                                    </div>
                                </div>

                                <div className="plan-tips">
                                    <h3>💡 Expert Tips</h3>
                                    <p>{selectedPlan.plan.tips}</p>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-outline btn-sm"><Download size={16} /> Save PDF</button>
                                </div>
                            </div>
                        ) : (
                            <div className="modal-body">
                                <p>Detailed plan information is not available for this legacy entry.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
