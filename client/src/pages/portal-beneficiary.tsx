import { useState } from "react";
import { useLocation } from "wouter";
import {
  Heart, ChevronLeft, ChevronDown, ChevronUp, Shield, Calendar, Users, DollarSign,
  FileText, Settings, Bell, ClipboardList, Star, MessageCircle, Clock, MapPin,
  Phone, CheckCircle, XCircle, AlertCircle, User, Plus, ArrowRight, Home,
  Activity, Brain, Smile
} from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "therapists", label: "Therapists", icon: Users },
  { id: "payments", label: "Payments", icon: DollarSign },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const gad7 = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];
const phq9 = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself",
  "Trouble concentrating on things",
  "Moving or speaking so slowly others could have noticed",
  "Thoughts that you would be better off dead",
];
const who5 = [
  "I have felt cheerful and in good spirits",
  "I have felt calm and relaxed",
  "I have felt active and vigorous",
  "I woke up feeling fresh and rested",
  "My daily life has been filled with things that interest me",
];
const answers = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const therapists = [
  { id: 1, name: "Dr. Olena Kovalenko", spec: "Trauma & PTSD", exp: "12 years", lang: ["UA", "EN"], rating: 4.9, reviews: 47, next: "Today 16:00", available: true },
  { id: 2, name: "Dr. Mykhailo Bondar", spec: "CBT, Anxiety", exp: "8 years", lang: ["UA"], rating: 4.7, reviews: 31, next: "Tomorrow 10:00", available: true },
  { id: 3, name: "Dr. Iryna Savchenko", spec: "Family & Grief", exp: "15 years", lang: ["UA", "RU", "EN"], rating: 4.8, reviews: 62, next: "May 13 14:00", available: false },
];

const appointments = [
  { id: "A-001", therapist: "Dr. Olena Kovalenko", date: "May 12, 2026", time: "16:00", type: "Video", status: "confirmed" },
  { id: "A-002", therapist: "Dr. Mykhailo Bondar", date: "May 7, 2026", time: "10:00", type: "Video", status: "completed" },
  { id: "A-003", therapist: "Dr. Olena Kovalenko", date: "Apr 30, 2026", time: "16:00", type: "Video", status: "completed" },
];

const payments = [
  { id: "P-001", date: "May 7, 2026", desc: "Session — Dr. Bondar", amount: 800, status: "paid", source: "Program funds" },
  { id: "P-002", date: "Apr 30, 2026", desc: "Session — Dr. Kovalenko", amount: 950, status: "paid", source: "Personal" },
  { id: "P-003", date: "May 12, 2026", desc: "Upcoming session", amount: 950, status: "pending", source: "Program funds" },
];

