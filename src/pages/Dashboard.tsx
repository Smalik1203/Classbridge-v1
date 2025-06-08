
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckSquare, DollarSign, FileText, User, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data for dashboard stats
  const getStatsByRole = () => {
    switch (user?.role) {
      case 'super_admin':
        return {
          schools: 5,
          students: 1240,
          teachers: 75,
          classes: 48,
          attendance: '92%',
          feesCollected: '$45,850',
          pendingFees: '$5,200',
          resources: 156,
          quizzes: 95,
        };
      case 'school_admin':
        return {
          students: 350,
          teachers: 22,
          classes: 12,
          attendance: '89%',
          feesCollected: '$12,450',
          pendingFees: '$1,850',
          resources: 45,
          quizzes: 28,
        };
      case 'teacher':
        return {
          students: 85,
          classes: 3,
          attendance: '94%',
          resources: 18,
          quizzes: 7,
        };
      case 'student':
        return {
          attendance: '96%',
          fees: '$350',
          pendingFees: '$0',
          resources: 12,
          quizzes: 4,
          completedQuizzes: 3,
        };
      default:
        return {};
    }
  };
  
  const stats = getStatsByRole();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's an overview of your education portal.
        </p>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Cards based on user role */}
        {user?.role === 'super_admin' && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.schools}</div>
                <p className="text-xs text-muted-foreground">
                  Schools in the system
                </p>
              </CardContent>
            </Card>
          </>
        )}
        
        {(user?.role === 'super_admin' || user?.role === 'school_admin') && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.students}</div>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'super_admin' ? 'Across all schools' : 'In your school'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.teachers}</div>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'super_admin' ? 'Across all schools' : 'In your school'}
                </p>
              </CardContent>
            </Card>
          </>
        )}
        
        {(user?.role === 'super_admin' || user?.role === 'school_admin' || user?.role === 'teacher') && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.classes}</div>
              <p className="text-xs text-muted-foreground">
                {user?.role === 'teacher' ? 'Assigned to you' : 
                  user?.role === 'school_admin' ? 'In your school' : 'Across all schools'}
              </p>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendance}</div>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'student' ? 'Your attendance' : 
                user?.role === 'teacher' ? 'In your classes' : 
                  user?.role === 'school_admin' ? 'School average' : 'System average'}
            </p>
          </CardContent>
        </Card>
        
        {(user?.role === 'super_admin' || user?.role === 'school_admin') && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.feesCollected}</div>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'super_admin' ? 'Across all schools' : 'In your school'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingFees}</div>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'super_admin' ? 'Across all schools' : 'In your school'}
                </p>
              </CardContent>
            </Card>
          </>
        )}
        
        {user?.role === 'student' && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Fees</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.fees}</div>
                <p className="text-xs text-muted-foreground">
                  Total for current term
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingFees}</div>
                <p className="text-xs text-muted-foreground">
                  Amount due
                </p>
              </CardContent>
            </Card>
          </>
        )}
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resources}</div>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'student' ? 'Available to you' : 
                user?.role === 'teacher' ? 'Created by you' : 
                  user?.role === 'school_admin' ? 'In your school' : 'Across all schools'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quizzes}</div>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'student' ? 'Assigned to you' : 
                user?.role === 'teacher' ? 'Created by you' : 
                  user?.role === 'school_admin' ? 'In your school' : 'Across all schools'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {user?.role === 'student' && (
        <div className="grid gap-4 grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest activities in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completed Mathematics Quiz</p>
                    <p className="text-xs text-muted-foreground">Score: 85% • 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Attendance Marked</p>
                    <p className="text-xs text-muted-foreground">Present • Yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Learning Resource Available</p>
                    <p className="text-xs text-muted-foreground">Science Notes • 3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {(user?.role === 'teacher' || user?.role === 'school_admin') && (
        <div className="grid gap-4 grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Student Added</p>
                    <p className="text-xs text-muted-foreground">John Smith • 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quiz Results Available</p>
                    <p className="text-xs text-muted-foreground">Mathematics Quiz • Yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Fee Payment Received</p>
                    <p className="text-xs text-muted-foreground">$1,250 collected • 3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
