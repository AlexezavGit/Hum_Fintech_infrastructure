import { useLocation } from "wouter";
import { Heart, Stethoscope, TrendingUp, ShieldCheck, ArrowRight, Puzzle, BarChart3 } from "lucide-react";

const portals = [
  {
    role: "beneficiary",
    icon: Heart,
    label: "Beneficiary",
    sublabel: "Care + self-check",
    description: "Answer GAD and PHQ screenings, track sessions, request support, and share recovery feedback.",
    path: "/portal/beneficiary",
    badgeClass: "badge-beneficiary",
    btnClass: "bg-[hsl(185,100%,40%)] hover:bg-[hsl(185,100%,35%)] text-[hsl(195,55%,8%)]",
    borderColor: "border-[hsla(185,100%,40%,0.35)]",
    iconBg: "bg-[hsla(185,100%,40%,0.15)]",
    iconColor: "text-[hsl(185,100%,60%)]",
  },
  {
    role: "provider",
    icon: Stethoscope,
    label: "Provider",
    sublabel: "Clinical workbench",
    description: "Plan practice, log sessions, create project help requests, produce reports, and manage received funding. In private practice, the specialist also acts as the administrator.",
    path: "/portal/provider",
    badgeClass: "badge-provider",
    btnClass: "bg-[hsl(43,96%,56%)] hover:bg-[hsl(43,96%,50%)] text-[hsl(195,55%,8%)]",
    borderColor: "border-[hsla(43,96%,56%,0.35)]",
    iconBg: "bg-[hsla(43,96%,56%,0.15)]",
    iconColor: "text-[hsl(43,96%,70%)]",
  },
  {
    role: "donor",
    icon: TrendingUp,
    label: "Donor",
    sublabel: "Finance + ESG / CSR",
    description: "Create programs, set compliance, request data, review reports, and auto-match funding to projects.",
    path: "/portal/donor",
    badgeClass: "badge-donor",
    btnClass: "bg-[hsl(25,75%,52%)] hover:bg-[hsl(25,75%,45%)] text-white",
    borderColor: "border-[hsla(25,75%,52%,0.35)]",
    iconBg: "bg-[hsla(25,75%,52%,0.15)]",
    iconColor: "text-[hsl(25,75%,70%)]",
  },
  {
    role: "admin",
    icon: ShieldCheck,
    label: "Admin",
    sublabel: "Verification + audit",
    description: "For private practice, the specialist themselves uses the same interface with admin functions for coordination, verification, audit, and oversight.",
    path: "/portal/admin",
    badgeClass: "badge-beneficiary",
    btnClass: "bg-[hsl(160,84%,39%)] hover:bg-[hsl(160,84%,34%)] text-white",
    borderColor: "border-[hsla(160,84%,39%,0.35)]",
    iconBg: "bg-[hsla(160,84%,39%,0.15)]",
    iconColor: "text-[hsl(160,84%,50%)]",
  },
  {
    role: "public",
    icon: BarChart3,
    label: "Public Control",
    sublabel: "Open monitoring",
    description: "Track resources, efficiency, completions, and system impact in a public accountability dashboard.",
    path: "/portal/public",
    badgeClass: "badge-provider",
    btnClass: "bg-[hsl(185,100%,40%)] hover:bg-[hsl(185,100%,35%)] text-[hsl(195,55%,8%)]",
    borderColor: "border-[hsla(185,100%,40%,0.35)]",
    iconBg: "bg-[hsla(185,100%,40%,0.15)]",
    iconColor: "text-[hsl(185,100%,60%)]",
  },
];

export default function PortalSelect() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen blueprint-bg flex flex-col">
      <header className="relative z-10 px-8 pt-10 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.3)] flex items-center justify-center teal-glow">
            <Heart className="w-5 h-5 text-[hsl(185,100%,50%)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold teal-text tracking-wide">Feel Again</h1>
            <p className="text-xs text-[hsl(185,15%,45%)]">Unified MHPSS operating system</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[hsl(185,15%,45%)]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secure · Transparent · Role-based</span>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsla(185,100%,40%,0.3)] bg-[hsla(185,100%,40%,0.08)] mb-6">
            <Puzzle className="w-3.5 h-3.5 text-[hsl(25,75%,60%)]" />
            <span className="text-xs text-[hsl(185,15%,65%)] tracking-widest uppercase">Humanitarian puzzle · every role matters</span>
          </div>
          <h2 className="text-5xl font-black mb-4 leading-tight">
            <span className="teal-text">Feel Again</span>
            <br />
            <span className="text-[hsl(185,20%,85%)] text-3xl font-light">Choose your interface</span>
          </h2>
          <p className="text-[hsl(185,15%,55%)] text-lg leading-relaxed">
            One platform, many roles. Each portal keeps the same family of modules — Overview, Impact Financing Hub,
            Monitoring & Control, Donations, Transparency, and Reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.role}
                onClick={() => setLocation(portal.path)}
                className={`role-card glass-card rounded-2xl p-7 border ${portal.borderColor} text-left puzzle-accent`}
              >
                <div className={`w-12 h-12 rounded-xl ${portal.iconBg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${portal.iconColor}`} />
                </div>
                <div className="mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${portal.badgeClass} font-medium`}>{portal.sublabel}</span>
                </div>
                <h3 className="text-xl font-bold text-[hsl(185,20%,92%)] mt-3 mb-2">{portal.label}</h3>
                <p className="text-sm text-[hsl(185,15%,50%)] leading-relaxed mb-5">{portal.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="text-[10px] px-2 py-1 rounded-full border border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,58%)] bg-[hsla(195,45%,9%,0.6)]">Overview</span>
                  <span className="text-[10px] px-2 py-1 rounded-full border border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,58%)] bg-[hsla(195,45%,9%,0.6)]">Monitoring & Control</span>
                  <span className="text-[10px] px-2 py-1 rounded-full border border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,58%)] bg-[hsla(195,45%,9%,0.6)]">Reports</span>
                </div>
                <div className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${portal.btnClass}`}>
                  Enter Portal
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
