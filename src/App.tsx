import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import RouteGuard from "@/components/guards/RouteGuard";
import Layout from "@/components/layout/Layout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Attendance from "@/pages/Attendance";
import Fees from "@/pages/Fees";
import Assessments from "@/pages/Assessments";
import Resources from "@/pages/Resources";
import Quizzes from "@/pages/Quizzes";
import Profile from "@/pages/Profile";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Redirect root to login page */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <RouteGuard>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </RouteGuard>
                } 
              />
              
              <Route 
                path="/attendance" 
                element={
                  <RouteGuard>
                    <Layout>
                      <Attendance />
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/fees" 
                element={
                  <RouteGuard allowedRoles={['super_admin', 'school_admin', 'student']}>
                    <Layout>
                      <Fees />
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/assessments" 
                element={
                  <RouteGuard>
                    <Layout>
                      <Assessments />
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/resources" 
                element={
                  <RouteGuard>
                    <Layout>
                      <Resources />
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/quizzes" 
                element={
                  <RouteGuard>
                    <Layout>
                      <Quizzes />
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/profile" 
                element={
                  <RouteGuard>
                    <Layout>
                      <Profile />
                    </Layout>
                  </RouteGuard>
                }
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
