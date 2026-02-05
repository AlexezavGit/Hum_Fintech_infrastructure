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
  Search,
  LayoutDashboard
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
              {/* Monitoring and Automation Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-left">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-600">Detected Anomalies</p>
                        <p className="text-2xl font-bold text-red-600">{realTimeData.anomaliesDetected}</p>
                        <div className="flex items-center mt-2">
                          <Activity className="w-4 h-4 text-red-500 mr-1" />
                          <span className="text-xs text-red-500">Real-time</span>
                        </div>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-600">Processed Orders</p>
                        <p className="text-2xl font-bold text-blue-600">{realTimeData.transactionsProcessed.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-500">+5.3% hourly</span>
                        </div>
                      </div>
                      <BarChart3 className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-600">Risk Score</p>
                        <p className="text-2xl font-bold text-yellow-600">{realTimeData.riskScore.toFixed(1)}%</p>
                        <div className="flex items-center mt-2">
                          <Shield className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-xs text-yellow-500">Moderate</span>
                        </div>
                      </div>
                      <Eye className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-600">Automation Rate</p>
                        <p className="text-2xl font-bold text-green-600">{realTimeData.automationRate.toFixed(1)}%</p>
                        <div className="flex items-center mt-2">
                          <Zap className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-500">High efficiency</span>
                        </div>
                      </div>
                      <Bot className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 text-left">
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
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {module.lastUpdate}
                          </div>
                          {module.alerts > 0 && (
                            <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                              {module.alerts} Alerts
                            </Badge>
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-2">
                          <Cpu className="w-4 h-4 mr-2" />
                          Configure Model
                        </Button>
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
                      <div className="flex items-center justify-between mb-4">
                        <Bot className="w-6 h-6 text-secondary" />
                        <Badge variant="outline" className="text-[10px] uppercase text-green-600 border-green-200">
                          {agent.status}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{agent.name}</h4>
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2">{agent.description}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Tasks Completed</span>
                          <span className="font-bold">{agent.tasksCompleted.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Efficiency</span>
                          <span>{agent.efficiency}%</span>
                        </div>
                        <Progress value={agent.efficiency} className="h-1" />
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
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">Transactions</p>
                            <p className="text-xl font-bold">{contract.transactions}</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">Volume</p>
                            <p className="text-xl font-bold">{contract.volume}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded-md">
                          <ShieldCheck className="w-4 h-4 mr-1" />
                          Solana Network Verified
                        </div>
                        <Button variant="outline" size="sm" className="w-full">View on Explorer</Button>
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
                    Detected Anomalies (Real-time Audit)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert variant="destructive" className="border-l-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Suspicious MHPSS Order Volume</span>
                            Unusual spike in adolescent support requests from single IP range in Zhytomyr region. 
                            <span className="block mt-1 text-xs opacity-80">Confidence: 94.2% | Severity: High</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-7 text-xs">Details</Button>
                            <Button size="sm" className="h-7 text-xs bg-red-600 hover:bg-red-700">Block</Button>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="bg-yellow-50 border-yellow-200 border-l-4 border-l-yellow-500">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800">
                         <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold block">Duplicate Service Fee Detection</span>
                            Potential double-billing detected for provider clinic ID #847. 
                            <span className="block mt-1 text-xs opacity-80">Investigation required | Confidence: 87.8%</span>
                          </div>
                          <Button size="sm" variant="outline" className="h-7 text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-100">Audit</Button>
                        </div>
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
                    Natural Language Interface (MHPSS Assistant)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <div className="flex items-center space-x-2 mb-4">
                      <LayoutDashboard className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-gray-700">Suggested Queries:</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      <button className="text-left p-2 text-xs bg-white hover:bg-gray-100 border rounded transition-colors">
                        "Show MHPSS co-financing status for Zhytomyr programs"
                      </button>
                      <button className="text-left p-2 text-xs bg-white hover:bg-gray-100 border rounded transition-colors">
                        "Generate risk report for adolescent support network"
                      </button>
                      <button className="text-left p-2 text-xs bg-white hover:bg-gray-100 border rounded transition-colors">
                        "Identify suspicious transactions in the last 24 hours"
                      </button>
                      <button className="text-left p-2 text-xs bg-white hover:bg-gray-100 border rounded transition-colors">
                        "Check provider clinic #847 clinical audit status"
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Ask the system in plain English..." 
                          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none bg-white text-sm"
                        />
                      </div>
                      <Button className="px-6 shadow-sm">Execute Query</Button>
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