import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, CreditCard, Shield, Search } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import type { Project } from "@shared/schema";

export default function Donate() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [utilizationSearch, setUtilizationSearch] = useState("");

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

  const donationMutation = useMutation({
    mutationFn: async (donationData: {
      projectId: number;
      amount: string;
      message?: string;
      isAnonymous: boolean;
    }) => {
      await apiRequest("POST", "/api/donations", donationData);
    },
    onSuccess: () => {
      toast({
        title: "Donation Successful",
        description: "Your donation has been processed and is being tracked on blockchain.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      
      // Reset form
      setSelectedProject(null);
      setAmount("");
      setMessage("");
      setIsAnonymous(false);
      setCustomAmount("");
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Donation Failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleQuickAmount = (value: string) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setAmount(value);
  };

  const handleDonate = () => {
    if (!selectedProject || !amount || Number(amount) <= 0) {
      toast({
        title: "Invalid Donation",
        description: "Please select a project and enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    donationMutation.mutate({
      projectId: selectedProject,
      amount,
      message: message || undefined,
      isAnonymous,
    });
  };

  const handleUtilizationSearch = () => {
    toast({
      title: "Search Initiated",
      description: `Checking utilization for ID: ${utilizationSearch}. Our system is processing your depersonalized request.`,
    });
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeProjects = projects?.filter(p => p.status === "active") || [];
  const selectedProjectData = activeProjects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen blueprint-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold teal-text">Support Professional Care</h1>
            <p className="text-[hsl(185,15%,55%)] mt-1">Direct support for MHPSS initiatives with transparent tracking</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Selection */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Select a Project or Clinic</CardTitle>
                </CardHeader>
                <CardContent>
                  {projectsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse border rounded-lg p-4">
                          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2 mb-3"></div>
                          <div className="h-2 bg-gray-300 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : activeProjects.length > 0 ? (
                    <div className="space-y-4">
                      {activeProjects.map((project) => {
                        const progress = project.targetAmount > 0 
                          ? (Number(project.currentAmount) / Number(project.targetAmount)) * 100 
                          : 0;

                        return (
                          <div
                            key={project.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              selectedProject === project.id
                                ? "border-primary bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedProject(project.id)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{project.location}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {project.category}
                                </Badge>
                                {project.isVerified && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    Verified Clinic
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {project.description}
                            </p>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Funding Progress</span>
                                <span className="font-medium">{Math.round(progress)}%</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-900 font-medium">
                                  ${(typeof project.currentAmount === 'string' ? parseFloat(project.currentAmount) : project.currentAmount).toLocaleString()}
                                </span>
                                <span className="text-gray-600">
                                  of ${(typeof project.targetAmount === 'string' ? parseFloat(project.targetAmount) : project.targetAmount).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No active MHPSS programs</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        There are currently no active programs accepting support.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Utilization Search Feature */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="w-5 h-5 mr-2 text-primary" />
                    Track Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Search for your donation utilization. You can also submit a depersonalized request for assistance or feedback if the system report was unsatisfactory.
                  </p>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter Donation or Request ID" 
                      value={utilizationSearch}
                      onChange={(e) => setUtilizationSearch(e.target.value)}
                    />
                    <Button onClick={handleUtilizationSearch}>
                      Track Impact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Support Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-primary" />
                    Support Amount
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedProjectData && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        Supporting: {selectedProjectData.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {selectedProjectData.location}
                      </p>
                    </div>
                  )}

                  {/* Quick Amount Selection */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Quick Amount</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {["25", "50", "100"].map((value) => (
                        <Button
                          key={value}
                          variant={amount === value ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleQuickAmount(value)}
                          className={amount === value ? "bg-primary text-white" : ""}
                        >
                          ${value}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <Label htmlFor="custom-amount" className="text-sm font-medium text-gray-700">
                      Custom Amount
                    </Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Leave a message of support..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  {/* Anonymous Support */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={isAnonymous}
                      onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                    />
                    <Label htmlFor="anonymous" className="text-sm text-gray-700">
                      Make this support anonymous
                    </Label>
                  </div>

                  {/* Security Notice */}
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center text-green-800 text-sm">
                      <Shield className="w-4 h-4 mr-2" />
                      <span className="font-medium">Solana Protected</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Co-financing tracked via Solana smart contracts for complete transparency
                    </p>
                  </div>

                  {/* Support Button */}
                  <Button
                    onClick={handleDonate}
                    disabled={!selectedProject || !amount || Number(amount) <= 0 || donationMutation.isPending}
                    className="w-full bg-secondary hover:bg-green-700 text-white"
                  >
                    {donationMutation.isPending ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Support ${amount || "0"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
