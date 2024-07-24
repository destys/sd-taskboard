import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthQuery } from '../hooks/use-auth-query';
import { User } from '../types';

interface AuthContextProps {
    isAuthenticated: boolean;
    role: string;
    userId: number | null;
    userToken: string | null;
    userData: User | null;
    login: (token: string, user: { jwt: string, user: User }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string>('NoAuth');
    const [userId, setUserId] = useState<number | null>(null);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);

    const login = (token: string, user: { jwt: string, user: User }) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUserToken(token);
        setUserData(user.user);
        setUserId(user.user.id);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setRole("NoAuth");
        setUserId(null);
        setUserToken(null);
    };

    const { data, isLoading } = useAuthQuery();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUserToken(token);
        }

        if (data !== undefined) {
            setIsAuthenticated(!!data);
            setRole(data?.role.type || "NoAuth");
            setUserId(data?.id || null);
            setUserData(data)
        }
    }, [data]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, userId, userToken, userData, login, logout }}>
            {!isLoading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
