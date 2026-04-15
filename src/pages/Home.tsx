import { Mic, Users, Timer, ThumbsUp, ThumbsDown, Shield, ChevronRight, Smartphone, ArrowRight, Zap, Volume2 } from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "30 Seconds on Stage",
    desc: "Every speaker gets 30 seconds to make their point. No rambling, no filler — just pure takes.",
    glow: "var(--ptm-indigo)",
  },
  {
    icon: Users,
    title: "The Crowd Decides",
    desc: "After your time is up, everyone votes: keep the mic or pass it. Democracy in real time.",
    glow: "var(--ptm-green)",
  },
  {
    icon: Shield,
    title: "Moderator Control",
    desc: "Create rooms, pick topics, manage the stage. Your room, your rules.",
    glow: "var(--ptm-purple)",
  },
  {
    icon: Timer,
    title: "Instant Results",
    desc: "A 20-second voting window. Results land immediately — no waiting, no ambiguity.",
    glow: "var(--ptm-blue)",
  },
]

const categories = [
  "💰 Finance", "🎬 Entertainment", "⚽ Sports", "💻 Technology",
  "🎵 Music", "🍔 Food", "✈️ Travel", "🔮 Tarot", "🎲 Betting",
]

const steps = [
  { num: "01", title: "Join a room", desc: "Browse live conversations by topic and jump in as a listener." },
  { num: "02", title: "Raise your hand", desc: "The moderator picks who speaks next from the queue." },
  { num: "03", title: "Speak for 30s", desc: "Make your case. The timer is ticking and everyone is listening." },
  { num: "04", title: "Survive the vote", desc: "Keep or pass — the crowd decides if you stay on stage." },
]

