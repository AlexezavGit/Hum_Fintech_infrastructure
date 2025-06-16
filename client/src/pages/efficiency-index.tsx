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
  TrendingUp, 
  Target, 
  DollarSign, 
  Clock, 
  Users,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  Calculator,
  Zap,
  CheckCircle,
  AlertTriangle,
  Globe,
  FileText,
  Eye
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function EfficiencyIndex() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  
  const [cieData, setCieData] = useState({
    overall: 87.4,
    financial: 92.1,
    operational: 84.7,
    impact: 89.3,
    transparency: 91.8,
    speed: 83.2,
    coverage: 88.6,
    sustainability: 85.9
  });

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    costPerBeneficiary: 142.50,
    deliveryTime: 4.2,
    transparencyScore: 91.8,
    donorSatisfaction: 94.3,
    beneficiaryReach: 12847,
    fundUtilization: 96.7,
    complianceRate: 98.9,
    partnershipIndex: 87.4
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

  // Real-time CIE calculation based on Grand Bargain commitments
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates for CIE calculation
      setRealTimeMetrics(prev => ({
        costPerBeneficiary: Math.max(100, prev.costPerBeneficiary + (Math.random() - 0.5) * 5),
        deliveryTime: Math.max(2, prev.deliveryTime + (Math.random() - 0.5) * 0.3),
        transparencyScore: Math.min(100, Math.max(80, prev.transparencyScore + (Math.random() - 0.5) * 2)),
        donorSatisfaction: Math.min(100, Math.max(80, prev.donorSatisfaction + (Math.random() - 0.5) * 1.5)),
        beneficiaryReach: prev.beneficiaryReach + Math.floor(Math.random() * 10),
        fundUtilization: Math.min(100, Math.max(85, prev.fundUtilization + (Math.random() - 0.5) * 1)),
        complianceRate: Math.min(100, Math.max(95, prev.complianceRate + (Math.random() - 0.5) * 0.5)),
        partnershipIndex: Math.min(100, Math.max(70, prev.partnershipIndex + (Math.random() - 0.5) * 2))
      }));

      // Recalculate CIE components
      setCieData(prev => {
        const financial = calculateFinancialEfficiency();
        const operational = calculateOperationalEfficiency();
        const impact = calculateImpactEfficiency();
        const transparency = calculateTransparencyEfficiency();
        const speed = calculateSpeedEfficiency();
        const coverage = calculateCoverageEfficiency();
        const sustainability = calculateSustainabilityEfficiency();
        
        const overall = (financial * 0.20 + operational * 0.15 + impact * 0.25 + 
                        transparency * 0.15 + speed * 0.10 + coverage * 0.10 + 
                        sustainability * 0.05);

        return {
          overall: Math.round(overall * 10) / 10,
          financial: Math.round(financial * 10) / 10,
          operational: Math.round(operational * 10) / 10,
          impact: Math.round(impact * 10) / 10,
          transparency: Math.round(transparency * 10) / 10,
          speed: Math.round(speed * 10) / 10,
          coverage: Math.round(coverage * 10) / 10,
          sustainability: Math.round(sustainability * 10) / 10
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeMetrics]);

  // Grand Bargain aligned efficiency calculations
  function calculateFinancialEfficiency() {
    const costEfficiency = Math.max(0, 100 - (realTimeMetrics.costPerBeneficiary - 100) * 0.5);
    const fundUtilization = realTimeMetrics.fundUtilization;
    return (costEfficiency * 0.6 + fundUtilization * 0.4);
  }

  function calculateOperationalEfficiency() {
    const deliverySpeed = Math.max(0, 100 - (realTimeMetrics.deliveryTime - 2) * 10);
    const complianceRate = realTimeMetrics.complianceRate;
    return (deliverySpeed * 0.7 + complianceRate * 0.3);
  }

  function calculateImpactEfficiency() {
    const reachScore = Math.min(100, (realTimeMetrics.beneficiaryReach / 15000) * 100);
    const satisfactionScore = realTimeMetrics.donorSatisfaction;
    return (reachScore * 0.6 + satisfactionScore * 0.4);
  }

  function calculateTransparencyEfficiency() {
    return realTimeMetrics.transparencyScore;
  }

  function calculateSpeedEfficiency() {
    return Math.max(0, 100 - (realTimeMetrics.deliveryTime - 2) * 15);
  }

  function calculateCoverageEfficiency() {
    const geographicCoverage = 88.6; // Based on regional distribution
    const demographicCoverage = Math.min(100, (realTimeMetrics.beneficiaryReach / 12000) * 100);
    return (geographicCoverage * 0.5 + demographicCoverage * 0.5);
  }

  function calculateSustainabilityEfficiency() {
    const partnershipStrength = realTimeMetrics.partnershipIndex;
    const capacityBuilding = 84.2; // Based on local partnership metrics
    return (partnershipStrength * 0.6 + capacityBuilding * 0.4);
  }

  const grandBargainCommitments = [
    {
      title: "Більше коштів для кінцевих отримувачів",
      target: 90,
      current: cieData.financial,
      description: "Зменшення адміністративних витрат та підвищення ефективності доставки"
    },
    {
      title: "Підвищення прозорості",
      target: 95,
      current: cieData.transparency,
      description: "Відкриті дані про фінансування та результати програм"
    },
    {
      title: "Зменшення дублювання",
      target: 85,
      current: cieData.operational,
      description: "Координація між гуманітарними акторами"
    },
    {
      title: "Локалізація допомоги",
      target: 80,
      current: cieData.sustainability,
      description: "Посилення ролі місцевих та національних акторів"
    }
  ];

  const efficiencyTrends = [
    { month: "Січ", cie: 85.2 },
    { month: "Лют", cie: 86.1 },
    { month: "Бер", cie: 87.8 },
    { month: "Кві", cie: 86.9 },
    { month: "Тра", cie: 88.3 },
    { month: "Чер", cie: 87.4 }
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
            <h1 className="text-2xl font-bold text-gray-900">Композитний Індекс Ефективності (CIE)</h1>
            <p className="text-gray-600 mt-1">
              Real-time розрахунок ефективності відповідно до Grand Bargain commitments
            </p>
          </div>

          {/* Overall CIE Score */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">CIE Score</h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-5xl font-bold text-primary">{cieData.overall}</span>
                    <div>
                      <Badge className="bg-green-100 text-green-800 mb-2">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +2.1 за місяць
                      </Badge>
                      <p className="text-sm text-gray-600">Високий рівень ефективності</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-32 h-32 relative">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - cieData.overall / 100)}`}
                        className="text-primary transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-700">{cieData.overall}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="components" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="components">CIE Компоненти</TabsTrigger>
              <TabsTrigger value="grand-bargain">Grand Bargain</TabsTrigger>
              <TabsTrigger value="real-time">Real-time Метрики</TabsTrigger>
              <TabsTrigger value="trends">Тренди</TabsTrigger>
            </TabsList>

            <TabsContent value="components">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                      Фінансова (20%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">{cieData.financial}</span>
                        <Badge className="bg-green-100 text-green-800">Відмінно</Badge>
                      </div>
                      <Progress value={cieData.financial} className="h-2" />
                      <div className="text-sm text-gray-600">
                        <div>Вартість на бенефіціара: ${realTimeMetrics.costPerBeneficiary.toFixed(2)}</div>
                        <div>Утилізація фондів: {realTimeMetrics.fundUtilization.toFixed(1)}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="w-5 h-5 mr-2 text-blue-500" />
                      Операційна (15%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">{cieData.operational}</span>
                        <Badge className="bg-blue-100 text-blue-800">Добре</Badge>
                      </div>
                      <Progress value={cieData.operational} className="h-2" />
                      <div className="text-sm text-gray-600">
                        <div>Час доставки: {realTimeMetrics.deliveryTime.toFixed(1)} днів</div>
                        <div>Комплаєнс: {realTimeMetrics.complianceRate.toFixed(1)}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Target className="w-5 h-5 mr-2 text-purple-500" />
                      Вплив (25%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">{cieData.impact}</span>
                        <Badge className="bg-purple-100 text-purple-800">Відмінно</Badge>
                      </div>
                      <Progress value={cieData.impact} className="h-2" />
                      <div className="text-sm text-gray-600">
                        <div>Охоплено: {realTimeMetrics.beneficiaryReach.toLocaleString()}</div>
                        <div>Задоволеність: {realTimeMetrics.donorSatisfaction.toFixed(1)}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="w-5 h-5 mr-2 text-yellow-500" />
                      Прозорість (15%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-yellow-600">{cieData.transparency}</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Відмінно</Badge>
                      </div>
                      <Progress value={cieData.transparency} className="h-2" />
                      <div className="text-sm text-gray-600">
                        <div>Blockchain верифікація: 98.7%</div>
                        <div>Відкритість даних: {realTimeMetrics.transparencyScore.toFixed(1)}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Zap className="w-5 h-5 mr-2 text-red-500" />
                      Швидкість (10%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-red-600">{cieData.speed}</span>
                        <Badge className="bg-red-100 text-red-800">Добре</Badge>
                      </div>
                      <Progress value={cieData.speed} className="h-2" />
                      <div className="text-sm text-gray-600">
                        <div>Середній час відгуку: {realTimeMetrics.deliveryTime.toFixed(1)}д</div>
                        <div>Швидкість обробки: 94.3%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Globe className="w-5 h-5 mr-2 text-indigo-500" />
                      Охоплення (10%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-indigo-600">{cieData.coverage}</span>
                        <Badge className="bg-indigo-100 text-indigo-800">Добре</Badge>
                      </div>
                      <Progress value={cieData.coverage} className="h-2" />
                      <div className="text-sm text-gray-600">
                        <div>Географічне: 88.6%</div>
                        <div>Демографічне: 87.2%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="w-5 h-5 mr-2 text-teal-500" />
                      Сталість (5%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-teal-600">{cieData.sustainability}</span>
                        <Badge className="bg-teal-100 text-teal-800">Добре</Badge>
                      </div>
                      <Progress value={cieData.sustainability} className="h-2" />
                      <div className="text-sm text-gray-600">
                        <div>Партнерства: {realTimeMetrics.partnershipIndex.toFixed(1)}%</div>
                        <div>Локалізація: 84.2%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Calculator className="w-5 h-5 mr-2 text-primary" />
                      CIE Формула
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="font-mono bg-gray-100 p-2 rounded text-xs">
                        CIE = (F×0.20) + (O×0.15) + (I×0.25) + (T×0.15) + (S×0.10) + (C×0.10) + (Su×0.05)
                      </div>
                      <div className="text-gray-600">
                        F=Фінансова, O=Операційна, I=Вплив, T=Прозорість, S=Швидкість, C=Охоплення, Su=Сталість
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="grand-bargain">
              <div className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Stream платформа реалізує ключові зобов'язання Grand Bargain для підвищення ефективності гуманітарного реагування
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {grandBargainCommitments.map((commitment, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{commitment.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">{commitment.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Прогрес до цілі</span>
                            <span className="font-medium">{commitment.current.toFixed(1)}% / {commitment.target}%</span>
                          </div>
                          
                          <Progress value={(commitment.current / commitment.target) * 100} className="h-3" />
                          
                          <div className="flex items-center justify-between">
                            <Badge className={
                              commitment.current >= commitment.target ? "bg-green-100 text-green-800" :
                              commitment.current >= commitment.target * 0.8 ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {commitment.current >= commitment.target ? "Досягнуто" :
                               commitment.current >= commitment.target * 0.8 ? "На шляху" : "Потребує уваги"}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {commitment.current >= commitment.target ? "100%" : 
                               `${((commitment.current / commitment.target) * 100).toFixed(1)}%`} виконання
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="real-time">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Вартість/Бенефіціар</p>
                        <p className="text-2xl font-bold text-green-600">${realTimeMetrics.costPerBeneficiary.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-500">Оптимізовано на 12%</span>
                        </div>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Час Доставки</p>
                        <p className="text-2xl font-bold text-blue-600">{realTimeMetrics.deliveryTime.toFixed(1)}д</p>
                        <div className="flex items-center mt-2">
                          <Clock className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-xs text-blue-500">В межах норми</span>
                        </div>
                      </div>
                      <Clock className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Охоплення</p>
                        <p className="text-2xl font-bold text-purple-600">{realTimeMetrics.beneficiaryReach.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                          <Users className="w-4 h-4 text-purple-500 mr-1" />
                          <span className="text-xs text-purple-500">+127 за день</span>
                        </div>
                      </div>
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Прозорість</p>
                        <p className="text-2xl font-bold text-yellow-600">{realTimeMetrics.transparencyScore.toFixed(1)}%</p>
                        <div className="flex items-center mt-2">
                          <Shield className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-xs text-yellow-500">Блокчейн верифіковано</span>
                        </div>
                      </div>
                      <Shield className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                    Тренди CIE (6 місяців)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {efficiencyTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-gray-700 w-12">{trend.month}</span>
                          <div className="flex-1">
                            <Progress value={trend.cie} className="h-2 w-32" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-primary">{trend.cie}</span>
                          {index > 0 && (
                            <Badge className={
                              trend.cie > efficiencyTrends[index - 1].cie ? 
                              "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }>
                              {trend.cie > efficiencyTrends[index - 1].cie ? "↗" : "↘"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
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