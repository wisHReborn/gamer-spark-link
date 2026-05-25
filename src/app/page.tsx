"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Heart, Instagram, Youtube, Facebook, MessageCircle,
  Music2, Cpu, MonitorPlay, Keyboard, Mouse, Headphones,
  Users, Menu, X, Zap, Languages, Volume2, VolumeX
} from "lucide-react";

// Using local images with Next.js static imports
import profile from "@/assets/profile.png";
import heroBg from "@/assets/hero-bg.jpg";

type Lang = "th" | "en";

const t = {
  th: {
    nav: { support: "สนับสนุน", links: "ช่องทาง", gear: "อุปกรณ์", community: "คอมมูนิตี้" },
    live: "LIVE",
    bio: "มุ่งหน้าสู่ตำนานบทใหม่พร้อมรบทุกแมตช์ ทุกเซิร์ฟเวอร์: สตรีมเมอร์ตัวจริงที่อยู่เคียงข้างคุณในทุกสมรภูมิเกม",
    heroCta: "โดเนทเดี๋ยวนี้",
    secCta: "ดูลิงก์ทั้งหมด",
    supportTitle: "สนับสนุนช่อง",
    supportSub: "ทุกการสนับสนุนช่วยให้สตรีมไปต่อได้ ขอบคุณมากนะครับ ❤️",
    linksTitle: "ช่องทางทั้งหมด",
    linksSub: "ติดตามและพูดคุยกับเราได้ทุกแพลตฟอร์ม",
    gearTitle: "สเปคเครื่อง & อุปกรณ์",
    gearSub: "อาวุธคู่ใจที่ใช้สตรีมทุกวัน",
    commTitle: "เข้าร่วมคอมมูนิตี้",
    commSub: "เพื่อนๆกำลังรออยู่ เข้ามาเป็นแก๊งเดียวกันเถอะ!",
    joinDiscord: "เข้าร่วม Discord",
    footer: "สร้างสรรค์ด้วย ❤️ เพื่อเป็นศูนย์รวมสุดยอดสตรีมเมอร์และคอมมูนิตี้เกมเมอร์ที่ยิ่งใหญ่ ร่วมยกระดับประสบการณ์การเล่นเกมไปพร้อมกับเรา",
  },
  en: {
    nav: { support: "Support", links: "Links", gear: "Gear", community: "Community" },
    live: "LIVE",
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
    footer: "Crafted with ❤️ as the ultimate hub for streamers and the entire gaming community. Level up your journey with us.",
  },
};

const donateOptions = [
  { name: "easydonate", desc: "ทุกช่องทาง PromptPay / TrueMoney / Credit Card", url: "https://easydonate.app", featured: true },
];

const socials = [
  { name: "Instagram", handle: "@preeereborn", url: "https://instagram.com/preeereborn", Icon: Instagram, color: "oklch(0.6 0.2 340)" },
  { name: "YouTube", handle: "PREEE REBORN Gaming", url: "https://youtube.com", Icon: Youtube, color: "oklch(0.62 0.24 27)" },
  { name: "Facebook", handle: "PREEE REBORN Page", url: "https://facebook.com", Icon: Facebook, color: "oklch(0.55 0.18 255)" },
  { name: "TikTok", handle: "@preeereborn.tk", url: "https://tiktok.com", Icon: Music2, color: "oklch(0.97 0.01 80)" },
  { name: "Discord", handle: "PREEE REBORN Guild", url: "https://discord.gg", Icon: MessageCircle, color: "oklch(0.6 0.18 270)" },
];

const gearItems = [
  { Icon: Cpu, label: "CPU", value: "Intel Core i5-13420H" },
  { Icon: MonitorPlay, label: "GPU", value: "NVIDIA RTX 4050 Laptop" },
  { Icon: MonitorPlay, label: "Ram", value: '16.0 GB' },
  { Icon: Keyboard, label: "Keyboard", value: "MACRNIKE 500" },
  { Icon: Mouse, label: "Mouse", value: "Logitech G502 HERO" },
  { Icon: Headphones, label: "Headset", value: "หูฟังตลาดนัด" },
];

