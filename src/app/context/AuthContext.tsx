import { createContext, useState, useCallback, useEffect } from "react";

export type UserRole = "admin" | "customer" | null;

export interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  role: UserRole;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
  switchRole: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin credentials (replace with API call in backend)
const ADMIN_EMAIL = "admin@moroccanstay.com";
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRoleState] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    const storedRole = localStorage.getItem("userRole") as UserRole;

    if (storedToken && storedUser && storedRole) {
      setIsAuthenticated(true);
      setUser(storedUser);
      setRoleState(storedRole);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Frontend validation (replace with API call in backend)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = `token_${Date.now()}`;
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", email);
      localStorage.setItem("userRole", "admin");
      setIsAuthenticated(true);
      setUser(email);
      setRoleState("admin");
      setLoading(false);
    } else {
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

  const setRole = useCallback((newRole: UserRole) => {
    if (newRole) {
      localStorage.setItem("userRole", newRole);
    } else {
      localStorage.removeItem("userRole");
    }
    setRoleState(newRole);
  }, []);

  const switchRole = useCallback(() => {
    if (role === "admin") {
      setRole("customer");
    } else if (role === "customer") {
      setRole("admin");
      // If switching to admin from customer, require login
      logout();
    }
  }, [role, setRole, logout]);

  const value: AuthContextType = {
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
