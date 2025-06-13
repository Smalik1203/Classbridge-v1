
export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolId?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  contact: string;
}

export interface Class {
  id: string;
  name: string;
  schoolId: string;
  teacherId?: string;
}

export interface Student {
  id: string;
  userId: string;
  name: string;
  rollNumber: string;
  classId: string;
  schoolId: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'partial';
  description: string;
}

export interface Assessment {
  id: string;
  name: string;
  classId: string;
  totalMarks: number;
  date: string;
}

export interface StudentMark {
  id: string;
  studentId: string;
  assessmentId: string;
  marksObtained: number;
  remarks?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  uploadedBy: string;
  classId: string;
  createdAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  classId: string;
  createdBy: string;
  duration: number; // in minutes
  totalMarks: number;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  score?: number;
  status: 'in_progress' | 'completed';
}

export interface QuizAnswer {
  id: string;
  attemptId: string;
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
}
