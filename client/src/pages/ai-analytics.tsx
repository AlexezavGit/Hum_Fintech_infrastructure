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
  Cpu
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function AIAnalytics() {
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
      name: "Виявлення Шахрайства",
      status: "active",
      accuracy: 98.7,
      description: "Real-time аналіз транзакцій для виявлення аномалій та підозрілої активності",
      lastUpdate: "2 хвилини тому",
      alerts: 3
    },
    {
      id: "risk-prediction",
      name: "Прогнозування Ризиків",
      status: "active", 
      accuracy: 94.2,
      description: "ML-модель для прогнозування фінансових ризиків та оптимізації розподілу ресурсів",
      lastUpdate: "5 хвилин тому",
      alerts: 1
    },
    {
      id: "automated-audit",
      name: "Автоматизований Аудит",
      status: "active",
      accuracy: 99.1,
      description: "AI-система для автоматичної перевірки фінансових операцій та звітності",
      lastUpdate: "1 хвилина тому",
      alerts: 0
    },
    {
      id: "resource-optimization",
      name: "Оптимізація Ресурсів",
      status: "training",
      accuracy: 91.5,
      description: "Інтелектуальна система розподілу гуманітарних ресурсів на основі потреб",
      lastUpdate: "10 хвилин тому",
      alerts: 2
    }
  ];

  const rpaAgents = [
    {
      id: "transaction-processor",
      name: "Обробник Транзакцій",
      status: "running",
      tasksCompleted: 1247,
      efficiency: 97.3,
      description: "Автоматична обробка та верифікація фінансових транзакцій"
    },
    {
      id: "report-generator",
      name: "Генератор Звітів",
      status: "running",
      tasksCompleted: 89,
      efficiency: 95.8,
      description: "Автоматичне створення фінансових звітів та аналітичних документів"
    },
    {
      id: "compliance-checker",
      name: "Перевірник Комплаєнсу",
      status: "running",
      tasksCompleted: 342,
      efficiency: 98.9,
      description: "Автоматична перевірка відповідності регуляторним вимогам"
    },
    {
      id: "support-chatbot",
      name: "Чат-бот Підтримки",
      status: "running",
      tasksCompleted: 567,
      efficiency: 89.4,
      description: "Інтелектуальний помічник для користувачів платформи"
    }
  ];

  const anomalies = [
    {
      id: 1,
      type: "Підозріла транзакція",
      severity: "high",
      amount: "$15,420",
      description: "Незвичайно великий переказ з нової локації",
      timestamp: "14:23:15",
      confidence: 94.2
    },
    {
      id: 2,
      type: "Дублювання платежу",
      severity: "medium",
      amount: "$2,350",
      description: "Повторна транзакція протягом 5 хвилин",
      timestamp: "14:18:32",
      confidence: 87.8
    },
    {
      id: 3,
      type: "Невідповідність геолокації",
      severity: "low",
      amount: "$890",
      description: "Платіж з несподіваної географічної зони",
      timestamp: "14:12:47",
      confidence: 72.3
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
    <div className="min-h-screen blueprint-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold teal-text">AI / ML Analytics & Automation</h1>
            <p className="text-gray-600 mt-1">
              Intelligent monitoring and financial flow management system
            </p>
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Виявлено Аномалій</p>
                    <p className="text-2xl font-bold text-red-600">{realTimeData.anomaliesDetected}</p>
                    <div className="flex items-center mt-2">
                      <Activity className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-500">В реальному часі</span>
                    </div>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Оброблено Транзакцій</p>
                    <p className="text-2xl font-bold text-blue-600">{realTimeData.transactionsProcessed.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">+5.3% за годину</span>
                    </div>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Рівень Ризику</p>
                    <p className="text-2xl font-bold text-yellow-600">{realTimeData.riskScore.toFixed(1)}%</p>
                    <div className="flex items-center mt-2">
                      <Shield className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-xs text-yellow-500">Середній рівень</span>
                    </div>
                  </div>
                  <Eye className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Автоматизація</p>
                    <p className="text-2xl font-bold text-green-600">{realTimeData.automationRate.toFixed(1)}%</p>
                    <div className="flex items-center mt-2">
                      <Zap className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">Висока ефективність</span>
                    </div>
                  </div>
                  <Bot className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="ai-modules" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai-modules">AI Модулі</TabsTrigger>
              <TabsTrigger value="rpa-agents">RPA Агенти</TabsTrigger>
              <TabsTrigger value="anomalies">Аномалії</TabsTrigger>
              <TabsTrigger value="nlp-interface">NLP Інтерфейс</TabsTrigger>
            </TabsList>

            <TabsContent value="ai-modules">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiModules.map((module) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Brain className="w-5 h-5 mr-2 text-primary" />
                          {module.name}
                        </CardTitle>
                        <Badge className={
                          module.status === "active" ? "bg-green-100 text-green-800" :
                          module.status === "training" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }>
                          {module.status === "active" ? "Активний" :
                           module.status === "training" ? "Навчання" : "Неактивний"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Точність моделі</span>
                            <span className="font-medium">{module.accuracy}%</span>
                          </div>
                          <Progress value={module.accuracy} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {module.lastUpdate}
                          </div>
                          {module.alerts > 0 && (
                            <Badge variant="destructive">
                              {module.alerts} попереджень
                            </Badge>
                          )}
                        </div>

                        <Button size="sm" variant="outline" className="w-full">
                          <Cpu className="w-4 h-4 mr-2" />
                          Налаштування моделі
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rpa-agents">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rpaAgents.map((agent) => (
                  <Card key={agent.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Bot className="w-5 h-5 mr-2 text-secondary" />
                          {agent.name}
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-800">
                          {agent.status === "running" ? "Працює" : "Зупинено"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Завершено завдань</span>
                          <span className="text-sm font-medium">{agent.tasksCompleted.toLocaleString()}</span>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Ефективність</span>
                            <span className="font-medium">{agent.efficiency}%</span>
                          </div>
                          <Progress value={agent.efficiency} className="h-2" />
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Конфігурація
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Логи
                          </Button>
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
                    Виявлені Аномалії (Реальний час)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {anomalies.map((anomaly) => (
                      <Alert key={anomaly.id} className="border-l-4 border-l-red-500">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge className={
                                anomaly.severity === "high" ? "bg-red-100 text-red-800" :
                                anomaly.severity === "medium" ? "bg-yellow-100 text-yellow-800" :
                                "bg-blue-100 text-blue-800"
                              }>
                                {anomaly.type}
                              </Badge>
                              <span className="font-medium">{anomaly.amount}</span>
                            </div>
                            <div className="text-sm text-gray-500">{anomaly.timestamp}</div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{anomaly.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              Впевненість: {anomaly.confidence}%
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Деталі</Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                                Блокувати
                              </Button>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nlp-interface">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    Природно-мовний Інтерфейс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Alert>
                      <Bot className="h-4 w-4" />
                      <AlertDescription>
                        Використовуйте природну мову для взаємодії з платформою. 
                        Наприклад: "Покажи всі транзакції за останній тиждень більше ніж $10,000" 
                        або "Створи звіт по ризиках для України"
                      </AlertDescription>
                    </Alert>

                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center space-x-2 mb-4">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="font-medium">Приклади запитів:</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-white rounded border-l-4 border-l-blue-500">
                          "Які найбільші донації були сьогодні?"
                        </div>
                        <div className="p-2 bg-white rounded border-l-4 border-l-green-500">
                          "Покажи статистику по програмі AGAIN"
                        </div>
                        <div className="p-2 bg-white rounded border-l-4 border-l-yellow-500">
                          "Створи звіт по ефективності розподілу ресурсів"
                        </div>
                        <div className="p-2 bg-white rounded border-l-4 border-l-red-500">
                          "Є підозрілі транзакції в останні 24 години?"
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        placeholder="Введіть ваш запит..."
                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button className="px-6">
                        <Bot className="w-4 h-4 mr-2" />
                        Аналізувати
                      </Button>
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