export default function Home() {
  return (
    <div className="noise-bg min-h-screen relative" style={{ backgroundColor: "var(--ptm-bg)" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-30 backdrop-blur-xl"
        style={{
          backgroundColor: "oklch(0.08 0.03 270 / 0.85)",
          borderBottom: "1px solid oklch(0.22 0.05 270 / 0.5)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center glow-box"
              style={{ backgroundColor: "var(--ptm-indigo)" }}
            >
              <Mic size={18} style={{ color: "var(--ptm-bg)" }} />
            </div>
            <span className="text-lg font-black" style={{ color: "var(--ptm-text)" }}>
              Pass the Mic
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="#how-it-works"
              className="hidden sm:block text-sm font-medium transition-colors hover:text-white"
              style={{ color: "var(--ptm-text-dim)" }}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="hidden sm:block text-sm font-medium transition-colors hover:text-white"
              style={{ color: "var(--ptm-text-dim)" }}
            >
              Features
            </a>
            <button
              className="h-10 px-5 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{ backgroundColor: "var(--ptm-indigo)", color: "var(--ptm-bg)" }}
            >
              Get the App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Hero ambient glow */}
        <div
          className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[150px] pointer-events-none"
          style={{ backgroundColor: "oklch(0.50 0.18 270 / 0.15)" }}
        />
        <div
          className="absolute top-[100px] right-[-200px] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: "oklch(0.50 0.15 300 / 0.08)" }}
        />

        <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-36 pb-24 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2.5 text-xs font-bold px-4 py-2 rounded-full mb-8 glow-border"
              style={{ backgroundColor: "var(--ptm-card)", color: "var(--ptm-indigo)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--ptm-green)" }}
              />
              Live now — rooms are open
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8"
              style={{ color: "var(--ptm-text)" }}
            >
              Talk your talk.
              <br />
              <span className="glow-text" style={{ color: "var(--ptm-indigo)" }}>
                Let the people decide.
              </span>
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed mb-12 max-w-lg"
              style={{ color: "var(--ptm-text-dim)" }}
            >
              Live audio with stakes. 30 seconds to talk, then the crowd votes —
              keep the mic or pass it on. No clout. No followers. Just your words.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                className="h-14 px-8 rounded-2xl text-base font-bold flex items-center gap-3 transition-all hover:scale-[1.03] active:scale-[0.97] glow-box-strong"
                style={{ backgroundColor: "var(--ptm-indigo)", color: "var(--ptm-bg)" }}
              >
                <Smartphone size={20} />
                Download for Android
              </button>
              <a
                href="#how-it-works"
                className="h-14 px-8 rounded-2xl text-base font-medium flex items-center gap-2 transition-all hover:scale-[1.02]"
                style={{
                  color: "var(--ptm-text-dim)",
                  border: "1px solid var(--ptm-card-light)",
                }}
              >
                See how it works
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <section
        className="relative z-10"
        style={{
          backgroundColor: "var(--ptm-surface)",
          borderTop: "1px solid oklch(0.22 0.05 270 / 0.4)",
          borderBottom: "1px solid oklch(0.22 0.05 270 / 0.4)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "30s", label: "Per speaker", color: "var(--ptm-indigo)" },
            { val: "20s", label: "Voting window", color: "var(--ptm-blue)" },
            { val: "9", label: "Topic categories", color: "var(--ptm-purple)" },
            { val: "∞", label: "Hot takes", color: "var(--ptm-green)" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-4xl md:text-5xl font-black mb-1"
                style={{ color: s.color }}
              >
                {s.val}
              </p>
              <p className="text-sm" style={{ color: "var(--ptm-text-muted)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="text-center mb-16">
          <p
            className="text-xs font-bold tracking-[0.2em] mb-4"
            style={{ color: "var(--ptm-indigo)" }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{ color: "var(--ptm-text)" }}
          >
            Four steps to the stage
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="rounded-2xl p-6 relative overflow-hidden transition-transform hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--ptm-card)",
                border: "1px solid oklch(0.22 0.05 270 / 0.4)",
              }}
            >
              <span
                className="text-7xl font-black absolute -top-3 -left-1 pointer-events-none select-none"
                style={{ color: "oklch(0.72 0.19 270 / 0.06)" }}
              >
                {step.num}
              </span>
              <div className="pt-10">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--ptm-text)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ptm-text-dim)" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The vote — visual centerpiece */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--ptm-surface)",
          borderTop: "1px solid oklch(0.22 0.05 270 / 0.4)",
          borderBottom: "1px solid oklch(0.22 0.05 270 / 0.4)",
        }}
      >
        {/* Ambient glow behind the card */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
          style={{ backgroundColor: "oklch(0.50 0.18 270 / 0.10)" }}
        />

        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-xs font-bold tracking-[0.2em] mb-4"
                style={{ color: "var(--ptm-green)" }}
              >
                THE VOTE
              </p>
              <h2
                className="text-3xl md:text-4xl font-black tracking-tight mb-5"
                style={{ color: "var(--ptm-text)" }}
              >
                Keep or pass —{" "}
                <span style={{ color: "var(--ptm-green)" }}>the crowd decides</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--ptm-text-dim)" }}
              >
                After your 30 seconds, a 20-second voting window opens. Every
                listener taps keep or pass. Majority rules — if they want more,
                you stay. If not, the mic moves on. No algorithm. No bias. Just
                the room.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: ThumbsUp, text: "Keep — the speaker stays on stage", color: "var(--ptm-green)" },
                  { icon: ThumbsDown, text: "Pass — mic goes to next in line", color: "var(--ptm-red)" },
                  { icon: Zap, text: "Mods can force-pass at any time", color: "var(--ptm-purple)" },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.text} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `color-mix(in oklch, ${item.color}, transparent 85%)` }}
                      >
                        <Icon size={14} style={{ color: item.color }} />
                      </div>
                      <span className="text-sm" style={{ color: "var(--ptm-text-dim)" }}>
                        {item.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mock vote card */}
            <div className="flex justify-center">
              <div
                className="w-full max-w-sm rounded-3xl p-8 glow-border"
                style={{ backgroundColor: "var(--ptm-card)" }}
              >
                <div className="flex flex-col items-center mb-8">
                  {/* Avatar with ring */}
                  <div className="relative mb-4">
                    <svg viewBox="0 0 120 120" className="w-24 h-24 -rotate-90">
                      <circle
                        cx="60" cy="60" r="54" fill="none"
                        stroke="var(--ptm-card-light)" strokeWidth="5"
                      />
                      <circle
                        cx="60" cy="60" r="54" fill="none"
                        stroke="var(--ptm-indigo)" strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 54}`}
                        strokeDashoffset={`${2 * Math.PI * 54 * 0.35}`}
                      />
                    </svg>
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        className="w-[76px] h-[76px] rounded-full flex items-center justify-center text-xl font-bold"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.55 0.18 240), oklch(0.60 0.20 300))",
                          color: "white",
                        }}
                      >
                        K
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-black" style={{ color: "var(--ptm-text)" }}>
                    Kendrick
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-2xl font-black tabular-nums"
                      style={{ color: "var(--ptm-indigo)" }}
                    >
                      14
                    </span>
                    <span className="text-xs font-medium" style={{ color: "var(--ptm-indigo)" }}>
                      Vote now!
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 mb-4">
                  <div
                    className="flex-1 h-13 rounded-xl flex items-center justify-center gap-2 text-sm font-bold"
                    style={{ backgroundColor: "var(--ptm-green)", color: "var(--ptm-bg)" }}
                  >
                    👍 Keep · 8
                  </div>
                  <div
                    className="flex-1 h-13 rounded-xl flex items-center justify-center gap-2 text-sm font-bold"
                    style={{ backgroundColor: "var(--ptm-red)", color: "var(--ptm-bg)" }}
                  >
                    🔄 Pass · 5
                  </div>
                </div>
                <p
                  className="text-center text-sm font-semibold"
                  style={{ color: "var(--ptm-green)" }}
                >
                  🎉 Keep the Mic! (8-5)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="text-center mb-16">
          <p
            className="text-xs font-bold tracking-[0.2em] mb-4"
            style={{ color: "var(--ptm-purple)" }}
          >
            FEATURES
          </p>
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{ color: "var(--ptm-text)" }}
          >
            Built for real conversation
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-2xl p-7 transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: "var(--ptm-card)",
                  border: `1px solid color-mix(in oklch, ${f.glow}, transparent 75%)`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `color-mix(in oklch, ${f.glow}, transparent 88%)` }}
                >
                  <Icon size={22} style={{ color: f.glow }} />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--ptm-text)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ptm-text-dim)" }}>
                  {f.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Topics */}
      <section
        className="relative z-10"
        style={{
          backgroundColor: "var(--ptm-surface)",
          borderTop: "1px solid oklch(0.22 0.05 270 / 0.4)",
          borderBottom: "1px solid oklch(0.22 0.05 270 / 0.4)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-4xl font-black tracking-tight mb-3"
              style={{ color: "var(--ptm-text)" }}
            >
              Every topic has a stage
            </h2>
            <p className="text-sm" style={{ color: "var(--ptm-text-muted)" }}>
              Pick what you're into. There's always a room.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <span
                key={c}
                className="text-sm px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105 cursor-default"
                style={{
                  backgroundColor: "var(--ptm-card)",
                  border: "1px solid oklch(0.22 0.05 270 / 0.5)",
                  color: "var(--ptm-text)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="relative overflow-hidden">
          {/* CTA glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[140px] pointer-events-none"
            style={{ backgroundColor: "oklch(0.50 0.18 270 / 0.12)" }}
          />
          <div
            className="rounded-3xl p-12 md:p-20 text-center relative z-10 glow-border"
            style={{ backgroundColor: "var(--ptm-card)" }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse-glow"
              style={{ backgroundColor: "color-mix(in oklch, var(--ptm-indigo), transparent 85%)" }}
            >
              <Mic size={28} style={{ color: "var(--ptm-indigo)" }} />
            </div>
            <h2
              className="text-3xl md:text-5xl font-black tracking-tight mb-5"
              style={{ color: "var(--ptm-text)" }}
            >
              Ready to speak up?
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-md mx-auto"
              style={{ color: "var(--ptm-text-dim)" }}
            >
              Download Pass the Mic and join the conversation.
              Your 30 seconds start now.
            </p>
            <button
              className="h-14 px-10 rounded-2xl text-base font-bold inline-flex items-center gap-3 transition-all hover:scale-[1.03] active:scale-[0.97] glow-box-strong"
              style={{ backgroundColor: "var(--ptm-indigo)", color: "var(--ptm-bg)" }}
            >
              <Smartphone size={20} />
              Download for Android
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10"
        style={{ borderTop: "1px solid oklch(0.22 0.05 270 / 0.4)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--ptm-indigo)" }}
            >
              <Mic size={14} style={{ color: "var(--ptm-bg)" }} />
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--ptm-text)" }}>
              Pass the Mic
            </span>
          </div>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm transition-colors hover:text-white"
                style={{ color: "var(--ptm-text-muted)" }}
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs" style={{ color: "var(--ptm-text-muted)" }}>
            &copy; 2026 Pass the Mic
          </p>
        </div>
      </footer>
    </div>
  )
}
