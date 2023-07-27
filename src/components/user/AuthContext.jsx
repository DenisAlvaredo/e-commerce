import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (tokens) => {
        setAccessToken(tokens.access_token);
        setRefreshToken(tokens.refresh_token);
        setIsAdmin(isAdminValue);
    };

    const logout = () => {
        setAccessToken('');
        setRefreshToken('');
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
