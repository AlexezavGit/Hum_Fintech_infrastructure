import { useState } from "react";
import { useLocation } from "wouter";
import FeelLogo from "@/components/FeelLogo";
import { Stethoscope, TrendingUp, Users, ArrowRight, DollarSign, CheckCircle2, ChevronRight, BookOpen, Award, Star, Clock, FileText, Brain, Activity, Heart, Shield } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

const liveStats = [
  { value: "124", label: "Active practitioners", color: "hsl(160,84%,50%)" },
  { value: "2,847", label: "Beneficiaries in care", color: "hsl(185,100%,50%)" },
  { value: "4.9", label: "Avg rating", color: GOLD },
  { value: "€45-90", label: "Session income", color: "hsl(270,60%,65%)" },
];

const rankingFactors = [
  { label: "Verified cases", weight: 40, desc: "Number of confirmed successful cases by beneficiaries" },
  { label: "Beneficiary ratings", weight: 25, desc: "Average rating from beneficiaries who completed therapy" },
  { label: "Compliance", weight: 20, desc: "mhGAP, IATI, Grand Bargain adherence" },
  { label: "Documentation", weight: 15, desc: "Quality of case documentation and reporting" },
];

const topProviders = [
  { name: "Dr. Olena Kovalenko", spec: "Trauma & PTSD", rating: 4.9, cases: 127, verified: 98, income: "€72/session", rank: 1 },
  { name: "Dr. Iryna Savchenko", spec: "Family & Grief", rating: 4.8, cases: 89, verified: 76, income: "€68/session", rank: 2 },
  { name: "Dr. Mykhailo Bondar", spec: "CBT, Anxiety", rating: 4.7, cases: 64, verified: 52, income: "€58/session", rank: 3 },
];

const incomeCalc = [
  { label: "Sessions per week", value: 15, min: 5, max: 40 },
  { label: "Session rate (EUR)", value: 65, min: 30, max: 150 },
  { label: "Weeks per year", value: 44, min: 20, max: 52 },
];

const crossLinks = [
  { label: "For donors", desc: "Fund recovery programs", route: "/for-donors", color: "hsl(160,84%,50%)" },
  { label: "For beneficiaries", desc: "Get psychological support", route: "/for-beneficiaries", color: "hsl(270,60%,65%)" },
  { label: "Public control", desc: "Monitor resource distribution", route: "/public-control", color: "hsl(185,100%,50%)" },
];

