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
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  MapPin, 
  Clock, 
  Target, 
  Heart,
  Shield,
  TrendingUp,
  FileText,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Project } from "@shared/schema";

export default function Programs() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: isAuthenticated,
  });

  // Showcase featured humanitarian programs based on Stream concept
  const featuredPrograms = [
    {
      id: "feel-again-zhytomyr",
      title: "MHPSS Support for 250 Adolescents - Zhytomyr Region",
      description: "Direct donor-funded program providing professional psychological care for adolescents in Zhytomyr region. Professionals can join this program to provide specialized services.",
      category: "Psychological Support",
      location: "Zhytomyr Region",
      targetAmount: 250000,
      currentAmount: 187500,
      beneficiaries: 250,
      status: "active",
      isVerified: true,
      objectives: [
        "Provide specialized trauma therapy",
        "Engage certified MHPSS providers",
        "Implement international clinical standards",
        "Ensure transparent funding distribution"
      ]
    },
    {
      id: "feel-again-kharkiv",
      title: "Crisis Intervention Program - Kharkiv Region",
      description: "Emergency psychological response for displaced families. This program facilitates coordination between corporate philanthropists and local MHPSS actors.",
      category: "Crisis Intervention",
      location: "Kharkiv Region",
      targetAmount: 500000,
      currentAmount: 342000,
      beneficiaries: 3200,
      status: "active",
      isVerified: true,
      objectives: [
        "Immediate crisis stabilization",
        "Mobile psychological teams",
        "Corporate co-financing integration",
        "mhGAP-compliant reporting"
      ]
    },
    {
      id: "feel-again-nationwide",
      title: "National Professional Coordination Network",
      description: "MHPSS digital coordination platform connecting humanitarian actors, private donors, and local funds for co-financing initiatives.",
      category: "Coordination",
      location: "Ukraine - Nationwide",
      targetAmount: 150000,
      currentAmount: 98000,
      beneficiaries: 850,
      status: "active",
      isVerified: true,
      objectives: [
        "NGO & Donor coordination",
        "MHPSS resource optimization",
        "Transparent co-financing scoring",
        "Joint planning with local funds"
      ]
    }
  ];

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Funding Programs</h1>
            <p className="text-gray-600 mt-1">
              Digital support for MHPSS programs with transparent tracking and coordination
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-left">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-600">Active Programs</p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                  <Heart className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-600">Engaged Actors</p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-600">Transparency</p>
                    <p className="text-2xl font-bold text-gray-900">98.5%</p>
                  </div>
                  <Shield className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-600">Efficiency</p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Programs */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended Programs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredPrograms.map((program) => {
                const progress = (program.currentAmount / program.targetAmount) * 100;
                
                return (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
                            {program.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {program.category}
                            </Badge>
                            {program.isVerified && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {program.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {program.location}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Funding Progress</span>
                            <span className="font-medium">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-900 font-medium">
                              ${program.currentAmount.toLocaleString()}
                            </span>
                            <span className="text-gray-600">
                              from ${program.targetAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-1" />
                            {program.beneficiaries.toLocaleString()} recipients
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            {program.status === "active" ? "Active" : "Completed"}
                          </Badge>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Objectives:</h4>
                          <ul className="space-y-1">
                            {program.objectives.slice(0, 2).map((objective, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-center">
                                <Target className="w-3 h-3 mr-1" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-secondary hover:bg-green-700 text-white">
                            Support
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Platform Benefits Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Feel Again Platform Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Digital Trust</h4>
                  <p className="text-sm text-gray-600">
                    Blockchain technologies ensure full transparency and immutability of all transactions
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Effort Coordination</h4>
                  <p className="text-sm text-gray-600">
                    Avoiding duplication and increasing efficiency through a unified coordination system
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Local Participation</h4>
                  <p className="text-sm text-gray-600">
                    Engaging local actors for maximum accuracy in aid targeting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-secondary bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Join the Feel Again Network
                  </h3>
                  <p className="text-gray-600">
                    Become part of a decentralized humanitarian response network
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button className="bg-secondary hover:bg-green-700 text-white">
                    Create Program
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}