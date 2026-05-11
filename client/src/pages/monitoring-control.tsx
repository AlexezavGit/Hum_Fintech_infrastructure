import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Bot, Shield, TrendingUp, AlertTriangle, CheckCircle, Clock, Activity, Zap, Target, MessageSquare, FileText, BarChart3, Eye, Cpu, Blocks, ShieldCheck, Search, LayoutDashboard, Link2 } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function MonitoringControl() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [realTimeData, setRealTimeData] = useState({ anomaliesDetected: 3, transactionsProcessed: 1247, riskScore: 12.3, automationRate: 87.2 });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({ title: "Unauthorized", description: "You are logged out. Logging in again...", variant: "destructive" });
      setTimeout(() => { window.location.href = "/api/login"; }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({ anomaliesDetected: prev.anomaliesDetected + Math.floor(Math.random() * 2), transactionsProcessed: prev.transactionsProcessed + Math.floor(Math.random() * 10) + 5, riskScore: Math.max(0, prev.riskScore + (Math.random() - 0.5) * 2), automationRate: Math.min(100, Math.max(80, prev.automationRate + (Math.random() - 0.5) * 3)) }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const aiModules = [
    { id: "fraud-detection", name: "Fraud and Abuse Detection", status: "active", accuracy: 98.7, description: "Real-time transaction analysis for anomaly detection and suspicious activity identification in MHPSS funding", lastUpdate: "2 minutes ago", alerts: 3 },
    { id: "risk-prediction", name: "MHPSS Risk Prediction", status: "active", accuracy: 94.2, description: "ML models for financial risk forecasting and resource allocation optimization", lastUpdate: "5 minutes ago", alerts: 1 },
    { id: "automated-audit", name: "Automated Clinical Audit", status: "active", accuracy: 99.1, description: "AI-driven verification of clinical operations and mhGAP compliance reporting", lastUpdate: "1 minute ago", alerts: 0 },
    { id: "resource-optimization", name: "Resource Flow Optimization", status: "training", accuracy: 91.5, description: "Intelligent distribution system for psychological support resources based on real-time needs", lastUpdate: "10 minutes ago", alerts: 2 },
  ];

  const rpaAgents = [
    { id: "transaction-processor", name: "Order Processing Agent", status: "running", tasksCompleted: 1247, efficiency: 97.3, description: "Automated processing and verification of MHPSS digital orders and payments" },
    { id: "report-generator", name: "MHPSS Report Generator", status: "running", tasksCompleted: 89, efficiency: 95.8, description: "Automated generation of clinical reports and analytical documentation" },
    { id: "compliance-checker", name: "Regulatory Compliance Checker", status: "running", tasksCompleted: 342, efficiency: 98.9, description: "Automated verification of international clinical standards and data privacy" },
    { id: "support-chatbot", name: "Clinical Support Assistant", status: "running", tasksCompleted: 567, efficiency: 89.4, description: "AI assistant for MHPSS providers and beneficiary coordination" },
  ];

  const smartContracts = [
    { id: "co-financing", name: "Co-financing Smart Contract", status: "active", transactions: 423, volume: "1.2M SOL", verified: true },
    { id: "service-fee", name: "Service Fee Contract", status: "active", transactions: 892, volume: "0.5M SOL", verified: true },
  ];

  if (isLoading || !isAuthenticated) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50"><Header /><div className="flex"><Sidebar /><main className="flex-1 p-8"><div className="mb-8"><h1 className="text-2xl font-bold text-gray-900">Monitoring & Control</h1><p className="text-gray-600 mt-1">Integrated monitoring system combining AI/ML analytics and blockchain transparency.</p></div><Tabs defaultValue="ai-analytics" className="space-y-6"><TabsList className="grid w-full grid-cols-4"><TabsTrigger value="ai-analytics">AI / Automation</TabsTrigger><TabsTrigger value="blockchain">Blockchain Monitor</TabsTrigger><TabsTrigger value="anomalies">Anomalies</TabsTrigger><TabsTrigger value="nlp-interface">NLP Interface</TabsTrigger></TabsList><TabsContent value="ai-analytics"><div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-left"><Card><CardContent className="p-6"><div className="flex items-center justify-between"><div className="text-left"><p className="text-sm font-medium text-gray-600">Detected Anomalies</p><p className="text-2xl font-bold text-red-600">{realTimeData.anomaliesDetected}</p><div className="flex items-center mt-2"><Activity className="w-4 h-4 text-red-500 mr-1" /><span className="text-xs text-red-500">Real-time</span></div></div><AlertTriangle className="h-8 w-8 text-red-500" /></div></CardContent></Card><Card><CardContent className="p-6"><div className="flex items-center justify-between"><div className="text-left"><p className="text-sm font-medium text-gray-600">Processed Orders</p><p className="text-2xl font-bold text-blue-600">{realTimeData.transactionsProcessed.toLocaleString()}</p><div className="flex items-center mt-2"><TrendingUp className="w-4 h-4 text-green-500 mr-1" /><span className="text-xs text-green-500">+5.3% hourly</span></div></div><BarChart3 className="h-8 w-8 text-blue-500" /></div></CardContent></Card><Card><CardContent className="p-6"><div className="flex items-center justify-between"><div className="text-left"><p className="text-sm font-medium text-gray-600">Risk Score</p><p className="text-2xl font-bold text-yellow-600">{realTimeData.riskScore.toFixed(1)}%</p><div className="flex items-center mt-2"><Shield className="w-4 h-4 text-yellow-500 mr-1" /><span className="text-xs text-yellow-500">Moderate</span></div></div><Eye className="h-8 w-8 text-yellow-500" /></div></CardContent></Card><Card><CardContent className="p-6"><div className="flex items-center justify-between"><div className="text-left"><p className="text-sm font-medium text-gray-600">Automation Rate</p><p className="text-2xl font-bold text-green-600">{realTimeData.automationRate.toFixed(1)}%</p><div className="flex items-center mt-2"><Zap className="w-4 h-4 text-green-500 mr-1" /><span className="text-xs text-green-500">High efficiency</span></div></div><Bot className="h-8 w-8 text-green-500" /></div></CardContent></Card></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card><CardContent className="p-6"><h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Brain className="w-5 h-5" />AI Modules</h3><div className="space-y-4">{aiModules.map((module) => (<div key={module.id} className="border rounded-lg p-4"><div className="flex items-start justify-between mb-2"><div><h4 className="font-medium text-gray-900">{module.name}</h4><p className="text-sm text-gray-600">{module.description}</p></div><Badge className="bg-green-100 text-green-800">{module.status}</Badge></div><div className="flex items-center justify-between text-xs text-gray-500"><span>Accuracy: {module.accuracy}%</span><span>{module.lastUpdate}</span></div></div>))}</div></CardContent></Card><Card><CardContent className="p-6"><h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Cpu className="w-5 h-5" />Automation Agents</h3><div className="space-y-4">{rpaAgents.map((agent) => (<div key={agent.id} className="border rounded-lg p-4"><div className="flex items-start justify-between mb-2"><div><h4 className="font-medium text-gray-900">{agent.name}</h4><p className="text-sm text-gray-600">{agent.description}</p></div><Badge className="bg-blue-100 text-blue-800">{agent.status}</Badge></div><div className="text-xs text-gray-500">Tasks completed: {agent.tasksCompleted.toLocaleString()} · Efficiency: {agent.efficiency}%</div></div>))}</div></CardContent></Card></div></TabsContent><TabsContent value="blockchain"><div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><Card className="lg:col-span-2"><CardContent className="p-6"><h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Blocks className="w-5 h-5" />Blockchain Transparency</h3><div className="space-y-4">{smartContracts.map((contract) => (<div key={contract.id} className="border rounded-lg p-4"><div className="flex items-start justify-between mb-2"><div><h4 className="font-medium text-gray-900">{contract.name}</h4><p className="text-sm text-gray-600">{contract.transactions} transactions · {contract.volume}</p></div><Badge className="bg-green-100 text-green-800">{contract.status}</Badge></div>{contract.verified && <div className="flex items-center text-sm text-green-700"><ShieldCheck className="w-4 h-4 mr-1" />Verified on-chain</div>}</div>))}</div></CardContent></Card><Card><CardContent className="p-6"><h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Link2 className="w-5 h-5" />Control Signals</h3><div className="space-y-3 text-sm text-gray-600"><p>Open ledger verification for funding flows and program milestones.</p><p>Blockchain record cross-checks with provider reports and donor approvals.</p><p>Public accountability exports remain available for audit review.</p></div></CardContent></Card></div></TabsContent><TabsContent value="anomalies"><Alert><AlertTriangle className="h-4 w-4" /><AlertDescription>Three active anomalies require review in the transaction and reporting pipeline.</AlertDescription></Alert></TabsContent><TabsContent value="nlp-interface"><Card><CardContent className="p-6"><h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5" />Natural Language Control</h3><p className="text-sm text-gray-600">Ask for reports, audit summaries, or funding status using simple language.</p></CardContent></Card></TabsContent></Tabs></main></div></div>
  );
}
