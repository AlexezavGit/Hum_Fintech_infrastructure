import { useState } from "react";
import { useLocation } from "wouter";
import { Heart, Shield, Users, TrendingUp, Brain, Stethoscope, Globe, ArrowRight, ChevronRight, Activity, DollarSign, Lock } from "lucide-react";

const publicStats = [
  { label: "Beneficiaries Supported", value: "2,847", icon: Users, color: "teal" },
  { label: "Active Professionals", value: "124", icon: Stethoscope, color: "gold" },
  { label: "Recovery Rate", value: "68%", icon: Activity, color: "purple" },
  { label: "Verified Facilities", value: "32", icon: Shield, color: "copper" },
];

const audiences = [
  {
    key: "beneficiary",
    color: "teal",
    borderColor: "hsla(185,100%,40%,0.3)",
    bgColor: "hsla(185,100%,40%,0.07)",
    iconColor: "hsl(185,100%,50%)",
    icon: Brain,
    question: "Хочете пройти діагностику, знайти спеціаліста або поговорити з AI-консультантом?",
    sub: "Конфіденційно · Безоплатно · Без черг",
    cta: "Розпочати",
    route: "/portal/beneficiary",
  },
  {
    key: "provider",
    color: "gold",
    borderColor: "hsla(43,96%,56%,0.3)",
    bgColor: "hsla(43,96%,56%,0.07)",
    iconColor: "hsl(43,96%,60%)",
    icon: Stethoscope,
    question: "Хочете дізнатись про можливості розвитку практики в гуманітарному реагуванні?",
    sub: "Фінансування · Звітність · Зростання",
    cta: "Для практиків",
    route: "/portal/provider",
  },
  {
    key: "donor",
    color: "copper",
    borderColor: "hsla(25,75%,52%,0.3)",
    bgColor: "hsla(25,75%,52%,0.07)",
    iconColor: "hsl(25,75%,65%)",
    icon: TrendingUp,
    question: "Хочете контролювати цільове використання ресурсів у режимі реального часу?",
    sub: "Прозорість · Ефективність · Вплив",
    cta: "Impact Financing Hub",
    route: "/portal/donor",
  },
];

