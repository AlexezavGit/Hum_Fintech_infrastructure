import { useState } from "react";
import { useLocation } from "wouter";
import {
  TrendingUp, ChevronLeft, Zap, Shield, BarChart3,
  CheckCircle, Clock, ArrowRight, Settings, Eye,
  DollarSign, Users, Globe, Star, Filter, Layers,
  MessageSquare, RefreshCw, Play, PauseCircle
} from "lucide-react";

const initiatives = [
  {
    id: "FA-2026-087",
    org: "Healing Bridge Ukraine",
    title: "Adolescent PTSD Rehabilitation — Zhytomyr",
    score: 94,
    beneficiaries: 250,
    sessions: 1200,
    funding: 48000,
    gap: 12000,
    compliance: ["IATI", "Grand Bargain", "mhGAP"],
    status: "active",
  },
  {
    id: "FA-2026-091",
    org: "Yety Tracker NGO",
    title: "Group CBT for Conflict-Affected Families — Kharkiv",
    score: 87,
    beneficiaries: 180,
    sessions: 720,
    funding: 32000,
    gap: 8000,
    compliance: ["IATI", "mhGAP"],
    status: "seeking",
  },
  {
    id: "FA-2026-095",
    org: "Feel Again Clinic Network",
    title: "First Responder Burnout Recovery — Kyiv",
    score: 79,
    beneficiaries: 90,
    sessions: 540,
    funding: 21600,
    gap: 5400,
    compliance: ["Grand Bargain", "mhGAP"],
    status: "seeking",
  },
];

