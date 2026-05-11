import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, TrendingUp } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen blueprint-bg">
      <nav className="glass-card border-b border-[hsla(185,100%,40%,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.25)] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[hsl(185,100%,50%)]" />
            </div>
            <span className="text-xl font-bold teal-text">Feel Again</span>
          </div>
          <Button onClick={() => (window.location.href = "/api/login")} className="bg-[hsl(185,100%,40%)] hover:bg-[hsl(185,100%,35%)] text-[hsl(195,55%,8%)]">
            Login to Continue
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsla(185,100%,40%,0.3)] bg-[hsla(185,100%,40%,0.08)] mb-6">
            <Shield className="w-3.5 h-3.5 text-[hsl(185,100%,50%)]" />
            <span className="text-xs text-[hsl(185,15%,65%)] tracking-widest uppercase">Official entry for MHPSS ecosystem</span>
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            <span className="teal-text">Feel Again</span>
            <br />
            <span className="text-[hsl(185,20%,85%)] text-3xl font-light">Professional psychological care, transparent coordination, public control</span>
          </h1>
          <p className="text-lg text-[hsl(185,15%,55%)] max-w-3xl mx-auto">
            A humanitarian platform for trauma recovery, donor coordination, clinical reporting, and open accountability.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-[hsla(185,100%,40%,0.18)]"><CardContent className="p-6"><Users className="w-8 h-8 text-[hsl(185,100%,50%)] mb-3" /><h3 className="text-lg font-semibold text-[hsl(185,20%,92%)]">Beneficiaries</h3><p className="text-sm text-[hsl(185,15%,55%)]">Screenings, appointments, funding requests, feedback.</p></CardContent></Card>
          <Card className="glass-card border-[hsla(43,96%,56%,0.18)]"><CardContent className="p-6"><TrendingUp className="w-8 h-8 text-[hsl(43,96%,60%)] mb-3" /><h3 className="text-lg font-semibold text-[hsl(185,20%,92%)]">Providers & Donors</h3><p className="text-sm text-[hsl(185,15%,55%)]">Reports, projects, programs, compliance, funding flows.</p></CardContent></Card>
          <Card className="glass-card border-[hsla(25,75%,52%,0.18)]"><CardContent className="p-6"><Shield className="w-8 h-8 text-[hsl(25,75%,65%)] mb-3" /><h3 className="text-lg font-semibold text-[hsl(185,20%,92%)]">Admin & Public</h3><p className="text-sm text-[hsl(185,15%,55%)]">Audit, verification, monitoring, transparency, impact.</p></CardContent></Card>
        </div>
      </div>

      <footer className="h-1 rainbow-gradient" />
    </div>
  );
}
