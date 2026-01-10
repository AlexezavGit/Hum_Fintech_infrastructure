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
  Blocks, 
  Shield, 
  CheckCircle, 
  Clock, 
  Activity,
  Link,
  Hash,
  Server,
  Zap,
  FileText,
  Eye,
  Lock,
  Globe,
  Database
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function BlockchainMonitor() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [networkStats, setNetworkStats] = useState({
    blockHeight: 2847392,
    hashRate: "187.3 TH/s",
    networkNodes: 47,
    totalTransactions: 15847,
    pendingTransactions: 23,
    averageBlockTime: 12.4
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

  // Simulate real-time blockchain updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 2),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 5) + 1,
        pendingTransactions: Math.max(0, prev.pendingTransactions + Math.floor(Math.random() * 4) - 2),
        averageBlockTime: Math.max(8, Math.min(20, prev.averageBlockTime + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const smartContracts = [
    {
      id: "co-financing-tracker",
      name: "Co-financing Smart Contract",
      address: "So1ana1111111111111111111111111111111111111",
      status: "active",
      deployedAt: "2026-01-05",
      interactions: 1847,
      gasUsed: "0.002 SOL",
      verified: true,
      description: "Automated tracking and distribution of psychological support funding with full transparency"
    },
    {
      id: "service-fee",
      name: "Service Fee / Fee-for-Service Contract",
      address: "So1ana2222222222222222222222222222222222222",
      status: "active",
      deployedAt: "2026-01-08",
      interactions: 956,
      gasUsed: "0.001 SOL",
      verified: true,
      description: "Managed payments for professional psychological services and trauma therapy"
    },
    {
      id: "mhgap-audit",
      name: "mhGAP Audit Trail Contract",
      address: "So1ana3333333333333333333333333333333333333",
      status: "active",
      deployedAt: "2026-01-10",
      interactions: 2341,
      gasUsed: "0.003 SOL",
      verified: true,
      description: "Immutable audit log of all clinical reporting based on mhGAP protocols"
    }
  ];

  const recentBlocks = [
    {
      height: networkStats.blockHeight,
      hash: "SolanaBlockHeight_2d4f8a9e1c3b7e5a8d2f4c9e7b1a5d8f3c6e9b2a",
      timestamp: "2 minutes ago",
      transactions: 47,
      gasUsed: "0.015 SOL",
      validator: "FeelAgain Validator 01"
    }
  ];

  const transactionPool = [
    {
      hash: "SolanaTx_4f8c2e5b9a1d7f3c6e0b4a8d2f5c9e7b1a4d8f",
      type: "MHPSS Payment",
      amount: "2.5 SOL",
      from: "Donor_3e8b...5f2a",
      to: "Psychologist_Clinic_A",
      fee: "0.000005 SOL",
      priority: "high"
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
            <h1 className="text-2xl font-bold text-gray-900">Blockchain Monitor</h1>
            <p className="text-gray-600 mt-1">
              Solana Network for Transparent MHPSS Support Ecosystem
            </p>
          </div>

          {/* Network Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Висота Блоку</p>
                    <p className="text-lg font-bold text-blue-600">{networkStats.blockHeight.toLocaleString()}</p>
                  </div>
                  <Blocks className="h-6 w-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Hash Rate</p>
                    <p className="text-lg font-bold text-green-600">{networkStats.hashRate}</p>
                  </div>
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Мережеві Вузли</p>
                    <p className="text-lg font-bold text-purple-600">{networkStats.networkNodes}</p>
                  </div>
                  <Server className="h-6 w-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Транзакції</p>
                    <p className="text-lg font-bold text-orange-600">{networkStats.totalTransactions.toLocaleString()}</p>
                  </div>
                  <Database className="h-6 w-6 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">В черзі</p>
                    <p className="text-lg font-bold text-red-600">{networkStats.pendingTransactions}</p>
                  </div>
                  <Clock className="h-6 w-6 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Час блоку</p>
                    <p className="text-lg font-bold text-indigo-600">{networkStats.averageBlockTime.toFixed(1)}s</p>
                  </div>
                  <Zap className="h-6 w-6 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="smart-contracts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="smart-contracts">Смарт-контракти</TabsTrigger>
              <TabsTrigger value="recent-blocks">Останні Блоки</TabsTrigger>
              <TabsTrigger value="transaction-pool">Пул Транзакцій</TabsTrigger>
              <TabsTrigger value="network-health">Здоров'я Мережі</TabsTrigger>
            </TabsList>

            <TabsContent value="smart-contracts">
              <div className="space-y-6">
                {smartContracts.map((contract) => (
                  <Card key={contract.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-primary" />
                          {contract.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">
                            {contract.status === "active" ? "Активний" : "Неактивний"}
                          </Badge>
                          {contract.verified && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Верифіковано
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">{contract.description}</p>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Адреса:</span>
                            <div className="font-mono text-xs break-all">{contract.address}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Розгорнуто:</span>
                            <div className="font-medium">{contract.deployedAt}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Взаємодії:</span>
                            <div className="font-medium">{contract.interactions.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Gas використано:</span>
                            <div className="font-medium">{contract.gasUsed}</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Переглянути код
                          </Button>
                          <Button size="sm" variant="outline">
                            <Activity className="w-4 h-4 mr-2" />
                            Транзакції
                          </Button>
                          <Button size="sm" variant="outline">
                            <Link className="w-4 h-4 mr-2" />
                            Explorer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent-blocks">
              <div className="space-y-4">
                {recentBlocks.map((block) => (
                  <Card key={block.height}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                            <Blocks className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Блок #{block.height.toLocaleString()}</h3>
                            <p className="text-sm text-gray-600 font-mono">{block.hash}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{block.timestamp}</p>
                          <p className="text-sm font-medium">{block.validator}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t text-sm">
                        <div>
                          <span className="text-gray-600">Транзакції:</span>
                          <span className="ml-2 font-medium">{block.transactions}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Gas використано:</span>
                          <span className="ml-2 font-medium">{block.gasUsed}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Hash className="w-4 h-4 mr-2" />
                            Деталі
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transaction-pool">
              <div className="space-y-4">
                {transactionPool.map((tx) => (
                  <Card key={tx.hash}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            tx.type === "Donation" ? "bg-green-100 text-green-800" :
                            tx.type === "Resource Transfer" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }>
                            {tx.type}
                          </Badge>
                          <Badge className={
                            tx.priority === "high" ? "bg-red-100 text-red-800" :
                            tx.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }>
                            {tx.priority === "high" ? "Високий" : 
                             tx.priority === "medium" ? "Середній" : "Низький"} пріоритет
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Fee: {tx.fee}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-mono text-sm text-gray-600">{tx.hash}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-gray-600">Від:</span>
                            <span className="ml-2 font-medium">{tx.from}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">До:</span>
                            <span className="ml-2 font-medium">{tx.to}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Сума:</span>
                            <span className="ml-2 font-medium text-green-600">{tx.amount}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="network-health">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-500" />
                      Безпека Мережі
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Консенсус</span>
                          <span className="font-medium text-green-600">100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Активні валідатори</span>
                          <span className="font-medium">47 з 50</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Синхронізація</span>
                          <span className="font-medium text-green-600">98.7%</span>
                        </div>
                        <Progress value={98.7} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-blue-500" />
                      Географічний Розподіл
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Україна</span>
                        <span className="font-medium">32 вузли</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Європа</span>
                        <span className="font-medium">8 вузлів</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Америка</span>
                        <span className="font-medium">5 вузлів</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Азія</span>
                        <span className="font-medium">2 вузли</span>
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