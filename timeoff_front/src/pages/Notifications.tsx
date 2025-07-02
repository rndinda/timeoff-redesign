import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Bell, Check, Clock, UserCheck, Calendar } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "leave_request",
      title: "Leave Request Submitted",
      message: "Sarah Johnson has submitted a leave request for March 15-17, 2024",
      time: "2 minutes ago",
      read: false,
      icon: Calendar
    },
    {
      id: 2,
      type: "attendance",
      title: "Late Check-in Alert",
      message: "Mike Davis checked in at 9:30 AM (30 minutes late)",
      time: "1 hour ago",
      read: false,
      icon: Clock
    },
    {
      id: 3,
      type: "approval",
      title: "Leave Request Approved",
      message: "Your leave request for March 20-22 has been approved",
      time: "3 hours ago",
      read: true,
      icon: UserCheck
    },
    {
      id: 4,
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM",
      time: "1 day ago",
      read: true,
      icon: Bell
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    leaveRequestAlerts: true,
    attendanceAlerts: true,
    systemUpdates: false
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "leave_request": return "bg-blue-100 text-blue-800";
      case "attendance": return "bg-yellow-100 text-yellow-800";
      case "approval": return "bg-green-100 text-green-800";
      case "system": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Manage your notifications and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Recent Notifications
                    {unreadCount > 0 && (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                        {unreadCount} new
                      </Badge>
                    )}
                  </CardTitle>
                  {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                      <Check className="h-4 w-4 mr-2" />
                      Mark all as read
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        notification.read 
                          ? "bg-white border-gray-200" 
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-gray-100">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">
                              {notification.title}
                            </h4>
                            <Badge 
                              className={getTypeColor(notification.type)}
                              variant="secondary"
                            >
                              {notification.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, emailNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive browser notifications</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, pushNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Leave Request Alerts</p>
                    <p className="text-sm text-gray-600">Alerts for leave requests</p>
                  </div>
                  <Switch
                    checked={settings.leaveRequestAlerts}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, leaveRequestAlerts: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Attendance Alerts</p>
                    <p className="text-sm text-gray-600">Alerts for attendance issues</p>
                  </div>
                  <Switch
                    checked={settings.attendanceAlerts}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, attendanceAlerts: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-gray-600">Updates about system changes</p>
                  </div>
                  <Switch
                    checked={settings.systemUpdates}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, systemUpdates: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
