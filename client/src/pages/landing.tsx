import { useState } from "react";
import { useLocation } from "wouter";
import {
  Heart, Shield, Users, TrendingUp, Brain, Stethoscope,
  ArrowRight, DollarSign, Activity, CheckCircle2,
  AlertCircle, ChevronRight
} from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

const canonicalStats = [
  { value: "9.6M", label: "Людей у зоні ризику", source: "WHO, 2025" },
  { value: "74%", label: "Treatment Gap (ВПО)", source: "IOM/UNHCR 2023" },
  { value: "117,652", label: "Сертифікатів mhGAP", source: "WHO Dashboard" },
  { value: "42", label: "Практикують під супервізією", source: "PMC 2020 (6%)" },
  { value: "~$8B", label: "Втрат ВВП / рік", source: "OECD methodology" },
  { value: "$137M", label: "Гуман. потоків / рік", source: "OCHA FTS" },
];

const liveStats = [
  { value: "2,847", label: "Бенефіціарів у системі", color: "hsl(185,100%,50%)" },
  { value: "124", label: "Активних фахівців", color: GOLD },
  { value: "68%", label: "Recovery Rate", color: "hsl(270,60%,65%)" },
  { value: "32", label: "Верифіковані установи", color: "hsl(25,75%,65%)" },
];

const gaps = [
  { num: "01", title: "Кадровий", desc: "117,652 сертифікатів mhGAP → лише 42 практикують. Масове навчання без інфраструктури = папір, не фахівці." },
  { num: "02", title: "Економічний", desc: "89% держбюджету MH → стаціонар. 71% пацієнтів потребують амбулаторну допомогу. Гроші йдуть за будівлями, не за пацієнтом." },
  { num: "03", title: "Доступу", desc: "3.9M потребують допомоги. 4,000 фахівців обслуговують 100,000/рік = 1% потреби." },
  { num: "04", title: "Тіньової економіки", desc: "~8,000 приватних фахівців без сертифікації, без видимості для держави, без інституційного фінансування." },
  { num: "05", title: "Інтеграції", desc: "$137M/рік через фрагментовані канали. ~0% синхронізації з ЕСОЗ. 450+ організацій координуються через Excel." },
  { num: "06", title: "Підзвітності", desc: "Inputs фінансуються. Outputs звітуються. Outcomes — невидимі." },
];

const audiences = [
  {
    key: "beneficiary",
    icon: Brain,
    question: "Хочете пройти діагностику, знайти спеціаліста або поговорити з AI-консультантом?",
    tagline: "Рівний доступ. Цифровий супровід.",
    points: ["Ступенева допомога від PSS до клінічної терапії", "PHQ-9 / GAD-7 / WHO-5 — вимірювані результати", "Ресурси не залежать від місця знаходження"],
    cta: "Отримати підтримку",
    route: "/portal/beneficiary",
    accent: "hsl(270,60%,65%)",
    border: "hsla(270,60%,65%,0.25)",
    bg: "hsla(270,60%,50%,0.06)",
  },
  {
    key: "provider",
    icon: Stethoscope,
    question: "Хочете розпланувати практику в єдиній панелі провайдера/адміна закладу?",
    tagline: "Справедлива платня. Персональна ефективність.",
    points: ["Вихід із тіні через Digital Corridor", "mhGAP-сумісні звіти та супервізія", "Фінансування практики та авто-звітність"],
    cta: "Фахівцям",
    route: "/portal/provider",
    accent: GOLD,
    border: "rgba(212,160,23,0.25)",
    bg: "rgba(212,160,23,0.06)",
  },
  {
    key: "donor",
    icon: TrendingUp,
    question: "Хочете контролювати цільове використання ресурсів у режимі реального часу?",
    tagline: "Де-ризиковане спів-фінансування. Вимірюваний вплив.",
    points: ["Payment for Result: ресурси → за бенефіціаром", "Блокчейн-верифікований audit trail", "Авто-звітність IATI / Grand Bargain"],
    cta: "Impact Financing Hub",
    route: "/portal/donor",
    accent: "hsl(160,84%,50%)",
    border: "hsla(160,84%,50%,0.25)",
    bg: "hsla(160,84%,50%,0.06)",
  },
];

