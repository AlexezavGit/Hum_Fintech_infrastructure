import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Project } from "@shared/schema";

export default function QuickDonate() {
  const [selectedAmount, setSelectedAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Get the first active project for quick donation
  const firstActiveProject = projects?.find(p => p.status === "active");

  const donationMutation = useMutation({
    mutationFn: async (amount: string) => {
      if (!firstActiveProject) {
        throw new Error("No active projects available");
      }
      
      await apiRequest("POST", "/api/donations", {
        projectId: firstActiveProject.id,
        amount,
        isAnonymous: false,
      });
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
      setSelectedAmount("50");
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

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(value);
  };

  const handleDonate = () => {
    const amount = customAmount || selectedAmount;
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    if (!firstActiveProject) {
      toast({
        title: "No Active Projects",
        description: "There are no active projects to donate to at the moment.",
        variant: "destructive",
      });
      return;
    }

    donationMutation.mutate(amount);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Quick Donation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {firstActiveProject && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900 line-clamp-1">
              {firstActiveProject.title}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {firstActiveProject.location}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2">
          {["25", "50", "100"].map((amount) => (
            <Button
              key={amount}
              variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
              size="sm"
              onClick={() => handleAmountSelect(amount)}
              className={selectedAmount === amount && !customAmount ? "bg-primary text-white" : ""}
            >
              ${amount}
            </Button>
          ))}
        </div>
        
        <div>
          <Input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Button 
          className="w-full bg-secondary hover:bg-green-700 text-white"
          onClick={handleDonate}
          disabled={donationMutation.isPending || !firstActiveProject}
        >
          {donationMutation.isPending ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            <>
              <Heart className="mr-2 h-4 w-4" />
              Donate Now
            </>
          )}
        </Button>
        
        {!firstActiveProject && (
          <p className="text-xs text-gray-500 text-center">
            No active projects available for quick donation
          </p>
        )}
      </CardContent>
    </Card>
  );
}
