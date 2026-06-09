import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, MapPin, Target, Heart, Shield, TrendingUp, FileText, ChevronRight, ExternalLink, CheckCircle2, Clock3 } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Project } from "@shared/schema";

export default function Programs() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({ title: "Unauthorized", description: "You are logged out. Logging in again...", variant: "destructive" });
      setTimeout(() => { window.location.href = "/api/login"; }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({ queryKey: ["/api/projects"], enabled: isAuthenticated });

  const featuredPrograms = [
    {
      id: "feel-again-zhytomyr",
      title: "MHPSS Support for 250 Adolescents - Zhytomyr Region",
      description: "Donor-funded program providing professional psychological care for adolescents in Zhytomyr region. Providers can join the network and deliver specialized services.",
      category: "Psychological Support",
      location: "Zhytomyr Region",
      targetAmount: 250000,
      currentAmount: 187500,
      beneficiaries: 250,
      status: "active",
      isVerified: true,
      objectives: ["Provide specialized trauma therapy", "Engage certified MHPSS providers", "Implement international clinical standards", "Ensure transparent funding distribution"],
    },
    {
      id: "feel-again-kharkiv",
      title: "Crisis Intervention Program - Kharkiv Region",
      description: "Emergency psychological response for displaced families. This program coordinates donors, providers, and local partners.",
      category: "Crisis Intervention",
      location: "Kharkiv Region",
      targetAmount: 500000,
      currentAmount: 342000,
      beneficiaries: 3200,
      status: "active",
      isVerified: true,
      objectives: ["Immediate crisis stabilization", "Mobile psychological teams", "Co-financing integration", "mhGAP-compliant reporting"],
    },
    {
      id: "feel-again-nationwide",
      title: "National Professional Coordination Network",
      description: "Digital coordination platform connecting humanitarian actors, private donors, and local funds for co-financing initiatives.",
      category: "Coordination",
      location: "Ukraine - Nationwide",
      targetAmount: 150000,
      currentAmount: 98000,
      beneficiaries: 850,
      status: "active",
      isVerified: true,
      objectives: ["NGO and donor coordination", "MHPSS resource optimization", "Transparent co-financing scoring", "Joint planning with local funds"],
    },
  ];

  if (isLoading || !isAuthenticated) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen blueprint-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold teal-text">Impact Financing Hub</h1>
            <p className="text-[hsl(185,15%,55%)] mt-1">MHPSS coordination programs with transparent tracking, donor matching, and provider participation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-left">
            <Card className="border-[hsla(185,30%,20%,0.5)] bg-[hsl(195,45%,11%)]"><CardContent className="p-6"><div className="flex items-center justify-between"><div className="text-left"><p className="text-sm font-medium text-[hsl(185,15%,55%)]">Active Programs</p><p className="text-2xl font-bold text-[hsl(185,20%,90%)]">47</p></div><Heart className="h-8 w-8 text-[hsl(43,96%,56%)]" /></div></CardContent></Card>
            <Card className="border-[hsla(185,30%,20%,0.5)] bg-[hsl(195,45%,11%)]"><CardContent className="p-6"><div className="flex items-center justify-between"><div className="text-left"><p className="text-sm font-medium text-[hsl(185,15%,55%)]">Engaged Actors</p><p className="text-2xl font-bold text-[hsl(185,20%,90%)]">156</p></div><Users className="h-8 w-8 text-[hsl(185,100%,40%)]" /></div></CardContent></Card>
            <Card className="border-[hsla(185,30%,20%,0.5)] bg-[hsl(195,45%,11%)]"><CardContent className="p-6"><div className="flex items-center justify-between"><div className="text-left"><p className="text-sm font-medium text-[hsl(185,15%,55%)]">Transparency</p><p className="text-2xl font-bold text-[hsl(185,20%,90%)]">98.5%</p></div><Shield className="h-8 w-8 text-[hsl(43,96%,56%)]" /></div></CardContent></Card>
            <Card className="border-[hsla(185,30%,20%,0.5)] bg-[hsl(195,45%,11%)]"><CardContent className="p-6"><div className="flex items-center justify-between"><div className="text-left"><p className="text-sm font-medium text-[hsl(185,15%,55%)]">Efficiency</p><p className="text-2xl font-bold text-[hsl(185,20%,90%)]">92%</p></div><TrendingUp className="h-8 w-8 text-[hsl(25,75%,52%)]" /></div></CardContent></Card>
          </div>
          <div className="mb-8"><h2 className="text-xl font-semibold text-[hsl(185,20%,90%)] mb-6">Recommended Programs</h2><div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">{featuredPrograms.map((program) => { const progress = (program.currentAmount / program.targetAmount) * 100; return (<Card key={program.id} className="hover:shadow-lg transition-shadow border-[hsla(185,30%,20%,0.5)] bg-[hsl(195,45%,11%)]"><CardHeader><div className="flex items-start justify-between"><div className="flex-1"><CardTitle className="text-lg font-semibold line-clamp-2 mb-2 text-[hsl(185,20%,90%)]">{program.title}</CardTitle><div className="flex items-center space-x-2 mb-3"><Badge variant="outline" className="text-xs text-[hsl(185,15%,55%)] border-[hsl(185,30%,20%)]">{program.category}</Badge>{program.isVerified && <Badge className="bg-[hsl(160,84%,15%)] text-[hsl(160,84%,55%)] text-xs border-[hsl(160,84%,30%)]">Verified</Badge>}</div></div></div></CardHeader><CardContent><p className="text-sm text-[hsl(185,15%,60%)] mb-4 line-clamp-3">{program.description}</p><div className="flex items-center text-sm text-[hsl(185,15%,55%)] mb-4"><MapPin className="w-4 h-4 mr-1 text-[hsl(185,100%,40%)]" />{program.location}</div><div className="space-y-4"><div><div className="flex justify-between text-sm mb-2"><span className="text-[hsl(185,15%,55%)]">Funding Progress</span><span className="font-medium text-[hsl(185,20%,90%)]">{Math.round(progress)}%</span></div><Progress value={progress} className="h-2" /><div className="flex justify-between text-sm mt-1"><span className="text-[hsl(185,20%,90%)] font-medium">${program.currentAmount.toLocaleString()}</span><span className="text-[hsl(185,15%,55%)]">from ${program.targetAmount.toLocaleString()}</span></div></div><div className="flex items-center justify-between text-sm"><div className="flex items-center text-[hsl(185,15%,55%)]"><Users className="w-4 h-4 mr-1 text-[hsl(185,100%,40%)]" />{program.beneficiaries.toLocaleString()} recipients</div><Badge className="bg-[hsl(185,100%,15%)] text-[hsl(185,100%,60%)] border-[hsl(185,100%,30%)]">{program.status === "active" ? "Active" : "Completed"}</Badge></div><Separator className="bg-[hsla(185,30%,20%,0.5)]" /><div><h4 className="text-sm font-medium text-[hsl(185,20%,90%)] mb-2">Key Objectives:</h4><ul className="space-y-1">{program.objectives.slice(0, 2).map((objective, index) => (<li key={index} className="text-xs text-gray-600 flex items-center"><Target className="w-3 h-3 mr-1" />{objective}</li>))}</ul></div><Button className="w-full bg-primary hover:bg-blue-700 text-white"><ExternalLink className="w-4 h-4 mr-2" />View Program Details</Button></div></CardContent></Card>); })}</div></div>
        </main>
      </div>
    </div>
  );
}
