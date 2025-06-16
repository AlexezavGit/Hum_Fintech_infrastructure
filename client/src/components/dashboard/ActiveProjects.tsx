import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ActiveProjects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const activeProjects = projects?.filter(p => p.status === "active").slice(0, 3) || [];

  const getStatusIcon = (isVerified: boolean, status: string) => {
    if (isVerified) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    if (status === "active") {
      return <Clock className="w-4 h-4 text-yellow-600" />;
    }
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  const getStatusBadge = (isVerified: boolean, status: string) => {
    if (isVerified) {
      return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
    }
    if (status === "active") {
      return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Active Projects</CardTitle>
          <Button variant="ghost" className="text-primary hover:text-blue-700 text-sm font-medium">
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activeProjects.length > 0 ? (
          <div className="space-y-6">
            {activeProjects.map((project) => {
              const progress = project.targetAmount > 0 
                ? (Number(project.currentAmount) / Number(project.targetAmount)) * 100 
                : 0;

              return (
                <div key={project.id} className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                        <span className="text-blue-600 text-xs font-medium">
                          {project.category.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-1">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs font-medium text-gray-500 font-mono">
                            ID: HUM-{project.id.toString().padStart(4, '0')}
                          </span>
                          {getStatusBadge(project.isVerified, project.status)}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${Number(project.currentAmount).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          of ${Number(project.targetAmount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No active projects</h3>
            <p className="mt-1 text-sm text-gray-500">
              Projects will appear here when they become active.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
