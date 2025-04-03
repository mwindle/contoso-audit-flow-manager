
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define the user type
export type UserRole = 'auditor' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAuditor: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data for demonstration
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Auditor',
    email: 'john@example.com',
    role: 'auditor',
    avatar: 'https://ui-avatars.com/api/?name=John+Auditor&background=1E3A8A&color=fff',
  },
  {
    id: '2',
    name: 'Jane Client',
    email: 'jane@example.com',
    role: 'client',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Client&background=3B82F6&color=fff',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('contosoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  // Simulate login functionality
  const login = async (email: string, password: string) => {
    // For demo purpose, we're not actually validating the password
    const foundUser = sampleUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('contosoUser', JSON.stringify(foundUser));
      navigate('/dashboard');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem('contosoUser');
    navigate('/login');
  };

  const isAuthenticated = !!user;
  const isAuditor = user?.role === 'auditor';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAuditor }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
