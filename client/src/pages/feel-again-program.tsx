import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Heart, 
  Users, 
  ClipboardCheck, 
  Calendar,
  DollarSign,
  Shield,
  Bell,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  UserCheck,
  Activity,
  Target,
  Zap,
  RefreshCw,
  ArrowRight,
  Plus,
  Settings
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";

interface DigitalOrder {
  id: string;
  beneficiaryId: string;
  programId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  currentStep: number;
  totalSteps: number;
  diagnosisLevel: 'light' | 'medium' | 'severe' | null;
  sessionsPrescribed: number;
  sessionsCompleted: number;
  cofundingRequired: boolean;
  cofundingAmount: number;
  cofundingRaised: number;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
  notifications: any[];
  workflow: WorkflowStep[];
}

interface WorkflowStep {
  id: number;
  name: string;
  type: 'assessment' | 'diagnosis' | 'treatment' | 'payment' | 'notification';
  status: 'pending' | 'completed' | 'skipped';
  dueDate?: string;
  assignedTo?: string;
  requirements: string[];
  triggers: string[];
  notifications: NotificationConfig[];
}

interface NotificationConfig {
  recipient: 'beneficiary' | 'provider' | 'donor' | 'system';
  template: string;
  timing: 'immediate' | 'scheduled' | 'conditional';
  condition?: string;
}

