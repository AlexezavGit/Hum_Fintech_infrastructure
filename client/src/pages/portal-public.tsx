import { useLocation } from "wouter";
import { BarChart3, Activity, HeartPulse, Users, Wallet, TrendingUp, ShieldCheck, Globe2 } from "lucide-react";

const stats = [
  { label: "Resources used", value: "73%", icon: Wallet },
  { label: "Completed rehab", value: "1,284", icon: Users },
  { label: "Efficiency", value: "91.6%", icon: TrendingUp },
  { label: "GDP impact", value: "0.42%", icon: Globe2 },
];

export default function PortalPublic() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen blueprint-bg px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.25)] flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold teal-text">Public Control Dashboard</h1>
            <p className="text-sm text-[hsl(185,15%,55%)]">Open monitoring of resources, efficiency, outcomes, and impact.</p>
          </div>
          <button onClick={() => setLocation("/portal")} className="px-4 py-2 rounded-xl bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-sm">
            Back to roles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card rounded-2xl p-5 border border-[hsla(185,30%,20%,0.5)]">
                <Icon className="w-5 h-5 text-[hsl(185,100%,50%)] mb-3" />
                <p className="text-2xl font-black text-[hsl(185,20%,92%)]">{stat.value}</p>
                <p className="text-sm text-[hsl(185,15%,55%)]">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[hsla(43,96%,56%,0.25)]">
          <h2 className="text-lg font-semibold text-[hsl(185,20%,90%)] mb-4">Public accountability signals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[hsl(185,15%,55%)]">
            <p>Live resource allocation by region and service type.</p>
            <p>Completed rehabilitation counts and average time-to-recovery.</p>
            <p>Transparent service utilization and funding efficiency.</p>
            <p>Macro-impact indicators including workforce return and GDP contribution.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
