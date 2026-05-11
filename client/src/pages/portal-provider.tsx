import { useState } from "react";
import { useLocation } from "wouter";
import { Stethoscope, Clock, FileText, DollarSign, Users, ChevronLeft, Plus, CheckCircle, TrendingUp, BarChart3, Download, X, FolderPlus } from "lucide-react";

export default function PortalProvider() {
  const [, setLocation] = useLocation();
  const [showLogForm, setShowLogForm] = useState(false);
  const [sessionData, setSessionData] = useState({ client: "", date: "", duration: "50", type: "individual", notes: "", symptoms: "3" });

  return (
    <div className="min-h-screen blueprint-bg">
      <div className="glass-card border-b border-[hsla(185,80%,60%,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/portal")} className="p-1.5 rounded-lg hover:bg-[hsla(43,96%,56%,0.1)] text-[hsl(185,15%,55%)]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-[hsla(43,96%,56%,0.15)] flex items-center justify-center"><Stethoscope className="w-4 h-4 text-[hsl(43,96%,60%)]" /></div>
          <div><h1 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Provider Portal</h1><p className="text-xs text-[hsl(185,15%,45%)]">Sessions · Reports · Project help · Funding</p></div>
        </div>
        <button onClick={() => setShowLogForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(43,96%,56%)] text-[hsl(195,55%,8%)] text-sm font-semibold"><Plus className="w-4 h-4" />Log Session</button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="glass-card rounded-2xl p-6 border border-[hsla(43,96%,56%,0.2)]">
          <h2 className="text-2xl font-bold gold-text">Clinical workspace</h2>
          <p className="text-sm text-[hsl(185,15%,55%)]">Includes all admin-related essentials for providers: overview, projects, monitoring, donations, transparency and reports.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ l: "Sessions", v: "23", c: Clock }, { l: "Hours", v: "19.2h", c: BarChart3 }, { l: "Clients", v: "11", c: Users }, { l: "Paid", v: "$4,800", c: DollarSign }].map((s) => { const Icon = s.c; return <div key={s.l} className="glass-card rounded-xl p-4 border border-[hsla(185,30%,20%,0.5)]"><Icon className="w-4 h-4 text-[hsl(185,100%,50%)] mb-2" /><p className="text-xl font-bold text-[hsl(185,20%,92%)]">{s.v}</p><p className="text-xs text-[hsl(185,15%,45%)]">{s.l}</p></div>; })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6 border border-[hsla(185,30%,20%,0.5)]"><h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-3">Create report</h3><p className="text-sm text-[hsl(185,15%,55%)]">Generate mhGAP and program reports from sessions.</p><button className="mt-4 px-4 py-2 rounded-xl bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-sm">New report</button></div>
          <div className="glass-card rounded-2xl p-6 border border-[hsla(185,30%,20%,0.5)]"><h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-3">Create project help request</h3><p className="text-sm text-[hsl(185,15%,55%)]">Turn a funding need into a visible help project for donors.</p><button className="mt-4 px-4 py-2 rounded-xl bg-[hsla(25,75%,52%,0.15)] border border-[hsla(25,75%,52%,0.3)] text-[hsl(25,75%,65%)] text-sm flex items-center gap-2"><FolderPlus className="w-4 h-4" />Create project</button></div>
        </div>
      </div>

      {showLogForm && <div className="fixed inset-0 bg-[hsla(195,55%,5%,0.85)] flex items-center justify-center p-4 z-50"><div className="glass-card rounded-2xl p-6 w-full max-w-md border border-[hsla(43,96%,56%,0.3)]"><div className="flex items-center justify-between mb-5"><h3 className="text-base font-semibold text-[hsl(185,20%,88%)]">Log New Session</h3><button onClick={() => setShowLogForm(false)}><X className="w-4 h-4" /></button></div><div className="space-y-3"><input placeholder="Client ID" className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm" /><input type="date" className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm" /><textarea placeholder="Clinical notes" rows={3} className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm resize-none" /></div><div className="flex gap-3 mt-5"><button onClick={() => setShowLogForm(false)} className="flex-1 py-2.5 rounded-xl border border-[hsla(185,30%,20%,0.8)] text-sm">Cancel</button><button onClick={() => setShowLogForm(false)} className="flex-1 py-2.5 rounded-xl bg-[hsl(43,96%,56%)] text-[hsl(195,55%,8%)] text-sm font-semibold">Save</button></div></div></div>}
    </div>
  );
}
