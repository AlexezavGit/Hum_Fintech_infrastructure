import { useState, useRef } from "react";
import { useLocation } from "wouter";
import FeelLogo from "@/components/FeelLogo";
import { Heart, Brain, Shield, Users, ArrowRight, ChevronRight, CheckCircle2, Clock, Calendar, Phone, Globe, DollarSign, Activity, Star, Video, MessageCircle, FileText, ShieldCheck, AlertCircle, Play, Pause, Send, Mic, Camera, VideoIcon, Lock } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";
const TEAL = "#2DD4BF";

const liveStats = [
  { value: "2,847", label: "People in support", color: "hsl(270,60%,65%)" },
  { value: "124", label: "Available specialists", color: "hsl(160,84%,50%)" },
  { value: "68%", label: "Recovery rate", color: "hsl(185,100%,50%)" },
  { value: "0", label: "Upfront cost", color: GOLD },
];

const helpTypes = [
  { icon: Brain, title: "Individual therapy", desc: "One-on-one sessions with a licensed psychologist. Online or in-person.", duration: "50 min", format: "Video / In-person" },
  { icon: Users, title: "Group support", desc: "Thematic support groups: grief, trauma, anxiety, family conflicts.", duration: "90 min", format: "Video / Offline" },
  { icon: MessageCircle, title: "Chat support", desc: "Daily text support with a specialist. Quick questions, crisis moments.", duration: "24/7", format: "Text" },
  { icon: Phone, title: "Crisis line", desc: "Immediate phone support for acute situations. Always available.", duration: "15 min", format: "Phone" },
  { icon: VideoIcon, title: "Video consultations", desc: "Initial consultations, follow-ups, supervision with video recording.", duration: "30 min", format: "Video" },
  { icon: FileText, title: "Self-guided programs", desc: "Structured courses with exercises, diaries, and progress tracking.", duration: "4-12 weeks", format: "App" },
];

const specialists = [
  { name: "Dr. Olena Kovalenko", spec: "Trauma & PTSD", lang: ["UA", "EN"], rating: 4.9, reviews: 47, next: "Today 16:00", available: true, license: "Verified", video: true, photo: true, price: "₴800" },
  { name: "Dr. Mykhailo Bondar", spec: "CBT, Anxiety", lang: ["UA"], rating: 4.7, reviews: 31, next: "Tomorrow 10:00", available: true, license: "Verified", video: true, photo: true, price: "₴650" },
  { name: "Dr. Iryna Savchenko", spec: "Family & Grief", lang: ["UA", "RU", "EN"], rating: 4.8, reviews: 62, next: "May 13 14:00", available: false, license: "Verified", video: true, photo: true, price: "₴900" },
  { name: "Dr. Andriy Melnyk", spec: "Addiction & Recovery", lang: ["UA", "EN"], rating: 4.9, reviews: 28, next: "Today 18:00", available: true, license: "Verified", video: false, photo: true, price: "₴750" },
];

const screeningSteps = [
  { step: 1, title: "Quick self-check", desc: "Answer 10 questions about your current state. Takes 2 minutes.", icon: CheckCircle2 },
  { step: 2, title: "Video introduction", desc: "Record a short video (1-2 min) about what brings you here. Optional but helps specialists understand your needs.", icon: Video },
  { step: 3, title: "Platform screening", desc: "AI-assisted analysis + professional review. Results in 24 hours.", icon: Brain },
  { step: 4, title: "Personal plan", desc: "Receive a tailored recovery plan with recommended specialists and formats.", icon: FileText },
];

const recoverySteps = [
  { step: 1, title: "First contact", desc: "You reach out via chat, video, or crisis line. Immediate support within 15 minutes.", icon: Phone, highlight: "24/7 availability" },
  { step: 2, title: "Screening & matching", desc: "Quick assessment + video introduction. We match you with the best specialist.", icon: CheckCircle2, highlight: "Free" },
  { step: 3, title: "First 1-2 sessions", desc: "Get to know your specialist. Set goals. Start your recovery journey.", icon: Heart, highlight: "Free / Co-financed" },
  { step: 4, title: "Ongoing support", desc: "Regular sessions, daily check-ins, progress tracking. Adjust as needed.", icon: Activity, highlight: "Personalized" },
  { step: 5, title: "Progress review", desc: "Monthly review with PHQ-9 / GAD-7. See your improvement in numbers.", icon: Star, highlight: "Measurable" },
  { step: 6, title: "Recovery & maintenance", desc: "Gradual transition to self-guided tools. Optional booster sessions.", icon: ShieldCheck, highlight: "Long-term" },
];

