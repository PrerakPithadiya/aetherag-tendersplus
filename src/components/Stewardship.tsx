import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dna,
  Trees,
  Droplets,
  CheckCircle2,
  ShieldCheck,
  Radio,
  Sparkles,
  ArrowUpRight,
  Activity,
  Cpu,
  Layers,
  Gauge,
  Sprout,
  Database
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Stewardship() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Seamless Infinite Loop Path Refs
  const dnaWaveRef = useRef<SVGPathElement>(null);
  const hydroWave1Ref = useRef<SVGPathElement>(null);
  const hydroWave2Ref = useRef<SVGPathElement>(null);
  const laserBeamRef = useRef<HTMLDivElement>(null);

  // Live real-time micro telemetry data states (fluctuating live)
  const [microbeHealth, setMicrobeHealth] = useState(99.4);
  const [carbonCredits, setCarbonCredits] = useState(1840.4);
  const [moistureLevel, setMoistureLevel] = useState(42.8);

  // Widget main metrics
  const [esgMetric, setEsgMetric] = useState(0);
  const [carbonOffset, setCarbonOffset] = useState(0);
  const [activeTab, setActiveTab] = useState<"soil" | "carbon" | "telemetry">("soil");

  // Mouse spotlight coordinates for the 3 cards
  const [cursorPos, setCursorPos] = useState<Array<{ x: number; y: number; hovering: boolean }>>([
    { x: 0, y: 0, hovering: false },
    { x: 0, y: 0, hovering: false },
    { x: 0, y: 0, hovering: false },
  ]);

  // Live data micro-fluctuations (runs endlessly)
  useEffect(() => {
    const timer = setInterval(() => {
      setMicrobeHealth(() => Number((99.3 + Math.random() * 0.3).toFixed(2)));
      setCarbonCredits((c) => Number((c + Math.random() * 0.05).toFixed(2)));
      setMoistureLevel(() => Number((42.5 + Math.random() * 0.6).toFixed(1)));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // GSAP animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Badge Entrance
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0.85, opacity: 0, y: -20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Heading Stagger Reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".reveal-word");
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { y: 35, opacity: 0, rotateX: -25 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              stagger: 0.08,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 85%",
              },
            }
          );
        }
      }

      // 3. Line Growth
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 4. Paragraph Fade Up
      if (descRef.current) {
        gsap.fromTo(
          descRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: descRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 5. Cards Entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".stewardship-card");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // -------------------------------------------------------------
      // INFINITE SEAMLESS CONTINUOUS ANIMATIONS INSIDE THE 3 BOXES
      // -------------------------------------------------------------

      // Box 1: Infinite Seamless DNA Wave Motion (Loops perfectly with no seam)
      if (dnaWaveRef.current) {
        gsap.to(dnaWaveRef.current, {
          x: -200,
          duration: 4,
          repeat: -1,
          ease: "none", // Linear endless flow
        });
      }

      // Box 2: Infinite Blockchain Stream Marquee Laser
      if (laserBeamRef.current) {
        gsap.to(laserBeamRef.current, {
          x: "-50%",
          duration: 8,
          repeat: -1,
          ease: "none", // Continuous endless marquee feed
        });
      }

      // Box 3: Dual Infinite Seamless Water Wave Flow
      if (hydroWave1Ref.current) {
        gsap.to(hydroWave1Ref.current, {
          x: -200,
          duration: 3.5,
          repeat: -1,
          ease: "none",
        });
      }

      if (hydroWave2Ref.current) {
        gsap.to(hydroWave2Ref.current, {
          x: -200,
          duration: 5,
          repeat: -1,
          ease: "none",
        });
      }

      // Equalizer Spectrum Bar Graph Animation in Box 1
      const eqBars = sectionRef.current?.querySelectorAll(".eq-bar");
      if (eqBars && eqBars.length > 0) {
        eqBars.forEach((bar, i) => {
          gsap.to(bar, {
            scaleY: 0.2 + Math.random() * 0.8,
            duration: 0.4 + i * 0.1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // Main Telemetry Widget Counter ScrollTrigger
      if (widgetRef.current) {
        gsap.fromTo(
          widgetRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: widgetRef.current,
              start: "top 85%",
              onEnter: () => {
                const counterObj = { esg: 0, carbon: 0 };
                gsap.to(counterObj, {
                  esg: 94.8,
                  carbon: 18450,
                  duration: 2,
                  ease: "power2.out",
                  onUpdate: () => {
                    setEsgMetric(Number(counterObj.esg.toFixed(1)));
                    setCarbonOffset(Math.round(counterObj.carbon));
                  },
                });
              },
            },
          }
        );
      }

      // Floating Orbs
      const floatingOrbs = sectionRef.current?.querySelectorAll(".floating-orb");
      if (floatingOrbs && floatingOrbs.length > 0) {
        floatingOrbs.forEach((orb, i) => {
          gsap.to(orb, {
            y: i % 2 === 0 ? "-=20" : "+=20",
            x: i % 2 === 0 ? "+=12" : "-=12",
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card Mouse Movements & Spotlight Physics
  const handleCardMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPos((prev) => {
      const next = [...prev];
      next[index] = { x, y, hovering: true };
      return next;
    });

    gsap.to(card, {
      y: -6,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    setCursorPos((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], hovering: false };
      return next;
    });

    gsap.to(card, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="stewardship"
      ref={sectionRef}
      className="relative bg-surface-container-low py-24 scroll-mt-[100px] overflow-hidden selection:bg-secondary-container"
    >
      {/* Background Ambient Floating Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none floating-orb"></div>
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none floating-orb"></div>

      <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div ref={badgeRef} className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/15 text-secondary text-xs font-label uppercase tracking-widest border border-secondary/20 shadow-sm">
              <Sparkles className="w-4 h-4 animate-pulse text-secondary" />
              Sustainable Agriscience & Governance
            </span>
          </div>

          <h2
            ref={headingRef}
            className="font-headline text-3xl md:text-5xl font-bold text-primary tracking-tight mb-6 perspective-1000 flex flex-wrap justify-center gap-x-3 gap-y-2 py-2 overflow-visible leading-snug"
          >
            {"Our Commitment to Stewardship".split(" ").map((word, idx) => (
              <span key={idx} className="reveal-word inline-block py-1">
                {word}
              </span>
            ))}
          </h2>

          <div
            ref={lineRef}
            className="h-1 w-32 bg-gradient-to-r from-secondary/30 via-secondary to-secondary/30 mx-auto rounded-full origin-center mb-8"
          ></div>

          <div
            ref={descRef}
            className="grid md:grid-cols-2 gap-8 text-left text-on-surface-variant font-body text-body-md leading-relaxed"
          >
            <p className="bg-surface/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-outline-variant/60 shadow-sm hover:border-secondary/30 transition-all">
              At <strong className="text-primary font-semibold">AetherAg</strong>, precision isn't just about yield optimization—it's about long-term environmental harmony. Our deep telemetry algorithms translate soil microbiomes and micro-climatic fluctuations into actionable insights for the modern steward.
            </p>
            <p className="bg-surface/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-outline-variant/60 shadow-sm hover:border-secondary/30 transition-all">
              By deploying non-invasive monitoring and real-time carbon telemetry, we enable agricultural enterprises to reduce chemical input reliance while optimizing crop output. Our platform serves as the quiet authority in every field.
            </p>
          </div>
        </div>

        {/* 3D Interactive Stewardship Pillars (Infinite Continuous Animations Inside) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {/* Card 1: Microbiome Preservation (Infinite Flowing Wave & Equalizer) */}
          <div
            className="stewardship-card bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
            onMouseMove={(e) => handleCardMouseMove(0, e)}
            onMouseLeave={(e) => handleCardMouseLeave(0, e)}
            style={{
              background: cursorPos[0].hovering
                ? `radial-gradient(500px circle at ${cursorPos[0].x}px ${cursorPos[0].y}px, rgba(59, 105, 52, 0.09), transparent 80%), #ffffff`
                : undefined,
            }}
          >
            {/* FULL-WIDTH INFINITE FLOWING CONTINUOUS SVG WAVE BANNER (NEVER ENDS) */}
            <div className="absolute top-0 left-0 w-full h-20 overflow-hidden pointer-events-none opacity-25 group-hover:opacity-70 transition-opacity">
              <svg className="w-[400px] h-full" viewBox="0 0 400 80">
                <path
                  ref={dnaWaveRef}
                  d="M 0 40 Q 25 15 50 40 T 100 40 T 150 40 T 200 40 T 250 40 T 300 40 T 350 40 T 400 40 Q 425 15 450 40 T 500 40"
                  fill="none"
                  stroke="#3b6934"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              {/* Header Icon + Equalizer Visualizer */}
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all shadow-inner relative z-10">
                    <Dna className="w-7 h-7" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-secondary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Animated Equalizer Spectrum Graph */}
                <div className="flex items-end gap-1 h-8 px-3 py-1 bg-surface-container-high/80 rounded-lg border border-outline-variant/30">
                  <div className="eq-bar w-1.5 bg-secondary rounded-full h-6 origin-bottom"></div>
                  <div className="eq-bar w-1.5 bg-secondary/80 rounded-full h-4 origin-bottom"></div>
                  <div className="eq-bar w-1.5 bg-secondary/60 rounded-full h-7 origin-bottom"></div>
                  <div className="eq-bar w-1.5 bg-secondary rounded-full h-5 origin-bottom"></div>
                </div>
              </div>

              <h3 className="font-headline text-xl font-bold text-primary mb-3">
                Microbiome Preservation
              </h3>

              <p className="text-on-surface-variant text-body-md mb-6 leading-relaxed">
                Real-time monitoring of subsurface microbial activity preventing soil degradation and maintaining natural nutrient cycles.
              </p>
            </div>

            {/* Live Fluctuating Telemetry Metric Bar */}
            <div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/70 border border-outline-variant/40 text-xs font-mono text-primary mb-4">
                <span className="flex items-center gap-1.5 text-on-surface-variant">
                  <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  Microbe Bio-Health
                </span>
                <span className="font-bold text-secondary">{microbeHealth}%</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/40 text-xs font-label uppercase tracking-wider text-secondary font-semibold">
                <span>Telemetry Stream Active</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Card 2: Carbon Credit Verification (Infinite Marquee & Radar Scanner) */}
          <div
            className="stewardship-card bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
            onMouseMove={(e) => handleCardMouseMove(1, e)}
            onMouseLeave={(e) => handleCardMouseLeave(1, e)}
            style={{
              background: cursorPos[1].hovering
                ? `radial-gradient(500px circle at ${cursorPos[1].x}px ${cursorPos[1].y}px, rgba(59, 105, 52, 0.09), transparent 80%), #ffffff`
                : undefined,
            }}
          >
            {/* INFINITE MARQUEE BLOCKCHAIN STREAM BANNER (RUNS CONTINUOUSLY) */}
            <div className="absolute top-0 left-0 w-full h-8 bg-secondary/5 overflow-hidden flex items-center pointer-events-none">
              <div ref={laserBeamRef} className="flex gap-8 whitespace-nowrap text-[10px] font-mono text-secondary/70 uppercase tracking-widest">
                <span>• BLOCK #849201 VERIFIED</span>
                <span>• SEQUESTRATION: +1.84 tCO2e/HA</span>
                <span>• AUDIT PROOF OK</span>
                <span>• BLOCK #849202 VERIFIED</span>
                <span>• SEQUESTRATION: +1.84 tCO2e/HA</span>
                <span>• AUDIT PROOF OK</span>
              </div>
            </div>

            <div className="mt-4">
              {/* Header Icon + Sweeping Radar Scanner */}
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all shadow-inner relative z-10">
                    <Trees className="w-7 h-7" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Rotating Sweeping Radar Scanner */}
                <div className="relative w-9 h-9 rounded-full border border-secondary/40 flex items-center justify-center overflow-hidden bg-secondary/5">
                  <div className="w-full h-full rounded-full animate-radar origin-center bg-gradient-to-tr from-secondary/30 via-transparent to-transparent"></div>
                  <Database className="w-3.5 h-3.5 text-secondary absolute" />
                </div>
              </div>

              <h3 className="font-headline text-xl font-bold text-primary mb-3">
                Carbon Credit Verification
              </h3>

              <p className="text-on-surface-variant text-body-md mb-6 leading-relaxed">
                Auditable, blockchain-indexed carbon sequestration tracking directly tied to live commodity bidding transactions.
              </p>
            </div>

            {/* Live Fluctuating Telemetry Metric Bar */}
            <div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/70 border border-outline-variant/40 text-xs font-mono text-primary mb-4">
                <span className="flex items-center gap-1.5 text-on-surface-variant">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  Carbon Verified
                </span>
                <span className="font-bold text-primary">{carbonCredits} tCO₂e</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/40 text-xs font-label uppercase tracking-wider text-primary font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  ISO 14064 Standard
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Card 3: Aquifer & Soil Protection (Dual Infinite Hydro Waves) */}
          <div
            className="stewardship-card bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
            onMouseMove={(e) => handleCardMouseMove(2, e)}
            onMouseLeave={(e) => handleCardMouseLeave(2, e)}
            style={{
              background: cursorPos[2].hovering
                ? `radial-gradient(500px circle at ${cursorPos[2].x}px ${cursorPos[2].y}px, rgba(59, 105, 52, 0.09), transparent 80%), #ffffff`
                : undefined,
            }}
          >
            {/* FULL-WIDTH DUAL INFINITE CONTINUOUS SVG HYDRO FLOW (NEVER STOPS) */}
            <div className="absolute top-0 left-0 w-full h-24 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity">
              <svg className="w-[400px] h-full" viewBox="0 0 400 90">
                {/* Wave 1 */}
                <path
                  ref={hydroWave1Ref}
                  d="M 0 30 Q 25 10 50 30 T 100 30 T 150 30 T 200 30 T 250 30 T 300 30 T 350 30 T 400 30 Q 425 10 450 30 T 500 30"
                  fill="none"
                  stroke="#3b6934"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Wave 2 Offset */}
                <path
                  ref={hydroWave2Ref}
                  d="M 0 50 Q 25 35 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50 Q 425 35 450 50 T 500 50"
                  fill="none"
                  stroke="#88c47e"
                  strokeWidth="1.8"
                  strokeDasharray="6,4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              {/* Header Icon + Hydro Moisture Pulse Gauge */}
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all shadow-inner relative z-10">
                    <Droplets className="w-7 h-7" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-secondary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Animated Hydro Pulse Ring */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-high/80 rounded-lg border border-outline-variant/30 text-xs font-mono text-secondary">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                  <span>HYDRO SYNC</span>
                </div>
              </div>

              <h3 className="font-headline text-xl font-bold text-primary mb-3">
                Aquifer & Soil Protection
              </h3>

              <p className="text-on-surface-variant text-body-md mb-6 leading-relaxed">
                Precision fertigation algorithms preventing excess nitrogen runoff into regional freshwater basins.
              </p>
            </div>

            {/* Live Fluctuating Telemetry Metric Bar */}
            <div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/70 border border-outline-variant/40 text-xs font-mono text-primary mb-4">
                <span className="flex items-center gap-1.5 text-on-surface-variant">
                  <Droplets className="w-3.5 h-3.5 text-secondary" />
                  Subsurface Water
                </span>
                <span className="font-bold text-secondary">{moistureLevel}% Vol.</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/40 text-xs font-label uppercase tracking-wider text-secondary font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  0.00 PPM Nitrogen Runoff
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

        {/* GSAP Scroll-Triggered Interactive Telemetry Visualizer */}
        <div
          ref={widgetRef}
          className="bg-primary text-on-primary rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-outline-variant/30"
        >
          {/* Decorative Radar Sweep */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full border border-secondary/20 animate-pulse-ring pointer-events-none"></div>
          <div className="absolute -right-20 -bottom-20 w-96 h-96 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-80 h-80 rounded-full border border-dashed border-secondary animate-radar"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Control Column */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/20 text-secondary-fixed text-xs font-label uppercase tracking-widest rounded-md mb-3">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Live Field Telemetry
              </span>
              <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4 leading-snug">
                Real-Time Ecological Health Dashboard
              </h3>
              <p className="text-primary-fixed-dim text-body-md mb-6 leading-relaxed">
                Inspect live ground-sensor health ratings and carbon offsets across monitored agricultural sectors.
              </p>

              {/* Tab Toggles */}
              <div className="flex gap-1.5 p-1.5 bg-black/30 backdrop-blur-md rounded-xl max-w-sm mb-6 border border-white/10">
                <button
                  onClick={() => setActiveTab("soil")}
                  className={`flex-1 py-2 px-3 text-xs font-label rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "soil"
                      ? "bg-secondary text-on-secondary font-bold shadow-md"
                      : "text-primary-fixed-dim hover:text-white"
                  }`}
                >
                  <Sprout className="w-3.5 h-3.5" />
                  Soil Vitality
                </button>
                <button
                  onClick={() => setActiveTab("carbon")}
                  className={`flex-1 py-2 px-3 text-xs font-label rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "carbon"
                      ? "bg-secondary text-on-secondary font-bold shadow-md"
                      : "text-primary-fixed-dim hover:text-white"
                  }`}
                >
                  <Trees className="w-3.5 h-3.5" />
                  Carbon
                </button>
                <button
                  onClick={() => setActiveTab("telemetry")}
                  className={`flex-1 py-2 px-3 text-xs font-label rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "telemetry"
                      ? "bg-secondary text-on-secondary font-bold shadow-md"
                      : "text-primary-fixed-dim hover:text-white"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Node Radar
                </button>
              </div>
            </div>

            {/* Metrics & Visual Display Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Metric Card 1 */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-label uppercase tracking-wider text-primary-fixed-dim">
                    Eco-Efficiency Score
                  </span>
                  <Gauge className="w-6 h-6 text-secondary-fixed" />
                </div>
                <div className="text-4xl md:text-5xl font-headline font-bold text-white mb-2 tracking-tight">
                  {esgMetric}%
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-secondary-fixed transition-all duration-700 ease-out"
                    style={{ width: `${esgMetric}%` }}
                  ></div>
                </div>
                <p className="text-xs text-primary-fixed-dim">
                  +4.2% optimized relative to standard farming
                </p>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-label uppercase tracking-wider text-primary-fixed-dim">
                    Sequestered Carbon
                  </span>
                  <Trees className="w-6 h-6 text-secondary-fixed" />
                </div>
                <div className="text-4xl md:text-5xl font-headline font-bold text-white mb-2 tracking-tight">
                  {carbonOffset.toLocaleString()} <span className="text-base font-normal text-primary-fixed-dim">tCO₂e</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-secondary-fixed to-white transition-all duration-700 ease-out"
                    style={{ width: `${Math.min(100, (carbonOffset / 20000) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-primary-fixed-dim">
                  Equivalent to 4,100 passenger vehicles offset
                </p>
              </div>

              {/* Dynamic Detail Card Based on Active Tab */}
              <div className="sm:col-span-2 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                {activeTab === "soil" && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="font-headline text-lg font-semibold text-white mb-1">
                        Subsurface Nitrogen & Moisture Status
                      </h4>
                      <p className="text-xs text-primary-fixed-dim">
                        Optimal absorption rates verified across 128 active telemetry zones.
                      </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-secondary/30 text-secondary-fixed text-xs font-label font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Optimal Balance
                    </span>
                  </div>
                )}

                {activeTab === "carbon" && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="font-headline text-lg font-semibold text-white mb-1">
                        Soil Organic Matter (SOM) Growth
                      </h4>
                      <p className="text-xs text-primary-fixed-dim">
                        +0.8% increase in organic layer retention over 24-month cycle.
                      </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-secondary/30 text-secondary-fixed text-xs font-label font-bold flex items-center gap-1.5">
                      <Trees className="w-3.5 h-3.5" />
                      High Retention
                    </span>
                  </div>
                )}

                {activeTab === "telemetry" && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="font-headline text-lg font-semibold text-white mb-1">
                        Sensor Mesh Ping & Uptime
                      </h4>
                      <p className="text-xs text-primary-fixed-dim">
                        99.98% satellite-ground sync latency under 12ms.
                      </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-secondary/30 text-secondary-fixed text-xs font-label font-bold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      Ultra-Low Latency
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
