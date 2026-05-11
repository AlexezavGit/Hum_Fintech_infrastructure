import { useState } from "react";
import { useLocation } from "wouter";
import { Heart, ChevronLeft, CheckCircle, Clock, Shield, Send, Star, Smile, Frown, Meh, Calendar, DollarSign, MessageCircle, Brain, Activity, HelpCircle } from "lucide-react";

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
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

const who5 = [
  "I have felt cheerful and in good spirits",
  "I have felt calm and relaxed",
  "I have felt active and vigorous",
  "I woke up feeling fresh and rested",
  "My daily life has been filled with things that interest me",
];

const answers = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

export default function PortalBeneficiary() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (key: string, value: number) => setSelected((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-screen blueprint-bg">
      <header className="glass-card border-b border-[hsla(185,80%,60%,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/portal")} className="p-1.5 rounded-lg hover:bg-[hsla(185,100%,40%,0.1)] text-[hsl(185,15%,55%)]"><ChevronLeft className="w-4 h-4" /></button>
          <div className="w-8 h-8 rounded-lg bg-[hsla(185,100%,40%,0.15)] flex items-center justify-center"><Heart className="w-4 h-4 text-[hsl(185,100%,50%)]" /></div>
          <div><h1 className="text-sm font-semibold text-[hsl(185,20%,88%)]">Beneficiary Portal</h1><p className="text-xs text-[hsl(185,15%,45%)]">Screenings · sessions · funding · feedback</p></div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full badge-beneficiary text-xs"><Shield className="w-3 h-3" /><span>Confidential</span></div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.2)]">
          <h2 className="text-2xl font-bold teal-text mb-2">Hello, Iryna</h2>
          <p className="text-sm text-[hsl(185,15%,55%)]">Complete your mental health check-in, review your support plan, and send a funding request if needed.</p>
        </div>

        {submitted && <div className="glass-card rounded-2xl p-4 border border-[hsla(160,84%,39%,0.25)] flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[hsl(160,84%,50%)]" /><span className="text-sm text-[hsl(185,20%,88%)]">Your answers were saved.</span></div>}

        <section className="glass-card rounded-2xl p-6 border border-[hsla(185,100%,40%,0.2)] space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[hsl(185,20%,90%)] mb-1 flex items-center gap-2"><Brain className="w-4 h-4 text-[hsl(185,100%,50%)]" />GAD-7</h3>
            <p className="text-xs text-[hsl(185,15%,45%)] mb-4">Over the last 2 weeks, how often have you been bothered by the following problems?</p>
            <div className="space-y-3">
              {gad7.map((q, i) => (
                <div key={q} className="p-4 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)]">
                  <p className="text-sm text-[hsl(185,20%,85%)] mb-3">{i + 1}. {q}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {answers.map((a, idx) => (
                      <button key={a} onClick={() => setAnswer(`gad-${i}`, idx)} className={`text-xs rounded-lg px-2 py-2 border ${selected[`gad-${i}`] === idx ? "border-[hsl(185,100%,40%)] bg-[hsla(185,100%,40%,0.12)] text-[hsl(185,100%,60%)]" : "border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)]"}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[hsl(185,20%,90%)] mb-1 flex items-center gap-2"><Activity className="w-4 h-4 text-[hsl(43,96%,56%)]" />PHQ-9</h3>
            <p className="text-xs text-[hsl(185,15%,45%)] mb-4">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
            <div className="space-y-3">
              {phq9.map((q, i) => (
                <div key={q} className="p-4 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)]">
                  <p className="text-sm text-[hsl(185,20%,85%)] mb-3">{i + 1}. {q}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {answers.map((a, idx) => (
                      <button key={a} onClick={() => setAnswer(`phq-${i}`, idx)} className={`text-xs rounded-lg px-2 py-2 border ${selected[`phq-${i}`] === idx ? "border-[hsl(43,96%,56%)] bg-[hsla(43,96%,56%,0.12)] text-[hsl(43,96%,65%)]" : "border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)]"}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[hsl(185,20%,90%)] mb-1 flex items-center gap-2"><Smile className="w-4 h-4 text-[hsl(25,75%,60%)]" />WHO-5 Well-Being Index</h3>
            <p className="text-xs text-[hsl(185,15%,45%)] mb-4">Over the last 2 weeks, how often have you felt the following?</p>
            <div className="space-y-3">
              {who5.map((q, i) => (
                <div key={q} className="p-4 rounded-xl bg-[hsla(195,45%,9%,0.6)] border border-[hsla(185,30%,20%,0.5)]">
                  <p className="text-sm text-[hsl(185,20%,85%)] mb-3">{i + 1}. {q}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {answers.map((a, idx) => (
                      <button key={a} onClick={() => setAnswer(`who-${i}`, idx)} className={`text-xs rounded-lg px-2 py-2 border ${selected[`who-${i}`] === idx ? "border-[hsl(25,75%,52%)] bg-[hsla(25,75%,52%,0.12)] text-[hsl(25,75%,65%)]" : "border-[hsla(185,30%,20%,0.8)] text-[hsl(185,15%,55%)]"}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setSubmitted(true)} className="w-full py-3 rounded-xl bg-[hsl(185,100%,40%)] text-[hsl(195,55%,8%)] text-sm font-semibold">Submit screening</button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-[hsla(185,100%,40%,0.2)]"><Calendar className="w-5 h-5 text-[hsl(185,100%,50%)] mb-2" /><h4 className="font-semibold text-[hsl(185,20%,90%)]">My sessions</h4><p className="text-sm text-[hsl(185,15%,55%)]">Review therapy visits and upcoming appointments.</p></div>
          <div className="glass-card rounded-2xl p-5 border border-[hsla(43,96%,56%,0.2)]"><DollarSign className="w-5 h-5 text-[hsl(43,96%,60%)] mb-2" /><h4 className="font-semibold text-[hsl(185,20%,90%)]">Request funding</h4><p className="text-sm text-[hsl(185,15%,55%)]">Ask for session funding or convert need into a help request.</p></div>
          <div className="glass-card rounded-2xl p-5 border border-[hsla(25,75%,52%,0.2)]"><MessageCircle className="w-5 h-5 text-[hsl(25,75%,65%)] mb-2" /><h4 className="font-semibold text-[hsl(185,20%,90%)]">Feedback to donor</h4><p className="text-sm text-[hsl(185,15%,55%)]">Anonymous story for the circular feedback loop.</p></div>
        </section>
      </div>
    </div>
  );
}
