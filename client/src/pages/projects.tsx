import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({ title: "Unauthorized", description: "You are logged out. Logging in again...", variant: "destructive" });
      setTimeout(() => { window.location.href = "/api/login"; }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({ queryKey: ["/api/projects"], enabled: isAuthenticated });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food": return "bg-orange-100 text-orange-800";
      case "medical": return "bg-red-100 text-red-800";
      case "water": return "bg-blue-100 text-blue-800";
      case "education": return "bg-purple-100 text-purple-800";
      case "emergency": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading || !isAuthenticated) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects & Organizations</h1>
              <p className="text-gray-600 mt-1">Provider projects, donor coordination, and visible humanitarian requests.</p>
            </div>
            <Button className="bg-secondary hover:bg-green-700 text-white"><Plus className="w-4 h-4 mr-2" />Submit Project</Button>
          </div>
          <Card className="mb-8 bg-blue-50 border-blue-200"><CardContent className="p-4 flex items-center space-x-4"><Users className="w-6 h-6 text-primary" /><p className="text-sm text-gray-700">This section showcases MHPSS projects from certified organizations. Donors can identify specific opportunities to support provider capabilities and direct beneficiary pipelines.</p></CardContent></Card>
          {projectsLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">{[...Array(6)].map((_, i) => (<Card key={i} className="animate-pulse"><CardHeader><div className="h-4 bg-gray-300 rounded w-3/4"></div><div className="h-3 bg-gray-300 rounded w-1/2"></div></CardHeader><CardContent><div className="space-y-3"><div className="h-3 bg-gray-300 rounded"></div><div className="h-3 bg-gray-300 rounded w-5/6"></div><div className="h-2 bg-gray-300 rounded"></div></div></CardContent></Card>))}</div> : projects && projects.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">{projects.map((project) => { const progress = project.targetAmount > 0 ? (Number(project.currentAmount) / Number(project.targetAmount)) * 100 : 0; return (<Card key={project.id} className="hover:shadow-lg transition-shadow"><CardHeader><div className="flex items-start justify-between"><CardTitle className="text-lg font-semibold line-clamp-2">{project.title}</CardTitle><Badge className={getStatusColor(project.status)}>{project.status}</Badge></div><div className="flex items-center space-x-2"><Badge variant="outline" className={getCategoryColor(project.category)}>{project.category}</Badge>{project.isVerified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}</div></CardHeader><CardContent><p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p><div className="flex items-center text-sm text-gray-500 mb-3"><MapPin className="w-4 h-4 mr-1" />{project.location}</div><div className="space-y-3"><div className="flex justify-between text-sm"><span className="text-gray-600">Progress</span><span className="font-medium">{Math.round(progress)}%</span></div><Progress value={progress} className="h-2" /><div className="flex justify-between items-end"><div><p className="text-lg font-bold text-gray-900">${Number(project.currentAmount).toLocaleString()}</p><p className="text-sm text-gray-600">of ${Number(project.targetAmount).toLocaleString()}</p></div><Button size="sm" className="bg-primary hover:bg-blue-700 text-white"><ArrowRight className="w-4 h-4 mr-2" />Open</Button></div></div></CardContent></Card>); })}</div> : <div className="text-center py-12"><Users className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3><p className="mt-1 text-sm text-gray-500">Get started by creating your first humanitarian project.</p><div className="mt-6"><Button className="bg-secondary hover:bg-green-700 text-white"><Plus className="w-4 h-4 mr-2" />Create Project</Button></div></div>}
        </main>
      </div>
    </div>
  );
}
