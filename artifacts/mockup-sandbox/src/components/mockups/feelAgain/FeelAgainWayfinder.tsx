import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Brain,
  ChevronDown,
  CircleDollarSign,
  HeartHandshake,
  MapPin,
  Menu,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";

type Role = "support" | "practice" | "fund";

const roles: Record<
  Role,
  {
    label: string;
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    icon: typeof Brain;
    color: string;
    tint: string;
    steps: string[];
  }
> = {
  support: {
    label: "Мені потрібна підтримка",
    eyebrow: "Шлях людини",
    title: "Почніть із того, що відчуваєте.",
    body: "Коротка конфіденційна оцінка покаже наступний крок — без черг, стигми й зайвих форм.",
    cta: "Почати оцінку",
    icon: Brain,
    color: "#F0B36A",
    tint: "rgba(240,179,106,.12)",
    steps: ["Оцініть стан", "Знайдіть фахівця", "Бачте свій прогрес"],
  },
  practice: {
    label: "Я надаю допомогу",
    eyebrow: "Шлях фахівця",
    title: "Зробіть свою практику видимою.",
    body: "Ведіть випадки, отримуйте супервізію та звітуйте про результати в одному цифровому коридорі.",
    cta: "Відкрити кабінет",
    icon: Stethoscope,
    color: "#71D1C4",
    tint: "rgba(113,209,196,.12)",
    steps: ["Створіть профіль", "Підтвердьте кваліфікацію", "Приймайте направлення"],
  },
  fund: {
    label: "Я фінансую рішення",
    eyebrow: "Шлях партнера",
    title: "Спрямовуйте ресурси туди, де вони потрібні.",
    body: "Слідкуйте за кожною гривнею від внеску до вимірюваного результату — у відкритому контурі довіри.",
    cta: "Переглянути вплив",
    icon: CircleDollarSign,
    color: "#D5C67A",
    tint: "rgba(213,198,122,.12)",
    steps: ["Оберіть напрям", "Підтвердіть внесок", "Читайте результат"],
  },
};

const regions = [
  { name: "Харків", value: "61.8", delta: "+4.3", x: "24%", y: "43%" },
  { name: "Київ", value: "74.2", delta: "+2.1", x: "50%", y: "24%" },
  { name: "Житомир", value: "58.4", delta: "+5.7", x: "37%", y: "19%" },
  { name: "Одеса", value: "66.1", delta: "+3.0", x: "48%", y: "78%" },
  { name: "Львів", value: "79.5", delta: "+1.2", x: "11%", y: "34%" },
];

