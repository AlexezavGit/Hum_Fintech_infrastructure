import { useState } from "react";
import { useLocation } from "wouter";
import FeelLogo from "@/components/FeelLogo";
import { Heart, Shield, TrendingUp, Users, ArrowRight, BarChart3, Globe, DollarSign, CheckCircle2, ChevronRight } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

const liveStats = [
  { value: "47", label: "Active programs", color: "hsl(160,84%,50%)" },
  { value: "$1.87M", label: "This month impact", color: GOLD },
  { value: "37,410", label: "Beneficiaries served", color: "hsl(185,100%,50%)" },
  { value: "98.5%", label: "Transparency", color: "hsl(270,60%,65%)" },
];

const impactCalc = [
  { label: "Average cost per session", value: 50, unit: "USD", min: 20, max: 100 },
  { label: "Sessions per beneficiary", value: 8, unit: "sessions", min: 5, max: 20 },
  { label: "Your contribution", value: 1000, unit: "USD", min: 100, max: 50000 },
];

const scoringExample = [
  { id: "FA-2026-087", title: "Adolescent PTSD Rehabilitation — Zhytomyr", score: 94, status: "auto", localization: 92, efficiency: 88, impact: 96, transparency: 95, community: 87 },
  { id: "FA-2026-091", title: "Group CBT for Conflict-Affected Families — Kharkiv", score: 87, status: "review", localization: 85, efficiency: 82, impact: 89, transparency: 90, community: 78 },
  { id: "FA-2026-095", title: "First Responder Burnout Recovery — Kyiv", score: 79, status: "review", localization: 78, efficiency: 75, impact: 82, transparency: 85, community: 72 },
  { id: "FA-2026-099", title: "Rural Mobile MHPSS Teams — Nationwide", score: 91, status: "auto", localization: 95, efficiency: 90, impact: 88, transparency: 92, community: 85 },
];

const crossLinks = [
  { label: "For professionals", desc: "Join as a practitioner", route: "/for-providers", color: "hsl(25,75%,65%)" },
  { label: "For beneficiaries", desc: "Get psychological support", route: "/for-beneficiaries", color: "hsl(270,60%,65%)" },
  { label: "Public control", desc: "Monitor resource distribution", route: "/public-control", color: "hsl(185,100%,50%)" },
];

