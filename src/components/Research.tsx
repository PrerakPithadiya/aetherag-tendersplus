import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Cpu,
  Sprout,
  Dna,
  Droplets,
  Leaf,
  Wind,
  Radio,
  CheckCircle2,
  Database,
  Search,
  Download,
  BookOpen,
  Terminal,
  Copy,
  Check,
  Sliders,
  X,
  ShieldCheck,
  Zap,
  FlaskConical,
  Eye,
  RefreshCw,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type DatasetKey = "soil" | "atmospheric" | "par" | "microbiome";

interface Publication {
  id?: string;
  title: string;
  author: string;
  affiliation: string;
  metric: string;
  category: "nitrogen" | "transpiration" | "spectral" | "microbiome" | "general";
  doi?: string;
  year?: string;
  citations?: number;
  abstract?: string;
  keyFindings?: string[];
}

const fallbackPublications: Publication[] = [
  {
    title: "Synthetic Microbiology & Nitrogen Fixation in C4 Cultivars",
    author: "Dr. Elena Vos",
    affiliation: "Wageningen Ag Lab",
    metric: "Microbial Biomass",
    category: "microbiome",
    doi: "10.1016/j.agwat.2026.108422",
    year: "2026",
    citations: 84,
    abstract:
      "A 36-month field trial quantifying microbial biomass flux across variable soil horizons. Results show a 24.8% reduction in synthetic nitrogen reliance with zero yield compromise when real-time telemetry-driven dosing is applied.",
    keyFindings: [
      "+24.8% biological nitrogen fixation efficiency",
      "Fungal-to-bacterial ratio maintained at optimal 0.82",
      "Reduced N2O volatilization by 31.4%",
    ],
  },
  {
    title: "Predictive Vapor Pressure Deficit (VPD) & Stomatal Conductance",
    author: "Prof. Marcus Chen",
    affiliation: "UC Davis Plant Genomics",
    metric: "Transpiration Rate",
    category: "transpiration",
    doi: "10.1104/pp.26.00419",
    year: "2026",
    citations: 128,
    abstract:
      "Coupling sap-flow thermal telemetry with high-frequency micro-climatic sensors to model stomatal aperture thresholds under acute atmospheric heat waves, mitigating incipient crop wilt 48 hours prior to visual symptom onset.",
    keyFindings: [
      "Sub-50ms latency in wilt risk calculation",
      "Dynamic Penman-Monteith parameter correction",
      "Preserved 94.2% leaf turgidity under 42°C stress",
    ],
  },
  {
    title: "In-Situ Nitrification Dynamics in Semi-Arid Agricultural Horizons",
    author: "Dr. Sarah Thompson",
    affiliation: "AetherAg Precision Systems",
    metric: "NUE Flux Index",
    category: "nitrogen",
    doi: "10.1038/s41477-026-01588-3",
    year: "2025",
    citations: 215,
    abstract:
      "Deploying multi-depth dielectric impedance probe arrays to map real-time nitrate percolation and microbial mineralisation rates. Establishes empirical baseline for variable-rate fertigation algorithms.",
    keyFindings: [
      "98.4% model accuracy vs destructive laboratory soil cores",
      "Eliminated excess nitrate leaching into regional aquifers",
      "Estimated $48/ha reduction in fertilizer expenditure",
    ],
  },
  {
    title: "Hyperspectral Chlorosis Indexing via Sub-Orbital Telemetry",
    author: "Liam O'Connor",
    affiliation: "University of Sydney",
    metric: "Hyperspectral Index",
    category: "spectral",
    doi: "10.1016/j.rse.2025.114092",
    year: "2025",
    citations: 162,
    abstract:
      "Evaluating narrow-band reflectance signatures (680nm-740nm red-edge inflection) for pre-visual iron chlorosis and nitrogen deficiency detection across 45,000 hectares of commercial broadacre cropping.",
    keyFindings: [
      "Detected cellular chlorosis 9 days prior to RGB satellite imaging",
      "Red-edge position shift accuracy within 0.4nm",
      "Full API compatibility with automated drone sprayer swarms",
    ],
  },
  {
    title: "Diurnal Photosynthetic Light-Use Efficiency in Protected Cultivation",
    author: "Dr. Anya Kowalska",
    affiliation: "Max Planck Institute",
    metric: "PAR / Lux Ratio",
    category: "spectral",
    doi: "10.1111/pce.14810",
    year: "2026",
    citations: 96,
    abstract:
      "High-resolution quantum flux density telemetry analyzing photoprotective non-photochemical quenching (NPQ) dynamics in high-tunnel cultivars under fluctuating cloud covers.",
    keyFindings: [
      "Calibrated real-time light extinction coefficient k=0.68",
      "+14.6% photosynthetic quantum yield optimization",
      "Automated shade curtain trigger threshold <15ms",
    ],
  },
  {
    title: "Autonomous Sensor Fleet Mesh Protocols for Agronomic Monitoring",
    author: "K. R. Varma, Ph.D.",
    affiliation: "Indian Institute of Technology",
    metric: "Mesh Latency",
    category: "general",
    doi: "10.1109/JSEN.2026.3359124",
    year: "2026",
    citations: 74,
    abstract:
      "LoRaWAN mesh topology resilience across dense crop canopies with extreme signal attenuation. Evaluates battery longevity and sub-surface antenna radiation efficiency.",
    keyFindings: [
      "99.98% packet delivery ratio across 10km² grid",
      "Ultra-low power sleep states extending battery to 5+ years",
      "Adaptive frequency hopping mitigating rain fade",
    ],
  },
];

const datasets = {
  soil: {
    endpoint: "v2/telemetry/field_8829/soil_profile",
    request: `curl -X GET "https://api.aetherag.com/v2/telemetry/field_8829/soil_profile" \\\n  -H "Authorization: Bearer [AETHER_API_KEY]" \\\n  -H "Accept: application/json" \\\n  -d "depth=all&calibration=matrix-v4.2"`,
    response: {
      status: "success",
      meta: {
        latency_ms: 12.4,
        calibration: "matrix-v4.2",
        confidence: 0.992,
      },
      data: {
        field_id: "8829-SECTOR-04",
        timestamp: "2026-06-20T14:48:02.110Z",
        coordinate: { lat: -34.6037, lng: -58.3816 },
        sensors: [
          { id: "SN-01", depth: "10cm", val: 22.4, unit: "pct_vwc", temp_c: 21.2 },
          { id: "SN-02", depth: "30cm", val: 21.8, unit: "pct_vwc", temp_c: 19.8 },
          { id: "SN-03", depth: "60cm", val: 19.5, unit: "pct_vwc", temp_c: 18.4 },
        ],
        aggregate_soil_moisture_vwc: 21.23,
        salinity_ec_ds_m: 0.42,
        organic_matter_estimated_pct: 3.84,
      },
    },
  },
  atmospheric: {
    endpoint: "v2/telemetry/field_8829/atmospheric_stress",
    request: `curl -X GET "https://api.aetherag.com/v2/telemetry/field_8829/atmospheric_stress" \\\n  -H "Authorization: Bearer [AETHER_API_KEY]" \\\n  -H "Accept: application/json" \\\n  -d "window=15m&metric=vapor_pressure_deficit"`,
    response: {
      status: "success",
      meta: {
        latency_ms: 9.8,
        calibration: "matrix-v4.2",
        confidence: 0.988,
      },
      data: {
        field_id: "8829-SECTOR-04",
        timestamp: "2026-06-20T14:48:02.110Z",
        metrics: {
          vapor_pressure_deficit_kpa: 1.45,
          ambient_temperature_c: 28.2,
          relative_humidity_pct: 55.4,
          canopy_temperature_c: 29.5,
          delta_t_c: 1.3,
          dew_point_c: 18.2,
        },
        wilt_risk: "low",
        transpiration_conductance_mmol_m2_s: 420.0,
      },
    },
  },
  par: {
    endpoint: "v2/telemetry/field_8829/photosynthetic_radiation",
    request: `curl -X GET "https://api.aetherag.com/v2/telemetry/field_8829/photosynthetic_radiation" \\\n  -H "Authorization: Bearer [AETHER_API_KEY]" \\\n  -H "Accept: application/json" \\\n  -d "spectral_bands=400_700nm"`,
    response: {
      status: "success",
      meta: {
        latency_ms: 14.1,
        calibration: "matrix-v4.2",
        confidence: 0.995,
      },
      data: {
        field_id: "8829-SECTOR-04",
        timestamp: "2026-06-20T14:48:02.110Z",
        reading: {
          par_umol_m2_s: 1250,
          lux: 68000,
          cloud_cover_pct: 12.0,
          solar_zenith_deg: 32.4,
        },
        photosynthetic_efficiency_ratio: 0.84,
        dli_mol_m2_day: 38.6,
      },
    },
  },
  microbiome: {
    endpoint: "v2/telemetry/field_8829/microbiome_dynamics",
    request: `curl -X GET "https://api.aetherag.com/v2/telemetry/field_8829/microbiome_dynamics" \\\n  -H "Authorization: Bearer [AETHER_API_KEY]" \\\n  -H "Accept: application/json" \\\n  -d "horizon=topsoil_0_15cm"`,
    response: {
      status: "success",
      meta: {
        latency_ms: 18.2,
        calibration: "matrix-v4.2",
        confidence: 0.979,
      },
      data: {
        field_id: "8829-SECTOR-04",
        timestamp: "2026-06-20T14:48:02.110Z",
        fungal_to_bacterial_ratio: 0.82,
        mineralization_rate_mg_kg_day: 4.8,
        active_microbial_biomass_ug_g: 420.5,
        respiration_rate_co2_ug_g_hr: 1.28,
        health_status: "optimal_regenerative",
      },
    },
  },
};

