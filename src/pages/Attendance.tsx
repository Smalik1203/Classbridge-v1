
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarDays, UserCheck, Users } from 'lucide-react';
import { format } from 'date-fns';

const Attendance = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  
  // Mock data - would be fetched from API in a real application
  const classes = [
    { id: 'class1', name: 'Class 6A' },
    { id: 'class2', name: 'Class 7B' },
    { id: 'class3', name: 'Class 8C' },
  ];
  
  const students = [
    { id: '1', name: 'Alice Johnson', status: true },
    { id: '2', name: 'Bob Smith', status: false },
    { id: '3', name: 'Charlie Brown', status: true },
    { id: '4', name: 'Diana Prince', status: true },
    { id: '5', name: 'Ethan Hunt', status: true },
  ];

  // Historical attendance for student view
  const attendanceHistory = [
    { date: '2023-09-01', status: true },
    { date: '2023-09-02', status: true },
    { date: '2023-09-03', status: false },
    { date: '2023-09-04', status: true },
    { date: '2023-09-05', status: true },
  ];

  const handleStatusChange = (studentId: string, newStatus: boolean) => {
    console.log(`Changed status of student ${studentId} to ${newStatus}`);
    // In real app, this would update the database
  };

  const handleSaveAttendance = () => {
    console.log('Saving attendance for class:', selectedClass, 'date:', selectedDate);
    // In real app, this would send data to the backend
  };

  const renderTeacherView = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium mb-1">Select Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select class..." />
            </SelectTrigger>
            <SelectContent>
              {classes.map(cls => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
      </div>

      {selectedClass && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mark Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Checkbox 
                        checked={student.status} 
                        onCheckedChange={(checked) => handleStatusChange(student.id, checked as boolean)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveAttendance}>Save Attendance</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStudentView = () => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Attendance History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceHistory.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${record.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {record.status ? 'Present' : 'Absent'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderAdminView = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium mb-1">Select Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select class..." />
            </SelectTrigger>
            <SelectContent>
              {classes.map(cls => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">357</div>
            <p className="text-xs text-muted-foreground">
              Across all classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              95.8% attendance rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93.2%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {selectedClass && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Class Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${student.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {student.status ? 'Present' : 'Absent'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
        <p className="text-muted-foreground">
          Track and manage student attendance records.
        </p>
      </div>

      {user?.role === 'teacher' && renderTeacherView()}
      {user?.role === 'student' && renderStudentView()}
      {(user?.role === 'super_admin' || user?.role === 'school_admin') && renderAdminView()}
    </div>
  );
};

export default Attendance;
