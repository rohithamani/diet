import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('swasthya_user');
        return savedUser ? JSON.parse(savedUser) : {
            name: "Rohitha",
            email: "rohitha@example.com",
            stats: {
                age: 28,
                weight: "72 kg",
                height: "175 cm",
                bmi: "23.5",
                status: "Healthy"
            },
            preferences: {
                cuisine: "South Indian / Tamil Nadu",
                diet: "Vegetarian",
                goal: "Muscle Maintenance"
            },
            savedPlans: [
                { id: 1, date: "12 Jan 2026", title: "High Protein Tamil Diet" },
                { id: 2, date: "05 Jan 2026", title: "Weight Loss Plan" }
            ]
        };
    });

    useEffect(() => {
        localStorage.setItem('swasthya_user', JSON.stringify(user));
    }, [user]);

    const updateUser = (newData) => {
        setUser(prev => ({ ...prev, ...newData }));
    };

    const addSavedPlan = (plan) => {
        setUser(prev => ({
            ...prev,
            savedPlans: [
                { ...plan, id: Date.now(), date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
                ...prev.savedPlans
            ]
        }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser, addSavedPlan }}>
            {children}
        </UserContext.Provider>
    );
};
