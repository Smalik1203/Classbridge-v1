
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';

const Fees = () => {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  
  // Mock data - would be fetched from API in a real application
  const students = [
    { id: '1', name: 'Alice Johnson', outstanding: 500 },
    { id: '2', name: 'Bob Smith', outstanding: 0 },
    { id: '3', name: 'Charlie Brown', outstanding: 750 },
    { id: '4', name: 'Diana Prince', outstanding: 250 },
    { id: '5', name: 'Ethan Hunt', outstanding: 1000 },
  ];
  
  const feeStructure = [
    { id: '1', name: 'Tuition Fee', amount: 5000, period: 'Per Term' },
    { id: '2', name: 'Sports Fee', amount: 1000, period: 'Per Term' },
    { id: '3', name: 'Library Fee', amount: 500, period: 'Per Term' },
    { id: '4', name: 'Technology Fee', amount: 1500, period: 'Per Term' },
  ];

  const paymentHistory = [
    { id: '1', date: '2023-09-01', amount: 2500, mode: 'Online' },
    { id: '2', date: '2023-08-01', amount: 2500, mode: 'Cash' },
    { id: '3', date: '2023-07-01', amount: 2500, mode: 'Bank Transfer' },
  ];

  const handlePayment = () => {
    console.log(`Recording payment of ${paymentAmount} for student ${selectedStudent}`);
    // In real app, this would update the database
    setPaymentAmount('');
  };

  const renderAdminView = () => (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,850</div>
            <p className="text-xs text-muted-foreground">
              Current academic year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,250</div>
            <p className="text-xs text-muted-foreground">
              Pending collections
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
            <CardDescription>Current term fee structure</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Period</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeStructure.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell>{fee.name}</TableCell>
                    <TableCell>${fee.amount}</TableCell>
                    <TableCell>{fee.period}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">$8,000</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Record Payment</CardTitle>
            <CardDescription>Register new fee payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Student</label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student..." />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter payment amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Date</label>
                <Input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Mode</label>
                <Select defaultValue="cash">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handlePayment}>Record Payment</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Fee Records */}
      <Card>
        <CardHeader>
          <CardTitle>Student Fee Records</CardTitle>
          <CardDescription>View and manage student fee status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Total Fee</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>$8,000</TableCell>
                  <TableCell>${8000 - student.outstanding}</TableCell>
                  <TableCell>${student.outstanding}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${student.outstanding === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {student.outstanding === 0 ? 'Paid' : 'Pending'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudentView = () => (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fee</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,000</div>
            <p className="text-xs text-muted-foreground">
              Current term
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,500</div>
            <p className="text-xs text-muted-foreground">
              93.75% completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500</div>
            <p className="text-xs text-muted-foreground">
              Due by 30th October
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
            <CardDescription>Current term fee breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Period</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeStructure.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell>{fee.name}</TableCell>
                    <TableCell>${fee.amount}</TableCell>
                    <TableCell>{fee.period}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">$8,000</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your recent payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.mode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
        <p className="text-muted-foreground">
          View and manage student fees and payments.
        </p>
      </div>

      {user?.role === 'student' && renderStudentView()}
      {(user?.role === 'super_admin' || user?.role === 'school_admin') && renderAdminView()}
    </div>
  );
};

export default Fees;