const mheiRegions = [
  { region: "Київ", index: 74.2, trend: "+2.1" },
  { region: "Харків", index: 61.8, trend: "+4.3" },
  { region: "Львів", index: 79.5, trend: "+1.2" },
  { region: "Одеса", index: 66.1, trend: "+3.0" },
  { region: "Житомир", index: 58.4, trend: "+5.7" },
  { region: "Дніпро", index: 63.2, trend: "+3.8" },
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const [donationAmount, setDonationAmount] = useState("100");
  const [donationTarget, setDonationTarget] = useState("any");

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ background: "rgba(9,29,48,0.95)", borderBottom: "1px solid rgba(212,160,23,0.15)", position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 52, height: 36, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }}>
              {['F','E','E','L'].map((letter, i) => (
                <div key={letter + i} style={{ position: 'relative', overflow: 'hidden' }}>
                  <span style={{ display: 'block', fontWeight: 900, fontSize: 20, lineHeight: '18px', letterSpacing: '-0.22em', transform: `translateX(${i === 1 ? -8 : i === 2 ? -16 : i === 3 ? -24 : 0}px)`, opacity: i === 3 ? 0.6 : 1, background: 'linear-gradient(180deg, rgba(212,160,23,1) 0%, rgba(212,160,23,0.6) 60%, rgba(212,160,23,0.4) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{letter}</span>
                </div>
              ))}
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Again</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginLeft: 8, paddingLeft: 8, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>Гуманітарна програма MHPSS · UA</span>
          </div>
          <button onClick={() => (window.location.href = "/api/login")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "0.5rem 1.25rem", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14 }}>Реєстрація / Вхід</button>
        </div>
      </nav>

      <div style={{ background: "#0B1E30", borderBottom: "1px solid rgba(212,160,23,0.12)", padding: "0.5rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", gap: "2rem", overflowX: "auto" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>MHEI · Індекс ментального здоров'я</span>
          {mheiRegions.map((r) => (
            <div key={r.region} style={{ display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{r.region}</span>
              <span style={{ color: GOLD, fontWeight: 700, fontSize: 13 }}>{r.index}</span>
              <span style={{ color: "#10b981", fontSize: 11 }}>▲{r.trend}</span>
            </div>
          ))}
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, marginLeft: "auto", whiteSpace: "nowrap" }}>Вплив на ВВП: +0.34% YTD</span>
        </div>
      </div>

      <section style={{ background: `linear-gradient(145deg, #091d30 0%, ${NAVY} 45%, #162944 100%)`, position: "relative", overflow: "hidden", padding: "5rem 0 4rem" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(212,160,23,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(212,160,23,0.12)", color: GOLD, border: "1px solid rgba(212,160,23,0.3)", padding: "0.35rem 1rem", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Гуманітарна програма MHPSS · Україна</div>
          <h1 style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>Цифрова інфраструктура для<br /><span style={{ color: GOLD }}>психічного здоров'я України</span></h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, maxWidth: 640, margin: "0 auto 1rem", lineHeight: 1.6 }}>FEEL Again з'єднує три роз'єднані сектори надавачів з бенефіціарами через єдиний довірений цифровий шар. Не маркетплейс — фінансові рейки для сектору MHPSS.</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, maxWidth: 520, margin: "0 auto 2.5rem", fontStyle: "italic" }}>«FEEL Again — це Visa гуманітарного сектору психічного здоров'я. Не надає терапію — надає рейки, якими терапія протікає прозоро, підзвітно та масштабно.»</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setLocation("/portal/beneficiary")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "0.75rem 1.75rem", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>Отримати підтримку <ArrowRight size={16} /></button>
            <button onClick={() => setLocation("/portal/provider")} style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.35)", padding: "0.75rem 1.5rem", borderRadius: 8, cursor: "pointer", fontSize: 15 }}>Я фахівець</button>
            <button onClick={() => setLocation("/portal/donor")} style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.35)", padding: "0.75rem 1.5rem", borderRadius: 8, cursor: "pointer", fontSize: 15 }}>Я донор / партнер</button>
          </div>
        </div>
      </section>

      <section style={{ background: "#0B1E30", borderTop: "1px solid rgba(212,160,23,0.15)", borderBottom: "1px solid rgba(212,160,23,0.15)", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}>
            <div style={{ width: 24, height: 2, background: GOLD, borderRadius: 1 }} />
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>Канонічний датасет · Doc 4 · Єдине джерело правди</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1.5rem" }}>
            {canonicalStats.map((s) => <div key={s.value}><div style={{ color: GOLD, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, lineHeight: 1 }}>{s.value}</div><div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 4 }}>{s.label}</div><div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 2 }}>{s.source}</div></div>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 0", background: `linear-gradient(180deg, ${NAVY} 0%, #0d2035 100%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Оберіть свій шлях</p>
            <h2 style={{ color: "white", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400 }}>Кожна аудиторія має свій простір</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {audiences.map((a) => {
              const Icon = a.icon;
              return (
                <button key={a.key} onClick={() => setLocation(a.route)} style={{ background: a.bg, border: `1px solid ${a.border}`, borderRadius: 16, padding: "1.75rem", textAlign: "left", cursor: "pointer" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: a.bg, border: `1px solid ${a.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}><Icon size={22} style={{ color: a.accent }} /></div>
                  <h3 style={{ color: "white", fontSize: 17, fontWeight: 600, lineHeight: 1.4, marginBottom: "0.75rem" }}>{a.question}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: "1rem", fontStyle: "italic" }}>{a.tagline}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: 6 }}>{a.points.map((p) => <li key={p} style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, display: "flex", alignItems: "flex-start", gap: 8 }}><CheckCircle2 size={13} style={{ color: a.accent, marginTop: 2, flexShrink: 0 }} />{p}</li>)}</ul>
                  <div style={{ color: a.accent, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>{a.cta} <ArrowRight size={15} /></div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#091d30", padding: "3rem 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Live · Публічний моніторинг · Всі дані деперсоніфіковані</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {liveStats.map((s) => <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}><div style={{ color: s.color, fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}>{s.value}</div><div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 6 }}>{s.label}</div></div>)}
          </div>
          <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div><div style={{ color: GOLD, fontSize: "1.75rem", fontWeight: 800 }}>98.5%</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Верифіковані транзакції · Solana on-chain</div></div>
            <div><div style={{ color: "#10b981", fontSize: "1.75rem", fontWeight: 800 }}>$2.4M</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Задіяні ресурси · Q1–Q2 2026</div></div>
            <div><div style={{ color: "hsl(25,75%,65%)", fontSize: "1.75rem", fontWeight: 800 }}>47</div><div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Активних програм · Grand Bargain · IATI compliant</div></div>
            <div style={{ marginLeft: "auto" }}><button onClick={() => (window.location.href = "/api/login")} style={{ color: GOLD, background: "none", border: "none", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>Повний дашборд прозорості <ChevronRight size={14} /></button></div>
          </div>
        </div>
      </section>

      <section style={{ padding: "3.5rem 0", background: `linear-gradient(135deg, #0d2035 0%, ${NAVY} 100%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 20, padding: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}><DollarSign size={16} style={{ color: GOLD }} /><span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Impact Financing · Публічний внесок</span></div>
              <h2 style={{ color: "white", fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.3 }}>Інвестуйте в ментальний добробут</h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, marginBottom: "1rem" }}>Будь-яка людина або організація може зробити цільовий внесок без реєстрації. Якщо хочете відслідковувати свої соціальні інвестиції — зареєструйтесь і отримайте доступ до Impact Financing Hub.</p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.6, fontStyle: "italic", marginBottom: "1rem" }}>Reverse Waterfall: Donor fills gap, not the whole budget. Local ownership first.<br />Комісія платформи: 7% → 3% дегресивна для програмних донорів.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 6, display: "block" }}>Сума (USD)</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>{["50", "100", "250", "500"].map((amt) => <button key={amt} onClick={() => setDonationAmount(amt)} style={{ padding: "0.6rem", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", background: donationAmount === amt ? GOLD : "transparent", color: donationAmount === amt ? NAVY : "rgba(255,255,255,0.55)", border: donationAmount === amt ? `1px solid ${GOLD}` : "1px solid rgba(255,255,255,0.15)" }}>${amt}</button>)}</div>
              </div>
              <div>
                <label style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 6, display: "block" }}>Цільове призначення</label>
                <select value={donationTarget} onChange={(e) => setDonationTarget(e.target.value)} style={{ width: "100%", background: "rgba(9,29,48,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "0.65rem 1rem", fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                  <option value="any">Будь-який верифікований кейс</option>
                  <option value="children">Діти та підлітки</option>
                  <option value="veterans">Ветерани та першорятувальники</option>
                  <option value="idc">Внутрішньо переміщені особи</option>
                  <option value="kharkiv">Харківська область</option>
                  <option value="zhytomyr">Житомирська область</option>
                </select>
              </div>
              <button onClick={() => (window.location.href = "/api/login")} style={{ background: GOLD, color: NAVY, fontWeight: 700, padding: "0.85rem", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><DollarSign size={16} /> Внести ${donationAmount} · Відслідковувати вплив</button>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, textAlign: "center" }}>Після внеску ви зможете зареєструватися і бачити результати в реальному часі</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 0", background: "#091d30" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <AlertCircle size={16} style={{ color: GOLD }} />
              <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Системні бар'єри</span>
            </div>
            <h2 style={{ color: "white", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400 }}>Шість прогалин, які ми усуваємо</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>{gaps.map((g) => <div key={g.num} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "1.5rem" }}><div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>{g.num} · {g.title}</div><p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.65 }}>{g.desc}</p></div>)}</div>
        </div>
      </section>

      <footer style={{ background: "#0B1E30", borderTop: "1px solid rgba(212,160,23,0.1)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginBottom: 4 }}>Feel Again · Humanitarian MHPSS Platform · Ukraine 2026</p>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11 }}>Всі дані деперсоніфіковані · Grand Bargain · IATI · mhGAP · Solana Blockchain · P2P Platform</p>
        </div>
      </footer>
    </div>
  );
}