const crossLinks = [
  { label: "For donors", desc: "Fund recovery programs", route: "/for-donors", color: "hsl(160,84%,50%)" },
  { label: "For professionals", desc: "Join as practitioner", route: "/for-providers", color: "hsl(25,75%,65%)" },
  { label: "Public control", desc: "Monitor resources", route: "/public-control", color: "hsl(185,100%,50%)" },
];

export default function ForBeneficiaries() {
  const [, setLocation] = useLocation();
  const [calcValues, setCalcValues] = useState({ sessions: 8, cost: 800, copay: 10 });
  const [isRecording, setIsRecording] = useState(false);
  const [videoRecorded, setVideoRecorded] = useState(false);
  const [screeningDone, setScreeningDone] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalCost = calcValues.sessions * calcValues.cost;
  const yourShare = Math.round(totalCost * (calcValues.copay / 100));
  const donorShare = totalCost - yourShare;

  const handleVideoRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setVideoRecorded(true);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setVideoRecorded(true);
      }, 3000);
    }
  };

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Banner */}
      <div style={{ background: "rgba(212,160,23,0.08)", borderBottom: "1px solid rgba(212,160,23,0.15)", padding: "0.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <Shield style={{ width: 14, height: 14, color: GOLD }} />
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>All resources go directly to help. You pay a specific professional for a specific beneficiary. Report for every transaction.</span>
        </div>
      </div>

      {/* Navbar */}
      <nav style={{ background: "rgba(9,29,48,0.95)", borderBottom: "1px solid rgba(212,160,23,0.15)", position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => setLocation("/")}>
            <FeelLogo variant="dark" style={{ width: 36, height: 36 }} />
            <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Again</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginLeft: 8, paddingLeft: 8, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>For Beneficiaries</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setLocation("/portal/beneficiary")} style={{ background: "rgba(212,160,23,0.15)", color: GOLD, border: "1px solid rgba(212,160,23,0.3)", fontWeight: 600, padding: "0.5rem 1.25rem", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>Beneficiary Portal</button>
            <button onClick={() => (window.location.href = "/api/login")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "0.5rem 1.25rem", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14 }}>Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg, #0A1A2E 0%, #0F2B46 100%)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Equal access. Digital support.</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            You are not alone.
            <br />
            <span style={{ color: GOLD }}>Help is available now.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 680, lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Free diagnostics. Verified specialists. Co-financing that covers most of your costs. From the first screening to full recovery — step by step, with digital support at every stage.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <button onClick={() => setLocation("/portal/beneficiary")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "1rem 2rem", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Heart style={{ width: 18, height: 18 }} /> Get Support Now
            </button>
            <button onClick={() => { const el = document.getElementById("budget-calc"); el?.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600, padding: "1rem 2rem", borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <DollarSign style={{ width: 18, height: 18 }} /> Budget Calculator
            </button>
          </div>

          {/* Live Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {liveStats.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.25rem" }}>
                <p style={{ color: s.color, fontWeight: 800, fontSize: 28, marginBottom: 4 }}>{s.value}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Types of Help */}
      <div style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>How we can help</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 700, marginBottom: "3rem", lineHeight: 1.6 }}>
            Choose the format that works for you. All programs are co-financed: 1-2 sessions are free, then you pay a symbolic amount.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {helpTypes.map((type, i) => {
              const Icon = type.icon;
              return (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon style={{ width: 24, height: 24, color: GOLD }} />
                    </div>
                    <div>
                      <h3 style={{ color: "white", fontWeight: 600, fontSize: 16 }}>{type.title}</h3>
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: 4 }}>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.05)" }}>{type.duration}</span>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.05)" }}>{type.format}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.5 }}>{type.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Introduction Demo */}
      <div style={{ padding: "4rem 1.5rem", background: "#0F2B46" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Introduce yourself</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Record a short video (1-2 minutes) about what brings you here. This helps specialists understand your needs before the first session. It's optional but makes matching much more accurate.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <CheckCircle2 style={{ width: 18, height: 18, color: TEAL }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>1-2 minutes is enough</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <CheckCircle2 style={{ width: 18, height: 18, color: TEAL }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Only your future specialist sees it</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <CheckCircle2 style={{ width: 18, height: 18, color: TEAL }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>You can re-record anytime</span>
                </div>
              </div>
              <button onClick={() => setShowVideoModal(true)} style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600, padding: "1rem 2rem", borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Video style={{ width: 18, height: 18 }} /> Record Video
              </button>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem", textAlign: "center" }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", border: "2px solid rgba(212,160,23,0.3)" }}>
                <Camera style={{ width: 48, height: 48, color: GOLD }} />
              </div>
              <p style={{ color: "white", fontWeight: 600, fontSize: 16, marginBottom: "0.5rem" }}>Your video introduction</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: "1.5rem" }}>Help specialists understand your needs</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <Lock style={{ width: 14, height: 14, color: "rgba(255,255,255,0.3)" }} />
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>End-to-end encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#0B1E30", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "2rem", maxWidth: 500, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "white", fontWeight: 600, fontSize: 18 }}>Record Video Introduction</h3>
              <button onClick={() => setShowVideoModal(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>
            <div style={{ background: "#0A1A2E", borderRadius: 12, height: 240, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.08)" }}>
              {videoRecorded ? (
                <div style={{ textAlign: "center" }}>
                  <CheckCircle2 style={{ width: 48, height: 48, color: TEAL, margin: "0 auto 1rem" }} />
                  <p style={{ color: "white", fontWeight: 600 }}>Video recorded!</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Ready to send to your specialist</p>
                </div>
              ) : isRecording ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", border: "2px solid #ef4444" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#ef4444" }} />
                  </div>
                  <p style={{ color: "#ef4444", fontWeight: 600 }}>Recording...</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Click stop when done</p>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Video style={{ width: 48, height: 48, color: "rgba(255,255,255,0.2)", margin: "0 auto 1rem" }} />
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Click record to start</p>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={handleVideoRecord} style={{ flex: 1, background: isRecording ? "#ef4444" : GOLD, color: isRecording ? "white" : NAVY, fontWeight: 700, padding: "1rem", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                {isRecording ? <Pause style={{ width: 18, height: 18 }} /> : <Video style={{ width: 18, height: 18 }} />}
                {isRecording ? "Stop" : videoRecorded ? "Re-record" : "Record"}
              </button>
              {videoRecorded && (
                <button onClick={() => { setShowVideoModal(false); setVideoRecorded(false); }} style={{ flex: 1, background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600, padding: "1rem", borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <Send style={{ width: 18, height: 18 }} /> Send
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Screening Process */}
      <div style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>How screening works</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 700, marginBottom: "3rem", lineHeight: 1.6 }}>
            Two-level screening: quick self-check on the platform + professional assessment in your first session. Both are free.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {screeningSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.5rem", position: "relative" }}>
                  <div style={{ position: "absolute", top: "-12px", left: "1.5rem", width: 28, height: 28, borderRadius: "50%", background: "rgba(212,160,23,0.2)", border: "1px solid rgba(212,160,23,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: GOLD, fontWeight: 700, fontSize: 12 }}>
                    {s.step}
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", marginTop: "0.5rem" }}>
                    <Icon style={{ width: 20, height: 20, color: GOLD }} />
                  </div>
                  <h3 style={{ color: "white", fontWeight: 600, fontSize: 16, marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recovery Path */}
      <div style={{ padding: "4rem 1.5rem", background: "#0F2B46" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Your path to recovery</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 700, marginBottom: "3rem", lineHeight: 1.6 }}>
            From first contact to full recovery. Clear, measurable, and supported at every step.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {recoverySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.5rem", position: "relative" }}>
                  <div style={{ position: "absolute", top: "-12px", left: "1.5rem", width: 28, height: 28, borderRadius: "50%", background: "rgba(212,160,23,0.2)", border: "1px solid rgba(212,160,23,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: GOLD, fontWeight: 700, fontSize: 12 }}>
                    {step.step}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                    <span style={{ color: TEAL, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{step.highlight}</span>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon style={{ width: 20, height: 20, color: GOLD }} />
                  </div>
                  <h3 style={{ color: "white", fontWeight: 600, fontSize: 16, marginBottom: "0.5rem" }}>{step.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Specialists */}
      <div style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Choose your specialist</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            Browse by photo, video, rating, license, and specialization. All verified. No advertising.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {specialists.map((spec, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <Brain style={{ width: 26, height: 26, color: GOLD }} />
                    {spec.video && (
                      <div style={{ position: "absolute", bottom: 0, right: 0, width: 18, height: 18, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Video style={{ width: 10, height: 10, color: "white" }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p style={{ color: "white", fontWeight: 600, fontSize: 15 }}>{spec.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{spec.spec}</p>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: 4, alignItems: "center" }}>
                      {spec.lang.map((l) => (
                        <span key={l} style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, padding: "1px 6px", borderRadius: 4, background: "rgba(255,255,255,0.05)" }}>{l}</span>
                      ))}
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, padding: "1px 6px", borderRadius: 4, background: "rgba(45,212,191,0.1)", color: TEAL }}>{spec.license}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Star style={{ width: 14, height: 14, color: GOLD }} />
                    <span style={{ color: GOLD, fontWeight: 700, fontSize: 14 }}>{spec.rating}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>({spec.reviews})</span>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 600 }}>{spec.price}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Clock style={{ width: 14, height: 14, color: "rgba(255,255,255,0.3)" }} />
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{spec.next}</span>
                  </div>
                  <span style={{ color: spec.available ? "#10b981" : "#f59e0b", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 4, background: spec.available ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)" }}>
                    {spec.available ? "Available" : "Busy"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Calculator */}
      <div id="budget-calc" style={{ padding: "4rem 1.5rem", background: "#0F2B46" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Budget Calculator</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            See how much your course will cost with co-financing. First 1-2 sessions are free.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.5rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Sessions needed</label>
                <input type="range" min={5} max={20} value={calcValues.sessions} onChange={(e) => setCalcValues(prev => ({ ...prev, sessions: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>5</span><span style={{ color: "white", fontWeight: 600 }}>{calcValues.sessions}</span><span>20</span>
                </div>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Session cost (UAH)</label>
                <input type="range" min={400} max={2000} step={50} value={calcValues.cost} onChange={(e) => setCalcValues(prev => ({ ...prev, cost: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>₴400</span><span style={{ color: "white", fontWeight: 600 }}>₴{calcValues.cost}</span><span>₴2000</span>
                </div>
              </div>
              <div>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Your co-payment (%)</label>
                <input type="range" min={0} max={50} value={calcValues.copay} onChange={(e) => setCalcValues(prev => ({ ...prev, copay: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>0%</span><span style={{ color: "white", fontWeight: 600 }}>{calcValues.copay}%</span><span>50%</span>
                </div>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Total course cost</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, textDecoration: "line-through" }}>₴{totalCost.toLocaleString()}</span>
                </div>
                <p style={{ color: GOLD, fontWeight: 800, fontSize: 48, marginBottom: "0.5rem" }}>₴{yourShare.toLocaleString()}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: "1.5rem" }}>Your share after co-financing</p>
                <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "rgba(212,160,23,0.08)", borderRadius: 10, border: "1px solid rgba(212,160,23,0.15)" }}>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5 }}>
                    <strong style={{ color: GOLD }}>First 2 sessions are free.</strong> Donor covers: <strong style={{ color: TEAL }}>₴{donorShare.toLocaleString()}</strong>. You can also start a <strong style={{ color: GOLD }}>P2P collection</strong> among friends.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, padding: "4px 12px", borderRadius: 4, background: "rgba(255,255,255,0.05)" }}>PHQ-9 free</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, padding: "4px 12px", borderRadius: 4, background: "rgba(255,255,255,0.05)" }}>GAD-7 free</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, padding: "4px 12px", borderRadius: 4, background: "rgba(255,255,255,0.05)" }}>First 2 sessions free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross links */}
      <div style={{ padding: "3rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h3 style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>Other entry points</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {crossLinks.map((link, i) => (
              <button key={i} onClick={() => setLocation(link.route)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.25rem", cursor: "pointer", textAlign: "left" }}>
                <p style={{ color: link.color, fontWeight: 600, fontSize: 15, marginBottom: "0.25rem" }}>{link.label}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{link.desc}</p>
                <ChevronRight style={{ width: 16, height: 16, color: "rgba(255,255,255,0.2)", marginTop: "0.5rem" }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#081525", padding: "2rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FeelLogo variant="dark" style={{ width: 36, height: 36 }} />
            <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Again</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
            Recovery of mental resilience as a foundation for macroeconomic growth.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}> dashboard.feelagain.me</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
