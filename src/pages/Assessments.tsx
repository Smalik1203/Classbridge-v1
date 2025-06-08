import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Award, BookOpen, CheckCircle, FileText } from 'lucide-react';
import { UserRole } from '@/types';

// Define types for our component's data
interface ClassInfo {
  id: string;
  name: string;
}

interface SubjectInfo {
  id: string;
  name: string;
}

interface StudentMarks {
  [key: string]: number;
}

interface StudentInfo {
  id: string;
  name: string;
  marks: StudentMarks;
}

const Assessments = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  const classes: ClassInfo[] = [
    { id: 'class1', name: 'Class 6A' },
    { id: 'class2', name: 'Class 7B' },
    { id: 'class3', name: 'Class 8C' },
  ];
  
  const subjects: SubjectInfo[] = [
    { id: 'sub1', name: 'Mathematics' },
    { id: 'sub2', name: 'Science' },
    { id: 'sub3', name: 'English' },
    { id: 'sub4', name: 'Social Studies' }
  ];
  
  const students: StudentInfo[] = [
    { id: '1', name: 'Alice Johnson', marks: { sub1: 92, sub2: 88, sub3: 78, sub4: 85 } },
    { id: '2', name: 'Bob Smith', marks: { sub1: 75, sub2: 82, sub3: 90, sub4: 77 } },
    { id: '3', name: 'Charlie Brown', marks: { sub1: 88, sub2: 91, sub3: 85, sub4: 92 } },
  ];

  const handleSaveMarks = () => {
    console.log('Saving marks for class:', selectedClass, 'subject:', selectedSubject);
  };

  // Helper function to safely get marks
  const getStudentMark = (student: StudentInfo, subjectId: string): number | null => {
    return student.marks[subjectId] !== undefined ? student.marks[subjectId] : null;
  };

  // Get grade based on marks
  const getGrade = (marks: number | null): string => {
    if (marks === null) return 'N/A';
    if (marks < 60) return 'F';
    if (marks < 70) return 'D';
    if (marks < 80) return 'C';
    if (marks < 90) return 'B';
    return 'A';
  };

  // Get remarks based on marks
  const getRemarks = (marks: number | null): string => {
    if (marks === null) return 'No data';
    if (marks >= 90) return 'Excellent';
    if (marks >= 80) return 'Very Good';
    if (marks >= 70) return 'Good';
    if (marks >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  const renderTeacherView = () => {
    return (
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
            <label className="block text-sm font-medium mb-1">Select Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedClass && selectedSubject && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Enter Student Marks</CardTitle>
              <CardDescription>
                Assessment: First Term Exam (Max Marks: 100)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Marks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="0" 
                          max="100" 
                          defaultValue={getStudentMark(student, selectedSubject) || ''}
                          className="w-24"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSaveMarks}>Save Marks</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };
  
  const renderStudentView = () => {
    // For demo purposes use the first student
    const studentData = students[0];
    
    return (
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">A</div>
              <p className="text-xs text-muted-foreground">
                Class Rank: 3
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">
                Across all subjects
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Completed this term
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your marks across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => {
                  const marks = getStudentMark(studentData, subject.id);
                  const grade = getGrade(marks);
                  const remarks = getRemarks(marks);
                  
                  return (
                    <TableRow key={subject.id}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{marks !== null ? `${marks}/100` : 'No data'}</TableCell>
                      <TableCell>{grade}</TableCell>
                      <TableCell>{remarks}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAdminView = () => {
    return (
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
            <label className="block text-sm font-medium mb-1">Select Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Average</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82.4%</div>
              <p className="text-xs text-muted-foreground">
                Across all subjects
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Highest Scorer</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Diana Prince</div>
              <p className="text-xs text-muted-foreground">
                Average: 91%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                This academic term
              </p>
            </CardContent>
          </Card>
        </div>

        {selectedClass && selectedSubject && (
          <Card>
            <CardHeader>
              <CardTitle>Class Performance</CardTitle>
              <CardDescription>
                {classes.find(c => c.id === selectedClass)?.name} - {subjects.find(s => s.id === selectedSubject)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>First Term</TableHead>
                    <TableHead>Mid Term</TableHead>
                    <TableHead>Class Test</TableHead>
                    <TableHead>Final Exam</TableHead>
                    <TableHead>Overall</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const marks = getStudentMark(student, selectedSubject);
                    const grade = getGrade(marks);
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>22</TableCell>
                        <TableCell>90</TableCell>
                        <TableCell>{marks !== null ? `${marks}%` : 'No data'}</TableCell>
                        <TableCell>{grade}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };
  
  // Determine the roles with access to different views
  const renderContent = () => {
    if (!user) {
      return (
        <div className="flex items-center justify-center h-full">
          <p>Please log in to access this page.</p>
        </div>
      );
    }
    
    if (user.role === 'teacher') {
      return renderTeacherView();
    } else if (user.role === 'student') {
      return renderStudentView();
    } else if (user.role === 'super_admin' || user.role === 'school_admin') {
      return renderAdminView();
    } else {
      return (
        <div>
          <p>You don't have permission to access this page.</p>
        </div>
      );
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assessments & Marks</h1>
        <p className="text-muted-foreground">
          Manage and view student assessment results.
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Assessments; 