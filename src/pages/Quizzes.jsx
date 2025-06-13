import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Award, CheckCircle, XCircle, BarChart } from 'lucide-react';

const Quizzes = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('available');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizInProgress, setQuizInProgress] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  // Mock data - would be fetched from API in a real application
  const subjects = [
    { id: 'sub1', name: 'Mathematics' },
    { id: 'sub2', name: 'Science' },
    { id: 'sub3', name: 'English' },
    { id: 'sub4', name: 'Social Studies' }
  ];
  
  const availableQuizzes = [
    { 
      id: 'quiz1', 
      title: 'Algebra Mid-Term Quiz', 
      subject: 'sub1',
      class: 'Class 8',
      timeLimit: 30, // minutes
      totalQuestions: 15,
      dueDate: '2023-10-20',
      active: true
    },
    { 
      id: 'quiz2', 
      title: 'Cell Biology Test', 
      subject: 'sub2',
      class: 'Class 9',
      timeLimit: 45,
      totalQuestions: 20,
      dueDate: '2023-10-25',
      active: true
    },
    { 
      id: 'quiz3', 
      title: 'Grammar Assessment', 
      subject: 'sub3',
      class: 'Class 7',
      timeLimit: 40,
      totalQuestions: 25,
      dueDate: '2023-10-18',
      active: true
    }
  ];
  
  const completedQuizzes = [
    { 
      id: 'quiz4', 
      title: 'Geometry Quiz', 
      subject: 'sub1',
      class: 'Class 8',
      totalQuestions: 10,
      correctAnswers: 8,
      score: 80,
      completedDate: '2023-09-28',
      timeSpent: 18 // minutes
    },
    { 
      id: 'quiz5', 
      title: 'Periodic Table Test', 
      subject: 'sub2',
      class: 'Class 9',
      totalQuestions: 15,
      correctAnswers: 12,
      score: 80,
      completedDate: '2023-09-15',
      timeSpent: 25
    }
  ];
  
  const allStudentQuizzes = [
    { 
      id: 'quiz1', 
      title: 'Algebra Mid-Term Quiz', 
      subject: 'sub1',
      class: 'Class 8',
      active: true,
      dueDate: '2023-10-20',
      totalStudents: 45,
      studentsCompleted: 28,
      averageScore: 76
    },
    { 
      id: 'quiz2', 
      title: 'Cell Biology Test', 
      subject: 'sub2',
      class: 'Class 9',
      active: true,
      dueDate: '2023-10-25',
      totalStudents: 38,
      studentsCompleted: 15,
      averageScore: 82
    },
    { 
      id: 'quiz3', 
      title: 'Grammar Assessment', 
      subject: 'sub3',
      class: 'Class 7',
      active: true,
      dueDate: '2023-10-18',
      totalStudents: 42,
      studentsCompleted: 34,
      averageScore: 68
    },
    { 
      id: 'quiz4', 
      title: 'Geometry Quiz', 
      subject: 'sub1',
      class: 'Class 8',
      active: false,
      dueDate: '2023-09-28',
      totalStudents: 45,
      studentsCompleted: 45,
      averageScore: 79
    }
  ];

  // Sample quiz questions
  const sampleQuizQuestions = [
    {
      id: 1,
      question: "What is the value of x in the equation 2x + 5 = 13?",
      options: [
        { id: "a", text: "x = 3" },
        { id: "b", text: "x = 4" },
        { id: "c", text: "x = 5" },
        { id: "d", text: "x = 6" }
      ],
      correctAnswer: "b"
    },
    {
      id: 2,
      question: "Which of the following is a quadratic equation?",
      options: [
        { id: "a", text: "y = 2x + 3" },
        { id: "b", text: "y = x² + 2x + 1" },
        { id: "c", text: "y = 3/x" },
        { id: "d", text: "y = 2^x" }
      ],
      correctAnswer: "b"
    },
    {
      id: 3,
      question: "Solve for y: 3y - 7 = 8",
      options: [
        { id: "a", text: "y = 5" },
        { id: "b", text: "y = 1" },
        { id: "c", text: "y = 0" },
        { id: "d", text: "y = 15" }
      ],
      correctAnswer: "a"
    }
  ];

  const handleStartQuiz = (quizId) => {
    setSelectedQuiz(quizId);
    setQuizInProgress(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
  };

  const handleAnswerSelect = (questionId, optionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    console.log('Quiz finished, answers:', selectedAnswers);
    setQuizInProgress(false);
    setSelectedQuiz(null);
    // In a real app, this would submit the answers and redirect to results
  };

  const handleCreateQuiz = () => {
    console.log('Creating new quiz');
    // In a real app, this would navigate to a quiz creation form
  };

  const renderQuizInProgress = () => {
    const currentQuestionData = sampleQuizQuestions[currentQuestion];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {availableQuizzes.find(q => q.id === selectedQuiz)?.title}
            </h2>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {sampleQuizQuestions.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>Time left: 28:45</span>
          </div>
        </div>

        <Progress value={(currentQuestion + 1) / sampleQuizQuestions.length * 100} className="h-2" />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestionData.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentQuestionData.options.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestionData.id] === option.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestionData.id, option.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center h-6 w-6 rounded-full border ${
                      selectedAnswers[currentQuestionData.id] === option.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground"
                    }`}>
                      {option.id.toUpperCase()}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === sampleQuizQuestions.length - 1 ? (
              <Button onClick={handleFinishQuiz}>Finish Quiz</Button>
            ) : (
              <Button onClick={handleNextQuestion}>Next</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderStudentQuizzes = () => {
    if (quizInProgress) {
      return renderQuizInProgress();
    }
    
    return (
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">Available Quizzes</TabsTrigger>
          <TabsTrigger value="completed">Completed Quizzes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-4 mt-6">
          {availableQuizzes.length === 0 ? (
            <Card className="w-full p-10 flex flex-col items-center justify-center text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No quizzes available</h3>
              <p className="text-muted-foreground">
                There are no quizzes assigned to you at the moment.
              </p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableQuizzes.map(quiz => (
                <Card key={quiz.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{quiz.title}</CardTitle>
                      <Badge>{subjects.find(s => s.id === quiz.subject)?.name}</Badge>
                    </div>
                    <CardDescription>{quiz.class}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Questions:</span>
                        <span>{quiz.totalQuestions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time Limit:</span>
                        <span>{quiz.timeLimit} minutes</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span>{quiz.dueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleStartQuiz(quiz.id)}>
                      Start Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedQuizzes.length === 0 ? (
            <Card className="w-full p-10 flex flex-col items-center justify-center text-center">
              <Award className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No completed quizzes</h3>
              <p className="text-muted-foreground">
                You haven't completed any quizzes yet.
              </p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedQuizzes.map(quiz => (
                <Card key={quiz.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{quiz.title}</CardTitle>
                      <Badge>{subjects.find(s => s.id === quiz.subject)?.name}</Badge>
                    </div>
                    <CardDescription>{quiz.class}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Score</span>
                        <span className="text-sm font-medium">{quiz.score}%</span>
                      </div>
                      <Progress value={quiz.score} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Correct Answers:</span>
                        <span>{quiz.correctAnswers}/{quiz.totalQuestions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completed On:</span>
                        <span>{quiz.completedDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time Spent:</span>
                        <span>{quiz.timeSpent} minutes</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    );
  };

  const renderTeacherQuizzes = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search quizzes..."
            className="w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleCreateQuiz}>
            Create New Quiz
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Quizzes</CardTitle>
          <CardDescription>Manage the quizzes you've created</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quiz Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Avg. Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allStudentQuizzes.map(quiz => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{subjects.find(s => s.id === quiz.subject)?.name}</TableCell>
                  <TableCell>{quiz.class}</TableCell>
                  <TableCell>
                    <Badge variant={quiz.active ? "default" : "outline"}>
                      {quiz.active ? "Active" : "Closed"}
                    </Badge>
                  </TableCell>
                  <TableCell>{quiz.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(quiz.studentsCompleted / quiz.totalStudents) * 100} 
                        className="h-2 w-20" 
                      />
                      <span className="text-xs">{quiz.studentsCompleted}/{quiz.totalStudents}</span>
                    </div>
                  </TableCell>
                  <TableCell>{quiz.averageScore}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">
          Take assessments and view your quiz results.
        </p>
      </div>

      {user?.role === 'student' && renderStudentQuizzes()}
      {(user?.role === 'teacher' || user?.role === 'school_admin' || user?.role === 'super_admin') && renderTeacherQuizzes()}
    </div>
  );
};

export default Quizzes;
