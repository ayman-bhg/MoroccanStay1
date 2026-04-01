import { createContext, useState, useCallback, useEffect } from "react";
export const AuthContext = createContext(undefined);
const ADMIN_EMAIL = "admin@moroccanstay.com";
const ADMIN_PASSWORD = "admin123";
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRoleState] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("authUser");
        const storedRole = localStorage.getItem("userRole");
        if (storedToken && storedUser && storedRole) {
            setIsAuthenticated(true);
            setUser(storedUser);
            setRoleState(storedRole);
        }
    }, []);
    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 500));
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = `token_${Date.now()}`;
            localStorage.setItem("authToken", token);
            localStorage.setItem("authUser", email);
            localStorage.setItem("userRole", "admin");
            setIsAuthenticated(true);
            setUser(email);
            setRoleState("admin");
            setLoading(false);
        }
        else {
            setError("Invalid email or password");
            setLoading(false);
            throw new Error("Invalid credentials");
        }
    }, []);
    const logout = useCallback(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        localStorage.removeItem("userRole");
        setIsAuthenticated(false);
        setUser(null);
        setRoleState(null);
        setError(null);
    }, []);
    const setRole = useCallback((newRole) => {
        if (newRole === "admin") {
            localStorage.setItem("userRole", "admin");
        }
        else {
            localStorage.removeItem("userRole");
        }
        setRoleState(newRole);
    }, []);
    const switchRole = useCallback(() => {
        if (role === "admin") {
            setRole("customer");
        }
        else if (role === "customer") {
            setRole("admin");
            logout();
        }
    }, [role, setRole, logout]);
    const value = {
        isAuthenticated,
        user,
        role,
        loading,
        error,
        isAdmin: role === "admin" && isAuthenticated,
        isCustomer: role === "customer",
        login,
        logout,
        setRole,
        switchRole,
    };
    return (<AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>);
}

