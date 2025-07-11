import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { BarChart3, TrendingUp, Download, Calendar, Users, Clock, FileText } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const Reports = () => {
  const attendanceTrendData = [
    { month: "Jan", attendance: 92 },
    { month: "Feb", attendance: 89 },
    { month: "Mar", attendance: 94 },
    { month: "Apr", attendance: 91 },
    { month: "May", attendance: 96 },
    { month: "Jun", attendance: 93 },
  ];

  const leaveTypeData = [
    { name: "Annual Leave", value: 45, fill: "#3b82f6" },
    { name: "Sick Leave", value: 23, fill: "#ef4444" },
    { name: "Personal Leave", value: 18, fill: "#f59e0b" },
    { name: "Maternity/Paternity", value: 14, fill: "#8b5cf6" }
  ];

  const chartConfig = {
    attendance: {
      label: "Attendance %",
      color: "#3b82f6"
    }
  };

  const pieConfig = {
    annual: { label: "Annual Leave", color: "#3b82f6" },
    sick: { label: "Sick Leave", color: "#ef4444" },
    personal: { label: "Personal Leave", color: "#f59e0b" },
    maternity: { label: "Maternity/Paternity", color: "#8b5cf6" }
  };

  const reportTypes = [
    {
      title: "Attendance Summary",
      description: "Monthly attendance overview with presence rates",
      lastGenerated: "Dec 15, 2024",
      status: "ready"
    },
    {
      title: "Leave Analysis",
      description: "Leave patterns and utilization by department",
      lastGenerated: "Dec 14, 2024",
      status: "ready"
    },
    {
      title: "Overtime Report",
      description: "Overtime hours and compensation analysis",
      lastGenerated: "Dec 13, 2024",
      status: "generating"
    },
    {
      title: "Department Insights",
      description: "Departmental attendance and productivity metrics",
      lastGenerated: "Dec 12, 2024",
      status: "ready"
    }
  ];

  const kpiData = [
    {
      title: "Overall Attendance Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: Users
    },
    {
      title: "Average Working Hours",
      value: "8.3 hrs",
      change: "+0.2 hrs",
      changeType: "positive",
      icon: Clock
    },
    {
      title: "Leave Utilization",
      value: "76.8%",
      change: "-3.2%",
      changeType: "negative",
      icon: Calendar
    },
    {
      title: "Productivity Score",
      value: "87.5",
      change: "+4.3",
      changeType: "positive",
      icon: TrendingUp
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ready</Badge>;
      case "generating":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Generating</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into attendance and leave patterns</p>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </div>
                <p className={`text-xs ${getChangeColor(kpi.changeType)}`}>
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Attendance Trends
                </CardTitle>
                <CardDescription>
                  Monthly attendance rates over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={attendanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="attendance" fill="var(--color-attendance)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Leave Distribution
                </CardTitle>
                <CardDescription>
                  Leave types and utilization by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={pieConfig} className="h-[250px]">
                  <PieChart>
                    <Pie
                      data={leaveTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {leaveTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Report Generation Panel */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate Reports
                </CardTitle>
                <CardDescription>
                  Create custom reports for specific periods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Monthly Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Department Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Overtime Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Performance Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Previously generated reports and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTypes.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{report.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Last: {report.lastGenerated}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(report.status)}
                        {report.status === "ready" && (
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
