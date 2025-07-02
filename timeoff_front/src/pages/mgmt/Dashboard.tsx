import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  Users, 
  Clock, 
  Calendar, 
  TrendingUp, 
  UserCheck,
  CalendarDays,
  BarChart3
} from "lucide-react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { StatsCards } from "../../components/dashboard/StatsCards";
import { RecentActivity } from "../../components/dashboard/RecentActivity";
import { LeaveRequests } from "../../components/dashboard/LeaveRequests";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Employees",
      value: "245",
      icon: Users,
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Present Today",
      value: "238",
      icon: UserCheck,
      change: "97.1%",
      changeType: "positive" as const
    },
    {
      title: "On Leave",
      value: "7",
      icon: CalendarDays,
      change: "-3%",
      changeType: "positive" as const
    },
    {
      title: "Pending Requests",
      value: "12",
      icon: Clock,
      change: "+2",
      changeType: "neutral" as const
    }
  ];

  const attendanceData = [
    { day: "Mon", present: 232, absent: 13 },
    { day: "Tue", present: 238, absent: 7 },
    { day: "Wed", present: 241, absent: 4 },
    { day: "Thu", present: 235, absent: 10 },
    { day: "Fri", present: 243, absent: 2 },
    { day: "Sat", present: 189, absent: 56 },
    { day: "Sun", present: 145, absent: 100 }
  ];

  const chartConfig = {
    present: {
      label: "Present",
      color: "#22c55e"
    },
    absent: {
      label: "Absent", 
      color: "#ef4444"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your team today.</p>
        </div>

        <StatsCards stats={stats} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Attendance Overview
                </CardTitle>
                <CardDescription>
                  Daily attendance trends for the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="present" 
                      stroke="var(--color-present)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-present)" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="absent" 
                      stroke="var(--color-absent)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-absent)" }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <RecentActivity />
          </div>

          <div className="space-y-8">
            <LeaveRequests />

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/attendance')}
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/leave')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Request Leave
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/attendance')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/reports')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
