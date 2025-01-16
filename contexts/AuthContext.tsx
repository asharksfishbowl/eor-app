import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the context value type
interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: () => void;
    logout: () => void;
}

const defaultAuthContextValue: AuthContextType = {
    isAuthenticated: false,
    loading: true,
    login: () => {},
    logout: () => {},
};

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps {
    children: ReactNode; // Explicitly define the children type
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            const token = await new Promise<string | null>((resolve) =>
                setTimeout(() => resolve(null), 1000) // Replace with real logic
            );
            setIsAuthenticated(!!token);
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
