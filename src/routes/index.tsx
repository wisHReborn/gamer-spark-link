import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Heart, Twitch, Youtube, Facebook, MessageCircle,
  Music2, Cpu, MonitorPlay, Keyboard, Mouse, Headphones,
  Users, Menu, X, Zap, Languages,
} from "lucide-react";
import avatar from "@/assets/avatar.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HEROO — Streamer Hub & Donation" },
      { name: "description", content: "ศูนย์รวมลิงก์และช่องทางสนับสนุนของสตรีมเมอร์ HEROO — โดเนท, โซเชียล, สเปคเครื่อง และคอมมูนิตี้" },
      { property: "og:title", content: "HEROO — Streamer Hub" },
      { property: "og:description", content: "Support the stream. Join the squad." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

type Lang = "th" | "en";

const t = {
  th: {
    nav: { support: "สนับสนุน", links: "ลิงก์", gear: "อุปกรณ์", community: "คอมมูนิตี้" },
    live: "กำลังไลฟ์",
    bio: "นักรบดิจิทัล • สตรีมเมอร์ • คอนเทนต์เกม FPS / MMORPG",
    heroCta: "โดเนทเดี๋ยวนี้",
    secCta: "ดูลิงก์ทั้งหมด",
    supportTitle: "สนับสนุนช่อง",
    supportSub: "ทุกการสนับสนุนช่วยให้สตรีมไปต่อได้ ขอบคุณมากนะครับ ❤️",
    linksTitle: "ช่องทางทั้งหมด",
    linksSub: "ติดตามและพูดคุยกับเราได้ทุกแพลตฟอร์ม",
    gearTitle: "สเปคเครื่อง & อุปกรณ์",
    gearSub: "อาวุธคู่ใจที่ใช้สตรีมทุกวัน",
    commTitle: "เข้าร่วมคอมมูนิตี้",
    commSub: "กิลด์ของเรารอคุณอยู่ มาตีบอสด้วยกัน!",
    joinDiscord: "เข้าร่วม Discord",
    footer: "สร้างด้วย ❤️ สำหรับเกมเมอร์ทุกคน",
  },
  en: {
    nav: { support: "Support", links: "Links", gear: "Gear", community: "Community" },
    live: "LIVE NOW",
    bio: "Digital warrior • Streamer • FPS / MMORPG content creator",
    heroCta: "Donate Now",
    secCta: "View All Links",
    supportTitle: "Support the Stream",
    supportSub: "Every tip keeps the stream alive. Thanks for the love ❤️",
    linksTitle: "All My Links",
    linksSub: "Follow and chat with me everywhere",
    gearTitle: "Setup & Gear",
    gearSub: "The weapons I use every stream",
    commTitle: "Join the Community",
    commSub: "Our guild is waiting. Let's raid together!",
    joinDiscord: "Join Discord",
    footer: "Built with ❤️ for gamers everywhere",
  },
};

const donateOptions = [
  { name: "TipMe", desc: "PromptPay / Truemoney", url: "https://tipme.in.th", featured: true },
  { name: "Streamlabs", desc: "Credit Card / PayPal", url: "https://streamlabs.com" },
  { name: "PromptPay", desc: "สแกน QR ตรง", url: "#" },
];

const socials = [
  { name: "Twitch", handle: "@heroo_live", url: "https://twitch.tv", Icon: Twitch, color: "oklch(0.55 0.22 295)" },
  { name: "YouTube", handle: "HEROO Gaming", url: "https://youtube.com", Icon: Youtube, color: "oklch(0.62 0.24 27)" },
  { name: "Facebook", handle: "HEROO Page", url: "https://facebook.com", Icon: Facebook, color: "oklch(0.55 0.18 255)" },
  { name: "TikTok", handle: "@heroo.tk", url: "https://tiktok.com", Icon: Music2, color: "oklch(0.97 0.01 80)" },
  { name: "Discord", handle: "HEROO Guild", url: "https://discord.gg", Icon: MessageCircle, color: "oklch(0.6 0.18 270)" },
];

const gear = [
  { Icon: Cpu, label: "CPU", value: "AMD Ryzen 9 7950X" },
  { Icon: MonitorPlay, label: "GPU", value: "NVIDIA RTX 4090" },
  { Icon: MonitorPlay, label: "Monitor", value: 'LG 27" 240Hz OLED' },
  { Icon: Keyboard, label: "Keyboard", value: "Wooting 60HE" },
  { Icon: Mouse, label: "Mouse", value: "Logitech G Pro X Superlight 2" },
  { Icon: Headphones, label: "Headset", value: "Sennheiser HD 660S2" },
];

function Index() {
  const [lang, setLang] = useState<Lang>("th");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const L = t[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "support", label: L.nav.support },
    { id: "links", label: L.nav.links },
    { id: "gear", label: L.nav.gear },
    { id: "community", label: L.nav.community },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-foreground">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/85 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-display font-black text-xl">
            <Zap className="size-5 text-primary" fill="currentColor" />
            <span className="text-glow-primary">HEROO</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:border-primary hover:text-primary transition-colors text-xs font-bold"
              aria-label="Switch language"
            >
              <Languages className="size-3.5" />
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-secondary"
              aria-label="Menu"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="text-left px-3 py-3 rounded-md hover:bg-secondary font-semibold"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(to bottom, black 30%, transparent)",
          }}
        />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center animate-slide-up">
          <div className="relative inline-block animate-float">
            <div className="absolute -inset-2 rounded-full bg-gradient-primary blur-2xl opacity-60" />
            <img
              src={avatar}
              alt="HEROO avatar"
              width={160}
              height={160}
              className="relative size-32 sm:size-40 rounded-full object-cover border-4 border-primary shadow-glow"
            />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-destructive text-destructive-foreground text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
              <span className="size-1.5 rounded-full bg-current animate-pulse" />
              {L.live}
            </span>
          </div>

          <h1 className="mt-8 font-display font-black text-5xl sm:text-7xl tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent text-glow-primary">
              HEROO
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            {L.bio}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollTo("support")}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-cta text-cta-foreground font-bold px-7 py-3.5 rounded-lg shadow-cta animate-pulse-glow hover:scale-105 active:scale-100 transition-transform"
            >
              <Heart className="size-5 group-hover:scale-110 transition-transform" fill="currentColor" />
              {L.heroCta}
            </button>
            <button
              onClick={() => scrollTo("links")}
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold px-7 py-3.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {L.secCta}
            </button>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <Section id="support" eyebrow="01" title={L.supportTitle} subtitle={L.supportSub}>
        <div className="grid gap-4 sm:grid-cols-3">
          {donateOptions.map((d) => (
            <a
              key={d.name}
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className={`group relative overflow-hidden rounded-xl p-6 border transition-all hover:-translate-y-1 ${
                d.featured
                  ? "bg-gradient-cta text-cta-foreground border-cta shadow-cta sm:row-span-1 sm:col-span-3"
                  : "bg-card border-border hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${d.featured ? "opacity-80" : "text-primary"}`}>
                    {d.featured ? "★ Recommended" : "Tip Jar"}
                  </div>
                  <div className="mt-1 font-display text-2xl font-black">{d.name}</div>
                  <div className={`text-sm mt-1 ${d.featured ? "opacity-90" : "text-muted-foreground"}`}>
                    {d.desc}
                  </div>
                </div>
                <Heart className={`size-8 ${d.featured ? "" : "text-primary"} group-hover:scale-125 transition-transform`} fill="currentColor" />
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* LINKS */}
      <Section id="links" eyebrow="02" title={L.linksTitle} subtitle={L.linksSub}>
        <div className="grid gap-3 sm:grid-cols-2">
          {socials.map(({ name, handle, url, Icon, color }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 bg-card border border-border hover:border-primary rounded-xl p-4 transition-all hover:translate-x-1"
            >
              <div
                className="grid place-items-center size-12 rounded-lg shrink-0"
                style={{ backgroundColor: `color-mix(in oklab, ${color} 18%, transparent)`, color }}
              >
                <Icon className="size-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold">{name}</div>
                <div className="text-sm text-muted-foreground truncate">{handle}</div>
              </div>
              <span className="text-primary font-display font-black opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* GEAR */}
      <Section id="gear" eyebrow="03" title={L.gearTitle} subtitle={L.gearSub}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {gear.map(({ Icon, label, value }) => (
            <div
              key={label}
              className="relative bg-card border border-border rounded-xl p-5 hover:border-primary transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Icon className="size-5 text-primary" />
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {label}
                </div>
              </div>
              <div className="mt-3 font-display font-bold text-lg">{value}</div>
              <div className="absolute inset-x-5 bottom-0 h-px bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </Section>

      {/* COMMUNITY */}
      <Section id="community" eyebrow="04" title={L.commTitle} subtitle={L.commSub}>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12 text-center">
          <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative">
            <Users className="size-12 text-primary mx-auto" />
            <div className="mt-4 font-display font-black text-3xl">HEROO GUILD</div>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              {lang === "th"
                ? "พบกับเพื่อนเกมเมอร์กว่า 5,000+ คนที่พร้อมตีบอส, จัดปาร์ตี้, และแชร์เคล็ดลับเกมด้วยกัน"
                : "Join 5,000+ gamers ready to raid bosses, party up, and share tips together."}
            </p>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-gradient-cta text-cta-foreground font-bold px-6 py-3 rounded-lg shadow-cta hover:scale-105 transition-transform"
            >
              <MessageCircle className="size-5" />
              {L.joinDiscord}
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border mt-12 py-8 text-center text-sm text-muted-foreground">
        <div className="font-display font-black text-primary text-glow-primary">HEROO</div>
        <p className="mt-2">{L.footer}</p>
        <p className="mt-1 text-xs opacity-60">© {new Date().getFullYear()} HEROO. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Section({
  id, eyebrow, title, subtitle, children,
}: {
  id: string; eyebrow: string; title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="font-display text-xs font-black tracking-[0.3em] text-primary">
            // {eyebrow}
          </div>
          <h2 className="mt-2 font-display font-black text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
