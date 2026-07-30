import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BrainCircuit, ArrowRight, Play, ChevronRight,
  Video, Database, Users, Zap, Shield, Activity,
  BarChart2, Clock, CheckCircle, Circle, Sparkles,
  Code2, GitBranch, Lock, Star, Globe, Layers,
  Sun, Moon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';


/* ─────────────────── UTILITY / DESIGN TOKENS ─────────────────── */
// Reusable button variants (shadcn/ui pattern)
const buttonVariants = {
  primary: "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_24px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.65)] hover:-translate-y-1 active:scale-95",
  secondary: "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-white/5 border border-white/10 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 active:scale-95",
};

/* ─────────────────── AURORA BACKGROUND ─────────────────── */
const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Base dark gradient */}
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 70% at 50% -15%, #0a1628 0%, #03070f 55%, #020509 100%)' }} />
    {/* Aurora blobs */}
    <motion.div
      className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full opacity-30"
      style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(59,130,246,0.12) 40%, transparent 70%)', filter: 'blur(80px)' }}
      animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full opacity-25"
      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)', filter: 'blur(80px)' }}
      animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
    />
    <motion.div
      className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-20"
      style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)', filter: 'blur(90px)' }}
      animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
    />
    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: `linear-gradient(rgba(34,211,238,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.7) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />
    {/* Top neon line */}
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.5) 30%, rgba(139,92,246,0.5) 70%, transparent 100%)' }} />
  </div>
);

/* ─────────────────── SPOTLIGHT CURSOR ─────────────────── */
const SpotlightCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handler = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 opacity-0 md:opacity-100"
      style={{ background: 'transparent' }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500, height: 500,
          x: springX, y: springY,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 65%)',
          filter: 'blur(1px)',
        }}
      />
    </motion.div>
  );
};

/* ─────────────────── FLOATING PARTICLES ─────────────────── */
const FloatingParticles = () => {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.id % 3 === 0 ? '#22d3ee' : p.id % 3 === 1 ? '#8b5cf6' : '#60a5fa',
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
          }}
          animate={{ y: [0, -40, 0], opacity: [p.opacity, p.opacity * 2, p.opacity], x: [0, 15, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
};

/* ─────────────────── MOVING BORDER CARD (Aceternity) ─────────────────── */
const MovingBorderCard = ({ children, className, containerClassName, duration = 3000 }) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    let prog = 0;
    const total = 1;
    const interval = setInterval(() => {
      prog = (prog + 0.002) % total;
      progress.set(prog);
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength?.() || 500;
        const point = pathRef.current.getPointAtLength?.(prog * len);
        // handled via CSS
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative group", containerClassName)}>
      {/* Border glow animation */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'conic-gradient(from 0deg, transparent 50%, rgba(34,211,238,0.6) 60%, rgba(139,92,246,0.6) 75%, transparent 80%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: duration / 1000, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className={cn("relative rounded-2xl bg-[#080f1f] border border-white/5 overflow-hidden", className)}>
        {children}
      </div>
    </div>
  );
};

/* ─────────────────── GLASS CARD ─────────────────── */
const GlassCard = ({ children, className, hover = true }) => (
  <div className={cn(
    "relative rounded-2xl border border-white/[0.08] overflow-hidden",
    "bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm",
    hover && "transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)] hover:-translate-y-1",
    className
  )}>
    {/* Top highlight */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    {children}
  </div>
);

/* ─────────────────── STAT TICKER ─────────────────── */
const StatTicker = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    const isDecimal = value.includes('.');
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal ? (eased * num).toFixed(1) : Math.floor(eased * num);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(34,211,238,0.25)' }}>
        {count}{suffix || value.replace(/[0-9.]/g, '')}
      </div>
      <p className="text-xs text-gray-500 leading-tight max-w-[110px] mx-auto">{label}</p>
    </motion.div>
  );
};

/* ─────────────────── BADGE (shadcn-style) ─────────────────── */
const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: "bg-cyan-400/10 border-cyan-400/25 text-cyan-400",
    purple: "bg-purple-400/10 border-purple-400/25 text-purple-400",
    green: "bg-green-400/10 border-green-400/25 text-green-400",
  };
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-xs font-semibold border px-3 py-1 rounded-full",
      variants[variant], className
    )}>
      {children}
    </span>
  );
};

/* ─────────────────── ANIMATED TEXT GRADIENT ─────────────────── */
const GradientText = ({ children, className, colors = ['#22d3ee', '#818cf8', '#a78bfa', '#38bdf8', '#22d3ee'], duration = 4 }) => (
  <span
    className={cn("bg-clip-text text-transparent", className)}
    style={{
      backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
      backgroundSize: '300% 300%',
      animation: `shimmer ${duration}s ease infinite`,
    }}
  >
    {children}
  </span>
);

/* ─────────────────── THEME TOGGLE BUTTON ─────────────────── */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={cn(
        "relative flex items-center w-14 h-7 rounded-full p-0.5 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50",
        isDark
          ? "bg-slate-800 border border-white/10 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
          : "bg-gradient-to-r from-amber-200 to-sky-200 border border-amber-300/50 shadow-[0_2px_12px_rgba(251,191,36,0.3)]"
      )}
      whileTap={{ scale: 0.92 }}
    >
      {/* Track icons */}
      <span className={cn("absolute left-1.5 transition-opacity duration-300", isDark ? "opacity-100" : "opacity-0")}>
        <Moon size={12} className="text-cyan-300" />
      </span>
      <span className={cn("absolute right-1.5 transition-opacity duration-300", isDark ? "opacity-0" : "opacity-100")}>
        <Sun size={12} className="text-amber-600" />
      </span>

      {/* Sliding knob */}
      <motion.div
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center shadow-md z-10",
          isDark
            ? "bg-gradient-to-br from-slate-600 to-slate-700"
            : "bg-gradient-to-br from-amber-400 to-orange-400"
        )}
        animate={{ x: isDark ? 0 : 28 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div key="moon" initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 30, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Moon size={12} className="text-cyan-300" />
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ rotate: 30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -30, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sun size={12} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

/* ─────────────────── NAVBAR ─────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['Features', 'Protocol', 'Pricing', 'Enterprise'];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-10",
        scrolled
          ? isDark
            ? "py-3 bg-[#030810]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/30"
            : "py-3 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-lg shadow-slate-200/20"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_16px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_24px_rgba(34,211,238,0.6)] transition-shadow duration-300">
            <BrainCircuit size={18} className="text-white" />
          </div>
          <span className={cn("text-lg font-extrabold tracking-tight transition-colors duration-500", isDark ? "text-white" : "text-slate-800")} style={{ fontFamily: 'Outfit, sans-serif' }}>
            Shadow<span className="text-cyan-500">Learn</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={cn(
                "px-4 py-2 text-sm rounded-lg transition-all duration-200",
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-white/5"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className={buttonVariants.primary + " text-xs py-2.5 px-5 shadow-[0_0_16px_rgba(34,211,238,0.3)]"}
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

/* ─────────────────── HERO SECTION ─────────────────── */
const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center overflow-hidden">
      <AuroraBackground />
      <FloatingParticles />
      <SpotlightCursor />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity }}
      >
        {/* Pre-headline badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/8 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">
              AI-Powered Knowledge Transfer Platform
            </span>
            <Sparkles size={12} className="text-cyan-400" />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={item}
          className="text-6xl sm:text-7xl md:text-8xl font-black leading-[1.05] tracking-tight mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-white block">Stop Losing</span>
          <span className="text-white block">Knowledge When</span>
          <GradientText className="block" colors={['#22d3ee', '#818cf8', '#a78bfa', '#60a5fa', '#22d3ee']} duration={4}>
            People Leave.
          </GradientText>
        </motion.h1>

        {/* Subheadline */}
        <motion.p variants={item} className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          ShadowLearn captures the invaluable workflows of your most experienced employees —{' '}
          <span className="text-gray-300 font-medium">transforming tribal knowledge into searchable, interactive institutional assets.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mb-16">
          <Link to="/dashboard" className={buttonVariants.primary}>
            Start Free Trial <ArrowRight size={16} />
          </Link>
          <button className={buttonVariants.secondary}>
            <Play size={15} className="text-cyan-400" />
            Watch Demo
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
          {[
            { icon: <Star size={12} className="text-yellow-400 fill-yellow-400" />, text: '4.9/5 rating on G2' },
            { icon: <Shield size={12} className="text-green-400" />, text: 'SOC 2 Type II Certified' },
            { icon: <Globe size={12} className="text-blue-400" />, text: '500+ enterprise clients' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Hero dashboard preview */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-4"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <MovingBorderCard>
          <div className="relative bg-[#060d1a] rounded-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#0a1526] border-b border-white/5">
              <div className="flex gap-1.5">
                {['bg-red-500/70', 'bg-yellow-500/70', 'bg-green-500/70'].map((c, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 bg-[#0d1830] rounded-md px-4 py-1 text-xs text-gray-500 font-mono border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                  shadowlearn.app/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 grid grid-cols-12 gap-4">
              {/* Sidebar */}
              <div className="col-span-2 space-y-3">
                {['Dashboard', 'Workflows', 'Learning', 'AI Search', 'Experts'].map((item, i) => (
                  <div key={i} className={cn(
                    "text-xs py-2 px-3 rounded-lg",
                    i === 0 ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" : "text-gray-600"
                  )}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="col-span-10 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Workflows', value: '342', color: 'text-cyan-400', glow: 'rgba(34,211,238,0.3)' },
                    { label: 'Experts', value: '48', color: 'text-purple-400', glow: 'rgba(139,92,246,0.3)' },
                    { label: 'Modules', value: '1.2K', color: 'text-blue-400', glow: 'rgba(96,165,250,0.3)' },
                    { label: 'Capture Rate', value: '97%', color: 'text-green-400', glow: 'rgba(74,222,128,0.3)' },
                  ].map(s => (
                    <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                      <p className="text-[10px] text-gray-600 mb-1">{s.label}</p>
                      <p className={`text-lg font-black ${s.color}`} style={{ textShadow: `0 0 16px ${s.glow}` }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <p className="text-[10px] text-gray-600 mb-3">Knowledge Capture Rate — Last 12 weeks</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[35, 55, 45, 72, 58, 80, 65, 88, 72, 92, 84, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.6, delay: 1.2 + i * 0.04 }}
                        style={{
                          background: i >= 9
                            ? 'linear-gradient(to top, #06b6d4, #8b5cf6)'
                            : 'rgba(99,102,241,0.25)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                    <p className="text-[10px] text-gray-600 mb-2">Active Sessions</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
                      <span className="text-sm font-bold text-white">12 Live</span>
                    </div>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 font-mono">
                    <div className="text-[10px] space-y-1">
                      <div><span className="text-purple-400">const</span> <span className="text-cyan-300">workflow</span> <span className="text-gray-600">= await</span></div>
                      <div className="text-green-400">✓ Knowledge captured</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MovingBorderCard>

        {/* Glow beneath mockup */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.6) 0%, rgba(139,92,246,0.4) 50%, transparent 70%)' }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
};

/* ─────────────────── STATS SECTION ─────────────────── */
const StatsSection = () => (
  <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #030810 0%, #050d1c 50%, #030810 100%)' }}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.2), rgba(139,92,246,0.2), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.15), rgba(139,92,246,0.15), transparent)' }} />
    </div>

    <div className="max-w-6xl mx-auto px-6">
      {/* Logos / Trust strip */}
      <motion.p
        className="text-center text-xs text-gray-600 uppercase tracking-widest mb-10"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        Trusted by teams at
      </motion.p>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-8 mb-16 opacity-40"
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 0.4, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {['Notion', 'Vercel', 'Figma', 'Linear', 'Stripe', 'Anthropic'].map(name => (
          <span key={name} className="text-gray-400 font-bold text-sm tracking-wide">{name}</span>
        ))}
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <StatTicker value="94%" label="Reduction in employee onboarding time" />
        <StatTicker value="3.5x" label="Faster knowledge transfer speed" suffix="x" />
        <StatTicker value="1200000" label="Workflows captured globally" suffix="M+" />
        <StatTicker value="0" label="Milliseconds latency on capture" suffix="ms" />
      </div>
    </div>
  </section>
);

/* ─────────────────── FEATURES BENTO GRID ─────────────────── */
const FeaturesSection = () => {
  const features = [
    {
      tag: 'Shadow Recording', tagVariant: 'default',
      title: 'Silent Workflow Capture', icon: <Video size={20} className="text-cyan-400" />,
      description: 'Record expert decisions, keystrokes and annotations automatically — fully contextualized and searchable.',
      wide: true,
      visual: (
        <div className="mt-4 rounded-xl overflow-hidden border border-white/5 bg-[#040c18] font-mono text-xs">
          <div className="px-4 py-2.5 bg-[#0a1526] border-b border-white/5 flex gap-1.5">
            {['bg-red-500/60', 'bg-yellow-500/60', 'bg-green-500/60'].map((c, i) => <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />)}
          </div>
          <div className="p-4 space-y-1.5">
            {[
              [<><span className="text-purple-400">const</span> <span className="text-cyan-300">capture</span> <span className="text-gray-500">= new</span> <span className="text-blue-300">ShadowCapture</span><span className="text-gray-500">()</span></>, ''],
              [<><span className="text-cyan-300">capture</span><span className="text-gray-500">.</span><span className="text-blue-300">start</span><span className="text-gray-500">({'{ expert: '})</span><span className="text-green-300">'sarah.chen'</span><span className="text-gray-500">{' })'}</span></>, ''],
              [<span className="text-green-400">// ✓ Recording 47 interactions...</span>, ''],
              [<><span className="text-purple-400">await</span> <span className="text-cyan-300">capture</span><span className="text-gray-500">.</span><span className="text-blue-300">analyze()</span></>, ''],
              [<span className="text-green-400">// ✓ 12 key steps identified & structured</span>, ''],
            ].map(([line], i) => <div key={i}>{line}</div>)}
          </div>
        </div>
      )
    },
    {
      tag: 'Intuition Logs', tagVariant: 'purple',
      title: 'Capture the "Why"', icon: <Database size={20} className="text-purple-400" />,
      description: 'AI synthesizes the rationale behind every decision — preserving context that never makes it into docs.',
      visual: (
        <div className="mt-4 space-y-2">
          {[
            { initials: 'SC', name: 'Sarah Chen', text: '"Check error boundary first because of the 2023 outage..."', color: 'from-purple-500 to-blue-500' },
            { initials: 'MK', name: 'M. Kumar', text: '"This regex handles edge cases from the legacy migration..."', color: 'from-cyan-500 to-blue-500' },
          ].map((item, i) => (
            <div key={i} className="flex gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-[9px] font-bold shrink-0`}>{item.initials}</div>
              <div>
                <p className="text-[10px] text-gray-500 font-semibold mb-0.5">{item.name}</p>
                <p className="text-[11px] text-gray-400 leading-snug">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      tag: 'Transfer Velocity', tagVariant: 'default',
      title: 'Faster Than Any Docs Tool', icon: <Zap size={20} className="text-yellow-400" />,
      description: '85% faster knowledge handoff vs traditional documentation approaches.',
      centerVisual: true,
      visual: (
        <div className="flex justify-center mt-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1a2740" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="40" fill="none"
                stroke="url(#gradRing)" strokeWidth="8"
                strokeDasharray="251.2" strokeDashoffset="251.2"
                strokeLinecap="round"
                whileInView={{ strokeDashoffset: 37.68 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
              />
              <defs>
                <linearGradient id="gradRing" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white" style={{ textShadow: '0 0 20px rgba(34,211,238,0.4)' }}>85%</span>
              <span className="text-[9px] text-gray-500">Faster</span>
            </div>
          </div>
        </div>
      )
    },
    {
      tag: 'Atomic Modules', tagVariant: 'default',
      title: 'Granular Task Modules', icon: <Layers size={20} className="text-blue-400" />,
      description: 'Workflows broken into reusable atomic steps — enabling targeted learning and partial reuse.',
      visual: (
        <div className="mt-4 space-y-2">
          {[
            { text: 'Authenticate OAuth flow', done: true },
            { text: 'Handle 429 rate-limit retry', done: true },
            { text: 'Parse nested JSON schema', done: false },
            { text: 'Write integration test', done: false },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
            >
              {item.done
                ? <CheckCircle size={13} className="text-cyan-400 shrink-0 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                : <Circle size={13} className="text-gray-700 shrink-0" />
              }
              <span className={`text-xs ${item.done ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{item.text}</span>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      tag: 'Enterprise', tagVariant: 'green',
      title: 'Secure Org Vault', icon: <Lock size={20} className="text-green-400" />,
      description: 'SOC 2 Type II certified. All knowledge encrypted at rest and in transit with granular access controls.',
      visual: (
        <div className="mt-4 space-y-2">
          {['Role-based permissions', 'Audit trail logging', 'SSO / SAML support', 'Zero-trust architecture'].map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={12} className="text-green-400 drop-shadow-[0_0_4px_rgba(74,222,128,0.5)]" />
              <span className="text-xs text-gray-400">{f}</span>
            </div>
          ))}
        </div>
      )
    },
  ];

  return (
    <section id="features" className="py-28 px-6 relative" style={{ background: 'linear-gradient(180deg, #030810 0%, #040a18 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-6">Platform Features</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Infrastructure of{' '}
            <GradientText colors={['#22d3ee', '#818cf8', '#a78bfa', '#60a5fa', '#22d3ee']} duration={5}>
              Expertise
            </GradientText>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            More than documentation. A living archive of how your company actually functions at its best.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={feat.wide ? 'md:col-span-2' : ''}
            >
              <GlassCard className="h-full p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={feat.tagVariant}>{feat.tag}</Badge>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center">
                    {feat.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.description}</p>
                {feat.visual}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── HOW IT WORKS (Protocol) ─────────────────── */
const ProtocolSection = () => {
  const steps = [
    {
      num: '01',
      label: 'SILENT CAPTURE',
      title: 'Experts work, we record',
      desc: 'ShadowLearn runs silently in the background, capturing every screen interaction, spoken word, and decision your experts make — completely unobtrusively.',
      icon: <Video size={22} className="text-cyan-400" />,
      color: 'from-cyan-500/20 to-cyan-500/0',
      border: 'border-cyan-500/30',
    },
    {
      num: '02',
      label: 'AI STRUCTURING',
      title: 'AI builds the knowledge graph',
      desc: 'Our models process every recording, extracting key procedures, mental models, tools used, and the implicit institutional knowledge behind every expert decision.',
      icon: <BrainCircuit size={22} className="text-purple-400" />,
      color: 'from-purple-500/20 to-purple-500/0',
      border: 'border-purple-500/30',
    },
    {
      num: '03',
      label: 'GUIDED SIMULATION',
      title: 'New hires learn by doing',
      desc: 'Employees interact with AI-curated simulations, gaining hands-on experience with immediate AI-powered feedback — no waiting for a mentor to be free.',
      icon: <Users size={22} className="text-blue-400" />,
      color: 'from-blue-500/20 to-blue-500/0',
      border: 'border-blue-500/30',
    },
  ];

  return (
    <section id="protocol" className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #040a18 0%, #050d1c 50%, #030810 100%)' }}>
      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 opacity-10 blur-3xl rounded-full" style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 opacity-10 blur-3xl rounded-full" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <Badge className="mb-6">How It Works</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            The{' '}
            <GradientText colors={['#22d3ee', '#818cf8', '#a78bfa', '#60a5fa', '#22d3ee']} duration={6}>
              ShadowLearn
            </GradientText>
            {' '}Protocol
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Three steps to transform your organization's tribal knowledge into a perpetual competitive advantage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px" style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.3), rgba(139,92,246,0.3), rgba(96,165,250,0.3))' }} />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <GlassCard className="p-7 h-full relative">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} border ${step.border} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-white/5" style={{ fontFamily: "'Playfair Display', serif" }}>{step.num}</span>
                </div>
                <p className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-2">{step.label}</p>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── TESTIMONIALS ─────────────────── */
const TestimonialsSection = () => {
  const testimonials = [
    { name: 'Sarah Chen', title: 'VP Engineering, Vercel', initials: 'SC', color: 'from-cyan-500 to-blue-600', stars: 5, text: 'ShadowLearn cut our onboarding from 3 months to 2 weeks. Every new hire now has instant access to exactly how our best engineers think and work.' },
    { name: 'Marcus Rodriguez', title: 'CTO, Linear', initials: 'MR', color: 'from-purple-500 to-pink-600', stars: 5, text: 'The AI structuring is mind-blowing. It captures nuances that even our senior engineers couldn\'t articulate in normal documentation.' },
    { name: 'Priya Nair', title: 'Head of L&D, Stripe', initials: 'PN', color: 'from-blue-500 to-indigo-600', stars: 5, text: 'We used to lose an entire year of institutional knowledge every time a senior left. ShadowLearn has completely eliminated that risk.' },
  ];

  return (
    <section className="py-28 px-6 relative" style={{ background: 'linear-gradient(180deg, #030810 0%, #040c1a 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <Badge className="mb-6">Testimonials</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Loved by{' '}
            <GradientText colors={['#22d3ee', '#818cf8', '#a78bfa', '#38bdf8', '#22d3ee']}>
              Engineering Leaders
            </GradientText>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.title}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── CTA SECTION ─────────────────── */
const CTASection = () => (
  <section id="enterprise" className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #040c1a 0%, #030810 100%)' }}>
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.5) 0%, rgba(139,92,246,0.3) 50%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>

    <motion.div
      className="max-w-3xl mx-auto text-center relative z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Badge className="mb-6">Start Today</Badge>
      <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        Protect Your{' '}
        <br />
        <GradientText colors={['#f59e0b', '#fbbf24', '#fb923c', '#ef4444', '#f59e0b']} duration={3}>
          Most Valuable IP.
        </GradientText>
      </h2>
      <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
        Stop the brain drain. Turn your institutional intelligence into one of your most enduring competitive advantages.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <Link to="/dashboard" className={buttonVariants.primary + " text-base py-4 px-9 shadow-[0_0_32px_rgba(34,211,238,0.5)]"}>
          Start Free Trial <ArrowRight size={18} />
        </Link>
        <button className={buttonVariants.secondary + " text-base py-4 px-9"}>
          Book Enterprise Demo <ChevronRight size={16} />
        </button>
      </div>

      <p className="text-xs text-gray-600">No credit card required · 14-day free trial · Cancel anytime</p>
    </motion.div>
  </section>
);

/* ─────────────────── FOOTER ─────────────────── */
const Footer = () => (
  <footer className="border-t border-white/[0.06] py-12 px-6" style={{ background: 'linear-gradient(180deg, #030810 0%, #020608 100%)' }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.3)]">
              <BrainCircuit size={15} className="text-white" />
            </div>
            <span className="font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Shadow<span className="text-cyan-400">Learn</span></span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed max-w-[200px]">
            AI-powered knowledge transfer for modern engineering teams.
          </p>
        </div>

        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Status'] },
        ].map(col => (
          <div key={col.title}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-xs text-gray-600 hover:text-gray-300 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-700">© 2026 ShadowLearn. All rights reserved.</p>
        <div className="flex items-center gap-1 text-xs text-gray-700">
          <span>Built with</span>
          <Sparkles size={10} className="text-cyan-400" />
          <span>for knowledge-driven teams</span>
        </div>
      </div>
    </div>
  </footer>
);

/* ─────────────────── MAIN HOME COMPONENT ─────────────────── */
const Home = () => {
  const { isDark } = useTheme();

  return (
    <motion.div
      className="min-h-screen overflow-x-hidden"
      animate={{
        backgroundColor: isDark ? '#030810' : '#f0f4ff',
        color: isDark ? '#ffffff' : '#1e293b',
      }}
      transition={{ duration: 0.4 }}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,900&display=swap" />

      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ProtocolSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Home;
