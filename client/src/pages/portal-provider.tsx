import { useState } from "react";
import { useLocation } from "wouter";
import {
  Stethoscope, Clock, FileText, DollarSign, Users,
  ChevronLeft, Plus, CheckCircle, TrendingUp, BarChart3,
  Download, AlertCircle, Calendar, X
} from "lucide-react";

export default function PortalProvider() {
  const [, setLocation] = useLocation();
  const [showLogForm, setShowLogForm] = useState(false);
  const [sessionData, setSessionData] = useState({
    client: "",
    date: "",
    duration: "50",
    type: "individual",
    notes: "",
    symptoms: "3",
  });

  const sessions = [
    { client: "Client #A-04", date: "May 9", duration: 50, type: "Individual", outcome: 4, paid: true },
    { client: "Client #A-07", date: "May 9", duration: 50, type: "Individual", outcome: 3, paid: true },
    { client: "Client #B-02", date: "May 8", duration: 90, type: "Group (6)", outcome: 4, paid: false },
    { client: "Client #A-04", date: "May 6", duration: 50, type: "Individual", outcome: 3, paid: true },
    { client: "Client #C-01", date: "May 5", duration: 50, type: "Individual", outcome: 2, paid: true },
  ];

  const stats = [
    { label: "Sessions this month", value: "23", icon: Clock, color: "text-[hsl(185,100%,50%)]", bg: "bg-[hsla(185,100%,40%,0.12)]" },
    { label: "Total hours", value: "19.2h", icon: BarChart3, color: "text-[hsl(43,96%,60%)]", bg: "bg-[hsla(43,96%,56%,0.12)]" },
    { label: "Active clients", value: "11", icon: Users, color: "text-[hsl(160,84%,50%)]", bg: "bg-[hsla(160,84%,39%,0.12)]" },
    { label: "Pending payment", value: "₴4,800", icon: DollarSign, color: "text-[hsl(25,75%,65%)]", bg: "bg-[hsla(25,75%,52%,0.12)]" },
  ];

  return (
    <div className="min-h-screen blueprint-bg">
      {/* Header */}
      <header className="glass-card border-b border-[hsla(185,80%,60%,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/portal")}
            className="p-1.5 rounded-lg hover:bg-[hsla(43,96%,56%,0.1)] text-[hsl(185,15%,55%)] hover:text-[hsl(43,96%,60%)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-[hsla(43,96%,56%,0.15)] flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-[hsl(43,96%,60%)]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Clinical Workspace</h1>
            <p className="text-xs text-[hsl(185,15%,45%)]">Provider Portal · mhGAP Compliant</p>
          </div>
        </div>
        <button
          onClick={() => setShowLogForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(43,96%,56%)] text-[hsl(195,55%,8%)] text-sm font-semibold hover:bg-[hsl(43,96%,50%)] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log Session
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Welcome */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(43,96%,56%,0.2)]">
          <h2 className="text-2xl font-bold gold-text mb-1">Dr. Marchenko's Workspace</h2>
          <p className="text-[hsl(185,15%,55%)] text-sm">
            Clinical Psychologist · Licensed #UA-2021-0487 · <span className="text-[hsl(185,100%,50%)]">mhGAP Level II</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => {
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

        {/* Session Log */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(43,96%,56%,0.2)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[hsl(43,96%,56%)]" />
              Recent Sessions
            </h3>
            <button className="flex items-center gap-1.5 text-xs text-[hsl(185,15%,45%)] hover:text-[hsl(185,100%,50%)] transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export mhGAP Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsla(185,30%,20%,0.5)]">
                  <th className="pb-2 text-left text-xs text-[hsl(185,15%,40%)] font-medium">Client</th>
                  <th className="pb-2 text-left text-xs text-[hsl(185,15%,40%)] font-medium">Date</th>
                  <th className="pb-2 text-left text-xs text-[hsl(185,15%,40%)] font-medium">Duration</th>
                  <th className="pb-2 text-left text-xs text-[hsl(185,15%,40%)] font-medium">Type</th>
                  <th className="pb-2 text-left text-xs text-[hsl(185,15%,40%)] font-medium">Outcome</th>
                  <th className="pb-2 text-left text-xs text-[hsl(185,15%,40%)] font-medium">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsla(185,30%,20%,0.3)]">
                {sessions.map((s, i) => (
                  <tr key={i}>
                    <td className="py-2.5 text-[hsl(185,20%,75%)]">{s.client}</td>
                    <td className="py-2.5 text-[hsl(185,15%,50%)]">{s.date}</td>
                    <td className="py-2.5 text-[hsl(185,15%,50%)]">{s.duration} min</td>
                    <td className="py-2.5 text-[hsl(185,15%,50%)]">{s.type}</td>
                    <td className="py-2.5">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((n) => (
                          <div key={n} className={`w-2 h-2 rounded-full ${n <= s.outcome ? "bg-[hsl(160,84%,39%)]" : "bg-[hsla(185,30%,20%,0.8)]"}`} />
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5">
                      {s.paid
                        ? <span className="badge-beneficiary text-xs px-2 py-0.5 rounded-full">Paid</span>
                        : <span className="badge-donor text-xs px-2 py-0.5 rounded-full">Pending</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* mhGAP Auto-Report */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(43,96%,56%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-1 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[hsl(43,96%,56%)]" />
            Automated mhGAP Report — May 2026
          </h3>
          <p className="text-xs text-[hsl(185,15%,45%)] mb-4">Auto-generated from your session logs. Ready for submission to program coordinators.</p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Depression (F32)", count: 6, trend: "+1" },
              { label: "PTSD (F43.1)", count: 8, trend: "-2" },
              { label: "Anxiety (F41)", count: 5, trend: "=" },
            ].map((d) => (
              <div key={d.label} className="bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)] rounded-xl p-3">
                <p className="text-xs text-[hsl(185,15%,45%)] mb-1">{d.label}</p>
                <p className="text-lg font-bold text-[hsl(185,20%,88%)]">{d.count} <span className="text-xs text-[hsl(185,15%,45%)]">clients</span></p>
                <p className="text-xs text-[hsl(160,84%,50%)]">Change: {d.trend}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsla(43,96%,56%,0.15)] border border-[hsla(43,96%,56%,0.3)] text-[hsl(43,96%,65%)] text-sm font-medium hover:bg-[hsla(43,96%,56%,0.25)] transition-colors">
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-sm font-medium hover:bg-[hsla(185,100%,40%,0.25)] transition-colors">
              <CheckCircle className="w-3.5 h-3.5" />
              Submit to Coordinator
            </button>
          </div>
        </div>
      </div>

      {/* Log Session Modal */}
      {showLogForm && (
        <div className="fixed inset-0 z-50 bg-[hsla(195,55%,5%,0.85)] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md border border-[hsla(43,96%,56%,0.3)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[hsl(43,96%,56%)]" />
                Log New Session
              </h3>
              <button onClick={() => setShowLogForm(false)} className="text-[hsl(185,15%,45%)] hover:text-[hsl(185,20%,80%)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[hsl(185,15%,45%)] mb-1 block">Client ID</label>
                <input
                  value={sessionData.client}
                  onChange={(e) => setSessionData({...sessionData, client: e.target.value})}
                  placeholder="e.g. Client #A-04"
                  className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm text-[hsl(185,20%,80%)] placeholder-[hsl(185,15%,35%)] focus:outline-none focus:border-[hsl(43,96%,56%)] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[hsl(185,15%,45%)] mb-1 block">Date</label>
                  <input
                    type="date"
                    value={sessionData.date}
                    onChange={(e) => setSessionData({...sessionData, date: e.target.value})}
                    className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm text-[hsl(185,20%,80%)] focus:outline-none focus:border-[hsl(43,96%,56%)] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[hsl(185,15%,45%)] mb-1 block">Duration (min)</label>
                  <select
                    value={sessionData.duration}
                    onChange={(e) => setSessionData({...sessionData, duration: e.target.value})}
                    className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm text-[hsl(185,20%,80%)] focus:outline-none focus:border-[hsl(43,96%,56%)] transition-colors"
                  >
                    <option value="30">30 min</option>
                    <option value="50">50 min</option>
                    <option value="90">90 min (group)</option>
                    <option value="120">120 min</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-[hsl(185,15%,45%)] mb-1 block">Symptom Severity (1–5)</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setSessionData({...sessionData, symptoms: String(n)})}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        sessionData.symptoms === String(n)
                          ? "bg-[hsl(43,96%,56%)] text-[hsl(195,55%,8%)]"
                          : "bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-[hsl(185,15%,45%)] mb-1 block">Clinical Notes (optional)</label>
                <textarea
                  value={sessionData.notes}
                  onChange={(e) => setSessionData({...sessionData, notes: e.target.value})}
                  placeholder="Key observations, interventions used..."
                  rows={2}
                  className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm text-[hsl(185,20%,80%)] placeholder-[hsl(185,15%,35%)] resize-none focus:outline-none focus:border-[hsl(43,96%,56%)] transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowLogForm(false)}
                className="flex-1 py-2.5 rounded-xl border border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)] text-sm hover:border-[hsla(185,30%,35%,0.8)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowLogForm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[hsl(43,96%,56%)] text-[hsl(195,55%,8%)] text-sm font-semibold hover:bg-[hsl(43,96%,50%)] transition-colors"
              >
                Save Session
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8">
        <div className="h-0.5 rainbow-gradient" />
      </footer>
    </div>
  );
}
