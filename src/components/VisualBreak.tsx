import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Radio, Activity, ShieldCheck, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VisualBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const laserBeamRef = useRef<HTMLDivElement>(null);
  const hudPillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Stagger Reveal
      if (textRef.current) {
        const titleWords = textRef.current.querySelectorAll(".vbreak-word");
        gsap.fromTo(
          titleWords,
          { y: 35, opacity: 0, rotateX: -20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
            },
          }
        );

        const para = textRef.current.querySelector("p");
        if (para) {
          gsap.fromTo(
            para,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.3,
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 85%",
              },
            }
          );
        }
      }

      // 2. Endless Sweeping Laser Scan Beam
      if (laserBeamRef.current) {
        gsap.to(laserBeamRef.current, {
          top: "100%",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. Floating HUD Badge Entrance
      if (hudPillRef.current) {
        gsap.fromTo(
          hudPillRef.current,
          { scale: 0.8, opacity: 0, x: 40 },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: hudPillRef.current,
              start: "top 85%",
            },
          }
        );

        // Endless Floating Physics
        gsap.to(hudPillRef.current, {
          y: "-=12",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="w-full h-[520px] relative overflow-hidden group selection:bg-secondary-container"
    >
      {/* Background Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent pointer-events-none"></div>

      {/* Image with zoom-hover effect */}
      <img
        alt="Large macro leaf texture"
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2.5s] ease-out"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqoaFpzZS7SxsYV-Cn4s-G8QfsyW079ryBEFEsv4C8FMlj4bBUGWirYwmiQaCOH6DqUzjnC8zyZ5PvGwvCm2oKhQxr8QBuk81YYlvyi8mOzaaSGei4VJ6GqkQ9NG2ZuUZNw29UQx9IafTcipuQ4ehX0YI__CxFTQzvozuvifgcTBUYIaksd1u6SkIij-AoYi44z5M_BGH4U_ZIY4kX2fZI2QCppPseJOdYulR16nlOWYDw9SAA2oEm8DAG9DZ2ZQgaoI3R3dfLzao"
      />

      {/* Sweeping Laser Scanner Beam */}
      <div
        ref={laserBeamRef}
        className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-secondary-fixed to-transparent z-15 shadow-[0_0_15px_#b9eeab] pointer-events-none opacity-70"
      ></div>

      {/* Content Block */}
      <div className="absolute inset-0 z-20 flex items-center justify-between max-w-container-max mx-auto px-6 md:px-12">
        <div ref={textRef} className="max-w-[500px] text-on-primary">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-secondary-fixed text-xs font-label uppercase tracking-widest border border-white/15 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-secondary-fixed animate-pulse" />
            Biological Integrity
          </span>

          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight text-white flex flex-wrap gap-x-2">
            {"Grounded in Biological".split(" ").map((word, idx) => (
              <span key={idx} className="vbreak-word inline-block">
                {word}
              </span>
            ))}
            <span className="vbreak-word inline-block italic font-serif text-secondary-fixed underline decoration-secondary/40 decoration-wavy">
              Truth.
            </span>
          </h2>

          <p className="font-body text-body-lg text-primary-fixed-dim leading-relaxed max-w-md">
            Experience the resolution of nature, captured in high-definition telemetry and calculated for enterprise resilience.
          </p>
        </div>

        {/* Live Interactive Telemetry Floating HUD Badge */}
        <div
          ref={hudPillRef}
          className="hidden lg:flex flex-col gap-3 bg-surface/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl min-w-[240px] text-left"
        >
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-outline-variant/30">
            <span className="flex items-center gap-1.5 text-xs font-label uppercase tracking-wider text-secondary font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-secondary" />
              Orbital Sync
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          </div>

          <div className="space-y-2 text-xs font-body text-on-surface">
            <div className="flex items-center justify-between gap-3 bg-surface-container-high/60 p-2 rounded-lg">
              <span className="text-on-surface-variant flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-secondary" />
                Soil Volumetric
              </span>
              <span className="font-mono font-bold text-primary">89.4%</span>
            </div>

            <div className="flex items-center justify-between gap-3 bg-surface-container-high/60 p-2 rounded-lg">
              <span className="text-on-surface-variant flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                Ledger Proof
              </span>
              <span className="font-mono font-bold text-primary">ISO 14064</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
