
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // Mock implementation - in real app, check with Supabase
        const storedUser = localStorage.getItem('educationUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (userId, password) => {
    setIsLoading(true);
    try {
      // Mock login - in real app, use Supabase auth
      // This is just for demonstration
      if (userId === 'admin' && password === 'password') {
        const mockUser = {
          id: '1',
          email: 'admin@example.com',
          name: 'Super Admin',
          role: 'super_admin'
        };
        setUser(mockUser);
        localStorage.setItem('educationUser', JSON.stringify(mockUser));
        toast({
          title: "Login successful",
          description: "Welcome to the Education Management System",
        });
        navigate('/dashboard');
      } else if (userId === 'school' && password === 'password') {
        const mockUser = {
          id: '2',
          email: 'school@example.com',
          name: 'School Admin',
          role: 'school_admin',
          schoolId: '1'
        };
        setUser(mockUser);
        localStorage.setItem('educationUser', JSON.stringify(mockUser));
        toast({
          title: "Login successful",
          description: "Welcome to the Education Management System",
        });
        navigate('/dashboard');
      } else if (userId === 'teacher' && password === 'password') {
        const mockUser = {
          id: '3',
          email: 'teacher@example.com',
          name: 'Teacher User',
          role: 'teacher',
          schoolId: '1'
        };
        setUser(mockUser);
        localStorage.setItem('educationUser', JSON.stringify(mockUser));
        toast({
          title: "Login successful",
          description: "Welcome to the Education Management System",
        });
        navigate('/dashboard');
      } else if (userId === 'student' && password === 'password') {
        const mockUser = {
          id: '4',
          email: 'student@example.com',
          name: 'Student User',
          role: 'student',
          schoolId: '1'
        };
        setUser(mockUser);
        localStorage.setItem('educationUser', JSON.stringify(mockUser));
        toast({
          title: "Login successful",
          description: "Welcome to the Education Management System",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // In real app, sign out from Supabase
    localStorage.removeItem('educationUser');
    setUser(null);
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const checkAccess = (allowedRoles) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      isAuthenticated: !!user,
      checkAccess
    }}>
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
