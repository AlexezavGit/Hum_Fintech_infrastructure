import { useState } from "react";
import { useLocation } from "wouter";
import { TrendingUp, ChevronLeft, Eye, Settings, BarChart3, Shield, DollarSign, Users, Globe2, Layers, MessageSquare, Play, RefreshCw, Search, FileText, ArrowRight } from "lucide-react";

const initiatives = [
  { id: "FA-2026-087", org: "Healing Bridge Ukraine", title: "Adolescent PTSD Rehabilitation — Zhytomyr", score: 94, beneficiaries: 250, compliance: ["IATI", "Grand Bargain", "mhGAP"], status: "active" },
  { id: "FA-2026-091", org: "Yety Tracker NGO", title: "Group CBT for Conflict-Affected Families — Kharkiv", score: 87, beneficiaries: 180, compliance: ["IATI", "mhGAP"], status: "seeking" },
  { id: "FA-2026-095", org: "Feel Again Clinic Network", title: "First Responder Burnout Recovery — Kyiv", score: 79, beneficiaries: 90, compliance: ["Grand Bargain", "mhGAP"], status: "seeking" },
];

export default function PortalDonor() {
  const [, setLocation] = useLocation();
  const [investMode, setInvestMode] = useState<"manual" | "auto" | "god">("manual");

  return (
    <div className="min-h-screen blueprint-bg">
      <div className="glass-card border-b border-[hsla(185,80%,60%,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/portal")} className="p-1.5 rounded-lg hover:bg-[hsla(25,75%,52%,0.1)] text-[hsl(185,15%,55%)]"><ChevronLeft className="w-4 h-4" /></button>
          <div className="w-8 h-8 rounded-lg bg-[hsla(25,75%,52%,0.15)] flex items-center justify-center"><TrendingUp className="w-4 h-4 text-[hsl(25,75%,65%)]" /></div>
          <div><h1 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Donor Portal</h1><p className="text-xs text-[hsl(185,15%,45%)]">Programs · compliance · data requests · reports</p></div>
        </div>
        <div className="text-right"><p className="text-xs text-[hsl(185,15%,45%)]">Deploy balance</p><p className="text-sm font-bold text-[hsl(43,96%,60%)]">$127,500</p></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h2 className="text-2xl font-bold copper-text">Impact financing hub</h2>
          <p className="text-sm text-[hsl(185,15%,55%)]">Create programs, tune compliance, request reports, review scoring, and auto-match funds to verified projects.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ l: "Programs", v: "7", c: Layers }, { l: "Funds", v: "$392K", c: DollarSign }, { l: "Yield", v: "6.4%", c: TrendingUp }, { l: "Compliance", v: "97/100", c: Shield }].map((s) => { const Icon = s.c; return <div key={s.l} className="glass-card rounded-xl p-4 border border-[hsla(185,30%,20%,0.5)]"><Icon className="w-4 h-4 text-[hsl(25,75%,65%)] mb-2" /><p className="text-xl font-bold text-[hsl(185,20%,92%)]">{s.v}</p><p className="text-xs text-[hsl(185,15%,45%)]">{s.l}</p></div>; })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
            <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-3 flex items-center gap-2"><Settings className="w-4 h-4 text-[hsl(25,75%,65%)]" />Funding mode</h3>
            <div className="grid grid-cols-3 gap-3">
              {(["manual", "auto", "god"] as const).map((m) => <button key={m} onClick={() => setInvestMode(m)} className={`p-4 rounded-xl border text-left ${investMode===m ? "border-[hsl(25,75%,52%)] bg-[hsla(25,75%,52%,0.12)]" : "border-[hsla(185,30%,20%,0.5)]"}`}><p className="font-semibold text-[hsl(185,20%,90%)] capitalize">{m} mode</p><p className="text-xs text-[hsl(185,15%,45%)]">{m === "manual" ? "Approve every initiative" : m === "auto" ? "Fund all compliant projects" : "Full control and overrides"}</p></button>)}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
            <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-3 flex items-center gap-2"><Search className="w-4 h-4 text-[hsl(185,100%,50%)]" />Request data & reports</h3>
            <div className="grid grid-cols-1 gap-3 text-sm text-[hsl(185,15%,55%)]">
              <p>Request service delivery, outcome, and beneficiary data by program.</p>
              <p>Export program reports, financial reports, and compliance summaries.</p>
              <p>Run auto-matching against projects and donor criteria.</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[hsl(25,75%,65%)]" />Initiative scoring & clearing</h3>
          <div className="space-y-3">
            {initiatives.map((init) => (
              <div key={init.id} className="rounded-xl border border-[hsla(185,30%,20%,0.5)] bg-[hsla(195,45%,9%,0.5)] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-[hsl(185,15%,40%)]">{init.id}</span>
                      {init.compliance.map((c) => <span key={c} className="text-xs px-1.5 py-0.5 rounded badge-beneficiary">{c}</span>)}
                    </div>
                    <p className="text-sm font-semibold text-[hsl(185,20%,85%)] mb-0.5">{init.title}</p>
                    <p className="text-xs text-[hsl(185,15%,45%)]">{init.org}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black text-[hsl(160,84%,50%)]">{init.score}</div>
                    <div className="text-xs text-[hsl(185,15%,45%)]">Score</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsl(25,75%,52%)] text-white text-xs font-semibold"><Play className="w-3 h-3" />Fund now</button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsla(185,100%,40%,0.12)] border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-xs"><Eye className="w-3 h-3" />Deep dive</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[hsl(25,75%,65%)]" />Beneficiary feedback loop</h3>
          <div className="grid grid-cols-1 gap-3 text-sm text-[hsl(185,15%,55%)]">
            <p>Anonymous stories from beneficiaries flow back into donor decision-making.</p>
            <p>Track the impact of funded services and read outcome statements.</p>
            <p>Adjust programs based on actual recovery progress and needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