const mheiRegions = [
  { region: "Kyiv", index: 74.2, trend: "+2.1" },
  { region: "Kharkiv", index: 61.8, trend: "+4.3" },
  { region: "Lviv", index: 79.5, trend: "+1.2" },
  { region: "Odessa", index: 66.1, trend: "+3.0" },
  { region: "Zhytomyr", index: 58.4, trend: "+5.7" },
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const [donationAmount, setDonationAmount] = useState("100");
  const [donationTarget, setDonationTarget] = useState("any");

  return (
    <div className="min-h-screen blueprint-bg">
      {/* Nav */}
      <nav className="glass-card border-b border-[hsla(185,100%,40%,0.15)] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[hsla(185,100%,40%,0.15)] border border-[hsla(185,100%,40%,0.25)] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[hsl(185,100%,50%)]" />
            </div>
            <span className="text-xl font-bold teal-text">Feel Again</span>
            <span className="hidden sm:block text-xs text-[hsl(185,15%,40%)] ml-2 border-l border-[hsla(185,30%,20%,0.5)] pl-2">Платформа ментального здоров'я · UA</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "/api/login")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-sm hover:bg-[hsla(185,100%,40%,0.08)] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />Увійти
            </button>
          </div>
        </div>
      </nav>

      {/* MHEI Banner */}
      <div className="bg-[hsla(185,100%,40%,0.06)] border-b border-[hsla(185,100%,40%,0.1)]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-6 overflow-x-auto">
          <span className="text-[10px] font-bold text-[hsl(185,15%,40%)] uppercase tracking-widest shrink-0">MHEI · Індекс ментального здоров'я</span>
          {mheiRegions.map((r) => (
            <div key={r.region} className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-[hsl(185,15%,55%)]">{r.region}</span>
              <span className="text-sm font-bold teal-text">{r.index}</span>
              <span className="text-xs text-[hsl(160,84%,50%)]">▲{r.trend}</span>
            </div>
          ))}
          <span className="text-[10px] text-[hsl(185,15%,35%)] shrink-0 ml-auto">Вплив на ВВП: +0.34% YTD</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsla(185,100%,40%,0.3)] bg-[hsla(185,100%,40%,0.08)] mb-6">
            <Globe className="w-3.5 h-3.5 text-[hsl(185,100%,50%)]" />
            <span className="text-xs text-[hsl(185,15%,65%)] tracking-widest uppercase">Відкрита платформа · Деперсоніфіковані дані · Блокчейн-верифікація</span>
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            <span className="teal-text">Feel Again</span>
            <br />
            <span className="text-[hsl(185,20%,75%)] text-2xl font-light">Психологічна допомога. Прозоре фінансування. Публічний контроль.</span>
          </h1>
          <p className="text-base text-[hsl(185,15%,50%)] max-w-2xl mx-auto">
            Екосистема, що з'єднує тих, хто потребує підтримки, з тими, хто надає послуги — і забезпечує прозорий розподіл ресурсів для всіх учасників.
          </p>
        </div>

        {/* Public stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {publicStats.map((s) => {
            const Icon = s.icon;
            const colorMap: Record<string, string> = {
              teal: "hsl(185,100%,50%)",
              gold: "hsl(43,96%,60%)",
              purple: "hsl(270,60%,65%)",
              copper: "hsl(25,75%,65%)",
            };
            return (
              <div key={s.label} className="glass-card rounded-xl p-5 border border-[hsla(185,30%,20%,0.5)] text-center">
                <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: colorMap[s.color] }} />
                <div className="text-2xl font-black" style={{ color: colorMap[s.color] }}>{s.value}</div>
                <div className="text-xs text-[hsl(185,15%,45%)] mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* 3 audience entry cards */}
        <div className="mb-16">
          <p className="text-center text-xs text-[hsl(185,15%,40%)] uppercase tracking-widest mb-6">Оберіть свій шлях</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {audiences.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.key}
                  onClick={() => setLocation(a.route)}
                  className="glass-card rounded-2xl p-7 text-left group transition-all hover:scale-[1.02] active:scale-[0.99]"
                  style={{ border: `1px solid ${a.borderColor}` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: a.bgColor, border: `1px solid ${a.borderColor}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: a.iconColor }} />
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(185,20%,90%)] mb-3 leading-snug">{a.question}</h3>
                  <p className="text-xs text-[hsl(185,15%,45%)] mb-5">{a.sub}</p>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                    style={{ color: a.iconColor }}
                  >
                    {a.cta} <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Public donation block */}
        <div className="glass-card rounded-2xl p-8 border border-[hsla(25,75%,52%,0.25)] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-[hsl(25,75%,65%)]" />
                <span className="text-xs font-bold text-[hsl(25,75%,65%)] uppercase tracking-widest">Impact Financing · Публічний внесок</span>
              </div>
              <h2 className="text-2xl font-bold text-[hsl(185,20%,90%)] mb-3">Інвестуйте в ментальний добробут</h2>
              <p className="text-sm text-[hsl(185,15%,55%)] mb-4">
                Будь-яка людина або організація може зробити цільовий внесок без реєстрації. Якщо хочете відслідковувати свої соціальні інвестиції — зареєструйтесь і отримайте доступ до Impact Financing Hub.
              </p>
              <div className="flex items-center gap-2 text-xs text-[hsl(185,15%,40%)]">
                <Shield className="w-3.5 h-3.5 text-[hsl(160,84%,50%)]" />
                Всі транзакції верифіковані на Solana blockchain
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[hsl(185,15%,50%)] mb-1 block">Сума (USD)</label>
                <div className="flex gap-2">
                  {["50", "100", "250", "500"].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setDonationAmount(amt)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        donationAmount === amt
                          ? "bg-[hsl(25,75%,52%)] text-white"
                          : "border border-[hsla(185,30%,20%,0.5)] text-[hsl(185,15%,55%)] hover:border-[hsl(25,75%,52%)]"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-[hsl(185,15%,50%)] mb-1 block">Цільове призначення</label>
                <select
                  value={donationTarget}
                  onChange={(e) => setDonationTarget(e.target.value)}
                  className="w-full bg-[hsla(195,45%,9%,0.8)] border border-[hsla(185,30%,20%,0.8)] rounded-xl px-4 py-2.5 text-sm text-[hsl(185,20%,80%)]"
                >
                  <option value="any">Будь-який верифікований кейс</option>
                  <option value="children">Діти та підлітки</option>
                  <option value="veterans">Ветерани та першорятувальники</option>
                  <option value="idc">Внутрішньо переміщені особи</option>
                  <option value="kharkiv">Харківська область</option>
                  <option value="zhytomyr">Житомирська область</option>
                </select>
              </div>
              <button
                onClick={() => (window.location.href = "/api/login")}
                className="w-full py-3 rounded-xl bg-[hsl(25,75%,52%)] hover:bg-[hsl(25,75%,46%)] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <DollarSign className="w-4 h-4" />
                Внести ${donationAmount} · Відслідковувати вплив
              </button>
              <p className="text-center text-xs text-[hsl(185,15%,35%)]">
                Після внеску ви зможете зареєструватись і бачити результати в реальному часі
              </p>
            </div>
          </div>
        </div>

        {/* Transparency block */}
        <div className="glass-card rounded-2xl p-8 border border-[hsla(185,100%,40%,0.15)] mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 teal-text" />
            <h2 className="text-lg font-bold teal-text">Публічний моніторинг · Всі дані відкриті</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-black teal-text mb-1">98.5%</div>
              <div className="text-sm text-[hsl(185,15%,55%)]">Верифіковані транзакції</div>
              <div className="text-xs text-[hsl(185,15%,35%)] mt-1">Solana · on-chain</div>
            </div>
            <div>
              <div className="text-3xl font-black gold-text mb-1">$2.4M</div>
              <div className="text-sm text-[hsl(185,15%,55%)]">Задіяні ресурси</div>
              <div className="text-xs text-[hsl(185,15%,35%)] mt-1">Q1–Q2 2026</div>
            </div>
            <div>
              <div className="text-3xl font-black copper-text mb-1">47</div>
              <div className="text-sm text-[hsl(185,15%,55%)]">Активних програм фінансування</div>
              <div className="text-xs text-[hsl(185,15%,35%)] mt-1">Grand Bargain · IATI compliant</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[hsla(185,30%,20%,0.4)]">
            <button
              onClick={() => (window.location.href = "/api/login")}
              className="flex items-center gap-2 text-sm text-[hsl(185,100%,60%)] hover:gap-3 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
              Переглянути повний дашборд прозорості
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[hsl(185,15%,30%)] space-y-1">
          <p>Feel Again · Humanitarian MHPSS Platform · Ukraine 2026</p>
          <p>Всі дані деперсоніфіковані · Grand Bargain · IATI · mhGAP · Solana Blockchain</p>
        </div>
      </div>

      <footer className="h-1 rainbow-gradient mt-8" />
    </div>
  );
}
