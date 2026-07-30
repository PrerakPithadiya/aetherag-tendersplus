import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  FileText,
  Radio,
  Activity,
  TrendingUp,
  Droplets,
  Leaf,
  Wind,
  CheckCircle2
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const smallImageRef = useRef<HTMLDivElement>(null);
  const hudBadgeRef = useRef<HTMLDivElement>(null);

  // Active hovered hotspot dot state ('dot1' | 'dot2' | 'dot3' | null)
  const [activeHotspot, setActiveHotspot] = useState<"dot1" | "dot2" | "dot3" | null>(null);

  // Live telemetry pulse simulation state
  const [moisture, setMoisture] = useState(41.6);
  const [pulseCount, setPulseCount] = useState(133);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture(() => Number((41.2 + Math.random() * 1.5).toFixed(1)));
      setPulseCount((c) => c + (Math.random() > 0.5 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Badge Elastic Reveal
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0.85, opacity: 0, y: -20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
        );
      }

      // 2. Headline Word Reveal
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".hero-word");
        gsap.fromTo(
          words,
          { y: 40, opacity: 0, rotateX: -30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.07,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      // 3. Subtitle Fade-up
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
        );
      }

      // 4. CTA Buttons Stagger
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { y: 25, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.7,
          }
        );
      }

      // 5. Main Image Entrance
      if (mainImageRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { scale: 0.9, opacity: 0, rotate: -2 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      // 6. Overlapping Small Image Floating Entrance
      if (smallImageRef.current) {
        gsap.fromTo(
          smallImageRef.current,
          { scale: 0.7, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "back.out(1.5)",
            delay: 0.8,
          }
        );

        // Endless Floating Animation
        gsap.to(smallImageRef.current, {
          y: "-=14",
          rotation: 2,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 7. Live HUD Telemetry Badge Entrance & Bounce
      if (hudBadgeRef.current) {
        gsap.fromTo(
          hudBadgeRef.current,
          { scale: 0.8, opacity: 0, x: -30 },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
            delay: 1.0,
          }
        );

        // Soft float
        gsap.to(hudBadgeRef.current, {
          y: "+=10",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Parallax Mouse Movement over Hero Visual Container (Smooth Freeze when Hotspot is Active)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeHotspot) {
      if (mainImageRef.current) {
        gsap.to(mainImageRef.current, {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      return;
    }

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    if (mainImageRef.current) {
      gsap.to(mainImageRef.current, {
        x: x * 10,
        y: y * 10,
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (smallImageRef.current) {
      gsap.to(smallImageRef.current, {
        x: -x * 18,
        y: -y * 18,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (hudBadgeRef.current) {
      gsap.to(hudBadgeRef.current, {
        x: x * 15,
        y: y * 15,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (mainImageRef.current) {
      gsap.to(mainImageRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }
    if (smallImageRef.current) {
      gsap.to(smallImageRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }
    if (hudBadgeRef.current) {
      gsap.to(hudBadgeRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={heroRef}
      className="max-w-container-max mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 relative overflow-visible selection:bg-secondary-container"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Left Column: Kinetic Text & CTAs */}
      <div className="md:col-span-7 flex flex-col justify-center z-10">
        {/* Badge */}
        <div ref={badgeRef} className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-label uppercase tracking-widest border border-secondary/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            Ecosystem Intelligence
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-snug max-w-[620px] text-primary tracking-tight py-1 overflow-visible"
        >
          {"Cultivating the".split(" ").map((word, idx) => (
            <span key={idx} className="hero-word inline-block mr-3">
              {word}
            </span>
          ))}
          <span className="hero-word inline-block mr-3 italic font-serif text-secondary underline decoration-secondary/30 decoration-wavy">
            Future
          </span>
          {"through Precision Data.".split(" ").map((word, idx) => (
            <span key={`w2-${idx}`} className="hero-word inline-block mr-3">
              {word}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="font-body text-body-lg text-on-surface-variant mb-8 max-w-[500px] leading-relaxed"
        >
          AetherAg leverages advanced satellite telemetry, ground sensor arrays, and biomorphic monitoring to bring laboratory-grade precision directly to global field operations.
        </p>

        {/* Buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => {
              window.location.hash = "#/platform";
            }}
            className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label text-label-md hover:bg-primary/90 transition-all cursor-pointer shadow-lg hover:shadow-xl flex items-center gap-2 group"
          >
            <span>Explore Platform</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => {
              window.location.hash = "#/research";
            }}
            className="border border-outline text-primary px-8 py-4 rounded-xl font-label text-label-md hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-secondary" />
            <span>Whitepaper</span>
          </button>
        </div>
      </div>

      {/* Right Column: Dynamic Parallax Media Composition */}
      <div
        className="md:col-span-5 relative mt-8 md:mt-0 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Large Image Container */}
        <div
          ref={mainImageRef}
          className="relative w-full aspect-[4/5] overflow-visible rounded-3xl shadow-2xl border border-outline-variant/50 preserve-3d"
        >
          <img
            alt="Macro foliage precision monitoring"
            className="w-full h-full object-cover rounded-3xl grayscale-[0.1] transition-all duration-700 pointer-events-none select-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqoaFpzZS7SxsYV-Cn4s-G8QfsyW079ryBEFEsv4C8FMlj4bBUGWirYwmiQaCOH6DqUzjnC8zyZ5PvGwvCm2oKhQxr8QBuk81YYlvyi8mOzaaSGei4VJ6GqkQ9NG2ZuUZNw29UQx9IafTcipuQ4ehX0YI__CxFTQzvozuvifgcTBUYIaksd1u6SkIij-AoYi44z5M_BGH4U_ZIY4kX2fZI2QCppPseJOdYulR16nlOWYDw9SAA2oEm8DAG9DZ2ZQgaoI3R3dfLzao"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none rounded-3xl"></div>

          {/* ------------------------------------------------------------- */}
          {/* INTERACTIVE HOTSPOT DOT 1: Hydration Status (Top-Left) */}
          {/* ------------------------------------------------------------- */}
          <div
            className="absolute top-[22%] left-[26%] z-40 cursor-pointer p-4 -m-4 group/dot1"
            onMouseEnter={() => setActiveHotspot("dot1")}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(activeHotspot === "dot1" ? null : "dot1");
            }}
          >
            {/* Glowing Ring Dot Marker */}
            <div className={`w-6 h-6 rounded-full border-2 border-white bg-secondary flex items-center justify-center shadow-lg transition-all duration-300 ${activeHotspot === "dot1" ? "scale-125 ring-8 ring-secondary/40" : "group-hover/dot1:scale-125 ring-4 ring-secondary/30"}`}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Popup Window: Opens Upwards & Left-Aligned */}
            <div
              className={`absolute bottom-full left-0 pb-3 transition-all duration-300 z-50 pointer-events-auto ${
                activeHotspot === "dot1"
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-surface-container-highest/95 backdrop-blur-xl border border-secondary/40 p-4 rounded-xl shadow-2xl text-left min-w-[210px] relative">
                <div className="font-headline font-semibold text-secondary text-sm mb-1 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-secondary" />
                  Hydration Status
                </div>
                <div className="font-body text-xs text-on-surface-variant font-medium">
                  89% relative turgidity
                </div>
                {/* Arrow Pointer */}
                <div className="absolute top-full left-4 border-4 border-transparent border-t-surface-container-highest"></div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* INTERACTIVE HOTSPOT DOT 2: Chlorophyll Index (Middle-Right) */}
          {/* ------------------------------------------------------------- */}
          <div
            className="absolute top-[48%] left-[68%] z-40 cursor-pointer p-4 -m-4 group/dot2"
            onMouseEnter={() => setActiveHotspot("dot2")}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(activeHotspot === "dot2" ? null : "dot2");
            }}
          >
            {/* Glowing Ring Dot Marker */}
            <div className={`w-6 h-6 rounded-full border-2 border-white bg-secondary flex items-center justify-center shadow-lg transition-all duration-300 ${activeHotspot === "dot2" ? "scale-125 ring-8 ring-secondary/40" : "group-hover/dot2:scale-125 ring-4 ring-secondary/30"}`}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Popup Window: Opens Leftward into middle clear space */}
            <div
              className={`absolute right-full top-1/2 -translate-y-1/2 pr-3 transition-all duration-300 z-50 pointer-events-auto ${
                activeHotspot === "dot2"
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-95 translate-x-2 pointer-events-none"
              }`}
            >
              <div className="bg-surface-container-highest/95 backdrop-blur-xl border border-secondary/40 p-4 rounded-xl shadow-2xl text-left min-w-[220px] relative">
                <div className="font-headline font-semibold text-secondary text-sm mb-1 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-secondary" />
                  Chlorophyll Index
                </div>
                <div className="font-body text-xs text-on-surface-variant font-medium">
                  0.84 Optimal photosynthetic activity
                </div>
                {/* Arrow Pointer on the Right Side */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-surface-container-highest"></div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* INTERACTIVE HOTSPOT DOT 3: Stomatal Conductance (Bottom-Left) */}
          {/* ------------------------------------------------------------- */}
          <div
            className="absolute top-[72%] left-[26%] z-40 cursor-pointer p-4 -m-4 group/dot3"
            onMouseEnter={() => setActiveHotspot("dot3")}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(activeHotspot === "dot3" ? null : "dot3");
            }}
          >
            {/* Glowing Ring Dot Marker */}
            <div className={`w-6 h-6 rounded-full border-2 border-white bg-secondary flex items-center justify-center shadow-lg transition-all duration-300 ${activeHotspot === "dot3" ? "scale-125 ring-8 ring-secondary/40" : "group-hover/dot3:scale-125 ring-4 ring-secondary/30"}`}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* Popup Window: Opens Downward & Right-Aligned */}
            <div
              className={`absolute top-full left-0 pt-3 transition-all duration-300 z-50 pointer-events-auto ${
                activeHotspot === "dot3"
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-surface-container-highest/95 backdrop-blur-xl border border-secondary/40 p-4 rounded-xl shadow-2xl text-left min-w-[230px] relative">
                <div className="font-headline font-semibold text-secondary text-sm mb-1 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-secondary" />
                  Stomatal Conductance
                </div>
                <div className="font-body text-xs text-on-surface-variant font-medium">
                  420 mmol/m²·s active transpiration
                </div>
                {/* Arrow Pointer */}
                <div className="absolute bottom-full left-4 border-4 border-transparent border-b-surface-container-highest"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Overlapping Floating Image Card */}
        <div
          ref={smallImageRef}
          className="absolute -top-8 -right-4 w-44 md:w-52 aspect-square z-20 shadow-2xl border-[8px] border-surface rounded-2xl overflow-hidden pointer-events-none"
        >
          <img
            alt="Seedling macro view"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFbe00KWsQsaBNh8IZypSU-BYo7XUu5JFb-APNFx-O6Xacssf5L9jFdF23yIvvdCazdXCLyOHT37R82ZVDbF-qo--l0tWG4c7BJdKu_UwimGMWtDZUEVKSgY1i-7-LHGv0EpJBLYP7Fl7NzbNJigqrQTtPHmDYktbldz_SneyfxBLHgfQ2Y9As_IUZWqSZI-od3JkeT6cdTl5v4JoBPKO5u5glJfBIIOv1d1BBdsh5D3qViFVjUbzz3gUXoHnBFH8GMq_UT1Brsmg"
          />
        </div>

        {/* Dynamic Telemetry Sensor Inspector HUD Card (Updates Live when Any Dot is Hovered/Clicked) */}
        <div
          ref={hudBadgeRef}
          className="absolute -bottom-6 -left-6 md:-left-10 z-30 bg-surface/95 backdrop-blur-xl p-5 rounded-2xl border border-secondary/40 shadow-2xl max-w-[280px] w-full pointer-events-auto transition-all duration-500"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-label uppercase tracking-wider text-secondary font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-secondary" />
              {activeHotspot === "dot1"
                ? "Dot 1: Hydration Telemetry"
                : activeHotspot === "dot2"
                ? "Dot 2: Chlorophyll Stress"
                : activeHotspot === "dot3"
                ? "Dot 3: Transpiration Node"
                : "Live Sensor HUD"}
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          </div>

          {/* Dynamic Content Based on Hovered Dot */}
          {activeHotspot === "dot1" ? (
            <div className="space-y-2 text-xs font-body text-on-surface animate-fade-in">
              <div className="bg-secondary/10 p-2.5 rounded-xl border border-secondary/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-secondary flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5" /> Hydration Status
                  </span>
                  <span className="font-mono font-bold text-primary">89%</span>
                </div>
                <div className="w-full bg-secondary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[89%] rounded-full"></div>
                </div>
              </div>
              <div className="text-[11px] text-on-surface-variant flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-secondary" /> Subsurface turgidity optimal
              </div>
            </div>
          ) : activeHotspot === "dot2" ? (
            <div className="space-y-2 text-xs font-body text-on-surface animate-fade-in">
              <div className="bg-secondary/10 p-2.5 rounded-xl border border-secondary/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-secondary flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5" /> Chlorophyll Index
                  </span>
                  <span className="font-mono font-bold text-primary">0.84</span>
                </div>
                <div className="w-full bg-secondary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[84%] rounded-full"></div>
                </div>
              </div>
              <div className="text-[11px] text-on-surface-variant flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-secondary" /> Photosynthetic rate nominal
              </div>
            </div>
          ) : activeHotspot === "dot3" ? (
            <div className="space-y-2 text-xs font-body text-on-surface animate-fade-in">
              <div className="bg-secondary/10 p-2.5 rounded-xl border border-secondary/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-secondary flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5" /> Stomatal Conduct.
                  </span>
                  <span className="font-mono font-bold text-primary">420</span>
                </div>
                <div className="w-full bg-secondary/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[92%] rounded-full"></div>
                </div>
              </div>
              <div className="text-[11px] text-on-surface-variant flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> Active leaf transpiration
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs font-body text-on-surface">
              <div className="flex justify-between items-center bg-surface-container-high/60 p-2 rounded-lg">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-secondary" />
                  Soil Moisture
                </span>
                <span className="font-mono font-bold text-primary">{moisture}%</span>
              </div>

              <div className="flex justify-between items-center bg-surface-container-high/60 p-2 rounded-lg">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-secondary" />
                  Node Sync Pings
                </span>
                <span className="font-mono font-bold text-primary">{pulseCount}</span>
              </div>
            </div>
          )}
        </div>

        {/* Background Ambient Glow */}
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
}
