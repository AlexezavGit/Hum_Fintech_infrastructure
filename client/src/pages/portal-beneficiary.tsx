import { useState } from "react";
import { useLocation } from "wouter";
import {
  Heart, Calendar, MessageCircle, DollarSign, TrendingUp,
  ChevronLeft, CheckCircle, Clock, AlertCircle, Star,
  Send, FileText, Shield, Smile, Frown, Meh
} from "lucide-react";

const wellbeingOptions = [
  { score: 1, icon: Frown, label: "Very Difficult", color: "text-red-400" },
  { score: 2, icon: Frown, label: "Difficult", color: "text-orange-400" },
  { score: 3, icon: Meh, label: "Okay", color: "text-yellow-400" },
  { score: 4, icon: Smile, label: "Good", color: "text-teal-400" },
  { score: 5, icon: Smile, label: "Great", color: "text-green-400" },
];

export default function PortalBeneficiary() {
  const [, setLocation] = useLocation();
  const [wellbeing, setWellbeing] = useState<number | null>(null);
  const [fundingNote, setFundingNote] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);

  const sessions = [
    { date: "May 9, 2026", provider: "Dr. Olena Marchenko", duration: "50 min", type: "Individual therapy", status: "completed" },
    { date: "May 6, 2026", provider: "Dr. Olena Marchenko", duration: "50 min", type: "Individual therapy", status: "completed" },
    { date: "May 13, 2026", provider: "Dr. Olena Marchenko", duration: "50 min", type: "Individual therapy", status: "upcoming" },
  ];

  return (
    <div className="min-h-screen blueprint-bg">
      {/* Header */}
      <header className="glass-card border-b border-[hsla(185,80%,60%,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation("/portal")}
            className="p-1.5 rounded-lg hover:bg-[hsla(185,100%,40%,0.1)] text-[hsl(185,15%,55%)] hover:text-[hsl(185,100%,50%)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-[hsla(185,100%,40%,0.15)] flex items-center justify-center">
            <Heart className="w-4 h-4 text-[hsl(185,100%,50%)]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[hsl(185,20%,88%)]">My Safe Space</h1>
            <p className="text-xs text-[hsl(185,15%,45%)]">Beneficiary Portal · Confidential</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full badge-beneficiary text-xs">
          <Shield className="w-3 h-3" />
          <span>Secured</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Greeting */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.2)]">
          <h2 className="text-2xl font-bold teal-text mb-1">Hello, Iryna 👋</h2>
          <p className="text-[hsl(185,15%,55%)] text-sm">
            You've completed <strong className="text-[hsl(185,100%,50%)]">8 sessions</strong> in your recovery journey.
            Your next appointment is <strong className="text-[hsl(43,96%,60%)]">Tuesday, May 13</strong>.
          </p>
        </div>

        {/* Daily Check-in */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-1 flex items-center gap-2">
            <Star className="w-4 h-4 text-[hsl(43,96%,56%)]" />
            How are you feeling today?
          </h3>
          <p className="text-xs text-[hsl(185,15%,45%)] mb-4">Your check-in helps track your progress over time.</p>

          {!checkedIn ? (
            <>
              <div className="flex gap-3 mb-4">
                {wellbeingOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.score}
                      onClick={() => setWellbeing(opt.score)}
                      className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                        wellbeing === opt.score
                          ? "border-[hsl(185,100%,40%)] bg-[hsla(185,100%,40%,0.15)]"
                          : "border-[hsla(185,30%,20%,0.8)] bg-[hsla(195,45%,9%,0.5)] hover:border-[hsla(185,100%,40%,0.4)]"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${opt.color}`} />
                      <span className="text-xs text-[hsl(185,15%,55%)]">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
              {wellbeing && (
                <button
                  onClick={() => setCheckedIn(true)}
                  className="w-full py-2.5 rounded-xl bg-[hsl(185,100%,40%)] text-[hsl(195,55%,8%)] text-sm font-semibold hover:bg-[hsl(185,100%,35%)] transition-colors"
                >
                  Submit Check-in
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-[hsla(160,84%,39%,0.1)] border border-[hsla(160,84%,39%,0.3)]">
              <CheckCircle className="w-5 h-5 text-[hsl(160,84%,50%)]" />
              <span className="text-sm text-[hsl(160,84%,60%)]">Check-in recorded. Thank you for sharing!</span>
            </div>
          )}
        </div>

        {/* Sessions */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[hsl(185,100%,50%)]" />
            Your Sessions
          </h3>
          <div className="space-y-3">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)]">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    s.status === "completed"
                      ? "bg-[hsla(160,84%,39%,0.15)]"
                      : "bg-[hsla(43,96%,56%,0.15)]"
                  }`}>
                    {s.status === "completed"
                      ? <CheckCircle className="w-4 h-4 text-[hsl(160,84%,50%)]" />
                      : <Clock className="w-4 h-4 text-[hsl(43,96%,60%)]" />
                    }
                  </div>
                  <div>
                    <p className="text-sm text-[hsl(185,20%,85%)]">{s.date} · {s.duration}</p>
                    <p className="text-xs text-[hsl(185,15%,45%)]">{s.provider}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  s.status === "completed" ? "badge-beneficiary" : "badge-provider"
                }`}>
                  {s.status === "completed" ? "Done" : "Upcoming"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Request */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-1 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[hsl(43,96%,56%)]" />
            Request Support Funding
          </h3>
          <p className="text-xs text-[hsl(185,15%,45%)] mb-4">
            Need help covering the cost of your sessions? Describe your situation — our team will review and connect you with a matching program.
          </p>
          <textarea
            value={fundingNote}
            onChange={(e) => setFundingNote(e.target.value)}
            placeholder="Briefly describe your need (e.g., I am a displaced person from Kherson, currently without income, seeking 12 sessions of therapy...)"
            rows={3}
            className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-3 text-sm text-[hsl(185,20%,80%)] placeholder-[hsl(185,15%,35%)] resize-none focus:outline-none focus:border-[hsl(185,100%,40%)] transition-colors mb-3"
          />
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsla(43,96%,56%,0.15)] border border-[hsla(43,96%,56%,0.3)] text-[hsl(43,96%,65%)] text-sm font-medium hover:bg-[hsla(43,96%,56%,0.25)] transition-colors">
            <Send className="w-3.5 h-3.5" />
            Submit Funding Request
          </button>
        </div>

        {/* Feedback to Donor */}
        <div className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.2)]">
          <h3 className="text-base font-semibold text-[hsl(185,20%,88%)] mb-1 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[hsl(25,75%,60%)]" />
            Share Your Story
          </h3>
          <p className="text-xs text-[hsl(185,15%,45%)] mb-4">
            Your anonymous feedback reaches donors and shows the real impact of their support. You decide what to share.
          </p>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="How has therapy helped you? What changed for you? (Anonymous, your name will never appear)"
            rows={3}
            className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-3 text-sm text-[hsl(185,20%,80%)] placeholder-[hsl(185,15%,35%)] resize-none focus:outline-none focus:border-[hsl(185,100%,40%)] transition-colors mb-3"
          />
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsla(25,75%,52%,0.15)] border border-[hsla(25,75%,52%,0.3)] text-[hsl(25,75%,65%)] text-sm font-medium hover:bg-[hsla(25,75%,52%,0.25)] transition-colors">
            <Send className="w-3.5 h-3.5" />
            Send Anonymously
          </button>
        </div>
      </div>

      {/* Rainbow Footer */}
      <footer className="mt-8">
        <div className="h-0.5 rainbow-gradient" />
      </footer>
    </div>
  );
}
