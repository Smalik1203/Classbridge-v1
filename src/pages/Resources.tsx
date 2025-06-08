
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Upload, Clock, BookOpen, Filter } from 'lucide-react';

const Resources = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  
  // Mock data - would be fetched from API in a real application
  const subjects = [
    { id: 'sub1', name: 'Mathematics' },
    { id: 'sub2', name: 'Science' },
    { id: 'sub3', name: 'English' },
    { id: 'sub4', name: 'Social Studies' }
  ];
  
  const classes = [
    { id: 'class1', name: 'Class 6A' },
    { id: 'class2', name: 'Class 7B' },
    { id: 'class3', name: 'Class 8C' },
  ];

  const resources = [
    { 
      id: '1', 
      title: 'Algebra Fundamentals', 
      description: 'Basic concepts of algebraic equations and operations', 
      subject: 'sub1',
      class: 'class2',
      uploadDate: '2023-08-15',
      uploadedBy: 'Teacher User',
      fileSize: '2.4 MB',
      downloads: 45
    },
    { 
      id: '2', 
      title: 'Cell Structure and Function', 
      description: 'Comprehensive notes on cell biology', 
      subject: 'sub2',
      class: 'class3',
      uploadDate: '2023-09-05',
      uploadedBy: 'Teacher User',
      fileSize: '3.1 MB',
      downloads: 32
    },
    { 
      id: '3', 
      title: 'Essay Writing Guide', 
      description: 'Structure and tips for writing effective essays', 
      subject: 'sub3',
      class: 'class1',
      uploadDate: '2023-07-22',
      uploadedBy: 'School Admin',
      fileSize: '1.8 MB',
      downloads: 67
    },
    { 
      id: '4', 
      title: 'World War II Timeline', 
      description: 'Detailed timeline of World War II events', 
      subject: 'sub4',
      class: 'class3',
      uploadDate: '2023-09-12',
      uploadedBy: 'Teacher User',
      fileSize: '4.2 MB',
      downloads: 28
    },
    { 
      id: '5', 
      title: 'Trigonometry Practice Problems', 
      description: 'Collection of problems with solutions', 
      subject: 'sub1',
      class: 'class3',
      uploadDate: '2023-08-28',
      uploadedBy: 'Teacher User',
      fileSize: '1.5 MB',
      downloads: 39
    },
  ];

  // Filter resources based on search term and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === '' || resource.subject === selectedSubject;
    const matchesClass = selectedClass === '' || resource.class === selectedClass;
    
    return matchesSearch && matchesSubject && matchesClass;
  });

  const handleDownloadResource = (resourceId: string) => {
    console.log(`Downloading resource ${resourceId}`);
    // In a real app, this would initiate a file download
  };

  const handleUploadResource = () => {
    console.log('Opening upload dialog');
    // In a real app, this would open a file upload dialog
  };

  const renderFilterSection = () => (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Subject" />
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
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Classes</SelectItem>
            {classes.map(cls => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(user?.role === 'teacher' || user?.role === 'school_admin' || user?.role === 'super_admin') && (
          <Button onClick={handleUploadResource}>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        )}
      </div>
    </div>
  );

  const renderResourceGrid = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredResources.map(resource => (
        <Card key={resource.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription className="mt-1">{resource.description}</CardDescription>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">
                {subjects.find(s => s.id === resource.subject)?.name}
              </Badge>
              <Badge variant="outline">
                {classes.find(c => c.id === resource.class)?.name}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Uploaded on {resource.uploadDate}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{resource.downloads} downloads</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full" onClick={() => handleDownloadResource(resource.id)}>
              <Download className="mr-2 h-4 w-4" /> Download ({resource.fileSize})
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <Card className="w-full p-10 flex flex-col items-center justify-center text-center">
      <FileText className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">No resources found</h3>
      <p className="text-muted-foreground mb-6">
        {searchTerm || selectedSubject || selectedClass 
          ? "Try adjusting your filters to find more resources."
          : "There are no learning resources available yet."}
      </p>
      {(user?.role === 'teacher' || user?.role === 'school_admin' || user?.role === 'super_admin') && (
        <Button onClick={handleUploadResource}>
          <Upload className="mr-2 h-4 w-4" /> Upload New Resource
        </Button>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
        <p className="text-muted-foreground">
          Access educational materials and learning resources.
        </p>
      </div>

      {renderFilterSection()}

      {filteredResources.length > 0 ? renderResourceGrid() : renderEmptyState()}
    </div>
  );
};

export default Resources;
