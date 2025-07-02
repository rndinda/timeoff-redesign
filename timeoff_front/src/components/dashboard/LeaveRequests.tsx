import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Calendar, Clock } from "lucide-react";

export const LeaveRequests = () => {
  const requests = [
    {
      name: "Alice Cooper",
      type: "Annual Leave",
      dates: "Dec 20-22",
      status: "pending"
    },
    {
      name: "Bob Wilson",
      type: "Sick Leave",
      dates: "Dec 18",
      status: "approved"
    },
    {
      name: "Carol Davis",
      type: "Personal Leave",
      dates: "Dec 25-26",
      status: "pending"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Leave Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{request.name}</p>
                <p className="text-sm text-gray-600">{request.type}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  {request.dates}
                </p>
              </div>
              <div className="text-right">
                {getStatusBadge(request.status)}
                {request.status === "pending" && (
                  <div className="flex gap-1 mt-2">
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
