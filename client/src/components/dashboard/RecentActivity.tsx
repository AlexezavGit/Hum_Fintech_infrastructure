import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";
import type { ActivityLog } from "@shared/schema";

export default function RecentActivity() {
  const { data: activities, isLoading } = useQuery<ActivityLog[]>({
    queryKey: ["/api/activity/recent"],
  });

  const getActivityColor = (action: string) => {
    switch (action) {
      case "make_donation":
        return "bg-secondary";
      case "create_project":
        return "bg-primary";
      case "register_beneficiary":
        return "bg-warning";
      default:
        return "bg-gray-400";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activities && activities.length > 0 ? (
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <Circle className={`w-2 h-2 ${getActivityColor(activity.action)} rounded-full mt-2 flex-shrink-0`} />
                <div>
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  {activity.entityId && (
                    <p className="text-xs text-gray-500 font-mono">
                      {activity.entityType?.toUpperCase()}: {activity.entityId}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formatTimeAgo(activity.createdAt!)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <Circle className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-500 mt-2">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
