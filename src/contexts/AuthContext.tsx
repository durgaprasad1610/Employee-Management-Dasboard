import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: { username: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage to prevent logout on refresh
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const auth = localStorage.getItem('isAuthenticated');
    return auth === 'true';
  });
  
  const [user, setUser] = useState<{ username: string } | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username: string, password: string): boolean => {
    // Validate credentials
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    // Basic validation
    if (!trimmedUsername || !trimmedPassword) {
      return false;
    }
    
    // Username validation
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      return false;
    }
    
    // Username format validation (alphanumeric with ._-)
    const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return false;
    }
    
    // Password validation
    if (trimmedPassword.length < 6 || trimmedPassword.length > 50) {
      return false;
    }
    
    // Password must contain at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(trimmedPassword);
    const hasNumber = /[0-9]/.test(trimmedPassword);
    
    if (!hasLetter || !hasNumber) {
      return false;
    }
    
    // If all validations pass, set authentication
    setIsAuthenticated(true);
    const userData = { username: trimmedUsername };
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
