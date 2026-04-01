import { createContext, useState, useCallback, useEffect } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin credentials (replace with API call in backend)
const ADMIN_EMAIL = "admin@moroccanstay.com";
const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
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
      setIsAuthenticated(true);
      setUser(email);
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
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