export function FeelAgainWayfinder() {
  const [role, setRole] = useState<Role>("support");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const active = roles[role];
  const ActiveIcon = active.icon;

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#071A2C",
        color: "#F4F0E8",
        fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        button { font: inherit; }
        .wayfinder-scroll::-webkit-scrollbar { display: none; }
        .wayfinder-scroll { scrollbar-width: none; }
        @keyframes rise { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        .rise { animation: rise .55s ease both; }
      `}</style>

      <header
        style={{
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: "1px solid rgba(240,179,106,.15)",
          background: "rgba(7,26,44,.84)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 29,
              height: 29,
              border: "1px solid #F0B36A",
              borderRadius: "50% 50% 50% 8px",
              transform: "rotate(-45deg)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <HeartHandshake size={14} color="#F0B36A" style={{ transform: "rotate(45deg)" }} />
          </div>
          <span style={{ fontWeight: 700, letterSpacing: "-.03em", fontSize: 17 }}>FEEL <span style={{ color: "#F0B36A" }}>Again</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10, color: "rgba(244,240,232,.45)", fontFamily: "'Space Mono', monospace", letterSpacing: ".08em" }}>UA / 2026</span>
          <button aria-label="Відкрити меню" onClick={() => setMenuOpen(!menuOpen)} style={{ border: 0, background: "transparent", color: "#F4F0E8", padding: 4, cursor: "pointer" }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="rise" style={{ position: "absolute", top: 62, right: 16, zIndex: 4, width: 190, padding: 8, border: "1px solid rgba(240,179,106,.24)", background: "#102B43", borderRadius: 12, boxShadow: "0 20px 50px rgba(0,0,0,.3)" }}>
          {["Про платформу", "Відкриті дані", "Партнерство"].map((item) => (
            <button key={item} onClick={() => setMenuOpen(false)} style={{ display: "block", width: "100%", textAlign: "left", color: "rgba(244,240,232,.78)", background: "transparent", border: 0, padding: "11px 10px", cursor: "pointer", fontSize: 13, borderRadius: 7 }}>
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="wayfinder-scroll" style={{ maxWidth: 480, margin: "0 auto", padding: "0 18px 44px", overflowY: "auto" }}>
        <section className="rise" style={{ padding: "37px 3px 27px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#F0B36A", fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: ".13em", textTransform: "uppercase", marginBottom: 18 }}>
            <span style={{ width: 26, height: 1, background: "#F0B36A" }} /> цифровий коридор підтримки
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(34px, 9vw, 47px)", lineHeight: 1.02, letterSpacing: "-.055em", fontWeight: 500 }}>
            Куди ви<br /><span style={{ color: "#F0B36A" }}>прямуєте?</span>
          </h1>
          <p style={{ color: "rgba(244,240,232,.55)", fontSize: 14, lineHeight: 1.6, maxWidth: 350, margin: "19px 0 0" }}>
            Один простір для людей, які шукають опору, і тих, хто її створює.
          </p>
        </section>

        <section className="rise" style={{ animationDelay: ".08s", border: "1px solid rgba(244,240,232,.13)", background: "rgba(255,255,255,.035)", borderRadius: 16, padding: 6 }}>
          {(Object.keys(roles) as Role[]).map((key) => {
            const item = roles[key];
            const Icon = item.icon;
            const selected = role === key;
            return (
              <button
                key={key}
                onClick={() => setRole(key)}
                style={{ width: "100%", border: selected ? `1px solid ${item.color}` : "1px solid transparent", background: selected ? item.tint : "transparent", color: "#F4F0E8", padding: "14px 13px", borderRadius: 11, display: "flex", alignItems: "center", gap: 12, textAlign: "left", cursor: "pointer", transition: "transform .2s ease, opacity .2s ease", marginBottom: key === "fund" ? 0 : 3 }}
              >
                <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 9, color: item.color, background: selected ? "rgba(0,0,0,.14)" : "rgba(255,255,255,.055)" }}><Icon size={18} /></span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: selected ? 600 : 500 }}>{item.label}</span>
                <ChevronDown size={16} color={selected ? item.color : "rgba(244,240,232,.25)"} style={{ transform: selected ? "rotate(-90deg)" : "none" }} />
              </button>
            );
          })}
        </section>

        <section key={role} className="rise" style={{ padding: "28px 3px 12px" }}>
          <div style={{ color: active.color, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>{active.eyebrow}</div>
          <h2 style={{ fontSize: 28, lineHeight: 1.1, letterSpacing: "-.04em", fontWeight: 500, margin: "0 0 12px" }}>{active.title}</h2>
          <p style={{ color: "rgba(244,240,232,.57)", lineHeight: 1.58, fontSize: 14, margin: 0, maxWidth: 390 }}>{active.body}</p>
          <button onClick={() => setShowMap(!showMap)} style={{ marginTop: 20, background: active.color, color: "#071A2C", border: 0, borderRadius: 9, padding: "12px 15px", fontWeight: 700, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            {active.cta}<ArrowUpRight size={16} />
          </button>
        </section>

        {showMap ? (
          <section className="rise" style={{ borderRadius: 15, border: "1px solid rgba(113,209,196,.24)", background: "rgba(113,209,196,.07)", padding: 17, marginTop: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 13 }}>
              <div><div style={{ color: "#71D1C4", fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: ".1em" }}>MHEI / LIVE</div><strong style={{ display: "block", fontSize: 16, marginTop: 5 }}>Стан системи по регіонах</strong></div>
              <MapPin size={17} color="#71D1C4" />
            </div>
            <div style={{ height: 154, position: "relative", background: "linear-gradient(135deg, rgba(7,26,44,.8), rgba(16,57,74,.55))", borderRadius: 10, overflow: "hidden", backgroundImage: "linear-gradient(rgba(113,209,196,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(113,209,196,.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
              {regions.map((region) => <div key={region.name} style={{ position: "absolute", left: region.x, top: region.y, transform: "translate(-50%,-50%)", textAlign: "center" }}><div style={{ width: 10, height: 10, margin: "0 auto 3px", borderRadius: "50%", background: "#71D1C4", boxShadow: "0 0 0 5px rgba(113,209,196,.14)" }} /><div style={{ fontSize: 9, color: "rgba(244,240,232,.72)" }}>{region.name}</div><div style={{ fontSize: 9, color: "#71D1C4", fontFamily: "'Space Mono', monospace" }}>{region.value}</div></div>)}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 13, fontSize: 10, color: "rgba(244,240,232,.47)" }}><span><b style={{ color: "#71D1C4" }}>+3.4</b> середній приріст</span><span><b style={{ color: "#F0B36A" }}>47</b> організацій</span></div>
          </section>
        ) : (
          <section className="rise" style={{ animationDelay: ".15s", marginTop: 24, padding: "18px 3px 2px", borderTop: "1px solid rgba(244,240,232,.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ color: "rgba(244,240,232,.42)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em" }}>Ваш маршрут</span>
              <span style={{ color: "#71D1C4", fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#71D1C4" }} /> система активна</span>
            </div>
            <div style={{ display: "flex", gap: 0 }}>
              {active.steps.map((step, index) => <div key={step} style={{ flex: 1, position: "relative", paddingRight: 7 }}><div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}><span style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${index === 0 ? active.color : "rgba(244,240,232,.24)"}`, color: index === 0 ? active.color : "rgba(244,240,232,.5)", display: "grid", placeItems: "center", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>{String(index + 1).padStart(2, "0")}</span>{index < 2 && <span style={{ height: 1, background: "rgba(244,240,232,.13)", flex: 1, marginLeft: 5 }} />}</div><span style={{ fontSize: 11, color: index === 0 ? "#F4F0E8" : "rgba(244,240,232,.45)", lineHeight: 1.3 }}>{step}</span></div>)}
            </div>
          </section>
        )}

        <section className="rise" style={{ animationDelay: ".22s", marginTop: 27, padding: "15px 0", display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid rgba(244,240,232,.1)" }}>
          <ShieldCheck size={19} color="#D5C67A" />
          <span style={{ fontSize: 11, color: "rgba(244,240,232,.47)", lineHeight: 1.4 }}>Дані деперсоніфіковані.<br /><b style={{ color: "rgba(244,240,232,.75)", fontWeight: 500 }}>Ваш вибір залишається вашим.</b></span>
          <BadgeCheck size={18} color="#D5C67A" style={{ marginLeft: "auto" }} />
        </section>
      </div>
    </main>
  );
}

export default FeelAgainWayfinder;