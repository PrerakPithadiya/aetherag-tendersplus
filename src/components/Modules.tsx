import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sprout,
  Activity,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Dna,
  ArrowRight,
  Sparkles,
  Droplets,
  Leaf,
  Cpu
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Modules() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Soil Diagnostics Card State
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState({
    confidence: 92,
    nitrogen: "142 kg/ha",
    moisture: "34.2%",
    pH: "6.8",
  });

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        confidence: Math.floor(Math.random() * 6) + 92, // 92 - 98
        nitrogen: `${Math.floor(Math.random() * 20) + 135} kg/ha`,
        moisture: `${(Math.random() * 4 + 33).toFixed(1)}%`,
        pH: (Math.random() * 0.4 + 6.6).toFixed(1),
      });
    }, 1500);
  };

  // Yield Forecasting Card State
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [forecastYear, setForecastYear] = useState<2026 | 2027>(2026);
  const telemetryStats =
    forecastYear === 2026
      ? [
          { label: "Est. Yield", value: "4.8 tons/ha" },
          { label: "NDVI Index", value: "0.82" },
          { label: "Growth Rate", value: "+1.2% / day" },
        ]
      : [
          { label: "Est. Yield", value: "5.3 tons/ha" },
          { label: "NDVI Index", value: "0.86" },
          { label: "Growth Rate", value: "+1.9% / day" },
        ];

  // Biomorphic R&D Card State
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    { id: 1, x: "28%", y: "45%", title: "Stomata Density", desc: "94.2% - Optimal transpiration", icon: WindIcon },
    { id: 2, x: "72%", y: "65%", title: "Vein Health", desc: "100% fluid transport efficiency", icon: Leaf },
    { id: 3, x: "50%", y: "25%", title: "Hydration Status", desc: "89% relative turgidity", icon: Droplets },
  ];

  function WindIcon(props: React.SVGProps<SVGSVGElement>) {
    return <Activity {...props} />;
  }

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="platform" ref={sectionRef} className="py-24 max-w-container-max mx-auto px-6 md:px-12 selection:bg-secondary-container">
      {/* Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-label uppercase tracking-widest border border-secondary/20 shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            The Toolkit
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Integrated Intelligence Modules
          </h2>
        </div>
        <a
          className="flex items-center gap-2 font-label text-label-md text-primary hover:text-secondary hover:translate-x-1 transition-all group font-semibold"
          href="#/platform"
        >
          <span>View All Modules</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* 3 Interactive Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Soil Diagnostics */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
          {/* Top subtle scan beam overlay when scanning */}
          {isScanning && (
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-secondary-fixed to-secondary animate-pulse z-20"></div>
          )}

          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all shadow-inner">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="bg-secondary/15 text-secondary px-3 py-1 rounded-full text-xs font-label uppercase tracking-wider font-bold border border-secondary/20">
                Telemetry
              </span>
            </div>

            <h3 className="font-headline text-xl font-bold text-primary mb-3">
              Soil Diagnostics
            </h3>
            <p className="text-on-surface-variant text-body-md mb-6 leading-relaxed">
              Real-time microbiome and nutrient density monitoring with sub-centimeter accuracy across thousands of hectares.
            </p>

            {/* Micro Scan Readings Panel */}
            <div className="bg-surface-container-high/80 p-4 rounded-2xl border border-outline-variant/50 grid grid-cols-3 gap-2 text-center text-xs mb-6 relative overflow-hidden">
              <div>
                <p className="text-on-surface-variant text-[10px] font-label uppercase tracking-wider mb-1">Nitrogen</p>
                <p className={`font-mono font-bold text-primary text-sm ${isScanning ? "animate-pulse text-secondary" : ""}`}>
                  {isScanning ? "..." : scanResult.nitrogen}
                </p>
              </div>
              <div>
                <p className="text-on-surface-variant text-[10px] font-label uppercase tracking-wider mb-1">Moisture</p>
                <p className={`font-mono font-bold text-primary text-sm ${isScanning ? "animate-pulse text-secondary" : ""}`}>
                  {isScanning ? "..." : scanResult.moisture}
                </p>
              </div>
              <div>
                <p className="text-on-surface-variant text-[10px] font-label uppercase tracking-wider mb-1">pH Level</p>
                <p className={`font-mono font-bold text-primary text-sm ${isScanning ? "animate-pulse text-secondary" : ""}`}>
                  {isScanning ? "..." : scanResult.pH}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="h-2 w-full bg-surface-container-high rounded-full mb-3 overflow-hidden">
              <div
                style={{ width: `${scanResult.confidence}%` }}
                className={`h-full bg-gradient-to-r from-secondary to-secondary-fixed transition-all duration-700 ease-out ${
                  isScanning ? "w-[30%] animate-pulse" : ""
                }`}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-label text-on-surface-variant">
                Optimal Range: <strong className="text-primary">{scanResult.confidence}% Confidence</strong>
              </span>
              <button
                onClick={triggerScan}
                disabled={isScanning}
                className="text-secondary font-label font-bold hover:underline cursor-pointer disabled:text-outline disabled:no-underline flex items-center gap-1.5"
              >
                <span>{isScanning ? "Scanning..." : "Scan Field"}</span>
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin text-secondary" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Yield Forecasting */}
        <div className="bg-primary text-on-primary p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl border border-outline-variant/30 group">
          <div className="z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-secondary-fixed group-hover:scale-110 transition-all border border-white/10">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="bg-secondary/20 text-secondary-fixed px-3 py-1 rounded-full text-xs font-label uppercase tracking-wider font-bold">
                Predictive AI
              </span>
            </div>

            <h3 className="font-headline text-xl font-bold text-white mb-3">
              Yield Forecasting
            </h3>

            {!dashboardOpen ? (
              <p className="text-primary-fixed-dim text-body-md mb-6 leading-relaxed">
                Advanced algorithmic modeling predicting harvest quality and quantity using multi-spectral atmospheric data.
              </p>
            ) : (
              <div className="mt-2 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl space-y-3 mb-6 animate-fade-in">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-[10px] font-label uppercase tracking-widest text-primary-fixed-dim font-semibold">
                    Simulated Harvest
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setForecastYear(2026)}
                      className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition-all ${
                        forecastYear === 2026 ? "bg-secondary text-on-secondary shadow-sm" : "bg-white/10 text-white/70 hover:text-white"
                      }`}
                    >
                      2026
                    </button>
                    <button
                      onClick={() => setForecastYear(2027)}
                      className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition-all ${
                        forecastYear === 2027 ? "bg-secondary text-on-secondary shadow-sm" : "bg-white/10 text-white/70 hover:text-white"
                      }`}
                    >
                      2027 (Proj)
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {telemetryStats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-[9px] font-label uppercase text-primary-fixed-dim">{stat.label}</p>
                      <p className="font-mono font-bold text-xs text-white mt-0.5">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="z-10 flex justify-between items-center pt-4 border-t border-white/10">
            <button
              onClick={() => setDashboardOpen(!dashboardOpen)}
              className="flex items-center gap-2 font-label text-label-md text-secondary-fixed hover:text-white transition-colors cursor-pointer font-semibold"
            >
              <span>{dashboardOpen ? "Show Overview" : "Launch Dashboard"}</span>
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>

          {/* Decorative background leaf structure */}
          <div className="absolute -right-8 -bottom-8 opacity-10 text-white pointer-events-none">
            <Cpu className="w-48 h-48" />
          </div>
        </div>

        {/* Card 3: Biomorphic R&D */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
          <div>
            <div className="relative overflow-hidden mb-6 h-36 w-full rounded-2xl border border-outline-variant/60">
              <img
                alt="Lush foliage top view"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzw6Lk9lUnm97JEM4vPnuJ9KAKPOSeWjaLr2NTdiNgVB4IXUc3bt0HydV7PkH6Tdl2c67J9-suk_DJpIVDwMhjQ4XFRCiTBVdiDYoIvl-ADWGhzZpFwmSt7ZrZZVjiPgdJzCtudqL-CK6S7DJMksTb4ZzeDnRHX1jCy2QQxufxBm8Ekyk8KcpZwxCjD84HShD565bTQRVYiyW3fsHoiArYWaX_62_wKCuaUy5jpT4YCkDUKZsFh1F3pp_PT7J2zpdJT31Ki6pmqak"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none"></div>

              {/* Interactive Non-Overlapping Hotspots Overlay */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  style={{ left: spot.x, top: spot.y }}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  className="absolute w-4 h-4 bg-secondary border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer shadow-lg hover:scale-125 transition-transform z-10"
                  aria-label={`Hotspot ${spot.id}`}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute"></span>
                </button>
              ))}

              {/* Hotspot details overlay */}
              {activeHotspot !== null && (
                <div className="absolute inset-x-3 bottom-3 bg-surface-container-highest/95 backdrop-blur-md p-3 rounded-xl border border-secondary/40 shadow-xl text-xs transition-all duration-300 animate-fade-in z-20">
                  <p className="font-semibold text-secondary flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    {hotspots.find((h) => h.id === activeHotspot)?.title}
                  </p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    {hotspots.find((h) => h.id === activeHotspot)?.desc}
                  </p>
                </div>
              )}
            </div>

            <h3 className="font-headline text-xl font-bold text-primary mb-3">
              Biomorphic R&D
            </h3>
            <p className="text-on-surface-variant text-body-md mb-6 leading-relaxed">
              Collaborative portal for research teams to sync observational data with automated system telemetry.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40 text-xs font-label uppercase tracking-wider text-secondary font-semibold">
            <span className="flex items-center gap-1.5">
              <Dna className="w-4 h-4 text-secondary" />
              Live Research Portal
            </span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
}
