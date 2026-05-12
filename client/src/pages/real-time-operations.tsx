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
  Activity, 
  Zap, 
  Users, 
  DollarSign, 
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Globe,
  Shield,
  Bot,
  MessageSquare,
  FileText,
  Database
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function RealTimeOperations() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  
  const [streamingData, setStreamingData] = useState({
    activeDonations: 47,
    resourcesInTransit: 23,
    beneficiariesServed: 1247,
    alertsActive: 3,
    systemLoad: 68.4,
    networkLatency: 45
  });

  const [eventStream, setEventStream] = useState([
    {
      id: 1,
      timestamp: "12:57:32",
      type: "donation",
      source: "Payment Gateway",
      description: "Новий донат $2,450 від анонімного донора",
      status: "processing",
      priority: "high"
    },
    {
      id: 2,
      timestamp: "12:57:28",
      type: "distribution",
      source: "Warehouse Kyiv",
      description: "Відправлено 50 продуктових наборів до Харкова",
      status: "completed",
      priority: "medium"
    },
    {
      id: 3,
      timestamp: "12:57:15",
      type: "verification",
      source: "AI Compliance",
      description: "Автоматична перевірка транзакції 0x4f8c2e5b завершена",
      status: "verified",
      priority: "low"
    }
  ]);

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

  // Simulate real-time event streaming
  useEffect(() => {
    const interval = setInterval(() => {
      const eventTypes = ["donation", "distribution", "verification", "alert", "beneficiary"];
      const sources = ["Payment Gateway", "Warehouse Kyiv", "AI Compliance", "Field Office", "Mobile App"];
      const statuses = ["processing", "completed", "verified", "pending", "failed"];
      const priorities = ["high", "medium", "low"];
      
      const newEvent = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("uk-UA"),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        description: generateEventDescription(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)]
      };

      setEventStream(prev => [newEvent, ...prev.slice(0, 19)]);
      
      setStreamingData(prev => ({
        activeDonations: prev.activeDonations + Math.floor(Math.random() * 3) - 1,
        resourcesInTransit: Math.max(0, prev.resourcesInTransit + Math.floor(Math.random() * 4) - 2),
        beneficiariesServed: prev.beneficiariesServed + Math.floor(Math.random() * 2),
        alertsActive: Math.max(0, prev.alertsActive + Math.floor(Math.random() * 3) - 1),
        systemLoad: Math.max(20, Math.min(95, prev.systemLoad + (Math.random() - 0.5) * 10)),
        networkLatency: Math.max(10, Math.min(200, prev.networkLatency + (Math.random() - 0.5) * 20))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function generateEventDescription() {
    const descriptions = [
      "Новий донат надійшов від корпоративного донора",
      "Автоматична верифікація бенефіціара завершена",
      "Розподіл ресурсів оптимізовано AI системою",
      "Блокчейн транзакція підтверджена валідаторами",
      "Геолокаційна перевірка доставки пройшла успішно",
      "Smart contract виконав автоматичний платіж",
      "Система виявила підозрілу активність",
      "Мобільний додаток зареєстрував нового користувача"
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  const erpModules = [
    {
      name: "Бухгалтерський модуль",
      status: "active",
      health: 98.7,
      lastUpdate: "2 хв тому",
      transactions: 1247,
      description: "Автоматизований облік фінансових операцій та звітність"
    },
    {
      name: "Платіжний модуль",
      status: "active", 
      health: 99.2,
      lastUpdate: "30 сек тому",
      transactions: 89,
      description: "Інтеграція з банками та платіжними системами"
    },
    {
      name: "Аналітичний модуль",
      status: "active",
      health: 96.8,
      lastUpdate: "1 хв тому",
      transactions: 342,
      description: "BI платформа для аналізу ефективності програм"
    },
    {
      name: "Комплаєнс модуль",
      status: "active",
      health: 99.8,
      lastUpdate: "45 сек тому",
      transactions: 156,
      description: "Автоматична перевірка відповідності регуляторним вимогам"
    }
  ];

  const streamingMetrics = [
    { label: "Events/sec", value: "47.3", trend: "+12%" },
    { label: "Processing Latency", value: `${streamingData.networkLatency}ms`, trend: "-8%" },
    { label: "Throughput", value: "2.4MB/s", trend: "+23%" },
    { label: "Error Rate", value: "0.02%", trend: "-67%" }
  ];

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen blueprint-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold teal-text">Real-Time Operations Center</h1>
            <p className="text-gray-600 mt-1">
              Apache Kafka/Flink streaming for real-time operational monitoring and response
            </p>
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Активні Донації</p>
                    <p className="text-lg font-bold text-green-600">{streamingData.activeDonations}</p>
                  </div>
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Ресурси в дорозі</p>
                    <p className="text-lg font-bold text-blue-600">{streamingData.resourcesInTransit}</p>
                  </div>
                  <Package className="h-6 w-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Обслужено</p>
                    <p className="text-lg font-bold text-purple-600">{streamingData.beneficiariesServed.toLocaleString()}</p>
                  </div>
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Активні Алерти</p>
                    <p className="text-lg font-bold text-red-600">{streamingData.alertsActive}</p>
                  </div>
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Навантаження</p>
                    <p className="text-lg font-bold text-yellow-600">{streamingData.systemLoad.toFixed(1)}%</p>
                  </div>
                  <Activity className="h-6 w-6 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Latency</p>
                    <p className="text-lg font-bold text-indigo-600">{streamingData.networkLatency.toFixed(0)}ms</p>
                  </div>
                  <Zap className="h-6 w-6 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="event-stream" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="event-stream">Event Stream</TabsTrigger>
              <TabsTrigger value="erp-modules">ERP Модулі</TabsTrigger>
              <TabsTrigger value="streaming-analytics">Streaming Analytics</TabsTrigger>
              <TabsTrigger value="system-health">System Health</TabsTrigger>
            </TabsList>

            <TabsContent value="event-stream">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-500" />
                    Live Event Stream
                    <Badge className="ml-2 bg-green-100 text-green-800">Real-time</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {eventStream.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            event.type === "donation" ? "bg-green-500" :
                            event.type === "distribution" ? "bg-blue-500" :
                            event.type === "verification" ? "bg-yellow-500" :
                            event.type === "alert" ? "bg-red-500" :
                            "bg-gray-500"
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{event.description}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <span>{event.timestamp}</span>
                              <span>•</span>
                              <span>{event.source}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            event.status === "completed" ? "bg-green-100 text-green-800" :
                            event.status === "processing" ? "bg-yellow-100 text-yellow-800" :
                            event.status === "verified" ? "bg-blue-100 text-blue-800" :
                            event.status === "failed" ? "bg-red-100 text-red-800" :
                            "bg-gray-100 text-gray-800"
                          }>
                            {event.status}
                          </Badge>
                          <Badge variant="outline" className={
                            event.priority === "high" ? "border-red-500 text-red-600" :
                            event.priority === "medium" ? "border-yellow-500 text-yellow-600" :
                            "border-gray-500 text-gray-600"
                          }>
                            {event.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="erp-modules">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {erpModules.map((module, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Database className="w-5 h-5 mr-2 text-primary" />
                          {module.name}
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-800">
                          {module.status === "active" ? "Активний" : "Неактивний"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Здоров'я системи</span>
                            <span className="font-medium">{module.health}%</span>
                          </div>
                          <Progress value={module.health} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Останнє оновлення:</span>
                            <p className="font-medium">{module.lastUpdate}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Транзакції:</span>
                            <p className="font-medium">{module.transactions.toLocaleString()}</p>
                          </div>
                        </div>

                        <Button size="sm" variant="outline" className="w-full">
                          <FileText className="w-4 h-4 mr-2" />
                          Деталі модуля
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="streaming-analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                      Streaming Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {streamingMetrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{metric.label}</p>
                            <p className="text-lg font-semibold">{metric.value}</p>
                          </div>
                          <Badge className={
                            metric.trend.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }>
                            {metric.trend}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-green-500" />
                      Apache Kafka Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span>humanitarian.donations</span>
                        <Badge className="bg-green-100 text-green-800">47 msg/s</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>logistics.distribution</span>
                        <Badge className="bg-blue-100 text-blue-800">23 msg/s</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>compliance.verification</span>
                        <Badge className="bg-yellow-100 text-yellow-800">12 msg/s</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>blockchain.transactions</span>
                        <Badge className="bg-purple-100 text-purple-800">8 msg/s</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system-health">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-500" />
                      Інфраструктура
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">CPU Utilization</span>
                          <span className="font-medium">{streamingData.systemLoad.toFixed(1)}%</span>
                        </div>
                        <Progress value={streamingData.systemLoad} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Memory Usage</span>
                          <span className="font-medium">74.2%</span>
                        </div>
                        <Progress value={74.2} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Disk I/O</span>
                          <span className="font-medium">42.8%</span>
                        </div>
                        <Progress value={42.8} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-blue-500" />
                      AI/ML Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Fraud Detection</span>
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Risk Prediction</span>
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Resource Optimization</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Training</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>NLP Interface</span>
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-purple-500" />
                      Integration APIs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Payment Gateway</span>
                        <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Banking APIs</span>
                        <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Blockchain RPC</span>
                        <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Mobile App API</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}