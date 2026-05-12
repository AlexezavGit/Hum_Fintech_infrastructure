import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  Globe, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-year");
  const [selectedStandard, setSelectedStandard] = useState("grand-bargain");

  const { data: grandBargainReport, isLoading: isLoadingGB } = useQuery({
    queryKey: ["/api/reports/grand-bargain", selectedPeriod],
  });

  const { data: iatiReport, isLoading: isLoadingIATI } = useQuery({
    queryKey: ["/api/reports/iati", selectedPeriod],
  });

  const { data: complianceStatus } = useQuery({
    queryKey: ["/api/reports/compliance-status"],
  });

  const grandBargainCommitments = [
    {
      id: 1,
      title: "Greater Transparency",
      status: "compliant",
      progress: 94,
      description: "Public reporting on resource distribution",
      lastUpdate: "2024-12-15"
    },
    {
      id: 2,
      title: "More Support and Funding Tools for Local Actors",
      status: "in-progress",
      progress: 78,
      description: "Support for local organizations in Ukraine",
      lastUpdate: "2024-12-10"
    },
    {
      id: 3,
      title: "Increase Efficiency",
      status: "compliant",
      progress: 87,
      description: "Process optimization via the Feel Again platform",
      lastUpdate: "2024-12-14"
    },
    {
      id: 4,
      title: "Reduce Duplication",
      status: "compliant",
      progress: 91,
      description: "Coordination through a unified platform",
      lastUpdate: "2024-12-12"
    },
    {
      id: 5,
      title: "Improve Joint Needs Assessment",
      status: "compliant",
      progress: 89,
      description: "AI analytics for needs assessment",
      lastUpdate: "2024-12-13"
    }
  ];

  const iatiStandards = [
    {
      element: "Organisation Identifier",
      status: "compliant",
      description: "FEELAGAIN-UA-001",
      lastPublished: "2024-12-15"
    },
    {
      element: "Activity Identifier",
      status: "compliant", 
      description: "Unique IDs for all programs",
      lastPublished: "2024-12-15"
    },
    {
      element: "Financial Data",
      status: "compliant",
      description: "Automated publication of financial data",
      lastPublished: "2024-12-15"
    },
    {
      element: "Geographic Data",
      status: "compliant",
      description: "Regional coverage across Ukraine",
      lastPublished: "2024-12-15"
    },
    {
      element: "Results Data", 
      status: "in-progress",
      description: "Integration of performance indicators",
      lastPublished: "2024-12-10"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "non-compliant":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge variant="default" className="bg-green-100 text-green-800">Compliant</Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case "non-compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen blueprint-bg">
      <Header />
      <div className="flex">
      <Sidebar />
      <div className="flex-1 container mx-auto p-6 space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold teal-text">
              Reports & Standards
            </h1>
            <p className="text-[hsl(185,15%,55%)] mt-2">
              Automated reporting aligned with Grand Bargain and IATI standards
            </p>
          </div>
          
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="current-quarter">Current Quarter</SelectItem>
                <SelectItem value="current-year">Current Year</SelectItem>
                <SelectItem value="previous-year">Previous Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Grand Bargain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">88%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Compliance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                IATI Standard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Compliance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-600" />
                Auto-Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">156</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-600" />
                Last Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-orange-600">15.12.2024</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">IATI Registry</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Reports Tabs */}
        <Tabs defaultValue="grand-bargain" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grand-bargain">Grand Bargain</TabsTrigger>
            <TabsTrigger value="iati">IATI Standard</TabsTrigger>
            <TabsTrigger value="ukraine-specific">Ukraine-Specific</TabsTrigger>
          </TabsList>

          {/* Grand Bargain Tab */}
          <TabsContent value="grand-bargain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Grand Bargain Commitments Tracking
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tracking compliance with 5 key Grand Bargain commitments
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {grandBargainCommitments.map((commitment) => (
                    <div key={commitment.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(commitment.status)}
                          <h3 className="font-medium">{commitment.title}</h3>
                        </div>
                        {getStatusBadge(commitment.status)}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {commitment.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${commitment.progress}%` }}
                            />
                          </div>
                          <span className="font-medium">{commitment.progress}%</span>
                        </div>
                        <span className="text-gray-500">
                          Updated: {commitment.lastUpdate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IATI Tab */}
          <TabsContent value="iati" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  IATI Standard Compliance
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compliance with IATI standard elements for transparency
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {iatiStandards.map((standard, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(standard.status)}
                          <h3 className="font-medium">{standard.element}</h3>
                        </div>
                        {getStatusBadge(standard.status)}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {standard.description}
                      </p>
                      
                      <div className="text-xs text-gray-500">
                        Last updated: {standard.lastPublished}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automated IATI Registry Publication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Next Publication</h4>
                    <p className="text-2xl font-bold text-blue-600">31.12.2024</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quarterly report
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Active Programs</h4>
                    <p className="text-2xl font-bold text-green-600">47</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Included in reporting
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ukraine-Specific Tab */}
          <TabsContent value="ukraine-specific" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Ukraine-Specific Reporting
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Specialized reporting for the Ukrainian humanitarian context
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Regional Coverage</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Kyiv Oblast</span>
                        <span className="text-sm font-medium">23 programs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Kharkiv Oblast</span>
                        <span className="text-sm font-medium">18 programs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Odessa Oblast</span>
                        <span className="text-sm font-medium">12 programs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Lviv Oblast</span>
                        <span className="text-sm font-medium">8 programs</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Aid Categories</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Medical Aid</span>
                        <span className="text-sm font-medium">$2.1M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Psychological Support</span>
                        <span className="text-sm font-medium">$890K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Education Programs</span>
                        <span className="text-sm font-medium">$650K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Food Assistance</span>
                        <span className="text-sm font-medium">$1.4M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feel Again Program Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">2,850</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Beneficiaries</div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">89.3%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-purple-600">16.2</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Recovery Weeks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </div>
  );
}