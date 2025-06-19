
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Settings as SettingsIcon, Building, Clock, Shield, Bell } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [companySettings, setCompanySettings] = useState({
    companyName: "AttendEase Corp",
    timezone: "America/New_York",
    workingHours: "9:00 AM - 6:00 PM",
    workingDays: "Monday - Friday"
  });

  const [attendanceSettings, setAttendanceSettings] = useState({
    lateThreshold: "15",
    autoClockOut: true,
    allowMobileCheckIn: true,
    requireLocationCheck: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "8",
    passwordExpiry: "90"
  });

  const saveSettings = (category: string) => {
    toast.success(`${category} settings saved successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your AttendEase application settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Company Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companySettings.companyName}
                      onChange={(e) => setCompanySettings({
                        ...companySettings,
                        companyName: e.target.value
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={companySettings.timezone}
                      onValueChange={(value) => setCompanySettings({
                        ...companySettings,
                        timezone: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workingHours">Working Hours</Label>
                    <Input
                      id="workingHours"
                      value={companySettings.workingHours}
                      onChange={(e) => setCompanySettings({
                        ...companySettings,
                        workingHours: e.target.value
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workingDays">Working Days</Label>
                    <Input
                      id="workingDays"
                      value={companySettings.workingDays}
                      onChange={(e) => setCompanySettings({
                        ...companySettings,
                        workingDays: e.target.value
                      })}
                    />
                  </div>
                </div>

                <Button onClick={() => saveSettings("General")}>
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Settings */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Attendance Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="lateThreshold">Late Threshold (minutes)</Label>
                    <Input
                      id="lateThreshold"
                      type="number"
                      value={attendanceSettings.lateThreshold}
                      onChange={(e) => setAttendanceSettings({
                        ...attendanceSettings,
                        lateThreshold: e.target.value
                      })}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Clock Out</Label>
                        <p className="text-sm text-gray-600">Automatically clock out employees at end of day</p>
                      </div>
                      <Switch
                        checked={attendanceSettings.autoClockOut}
                        onCheckedChange={(checked) => setAttendanceSettings({
                          ...attendanceSettings,
                          autoClockOut: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Mobile Check-in</Label>
                        <p className="text-sm text-gray-600">Enable check-in from mobile devices</p>
                      </div>
                      <Switch
                        checked={attendanceSettings.allowMobileCheckIn}
                        onCheckedChange={(checked) => setAttendanceSettings({
                          ...attendanceSettings,
                          allowMobileCheckIn: checked
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Location Check</Label>
                        <p className="text-sm text-gray-600">Verify employee location during check-in</p>
                      </div>
                      <Switch
                        checked={attendanceSettings.requireLocationCheck}
                        onCheckedChange={(checked) => setAttendanceSettings({
                          ...attendanceSettings,
                          requireLocationCheck: checked
                        })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={() => saveSettings("Attendance")}>
                  Save Attendance Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: checked
                      })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: e.target.value
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Input
                        id="passwordExpiry"
                        type="number"
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          passwordExpiry: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={() => saveSettings("Security")}>
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  For detailed notification settings, please visit the{" "}
                  <a href="/notifications" className="text-blue-600 hover:underline">
                    Notifications page
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
