import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/mgmt/Dashboard";
import Attendance from "./pages/mgmt/Attendance";
import LeaveManagement from "./pages/mgmt/LeaveManagement";
import Reports from "./pages/mgmt/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ResetPasswordPage from "./pages/auth/Reset-Password";
import RequestLeave from "./pages/RequestLeave";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/management/dashboard" element={<Dashboard />} />
          <Route path="/management/attendance" element={<Attendance />} />
          <Route path="/management/leave" element={<LeaveManagement />} />
          <Route path="/leave/request" element={<RequestLeave />} />
          <Route path="/management/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