export default function FeelAgainProgram() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [newBeneficiaryData, setNewBeneficiaryData] = useState({
    email: '',
    pseudonym: '',
    needsAssessment: false
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

  // Real-time metrics for Feel Again program
  const [programMetrics, setProgramMetrics] = useState({
    totalBeneficiaries: 2847,
    activeSessions: 156,
    completedRehabilitationCourses: 423,
    averageSessionRating: 4.7,
    cofundingSuccess: 89.3,
    kycVerificationRate: 97.8,
    providerSatisfaction: 4.6,
    averageRecoveryTime: 16.2 // weeks
  });

  // Sample digital orders for Feel Again program
  const [digitalOrders, setDigitalOrders] = useState<DigitalOrder[]>([
    {
      id: "FA-2024-001",
      beneficiaryId: "BEN-4857",
      programId: "feel-again",
      status: "active",
      currentStep: 4,
      totalSteps: 8,
      diagnosisLevel: "medium",
      sessionsPrescribed: 16,
      sessionsCompleted: 6,
      cofundingRequired: true,
      cofundingAmount: 2400,
      cofundingRaised: 1680,
      nextAction: "Підтвердити участь у 7-му сеансі терапії",
      createdAt: "2024-06-10T09:00:00Z",
      updatedAt: "2024-06-16T14:30:00Z",
      notifications: [
        {
          type: "session_reminder",
          message: "Нагадування про сеанс терапії завтра о 15:00",
          timestamp: "2024-06-16T10:00:00Z"
        }
      ],
      workflow: [
        {
          id: 1,
          name: "Реєстрація в програмі",
          type: "assessment",
          status: "completed",
          requirements: ["Email верифікація", "Псевдонім"],
          triggers: ["Користувач натиснув 'Почати оцінку'"],
          notifications: []
        },
        {
          id: 2,
          name: "Первинне тестування",
          type: "assessment", 
          status: "completed",
          requirements: ["Пройти онлайн-опитувальник"],
          triggers: ["Завершення реєстрації"],
          notifications: []
        },
        {
          id: 3,
          name: "Діагностичний сеанс",
          type: "diagnosis",
          status: "completed",
          assignedTo: "Dr. Олена Петренко",
          requirements: ["KYC верифікація", "Підтвердження часу"],
          triggers: ["Результат тестування: середній/важкий ступінь"],
          notifications: []
        },
        {
          id: 4,
          name: "Курс реабілітації (сеанс 7/16)",
          type: "treatment",
          status: "pending",
          assignedTo: "Dr. Олена Петренко",
          dueDate: "2024-06-17T15:00:00Z",
          requirements: ["Підтвердження участі", "Оплата за сеанс"],
          triggers: ["Затвердження діагнозу"],
          notifications: [
            {
              recipient: "beneficiary",
              template: "session_reminder",
              timing: "scheduled"
            }
          ]
        }
      ]
    },
    {
      id: "FA-2024-002", 
      beneficiaryId: "BEN-4891",
      programId: "feel-again",
      status: "pending",
      currentStep: 2,
      totalSteps: 8,
      diagnosisLevel: null,
      sessionsPrescribed: 0,
      sessionsCompleted: 0,
      cofundingRequired: false,
      cofundingAmount: 0,
      cofundingRaised: 0,
      nextAction: "Очікує підтвердження діагностичного сеансу",
      createdAt: "2024-06-15T11:20:00Z",
      updatedAt: "2024-06-16T09:15:00Z",
      notifications: [],
      workflow: [
        {
          id: 1,
          name: "Реєстрація в програмі",
          type: "assessment",
          status: "completed",
          requirements: ["Email верифікація", "Псевдонім"],
          triggers: [],
          notifications: []
        },
        {
          id: 2,
          name: "Первинне тестування",
          type: "assessment",
          status: "pending",
          requirements: ["Пройти онлайн-опитувальник"],
          triggers: ["Завершення реєстрації"],
          notifications: [
            {
              recipient: "beneficiary",
              template: "assessment_reminder",
              timing: "conditional",
              condition: "Якщо не завершено протягом 24 годин"
            }
          ]
        }
      ]
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgramMetrics(prev => ({
        ...prev,
        totalBeneficiaries: prev.totalBeneficiaries + Math.floor(Math.random() * 3),
        activeSessions: Math.max(0, prev.activeSessions + Math.floor(Math.random() * 4) - 2),
        averageSessionRating: Math.min(5, Math.max(4, prev.averageSessionRating + (Math.random() - 0.5) * 0.1)),
        cofundingSuccess: Math.min(100, Math.max(80, prev.cofundingSuccess + (Math.random() - 0.5) * 2))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const createNewBeneficiaryMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/feel-again/beneficiaries", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Успіх",
        description: "Новий бенефіціар зареєстрований в програмі Feel Again",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/feel-again/orders"] });
      setNewBeneficiaryData({ email: '', pseudonym: '', needsAssessment: false });
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
        title: "Помилка",
        description: "Не вдалося зареєструвати бенефіціара",
        variant: "destructive",
      });
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, action }: { orderId: string; action: string }) => {
      return apiRequest(`/api/feel-again/orders/${orderId}/actions`, {
        method: "POST",
        body: JSON.stringify({ action }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Успіх",
        description: "Статус ордера оновлено",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/feel-again/orders"] });
    },
    onError: (error) => {
      toast({
        title: "Помилка",
        description: "Не вдалося оновити статус ордера",
        variant: "destructive",
      });
    },
  });

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
            <h1 className="text-2xl font-bold text-gray-900">Feel Again - Програма Ментального Здоров'я</h1>
            <p className="text-gray-600 mt-1">
              Цифрове супроводження реабілітації з настроюваними ордерами та KYC верифікацією
            </p>
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Бенефіціарів</p>
                    <p className="text-2xl font-bold text-blue-600">{programMetrics.totalBeneficiaries.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <Users className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="text-xs text-blue-500">+{Math.floor(Math.random() * 5) + 1} сьогодні</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Активні Сеанси</p>
                    <p className="text-2xl font-bold text-green-600">{programMetrics.activeSessions}</p>
                    <div className="flex items-center mt-2">
                      <Activity className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">В реальному часі</span>
                    </div>
                  </div>
                  <Brain className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Успіх Співфінансування</p>
                    <p className="text-2xl font-bold text-purple-600">{programMetrics.cofundingSuccess.toFixed(1)}%</p>
                    <div className="flex items-center mt-2">
                      <DollarSign className="w-4 h-4 text-purple-500 mr-1" />
                      <span className="text-xs text-purple-500">Донори активні</span>
                    </div>
                  </div>
                  <Heart className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">KYC Верифікація</p>
                    <p className="text-2xl font-bold text-yellow-600">{programMetrics.kycVerificationRate.toFixed(1)}%</p>
                    <div className="flex items-center mt-2">
                      <Shield className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-xs text-yellow-500">Високий рівень</span>
                    </div>
                  </div>
                  <Shield className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="orders">Цифрові Ордери</TabsTrigger>
              <TabsTrigger value="onboarding">Онбординг Програм</TabsTrigger>
              <TabsTrigger value="kyc-system">KYC Система</TabsTrigger>
              <TabsTrigger value="scoring">Скорінг Співфінансування</TabsTrigger>
              <TabsTrigger value="crowdfunding">Краудфандинг</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Активні Цифрові Ордери</h3>
                  <Button
                    onClick={() => {
                      const newOrder: DigitalOrder = {
                        id: `FA-2024-${String(digitalOrders.length + 1).padStart(3, '0')}`,
                        beneficiaryId: `BEN-${Math.floor(Math.random() * 9000) + 1000}`,
                        programId: "feel-again",
                        status: "pending",
                        currentStep: 1,
                        totalSteps: 8,
                        diagnosisLevel: null,
                        sessionsPrescribed: 0,
                        sessionsCompleted: 0,
                        cofundingRequired: false,
                        cofundingAmount: 0,
                        cofundingRaised: 0,
                        nextAction: "Почати первинне тестування",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        notifications: [],
                        workflow: []
                      };
                      setDigitalOrders(prev => [newOrder, ...prev]);
                    }}
                    className="bg-secondary hover:bg-green-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Новий Ордер
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {digitalOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Ордер {order.id}</CardTitle>
                          <Badge className={
                            order.status === "active" ? "bg-green-100 text-green-800" :
                            order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            order.status === "completed" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }>
                            {order.status === "active" ? "Активний" :
                             order.status === "pending" ? "Очікує" :
                             order.status === "completed" ? "Завершено" : "Скасовано"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Бенефіціар:</span>
                            <span className="font-medium">{order.beneficiaryId}</span>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">Прогрес:</span>
                              <span className="font-medium">{order.currentStep}/{order.totalSteps}</span>
                            </div>
                            <Progress value={(order.currentStep / order.totalSteps) * 100} className="h-2" />
                          </div>

                          {order.diagnosisLevel && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Діагноз:</span>
                              <Badge className={
                                order.diagnosisLevel === "light" ? "bg-green-100 text-green-800" :
                                order.diagnosisLevel === "medium" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              }>
                                {order.diagnosisLevel === "light" ? "Легкий" :
                                 order.diagnosisLevel === "medium" ? "Середній" : "Важкий"}
                              </Badge>
                            </div>
                          )}

                          {order.sessionsPrescribed > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Сеанси:</span>
                              <span className="font-medium">{order.sessionsCompleted}/{order.sessionsPrescribed}</span>
                            </div>
                          )}

                          {order.cofundingRequired && (
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Співфінансування:</span>
                                <span className="font-medium">${order.cofundingRaised}/${order.cofundingAmount}</span>
                              </div>
                              <Progress value={(order.cofundingRaised / order.cofundingAmount) * 100} className="h-2" />
                            </div>
                          )}

                          <Alert>
                            <Clock className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Наступна дія:</strong> {order.nextAction}
                            </AlertDescription>
                          </Alert>

                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedOrder(order.id)}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Деталі
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => updateOrderStatusMutation.mutate({ 
                                orderId: order.id, 
                                action: "advance_step" 
                              })}
                              disabled={updateOrderStatusMutation.isPending}
                            >
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Наступний крок
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="onboarding">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary" />
                    Автоматичний Онбординг Нових Програм
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Alert>
                      <Zap className="h-4 w-4" />
                      <AlertDescription>
                        Система автоматично створює фронтенд та бекенд для нових гуманітарних програм 
                        на основі відповідей на питання та завантажених матеріалів.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Крок 1: Опис Програми</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Input placeholder="Назва програми" />
                            <Textarea placeholder="Детальний опис програми та її цілей" rows={4} />
                            <Input placeholder="Цільова аудиторія" />
                            <Input placeholder="Очікувані результати" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Крок 2: Модель Надання Допомоги</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Input placeholder="Тип послуг (консультації, матеріальна допомога, тощо)" />
                            <Input placeholder="Тривалість програми" />
                            <Input placeholder="Частота взаємодії з бенефіціарами" />
                            <Textarea placeholder="Протокол взаємодії та етапи надання допомоги" rows={4} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Крок 3: Налаштування Workflow</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Input placeholder="Кількість етапів у процесі" type="number" />
                            <Textarea placeholder="Умови переходу між етапами" rows={3} />
                            <Input placeholder="Час очікування між етапами (годин)" type="number" />
                            <Textarea placeholder="Тригери для сповіщень" rows={3} />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Крок 4: Медіа Матеріали</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Button variant="outline" className="w-full">
                              <Plus className="w-4 h-4 mr-2" />
                              Завантажити логотип програми
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Plus className="w-4 h-4 mr-2" />
                              Додати зображення для інтерфейсу
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Plus className="w-4 h-4 mr-2" />
                              Завантажити документи та форми
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Button className="w-full bg-primary hover:bg-blue-700 text-white py-3">
                      <Zap className="w-5 h-5 mr-2" />
                      Згенерувати Платформу для Програми
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kyc-system">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-500" />
                      Двохрівнева KYC Верифікація
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <UserCheck className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Рівень 1:</strong> Реєстрація з електронною адресою та псевдонімом
                        </AlertDescription>
                      </Alert>

                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Рівень 2:</strong> Повна KYC перевірка перед отриманням допомоги
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3">
                        <h4 className="font-medium">Статистика KYC:</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Рівень 1 верифікації:</span>
                            <span className="font-medium text-green-600">2,847 користувачів</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Рівень 2 верифікації:</span>
                            <span className="font-medium text-blue-600">1,892 користувачів</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Успішність верифікації:</span>
                            <span className="font-medium text-purple-600">97.8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-500" />
                      Деперсоніфікований Реєстр
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Персональні дані зберігаються в зашифрованому вигляді. В реєстрі зберігаються
                        лише підтвердження відповідності критеріям програми.
                      </p>

                      <div className="space-y-3">
                        <h4 className="font-medium">Записи в реєстрі:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 bg-gray-50 rounded">
                            <strong>Запис #FA-001:</strong> Особа відповідає критеріям віку та локації
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <strong>Запис #FA-002:</strong> Підтверджено наявність ментальної травми
                          </div>
                          <div className="p-2 bg-gray-50 rounded">
                            <strong>Запис #FA-003:</strong> Верифіковано фінансову потребу
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scoring">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-500" />
                    Скорінгова Система Співфінансування
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-gray-600">
                      Система оцінює виконуваність запитів на допомогу та прогнозований ефект, 
                      особливо для серійних послуг.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Критерії Оцінки</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span>Тяжкість діагнозу:</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Готовність до лікування:</span>
                              <span className="font-medium">20%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Соціальна підтримка:</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Фінансова потреба:</span>
                              <span className="font-medium">20%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Історія програми:</span>
                              <span className="font-medium">20%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Приклад Розрахунку</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="text-sm">
                              <strong>Бенефіціар:</strong> BEN-4857
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Діагноз:</span>
                                <Badge className="bg-yellow-100 text-yellow-800">22/25</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Готовність:</span>
                                <Badge className="bg-green-100 text-green-800">18/20</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Підтримка:</span>
                                <Badge className="bg-blue-100 text-blue-800">12/15</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Потреба:</span>
                                <Badge className="bg-purple-100 text-purple-800">19/20</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Історія:</span>
                                <Badge className="bg-gray-100 text-gray-800">0/20</Badge>
                              </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Загальний скор:</span>
                              <Badge className="bg-green-100 text-green-800">71/100</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Рекомендації</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 text-sm">
                            <Alert>
                              <CheckCircle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Високий пріоритет:</strong> Рекомендовано повне фінансування
                              </AlertDescription>
                            </Alert>
                            
                            <div className="space-y-2">
                              <p><strong>Прогноз успіху:</strong> 87%</p>
                              <p><strong>Оцінені сеанси:</strong> 16 (стандартний курс)</p>
                              <p><strong>Очікувана тривалість:</strong> 4 місяці</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crowdfunding">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      Персоніфіковані Краудфандинг Кампанії
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Бенефіціари можуть самостійно створювати кампанії з верифікацією потреби від виконавців.
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Активна Кампанія</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Терапія для Олександра</span>
                                <Badge className="bg-green-100 text-green-800">Верифіковано</Badge>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Прогрес:</span>
                                  <span className="font-medium">$1,680 / $2,400</span>
                                </div>
                                <Progress value={70} className="h-3" />
                              </div>

                              <div className="text-sm space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Донорів:</span>
                                  <span className="font-medium">23</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Середній внесок:</span>
                                  <span className="font-medium">$73</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Залишилось днів:</span>
                                  <span className="font-medium">12</span>
                                </div>
                              </div>

                              <Alert>
                                <Bell className="h-4 w-4" />
                                <AlertDescription>
                                  Потрібно ще $720 для досягнення цілі
                                </AlertDescription>
                              </Alert>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Автоматизація Процесу</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Створення спеціального рахунку</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Верифікація потреби від лікаря</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Підтвердження від оточення</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-yellow-500" />
                                <span>Очікування донорського співфінансування</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RefreshCw className="w-4 h-4 text-blue-500" />
                                <span>Поступове списання за сеанси</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MessageSquare className="w-4 h-4 text-purple-500" />
                                <span>Збір фідбеку після кожного сеансу</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Новий Бенефіціар - Швидка Реєстрація</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <Input 
                        placeholder="Email адреса"
                        value={newBeneficiaryData.email}
                        onChange={(e) => setNewBeneficiaryData(prev => ({ ...prev, email: e.target.value }))}
                      />
                      <Input 
                        placeholder="Псевдонім" 
                        value={newBeneficiaryData.pseudonym}
                        onChange={(e) => setNewBeneficiaryData(prev => ({ ...prev, pseudonym: e.target.value }))}
                      />
                      <Button 
                        onClick={() => createNewBeneficiaryMutation.mutate(newBeneficiaryData)}
                        disabled={createNewBeneficiaryMutation.isPending || !newBeneficiaryData.email || !newBeneficiaryData.pseudonym}
                        className="bg-secondary hover:bg-green-700 text-white"
                      >
                        {createNewBeneficiaryMutation.isPending ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4 mr-2" />
                        )}
                        Зареєструвати
                      </Button>
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