import { useLocation } from "wouter";
import { ShieldCheck, ClipboardCheck, Users, FileText, ArrowLeftRight, Search, AlertTriangle, Eye, Lock, TrendingUp } from "lucide-react";

const items = [
  { title: "Verify beneficiaries", desc: "Check identity, eligibility, and intake data.", icon: Users },
  { title: "Coordinate providers", desc: "Match caseloads, services, and approvals.", icon: ArrowLeftRight },
  { title: "Audit programs", desc: "Review funding, compliance, and outcomes.", icon: ClipboardCheck },
  { title: "Monitor reports", desc: "Track anomalies, submissions, and delays.", icon: FileText },
];

export default function PortalAdmin() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen blueprint-bg px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="glass-card rounded-2xl p-6 border border-[hsla(160,84%,39%,0.25)] flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold teal-text">Admin Control Room</h1>
            <p className="text-sm text-[hsl(185,15%,55%)]">Verification, coordination, audit, and governance.</p>
          </div>
          <button onClick={() => setLocation("/portal")} className="px-4 py-2 rounded-xl bg-[hsla(160,84%,39%,0.15)] border border-[hsla(160,84%,39%,0.3)] text-[hsl(160,84%,55%)] text-sm">Back to roles</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-card rounded-2xl p-5 border border-[hsla(185,30%,20%,0.5)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[hsla(160,84%,39%,0.15)] flex items-center justify-center"><Icon className="w-5 h-5 text-[hsl(160,84%,50%)]" /></div>
                  <h2 className="text-lg font-semibold text-[hsl(185,20%,90%)]">{item.title}</h2>
                </div>
                <p className="text-sm text-[hsl(185,15%,55%)]">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-[hsla(185,100%,40%,0.2)]"><p className="text-sm text-[hsl(185,15%,50%)]">Overview</p><p className="text-3xl font-black teal-text">Live</p></div>
          <div className="glass-card rounded-2xl p-5 border border-[hsla(43,96%,56%,0.2)]"><p className="text-sm text-[hsl(185,15%,50%)]">Funding Programs</p><p className="text-3xl font-black gold-text">27</p></div>
          <div className="glass-card rounded-2xl p-5 border border-[hsla(25,75%,52%,0.2)]"><p className="text-sm text-[hsl(185,15%,50%)]">Monitoring & Control</p><p className="text-3xl font-black copper-text">9</p></div>
          <div className="glass-card rounded-2xl p-5 border border-[hsla(160,84%,39%,0.2)]"><p className="text-sm text-[hsl(185,15%,50%)]">Audit readiness</p><p className="text-3xl font-black text-[hsl(160,84%,50%)]">99%</p></div>
        </div>
      </div>
    </div>
  );
}