export default function Index() {
  const [lang, setLang] = useState<Lang>("th");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const L = t[lang];

  useEffect(() => {
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            const playOnInteraction = () => {
              if (audioRef.current) {
                audioRef.current.play()
                  .then(() => {
                    setIsPlaying(true);
                    document.removeEventListener("mousedown", playOnInteraction);
                    document.removeEventListener("keydown", playOnInteraction);
                  });
              }
            };
            document.addEventListener("mousedown", playOnInteraction);
            document.addEventListener("keydown", playOnInteraction);
          });
      }
    };

    attemptPlay();

    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const navItems = [
    { id: "support", label: L.nav.support },
    { id: "links", label: L.nav.links },
    { id: "gear", label: L.nav.gear },
    { id: "community", label: L.nav.community },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

      window.scrollTo({
        top: middle,
        behavior: "smooth"
      });
    }
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-foreground selection:bg-primary/30 font-sans relative">
      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        autoPlay
        playsInline
        preload="auto"
      />

      {/* Floating Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary/90 text-primary-foreground shadow-glow backdrop-blur-sm hover:scale-110 active:scale-95 transition-all animate-float border border-white/20"
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <Volume2 className="size-6" />
        ) : (
          <VolumeX className="size-6 opacity-80" />
        )}
      </button>

      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? "bg-background/85 backdrop-blur-lg border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 font-display font-black text-lg sm:text-xl group">
            <Zap className="size-5 text-primary group-hover:scale-110 transition-transform" fill="currentColor" />
            <span className="text-glow-primary tracking-tight uppercase">PREEE REBORN</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-all rounded-md hover:bg-primary/5"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-all text-xs font-bold bg-background/50"
              aria-label="Switch language"
            >
              <Languages className="size-3.5" />
              <span className="w-5">{lang.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu with transition */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-xl ${
            menuOpen ? "max-h-[400px] border-t border-border shadow-xl" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left px-4 py-4 rounded-xl hover:bg-primary/10 font-bold transition-all flex items-center justify-between group active:scale-[0.98]"
              >
                <span className="text-lg font-sans">{n.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-sans">→</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 pb-16 sm:pt-40 sm:pb-28 md:pt-48 md:pb-36 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroBg}
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center animate-slide-up">
          <div className="relative inline-block animate-float">
            <div className="absolute -inset-4 rounded-full bg-gradient-primary blur-3xl opacity-30" />
            <div className="relative p-1 rounded-full bg-gradient-primary shadow-glow">
              <Image
                src={profile}
                alt="Preee Reborn profile picture"
                width={160}
                height={160}
                className="size-28 sm:size-36 md:size-44 rounded-full object-cover border-4 border-background"
                priority
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-2xl border border-white/10 backdrop-blur-md">
              <span className="size-2 rounded-full bg-current animate-pulse" />
              {L.live}
            </span>
          </div>

          <h1 className="mt-10 font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] animate-float-text">
            <span className="bg-gradient-primary bg-clip-text text-transparent text-glow-primary">
              PREEE REBORN
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed font-medium animate-float-text" style={{ animationDelay: '0.2s' }}>
            {L.bio}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={() => scrollTo("support")}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 bg-gradient-cta text-cta-foreground font-black px-10 py-5 rounded-2xl shadow-cta animate-pulse-glow hover:scale-105 active:scale-95 transition-all text-lg font-sans"
            >
              <Heart className="size-6 group-hover:scale-110 transition-transform" fill="currentColor" />
              {L.heroCta}
            </button>
            <button
              onClick={() => scrollTo("links")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border-2 border-primary/30 text-primary font-black px-10 py-5 rounded-2xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-lg backdrop-blur-sm font-sans"
            >
              {L.secCta}
            </button>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <Section id="support" eyebrow="01" title={L.supportTitle} subtitle={L.supportSub} className="bg-theme-support relative">
        <div className="max-w-3xl mx-auto">
          <a
            href="https://easydonate.app/PREEEREBORN"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-[2rem] p-10 bg-gradient-cta text-cta-foreground border-cta shadow-cta transition-all active:scale-95 flex flex-col sm:flex-row items-center justify-between gap-8 animate-pulse-glow"
          >
            <div className="text-center sm:text-left">
              <div className="text-[12px] font-black uppercase tracking-[0.4em] mb-3 opacity-80">
                ★ Ultimate Support
              </div>
              <div className="font-display text-4xl sm:text-5xl font-black tracking-tighter">
                easydonate
              </div>
              <p className="text-lg mt-4 font-medium opacity-90">
                รองรับทุกช่องทาง PromptPay / TrueMoney / Credit Card
              </p>
            </div>
            <div className="grid place-items-center size-20 sm:size-24 rounded-3xl bg-white/20 group-hover:scale-110 transition-transform shadow-2xl shrink-0">
              <Heart className="size-10 sm:size-12 animate-pulse-subtle" fill="currentColor" />
            </div>
          </a>
        </div>
      </Section>

      {/* LINKS */}
      <Section id="links" eyebrow="02" title={L.linksTitle} subtitle={L.linksSub} className="bg-theme-links relative">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:gap-6">
          {socials.map(({ name, handle, url, Icon, color }, i) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center gap-5 bg-card border border-border hover:border-primary/50 rounded-2xl p-6 transition-all active:scale-[0.98] hover:shadow-2xl hover:translate-y-[-2px] ${i % 2 !== 0 ? 'animate-float-slow' : 'animate-float-delayed'}`}
            >
              <div
                className="grid place-items-center size-16 rounded-2xl shrink-0 shadow-inner group-hover:scale-105 transition-transform"
                style={{ backgroundColor: `color-mix(in oklab, ${color} 15%, transparent)`, color }}
              >
                <Icon className="size-8" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xl leading-none font-sans">{name}</div>
                <div className="text-sm sm:text-base text-muted-foreground mt-2 truncate font-medium font-sans">{handle}</div>
              </div>
              <span className="text-primary font-display font-black translate-x-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xl">
                →
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* GEAR */}
      <Section id="gear" eyebrow="03" title={L.gearTitle} subtitle={L.gearSub} className="bg-theme-gear relative">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {gearItems.map(({ Icon, label, value }, i) => (
            <div
              key={label}
              className={`relative bg-card border border-border rounded-2xl p-7 hover:border-primary/50 transition-all group overflow-hidden hover:translate-y-[-2px] ${i % 3 === 0 ? 'animate-float-slow' : 'animate-float-delayed'}`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="size-5" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </div>
              </div>
              <div className="mt-5 font-sans font-bold text-lg sm:text-xl relative z-10 leading-tight">{value}</div>
              
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-500 rotate-12 group-hover:rotate-0 group-hover:scale-110">
                <Icon className="size-20 animate-pulse-subtle" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* COMMUNITY */}
      <Section id="community" eyebrow="04" title={L.commTitle} subtitle={L.commSub} className="bg-theme-community relative">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-10 sm:p-20 text-center group shadow-2xl animate-float-slow">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary via-transparent to-cta animate-pulse" />
          <div className="relative z-10">
            <div className="inline-flex p-6 rounded-3xl bg-primary/10 text-primary mb-8 group-hover:scale-110 transition-transform duration-700 shadow-inner">
              <Users className="size-12 animate-pulse-subtle" />
            </div>
            <div className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tighter mb-6 uppercase">PREEE REBORN Guild</div>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto font-medium text-base sm:text-lg md:text-xl leading-relaxed opacity-90 font-sans">
              {lang === "th"
                ? "พบกับเพื่อนเกมเมอร์มากมาย, จัดปาร์ตี้เล่นเกม, และแชร์เคล็ดลับเกมด้วยกัน"
                : "Meet up with lots of fellow gamers, throw gaming parties, and share gaming tips together."}
            </p>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="mt-12 inline-flex items-center gap-4 bg-gradient-cta text-cta-foreground font-black px-12 py-5 rounded-2xl shadow-cta hover:scale-105 active:scale-95 transition-all text-lg font-sans animate-pulse-glow"
            >
              <MessageCircle className="size-7" />
              {L.joinDiscord}
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border mt-28 py-16 text-center text-sm text-muted-foreground bg-black/40 backdrop-blur-sm font-sans relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 flex flex-col items-center relative z-10">
          <div className="font-display font-black text-primary text-3xl sm:text-4xl text-glow-primary tracking-tighter mb-6 uppercase animate-pulse-subtle">
            PREEE REBORN
          </div>
          <p className="max-w-4xl font-medium text-base sm:text-lg mb-8 leading-relaxed px-4 text-center mx-auto">
            {L.footer}
          </p>
          <div className="flex gap-6 mb-8">
            {socials.slice(0, 3).map(({ Icon, url, name }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
                <Icon className="size-6" />
              </a>
            ))}
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            © {new Date().getFullYear()} PREEE REBORN. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id, eyebrow, title, subtitle, children, className = "",
}: {
  id: string; eyebrow: string; title: string; subtitle: string; children: React.ReactNode; className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 lg:py-32 overflow-hidden ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center max-w-2xl mx-auto animate-float-text">
          <div className="font-display text-[10px] font-black tracking-[0.4em] text-primary/80 uppercase mb-3">

          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 animate-float-text">{title}</h2>
          <p className="text-muted-foreground font-medium sm:text-lg opacity-80 font-sans animate-float-text" style={{ animationDelay: '0.2s' }}>{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
