import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

interface StatsCardsProps {
  stats: StatCardProps[];
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const getChangeColor = (type: StatCardProps["changeType"]) => {
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
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
            <p className={`text-xs ${getChangeColor(stat.changeType)}`}>
              {stat.change} from last week
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