export default function ForProviders() {
  const [, setLocation] = useLocation();
  const [calcValues, setCalcValues] = useState({ sessions: 15, rate: 65, weeks: 44 });

  const annualIncome = calcValues.sessions * calcValues.rate * calcValues.weeks;
  const monthlyIncome = Math.round(annualIncome / 12);

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
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginLeft: 8, paddingLeft: 8, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>For Professionals</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setLocation("/portal/provider")} style={{ background: "rgba(212,160,23,0.15)", color: GOLD, border: "1px solid rgba(212,160,23,0.3)", fontWeight: 600, padding: "0.5rem 1.25rem", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>Provider Portal</button>
            <button onClick={() => (window.location.href = "/api/login")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "0.5rem 1.25rem", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14 }}>Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg, #0A1A2E 0%, #0F2B46 100%)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Non-competitive digital environment</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Fair pay. Verified impact.
            <br />
            <span style={{ color: GOLD }}>Your practice, digital.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 680, lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Exit the shadow economy through the Digital Corridor. Get European-level income for your expertise, with transparent ratings, automated reporting, and access to co-financed beneficiaries. No competition — only verified competence.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <button onClick={() => setLocation("/portal/provider")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "1rem 2rem", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Stethoscope style={{ width: 18, height: 18 }} /> Join as Practitioner
            </button>
            <button onClick={() => { const el = document.getElementById("income-calc"); el?.scrollIntoView({ behavior: "smooth" }); }} style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600, padding: "1rem 2rem", borderRadius: 10, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <DollarSign style={{ width: 18, height: 18 }} /> Income Calculator
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

      {/* How it works */}
      <div style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Your path in the Digital Corridor</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 700, marginBottom: "3rem", lineHeight: 1.6 }}>
            The Digital Corridor connects you directly with verified beneficiaries. No middlemen. Transparent co-financing ensures your income without burdening the patient.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: CheckCircle2, title: "Verify credentials", desc: "Upload diplomas and certificates. Automatic verification. Get access to the Circulation Folder of diagnosed beneficiaries." },
              { icon: Brain, title: "Accept requests", desc: "Receive depersonalized referrals from the circulation folder. Confirm diagnostics and send session invitations." },
              { icon: FileText, title: "Document cases", desc: "Digitize cases for the expertise center. Verified beneficiaries confirm outcomes — your ranking grows." },
              { icon: Award, title: "Get recognized", desc: "Ranking based on confirmed cases, not marketing. Higher rank = more visibility, better income, training opportunities." },
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

      {/* Ranking System */}
      <div style={{ padding: "4rem 1.5rem", background: "#0F2B46" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Ranking System</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            Your position is determined by what beneficiaries confirm, not what you claim. The most important factor: verified successful cases.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
            {rankingFactors.map((factor, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <p style={{ color: "white", fontWeight: 600, fontSize: 14 }}>{factor.label}</p>
                  <span style={{ color: GOLD, fontWeight: 700, fontSize: 14 }}>{factor.weight}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginBottom: "0.5rem" }}>
                  <div style={{ height: "100%", width: `${factor.weight}%`, background: GOLD, borderRadius: 2 }} />
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{factor.desc}</p>
              </div>
            ))}
          </div>

          <h3 style={{ color: "white", fontSize: 20, fontWeight: 600, marginBottom: "1.5rem" }}>Top Practitioners</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {topProviders.map((provider, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: GOLD, fontSize: 16 }}>
                    {provider.rank}
                  </div>
                  <div>
                    <p style={{ color: "white", fontWeight: 600, fontSize: 15 }}>{provider.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{provider.spec}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", justifyContent: "center" }}>
                      <Star style={{ width: 14, height: 14, color: GOLD }} />
                      <span style={{ color: GOLD, fontWeight: 700, fontSize: 16 }}>{provider.rating}</span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>Rating</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>{provider.cases}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, display: "block" }}>Cases</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ color: "#10b981", fontWeight: 700, fontSize: 16 }}>{provider.verified}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, display: "block" }}>Verified</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>{provider.income}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, display: "block" }}>Income</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Income Calculator */}
      <div id="income-calc" style={{ padding: "4rem 1.5rem", background: "#0B1E30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: "1rem" }}>Income Calculator</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: "2rem" }}>
            Estimate your annual income with transparent co-financing.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.5rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Sessions per week</label>
                <input type="range" min={5} max={40} value={calcValues.sessions} onChange={(e) => setCalcValues(prev => ({ ...prev, sessions: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>5</span><span style={{ color: "white", fontWeight: 600 }}>{calcValues.sessions}</span><span>40</span>
                </div>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Session rate (EUR)</label>
                <input type="range" min={30} max={150} value={calcValues.rate} onChange={(e) => setCalcValues(prev => ({ ...prev, rate: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>€30</span><span style={{ color: "white", fontWeight: 600 }}>€{calcValues.rate}</span><span>€150</span>
                </div>
              </div>
              <div>
                <label style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "block", marginBottom: "0.5rem" }}>Working weeks per year</label>
                <input type="range" min={20} max={52} value={calcValues.weeks} onChange={(e) => setCalcValues(prev => ({ ...prev, weeks: Number(e.target.value) }))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>
                  <span>20</span><span style={{ color: "white", fontWeight: 600 }}>{calcValues.weeks}</span><span>52</span>
                </div>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: "0.5rem" }}>Estimated annual income</p>
                <p style={{ color: GOLD, fontWeight: 800, fontSize: 48, marginBottom: "0.5rem" }}>€{annualIncome.toLocaleString()}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>~€{monthlyIncome.toLocaleString()} / month</p>
                <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(212,160,23,0.08)", borderRadius: 10, border: "1px solid rgba(212,160,23,0.15)" }}>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5 }}>
                    With co-financing, beneficiaries pay only a symbolic amount. The rest comes from donor programs. You get fair European-level pay without burdening the patient.
                  </p>
                </div>
              </div>
            </div>
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
