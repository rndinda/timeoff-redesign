import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { Calendar, Clock, Search, Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeaveManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const leaveRequests = [
    {
      id: 1,
      employeeName: "Alice Cooper",
      department: "Engineering",
      leaveType: "Annual Leave",
      startDate: "Dec 20, 2024",
      endDate: "Dec 22, 2024",
      days: 3,
      status: "pending",
      requestDate: "Dec 15, 2024",
      reason: "Family vacation"
    },
    {
      id: 2,
      employeeName: "Bob Wilson",
      department: "Marketing",
      leaveType: "Sick Leave",
      startDate: "Dec 18, 2024",
      endDate: "Dec 18, 2024",
      days: 1,
      status: "approved",
      requestDate: "Dec 17, 2024",
      reason: "Medical appointment"
    },
    {
      id: 3,
      employeeName: "Carol Davis",
      department: "Sales",
      leaveType: "Personal Leave",
      startDate: "Dec 25, 2024",
      endDate: "Dec 26, 2024",
      days: 2,
      status: "pending",
      requestDate: "Dec 14, 2024",
      reason: "Personal matters"
    },
    {
      id: 4,
      employeeName: "David Lee",
      department: "HR",
      leaveType: "Annual Leave",
      startDate: "Jan 2, 2025",
      endDate: "Jan 5, 2025",
      days: 4,
      status: "rejected",
      requestDate: "Dec 10, 2024",
      reason: "Holiday extension"
    },
    {
      id: 5,
      employeeName: "Eva Martinez",
      department: "Finance",
      leaveType: "Maternity Leave",
      startDate: "Jan 15, 2025",
      endDate: "Apr 15, 2025",
      days: 90,
      status: "approved",
      requestDate: "Dec 1, 2024",
      reason: "Maternity leave"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>;
    }
  };

  const filteredRequests = leaveRequests.filter(request =>
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id: number) => {
    console.log(`Approving leave request ${id}`);
  };

  const handleReject = (id: number) => {
    console.log(`Rejecting leave request ${id}`);
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Leave Management</h1>
            <p className="text-gray-600">Manage employee leave requests and balances</p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <p className="text-xs text-yellow-600">+2 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Approved This Month</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">45</div>
                <p className="text-xs text-green-600">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Currently On Leave</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">7</div>
                <p className="text-xs text-blue-600">Normal range</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg. Leave Days</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">18.5</div>
                <p className="text-xs text-purple-600">Per employee/year</p>
              </CardContent>
            </Card>
          </div>

          {/* Leave Requests Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Leave Requests
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button
                      className="flex items-center gap-2"
                      onClick={() => navigate("/leave/request")}
                  >
                    <Plus className="h-4 w-4" />
                    New Request
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.employeeName}</div>
                            <div className="text-sm text-gray-500">{request.department}</div>
                          </div>
                        </TableCell>
                        <TableCell>{request.leaveType}</TableCell>
                        <TableCell>{request.startDate}</TableCell>
                        <TableCell>{request.endDate}</TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          {request.status === "pending" && (
                              <div className="flex gap-1">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 px-2 text-xs bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                                    onClick={() => handleApprove(request.id)}
                                >
                                  Approve
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 px-2 text-xs bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                                    onClick={() => handleReject(request.id)}
                                >
                                  Reject
                                </Button>
                              </div>
                          )}
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
  );
};

export default LeaveManagement;