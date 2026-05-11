import { useState } from "react";
import { useLocation } from "wouter";
import { TrendingUp, ChevronLeft, Eye, Settings, BarChart3, Shield, DollarSign, Users, Globe2, Layers, MessageSquare, Play, RefreshCw } from "lucide-react";

export default function PortalDonor() {
  const [, setLocation] = useLocation();
  const [investMode, setInvestMode] = useState<"manual" | "auto" | "god">("manual");

  return (
    <div className="min-h-screen blueprint-bg">
      <div className="glass-card border-b border-[hsla(185,80%,60%,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/portal")} className="p-1.5 rounded-lg hover:bg-[hsla(25,75%,52%,0.1)] text-[hsl(185,15%,55%)]"><ChevronLeft className="w-4 h-4" /></button>
          <div className="w-8 h-8 rounded-lg bg-[hsla(25,75%,52%,0.15)] flex items-center justify-center"><TrendingUp className="w-4 h-4 text-[hsl(25,75%,65%)]" /></div>
          <div><h1 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Donor Portal</h1><p className="text-xs text-[hsl(185,15%,45%)]">Programs · Compliance · Data requests · Reports</p></div>
        </div>
        <div className="text-right"><p className="text-xs text-[hsl(185,15%,45%)]">Deploy balance</p><p className="text-sm font-bold text-[hsl(43,96%,60%)]">$127,500</p></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h2 className="text-2xl font-bold copper-text">Impact financing hub</h2>
          <p className="text-sm text-[hsl(185,15%,55%)]">Corporate philanthropy, ESG, CSR, social bonds, auto-match, compliance settings, and manual review mode.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ l: "Programs", v: "7", c: Layers }, { l: "Funds", v: "$392K", c: DollarSign }, { l: "Yield", v: "6.4%", c: TrendingUp }, { l: "Compliance", v: "97/100", c: Shield }].map((s) => { const Icon = s.c; return <div key={s.l} className="glass-card rounded-xl p-4 border border-[hsla(185,30%,20%,0.5)]"><Icon className="w-4 h-4 text-[hsl(25,75%,65%)] mb-2" /><p className="text-xl font-bold text-[hsl(185,20%,92%)]">{s.v}</p><p className="text-xs text-[hsl(185,15%,45%)]">{s.l}</p></div>; })}
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-3">Funding mode</h3>
          <div className="grid grid-cols-3 gap-3">
            {(["manual", "auto", "god"] as const).map((m) => <button key={m} onClick={() => setInvestMode(m)} className={`p-4 rounded-xl border text-left ${investMode===m ? "border-[hsl(25,75%,52%)] bg-[hsla(25,75%,52%,0.12)]" : "border-[hsla(185,30%,20%,0.5)]"}`}><p className="font-semibold text-[hsl(185,20%,90%)] capitalize">{m} mode</p><p className="text-xs text-[hsl(185,15%,45%)]">{m === "manual" ? "Approve every initiative" : m === "auto" ? "Fund all compliant projects" : "Full control and overrides"}</p></button>)}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-3">Request data & reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[hsl(185,15%,55%)]">
            <p>Request service delivery, outcome, and beneficiary data by program.</p>
            <p>Export program reports, financial reports, and compliance summaries.</p>
            <p>Run auto-matching against projects and donor criteria.</p>
            <p>Track feedback from beneficiaries in a circular accountability loop.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
