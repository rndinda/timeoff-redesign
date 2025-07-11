import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle, Clock, Users, BarChart3, Calendar, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Accurate attendance tracking with clock-in/clock-out functionality"
    },
    {
      icon: Calendar,
      title: "Leave Management",
      description: "Streamlined leave requests, approvals, and balance tracking"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Manage multiple teams and departments with role-based access"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive reports and insights on attendance patterns"
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description: "Built-in compliance features for labor laws and regulations"
    },
    {
      icon: CheckCircle,
      title: "Easy Integration",
      description: "Seamlessly integrate with existing HR and payroll systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/timeoff_logo-nobg.png" alt="Timeoff Logo" className="h-10" />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/management/dashboard">Dashboard</Link>
            </Button>
            <Button asChild>
              <Link to="/management/dashboard">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Simplify Your
          <span className="text-blue-600"> Leave & Attendance </span>
          Management
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Streamline your workforce management with our comprehensive solution for tracking attendance, 
          managing leave requests, and generating insightful reports.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/dashboard">Start Free Trial</Link>
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to manage your workforce
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features designed to make attendance and leave management effortless
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your attendance management?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of companies already using Timeoff in streamlining their leave and attendance processes.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/dashboard">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <img src="/timeoff_logo-nobg.png" alt="Timeoff Logo" className="h-10" />
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TimeOff. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
