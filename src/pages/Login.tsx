import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/hooks/use-theme';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(userId, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-secondary/10 p-4">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" onClick={toggleTheme} size="sm" className="rounded-md">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Classbridge Logo" className="h-48 w-48 mx-auto mb-2" />
          <h1 className="text-4xl font-bold mb-1 text-primary">Classbridge</h1>
          <p className="text-muted-foreground text-sm">Student Management System</p>
        </div>

        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">Username</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your username"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs" type="button">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus:border-primary"
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-2">
                For demo: use "admin", "teacher", or "student" as username and "password" as password
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <footer className="absolute bottom-4 text-center text-xs text-muted-foreground">
        &copy; 2023 Classbridge. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