export default function Research() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const hudBadgeRef = useRef<HTMLDivElement>(null);

  // Counter refs for GSAP rollup
  const confidenceCounterRef = useRef<HTMLSpanElement>(null);
  const latencyCounterRef = useRef<HTMLSpanElement>(null);
  const spectraCounterRef = useRef<HTMLSpanElement>(null);
  const citationsCounterRef = useRef<HTMLSpanElement>(null);

  // Hero interactive hotspot state ('hotspot1' | 'hotspot2' | 'hotspot3' | null)
  const [activeHotspot, setActiveHotspot] = useState<"hotspot1" | "hotspot2" | "hotspot3" | null>(null);
  const activeHotspotRef = useRef(activeHotspot);

  useEffect(() => {
    activeHotspotRef.current = activeHotspot;
    if (activeHotspot && heroCardRef.current) {
      gsap.to(heroCardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [activeHotspot]);

  // Hyperspectral Waveband Analyzer State
  const [wavelength, setWavelength] = useState<number>(680);
  const [activePreset, setActivePreset] = useState<"NDVI" | "NDRE" | "PRI" | "NDWI">("NDVI");

  // Core Agronomic Models Interactive States
  const [nueDepth, setNueDepth] = useState<"10cm" | "30cm" | "60cm">("30cm");
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false);

  // Publications State & Modal
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [publications, setPublications] = useState<Publication[]>(fallbackPublications);
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [isPaperModalOpen, setIsPaperModalOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [citationCopied, setCitationCopied] = useState(false);

  // API Sandbox State
  const [selectedDatasetKey, setSelectedDatasetKey] = useState<DatasetKey>("soil");
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [isRequestRunning, setIsRequestRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [paramRawResolution, setParamRawResolution] = useState(false);
  const [paramCalibrated, setParamCalibrated] = useState(true);
  const [displayedResponse, setDisplayedResponse] = useState<string>(
    JSON.stringify(datasets.soil.response, null, 2)
  );

  // Continuous micro telemetry ticker
  const [liveTelemetryPing, setLiveTelemetryPing] = useState<number>(12.4);

  // Dynamic Page Title and SEO
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "AetherAg R&D | Precision Biomorphic Agronomy & Telemetry API";

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : null;
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AetherAg Research & Biomorphic R&D portal. Access real-time agronomic telemetry APIs, hyperspectral reflection models, and peer-reviewed whitepapers."
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) {
        metaDesc.setAttribute("content", prevDesc);
      }
    };
  }, []);

  // Fetch publications from Supabase with fallback
  useEffect(() => {
    async function fetchPublications() {
      try {
        const { data, error } = await supabase
          .from("publications")
          .select("title, author, affiliation, metric, category, doi, year, citations, abstract, key_findings");
        if (error) throw error;
        if (data && data.length > 0) {
          const formatted: Publication[] = data.map((item) => ({
            title: item.title,
            author: item.author,
            affiliation: item.affiliation,
            metric: item.metric,
            category: item.category || "general",
            doi: item.doi || "10.1016/j.aether.2026.1042",
            year: item.year || "2026",
            citations: item.citations || Math.floor(Math.random() * 150 + 50),
            abstract: item.abstract || fallbackPublications[0].abstract,
            keyFindings: item.key_findings || fallbackPublications[0].keyFindings,
          }));
          setPublications(formatted);
        }
      } catch (err) {
        console.warn("Supabase fetch fallback to local publications database:", err);
      }
    }
    fetchPublications();
  }, []);

  // Live WebSocket Telemetry Simulation Engine
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const baseData = JSON.parse(JSON.stringify(datasets[selectedDatasetKey].response));
      baseData.data.timestamp = new Date().toISOString();
      const currentPing = parseFloat((10 + Math.random() * 5).toFixed(1));
      setLiveTelemetryPing(currentPing);
      baseData.meta.latency_ms = currentPing;

      if (selectedDatasetKey === "soil") {
        baseData.data.sensors = baseData.data.sensors.map((s: { id: string; depth: string; val: number; temp_c: number }) => ({
          ...s,
          val: parseFloat((s.val + (Math.random() * 0.4 - 0.2)).toFixed(1)),
          temp_c: parseFloat((s.temp_c + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        }));
        baseData.data.aggregate_soil_moisture_vwc = parseFloat(
          (baseData.data.aggregate_soil_moisture_vwc + (Math.random() * 0.2 - 0.1)).toFixed(2)
        );
      } else if (selectedDatasetKey === "atmospheric") {
        baseData.data.metrics.vapor_pressure_deficit_kpa = parseFloat(
          (baseData.data.metrics.vapor_pressure_deficit_kpa + (Math.random() * 0.08 - 0.04)).toFixed(2)
        );
        baseData.data.metrics.ambient_temperature_c = parseFloat(
          (baseData.data.metrics.ambient_temperature_c + (Math.random() * 0.4 - 0.2)).toFixed(1)
        );
        baseData.data.metrics.relative_humidity_pct = parseFloat(
          (baseData.data.metrics.relative_humidity_pct + (Math.random() * 1.5 - 0.75)).toFixed(1)
        );
      } else if (selectedDatasetKey === "par") {
        baseData.data.reading.par_umol_m2_s = Math.round(
          baseData.data.reading.par_umol_m2_s + (Math.random() * 30 - 15)
        );
        baseData.data.reading.lux = Math.round(baseData.data.reading.lux + (Math.random() * 800 - 400));
      } else if (selectedDatasetKey === "microbiome") {
        baseData.data.fungal_to_bacterial_ratio = parseFloat(
          (baseData.data.fungal_to_bacterial_ratio + (Math.random() * 0.02 - 0.01)).toFixed(2)
        );
        baseData.data.mineralization_rate_mg_kg_day = parseFloat(
          (baseData.data.mineralization_rate_mg_kg_day + (Math.random() * 0.2 - 0.1)).toFixed(1)
        );
      }

      setDisplayedResponse(JSON.stringify(baseData, null, 2));
    }, 1800);

    return () => clearInterval(interval);
  }, [isLiveStreaming, selectedDatasetKey]);

  // Main GSAP Animations and ScrollTriggers
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || !containerRef.current) return;

      const q = gsap.utils.selector(containerRef);

      // ========================================================
      // 1. HERO SECTION KINETIC REVEAL & 3D PARALLAX
      // ========================================================
      const heroBadge = q(".research-hero-badge");
      const heroWords = q(".research-hero-word");
      const heroDesc = q(".research-hero-desc");
      const heroCtas = q(".research-hero-cta");
      const heroMedia = heroCardRef.current;
      const heroHotspots = q(".biomorphic-hotspot");

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroBadge.length) gsap.set(heroBadge, { y: -25, opacity: 0, scale: 0.85 });
      if (heroWords.length) gsap.set(heroWords, { y: 45, opacity: 0, rotateX: -35, transformOrigin: "50% 100%" });
      if (heroDesc.length) gsap.set(heroDesc, { y: 30, opacity: 0 });
      if (heroCtas.length) gsap.set(heroCtas, { y: 25, opacity: 0, scale: 0.96 });
      if (heroMedia) gsap.set(heroMedia, { scale: 0.92, opacity: 0, y: 40, rotateX: 6, rotateY: -6 });
      if (heroHotspots.length) gsap.set(heroHotspots, { scale: 0, opacity: 0 });

      heroTl
        .to(heroBadge, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.8)" }, 0.1)
        .to(heroWords, { y: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.05 }, 0.2)
        .to(heroDesc, { y: 0, opacity: 1, duration: 0.75 }, 0.45)
        .to(heroCtas, { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.1 }, 0.6)
        .to(heroMedia, { y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.1, ease: "power3.out" }, 0.3)
        .to(heroHotspots, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: "back.out(2)" }, 0.8);

      // 3D Magnetic Interactive Mouse Tilt (Smoothly locks when interacting with hotspots)
      const handleHeroMouseMove = (e: MouseEvent) => {
        if (!heroMedia || activeHotspotRef.current !== null) return;
        const rect = heroMedia.getBoundingClientRect();
        const cardX = e.clientX - rect.left - rect.width / 2;
        const cardY = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(cardY / (rect.height / 2)) * 4;
        const rotateY = (cardX / (rect.width / 2)) * 4;

        gsap.to(heroMedia, {
          rotateX,
          rotateY,
          duration: 0.4,
          ease: "power1.out",
          overwrite: "auto",
        });
      };

      const handleHeroMouseLeave = () => {
        if (!heroMedia) return;
        gsap.to(heroMedia, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const heroContainerEl = document.getElementById("research-hero-section");
      if (heroContainerEl) {
        heroContainerEl.addEventListener("mousemove", handleHeroMouseMove);
        heroContainerEl.addEventListener("mouseleave", handleHeroMouseLeave);
      }

      // ========================================================
      // 2. LIVE METRICS COUNTERS SCROLLTRIGGER
      // ========================================================
      const statsBar = q(".research-stats-bar");
      const statItems = q(".research-stat-item");

      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#research-stats-ribbon",
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      gsap.set(statsBar, { y: 35, opacity: 0 });
      gsap.set(statItems, { y: 20, opacity: 0 });

      statsTl
        .to(statsBar, { y: 0, opacity: 1, duration: 0.8 })
        .to(statItems, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, "-=0.4");

      // Number rollups
      const c1 = confidenceCounterRef.current;
      const c2 = latencyCounterRef.current;
      const c3 = spectraCounterRef.current;
      const c4 = citationsCounterRef.current;

      if (c1) {
        const obj1 = { val: 0 };
        statsTl.to(
          obj1,
          {
            val: 99.2,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              if (c1) c1.textContent = `${obj1.val.toFixed(1)}%`;
            },
          },
          "-=0.6"
        );
      }
      if (c2) {
        const obj2 = { val: 0 };
        statsTl.to(
          obj2,
          {
            val: 12,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              if (c2) c2.textContent = `< ${Math.round(obj2.val)}ms`;
            },
          },
          "-=1.1"
        );
      }
      if (c3) {
        const obj3 = { val: 0 };
        statsTl.to(
          obj3,
          {
            val: 4.2,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              if (c3) c3.textContent = `${obj3.val.toFixed(1)}M+`;
            },
          },
          "-=1.1"
        );
      }
      if (c4) {
        const obj4 = { val: 0 };
        statsTl.to(
          obj4,
          {
            val: 1420,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              if (c4) c4.textContent = `${Math.round(obj4.val).toLocaleString()}+`;
            },
          },
          "-=1.2"
        );
      }

      // ========================================================
      // 3. HYPERSPECTRAL ANALYZER ENTRANCE & WAVEFORM
      // ========================================================
      const analyzerHeader = q(".analyzer-header");
      const analyzerPanel = q(".analyzer-panel");
      const analyzerVisual = q(".analyzer-visual");

      gsap.set(analyzerHeader, { y: 30, opacity: 0 });
      gsap.set(analyzerPanel, { x: -30, opacity: 0 });
      gsap.set(analyzerVisual, { x: 30, opacity: 0, scale: 0.98 });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#hyperspectral-analyzer-section",
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })
        .to(analyzerHeader, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 })
        .to(analyzerPanel, { x: 0, opacity: 1, duration: 0.8 }, "-=0.35")
        .to(analyzerVisual, { x: 0, opacity: 1, scale: 1, duration: 0.85 }, "-=0.5");

      // ========================================================
      // 4. CORE AGRONOMIC MODELS BENTO CARDS & SPOTLIGHT
      // ========================================================
      const bentoHeader = q(".bento-header");
      const bentoCards = q(".research-bento-card");

      gsap.set(bentoHeader, { y: 30, opacity: 0 });
      gsap.set(bentoCards, { y: 45, opacity: 0, scale: 0.96 });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#core-agronomic-models",
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })
        .to(bentoHeader, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 })
        .to(bentoCards, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12 }, "-=0.35");

      // Spotlight Glare Physics on Bento Cards
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
            spotlight.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(59, 105, 52, 0.12), transparent 75%)`;
          }
        };

        const handleCardEnter = () => {
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
          if (spotlight) spotlight.style.opacity = "0";
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseenter", handleCardEnter);
        card.addEventListener("mouseleave", handleCardLeave);
        cardCleanups.push(() => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseenter", handleCardEnter);
          card.removeEventListener("mouseleave", handleCardLeave);
        });
      });

      // Animated Sine Waves inside Model Cards
      const nueWave = q(".nue-wave-path")[0];
      const transpirationWave = q(".transpiration-sine-path")[0];
      if (nueWave) {
        gsap.to(nueWave, {
          x: -120,
          duration: 4,
          repeat: -1,
          ease: "none",
        });
      }
      if (transpirationWave) {
        gsap.to(transpirationWave, {
          x: -160,
          duration: 3.2,
          repeat: -1,
          ease: "none",
        });
      }

      // ========================================================
      // 5. PUBLICATIONS STUDIO ENTRANCE
      // ========================================================
      const pubHeader = q(".pub-header");
      const pubControls = q(".pub-controls");
      const pubTable = q(".pub-table-container");

      gsap.set(pubHeader, { y: 30, opacity: 0 });
      gsap.set(pubControls, { y: 20, opacity: 0 });
      gsap.set(pubTable, { y: 35, opacity: 0, scale: 0.98 });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#publications-database",
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })
        .to(pubHeader, { y: 0, opacity: 1, duration: 0.7 })
        .to(pubControls, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
        .to(pubTable, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, "-=0.35");

      // ========================================================
      // 6. DEVELOPER API SANDBOX ENTRANCE
      // ========================================================
      const apiHeader = q(".api-header");
      const apiControls = q(".api-controls");
      const apiTerminal = q(".api-terminal-card");

      gsap.set(apiHeader, { y: 30, opacity: 0 });
      gsap.set(apiControls, { y: 30, opacity: 0 });
      gsap.set(apiTerminal, { x: 35, opacity: 0, scale: 0.96 });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#developer-api-sandbox",
          start: "top 70%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      })
        .to(apiHeader, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 })
        .to(apiControls, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3")
        .to(apiTerminal, { x: 0, opacity: 1, scale: 1, duration: 0.85 }, "-=0.45");

      return () => {
        if (heroContainerEl) {
          heroContainerEl.removeEventListener("mousemove", handleHeroMouseMove);
          heroContainerEl.removeEventListener("mouseleave", handleHeroMouseLeave);
        }
        cardCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: containerRef }
  );

  // Interactive Hyperspectral Preset Selection Handler
  const handlePresetSelect = (preset: "NDVI" | "NDRE" | "PRI" | "NDWI") => {
    setActivePreset(preset);
    let targetWavelength = 680;
    if (preset === "NDVI") targetWavelength = 670;
    else if (preset === "NDRE") targetWavelength = 715;
    else if (preset === "PRI") targetWavelength = 531;
    else if (preset === "NDWI") targetWavelength = 860;

    setWavelength(targetWavelength);

    // Subtle GSAP flash on the curve
    gsap.fromTo(
      ".spectral-glow-path",
      { strokeOpacity: 1, strokeWidth: 4 },
      { strokeOpacity: 0.4, strokeWidth: 2, duration: 0.8, ease: "power2.out" }
    );
  };

  // Filtered publications list
  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.metric.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || pub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Simulated PDF Download with GSAP progress
  const triggerDownload = (paper: Publication) => {
    setDownloadingId(paper.title);
    setDownloadProgress(0);

    const progObj = { val: 0 };
    gsap.to(progObj, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        setDownloadProgress(Math.round(progObj.val));
      },
      onComplete: () => {
        setTimeout(() => {
          setDownloadingId(null);
          setDownloadProgress(0);
        }, 1200);
      },
    });
  };

  // One-click Citation Copy
  const copyCitation = (paper: Publication) => {
    const bibtex = `@article{${paper.author.split(" ").pop()?.toLowerCase() || "aetherag"}2026,\n  title={${paper.title}},\n  author={${paper.author}},\n  journal={AetherAg Biomorphic Letters},\n  year={${paper.year || "2026"}},\n  doi={${paper.doi || "10.1016/j.aether.2026.1042"}}\n}`;
    navigator.clipboard.writeText(bibtex);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2000);
  };

  // API Sandbox Dataset Change
  const handleDatasetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as DatasetKey;
    setSelectedDatasetKey(value);
    setDisplayedResponse(JSON.stringify(datasets[value].response, null, 2));
  };

  // Manual Test Request Trigger
  const runTestRequest = () => {
    setIsRequestRunning(true);

    const baseData = JSON.parse(JSON.stringify(datasets[selectedDatasetKey].response));
    baseData.data.timestamp = new Date().toISOString();
    const currentPing = parseFloat((9 + Math.random() * 5).toFixed(1));
    setLiveTelemetryPing(currentPing);
    baseData.meta.latency_ms = currentPing;

    if (paramRawResolution) {
      baseData.meta.resolution = "RAW_UNFILTERED_SAMPLES";
    }

    setTimeout(() => {
      setDisplayedResponse(JSON.stringify(baseData, null, 2));
      setIsRequestRunning(false);
    }, 600);
  };

  const copyApiCode = () => {
    let req = datasets[selectedDatasetKey].request;
    if (paramRawResolution) req += ` \\\n  -d "resolution=raw"`;
    navigator.clipboard.writeText(req);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Compute dynamic spectral curve coordinate from active wavelength
  // 400nm -> 850nm maps to x: 0 -> 400
  const normalizedWavelengthX = ((wavelength - 400) / (850 - 400)) * 400;

  return (
    <div
      ref={containerRef}
      className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden relative"
    >
      {/* ======================================================== */}
      {/* SECTION 1: HERO — KINETIC R&D COMMAND & 3D MEDIA LENS    */}
      {/* ======================================================== */}
      <section
        id="research-hero-section"
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface-container-low py-16 md:py-24"
      >
        <div className="max-w-container-max mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          {/* Left Column: Kinetic Typography & Actions */}
          <div className="lg:col-span-6 text-left space-y-8">
            <div className="research-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-label uppercase tracking-widest border border-secondary/20 shadow-sm">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              Biomorphic R&amp;D Telemetry Core
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] text-primary tracking-tight flex flex-wrap gap-x-3 gap-y-1">
              {"Agronomic".split(" ").map((w, i) => (
                <span key={`w1-${i}`} className="research-hero-word inline-block">
                  {w}
                </span>
              ))}
              {"Science,".split(" ").map((w, i) => (
                <span key={`w2-${i}`} className="research-hero-word inline-block italic font-serif text-secondary underline decoration-secondary/30 decoration-wavy">
                  {w}
                </span>
              ))}
              <br className="hidden md:inline" />
              {"Calculated in Real-Time.".split(" ").map((w, i) => (
                <span key={`w3-${i}`} className="research-hero-word inline-block">
                  {w}
                </span>
              ))}
            </h1>

            <p className="research-hero-desc text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Precision biomorphic modeling at the intersection of genetic potential and environmental reality. We deploy high-frequency sensor arrays to map the unseen physiological pulse of the field.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("developer-api-sandbox");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="research-hero-cta bg-primary text-on-primary px-8 py-4 rounded-xl font-label text-label-md font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-xl shadow-primary/10 cursor-pointer border-0 flex items-center gap-2 group"
              >
                <span>Explore API Reference</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("publications-database");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="research-hero-cta border border-outline px-8 py-4 rounded-xl font-label text-label-md font-bold uppercase tracking-widest hover:bg-surface-container transition-all cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Whitepaper Index</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Interactive Media Lens with Laser Scan & Hotspots */}
          <div className="lg:col-span-6 relative w-full perspective-1000">
            <div
              ref={heroCardRef}
              className="relative aspect-[4/3] rounded-3xl shadow-2xl border border-outline-variant/60 bg-surface preserve-3d will-change-transform group overflow-visible"
            >
              {/* Clipped Media Layer */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <img
                  alt="Soybean leaf macro detailing vascular structures"
                  className="w-full h-full object-cover grayscale-[0.08] transition-transform duration-700 select-none"
                  src="/research-image.png"
                />

                {/* Top gradient shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20"></div>
              </div>

              {/* Hotspot 1: Chlorophyll Fluorescence (Top Left: 28% top, 32% left) */}
              <div
                className="biomorphic-hotspot absolute top-[28%] left-[32%] z-40 cursor-pointer p-4 -m-4"
                onMouseEnter={() => setActiveHotspot("hotspot1")}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(activeHotspot === "hotspot1" ? null : "hotspot1")}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white bg-secondary flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeHotspot === "hotspot1" ? "scale-125 ring-8 ring-secondary/40" : "hover:scale-125 ring-4 ring-secondary/30"
                  }`}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Popover */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 z-50 pointer-events-auto ${
                    activeHotspot === "hotspot1"
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-surface-container-highest/95 backdrop-blur-xl border border-secondary/40 p-3.5 rounded-xl shadow-2xl text-left min-w-[220px] relative">
                    <div className="font-headline font-semibold text-secondary text-xs mb-1 flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-secondary" />
                      Chlorophyll Fluorescence
                    </div>
                    <div className="font-mono text-xs font-bold text-primary">Fv/Fm: 0.842 (Optimal)</div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">PSII photochemical quantum yield</div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-surface-container-highest"></div>
                  </div>
                </div>
              </div>

              {/* Hotspot 2: Stomatal Aperture (Middle Right: 52% top, 68% left) */}
              <div
                className="biomorphic-hotspot absolute top-[52%] left-[68%] z-40 cursor-pointer p-4 -m-4"
                onMouseEnter={() => setActiveHotspot("hotspot2")}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(activeHotspot === "hotspot2" ? null : "hotspot2")}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white bg-secondary flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeHotspot === "hotspot2" ? "scale-125 ring-8 ring-secondary/40" : "hover:scale-125 ring-4 ring-secondary/30"
                  }`}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Popover */}
                <div
                  className={`absolute right-full top-1/2 -translate-y-1/2 pr-3 transition-all duration-300 z-50 pointer-events-auto ${
                    activeHotspot === "hotspot2"
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-95 translate-x-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-surface-container-highest/95 backdrop-blur-xl border border-secondary/40 p-3.5 rounded-xl shadow-2xl text-left min-w-[220px] relative">
                    <div className="font-headline font-semibold text-secondary text-xs mb-1 flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-secondary" />
                      Stomatal Transpiration
                    </div>
                    <div className="font-mono text-xs font-bold text-primary">420 mmol/m²·s</div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">VPD Buffer: Nominal (1.45 kPa)</div>
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-surface-container-highest"></div>
                  </div>
                </div>
              </div>

              {/* Hotspot 3: Phloem Sap Velocity (Bottom: 74% top, 38% left) */}
              <div
                className="biomorphic-hotspot absolute top-[74%] left-[38%] z-40 cursor-pointer p-4 -m-4"
                onMouseEnter={() => setActiveHotspot("hotspot3")}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(activeHotspot === "hotspot3" ? null : "hotspot3")}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white bg-secondary flex items-center justify-center shadow-lg transition-all duration-300 ${
                    activeHotspot === "hotspot3" ? "scale-125 ring-8 ring-secondary/40" : "hover:scale-125 ring-4 ring-secondary/30"
                  }`}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Popover */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 pb-3 transition-all duration-300 z-50 pointer-events-auto ${
                    activeHotspot === "hotspot3"
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-surface-container-highest/95 backdrop-blur-xl border border-secondary/40 p-3.5 rounded-xl shadow-2xl text-left min-w-[220px] relative">
                    <div className="font-headline font-semibold text-secondary text-xs mb-1 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-secondary" />
                      Vascular Sap Velocity
                    </div>
                    <div className="font-mono text-xs font-bold text-primary">18.4 cm/hour</div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">Xylem tension -0.38 MPa</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-surface-container-highest"></div>
                  </div>
                </div>
              </div>

              {/* Floating Harmonic HUD Telemetry Badge */}
              <div
                ref={hudBadgeRef}
                className="absolute top-4 right-4 z-30 bg-surface-container-highest/90 backdrop-blur-xl text-on-surface p-4 rounded-2xl text-xs font-mono border border-outline-variant/60 shadow-2xl select-none"
              >
                <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-outline-variant/30">
                  <span className="flex items-center gap-1.5 text-secondary font-bold text-[11px] uppercase tracking-wider">
                    <Radio className="w-3.5 h-3.5 text-secondary animate-pulse" />
                    Biomorphic Stream
                  </span>
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                </div>
                <div className="space-y-1 text-[11px] text-on-surface-variant">
                  <div className="flex justify-between gap-4">
                    <span>SPECTRAL_NDVI:</span>
                    <strong className="text-primary font-bold">0.86</strong>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>CELL_TURGOR:</span>
                    <strong className="text-secondary font-bold">89.4%</strong>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>MESH_LATENCY:</span>
                    <strong className="text-primary font-bold">{liveTelemetryPing}ms</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary/15 blur-[90px] rounded-full pointer-events-none -z-10"></div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: LIVE METRIC COUNTERS STATS RIBBON            */}
      {/* ======================================================== */}
      <section id="research-stats-ribbon" className="py-12 bg-surface border-y border-outline-variant/40">
        <div className="max-w-container-max mx-auto px-6 md:px-12">
          <div className="research-stats-bar grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
            <div className="research-stat-item p-4 border-l-2 border-secondary/40 pl-6">
              <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant block mb-1">
                Model Confidence
              </span>
              <div className="font-headline text-3xl md:text-4xl font-bold text-primary flex items-baseline gap-1">
                <span ref={confidenceCounterRef}>0%</span>
              </div>
              <p className="text-[11px] text-secondary font-medium mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> Ground-truth verified
              </p>
            </div>

            <div className="research-stat-item p-4 border-l-2 border-secondary/40 pl-6">
              <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant block mb-1">
                Ingestion Latency
              </span>
              <div className="font-headline text-3xl md:text-4xl font-bold text-primary flex items-baseline gap-1">
                <span ref={latencyCounterRef}>0ms</span>
              </div>
              <p className="text-[11px] text-secondary font-medium mt-1 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-secondary" /> Real-time telemetry edge
              </p>
            </div>

            <div className="research-stat-item p-4 border-l-2 border-secondary/40 pl-6">
              <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant block mb-1">
                In-Situ Spectra
              </span>
              <div className="font-headline text-3xl md:text-4xl font-bold text-primary flex items-baseline gap-1">
                <span ref={spectraCounterRef}>0M+</span>
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium mt-1">Calibrated data points</p>
            </div>

            <div className="research-stat-item p-4 border-l-2 border-secondary/40 pl-6">
              <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant block mb-1">
                Whitepaper Citations
              </span>
              <div className="font-headline text-3xl md:text-4xl font-bold text-primary flex items-baseline gap-1">
                <span ref={citationsCounterRef}>0+</span>
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium mt-1">Peer-reviewed global index</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: HYPERSPECTRAL WAVEBAND ANALYZER STUDIO       */}
      {/* ======================================================== */}
      <section
        id="hyperspectral-analyzer-section"
        className="py-24 bg-surface-container-low border-b border-outline-variant/40 relative overflow-hidden"
      >
        <div className="max-w-container-max mx-auto px-6 md:px-12 relative z-10">
          <div className="analyzer-header flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 text-left">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-label uppercase tracking-widest border border-secondary/20 shadow-sm mb-3">
                <Sliders className="w-3.5 h-3.5 text-secondary animate-pulse" />
                Electromagnetic Reflectance Studio
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Hyperspectral Waveband Analyzer
              </h2>
            </div>
            <p className="text-on-surface-variant text-body-md max-w-md">
              Scrub across the photosynthetic radiation spectrum to analyze narrow-band cellular reflectance and vegetation indices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Controls Panel (Left) */}
            <div className="analyzer-panel lg:col-span-5 bg-surface p-8 rounded-3xl border border-outline-variant shadow-sm space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-label text-label-md uppercase tracking-wider text-on-surface-variant font-bold">
                    Target Wavelength:
                  </label>
                  <span className="font-mono text-xl font-bold text-primary px-3 py-1 bg-surface-container rounded-lg border border-outline-variant/40">
                    {wavelength} nm
                  </span>
                </div>

                <input
                  type="range"
                  min="400"
                  max="850"
                  step="5"
                  value={wavelength}
                  onChange={(e) => {
                    setWavelength(parseInt(e.target.value));
                    setActivePreset("NDVI");
                  }}
                  className="w-full cursor-pointer h-2 bg-surface-container-high rounded-lg accent-secondary"
                />

                <div className="flex justify-between text-[10px] font-mono text-outline mt-2 uppercase tracking-widest">
                  <span>400nm (Blue)</span>
                  <span>550nm (Green)</span>
                  <span>680nm (Red)</span>
                  <span>750nm (Red Edge)</span>
                  <span>850nm (NIR)</span>
                </div>
              </div>

              {/* Preset Index Quick Selector */}
              <div>
                <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-bold block mb-3">
                  Key Agronomic Spectral Indices
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handlePresetSelect("NDVI")}
                    className={`p-3 rounded-xl border text-xs font-label text-left transition-all cursor-pointer ${
                      activePreset === "NDVI"
                        ? "bg-secondary text-on-secondary border-secondary font-bold shadow-md"
                        : "bg-surface-container-low border-outline-variant/50 hover:border-secondary"
                    }`}
                  >
                    <div className="font-bold mb-0.5">NDVI (670 / 800nm)</div>
                    <div className="text-[10px] opacity-80">Canopy Biomass &amp; Vigor</div>
                  </button>

                  <button
                    onClick={() => handlePresetSelect("NDRE")}
                    className={`p-3 rounded-xl border text-xs font-label text-left transition-all cursor-pointer ${
                      activePreset === "NDRE"
                        ? "bg-secondary text-on-secondary border-secondary font-bold shadow-md"
                        : "bg-surface-container-low border-outline-variant/50 hover:border-secondary"
                    }`}
                  >
                    <div className="font-bold mb-0.5">NDRE (715 / 750nm)</div>
                    <div className="text-[10px] opacity-80">Chlorophyll Red-Edge</div>
                  </button>

                  <button
                    onClick={() => handlePresetSelect("PRI")}
                    className={`p-3 rounded-xl border text-xs font-label text-left transition-all cursor-pointer ${
                      activePreset === "PRI"
                        ? "bg-secondary text-on-secondary border-secondary font-bold shadow-md"
                        : "bg-surface-container-low border-outline-variant/50 hover:border-secondary"
                    }`}
                  >
                    <div className="font-bold mb-0.5">PRI (531 / 570nm)</div>
                    <div className="text-[10px] opacity-80">Photosynthetic LUE</div>
                  </button>

                  <button
                    onClick={() => handlePresetSelect("NDWI")}
                    className={`p-3 rounded-xl border text-xs font-label text-left transition-all cursor-pointer ${
                      activePreset === "NDWI"
                        ? "bg-secondary text-on-secondary border-secondary font-bold shadow-md"
                        : "bg-surface-container-low border-outline-variant/50 hover:border-secondary"
                    }`}
                  >
                    <div className="font-bold mb-0.5">NDWI (860 / 1240nm)</div>
                    <div className="text-[10px] opacity-80">Canopy Water Stress</div>
                  </button>
                </div>
              </div>

              {/* Spectral Diagnosis Readout */}
              <div className="bg-surface-container-high p-4 rounded-2xl border border-outline-variant/40 text-xs font-body space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-secondary flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Physiological Sensitivity
                  </span>
                  <span className="font-mono font-bold text-primary">
                    {wavelength < 500
                      ? "Carotenoid Absorption"
                      : wavelength < 600
                      ? "Green Reflection Peak"
                      : wavelength < 700
                      ? "Chlorophyll-a Maxima"
                      : wavelength < 780
                      ? "Red-Edge Transition"
                      : "Cellular Mesophyll Scattering"}
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {wavelength < 700
                    ? "Strong photon absorption by leaf photosynthetic pigments converting visible radiation into biochemical ATP/NADPH."
                    : "Near-infrared reflectance governed by spongy mesophyll internal structure; high turgor yields maximum NIR scattering."}
                </p>
              </div>
            </div>

            {/* Dynamic Reflectance Curve SVG Visualizer (Right) */}
            <div className="analyzer-visual lg:col-span-7 bg-primary text-white p-8 rounded-3xl shadow-2xl border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between aspect-[16/10]">
              <div className="flex justify-between items-center mb-4 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                  <span className="font-mono text-xs text-primary-fixed-dim uppercase tracking-widest">
                    Spectroscopy Simulator: 400nm — 850nm
                  </span>
                </div>
                <span className="font-mono text-xs bg-white/10 px-2.5 py-1 rounded border border-white/10 text-secondary-fixed">
                  Reflectance: {Math.round(15 + Math.abs(Math.sin((wavelength - 400) / 100)) * 65)}%
                </span>
              </div>

              {/* Interactive SVG Curve Canvas */}
              <div className="relative w-full flex-grow my-2">
                <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                  {/* Shaded Area Under Curve */}
                  <path
                    d="M0,140 Q60,145 120,120 T240,140 T300,50 T400,30 L400,160 L0,160 Z"
                    fill="url(#spectralGrad)"
                    opacity="0.25"
                  />

                  {/* Spectral Signature Curve */}
                  <path
                    d="M0,140 Q60,145 120,120 T240,140 T300,50 T400,30"
                    fill="none"
                    stroke="#b9eeab"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="spectral-glow-path"
                  />

                  {/* Active Scrubber Marker Indicator */}
                  <line
                    x1={normalizedWavelengthX}
                    y1="10"
                    x2={normalizedWavelengthX}
                    y2="155"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <circle
                    cx={normalizedWavelengthX}
                    cy={140 - Math.min(110, Math.max(10, ((wavelength - 400) / 450) * 110))}
                    r="5"
                    fill="#3b6934"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />

                  <defs>
                    <linearGradient id="spectralGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#b9eeab" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b6934" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center font-mono text-xs z-10">
                <div>
                  <span className="text-[10px] text-primary-fixed-dim block uppercase">Absorption Index</span>
                  <strong className="text-white font-bold">{((850 - wavelength) / 500).toFixed(2)}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-primary-fixed-dim block uppercase">Quantum Yield</span>
                  <strong className="text-secondary-fixed font-bold">0.84 mol/mol</strong>
                </div>
                <div>
                  <span className="text-[10px] text-primary-fixed-dim block uppercase">Spectral Band</span>
                  <strong className="text-white font-bold">{wavelength < 700 ? "PAR (Visible)" : "NIR (Infrared)"}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: CORE AGRONOMIC MODELS & MATHEMATICAL STUDIO  */}
      {/* ======================================================== */}
      <section id="core-agronomic-models" className="py-24 bg-surface relative">
        <div className="max-w-container-max mx-auto px-6 md:px-12 text-left">
          <div className="bento-header flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-outline-variant/40 pb-8 gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-label uppercase tracking-widest border border-secondary/20 shadow-sm">
                <FlaskConical className="w-3.5 h-3.5 text-secondary" />
                Algorithmic R&amp;D
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Core Agronomic Models</h2>
              <p className="text-label-md text-on-surface-variant uppercase tracking-widest">
                Nitrogen Uptake Efficiency, Transpiration Flux &amp; Microbiome Kinetics
              </p>
            </div>

            <button
              onClick={() => setIsMethodologyModalOpen(true)}
              className="text-secondary font-label text-label-md font-bold flex items-center gap-2 cursor-pointer group hover:underline"
            >
              <span>View Mathematical Methodology</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model Card 1: Nitrogen Uptake Efficiency */}
            <div className="research-bento-card bg-surface-container p-8 rounded-3xl border border-outline-variant/40 flex flex-col justify-between group relative overflow-hidden transition-all duration-300">
              <div className="bento-spotlight absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"></div>

              {/* Dynamic SVG Waveform Banner */}
              <div className="absolute top-0 left-0 w-full h-16 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
                <svg className="w-[300px] h-full" viewBox="0 0 300 60">
                  <path
                    className="nue-wave-path"
                    d="M0,30 Q30,10 60,30 T120,30 T180,30 T240,30 T300,30 T360,30"
                    fill="none"
                    stroke="#3b6934"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-secondary/15 text-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all shadow-inner relative z-10">
                    <Sprout className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-xs text-secondary font-bold px-3 py-1 bg-surface rounded-full border border-secondary/30">
                    NUE: 98.4%
                  </span>
                </div>

                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  Nitrogen Uptake Efficiency
                </h3>

                <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                  Real-time metabolic pathway telemetry analyzing nitrate and ammonium assimilation across soil moisture saturation gradients.
                </p>

                {/* Subsurface Sensor Depth Selector */}
                <div className="flex gap-2 mb-6">
                  {(["10cm", "30cm", "60cm"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setNueDepth(d)}
                      className={`text-xs px-3 py-1 rounded-lg font-mono transition-all ${
                        nueDepth === d
                          ? "bg-secondary text-white font-bold shadow-sm"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {d} Depth
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-mono text-primary mb-4">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" /> Assimilation Flux
                  </span>
                  <span className="font-bold text-secondary">
                    {nueDepth === "10cm" ? "142 kg/ha" : nueDepth === "30cm" ? "118 kg/ha" : "84 kg/ha"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-secondary font-bold">
                  <span>Model Confidence: 99.2%</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            {/* Model Card 2: Biomorphic Transpiration Flux */}
            <div className="research-bento-card bg-surface-container p-8 rounded-3xl border border-outline-variant/40 flex flex-col justify-between group relative overflow-hidden transition-all duration-300">
              <div className="bento-spotlight absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"></div>

              {/* Dynamic Sine Wave Path */}
              <div className="absolute top-0 left-0 w-full h-16 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
                <svg className="w-[300px] h-full" viewBox="0 0 300 60">
                  <path
                    className="transpiration-sine-path"
                    d="M0,30 Q40,5 80,30 T160,30 T240,30 T320,30"
                    fill="none"
                    stroke="#3b6934"
                    strokeWidth="2.5"
                    strokeDasharray="6 3"
                  />
                </svg>
              </div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-secondary/15 text-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all shadow-inner relative z-10">
                    <Wind className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-xs text-secondary font-bold px-3 py-1 bg-surface rounded-full border border-secondary/30">
                    VPD: 1.45 kPa
                  </span>
                </div>

                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  Transpiration Stomatal Flux
                </h3>

                <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                  Penman-Monteith sap-flow kinematics calculating stomatal resistance and predicting wilt point thresholds under thermal stress.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-mono text-primary mb-4">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-secondary animate-pulse" /> Stomatal Conductance
                  </span>
                  <span className="font-bold text-secondary">420 mmol/m²·s</span>
                </div>

                <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-secondary font-bold">
                  <span>Wilt Alert: Nominal</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            {/* Model Card 3: Microbiome Dynamics Analysis */}
            <div className="research-bento-card bg-surface-container p-8 rounded-3xl border border-outline-variant/40 flex flex-col justify-between group relative overflow-hidden transition-all duration-300">
              <div className="bento-spotlight absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"></div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-secondary/15 text-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all shadow-inner relative z-10">
                    <Dna className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-xs text-secondary font-bold px-3 py-1 bg-surface rounded-full border border-secondary/30">
                    F:B Ratio: 0.82
                  </span>
                </div>

                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  Microbiome Dynamics
                </h3>

                <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                  Subsurface biological health indexing based on fungal-to-bacterial colonization ratios and nutrient mineralization rates.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-mono text-primary mb-4">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <Database className="w-3.5 h-3.5 text-secondary animate-pulse" /> Mineralization Rate
                  </span>
                  <span className="font-bold text-secondary">4.8 mg/kg/day</span>
                </div>

                <div className="flex items-center justify-between text-xs font-label uppercase tracking-wider text-secondary font-bold">
                  <span>Samples: 4.2M+ Calibrated</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: PUBLICATIONS & WHITEPAPERS STUDIO            */}
      {/* ======================================================== */}
      <section id="publications-database" className="py-24 bg-surface-container-low border-t border-outline-variant/40">
        <div className="max-w-container-max mx-auto px-6 md:px-12 text-left">
          <div className="pub-header text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-label uppercase tracking-widest border border-secondary/20 shadow-sm mb-3">
              <BookOpen className="w-3.5 h-3.5 text-secondary" />
              Scientific Archive
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">
              Scientific Publications &amp; Whitepapers
            </h2>
            <p className="text-on-surface-variant text-body-md">
              Peer-reviewed agronomic treatises, telemetry protocol specifications, and biological dataset documentation.
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="pub-controls mb-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search title, author, or metric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary rounded-xl px-4 py-2.5 text-sm pl-10 outline-none transition-all"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-on-surface-variant" />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All Papers" },
                { key: "nitrogen", label: "Nitrogen NUE" },
                { key: "transpiration", label: "Transpiration" },
                { key: "spectral", label: "Hyperspectral" },
                { key: "microbiome", label: "Microbiome" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`text-xs px-3.5 py-2 rounded-xl font-label transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? "bg-secondary text-white font-bold shadow-md"
                      : "bg-surface border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Publications Table Card */}
          <div className="pub-table-container bg-surface rounded-3xl overflow-hidden shadow-sm border border-outline-variant/50 max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-on-primary border-b border-outline">
                    <th className="p-5 font-label text-label-sm uppercase tracking-wider">Document Title</th>
                    <th className="p-5 font-label text-label-sm uppercase tracking-wider">Lead Author</th>
                    <th className="p-5 font-label text-label-sm uppercase tracking-wider">Affiliation</th>
                    <th className="p-5 font-label text-label-sm uppercase tracking-wider">Metric</th>
                    <th className="p-5 font-label text-label-sm uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-sm">
                  {filteredPublications.length > 0 ? (
                    filteredPublications.map((pub, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-surface-container-high/50 transition-colors duration-200 cursor-pointer group"
                        onClick={() => {
                          setSelectedPaper(pub);
                          setIsPaperModalOpen(true);
                        }}
                      >
                        <td className="p-5 font-semibold text-primary group-hover:text-secondary transition-colors">
                          {pub.title}
                        </td>
                        <td className="p-5 text-on-surface-variant whitespace-nowrap">{pub.author}</td>
                        <td className="p-5 text-on-surface-variant whitespace-nowrap">{pub.affiliation}</td>
                        <td className="p-5 whitespace-nowrap">
                          <span className="px-3 py-1 bg-secondary/15 text-secondary rounded-full text-xs font-mono font-bold">
                            {pub.metric}
                          </span>
                        </td>
                        <td className="p-5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPaper(pub);
                                setIsPaperModalOpen(true);
                              }}
                              className="text-xs text-on-surface-variant hover:text-primary flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" /> Abstract
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerDownload(pub);
                              }}
                              disabled={downloadingId === pub.title}
                              className="text-xs text-secondary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              {downloadingId === pub.title ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-secondary" />
                                  <span>{downloadProgress}%</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5" />
                                  <span>PDF</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-on-surface-variant">
                        No publications matched your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: DEVELOPER API SANDBOX & LIVE STREAM CONSOLE   */}
      {/* ======================================================== */}
      <section
        id="developer-api-sandbox"
        className="py-24 bg-inverse-surface text-inverse-on-surface overflow-hidden relative text-left"
      >
        <div className="max-w-container-max mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sandbox Controls Column (Left) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="api-header space-y-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/20 text-secondary-fixed text-xs font-label uppercase tracking-widest border border-secondary-fixed/30">
                  <Terminal className="w-3.5 h-3.5" />
                  REST &amp; WebSocket Telemetry API
                </span>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-white">
                  Developer API Sandbox
                </h2>
                <p className="text-body-md text-primary-fixed-dim leading-relaxed">
                  Our High-Throughput Flux API provides direct endpoints for real-time agronomic telemetry, multispectral indexing, and subsurface sensor feeds.
                </p>
              </div>

              <div className="api-controls space-y-4 pt-2">
                <div>
                  <label className="text-xs font-label uppercase tracking-wider text-primary-fixed block mb-2 font-bold">
                    Target Telemetry Endpoint
                  </label>
                  <select
                    value={selectedDatasetKey}
                    onChange={handleDatasetChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3.5 text-white focus:border-secondary-fixed focus:ring-0 transition-colors cursor-pointer outline-none font-mono text-sm"
                  >
                    <option className="bg-inverse-surface text-white" value="soil">
                      Soil Telemetry (Subsurface Volumetric Water Content)
                    </option>
                    <option className="bg-inverse-surface text-white" value="atmospheric">
                      Atmospheric Stress (VPD &amp; Canopy Thermal Load)
                    </option>
                    <option className="bg-inverse-surface text-white" value="par">
                      Photosynthetic Radiation (PAR &amp; Spectral Lux)
                    </option>
                    <option className="bg-inverse-surface text-white" value="microbiome">
                      Microbiome Dynamics (Fungal:Bacterial Ratio)
                    </option>
                  </select>
                </div>

                {/* Query Parameters Checkbox Toggles */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2.5 text-xs font-mono">
                  <span className="text-[10px] font-label uppercase tracking-widest text-primary-fixed-dim block font-bold">
                    Request Parameter Flags
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={paramCalibrated}
                      onChange={(e) => setParamCalibrated(e.target.checked)}
                      className="rounded text-secondary focus:ring-0"
                    />
                    <span>apply_matrix_calibration=v4.2</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={paramRawResolution}
                      onChange={(e) => setParamRawResolution(e.target.checked)}
                      className="rounded text-secondary focus:ring-0"
                    />
                    <span>stream_raw_unfiltered_samples=true</span>
                  </label>
                </div>

                {/* Live Stream & Request Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={runTestRequest}
                    disabled={isRequestRunning}
                    className="bg-secondary text-on-secondary px-6 py-3.5 rounded-xl text-xs font-label uppercase tracking-widest font-bold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 shadow-lg"
                  >
                    {isRequestRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    <span>{isRequestRunning ? "Executing..." : "Execute Query"}</span>
                  </button>

                  <button
                    onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                    className={`px-6 py-3.5 rounded-xl text-xs font-label uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      isLiveStreaming
                        ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/15"
                    }`}
                  >
                    <Radio className={`w-4 h-4 ${isLiveStreaming ? "animate-pulse" : ""}`} />
                    <span>{isLiveStreaming ? "Live WebSocket Active" : "Stream Real-Time"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Terminal Window Card (Right) */}
            <div className="api-terminal-card lg:col-span-7 relative w-full">
              <div className="bg-black/60 rounded-2xl border border-white/15 backdrop-blur-xl overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 border-b border-white/10 select-none">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    <span className="ml-3 text-[11px] font-mono text-white/40 uppercase tracking-widest">
                      {datasets[selectedDatasetKey].endpoint}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-secondary-fixed flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
                      {liveTelemetryPing}ms
                    </span>

                    <button
                      onClick={copyApiCode}
                      className="flex items-center gap-1 text-[11px] font-mono text-white/50 hover:text-white cursor-pointer bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition-colors"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-secondary-fixed" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? "Copied" : "Copy cURL"}</span>
                    </button>
                  </div>
                </div>

                {/* Terminal Payload Body */}
                <div className="p-6 font-mono text-xs leading-relaxed max-h-[440px] overflow-y-auto custom-scrollbar">
                  <div className="text-secondary-fixed mb-2 text-[11px]"># Executable cURL command</div>
                  <div className="text-primary-fixed mb-6 whitespace-pre-wrap select-all bg-white/5 p-3 rounded-lg border border-white/5">
                    $ {datasets[selectedDatasetKey].request}
                    {paramRawResolution ? ` \\\n  -d "resolution=raw"` : ""}
                  </div>

                  <div className="flex justify-between items-center text-secondary-fixed mb-2 text-[11px]">
                    <span># Telemetry Payload Response (Status: 200 OK)</span>
                    {isLiveStreaming && (
                      <span className="text-[10px] text-emerald-400 animate-pulse">● LIVE STREAMING</span>
                    )}
                  </div>

                  <pre className="text-tertiary-fixed-dim whitespace-pre-wrap bg-black/40 p-4 rounded-xl border border-white/5">
                    {displayedResponse}
                  </pre>
                </div>
              </div>

              {/* Ambient Floating Glow */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary/20 blur-[80px] rounded-full pointer-events-none -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* MODAL 1: MATHEMATICAL METHODOLOGY & FORMULAS DEEP-DIVE   */}
      {/* ======================================================== */}
      {isMethodologyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in text-left">
          <div className="bg-surface rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-outline-variant relative">
            <button
              onClick={() => setIsMethodologyModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <span className="text-xs font-label uppercase tracking-widest text-secondary font-bold block mb-2">
                AetherAg Mathematical Specification v4.2
              </span>
              <h3 className="font-headline text-3xl font-bold text-primary mb-2">
                Biomorphic Agronomic Models &amp; Equations
              </h3>
              <p className="text-sm text-on-surface-variant">
                Mathematical foundations governing our nitrogen assimilation, transpiration sap flux, and microbial mineralization models.
              </p>
            </div>

            <div className="space-y-8 text-sm">
              {/* Formula 1 */}
              <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/40 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-headline text-lg font-bold text-primary">
                    1. Nitrogen Uptake Efficiency (NUE) Differential
                  </h4>
                  <span className="text-xs font-mono bg-secondary/15 text-secondary px-2.5 py-1 rounded-full font-bold">
                    Accuracy: 98.4%
                  </span>
                </div>
                <div className="bg-surface p-4 rounded-xl font-mono text-xs text-primary font-bold overflow-x-auto">
                  NUE = (ΔBiomass / ΔN_absorbed) × 100 = [(Y_N - Y_0) / F_N] · [1 - α · exp(-β · θ_vwc)]
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Where θ_vwc represents continuous subsurface volumetric water content and α, β are cultivar-specific calibration coefficients mapped to soil horizon depth.
                </p>
              </div>

              {/* Formula 2 */}
              <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/40 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-headline text-lg font-bold text-primary">
                    2. Modified Ball-Berry Stomatal Conductance (g_s)
                  </h4>
                  <span className="text-xs font-mono bg-secondary/15 text-secondary px-2.5 py-1 rounded-full font-bold">
                    Latency: &lt; 12ms
                  </span>
                </div>
                <div className="bg-surface p-4 rounded-xl font-mono text-xs text-primary font-bold overflow-x-auto">
                  g_s = g_0 + g_1 · [(A · h_s) / C_s] · [1 / (1 + VPD / D_0)]
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Predicts stomatal aperture under sudden atmospheric thermal stress where A is net assimilation rate, h_s is relative humidity at the leaf surface, and D_0 is the empirical sensitivity constant.
                </p>
              </div>

              {/* Formula 3 */}
              <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/40 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-headline text-lg font-bold text-primary">
                    3. Microbiome Arrhenius Mineralization Rate (M_rate)
                  </h4>
                  <span className="text-xs font-mono bg-secondary/15 text-secondary px-2.5 py-1 rounded-full font-bold">
                    Calibrated: 4.2M+
                  </span>
                </div>
                <div className="bg-surface p-4 rounded-xl font-mono text-xs text-primary font-bold overflow-x-auto">
                  M_rate = κ · (F/B) · exp[-E_a / (R · T_soil)] · f(θ)
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Couples the fungal-to-bacterial ratio (F/B) with sub-surface temperature and moisture gradients to estimate daily nitrogen mineralization without soil sampling degradation.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/40 flex justify-end">
              <button
                onClick={() => setIsMethodologyModalOpen(false)}
                className="bg-primary text-white px-6 py-3 rounded-xl font-label text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-all cursor-pointer"
              >
                Close Methodology Studio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: PUBLICATION ABSTRACT & CITATION STUDIO         */}
      {/* ======================================================== */}
      {isPaperModalOpen && selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in text-left">
          <div className="bg-surface rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-outline-variant relative">
            <button
              onClick={() => setIsPaperModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-secondary/15 text-secondary text-xs font-mono font-bold rounded-full">
                  {selectedPaper.metric}
                </span>
                <span className="text-xs text-on-surface-variant font-mono">{selectedPaper.year}</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-2 leading-snug">
                {selectedPaper.title}
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                {selectedPaper.author} • {selectedPaper.affiliation}
              </p>
            </div>

            {/* Abstract */}
            <div className="space-y-4 mb-6 text-sm leading-relaxed text-on-surface-variant bg-surface-container p-6 rounded-2xl border border-outline-variant/40">
              <h4 className="text-xs font-label uppercase tracking-wider text-primary font-bold">
                Abstract &amp; Summary
              </h4>
              <p>{selectedPaper.abstract}</p>
            </div>

            {/* Key Findings */}
            {selectedPaper.keyFindings && selectedPaper.keyFindings.length > 0 && (
              <div className="mb-6 space-y-2">
                <h4 className="text-xs font-label uppercase tracking-wider text-primary font-bold">
                  Key Experimental Findings
                </h4>
                <ul className="space-y-1.5 text-xs text-on-surface">
                  {selectedPaper.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-6 border-t border-outline-variant/40 flex flex-wrap justify-between items-center gap-4">
              <div className="text-xs font-mono text-on-surface-variant">
                DOI: <span className="text-primary font-bold">{selectedPaper.doi}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => copyCitation(selectedPaper)}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant text-xs font-label uppercase tracking-wider font-bold hover:bg-surface-container transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {citationCopied ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{citationCopied ? "BibTeX Copied" : "Copy BibTeX"}</span>
                </button>

                <button
                  onClick={() => triggerDownload(selectedPaper)}
                  disabled={downloadingId === selectedPaper.title}
                  className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-label uppercase tracking-wider font-bold hover:bg-secondary transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {downloadingId === selectedPaper.title ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                      <span>Downloading ({downloadProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 7: RESEARCH PORTAL FOOTER                       */}
      {/* ======================================================== */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/40 py-12">
        <div className="max-w-container-max mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
          <div className="flex flex-col gap-2">
            <div className="font-headline text-2xl font-bold text-primary">AetherAg Precision Systems</div>
            <p className="text-xs font-body text-on-surface-variant">
              © 2026 AetherAg Precision Systems. Agronomic Science, Calculated.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-xs font-label uppercase tracking-wider">
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#terms">
              Data Licensing
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#developer-api-sandbox">
              API Documentation
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#publications-database">
              Whitepapers
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#/terms">
              Terms of Service
            </a>
          </nav>

          <div className="flex gap-4 text-on-surface-variant">
            <ShieldCheck className="w-5 h-5 hover:text-primary cursor-pointer" />
            <Database className="w-5 h-5 hover:text-primary cursor-pointer" />
            <Cpu className="w-5 h-5 hover:text-primary cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
