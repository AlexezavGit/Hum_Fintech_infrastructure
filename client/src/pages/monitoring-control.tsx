import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  Bot, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Zap,
  Target,
  MessageSquare,
  FileText,
  BarChart3,
  Eye,
  Cpu,
  Blocks,
  ShieldCheck,
  Search
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function MonitoringControl() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [realTimeData, setRealTimeData] = useState({
    anomaliesDetected: 3,
    transactionsProcessed: 1247,
    riskScore: 12.3,
    automationRate: 87.2
  });

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

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        anomaliesDetected: prev.anomaliesDetected + Math.floor(Math.random() * 2),
        transactionsProcessed: prev.transactionsProcessed + Math.floor(Math.random() * 10) + 5,
        riskScore: Math.max(0, prev.riskScore + (Math.random() - 0.5) * 2),
        automationRate: Math.min(100, Math.max(80, prev.automationRate + (Math.random() - 0.5) * 3))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const aiModules = [
    {
      id: "fraud-detection",
      name: "Fraud & Abuse Detection",
      status: "active",
      accuracy: 98.7,
      description: "Real-time transaction analysis for anomaly detection and suspicious activity identification in MHPSS funding",
      lastUpdate: "2 minutes ago",
      alerts: 3
    },
    {
      id: "risk-prediction",
      name: "MHPSS Risk Prediction",
      status: "active", 
      accuracy: 94.2,
      description: "ML models for financial risk forecasting and resource allocation optimization",
      lastUpdate: "5 minutes ago",
      alerts: 1
    },
    {
      id: "automated-audit",
      name: "Automated Clinical Audit",
      status: "active",
      accuracy: 99.1,
      description: "AI-driven verification of clinical operations and mhGAP compliance reporting",
      lastUpdate: "1 minute ago",
      alerts: 0
    },
    {
      id: "resource-optimization",
      name: "Resource Flow Optimization",
      status: "training",
      accuracy: 91.5,
      description: "Intelligent distribution system for psychological support resources based on real-time needs",
      lastUpdate: "10 minutes ago",
      alerts: 2
    }
  ];

  const rpaAgents = [
    {
      id: "transaction-processor",
      name: "Order Processing Agent",
      status: "running",
      tasksCompleted: 1247,
      efficiency: 97.3,
      description: "Automated processing and verification of MHPSS digital orders and payments"
    },
    {
      id: "report-generator",
      name: "MHPSS Report Generator",
      status: "running",
      tasksCompleted: 89,
      efficiency: 95.8,
      description: "Automated generation of clinical reports and analytical documentation"
    },
    {
      id: "compliance-checker",
      name: "Regulatory Compliance Checker",
      status: "running",
      tasksCompleted: 342,
      efficiency: 98.9,
      description: "Automated verification of international clinical standards and data privacy"
    },
    {
      id: "support-chatbot",
      name: "Clinical Support Assistant",
      status: "running",
      tasksCompleted: 567,
      efficiency: 89.4,
      description: "AI assistant for MHPSS providers and beneficiary coordination"
    }
  ];

  const smartContracts = [
    {
      id: "co-financing",
      name: "Co-financing Smart Contract",
      status: "active",
      transactions: 423,
      volume: "1.2M SOL",
      verified: true
    },
    {
      id: "service-fee",
      name: "Service Fee Contract",
      status: "active",
      transactions: 892,
      volume: "0.5M SOL",
      verified: true
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Monitoring & Control</h1>
            <p className="text-gray-600 mt-1">
              Integrated monitoring system combining AI/ML Analytics and Blockchain Transparency
            </p>
          </div>

          <Tabs defaultValue="ai-analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai-analytics">AI/ML & Automation</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain Monitor</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
              <TabsTrigger value="nlp-interface">NLP Interface</TabsTrigger>
            </TabsList>

            <TabsContent value="ai-analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {aiModules.map((module) => (
                  <Card key={module.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-lg">
                          <Brain className="w-5 h-5 mr-2 text-primary" />
                          {module.name}
                        </CardTitle>
                        <Badge variant={module.status === "active" ? "default" : "secondary"}>
                          {module.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Accuracy</span>
                          <span className="font-medium">{module.accuracy}%</span>
                        </div>
                        <Progress value={module.accuracy} className="h-1.5" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-4">RPA Intelligent Agents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rpaAgents.map((agent) => (
                  <Card key={agent.id}>
                    <CardContent className="pt-6">
                      <Bot className="w-6 h-6 text-secondary mb-2" />
                      <h4 className="font-medium text-sm mb-1">{agent.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Tasks: {agent.tasksCompleted}</span>
                        <Badge variant="outline" className="text-[10px] uppercase">{agent.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blockchain">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {smartContracts.map((contract) => (
                  <Card key={contract.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Blocks className="w-5 h-5 mr-2 text-indigo-600" />
                        {contract.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500">Transactions</p>
                            <p className="text-xl font-bold">{contract.transactions}</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500">Volume</p>
                            <p className="text-xl font-bold">{contract.volume}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                          <ShieldCheck className="w-4 h-4 mr-1" />
                          Solana Network Verified
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="anomalies">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    Detected Anomalies (Real-time)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Suspicious MHPSS Order Volume:</strong> Unusual spike in adolescent support requests from single IP range. Confidence: 94.2%
                      </AlertDescription>
                    </Alert>
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800">
                        <strong>Duplicate Service Fee:</strong> Potential double-billing detected for provider clinic ID #847. Investigation required.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nlp-interface">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    Natural Language Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-sm text-gray-500 mb-4 italic">
                      "Show me MHPSS co-financing status for Zhytomyr region programs with more than 50% funding gaps"
                    </p>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        placeholder="Ask the system in plain English..." 
                        className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                      />
                      <Button>Execute Query</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}