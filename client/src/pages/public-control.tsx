import { useState } from "react";
import { useLocation } from "wouter";
import FeelLogo from "@/components/FeelLogo";
import { Eye, Shield, TrendingUp, Users, ArrowRight, BarChart3, Globe, ChevronRight, CheckCircle2, AlertTriangle, MessageSquare, Clock, Activity } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

const liveStats = [
  { value: "47", label: "Active programs", color: "hsl(160,84%,50%)" },
  { value: "€1.87M", label: "This month", color: GOLD },
  { value: "37,410", label: "Served this month", color: "hsl(185,100%,50%)" },
  { value: "98.5%", label: "Transparency score", color: "hsl(270,60%,65%)" },
];

const programStatus = [
  { id: "FA-2026-087", title: "Adolescent PTSD — Zhytomyr", funded: 187500, target: 250000, beneficiaries: 250, status: "active", compliance: ["IATI", "mhGAP"] },
  { id: "FA-2026-091", title: "Crisis Intervention — Kharkiv", funded: 342000, target: 500000, beneficiaries: 3200, status: "active", compliance: ["Grand Bargain", "mhGAP"] },
  { id: "FA-2026-095", title: "Coordination Network — Nationwide", funded: 98000, target: 150000, beneficiaries: 850, status: "active", compliance: ["IATI", "Grand Bargain"] },
  { id: "FA-2026-099", title: "Rural Mobile Teams — Nationwide", funded: 125000, target: 200000, beneficiaries: 1200, status: "active", compliance: ["mhGAP"] },
];

const grandBargain = [
  { label: "Localization", current: 27, target: 25, unit: "%" },
  { label: "Quality Funding", current: 36, target: 24, unit: "mo" },
  { label: "Participation", current: 87, target: 80, unit: "%" },
  { label: "Admin Overhead", current: 8.5, target: 30, unit: "%", inverse: true },
];

const crossLinks = [
  { label: "For donors", desc: "Fund recovery programs", route: "/for-donors", color: "hsl(160,84%,50%)" },
  { label: "For professionals", desc: "Join as practitioner", route: "/for-providers", color: "hsl(25,75%,65%)" },
  { label: "For beneficiaries", desc: "Get support", route: "/for-beneficiaries", color: "hsl(270,60%,65%)" },
];

export default function PublicControl() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Navbar */}
      <nav style={{ background: "rgba(9,29,48,0.95)", borderBottom: "1px solid rgba(212,160,23,0.15)", position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => setLocation("/")}>
            <FeelLogo variant="dark" style={{ width: 36, height: 36 }} />
            <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Again</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginLeft: 8, paddingLeft: 8, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>Public Control</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => (window.location.href = "/api/login")} style={{ background: "rgba(212,160,23,0.15)", color: GOLD, border: "1px solid rgba(212,160,23,0.3)", fontWeight: 600, padding: "0.5rem 1.25rem", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg, #0A1A2E 0%, #0F2B46 100%)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Community oversight</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            See where every resource goes.
            <br />
            <span style={{ color: GOLD }}>Ask questions. Demand answers.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 680, lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Not a donor, not a beneficiary, not a practitioner? You can still monitor how humanitarian resources are distributed in your community. Full transparency, real-time data, and the right to ask questions.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <button onClick={() => { const el = document.getElementById("query-form"); el?.scrollIntoView({ behavior: "smooth" }); }} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "1rem 2rem", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MessageSquare style={{ width: 18, height: 18 }} /> Submit a Question
            </button>
            <button onClick={() => { const el = document.getElementById("programs"); el?.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600, padding: "1rem 2rem", borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BarChart3 style={{ width: 18, height: 18 }} /> View Programs
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

      {/* Grand Bargain Metrics */}
      <div style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Grand Bargain Compliance</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            International commitments for transparent humanitarian aid.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {grandBargain.map((metric, i) => {
              const isGood = metric.inverse ? metric.current < metric.target : metric.current >= metric.target;
              return (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <p style={{ color: "white", fontWeight: 600, fontSize: 15 }}>{metric.label}</p>
                    <span style={{ color: isGood ? "#10b981" : "#f59e0b", fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: isGood ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)" }}>
                      {isGood ? "On target" : "In progress"}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ color: GOLD, fontWeight: 800, fontSize: 36 }}>{metric.current}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>{metric.unit}</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min((metric.current / (metric.inverse ? metric.target * 2 : metric.target * 1.2)) * 100, 100)}%`, background: isGood ? "#10b981" : "#f59e0b", borderRadius: 3 }} />
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: "0.5rem" }}>
                    Target: {metric.target}{metric.unit} {metric.inverse ? "(lower is better)" : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programs */}
      <div id="programs" style={{ padding: "4rem 1.5rem", background: "#0F2B46" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Active Programs</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            Current funding programs and their progress. All data is updated in real time.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {programStatus.map((program) => {
              const progress = (program.funded / program.target) * 100;
              return (
                <div key={program.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{program.id}</span>
                        {program.compliance.map((c) => (
                          <span key={c} style={{ color: "#10b981", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "rgba(16,185,129,0.15)" }}>{c}</span>
                        ))}
                      </div>
                      <p style={{ color: "white", fontWeight: 600, fontSize: 15, marginBottom: "0.5rem" }}>{program.title}</p>
                      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}><Users style={{ width: 14, height: 14, display: "inline", verticalAlign: "middle", marginRight: 4 }} /> {program.beneficiaries.toLocaleString()} beneficiaries</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}><Activity style={{ width: 14, height: 14, display: "inline", verticalAlign: "middle", marginRight: 4 }} /> {program.status}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", minWidth: 120 }}>
                      <p style={{ color: GOLD, fontWeight: 700, fontSize: 18 }}>${program.funded.toLocaleString()}</p>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>of ${program.target.toLocaleString()}</p>
                    </div>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: GOLD, borderRadius: 3 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{Math.round(progress)}% funded</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>${(program.target - program.funded).toLocaleString()} remaining</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Query Form */}
      <div id="query-form" style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Submit a Question</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            Ask about resource distribution, program execution, or any concern. Registration required for submission.
          </p>
          {submitted ? (
            <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "2rem", textAlign: "center" }}>
              <CheckCircle2 style={{ width: 48, height: 48, color: "#10b981", margin: "0 auto 1rem" }} />
              <p style={{ color: "white", fontWeight: 600, fontSize: 18, marginBottom: "0.5rem" }}>Question submitted</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>We will respond within 48 hours. You can track the status in your dashboard.</p>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Name</label>
                <input type="text" value={query.name} onChange={(e) => setQuery(prev => ({ ...prev, name: e.target.value }))} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14 }} placeholder="Your name" />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Email</label>
                <input type="email" value={query.email} onChange={(e) => setQuery(prev => ({ ...prev, email: e.target.value }))} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14 }} placeholder="your@email.com" />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Question</label>
                <textarea value={query.message} onChange={(e) => setQuery(prev => ({ ...prev, message: e.target.value }))} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, minHeight: 120, resize: "vertical" }} placeholder="Describe your question or concern..." />
              </div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <button onClick={() => setSubmitted(true)} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "0.75rem 1.5rem", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14 }}>
                  Submit Question
                </button>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
                  or <button onClick={() => (window.location.href = "/api/login")} style={{ background: "none", border: "none", color: GOLD, cursor: "pointer", textDecoration: "underline", fontSize: 13 }}>Sign in to track</button>
                </span>
              </div>
            </div>
          )}
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
