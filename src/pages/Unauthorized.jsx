
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex flex-col gap-2">
          <Button 
            onClick={() => navigate(user ? '/dashboard' : '/')}
            className="w-full flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {user ? 'Back to Dashboard' : 'Back to Home'}
          </Button>
          {user && (
            <Button 
              variant="outline"
              onClick={() => navigate('/profile')}
              className="w-full"
            >
              View Your Profile
            </Button>
          )}
          {!user && (
            <Button 
              variant="outline"
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Log In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
