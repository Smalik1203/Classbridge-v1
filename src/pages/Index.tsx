import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('educationUser');
    if (storedUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-background to-secondary/20">
      <div className="absolute top-4 right-4">
        <Button 
          variant="outline" 
          onClick={toggleTheme}
          className="rounded-full bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3 text-primary">
            Classbridge
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto">
            Navigate your educational journey with modern tools designed for success
          </p>
        </div>
        
        <div className="max-w-md w-full space-y-4 mb-12">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl">
          {[
            { title: "Student Management", description: "Track progress and manage student records" },
            { title: "Attendance Tracking", description: "Monitor and analyze attendance patterns" },
            { title: "Fee Management", description: "Handle payments and financial records" },
            { title: "Learning Resources", description: "Access educational materials anytime" },
            { title: "Assessment System", description: "Create and evaluate assessments" },
            { title: "Quiz Platform", description: "Interactive learning through quizzes" },
            { title: "Security & Privacy", description: "Role-based access and data protection" },
            { title: "Modern Interface", description: "Intuitive design for all devices" },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="bg-card p-4 rounded-lg border"
            >
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 Classbridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
