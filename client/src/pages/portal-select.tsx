import { useLocation } from "wouter";
import { Heart, Stethoscope, TrendingUp, Shield, ArrowRight, Puzzle } from "lucide-react";

export default function PortalSelect() {
  const [, setLocation] = useLocation();

  const portals = [
    {
      role: "beneficiary",
      icon: Heart,
      label: "I Need Support",
      sublabel: "Beneficiary Portal",
      description: "Access psychological care, track your recovery journey, request funding, and share feedback with your support network.",
      features: ["Book & track therapy sessions", "Check-in on your wellbeing", "Request financial support", "Safe & confidential"],
      color: "teal",
      borderColor: "border-[hsl(185,100%,40%)]",
      iconBg: "bg-[hsla(185,100%,40%,0.15)]",
      iconColor: "text-[hsl(185,100%,60%)]",
      badgeClass: "badge-beneficiary",
      btnClass: "bg-[hsl(185,100%,40%)] hover:bg-[hsl(185,100%,35%)] text-[hsl(195,55%,8%)]",
      glowClass: "hover:shadow-[0_0_40px_hsla(185,100%,40%,0.3)]",
      path: "/portal/beneficiary",
    },
    {
      role: "provider",
      icon: Stethoscope,
      label: "I Provide Care",
      sublabel: "Provider Portal",
      description: "Log clinical sessions, generate mhGAP-compliant reports automatically, track your income and manage your caseload.",
      features: ["Session hour logging", "Auto mhGAP reporting", "Income & payment tracking", "Caseload management"],
      color: "gold",
      borderColor: "border-[hsl(43,96%,56%)]",
      iconBg: "bg-[hsla(43,96%,56%,0.15)]",
      iconColor: "text-[hsl(43,96%,70%)]",
      badgeClass: "badge-provider",
      btnClass: "bg-[hsl(43,96%,56%)] hover:bg-[hsl(43,96%,50%)] text-[hsl(195,55%,8%)]",
      glowClass: "hover:shadow-[0_0_40px_hsla(43,96%,56%,0.3)]",
      path: "/portal/provider",
    },
    {
      role: "donor",
      icon: TrendingUp,
      label: "I Finance Impact",
      sublabel: "Donor & Analyst Portal",
      description: "Score humanitarian initiatives, create compliance-ready funding programs, auto-match with projects, and track social bond returns.",
      features: ["Initiative scoring & clearing", "Funding program builder", "Auto-invest & God mode", "Beneficiary feedback loop"],
      color: "copper",
      borderColor: "border-[hsl(25,75%,52%)]",
      iconBg: "bg-[hsla(25,75%,52%,0.15)]",
      iconColor: "text-[hsl(25,75%,70%)]",
      badgeClass: "badge-donor",
      btnClass: "bg-[hsl(25,75%,52%)] hover:bg-[hsl(25,75%,45%)] text-white",
      glowClass: "hover:shadow-[0_0_40px_hsla(25,75%,52%,0.3)]",
      path: "/portal/donor",
    },
  ];

  return (
    <div className="min-h-screen blueprint-bg flex flex-col">
      {/* Header */}
      <header className="relative z-10 px-8 pt-10 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.3)] flex items-center justify-center teal-glow">
            <Heart className="w-5 h-5 text-[hsl(185,100%,50%)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold teal-text tracking-wide">Feel Again</h1>
            <p className="text-xs text-[hsl(185,15%,45%)]">MHPSS Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[hsl(185,15%,45%)]">
          <Shield className="w-3.5 h-3.5" />
          <span>Secure · Confidential · Transparent</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsla(185,100%,40%,0.3)] bg-[hsla(185,100%,40%,0.08)] mb-6">
            <Puzzle className="w-3.5 h-3.5 text-[hsl(25,75%,60%)]" />
            <span className="text-xs text-[hsl(185,15%,65%)] tracking-widest uppercase">Humanitarian Puzzle — Every piece matters</span>
          </div>
          <h2 className="text-5xl font-black mb-4 leading-tight">
            <span className="teal-text">Feel Again</span>
            <br />
            <span className="text-[hsl(185,20%,85%)] text-3xl font-light">Unified MHPSS Platform</span>
          </h2>
          <p className="text-[hsl(185,15%,55%)] text-lg leading-relaxed">
            Dignified access to psychological care. Transparent co-financing.<br />
            Real impact, verified on-chain.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.role}
                onClick={() => setLocation(portal.path)}
                className={`role-card glass-card rounded-2xl p-7 border ${portal.borderColor} ${portal.glowClass} puzzle-accent`}
              >
                <div className={`w-12 h-12 rounded-xl ${portal.iconBg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${portal.iconColor}`} />
                </div>

                <div className="mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${portal.badgeClass} font-medium`}>
                    {portal.sublabel}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[hsl(185,20%,92%)] mt-3 mb-2">{portal.label}</h3>
                <p className="text-sm text-[hsl(185,15%,50%)] leading-relaxed mb-5">{portal.description}</p>

                <ul className="space-y-2 mb-6">
                  {portal.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[hsl(185,15%,60%)]">
                      <span className={`w-1.5 h-1.5 rounded-full ${portal.iconBg} border ${portal.borderColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${portal.btnClass}`}
                >
                  Enter Portal
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* Rainbow Footer */}
      <footer className="mt-auto">
        <div className="h-1 rainbow-gradient" />
        <div className="px-8 py-4 flex items-center justify-between text-xs text-[hsl(185,15%,35%)]">
          <span>© 2026 Feel Again · Healing Bridge · Yety Tracker</span>
          <span>Powered by Solana · mhGAP Compliant</span>
        </div>
      </footer>
    </div>
  );
}
