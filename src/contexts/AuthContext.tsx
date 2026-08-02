import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { mockUsers } from '../data/mockData';
import { ROLE_PERMISSIONS, type User, type Permission } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (key: keyof Permission) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize mock users in localStorage if not exists
    if (!localStorage.getItem('tojar_users')) {
      localStorage.setItem('tojar_users', JSON.stringify(mockUsers));
    }

    const storedUser = localStorage.getItem('tojar_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse user', e);
        localStorage.removeItem('tojar_user');
      }
    }
    setIsInitialized(true);
  }, []);

  const login = (email: string, password: string) => {
    const usersStr = localStorage.getItem('tojar_users');
    const users: User[] = usersStr ? JSON.parse(usersStr) : mockUsers;
    
    const user = users.find(u => u.email === email && u.password === password && u.isActive);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('tojar_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tojar_user');
  };

  const hasPermission = (key: keyof Permission) => {
    if (!currentUser) return false;
    return ROLE_PERMISSIONS[currentUser.role][key] || false;
  };

  if (!isInitialized) return null; // or a loader

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      hasPermission,
      isAuthenticated: !!currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
