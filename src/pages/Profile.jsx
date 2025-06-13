
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Lock, UserCircle, Mail, Settings, Info } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  
  // Mock data
  const userData = {
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    role: user?.role || 'student',
    school: 'Greenfield High School',
    phoneNumber: '+1 (234) 567-8901',
    address: '123 Education St, Learning City, 98765',
    joinDate: '2023-01-15',
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const handleSaveProfile = () => {
    console.log('Saving profile information');
    // In a real app, this would update the user's profile
  };
  
  const handleChangePassword = () => {
    console.log('Changing password');
    // In a real app, this would handle password change
  };
  
  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile image</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src="" alt={userData.name} />
              <AvatarFallback className="text-2xl">{getInitials(userData.name)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Picture
            </Button>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue={userData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={userData.email} type="email" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" defaultValue={userData.phoneNumber} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={userData.role.replace('_', ' ')} readOnly className="capitalize" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue={userData.address} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Educational Information</CardTitle>
          <CardDescription>Details about your school and education</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>School / Institution</Label>
              <div className="text-sm rounded-md p-2 bg-muted">{userData.school}</div>
            </div>
            <div className="space-y-2">
              <Label>Joined Date</Label>
              <div className="text-sm rounded-md p-2 bg-muted">{userData.joinDate}</div>
            </div>
            
            {(user?.role === 'student') && (
              <>
                <div className="space-y-2">
                  <Label>Class</Label>
                  <div className="text-sm rounded-md p-2 bg-muted">Class 8A</div>
                </div>
                <div className="space-y-2">
                  <Label>Admission Number</Label>
                  <div className="text-sm rounded-md p-2 bg-muted">S2023045</div>
                </div>
              </>
            )}
            
            {(user?.role === 'teacher') && (
              <>
                <div className="space-y-2">
                  <Label>Subjects</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Mathematics</Badge>
                    <Badge>Physics</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Classes</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Class 7A</Badge>
                    <Badge variant="outline">Class 8B</Badge>
                    <Badge variant="outline">Class 9C</Badge>
                  </div>
                </div>
              </>
            )}
            
            {(user?.role === 'school_admin' || user?.role === 'super_admin') && (
              <>
                <div className="space-y-2">
                  <Label>Admin ID</Label>
                  <div className="text-sm rounded-md p-2 bg-muted">
                    {user?.role === 'super_admin' ? 'SA9876' : 'AD5432'}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Access Level</Label>
                  <div className="text-sm rounded-md p-2 bg-muted capitalize">
                    {user?.role === 'super_admin' ? 'System-wide Access' : 'School-level Access'}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Change Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button onClick={handleChangePassword}>Update Password</Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable 2FA</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Active Sessions</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <div>
                  <p className="font-medium">Current Device</p>
                  <p className="text-sm text-muted-foreground">Windows 10 • Chrome • New York, USA</p>
                </div>
                <Badge>Active Now</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New assignments</p>
                  <p className="text-sm text-muted-foreground">Get notified when new assignments are posted</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Quiz reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminders before quiz due dates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Feedback and grades</p>
                  <p className="text-sm text-muted-foreground">Receive emails when grades are posted</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">System Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System announcements</p>
                  <p className="text-sm text-muted-foreground">Important announcements about the system</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified about planned maintenance</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
          
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          {renderGeneralTab()}
        </TabsContent>
        <TabsContent value="security">
          {renderSecurityTab()}
        </TabsContent>
        <TabsContent value="notifications">
          {renderNotificationsTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