export default function PortalDonor() {
  const [, setLocation] = useLocation();
  const [investMode, setInvestMode] = useState<"manual" | "auto" | "god">("manual");
  const [selectedInit, setSelectedInit] = useState<string | null>(null);

  const modeConfig = {
    manual: { label: "Manual Mode", desc: "Review every project before funding", icon: Eye, color: "text-[hsl(185,100%,50%)]" },
    auto: { label: "Auto-Invest", desc: "Fund all compliant projects automatically", icon: RefreshCw, color: "text-[hsl(160,84%,50%)]" },
    god: { label: "God Mode", desc: "Full control — approve every single transaction", icon: Settings, color: "text-[hsl(43,96%,60%)]" },
  };

  return (
    <div className="min-h-screen blueprint-bg">
      {/* Header */}
      <header className="glass-card border-b border-[hsla(185,80%,60%,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/portal")}
            className="p-1.5 rounded-lg hover:bg-[hsla(25,75%,52%,0.1)] text-[hsl(185,15%,55%)] hover:text-[hsl(25,75%,65%)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-[hsla(25,75%,52%,0.15)] flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[hsl(25,75%,65%)]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Impact Financing Hub</h1>
            <p className="text-xs text-[hsl(185,15%,45%)]">Donor & Analyst Portal · Humanitarian Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[hsl(185,15%,45%)]">Deploy balance:</span>
          <span className="text-sm font-bold text-[hsl(43,96%,60%)]">$127,500</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Donor Profile */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold copper-text mb-1">International Relief Foundation</h2>
              <p className="text-[hsl(185,15%,55%)] text-sm">
                Verified Donor · Humanitarian Social Bond Issuer ·
                <span className="text-[hsl(185,100%,50%)] ml-1">HumanitarianPlatform Tier 1</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[hsl(185,15%,45%)]">YTD Impact</p>
              <p className="text-2xl font-black text-[hsl(160,84%,50%)]">1,847</p>
              <p className="text-xs text-[hsl(185,15%,45%)]">beneficiaries supported</p>
            </div>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Programs", value: "7", icon: Layers, color: "text-[hsl(185,100%,50%)]", bg: "bg-[hsla(185,100%,40%,0.12)]" },
            { label: "Deployed Funds", value: "$392K", icon: DollarSign, color: "text-[hsl(43,96%,60%)]", bg: "bg-[hsla(43,96%,56%,0.12)]" },
            { label: "Social Bond Yield", value: "6.4%", icon: TrendingUp, color: "text-[hsl(160,84%,50%)]", bg: "bg-[hsla(160,84%,39%,0.12)]" },
            { label: "Compliance Score", value: "97/100", icon: Shield, color: "text-[hsl(25,75%,65%)]", bg: "bg-[hsla(25,75%,52%,0.12)]" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass-card rounded-xl p-4 border border-[hsla(185,30%,20%,0.5)]">
                <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <p className="text-xl font-bold text-[hsl(185,20%,92%)]">{s.value}</p>
                <p className="text-xs text-[hsl(185,15%,45%)] mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Investment Mode */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-1 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[hsl(25,75%,65%)]" />
            Investment Mode
          </h3>
          <p className="text-xs text-[hsl(185,15%,45%)] mb-4">Choose how the platform deploys your funds when new compliant projects appear.</p>
          <div className="grid grid-cols-3 gap-3">
            {(["manual", "auto", "god"] as const).map((mode) => {
              const cfg = modeConfig[mode];
              const Icon = cfg.icon;
              const active = investMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setInvestMode(mode)}
                  className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all text-left ${
                    active
                      ? "border-[hsl(25,75%,52%)] bg-[hsla(25,75%,52%,0.12)]"
                      : "border-[hsla(185,30%,20%,0.5)] hover:border-[hsla(25,75%,52%,0.4)]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? cfg.color : "text-[hsl(185,15%,45%)]"}`} />
                  <div>
                    <p className={`text-sm font-semibold ${active ? "text-[hsl(185,20%,90%)]" : "text-[hsl(185,15%,55%)]"}`}>{cfg.label}</p>
                    <p className="text-xs text-[hsl(185,15%,40%)]">{cfg.desc}</p>
                  </div>
                  {active && <div className="w-2 h-2 rounded-full bg-[hsl(25,75%,52%)] self-end" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Initiative Scoring */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[hsl(25,75%,65%)]" />
              Initiative Scoring & Clearing
            </h3>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[hsl(185,15%,45%)]" />
              <span className="text-xs text-[hsl(185,15%,45%)]">All Compliance Levels</span>
            </div>
          </div>

          <div className="space-y-3">
            {initiatives.map((init) => (
              <div
                key={init.id}
                className={`rounded-xl border transition-all ${
                  selectedInit === init.id
                    ? "border-[hsl(25,75%,52%)] bg-[hsla(25,75%,52%,0.08)]"
                    : "border-[hsla(185,30%,20%,0.5)] bg-[hsla(195,45%,9%,0.5)] hover:border-[hsla(25,75%,52%,0.3)]"
                } p-4`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[hsl(185,15%,40%)]">{init.id}</span>
                      {init.compliance.map((c) => (
                        <span key={c} className="text-xs px-1.5 py-0.5 rounded badge-beneficiary">{c}</span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-[hsl(185,20%,85%)] mb-0.5">{init.title}</p>
                    <p className="text-xs text-[hsl(185,15%,45%)]">{init.org}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black text-[hsl(160,84%,50%)]">{init.score}</div>
                    <div className="text-xs text-[hsl(185,15%,45%)]">Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div>
                    <p className="text-xs text-[hsl(185,15%,40%)]">Beneficiaries</p>
                    <p className="text-sm font-semibold text-[hsl(185,20%,80%)]">{init.beneficiaries}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(185,15%,40%)]">Funding Gap</p>
                    <p className="text-sm font-semibold text-[hsl(43,96%,60%)]">${init.gap.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(185,15%,40%)]">Status</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${init.status === "active" ? "badge-beneficiary" : "badge-provider"}`}>
                      {init.status === "active" ? "Funded" : "Seeking"}
                    </span>
                  </div>
                </div>

                {init.status === "seeking" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setSelectedInit(init.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsl(25,75%,52%)] text-white text-xs font-semibold hover:bg-[hsl(25,75%,45%)] transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      Fund Now
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsla(185,100%,40%,0.12)] border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-xs hover:bg-[hsla(185,100%,40%,0.2)] transition-colors">
                      <Eye className="w-3 h-3" />
                      Deep Dive
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Beneficiary Feedback Loop */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[hsl(25,75%,65%)]" />
            Beneficiary Feedback — Circular Loop
          </h3>
          <div className="space-y-3">
            {[
              { text: "After 8 sessions I could return to work. I feel human again.", program: "Adolescent PTSD — Zhytomyr", date: "May 10", sentiment: 5 },
              { text: "The group sessions helped me realize I wasn't alone. My children see a difference.", program: "Family CBT — Kharkiv", date: "May 8", sentiment: 4 },
              { text: "I still have difficult days, but I have tools now. Thank you to whoever made this possible.", program: "First Responder Recovery — Kyiv", date: "May 5", sentiment: 4 },
            ].map((fb, i) => (
              <div key={i} className="p-4 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)]">
                <p className="text-sm text-[hsl(185,20%,78%)] italic mb-2">"{fb.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[hsl(185,15%,40%)]">{fb.program} · {fb.date}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((n) => (
                      <Star key={n} className={`w-3 h-3 ${n <= fb.sentiment ? "text-[hsl(43,96%,56%)]" : "text-[hsl(185,15%,25%)]"}`} fill={n <= fb.sentiment ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Funding Program */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(25,75%,52%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[hsl(25,75%,65%)]" />
            Create Funding Program
          </h3>
          <p className="text-xs text-[hsl(185,15%,45%)] mb-4">
            Define your compliance requirements once — the platform auto-matches and routes funds to qualifying projects.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-[hsl(185,15%,45%)] mb-1 block">Program Name</label>
              <input
                placeholder="e.g. Children's Resilience Fund 2026"
                className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm text-[hsl(185,20%,80%)] placeholder-[hsl(185,15%,35%)] focus:outline-none focus:border-[hsl(25,75%,52%)] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-[hsl(185,15%,45%)] mb-1 block">Total Budget (USD)</label>
              <input
                placeholder="e.g. 50000"
                className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm text-[hsl(185,20%,80%)] placeholder-[hsl(185,15%,35%)] focus:outline-none focus:border-[hsl(25,75%,52%)] transition-colors"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs text-[hsl(185,15%,45%)] mb-2 block">Required Compliance Standards</label>
            <div className="flex flex-wrap gap-2">
              {["IATI", "Grand Bargain", "mhGAP", "SPHERE", "CHS", "Do No Harm"].map((tag) => (
                <button key={tag} className="px-3 py-1 rounded-lg text-xs border border-[hsla(25,75%,52%,0.3)] text-[hsl(25,75%,65%)] hover:bg-[hsla(25,75%,52%,0.15)] transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsl(25,75%,52%)] text-white text-sm font-semibold hover:bg-[hsl(25,75%,45%)] transition-colors">
            <ArrowRight className="w-4 h-4" />
            Launch Program with Auto-Match
          </button>
        </div>
      </div>

      <footer className="mt-8">
        <div className="h-0.5 rainbow-gradient" />
      </footer>
    </div>
  );
}
