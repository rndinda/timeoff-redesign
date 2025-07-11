import { Button } from "../../components/ui/button";
import { Bell, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/timeoff_logo-nobg.png" alt="Timeoff Logo" className="h-10" />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/management/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link to="/management/attendance" className="text-gray-700 hover:text-blue-600 font-medium">
              Attendance
            </Link>
            <Link to="/management/leave" className="text-gray-700 hover:text-blue-600 font-medium">
              Leave Management
            </Link>
            <Link to="/management/reports" className="text-gray-700 hover:text-blue-600 font-medium">
              Reports
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/notifications">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
