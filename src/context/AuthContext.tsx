
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful login with a mock user
      if (email && password) { // Basic validation
        const mockUser: User = {
          id: "1",
          name: "Demo User",
          email: email,
          address: "123 Energy St",
          phone: "555-123-4567"
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful signup with a mock user
      if (name && email && password) { // Basic validation
        const mockUser: User = {
          id: "1",
          name: name,
          email: email
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
      } else {
        throw new Error("Invalid information");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
