/**
 * Authentication Context
 * 
 * Purpose: Manage user authentication state across the app
 * Features:
 * - User login/logout
 * - User type management (student/staff)
 * - Persistent authentication
 */

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on app load
    useEffect(() => {
        const savedUser = localStorage.getItem('stemquest_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('stemquest_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (loginData) => {
        const userData = {
            ...loginData.user,
            loginMethod: loginData.method,
            loginTime: new Date().toISOString()
        };

        setUser(userData);
        localStorage.setItem('stemquest_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('stemquest_user');
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('stemquest_user', JSON.stringify(updatedUser));
    };

    const isStudent = () => user?.type === 'student';
    const isStaff = () => user?.type === 'staff';
    const isAuthenticated = () => !!user;

    const value = {
        user,
        isLoading,
        login,
        logout,
        updateUser,
        isStudent,
        isStaff,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};