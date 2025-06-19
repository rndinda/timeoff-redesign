
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { UserCheck, Calendar, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useNavigate } from "react-router-dom";

const employeeStats = [
  {
    title: "Attendance This Month",
    value: "21 days",
    icon: UserCheck,
  },
  {
    title: "Leaves Taken",
    value: "3",
    icon: Calendar,
  },
  {
    title: "Performance",
    value: "A-",
    icon: TrendingUp,
  }
];

const attendanceData = [
  { day: "Mon", present: 1, absent: 0 },
  { day: "Tue", present: 1, absent: 0 },
  { day: "Wed", present: 1, absent: 0 },
  { day: "Thu", present: 0, absent: 1 },
  { day: "Fri", present: 1, absent: 0 },
];

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
          <p className="text-gray-600">Welcome! Here’s your attendance summary and quick actions.</p>
        </div>

        {/* Limited Stats */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {employeeStats.map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Simple Attendance Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                My Attendance Trend
              </CardTitle>
              <CardDescription>
                Your check-in/out pattern this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                present: { label: "Present", color: "#22c55e" },
                absent: { label: "Absent", color: "#ef4444" }
              }} className="h-[230px]">
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

          {/* Employee Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("/attendance")}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("/leave")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Request/View Leaves
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("/reports")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                My Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
