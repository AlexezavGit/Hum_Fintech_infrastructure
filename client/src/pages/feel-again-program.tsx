import logoPath from "@assets/feel-again-dots_PNG_1768054419574.png";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Brain, 
  Users, 
  Shield, 
  Activity,
  CheckCircle,
  MessageSquare,
  ClipboardCheck,
  Building2,
  Stethoscope
} from "lucide-react";

export default function FeelAgainProgram() {
  const metrics = [
    { label: "Beneficiaries Supported", value: "2,847", icon: Users, color: "text-blue-600" },
    { label: "Active Professionals", value: "124", icon: Stethoscope, color: "text-green-600" },
    { label: "Recovery Rate", value: "68%", icon: Activity, color: "text-purple-600" },
    { label: "Verified Facilities", value: "32", icon: Building2, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen blueprint-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img src={logoPath} alt="Feel Again" className="h-12 w-12 object-contain" />
              <div>
                <h1 className="text-3xl font-bold teal-text">Feel Again</h1>
                <p className="text-[hsl(185,15%,55%)]">Professional MHPSS Ecosystem for Trauma Recovery</p>
              </div>
            </div>
            <Button size="lg" className="bg-primary hover:bg-blue-700 text-white">
              Apply for Support
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((m, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{m.label}</p>
                      <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                    </div>
                    <m.icon className={`h-8 w-8 ${m.color} opacity-20`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Program Overview</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-blue max-w-none">
                  <p>
                    <strong>Feel Again</strong> is a unified ecosystem providing dignified and equitable access to professional 
                    psychological care. We connect survivors of trauma with verified clinical facilities, NGOs, and 
                    private practitioners through a transparent, tech-enabled framework.
                  </p>
                  <h3>Key Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-900">mhGAP Standards</span>
                      </div>
                      <p className="text-sm text-gray-600">Automated clinical reporting based on international protocols for all specialists.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-900">Professional Support</span>
                      </div>
                      <p className="text-sm text-gray-600">Dignified guidance by trauma-informed specialists and peer-to-peer support.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ecosystem Partners</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Verified Clinical Facilities</p>
                      <p className="text-xs text-gray-500">Hospitals & specialized centers</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">NGOs & Sectoral Orgs</p>
                      <p className="text-xs text-gray-500">Humanitarian missions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
                    <Stethoscope className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Private Practice</p>
                      <p className="text-xs text-gray-500">Certified psychologists</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}