export default function ForDonors() {
  const [, setLocation] = useLocation();
  const [calcValues, setCalcValues] = useState({ sessionCost: 50, sessions: 8, contribution: 1000 });

  const beneficiaries = Math.floor(calcValues.contribution / (calcValues.sessionCost * calcValues.sessions));
  const totalSessions = beneficiaries * calcValues.sessions;

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
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginLeft: 8, paddingLeft: 8, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>For Donors</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setLocation("/portal/donor")} style={{ background: "rgba(212,160,23,0.15)", color: GOLD, border: "1px solid rgba(212,160,23,0.3)", fontWeight: 600, padding: "0.5rem 1.25rem", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>Donor Portal</button>
            <button onClick={() => (window.location.href = "/api/login")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "0.5rem 1.25rem", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14 }}>Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg, #0A1A2E 0%, #0F2B46 100%)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>De-risked impact financing</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Payment for Result.
            <br />
            <span style={{ color: GOLD }}>Every dollar tracked.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 680, lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Fund mental health recovery with full transparency. Your resources go directly to verified practitioners serving specific beneficiaries. You get real-time reports per transaction, not annual summaries.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <button onClick={() => setLocation("/portal/donor")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "1rem 2rem", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <DollarSign style={{ width: 18, height: 18 }} /> Start Impact Financing
            </button>
            <button onClick={() => { const el = document.getElementById("impact-calc"); el?.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600, padding: "1rem 2rem", borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BarChart3 style={{ width: 18, height: 18 }} /> Impact Calculator
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

      {/* How it Works */}
      <div style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>How Reverse Waterfall works</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 700, marginBottom: "3rem", lineHeight: 1.6 }}>
            A digital cascade co-financing system: your contribution creates conditions for matching resources. Whether the state starts with a subsidy, donors add funds, or responsible business contributes — everyone pools into a shared digital basket, ensuring European-level income for psychologists without burdening the patient.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: Shield, title: "Set your program", desc: "Define target audience, compliance criteria, and co-financing terms. Auto-match with verified provider projects." },
              { icon: BarChart3, title: "Auto-scoring", desc: "Our AI evaluates initiatives on localization, efficiency, impact, transparency, and community scores. Auto-invest above 75." },
              { icon: Globe, title: "Real-time tracking", desc: "Every session is verified. Every transaction is traceable. Blockchain audit trail for full accountability." },
              { icon: CheckCircle2, title: "Pay for results", desc: "Funds release only when the system records measurable improvement in beneficiary wellbeing." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.5rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon style={{ width: 20, height: 20, color: GOLD }} />
                  </div>
                  <h3 style={{ color: "white", fontWeight: 600, fontSize: 16, marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Impact Calculator */}
      <div id="impact-calc" style={{ padding: "4rem 1.5rem", background: "#0F2B46" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Impact Calculator</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            See how many people your contribution can help.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.5rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Average session cost (USD)</label>
                <input type="range" min={20} max={100} value={calcValues.sessionCost} onChange={(e) => setCalcValues(prev => ({ ...prev, sessionCost: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>$20</span><span style={{ color: "white", fontWeight: 600 }}>${calcValues.sessionCost}</span><span>$100</span>
                </div>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Sessions per beneficiary</label>
                <input type="range" min={5} max={20} value={calcValues.sessions} onChange={(e) => setCalcValues(prev => ({ ...prev, sessions: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>5</span><span style={{ color: "white", fontWeight: 600 }}>{calcValues.sessions}</span><span>20</span>
                </div>
              </div>
              <div>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Your contribution (USD)</label>
                <input type="range" min={100} max={50000} step={100} value={calcValues.contribution} onChange={(e) => setCalcValues(prev => ({ ...prev, contribution: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>$100</span><span style={{ color: "white", fontWeight: 600 }}>${calcValues.contribution.toLocaleString()}</span><span>$50K</span>
                </div>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: "0.5rem" }}>People you can help</p>
                <p style={{ color: GOLD, fontWeight: 800, fontSize: 56, marginBottom: "0.5rem" }}>{beneficiaries}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Total sessions: {totalSessions.toLocaleString()}</p>
                <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(212,160,23,0.08)", borderRadius: 10, border: "1px solid rgba(212,160,23,0.15)" }}>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5 }}>
                    With co-financing, your impact can be <strong style={{ color: GOLD }}>2-3x higher</strong> than direct full funding, because community micro-payments activate the social derisking contract.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring Example */}
      <div style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Initiative Scoring</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            Auto-evaluation based on 5 parameters. Score &gt;75 = auto-approve. 50-75 = manual review. &lt;50 = reject.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {scoringExample.map((init) => (
              <div key={init.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{init.id}</span>
                      <span style={{ color: init.status === "auto" ? "#10b981" : "#f59e0b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", padding: "2px 8px", borderRadius: 4, background: init.status === "auto" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)" }}>
                        {init.status === "auto" ? "Auto-approve" : "Manual review"}
                      </span>
                    </div>
                    <p style={{ color: "white", fontWeight: 600, fontSize: 15, marginBottom: "0.5rem" }}>{init.title}</p>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      {[
                        { label: "Localization", val: init.localization },
                        { label: "Efficiency", val: init.efficiency },
                        { label: "Impact", val: init.impact },
                        { label: "Transparency", val: init.transparency },
                        { label: "Community", val: init.community },
                      ].map((dim) => (
                        <div key={dim.label} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{dim.label}:</span>
                          <span style={{ color: dim.val >= 80 ? "#10b981" : dim.val >= 60 ? "#f59e0b" : "#ef4444", fontWeight: 600, fontSize: 11 }}>{dim.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", minWidth: 80 }}>
                    <p style={{ color: init.score >= 80 ? "#10b981" : init.score >= 60 ? "#f59e0b" : "#ef4444", fontWeight: 800, fontSize: 32 }}>{init.score}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>/100</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross links */}
      <div style={{ padding: "3rem 1.5rem", background: "#0F2B46" }}>
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
