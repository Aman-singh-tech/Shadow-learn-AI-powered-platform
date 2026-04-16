import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(`${API_ENDPOINTS.AUTH}/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    if (res.ok) {
                        setUser(data);
                    } else {
                        localStorage.removeItem('token');
                    }
                } catch (err) {
                    console.error('Initial auth check failed', err);
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_ENDPOINTS.AUTH}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('token', data.token);
                setUser(data);
                toast.success(`Welcome back, ${data.name}!`);
                return { success: true };
            } else {
                toast.error(data.error || 'Login failed');
                return { success: false, error: data.error };
            }
        } catch (err) {
            toast.error('Network error');
            return { success: false, error: 'Network error' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch(`${API_ENDPOINTS.AUTH}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('token', data.token);
                setUser(data);
                toast.success('Account created successfully!');
                return { success: true };
            } else {
                toast.error(data.error || 'Registration failed');
                return { success: false, error: data.error };
            }
        } catch (err) {
            toast.error('Network error');
            return { success: false, error: 'Network error' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
