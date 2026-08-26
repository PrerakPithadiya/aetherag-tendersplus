import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  CheckCircle2,
  Activity,
  Radio,
  Layers,
  Cpu,
  Satellite,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Thermometer,
  Droplets,
  Send,
  BatteryCharging,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Platform() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const chartLineRef = useRef<SVGPathElement>(null);
  const chartHistoricalRef = useRef<SVGPathElement>(null);
  const uptimeNumberRef = useRef<HTMLDivElement>(null);
  const integrityNumberRef = useRef<HTMLDivElement>(null);
  const yieldIncreaseRef = useRef<HTMLDivElement>(null);
  const confidenceRef = useRef<HTMLDivElement>(null);

  // Checkbox layer states
  const [hydrationChecked, setHydrationChecked] = useState(true);
  const [chlorophyllChecked, setChlorophyllChecked] = useState(false);
  const [nitrogenChecked, setNitrogenChecked] = useState(false);
  const [anomalyChecked, setAnomalyChecked] = useState(true);

  // Hover states for probe nodes
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Modal States
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // Equalizer bar heights state for organic live motion
  const [eqHeights, setEqHeights] = useState([65, 80, 100, 75]);
  const [latency, setLatency] = useState("0.2ms");

  // Chart Interactive Hover Scrubber State
  const [chartHover, setChartHover] = useState<{
    active: boolean;
    x: number;
    svgX: number;
    svgY: number;
    stage: string;
    yieldVal: string;
    nitrogenVal: string;
    moistureVal: string;
  } | null>(null);

  // Live telemetry ticker logs
  const [logs, setLogs] = useState<string[]>(() => {
    const time = new Date().toLocaleTimeString();
    return [
      `[${time}] System booted. Mesh sync established.`,
      `[${time}] Latitude -34.6037, Longitude -58.3816 locked.`,
      `[${time}] Probe fleet status: 98.4% operational.`
    ];
  });

  // Dynamic Telemetry Equalizer & Ping Simulator
  useEffect(() => {
    const eqInterval = setInterval(() => {
      setEqHeights([
        Math.floor(45 + Math.random() * 50),
        Math.floor(60 + Math.random() * 38),
        Math.floor(75 + Math.random() * 25),
        Math.floor(50 + Math.random() * 45),
      ]);
      setLatency(`${(0.18 + Math.random() * 0.15).toFixed(2)}ms`);
    }, 1200);

    return () => clearInterval(eqInterval);
  }, []);

  // Telemetry stream log generator simulation
  useEffect(() => {
    const tickerItems = [
      "Soil salinity within threshold for Sector 04-B.",
      "Sentinel-2 Chlorophyll Index baseline updated.",
      "Telemetry ping: AE-04 Probe responding (3.2V battery status).",
      "Evapotranspiration model re-calculated: optimal water retention.",
      "NPK Nitrogen concentration delta detected at Sector 08-C.",
      "Titanium casing heat index: nominal (24°C).",
      "Orbital stream: 15-minute telemetry chunk received.",
      "Sub-surface hydration data packet uploaded to cloud repository."
    ];

    const interval = setInterval(() => {
      const randomMsg = tickerItems[Math.floor(Math.random() * tickerItems.length)];
      const time = new Date().toLocaleTimeString();
      setLogs(prev => [`[${time}] ${randomMsg}`, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Dynamic Page Title & Description for SEO
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "AetherAg Platform | Precision Software & IoT Sensor Network";

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : null;
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore the AetherAg software platform and IoT sensor hardware suite. Track real-time soil health, monitor crop stress via multispectral imaging, and forecast yields with high-accuracy agronomic modeling."
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) {
        metaDesc.setAttribute("content", prevDesc);
      } else if (metaDesc) {
        metaDesc.removeAttribute("content");
      }
    };
  }, []);

  // Keyboard shortcut to close modals on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSpecModalOpen(false);
        setIsDemoModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Main GSAP Animations & ScrollTriggers
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !containerRef.current) return;

    // Helper for safe element querying inside container
    const q = gsap.utils.selector(containerRef);

    // ==========================================
    // 1. HERO SECTION ENTRANCE & 3D PARALLAX
    // ==========================================
    const heroWords = q(".hero-word");
    const heroBadge = q(".hero-badge");
    const heroDesc = q(".hero-desc");
    const heroCtas = q(".hero-cta-btn");
    const heroPreview = heroCardRef.current;
    const heroBackPanel = q(".hero-back-panel");
    const heroHud = q(".hero-hud-badge");
    const heroLiveItems = q(".hero-live-item");

    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state sets
    if (heroBadge.length) gsap.set(heroBadge, { y: -20, opacity: 0, scale: 0.85 });
    if (heroWords.length) gsap.set(heroWords, { y: 40, opacity: 0, rotateX: -30, transformOrigin: "50% 100%" });
    if (heroDesc.length) gsap.set(heroDesc, { y: 25, opacity: 0 });
    if (heroCtas.length) gsap.set(heroCtas, { y: 20, opacity: 0, scale: 0.95 });
    if (heroPreview) {
      gsap.set(heroPreview, {
        scale: 0.93,
        opacity: 0,
        y: 40,
        rotateX: 4,
        rotateY: -6,
        transformPerspective: 1000,
        transformOrigin: "50% 50%",
      });
    }
    if (heroBackPanel.length) gsap.set(heroBackPanel, { x: 20, y: -20, opacity: 0 });
    if (heroLiveItems.length) gsap.set(heroLiveItems, { opacity: 0, y: 15 });

    heroTimeline
      .to(heroBadge, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" }, 0.1)
      .to(heroWords, { y: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.05 }, 0.2)
      .to(heroDesc, { y: 0, opacity: 1, duration: 0.75 }, 0.5)
      .to(heroCtas, { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.1 }, 0.65)
      .to(heroPreview, { y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.0, ease: "power3.out" }, 0.35)
      .to(heroBackPanel, { x: 0, y: 0, opacity: 1, duration: 0.8 }, 0.55)
      .to(heroLiveItems, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, 0.75);

    // Floating HUD badge continuous gentle drift
    if (heroHud.length) {
      gsap.to(heroHud, {
        y: "+=6",
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    // Hero 3D Card Interactive Mouse Move Tilt
    const handleHeroMouseMove = (e: MouseEvent) => {
      if (!heroPreview) return;
      const rect = heroPreview.getBoundingClientRect();
      const cardX = e.clientX - rect.left - rect.width / 2;
      const cardY = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(cardY / (rect.height / 2)) * 6;
      const rotateY = (cardX / (rect.width / 2)) * 6;

      gsap.to(heroPreview, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    const handleHeroMouseLeave = () => {
      if (!heroPreview) return;
      gsap.to(heroPreview, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const heroSectionEl = document.getElementById("platform-hero");
    if (heroSectionEl) {
      heroSectionEl.addEventListener("mousemove", handleHeroMouseMove);
      heroSectionEl.addEventListener("mouseleave", handleHeroMouseLeave);
    }

    // ==========================================
    // 2. INTERACTIVE FIELD EXPLORER & MESH NETWORK
    // ==========================================
    const explorerHeader = q(".explorer-header");
    const explorerPanel = q(".explorer-panel");
    const explorerMap = q(".explorer-map");
    const probeMarkers = q(".probe-marker");
    const probePings = q(".probe-ping-ring");
    const meshLines = q(".mesh-laser-line");

    const explorerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#interactive-field-explorer",
        start: "top 75%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    gsap.set(explorerHeader, { y: 30, opacity: 0 });
    gsap.set(explorerPanel, { x: -35, opacity: 0 });
    gsap.set(explorerMap, { x: 35, opacity: 0, scale: 0.98 });
    gsap.set(probeMarkers, { scale: 0, y: -20, opacity: 0 });
    gsap.set(meshLines, { opacity: 0 });

    explorerTl
      .to(explorerHeader, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 })
      .to(explorerPanel, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.4")
      .to(explorerMap, { x: 0, opacity: 1, scale: 1, duration: 0.85 }, "-=0.6")
      .to(
        probeMarkers,
        { scale: 1, y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "back.out(2)" },
        "-=0.4"
      )
      .to(meshLines, { opacity: 0.85, duration: 0.8 }, "-=0.2");

    // Fleet Uptime Counter (0% -> 98.4%)
    const uptimeTarget = uptimeNumberRef.current;
    if (uptimeTarget) {
      const counterObj = { val: 0 };
      explorerTl.to(
        counterObj,
        {
          val: 98.4,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (uptimeTarget) {
              uptimeTarget.textContent = `${counterObj.val.toFixed(1)}%`;
            }
          },
        },
        "-=0.8"
      );
    }

    // Continuous expanding radar ripple waves on probes
    if (probePings.length) {
      gsap.to(probePings, {
        scale: 2.2,
        opacity: 0,
        duration: 2.2,
        repeat: -1,
        stagger: 0.4,
        ease: "power1.out",
      });
    }

    // Animated Mesh Data Packet Flow
    if (meshLines.length) {
      gsap.to(meshLines, {
        strokeDashoffset: -40,
        duration: 2,
        repeat: -1,
        ease: "none",
      });
    }

    // Map background image subtle scrub parallax
    const fieldImage = q(".explorer-field-image")[0];
    if (fieldImage) {
      gsap.fromTo(
        fieldImage,
        { scale: 1.0, yPercent: -3 },
        {
          scale: 1.06,
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: "#interactive-field-explorer",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }

    // ==========================================
    // 3. BENTO HARDWARE ECOSYSTEM
    // ==========================================
    const bentoHeader = q(".bento-header");
    const bentoCards = q(".bento-card-item");
    const bentoBullets = q(".bento-bullet");

    const bentoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hardware-sensor-suite",
        start: "top 72%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    gsap.set(bentoHeader, { y: 30, opacity: 0 });
    gsap.set(bentoCards, { y: 45, opacity: 0, scale: 0.96 });
    gsap.set(bentoBullets, { x: -15, opacity: 0 });

    bentoTl
      .to(bentoHeader, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 })
      .to(bentoCards, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12 }, "-=0.35")
      .to(bentoBullets, { x: 0, opacity: 1, stagger: 0.06, duration: 0.45 }, "-=0.4");

    // Fleet Integrity Counter (0% -> 99.9%)
    const integrityTarget = integrityNumberRef.current;
    if (integrityTarget) {
      const integrityObj = { val: 0 };
      bentoTl.to(
        integrityObj,
        {
          val: 99.9,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            if (integrityTarget) {
              integrityTarget.textContent = `${integrityObj.val.toFixed(1)}%`;
            }
          },
        },
        "-=0.9"
      );
    }

    // Interactive Spotlight Glare & 3D Tilt on Bento Cards
    const cardCleanups: Array<() => void> = [];
    bentoCards.forEach((card) => {
      const spotlight = card.querySelector(".bento-spotlight") as HTMLElement | null;

      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;

        if (spotlight) {
          spotlight.style.opacity = "1";
          spotlight.style.background = `radial-gradient(360px circle at ${x}px ${y}px, rgba(59, 105, 52, 0.15), transparent 80%)`;
        }
      };

      const handleCardHover = () => {
        gsap.to(card, {
          y: -6,
          scale: 1.015,
          boxShadow: "0 25px 50px -12px rgba(26, 28, 27, 0.12)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleCardLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
          duration: 0.35,
          ease: "power2.out",
        });
        if (spotlight) {
          spotlight.style.opacity = "0";
        }
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleCardHover);
      card.addEventListener("mouseleave", handleCardLeave);
      cardCleanups.push(() => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleCardHover);
        card.removeEventListener("mouseleave", handleCardLeave);
      });
    });

    // ==========================================
    // 4. DATA VISUALIZATION & ML FORECAST CHART
    // ==========================================
    const chartCopy = q(".chart-copy-item");
    const chartCard = q(".chart-card-container");
    const chartEnvelope = q(".chart-envelope-path")[0];
    const chartHistorical = chartHistoricalRef.current;
    const chartLine = chartLineRef.current;
    const chartBadge = q(".chart-badge-callout");
    const chartAxisLabels = q(".chart-axis-label");
    const chartInsight = q(".chart-insight-banner");

    // Initialize SVG paths dash arrays
    if (chartLine) {
      const lineLen = chartLine.getTotalLength ? chartLine.getTotalLength() : 450;
      gsap.set(chartLine, { strokeDasharray: lineLen, strokeDashoffset: lineLen });
    }
    if (chartHistorical) {
      const histLen = chartHistorical.getTotalLength ? chartHistorical.getTotalLength() : 450;
      gsap.set(chartHistorical, { strokeDasharray: histLen, strokeDashoffset: histLen });
    }

    gsap.set(chartCopy, { y: 30, opacity: 0 });
    gsap.set(chartCard, { x: 30, opacity: 0, scale: 0.97 });
    if (chartEnvelope) gsap.set(chartEnvelope, { fillOpacity: 0 });
    if (chartBadge.length) gsap.set(chartBadge, { opacity: 0, scale: 0.6, transformOrigin: "300px 60px" });
    gsap.set(chartAxisLabels, { y: 10, opacity: 0 });
    gsap.set(chartInsight, { y: 20, opacity: 0 });

    const chartTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#predictive-yield-chart",
        start: "top 70%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    chartTimeline
      .to(chartCopy, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 })
      .to(chartCard, { x: 0, opacity: 1, scale: 1, duration: 0.8 }, "-=0.45");

    // Number rollups for yield metrics
    const yieldTarget = yieldIncreaseRef.current;
    const confTarget = confidenceRef.current;
    if (yieldTarget) {
      const yieldObj = { val: 0 };
      chartTimeline.to(
        yieldObj,
        {
          val: 14.2,
          duration: 1.3,
          ease: "power2.out",
          onUpdate: () => {
            if (yieldTarget) yieldTarget.textContent = `+${yieldObj.val.toFixed(1)}%`;
          },
        },
        "-=0.6"
      );
    }
    if (confTarget) {
      const confObj = { val: 0 };
      chartTimeline.to(
        confObj,
        {
          val: 92,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            if (confTarget) confTarget.textContent = `${Math.round(confObj.val)}%`;
          },
        },
        "-=1.1"
      );
    }

    // SVG Drawing Sequence
    if (chartEnvelope) {
      chartTimeline.to(chartEnvelope, { fillOpacity: 0.06, duration: 0.8 }, "-=0.8");
    }
    if (chartHistorical) {
      chartTimeline.to(chartHistorical, { strokeDashoffset: 0, opacity: 0.35, duration: 1.4, ease: "power2.inOut" }, "-=0.7");
    }
    if (chartLine) {
      chartTimeline.to(chartLine, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, "-=1.1");
    }
    if (chartBadge.length) {
      chartTimeline.to(chartBadge, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" }, "-=0.3");
    }
    chartTimeline
      .to(chartAxisLabels, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 }, "-=0.4")
      .to(chartInsight, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    // ==========================================
    // 5. PLATFORM CTA & FOOTER
    // ==========================================
    const ctaCopy = q(".cta-copy-item");
    const ctaBg = q(".cta-parallax-bg")[0];
    const footerItems = q(".footer-item");

    gsap.set(ctaCopy, { y: 35, opacity: 0 });
    gsap.set(footerItems, { y: 25, opacity: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#platform-cta",
        start: "top 75%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    }).to(ctaCopy, { y: 0, opacity: 1, stagger: 0.1, duration: 0.75 });

    if (ctaBg) {
      gsap.fromTo(
        ctaBg,
        { yPercent: -8, scale: 1.05 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: "#platform-cta",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: "#platform-footer",
        start: "top 88%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    }).to(footerItems, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 });

    // Refresh ScrollTrigger when images finish loading
    const images = q("img") as HTMLImageElement[];
    const handleImgLoad = () => ScrollTrigger.refresh();
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", handleImgLoad, { once: true });
      }
    });

    return () => {
      if (heroSectionEl) {
        heroSectionEl.removeEventListener("mousemove", handleHeroMouseMove);
        heroSectionEl.removeEventListener("mouseleave", handleHeroMouseLeave);
      }
      cardCleanups.forEach((cleanup) => cleanup());
      images.forEach((img) => img.removeEventListener("load", handleImgLoad));
    };
  }, { scope: containerRef });

  // Reactive Cross-Fade for Map Data Layers
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduceMotion ? 0 : 0.55;

    gsap.to(".layer-hydration", {
      opacity: hydrationChecked ? 0.75 : 0,
      duration: dur,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(".layer-chlorophyll", {
      opacity: chlorophyllChecked ? 0.8 : 0,
      duration: dur,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(".layer-nitrogen", {
      opacity: nitrogenChecked ? 0.7 : 0,
      duration: dur,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(".layer-anomaly", {
      borderColor: anomalyChecked ? "rgba(186, 26, 26, 0.16)" : "rgba(186, 26, 26, 0)",
      duration: dur,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, {
    dependencies: [hydrationChecked, chlorophyllChecked, nitrogenChecked, anomalyChecked],
    scope: containerRef,
  });

  // Handler for toggle layers with immediate log response
  const toggleLayer = (layer: "hydration" | "chlorophyll" | "nitrogen" | "anomaly") => {
    const time = new Date().toLocaleTimeString();
    let msg = "";

    if (layer === "hydration") {
      setHydrationChecked(!hydrationChecked);
      msg = !hydrationChecked
        ? "Soil Hydration layer overlay synchronized with Sentinel-2 sensors."
        : "Soil Hydration visualization disabled.";
    } else if (layer === "chlorophyll") {
      setChlorophyllChecked(!chlorophyllChecked);
      msg = !chlorophyllChecked
        ? "Photosynthetic stress mapping: Chlorophyll index layer applied."
        : "Chlorophyll Index layer disabled.";
    } else if (layer === "nitrogen") {
      setNitrogenChecked(!nitrogenChecked);
      msg = !nitrogenChecked
        ? "Nitrogen distribution heatmap loaded from root-zone probes."
        : "Nitrogen Distribution layer disabled.";
    } else if (layer === "anomaly") {
      setAnomalyChecked(!anomalyChecked);
      msg = !anomalyChecked
        ? "Anomaly Detection scanning initiated. Root-zone alert systems active."
        : "Anomaly alert warnings disabled.";
    }

    setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 5)]);
  };

  // Interactive Chart Scrubber Handler
  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, clientX));
    const normalizedRatio = clampedX / rect.width;
    const svgX = normalizedRatio * 400;

    // SVG curve polynomial approximation: M0,160 Q100,140 200,100 Q300,60 400,20
    const t = normalizedRatio;
    let svgY = 160;
    if (t <= 0.5) {
      const localT = t * 2;
      svgY = (1 - localT) * (1 - localT) * 160 + 2 * (1 - localT) * localT * 140 + localT * localT * 100;
    } else {
      const localT = (t - 0.5) * 2;
      svgY = (1 - localT) * (1 - localT) * 100 + 2 * (1 - localT) * localT * 60 + localT * localT * 20;
    }

    let stage = "Pre-Seeding";
    let yieldVal = "+3.4%";
    let nitrogenVal = "48 ppm";
    let moistureVal = "42.1%";

    if (t > 0.25 && t <= 0.5) {
      stage = "Emergence";
      yieldVal = "+7.8%";
      nitrogenVal = "64 ppm";
      moistureVal = "38.5%";
    } else if (t > 0.5 && t <= 0.75) {
      stage = "Vegetative";
      yieldVal = "+11.9%";
      nitrogenVal = "82 ppm";
      moistureVal = "35.2%";
    } else if (t > 0.75) {
      stage = "Harvest Window";
      yieldVal = "+14.2%";
      nitrogenVal = "94 ppm";
      moistureVal = "31.8%";
    }

    setChartHover({
      active: true,
      x: clampedX,
      svgX,
      svgY,
      stage,
      yieldVal,
      nitrogenVal,
      moistureVal,
    });
  };

  return (
    <div
      ref={containerRef}
      className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden relative"
    >
      
      {/* Section 1: Hero */}
      <section id="platform-hero" className="relative min-h-[870px] flex items-center overflow-hidden pt-20 pb-32">
        <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-6 z-10 text-left">
            <span className="hero-badge inline-flex items-center gap-2 font-label text-label-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              AetherAg Platform v4.0
            </span>
            <h1 className="font-display text-[56px] leading-[1.1] text-primary mb-6 flex flex-wrap gap-x-3 gap-y-1">
              <span className="hero-word inline-block">The</span>
              <span className="hero-word inline-block">Command</span>
              <span className="hero-word inline-block">Center</span>
              <span className="hero-word inline-block">for</span>
              <span className="hero-word inline-block">Organic</span>
              <span className="hero-word inline-block text-secondary">Precision.</span>
            </h1>
            <p className="hero-desc font-body text-body-lg text-on-surface-variant max-w-xl mb-10">
              Synthesizing hyper-local field telemetry with advanced biomorphic models to optimize every square centimeter of your cultivation cycle.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="hero-cta-btn bg-primary text-on-primary px-8 py-4 rounded-lg font-label text-label-md font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-xl shadow-primary/10 cursor-pointer border-0 flex items-center gap-2 group"
              >
                <span>Request Live Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setIsSpecModalOpen(true)}
                className="hero-cta-btn border border-outline px-8 py-4 rounded-lg font-label text-label-md font-bold uppercase tracking-widest hover:bg-surface-container transition-all cursor-pointer flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-primary" />
                <span>View Hardware Spec Sheet</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-6 relative w-full">
            <div
              ref={heroCardRef}
              className="relative bg-surface-container-low border border-outline-variant/50 rounded-xl p-4 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col will-change-transform"
            >
              {/* Dashboard Simulation Header */}
              <div className="hero-live-item flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/30 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse-green"></div>
                  <span className="font-label text-label-sm font-semibold uppercase tracking-tighter text-on-surface">
                    Live Stream: Sector 07-B
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs text-outline font-label font-mono">{latency} Latency</span>
                </div>
              </div>

              {/* Dashboard Simulation Content */}
              <div className="flex-grow grid grid-cols-3 gap-2 overflow-hidden">
                <div className="hero-live-item col-span-2 relative rounded overflow-hidden group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Agricultural multispectral mapping display dashboard"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgwEf6CBUzkFPSPyoJp9FW8zw6Tm3uc0yn1mNbamwlLIbh6RMEfjBLsWJIc-ugXHWg4D_V2xIqOpNSRExI29BhzWyjChvpwJau5ko27ftx7p96wJcsZ8Wpu-D_PLXmRGimjMNgcmUQVpZMwvdNoL516qczH5ToIFBWq1Pi4beCJEL8Z9BilYwPkCAaUwRdoAxOj-_m2g0puy5cOGsivgmSsX_DOd0Q5Hh8zdw2Z-tgV4Xt5XKptZFR1eiYRX4TkE5MTANNqRzNu2A"
                  />
                  {/* Subtle Scan Line Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent opacity-40 pointer-none animate-pulse"></div>

                  <div className="hero-hud-badge absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-white p-2.5 rounded-lg text-[10px] font-mono leading-relaxed border border-white/15 select-none shadow-xl">
                    <div className="flex items-center gap-1.5 text-secondary font-bold mb-0.5">
                      <Activity className="w-3 h-3" />
                      SPECTRAL SYNTHESIS
                    </div>
                    CHLOROPHYLL_INDEX: 0.84
                    <br />
                    NITROGEN: STABLE
                  </div>
                </div>

                <div className="space-y-2 flex flex-col">
                  {/* Dynamic Equalizer Bar Box */}
                  <div className="hero-live-item bg-surface-container-high h-1/2 rounded p-3 border border-outline-variant/20 flex flex-col justify-between select-none">
                    <div className="flex items-center justify-between text-[10px] font-mono text-outline">
                      <span>RADAR SIGNAL</span>
                      <Radio className="w-3 h-3 text-secondary animate-pulse" />
                    </div>
                    <div className="h-16 w-full flex items-end gap-1.5 pt-2">
                      <div
                        style={{ height: `${eqHeights[0]}%` }}
                        className="flex-1 bg-secondary rounded-sm transition-all duration-700 ease-out"
                      ></div>
                      <div
                        style={{ height: `${eqHeights[1]}%` }}
                        className="flex-1 bg-secondary/80 rounded-sm transition-all duration-700 ease-out"
                      ></div>
                      <div
                        style={{ height: `${eqHeights[2]}%` }}
                        className="flex-1 bg-primary rounded-sm transition-all duration-700 ease-out shadow-sm"
                      ></div>
                      <div
                        style={{ height: `${eqHeights[3]}%` }}
                        className="flex-1 bg-secondary rounded-sm transition-all duration-700 ease-out"
                      ></div>
                    </div>
                  </div>

                  <div className="hero-live-item bg-primary rounded flex-grow p-3 flex flex-col justify-between text-left select-none shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-on-primary font-label text-[10px] uppercase font-bold tracking-widest opacity-80">
                        Soil Moisture
                      </span>
                      <Droplets className="w-3.5 h-3.5 text-secondary-fixed" />
                    </div>
                    <span className="text-on-primary font-headline text-xl font-bold">32.4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back decorative layer */}
            <div className="hero-back-panel absolute -top-6 -right-6 w-full h-full border border-outline-variant/20 rounded-xl -z-10 bg-surface-container-lowest/50"></div>
          </div>

        </div>
      </section>

      {/* Section 2: Interactive Field Explorer & Mesh Network */}
      <section id="interactive-field-explorer" className="bg-surface-container-low py-24 border-t border-b border-outline-variant/20 relative">
        <div className="max-w-[1280px] mx-auto px-12">
          
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="explorer-header font-headline text-headline-md text-primary mb-4">
              The Live Field Explorer
            </h2>
            <p className="explorer-header font-body text-body-md text-on-surface-variant leading-relaxed">
              Real-time geospatial synthesis of sub-surface telemetry and atmospheric variables across mesh sensor nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6 text-left">
              
              {/* Toggles */}
              <div className="explorer-panel bg-white p-6 rounded-xl border border-outline-variant shadow-ambient">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-label text-label-md uppercase tracking-wider text-primary font-bold">
                    Data Layers
                  </h3>
                  <Layers className="w-4 h-4 text-secondary" />
                </div>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <span className={`font-body text-body-md transition-colors ${hydrationChecked ? "text-secondary font-semibold" : "text-on-surface group-hover:text-secondary"}`}>
                      Soil Hydration
                    </span>
                    <input
                      checked={hydrationChecked}
                      onChange={() => toggleLayer("hydration")}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer h-4 w-4 accent-secondary"
                      type="checkbox"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <span className={`font-body text-body-md transition-colors ${chlorophyllChecked ? "text-secondary font-semibold" : "text-on-surface group-hover:text-secondary"}`}>
                      Chlorophyll Index
                    </span>
                    <input
                      checked={chlorophyllChecked}
                      onChange={() => toggleLayer("chlorophyll")}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer h-4 w-4 accent-secondary"
                      type="checkbox"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <span className={`font-body text-body-md transition-colors ${nitrogenChecked ? "text-secondary font-semibold" : "text-on-surface group-hover:text-secondary"}`}>
                      Nitrogen Dist.
                    </span>
                    <input
                      checked={nitrogenChecked}
                      onChange={() => toggleLayer("nitrogen")}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer h-4 w-4 accent-secondary"
                      type="checkbox"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <span className={`font-body text-body-md transition-colors ${anomalyChecked ? "text-secondary font-semibold" : "text-on-surface group-hover:text-secondary"}`}>
                      Anomaly Detection
                    </span>
                    <input
                      checked={anomalyChecked}
                      onChange={() => toggleLayer("anomaly")}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer h-4 w-4 accent-secondary"
                      type="checkbox"
                    />
                  </label>
                </div>
              </div>

              {/* Status Card with Counter */}
              <div className="explorer-panel bg-primary p-6 rounded-xl text-on-primary shadow-xl shadow-primary/10 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4 select-none">
                  <span className="material-symbols-outlined text-secondary-fixed">sensors</span>
                  <span className="font-label text-label-sm uppercase tracking-widest font-semibold">
                    Global Status
                  </span>
                </div>
                <div>
                  <div ref={uptimeNumberRef} className="text-3xl font-headline font-bold text-white mb-1">
                    98.4%
                  </div>
                  <div className="font-label text-[10px] text-on-primary-container uppercase tracking-wider font-bold">
                    Fleet Uptime
                  </div>
                </div>
              </div>

              {/* Live Ticker log container */}
              <div className="explorer-panel bg-surface-container-high border border-outline-variant/30 rounded-xl p-4 shadow-sm h-[180px] overflow-hidden flex flex-col">
                <span className="font-label text-[10px] uppercase tracking-wider text-outline mb-2 block font-bold select-none">
                  Telemetry Event Stream
                </span>
                <div
                  aria-live="polite"
                  className="flex-grow font-mono text-[11px] text-on-surface-variant/90 space-y-2 overflow-y-auto pr-1 select-none"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {logs.map((log, idx) => (
                    <div key={idx} className="transition-all duration-300 leading-normal animate-fade-in">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Map Canvas */}
            <div className="explorer-map lg:col-span-3 relative h-[600px] bg-surface-dim rounded-xl overflow-hidden border border-outline-variant shadow-inner">
              <img
                className="explorer-field-image w-full h-full object-cover mix-blend-multiply opacity-80 will-change-transform"
                alt="Overview of gridded farm field"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1VgJCrY0w9vjIutg97JFPEmBszosG4_nU8-NRw27tEzG9sui22PVbL6C9obLG0qvsYhtRxt0ueWhPjta5F7NB2i3yLC-Tp-H1mU-phldTU4p93XocxlCPfq4_qXThrySzkZgQoRx0C00K4pHAR7Iay9ii6CUcl2mGJ5WRW_o9birZkwtZnquVxTCsTxSE1XC0CtZzhE6x0-zEqYWTSOHx1HxobcNAJaYRtc8GvmZsjOlM2epx2kou9P_jWPRIaQBguY0LXI7u1mQ"
              />

              {/* SVG Mesh Laser Connection Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b6934" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#55a349" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#3b6934" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Connection Line: Probe 1 (33.3%, 25%) to Probe 3 (48%, 60%) */}
                <line
                  className="mesh-laser-line"
                  x1="33.3"
                  y1="25"
                  x2="48"
                  y2="60"
                  stroke="url(#meshGradient)"
                  strokeWidth="0.4"
                  strokeDasharray="1.5, 1.5"
                />
                {/* Connection Line: Probe 3 (48%, 60%) to Probe 2 (75%, 50%) */}
                <line
                  className="mesh-laser-line"
                  x1="48"
                  y1="60"
                  x2="75"
                  y2="50"
                  stroke="url(#meshGradient)"
                  strokeWidth="0.4"
                  strokeDasharray="1.5, 1.5"
                />
                {/* Connection Line: Probe 1 (33.3%, 25%) to Probe 2 (75%, 50%) */}
                <line
                  className="mesh-laser-line"
                  x1="33.3"
                  y1="25"
                  x2="75"
                  y2="50"
                  stroke="url(#meshGradient)"
                  strokeWidth="0.3"
                  strokeDasharray="2, 2"
                  opacity="0.5"
                />
              </svg>

              {/* Dynamic Overlay Layers */}
              {/* Hydration Gradient Layer */}
              <div className="layer-hydration absolute inset-0 pointer-events-none mix-blend-multiply opacity-0">
                <div className="w-full h-full bg-gradient-to-tr from-cyan-600/35 via-blue-500/25 to-transparent mix-blend-color"></div>
              </div>

              {/* Chlorophyll (NDVI green mapping) Layer */}
              <div className="layer-chlorophyll absolute inset-0 pointer-events-none mix-blend-multiply opacity-0">
                <div className="w-full h-full bg-gradient-to-br from-secondary/45 via-emerald-600/30 to-transparent mix-blend-color-burn"></div>
              </div>

              {/* Nitrogen distribution heatmap Layer */}
              <div className="layer-nitrogen absolute inset-0 pointer-events-none mix-blend-overlay opacity-0">
                <div className="w-full h-full bg-gradient-to-r from-amber-600/30 via-yellow-500/20 to-transparent"></div>
              </div>

              {/* Anomaly Highlight Overlay Boundary */}
              <div className="layer-anomaly absolute inset-0 pointer-events-none border-4 border-error/0"></div>

              {/* Floating Sensor Probe 1: Node AE-04 (Optimal) */}
              <div
                className="probe-marker absolute top-1/4 left-1/3 group cursor-pointer z-30 p-2 -m-2"
                onMouseEnter={() => setHoveredNode("AE-04")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredNode(hoveredNode === "AE-04" ? null : "AE-04");
                }}
              >
                <div className="probe-ping-ring absolute inset-0 rounded-full bg-secondary/40 pointer-events-none"></div>
                <div className="w-4 h-4 bg-secondary rounded-full animate-pulse-green ring-4 ring-secondary/30 flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 relative z-10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>

                {/* Tooltip AE-04 */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-surface/95 backdrop-blur-md border border-secondary/40 text-xs p-3 rounded-xl shadow-2xl whitespace-nowrap z-40 transition-all duration-300 text-left pointer-events-auto ${
                    hoveredNode === "AE-04" ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="font-bold text-primary flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    Probe Node AE-04
                  </div>
                  <div className="text-on-surface-variant font-body">Depth: 45cm</div>
                  <div className="text-on-surface-variant font-body">Salinity: 1.2 dS/m</div>
                  <div className="text-secondary font-mono text-[10px] font-bold mt-1 uppercase">Status: Optimal</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-surface"></div>
                </div>
              </div>

              {/* Floating Sensor Probe 2: Node AE-12 (Anomaly - Hydration Low) */}
              <div
                className={`probe-marker absolute bottom-1/2 right-1/4 group cursor-pointer z-30 p-2 -m-2 transition-all duration-500 ${
                  anomalyChecked ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
                }`}
                onMouseEnter={() => setHoveredNode("AE-12")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredNode(hoveredNode === "AE-12" ? null : "AE-12");
                }}
              >
                <div className="probe-ping-ring absolute inset-0 rounded-full bg-error/40 pointer-events-none"></div>
                <div className="w-4 h-4 bg-error rounded-full ring-4 ring-error/30 flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 relative z-10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>

                {/* Tooltip AE-12 */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-surface/95 backdrop-blur-md border border-error/50 text-xs p-3 rounded-xl shadow-2xl whitespace-nowrap z-40 transition-all duration-300 text-left pointer-events-auto ${
                    hoveredNode === "AE-12" ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="font-bold text-error flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                    Warning: Hydration Low
                  </div>
                  <div className="text-on-surface-variant font-body">Sector 12-F</div>
                  <div className="text-on-surface-variant font-body">Action Req: Auto-Irrigate</div>
                  <div className="text-error font-mono text-[10px] font-bold mt-1 uppercase">Status: Alert Active</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-surface"></div>
                </div>
              </div>

              {/* Floating Sensor Probe 3: Node AE-08 (Baseline) */}
              <div
                className="probe-marker absolute top-[60%] left-[48%] group cursor-pointer z-30 p-2 -m-2"
                onMouseEnter={() => setHoveredNode("AE-08")}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredNode(hoveredNode === "AE-08" ? null : "AE-08");
                }}
              >
                <div className="probe-ping-ring absolute inset-0 rounded-full bg-secondary/30 pointer-events-none"></div>
                <div className="w-4 h-4 bg-secondary-fixed-dim rounded-full ring-4 ring-secondary/30 flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 relative z-10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>

                {/* Tooltip AE-08 */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-surface/95 backdrop-blur-md border border-secondary/40 text-xs p-3 rounded-xl shadow-2xl whitespace-nowrap z-40 transition-all duration-300 text-left pointer-events-auto ${
                    hoveredNode === "AE-08" ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="font-bold text-primary flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
                    Probe Node AE-08
                  </div>
                  <div className="text-on-surface-variant font-body">Depth: 30cm</div>
                  <div className="text-on-surface-variant font-body">Salinity: 0.9 dS/m</div>
                  <div className="text-primary font-mono text-[10px] font-bold mt-1 uppercase">Status: Baseline OK</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-surface"></div>
                </div>
              </div>

              {/* Legend Overlay */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-3 rounded-lg border border-outline-variant text-[11px] font-label uppercase tracking-widest text-primary flex items-center gap-6 shadow-sm select-none z-30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div> Optimal
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-surface-tint"></div> Baseline
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error"></div> Anomaly
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Bento Hardware Ecosystem */}
      <section id="hardware-sensor-suite" className="py-32 px-12 max-w-[1280px] mx-auto">
        <div className="mb-20 text-left">
          <span className="bento-header font-label text-label-sm uppercase tracking-widest text-secondary font-bold block">
            Hardware Ecosystem
          </span>
          <h2 className="bento-header font-headline text-[48px] text-primary mt-4">
            The IoT Sensor Suite.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: AetherProbe v4 */}
          <div className="bento-card-item md:col-span-8 bg-surface-container rounded-xl overflow-hidden flex flex-col md:flex-row text-left border border-outline-variant/10 shadow-sm transition-all will-change-transform relative group">
            {/* Spotlight Glare */}
            <div className="bento-spotlight absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-10"></div>

            <div className="p-10 flex-1 flex flex-col justify-center relative z-20">
              <span className="font-label text-label-sm uppercase tracking-widest text-outline-variant mb-4 font-bold block">
                Precision Root-Zone
              </span>
              <h3 className="font-headline text-headline-sm mb-4 text-primary font-normal">
                AetherProbe v4 (Sub-surface Analyzer)
              </h3>
              <p className="font-body text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Quad-depth capacitive sensing with integrated saline-leakage detection. Ultra-low power telemetry for 5-year deployment cycles.
              </p>
              <ul className="space-y-2 text-label-sm uppercase tracking-tight text-primary font-semibold">
                <li className="bento-bullet flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> 10cm, 30cm, 60cm, 1m Sensing
                </li>
                <li className="bento-bullet flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> NPK Ion Estimation
                </li>
                <li className="bento-bullet flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Titanium Alloy Chassis
                </li>
              </ul>
            </div>
            <div className="flex-grow min-h-[300px] relative overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="AetherProbe in fertile ground spec"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJPUFHlAEphKuPFaiR1vOgUDI5L7nfhz0SJ8H4exDoWF92WtsHguugdUwLHxoXjZhzDXI5B9VRgdS2FGJfkMD6q_uxuylP7LHB6vIIGYzHKNBGzGuLiiAKddII0z2VC9gtzTUpm8PdwNwZoPKeJQ0DMudAV2gsIkz9O4DV01Uy31GWd7luWEYNlUxzWui3D5w0KmchHOWDVDFERz7spP1FHhbSdd933NpV3U-ygzJd57h4cjrs1TucuHrqcyzN3Yo_giFxDZ86cPA"
              />
            </div>
          </div>

          {/* Bento Item 2: Stat card with Counter */}
          <div className="bento-card-item md:col-span-4 bg-primary rounded-xl p-10 flex flex-col justify-between text-on-primary text-left shadow-sm transition-all will-change-transform relative overflow-hidden group">
            <div className="bento-spotlight absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-10"></div>
            <div className="flex justify-between items-start select-none relative z-20">
              <Satellite className="w-10 h-10 text-secondary-fixed animate-pulse" />
              <div className="text-right">
                <div className="font-label text-[10px] uppercase opacity-60">
                  Refresh Rate
                </div>
                <div className="font-label text-label-md text-white font-semibold">Every 15m</div>
              </div>
            </div>
            <div className="mt-8 relative z-20">
              <div ref={integrityNumberRef} className="font-display text-4xl mb-2 text-white font-bold">
                99.9%
              </div>
              <p className="font-body text-body-md opacity-70 leading-relaxed">
                Fleet-wide data integrity across distributed mesh networks.
              </p>
            </div>
          </div>

          {/* Bento Item 3: AetherEye */}
          <div className="bento-card-item md:col-span-4 bg-surface-container-high rounded-xl p-10 border border-outline-variant/30 flex flex-col justify-between text-left shadow-sm transition-all will-change-transform relative overflow-hidden group">
            <div className="bento-spotlight absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-10"></div>
            <div className="relative z-20">
              <h3 className="font-headline text-headline-sm mb-4 text-primary font-normal">AetherEye</h3>
              <p className="font-body text-body-md text-on-surface-variant mb-8 leading-relaxed">
                Multispectral canopy analysis detecting photosynthetic stress before it's visible to the human eye.
              </p>
            </div>
            <div className="relative z-20">
              <div className="h-48 rounded-lg overflow-hidden grayscale contrast-125 mb-6">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="AetherEye camera lens specs"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgYXkmzqmCThxrlRxmrNwewgoqV9eyhd3Lkm9FA3vWWzxPFcb3WIvYRbEM4ezarO5P_zFL-8Lkk4Uhl94xe_w-lWLcTG2WeCoCxVOB6hRd0XNn5fuKzdhuUO_ZBLqi2mYrmw5LMT7S3IQfekuGPIPjFvnRQCMPz9oX5e0DxArMI-Rkq_ddDGXE5i6hyCtNszoz2TLqylw6hmseF-1N95Vv0u2_iuy65yP5EF_rmHj4sLX-jhTDtQmL3Bn1Xgfu95GATix4NnxDtVU"
                />
              </div>
              <button
                onClick={() => setIsSpecModalOpen(true)}
                className="font-label text-label-sm uppercase tracking-widest font-bold flex items-center gap-2 group text-primary hover:text-secondary transition-colors cursor-pointer border-0 bg-transparent p-0"
              >
                <span>Spec Sheet</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          {/* Bento Item 4: Orbital Stream */}
          <div className="bento-card-item md:col-span-8 bg-tertiary-fixed rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 text-left border border-outline-variant/10 shadow-sm transition-all will-change-transform relative group">
            <div className="bento-spotlight absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-10"></div>
            <div className="min-h-[300px] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Orbital Stream satellite details"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLlzpy2AG9r0MIyFkkvJSN2N7Tc0gLpdnOJeySKb6i_UMYUksiOhYAY14Vfet4Int8ZXIzUzOKKi_3N0kgXBv7ZtBIOTA8XheJToqLq0FDPcygGUPFWdSoOYHjfO3K1XhAIGp86R4vMEgkeQYBqOB8HZD1MskzFRXpqy0ZGpcqDN_QxEYOLUenr70AnjPjUPH4Rs2R-kOuYU1BJzI3e6xm_Bo2g6SJ22f_8OkQlqWhiMGwJtMlHWZHNwCS9Cjn4erinm_ryUW14To"
              />
            </div>
            <div className="p-10 flex flex-col justify-center bg-white/20 backdrop-blur-md relative z-20">
              <span className="font-label text-label-sm uppercase tracking-[0.2em] text-on-tertiary-fixed-variant font-bold mb-4 block">
                Space-borne Insights
              </span>
              <h3 className="font-headline text-headline-sm text-on-tertiary-fixed mb-4 font-normal">
                Orbital Stream
              </h3>
              <p className="font-body text-body-md text-on-tertiary-fixed-variant leading-relaxed">
                Seamlessly synthesize sub-surface probe data with SAR (Synthetic Aperture Radar) satellite imagery for field-wide water balance modeling.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Section 4: Data Visualization & ML Models */}
      <section id="predictive-yield-chart" className="bg-white py-32 border-t border-b border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="text-left">
            <span className="chart-copy-item font-label text-label-sm uppercase tracking-[0.2em] text-secondary font-bold mb-6 block">
              ML Performance Metrics
            </span>
            <h2 className="chart-copy-item font-headline text-[48px] leading-tight text-primary mb-8 font-normal">
              Yield Forecasting Models.
            </h2>
            <p className="chart-copy-item font-body text-body-lg text-on-surface-variant mb-10 leading-relaxed">
              Our proprietary Large Agriculture Model (LAM) processes over 4 terabytes of telemetry daily to generate predictive cultivation paths. By simulating millions of environmental permutations, we provide a definitive confidence envelope for your upcoming harvest.
            </p>
            
            <div className="chart-copy-item grid grid-cols-2 gap-8 border-t border-outline-variant pt-10">
              <div>
                <div ref={yieldIncreaseRef} className="font-display text-5xl text-secondary mb-2 font-normal">
                  +14.2%
                </div>
                <div className="font-label text-label-sm uppercase text-outline tracking-wider">
                  Average Yield Increase
                </div>
              </div>
              <div>
                <div ref={confidenceRef} className="font-display text-5xl text-primary mb-2 font-normal">
                  92%
                </div>
                <div className="font-label text-label-sm uppercase text-outline tracking-wider">
                  Prediction Confidence
                </div>
              </div>
            </div>
          </div>

          {/* SVG Line Chart with Interactive Hover Scrubber */}
          <div
            onMouseMove={handleChartMouseMove}
            onMouseLeave={() => setChartHover(null)}
            className="chart-card-container bg-surface-container-low p-10 rounded-2xl border border-outline-variant/30 shadow-sm relative text-left will-change-transform cursor-crosshair group"
          >
            <div className="flex items-center justify-between mb-12 select-none">
              <h4 className="font-label text-label-md uppercase font-bold tracking-widest text-primary">
                Yield Variance (Forecast)
              </h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-label font-bold uppercase text-primary">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div> Current
                </div>
                <div className="flex items-center gap-2 text-[10px] font-label font-bold uppercase text-primary/60">
                  <div className="w-2 h-2 rounded-full bg-primary/20"></div> Historical
                </div>
              </div>
            </div>

            {/* SVG Plot */}
            <div className="relative h-64 w-full">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 200">
                {/* Background Grid */}
                <line opacity="0.3" stroke="#c4c7c7" strokeDasharray="4" x1="0" x2="400" y1="50" y2="50"></line>
                <line opacity="0.3" stroke="#c4c7c7" strokeDasharray="4" x1="0" x2="400" y1="100" y2="100"></line>
                <line opacity="0.3" stroke="#c4c7c7" strokeDasharray="4" x1="0" x2="400" y1="150" y2="150"></line>

                {/* Shaded Confidence Envelope */}
                <path
                  className="chart-envelope-path"
                  d="M0,160 Q100,140 200,100 Q300,60 400,20 L400,80 Q300,120 200,160 Q100,180 0,190 Z"
                  fill="#3b6934"
                  fillOpacity="0"
                ></path>

                {/* Historical Line */}
                <path
                  ref={chartHistoricalRef}
                  d="M0,170 Q100,150 200,120 Q300,90 400,80"
                  fill="none"
                  opacity="0"
                  stroke="#000"
                  strokeDasharray="4"
                  strokeWidth="1.5"
                ></path>

                {/* Current/Predicted Trend Line */}
                <path
                  ref={chartLineRef}
                  d="M0,160 Q100,140 200,100 Q300,60 400,20"
                  fill="none"
                  stroke="#3b6934"
                  strokeWidth="3"
                ></path>

                {/* Interactive Scrubber Guide Line & Dot */}
                {chartHover && chartHover.active && (
                  <g className="transition-all duration-75">
                    <line
                      x1={chartHover.svgX}
                      y1="0"
                      x2={chartHover.svgX}
                      y2="200"
                      stroke="#3b6934"
                      strokeWidth="1.2"
                      strokeDasharray="3,3"
                      opacity="0.8"
                    />
                    <circle
                      cx={chartHover.svgX}
                      cy={chartHover.svgY}
                      r="6"
                      fill="#3b6934"
                      className="animate-ping opacity-75"
                    />
                    <circle
                      cx={chartHover.svgX}
                      cy={chartHover.svgY}
                      r="5"
                      fill="#ffffff"
                      stroke="#3b6934"
                      strokeWidth="2.5"
                    />
                  </g>
                )}

                {/* Key data point MAX_POTENTIAL */}
                {!chartHover?.active && (
                  <g className="chart-badge-callout">
                    {/* Leader Line */}
                    <line
                      x1="300"
                      y1="60"
                      x2="300"
                      y2="38"
                      stroke="#3b6934"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.6"
                    />
                    {/* Badge Container */}
                    <rect
                      x="250"
                      y="20"
                      width="100"
                      height="18"
                      rx="9"
                      fill="#3b6934"
                    />
                    {/* Badge Text */}
                    <text
                      fill="#ffffff"
                      fontFamily="Hanken Grotesk"
                      fontSize="8"
                      fontWeight="bold"
                      x="300"
                      y="32"
                      textAnchor="middle"
                      className="select-none font-bold tracking-wider"
                    >
                      MAX_POTENTIAL
                    </text>
                    {/* Pulse Indicator */}
                    <circle
                      cx="300"
                      cy="60"
                      fill="#3b6934"
                      r="5"
                      className="animate-pulse"
                    ></circle>
                  </g>
                )}
              </svg>

              {/* Floating Dynamic Scrubber Readout Badge */}
              {chartHover && chartHover.active && (
                <div
                  style={{
                    left: `${Math.max(10, Math.min(80, (chartHover.svgX / 400) * 100))}%`,
                    top: "-25px",
                  }}
                  className="absolute -translate-x-1/2 bg-primary/95 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-xs shadow-2xl border border-white/20 pointer-events-none whitespace-nowrap z-30 transition-all duration-75"
                >
                  <div className="font-bold text-secondary-fixed flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {chartHover.stage}
                  </div>
                  <div className="font-mono text-[10px] text-white/90 mt-0.5">
                    Yield Delta: <span className="text-secondary font-bold">{chartHover.yieldVal}</span> | Moisture: {chartHover.moistureVal}
                  </div>
                </div>
              )}
            </div>

            {/* Chart X Axis Labels */}
            <div className="flex justify-between mt-8 text-[10px] font-label font-bold uppercase text-outline select-none">
              <span className="chart-axis-label">Pre-Seeding</span>
              <span className="chart-axis-label">Emergence</span>
              <span className="chart-axis-label">Vegetative</span>
              <span className="chart-axis-label">Harvest</span>
            </div>

            {/* ML Insight Alert Banner */}
            <div className="chart-insight-banner mt-8 bg-secondary/10 border border-secondary/20 p-4 rounded-xl flex flex-col sm:flex-row gap-3 sm:items-center text-left">
              <span className="font-label text-[10px] uppercase font-bold tracking-widest bg-secondary text-on-secondary px-2 py-1 rounded select-none shrink-0 w-fit">
                ML Insight
              </span>
              <p className="font-body text-[12px] leading-snug text-on-secondary-container">
                Projected nitrogen uptake is 8% higher than historical average. Adjust fertigation for Sector 4-A.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Section 5: CTA */}
      <section id="platform-cta" className="relative py-32 overflow-hidden bg-primary text-on-primary">
        <div className="cta-parallax-bg absolute top-0 right-0 w-1/2 h-full opacity-30 grayscale pointer-events-none z-0 will-change-transform">
          <img
            className="w-full h-full object-cover"
            alt="Sprout emerging from dark organic earth under dramatic spotlight"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx-HbYjKU17OZ1-6PjdjIYZUwPyCUvwGpCrKVNH_LYJiWb5u4zd1TT1b2aKsiYjxlgkzxrTBq95PmZ4USWyKvBMA208223FDQjvSpN3iuQYUZztKNPpXFcq_kdRzbojRPYu2_fgkLkXteCvKaaxy6FlCfeYYoqqDYD6tLGhxYg4nC-a3RibkL1wZcHHjVPBRqNqqV2RU1gP3hpZYgcGSBmaBLAL0Z9RkjMZ_9QvLNFP9QjWLVTi33ajhAlPT2jTsx4iHEI0NzvqxM"
          />
        </div>
        <div className="max-w-[1280px] mx-auto px-12 relative z-10 text-left">
          <div className="max-w-2xl">
            <h2 className="cta-copy-item font-headline text-5xl md:text-[56px] leading-[1.1] text-white mb-8">
              Ready for the next cultivation cycle?
            </h2>
            <p className="cta-copy-item font-body text-body-lg text-primary-fixed-dim mb-12">
              Deploy the world's most advanced agronomic intelligence platform. Our team of systems engineers and agronomists will design a custom telemetry network tailored to your specific regional terroir.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="cta-copy-item bg-secondary text-on-secondary px-10 py-5 rounded font-label text-label-md font-bold uppercase tracking-widest hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all cursor-pointer border-0 shadow-xl"
              >
                Book Pre-Season Assessment
              </button>
              <a
                className="cta-copy-item font-label text-label-md font-bold uppercase tracking-widest flex items-center gap-3 pt-5 group text-white hover:text-secondary-fixed transition-colors cursor-pointer"
                href="#/enterprise#contact"
              >
                Contact an Agronomist
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="platform-footer" className="bg-surface-container-low w-full border-t border-outline-variant/30 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start px-12 py-16 w-full max-w-[1280px] mx-auto">
          <div className="footer-item mb-12 md:mb-0">
            <div className="font-headline text-xl text-primary mb-6">
              AetherAg
            </div>
            <p className="font-body text-body-md text-on-surface-variant max-w-xs mb-8 leading-relaxed">
              Precision and Stewardship for Global Agriculture. Pioneering the intersection of data and the living world.
            </p>
            <div className="flex gap-6">
              <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
              <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="footer-item">
              <h5 className="font-label text-label-sm uppercase tracking-wider text-primary font-bold mb-6">
                Company
              </h5>
              <ul className="space-y-4">
                <li>
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">
                    Governance
                  </a>
                </li>
                <li>
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">
                    Regional Support
                  </a>
                </li>
                <li>
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-item">
              <h5 className="font-label text-label-sm uppercase tracking-wider text-primary font-bold mb-6">
                Resources
              </h5>
              <ul className="space-y-4">
                <li>
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">
                    Environmental Impact
                  </a>
                </li>
                <li>
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">
                    Research Papers
                  </a>
                </li>
                <li>
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">
                    Hardware API
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-item">
              <h5 className="font-label text-label-sm uppercase tracking-wider text-primary font-bold mb-6">
                Legal
              </h5>
              <ul className="space-y-4">
                <li>
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#/terms">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-item border-t border-outline-variant/20 px-12 py-8 max-w-[1280px] mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-label-sm text-outline font-semibold">
            © 2026 AetherAg Precision Systems. Precision and Stewardship for Global Agriculture.
          </p>
          <div className="flex gap-6 font-label-sm text-label-sm text-outline font-semibold">
            <span className="hover:text-primary cursor-pointer transition-colors">LinkedIn</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-primary cursor-pointer transition-colors">GitHub</span>
          </div>
        </div>
      </footer>

      {/* ========================================== */}
      {/* MODAL 1: HARDWARE SPEC SHEET MODAL         */}
      {/* ========================================== */}
      {isSpecModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-container-low border border-outline-variant/40 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-8 text-left relative"
          >
            <button
              onClick={() => setIsSpecModalOpen(false)}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-primary p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border-0 bg-transparent"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-secondary/10 rounded-lg text-secondary">
                <Cpu className="w-5 h-5" />
              </span>
              <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold">
                Hardware Engineering Specifications
              </span>
            </div>
            <h3 className="font-headline text-3xl text-primary mb-6">
              AetherProbe v4 & Sensor Suite Specs
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <span className="text-xs font-semibold uppercase text-outline">Sensor Array</span>
                  <span className="text-sm font-bold text-primary">Quad-Depth Capacitive</span>
                </div>
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <span className="text-xs font-semibold uppercase text-outline">Depths Measured</span>
                  <span className="text-sm font-bold text-secondary">10cm, 30cm, 60cm, 100cm</span>
                </div>
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <span className="text-xs font-semibold uppercase text-outline">Power System</span>
                  <span className="text-sm font-bold text-primary flex items-center gap-1">
                    <BatteryCharging className="w-4 h-4 text-secondary" /> LiFePO4 (5-Year Cycle)
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <span className="text-xs font-semibold uppercase text-outline">RF Protocol</span>
                  <span className="text-sm font-bold text-primary">LoRaWAN + Direct-to-Cell</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-outline-variant/30 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <span className="text-xs font-semibold uppercase text-outline">Chassis Material</span>
                  <span className="text-sm font-bold text-primary">Titanium Alloy (Grade 5)</span>
                </div>
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <span className="text-xs font-semibold uppercase text-outline">Ingress Protection</span>
                  <span className="text-sm font-bold text-secondary">IP68 Submersible</span>
                </div>
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <span className="text-xs font-semibold uppercase text-outline">Operating Temp</span>
                  <span className="text-sm font-bold text-primary flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-error" /> -40°C to +85°C
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <span className="text-xs font-semibold uppercase text-outline">Data Sampling Rate</span>
                  <span className="text-sm font-bold text-primary">Adaptive (5m to 60m)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-outline-variant/30">
              <p className="text-xs text-on-surface-variant font-mono">
                Document ID: SPEC-AETHER-2026-V4.2 | Certified ISO-9001
              </p>
              <button
                onClick={() => setIsSpecModalOpen(false)}
                className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-all cursor-pointer border-0"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL 2: LIVE DEMO REQUEST MODAL           */}
      {/* ========================================== */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-container-low border border-outline-variant/40 rounded-2xl max-w-lg w-full shadow-2xl p-8 text-left relative"
          >
            <button
              onClick={() => {
                setIsDemoModalOpen(false);
                setDemoSubmitted(false);
              }}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-primary p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border-0 bg-transparent"
            >
              <X className="w-6 h-6" />
            </button>

            {!demoSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold">
                    Direct Systems Engineer Access
                  </span>
                </div>
                <h3 className="font-headline text-3xl text-primary mb-3">
                  Request Live Platform Demo
                </h3>
                <p className="font-body text-body-md text-on-surface-variant mb-6">
                  Schedule an interactive 1-on-1 virtual walkthrough of our live sub-surface mesh and predictive AI modeling engine.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDemoSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-outline mb-1.5">
                      Full Name
                    </label>
                    <input
                      required
                      placeholder="Dr. Elena Vance"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-outline mb-1.5">
                      Enterprise Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="elena@agrisystems.io"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label uppercase font-bold text-outline mb-1.5">
                      Cultivation Area (Hectares / Acres)
                    </label>
                    <input
                      required
                      placeholder="e.g. 2,500 Hectares (Soybean & Corn)"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-secondary text-on-secondary py-4 rounded-lg font-label text-label-md font-bold uppercase tracking-widest hover:bg-secondary-fixed transition-all cursor-pointer border-0 shadow-lg mt-2 flex items-center justify-center gap-2"
                  >
                    <span>Confirm Live Session</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-headline text-2xl text-primary mb-2">
                  Demo Session Scheduled!
                </h4>
                <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                  An agronomic systems engineer has received your telemetry requirements. A live calendar invite has been sent to your email.
                </p>
                <button
                  onClick={() => {
                    setIsDemoModalOpen(false);
                    setDemoSubmitted(false);
                  }}
                  className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-all cursor-pointer border-0"
                >
                  Back to Platform
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
