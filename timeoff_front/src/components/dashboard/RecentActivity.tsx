
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, UserCheck, UserX, Calendar } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      icon: UserCheck,
      title: "John Smith checked in",
      time: "9:00 AM",
      type: "checkin"
    },
    {
      icon: Calendar,
      title: "Sarah Johnson requested leave",
      time: "8:45 AM",
      type: "leave"
    },
    {
      icon: UserX,
      title: "Mike Davis checked out",
      time: "8:30 AM",
      type: "checkout"
    },
    {
      icon: UserCheck,
      title: "Emma Wilson checked in",
      time: "8:15 AM",
      type: "checkin"
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "checkin":
        return "text-green-600 bg-green-50";
      case "checkout":
        return "text-red-600 bg-red-50";
      case "leave":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest attendance and leave activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