export default function PortalBeneficiary() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [screeningOpen, setScreeningOpen] = useState(false);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [screeningSubmitted, setScreeningSubmitted] = useState(false);
  const [bookingTherapist, setBookingTherapist] = useState<number | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [reminders, setReminders] = useState({ email: true, sms: false, app: true });
  const [reminderTime, setReminderTime] = useState("24h");

  const setAnswer = (key: string, value: number) => setSelected(prev => ({ ...prev, [key]: value }));

  const gadScore = gad7.reduce((s, _, i) => s + (selected[`gad-${i}`] ?? 0), 0);
  const phqScore = phq9.reduce((s, _, i) => s + (selected[`phq-${i}`] ?? 0), 0);
  const whoScore = who5.reduce((s, _, i) => s + (selected[`who-${i}`] ?? 0), 0);

  return (
    <div className="min-h-screen blueprint-bg">
      {/* Header */}
      <header className="glass-card border-b border-[hsla(185,80%,60%,0.15)] px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/portal")} className="p-1.5 rounded-lg hover:bg-[hsla(185,100%,40%,0.1)] text-[hsl(185,15%,55%)]"><ChevronLeft className="w-4 h-4" /></button>
          <div className="w-8 h-8 rounded-lg bg-[hsla(185,100%,40%,0.15)] flex items-center justify-center"><Heart className="w-4 h-4 text-[hsl(185,100%,50%)]" /></div>
          <div>
            <h1 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Beneficiary Portal</h1>
            <p className="text-xs text-[hsl(185,15%,45%)]">Iryna M. · ID #B-2847</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full badge-beneficiary text-xs"><Shield className="w-3 h-3" /><span>Confidential</span></div>
          <button className="relative p-2 rounded-lg hover:bg-[hsla(185,100%,40%,0.1)]"><Bell className="w-4 h-4 text-[hsl(185,15%,55%)]" /><span className="absolute top-1 right-1 w-2 h-2 bg-[hsl(25,75%,52%)] rounded-full"></span></button>
        </div>
      </header>

      {/* Tabs */}
      <div className="glass-card border-b border-[hsla(185,30%,20%,0.5)] px-6 flex gap-1 overflow-x-auto">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? "border-[hsl(185,100%,40%)] text-[hsl(185,100%,60%)]" : "border-transparent text-[hsl(185,15%,50%)] hover:text-[hsl(185,15%,75%)]"}`}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          );
        })}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-5">
            <div className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.2)]">
              <h2 className="text-xl font-bold teal-text mb-1">Good evening, Iryna</h2>
              <p className="text-sm text-[hsl(185,15%,55%)]">Your recovery journey is tracked and supported. Here's your current status.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { l: "Sessions done", v: "8", icon: Calendar, color: "text-[hsl(185,100%,50%)]" },
                { l: "Next session", v: "Today", icon: Clock, color: "text-[hsl(43,96%,60%)]" },
                { l: "Funded", v: "₴7,600", icon: DollarSign, color: "text-[hsl(160,84%,50%)]" },
                { l: "Recovery trend", v: "+12%", icon: Activity, color: "text-[hsl(25,75%,65%)]" },
              ].map(s => {
                const Icon = s.icon;
                return <div key={s.l} className="glass-card rounded-xl p-4 border border-[hsla(185,30%,20%,0.5)]"><Icon className={`w-4 h-4 ${s.color} mb-2`} /><p className={`text-xl font-bold ${s.color}`}>{s.v}</p><p className="text-xs text-[hsl(185,15%,45%)]">{s.l}</p></div>;
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5 border border-[hsla(185,100%,40%,0.2)]">
                <h3 className="text-sm font-semibold text-[hsl(185,20%,88%)] mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-[hsl(185,100%,50%)]" />Next appointment</h3>
                <div className="bg-[hsla(195,45%,9%,0.6)] rounded-xl p-4 border border-[hsla(185,30%,20%,0.5)]">
                  <p className="font-semibold text-[hsl(185,20%,90%)]">Dr. Olena Kovalenko</p>
                  <p className="text-sm text-[hsl(185,15%,55%)]">Today · 16:00 · Video call</p>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1.5 rounded-lg bg-[hsl(185,100%,40%)] text-[hsl(195,55%,8%)] text-xs font-semibold">Join call</button>
                    <button className="px-3 py-1.5 rounded-lg border border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)] text-xs">Reschedule</button>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-[hsla(43,96%,56%,0.2)]">
                <h3 className="text-sm font-semibold text-[hsl(185,20%,88%)] mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-[hsl(43,96%,56%)]" />Screening scores</h3>
                {screeningSubmitted ? (
                  <div className="space-y-2">
                    {[{ l: "GAD-7 (Anxiety)", v: gadScore, max: 21 }, { l: "PHQ-9 (Depression)", v: phqScore, max: 27 }, { l: "WHO-5 (Wellbeing)", v: whoScore, max: 10 }].map(s => (
                      <div key={s.l}>
                        <div className="flex justify-between text-xs text-[hsl(185,15%,55%)] mb-1"><span>{s.l}</span><span>{s.v}/{s.max}</span></div>
                        <div className="h-1.5 bg-[hsla(185,30%,20%,0.5)] rounded-full overflow-hidden"><div className="h-full bg-[hsl(185,100%,40%)] rounded-full" style={{ width: `${(s.v / s.max) * 100}%` }} /></div>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-[hsl(185,15%,55%)]">Complete the screening below to see your scores.</p>}
              </div>
            </div>

            {/* Collapsible Screening */}
            <div className="glass-card rounded-2xl border border-[hsla(185,30%,20%,0.5)] overflow-hidden">
              <button onClick={() => setScreeningOpen(v => !v)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[hsla(185,100%,40%,0.05)]">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-[hsl(185,100%,50%)]" />
                  <div>
                    <h3 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Mental health screening (GAD-7 · PHQ-9 · WHO-5)</h3>
                    <p className="text-xs text-[hsl(185,15%,45%)]">{screeningSubmitted ? "Last completed today · tap to update" : "Fill once every 2 weeks · takes ~5 min"}</p>
                  </div>
                </div>
                {screeningOpen ? <ChevronUp className="w-4 h-4 text-[hsl(185,15%,45%)]" /> : <ChevronDown className="w-4 h-4 text-[hsl(185,15%,45%)]" />}
              </button>

              {screeningOpen && (
                <div className="px-6 pb-6 space-y-6 border-t border-[hsla(185,30%,20%,0.5)]">
                  {[
                    { key: "gad", title: "GAD-7 — Anxiety", color: "hsl(185,100%,40%)", questions: gad7 },
                    { key: "phq", title: "PHQ-9 — Depression", color: "hsl(43,96%,56%)", questions: phq9 },
                    { key: "who", title: "WHO-5 — Wellbeing", color: "hsl(25,75%,52%)", questions: who5 },
                  ].map(section => (
                    <div key={section.key} className="mt-4">
                      <h4 className="text-sm font-semibold mb-3" style={{ color: section.color }}>{section.title}</h4>
                      <p className="text-xs text-[hsl(185,15%,45%)] mb-3">Over the last 2 weeks, how often have you been bothered by:</p>
                      <div className="space-y-2">
                        {section.questions.map((q, i) => (
                          <div key={q} className="p-3 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)]">
                            <p className="text-xs text-[hsl(185,20%,80%)] mb-2">{i + 1}. {q}</p>
                            <div className="grid grid-cols-4 gap-1.5">
                              {answers.map((a, idx) => (
                                <button key={a} onClick={() => setAnswer(`${section.key}-${i}`, idx)} className={`text-[10px] rounded-lg px-1.5 py-1.5 border leading-tight ${selected[`${section.key}-${i}`] === idx ? "border-[hsl(185,100%,40%)] bg-[hsla(185,100%,40%,0.12)] text-[hsl(185,100%,60%)]" : "border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)]"}`}>{a}</button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => { setScreeningSubmitted(true); setScreeningOpen(false); }} className="w-full py-3 rounded-xl bg-[hsl(185,100%,40%)] text-[hsl(195,55%,8%)] text-sm font-semibold mt-2">Submit screening</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold teal-text">My Appointments</h2>
              <button onClick={() => setActiveTab("therapists")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(185,100%,40%)] text-[hsl(195,55%,8%)] text-sm font-semibold"><Plus className="w-4 h-4" />Book new</button>
            </div>
            {appointments.map(apt => (
              <div key={apt.id} className="glass-card rounded-2xl p-5 border border-[hsla(185,30%,20%,0.5)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[hsl(185,20%,90%)]">{apt.therapist}</p>
                    <p className="text-sm text-[hsl(185,15%,55%)]">{apt.date} · {apt.time} · {apt.type}</p>
                    <p className="text-xs text-[hsl(185,15%,40%)] mt-1">ID: {apt.id}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${apt.status === "confirmed" ? "bg-[hsla(185,100%,40%,0.15)] text-[hsl(185,100%,60%)]" : apt.status === "completed" ? "bg-[hsla(160,84%,39%,0.15)] text-[hsl(160,84%,55%)]" : "bg-[hsla(43,96%,56%,0.15)] text-[hsl(43,96%,60%)]"}`}>
                    {apt.status === "confirmed" ? <CheckCircle className="w-3 h-3" /> : apt.status === "completed" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {apt.status}
                  </div>
                </div>
                {apt.status === "confirmed" && (
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 rounded-xl bg-[hsl(185,100%,40%)] text-[hsl(195,55%,8%)] text-sm font-semibold">Join call</button>
                    <button className="px-4 py-2 rounded-xl border border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)] text-sm">Reschedule</button>
                    <button className="px-4 py-2 rounded-xl border border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)] text-sm">Cancel</button>
                  </div>
                )}
                {apt.status === "completed" && feedbackOpen !== apt.id && (
                  <button onClick={() => setFeedbackOpen(apt.id)} className="mt-3 text-xs text-[hsl(43,96%,60%)] flex items-center gap-1"><MessageCircle className="w-3 h-3" />Leave feedback</button>
                )}
                {feedbackOpen === apt.id && (
                  <div className="mt-4 p-4 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)] space-y-3">
                    <p className="text-xs text-[hsl(185,15%,55%)]">Rate this session:</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(n => <button key={n} onClick={() => setFeedbackRating(n)}><Star className={`w-6 h-6 ${n <= feedbackRating ? "text-[hsl(43,96%,56%)] fill-[hsl(43,96%,56%)]" : "text-[hsl(185,15%,40%)]"}`} /></button>)}
                    </div>
                    <textarea value={feedbackText} onChange={e => setFeedbackText(e.target.value)} rows={2} placeholder="Your feedback (anonymous to donor, visible to provider)…" className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-3 py-2 text-xs resize-none text-[hsl(185,20%,85%)]" />
                    <div className="flex gap-2">
                      <button onClick={() => setFeedbackOpen(null)} className="flex-1 py-2 rounded-xl border border-[hsla(185,30%,20%,0.8)] text-xs text-[hsl(185,15%,55%)]">Cancel</button>
                      <button onClick={() => setFeedbackOpen(null)} className="flex-1 py-2 rounded-xl bg-[hsl(43,96%,56%)] text-[hsl(195,55%,8%)] text-xs font-semibold">Send feedback</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* THERAPISTS */}
        {activeTab === "therapists" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold teal-text">Choose a Therapist</h2>
            <div className="glass-card rounded-2xl p-4 border border-[hsla(185,30%,20%,0.5)]">
              <p className="text-xs text-[hsl(185,15%,50%)]">All specialists are verified. Sessions funded by your active program.</p>
            </div>
            {therapists.map(t => (
              <div key={t.id} className={`glass-card rounded-2xl p-5 border ${bookingTherapist === t.id ? "border-[hsl(185,100%,40%)]" : "border-[hsla(185,30%,20%,0.5)]"}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[hsla(185,100%,40%,0.15)] flex items-center justify-center flex-shrink-0"><User className="w-6 h-6 text-[hsl(185,100%,50%)]" /></div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[hsl(185,20%,90%)]">{t.name}</p>
                        <p className="text-sm text-[hsl(185,15%,55%)]">{t.spec} · {t.exp} experience</p>
                        <div className="flex items-center gap-2 mt-1">
                          {t.lang.map(l => <span key={l} className="text-[10px] px-1.5 py-0.5 rounded badge-beneficiary">{l}</span>)}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 justify-end"><Star className="w-3.5 h-3.5 text-[hsl(43,96%,56%)] fill-[hsl(43,96%,56%)]" /><span className="text-sm font-bold text-[hsl(43,96%,60%)]">{t.rating}</span></div>
                        <p className="text-xs text-[hsl(185,15%,45%)]">{t.reviews} reviews</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1.5 text-xs text-[hsl(185,15%,55%)]"><Clock className="w-3 h-3" />Next: {t.next}</div>
                      <div className={`flex items-center gap-1 text-xs ${t.available ? "text-[hsl(160,84%,50%)]" : "text-[hsl(185,15%,45%)]"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${t.available ? "bg-[hsl(160,84%,50%)]" : "bg-[hsl(185,15%,40%)]"}`}></span>
                        {t.available ? "Available" : "Busy"}
                      </div>
                    </div>
                    {bookingTherapist === t.id ? (
                      <div className="mt-4 p-4 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,100%,40%,0.2)] space-y-3">
                        <p className="text-xs text-[hsl(185,15%,55%)]">Choose a time slot:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {["Today 16:00", "Today 18:00", "Tomorrow 10:00", "Tomorrow 14:00", "May 13 11:00", "May 13 15:00"].map(slot => (
                            <button key={slot} className="py-2 px-3 rounded-lg border border-[hsla(185,100%,40%,0.3)] text-xs text-[hsl(185,100%,60%)] hover:bg-[hsla(185,100%,40%,0.1)]">{slot}</button>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => setBookingTherapist(null)} className="flex-1 py-2 rounded-xl border border-[hsla(185,30%,20%,0.8)] text-xs text-[hsl(185,15%,55%)]">Cancel</button>
                          <button onClick={() => { setBookingTherapist(null); setActiveTab("appointments"); }} className="flex-1 py-2 rounded-xl bg-[hsl(185,100%,40%)] text-[hsl(195,55%,8%)] text-xs font-semibold">Confirm booking</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setBookingTherapist(t.id)} className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5" />Book appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAYMENTS */}
        {activeTab === "payments" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold teal-text">Payments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card rounded-2xl p-5 border border-[hsla(160,84%,39%,0.2)]"><DollarSign className="w-5 h-5 text-[hsl(160,84%,50%)] mb-2" /><p className="text-2xl font-black text-[hsl(160,84%,50%)]">₴7,600</p><p className="text-xs text-[hsl(185,15%,45%)]">Funded by program</p></div>
              <div className="glass-card rounded-2xl p-5 border border-[hsla(43,96%,56%,0.2)]"><DollarSign className="w-5 h-5 text-[hsl(43,96%,60%)] mb-2" /><p className="text-2xl font-black text-[hsl(43,96%,60%)]">₴950</p><p className="text-xs text-[hsl(185,15%,45%)]">Pending (next session)</p></div>
              <div className="glass-card rounded-2xl p-5 border border-[hsla(185,100%,40%,0.2)]"><DollarSign className="w-5 h-5 text-[hsl(185,100%,50%)] mb-2" /><p className="text-2xl font-black teal-text">₴5,000</p><p className="text-xs text-[hsl(185,15%,45%)]">Remaining balance</p></div>
            </div>
            <div className="glass-card rounded-2xl border border-[hsla(185,30%,20%,0.5)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[hsla(185,30%,20%,0.5)]"><h3 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Transaction history</h3></div>
              {payments.map(p => (
                <div key={p.id} className="px-5 py-4 flex items-center justify-between border-b border-[hsla(185,30%,20%,0.3)] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[hsl(185,20%,88%)]">{p.desc}</p>
                    <p className="text-xs text-[hsl(185,15%,45%)]">{p.date} · {p.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[hsl(185,20%,90%)]">₴{p.amount}</p>
                    <span className={`text-xs ${p.status === "paid" ? "text-[hsl(160,84%,50%)]" : "text-[hsl(43,96%,60%)]"}`}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REPORTS */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold teal-text">My Reports</h2>
            {[
              { title: "Progress report — April 2026", date: "May 1, 2026", type: "Monthly", status: "Ready" },
              { title: "Screening report — GAD-7 + PHQ-9", date: "Apr 14, 2026", type: "Screening", status: "Ready" },
              { title: "Session summary — 8 sessions", date: "Mar 31, 2026", type: "Summary", status: "Ready" },
            ].map(r => (
              <div key={r.title} className="glass-card rounded-2xl p-5 border border-[hsla(185,30%,20%,0.5)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[hsla(185,100%,40%,0.15)] flex items-center justify-center"><FileText className="w-5 h-5 text-[hsl(185,100%,50%)]" /></div>
                  <div>
                    <p className="text-sm font-semibold text-[hsl(185,20%,88%)]">{r.title}</p>
                    <p className="text-xs text-[hsl(185,15%,45%)]">{r.date} · {r.type}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-xs">Download</button>
              </div>
            ))}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold teal-text">Settings</h2>

            <div className="glass-card rounded-2xl p-6 border border-[hsla(185,30%,20%,0.5)] space-y-4">
              <h3 className="text-sm font-semibold text-[hsl(185,20%,88%)] flex items-center gap-2"><Bell className="w-4 h-4 text-[hsl(185,100%,50%)]" />Reminders</h3>
              <div className="space-y-3">
                {[{ key: "email", label: "Email reminders" }, { key: "sms", label: "SMS reminders" }, { key: "app", label: "In-app push" }].map(r => (
                  <div key={r.key} className="flex items-center justify-between">
                    <span className="text-sm text-[hsl(185,15%,65%)]">{r.label}</span>
                    <button onClick={() => setReminders(prev => ({ ...prev, [r.key]: !prev[r.key as keyof typeof prev] }))} className={`w-10 h-5 rounded-full transition-colors relative ${reminders[r.key as keyof typeof reminders] ? "bg-[hsl(185,100%,40%)]" : "bg-[hsla(185,30%,20%,0.8)]"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${reminders[r.key as keyof typeof reminders] ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-[hsl(185,15%,65%)] mb-2">Remind me before appointment:</p>
                <div className="flex gap-2">
                  {["1h", "3h", "24h", "48h"].map(t => (
                    <button key={t} onClick={() => setReminderTime(t)} className={`px-3 py-1.5 rounded-lg text-xs border ${reminderTime === t ? "border-[hsl(185,100%,40%)] bg-[hsla(185,100%,40%,0.12)] text-[hsl(185,100%,60%)]" : "border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)]"}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[hsla(185,30%,20%,0.5)] space-y-4">
              <h3 className="text-sm font-semibold text-[hsl(185,20%,88%)] flex items-center gap-2"><User className="w-4 h-4 text-[hsl(43,96%,56%)]" />Registration & profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{ l: "Full name", v: "Iryna Marchenko" }, { l: "Date of birth", v: "1988-06-14" }, { l: "Contact", v: "+38 097 *** **11" }, { l: "Program ID", v: "PROG-2026-047" }].map(f => (
                  <div key={f.l}>
                    <p className="text-xs text-[hsl(185,15%,45%)] mb-1">{f.l}</p>
                    <div className="px-3 py-2 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)] text-sm text-[hsl(185,20%,80%)]">{f.v}</div>
                  </div>
                ))}
              </div>
              <button className="px-4 py-2 rounded-xl bg-[hsla(43,96%,56%,0.15)] border border-[hsla(43,96%,56%,0.3)] text-[hsl(43,96%,60%)] text-sm">Request data update</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
