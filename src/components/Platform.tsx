import { useState, useEffect, useRef } from "react";

export default function Platform() {
  // Checkbox layer states
  const [hydrationChecked, setHydrationChecked] = useState(true);
  const [chlorophyllChecked, setChlorophyllChecked] = useState(false);
  const [nitrogenChecked, setNitrogenChecked] = useState(false);
  const [anomalyChecked, setAnomalyChecked] = useState(true);

  // Hover states for probe nodes
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // SVG Chart Animation trigger
  const [chartAnimated, setChartAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Live telemetry ticker logs
  const [logs, setLogs] = useState<string[]>(() => {
    const time = new Date().toLocaleTimeString();
    return [
      `[${time}] System booted. Mesh sync established.`,
      `[${time}] Latitude -34.6037, Longitude -58.3816 locked.`,
      `[${time}] Probe fleet status: 98.4% operational.`
    ];
  });

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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations (using .reveal system), chart draw trigger & SEO meta updates
  useEffect(() => {
    // Dynamic Page Title & Description for SEO
    const prevTitle = document.title;
    document.title = "AetherAg Platform | Precision Software & IoT Sensor Network";

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore the AetherAg software platform and IoT sensor hardware suite. Track real-time soil health, monitor crop stress via multispectral imaging, and forecast yields with high-accuracy agronomic modeling."
      );
    }

    const observerOptions = {
      threshold: 0.1,
    };

    // Standard reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => {
      observer.observe(el);
    });

    // Observer for chart drawing trigger
    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setChartAnimated(true);
            chartObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentChartRef = chartRef.current;
    if (currentChartRef) {
      chartObserver.observe(currentChartRef);
    }

    window.scrollTo(0, 0);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
      revealElements.forEach((el) => observer.unobserve(el));
      if (currentChartRef) {
        chartObserver.unobserve(currentChartRef);
      }
    };
  }, []);

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

  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
      
      {/* Section 1: Hero */}
      <section id="platform-hero" className="relative min-h-[870px] flex items-center overflow-hidden pt-20 pb-32">
        <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 z-10 text-left">
            <span className="font-label text-label-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">
              AetherAg Platform v4.0
            </span>
            <h1 className="font-display text-[56px] leading-[1.1] text-primary mb-6">
              The Command Center for Organic Precision.
            </h1>
            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mb-10">
              Synthesizing hyper-local field telemetry with advanced biomorphic models to optimize every square centimeter of your cultivation cycle.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label text-label-md font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-xl shadow-primary/5 cursor-pointer border-0">
                Request Live Demo
              </button>
              <button className="border border-outline px-8 py-4 rounded-lg font-label text-label-md font-bold uppercase tracking-widest hover:bg-surface-container transition-all cursor-pointer">
                View Hardware Spec Sheet
              </button>
            </div>
          </div>

          <div className="md:col-span-6 relative w-full">
            <div className="relative bg-surface-container-low border border-outline-variant/50 rounded-xl p-4 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
              
              {/* Dashboard Simulation Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/30 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse-green"></div>
                  <span className="font-label text-label-sm font-semibold uppercase tracking-tighter text-on-surface">
                    Live Stream: Sector 07-B
                  </span>
                </div>
                <span className="text-xs text-outline font-label">0.2ms Latency</span>
              </div>

              {/* Dashboard Simulation Content */}
              <div className="flex-grow grid grid-cols-3 gap-2 overflow-hidden">
                <div className="col-span-2 relative rounded overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Agricultural multispectral mapping display dashboard"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgwEf6CBUzkFPSPyoJp9FW8zw6Tm3uc0yn1mNbamwlLIbh6RMEfjBLsWJIc-ugXHWg4D_V2xIqOpNSRExI29BhzWyjChvpwJau5ko27ftx7p96wJcsZ8Wpu-D_PLXmRGimjMNgcmUQVpZMwvdNoL516qczH5ToIFBWq1Pi4beCJEL8Z9BilYwPkCAaUwRdoAxOj-_m2g0puy5cOGsivgmSsX_DOd0Q5Hh8zdw2Z-tgV4Xt5XKptZFR1eiYRX4TkE5MTANNqRzNu2A"
                  />
                  <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur text-white p-2 rounded text-[10px] font-mono leading-relaxed border border-white/10 select-none">
                    CHLOROPHYLL_INDEX: 0.84
                    <br />
                    NITROGEN: STABLE
                  </div>
                </div>
                <div className="space-y-2 flex flex-col">
                  <div className="bg-surface-container-high h-1/2 rounded p-2 border border-outline-variant/20 flex flex-col justify-between select-none">
                    <div className="h-2 w-12 bg-outline-variant rounded mb-2"></div>
                    <div className="h-16 w-full flex items-end gap-1">
                      <div className="flex-1 bg-secondary h-2/3 rounded-sm"></div>
                      <div className="flex-1 bg-secondary h-4/5 rounded-sm"></div>
                      <div className="flex-1 bg-primary h-full rounded-sm"></div>
                      <div className="flex-1 bg-secondary h-3/4 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="bg-primary rounded flex-grow p-3 flex flex-col justify-between text-left select-none">
                    <span className="text-on-primary font-label text-[10px] uppercase font-bold tracking-widest opacity-80">
                      Soil Moisture
                    </span>
                    <span className="text-on-primary font-headline text-xl font-bold">32.4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back decorative layer */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-outline-variant/20 rounded-xl -z-10 bg-surface-container-lowest/50"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Field Explorer */}
      <section id="interactive-field-explorer" className="reveal bg-surface-container-low py-24 border-t border-b border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto px-12">
          
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-headline-md text-primary mb-4">
              The Live Field Explorer
            </h2>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Real-time geospatial synthesis of sub-surface telemetry and atmospheric variables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6 text-left">
              
              {/* Toggles */}
              <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-ambient">
                <h3 className="font-label text-label-md uppercase tracking-wider mb-6 text-primary font-bold">
                  Data Layers
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className={`font-body text-body-md transition-colors ${hydrationChecked ? "text-secondary font-semibold" : "text-on-surface group-hover:text-secondary"}`}>
                      Soil Hydration
                    </span>
                    <input
                      checked={hydrationChecked}
                      onChange={() => toggleLayer("hydration")}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer h-4 w-4"
                      type="checkbox"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className={`font-body text-body-md transition-colors ${chlorophyllChecked ? "text-secondary font-semibold" : "text-on-surface group-hover:text-secondary"}`}>
                      Chlorophyll Index
                    </span>
                    <input
                      checked={chlorophyllChecked}
                      onChange={() => toggleLayer("chlorophyll")}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer h-4 w-4"
                      type="checkbox"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className={`font-body text-body-md transition-colors ${nitrogenChecked ? "text-secondary font-semibold" : "text-on-surface group-hover:text-secondary"}`}>
                      Nitrogen Dist.
                    </span>
                    <input
                      checked={nitrogenChecked}
                      onChange={() => toggleLayer("nitrogen")}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer h-4 w-4"
                      type="checkbox"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className={`font-body text-body-md transition-colors ${anomalyChecked ? "text-secondary font-semibold" : "text-on-surface group-hover:text-secondary"}`}>
                      Anomaly Detection
                    </span>
                    <input
                      checked={anomalyChecked}
                      onChange={() => toggleLayer("anomaly")}
                      className="rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer h-4 w-4"
                      type="checkbox"
                    />
                  </label>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-primary p-6 rounded-xl text-on-primary shadow-xl shadow-primary/10 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4 select-none">
                  <span className="material-symbols-outlined text-secondary-fixed">sensors</span>
                  <span className="font-label text-label-sm uppercase tracking-widest font-semibold">
                    Global Status
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-headline font-bold text-white mb-1">98.4%</div>
                  <div className="font-label text-[10px] text-on-primary-container uppercase tracking-wider font-bold">
                    Fleet Uptime
                  </div>
                </div>
              </div>

              {/* Live Ticker log container */}
              <div className="bg-surface-container-high border border-outline-variant/30 rounded-xl p-4 shadow-sm h-[180px] overflow-hidden flex flex-col">
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
            <div className="lg:col-span-3 relative h-[600px] bg-surface-dim rounded-xl overflow-hidden border border-outline-variant shadow-inner">
              <img
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
                alt="Overview of gridded farm field"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1VgJCrY0w9vjIutg97JFPEmBszosG4_nU8-NRw27tEzG9sui22PVbL6C9obLG0qvsYhtRxt0ueWhPjta5F7NB2i3yLC-Tp-H1mU-phldTU4p93XocxlCPfq4_qXThrySzkZgQoRx0C00K4pHAR7Iay9ii6CUcl2mGJ5WRW_o9birZkwtZnquVxTCsTxSE1XC0CtZzhE6x0-zEqYWTSOHx1HxobcNAJaYRtc8GvmZsjOlM2epx2kou9P_jWPRIaQBguY0LXI7u1mQ"
              />

              {/* Dynamic Overlay Layers */}
              {/* Hydration Gradient Layer */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-700 ease-in-out"
                style={{ opacity: hydrationChecked ? 0.75 : 0 }}
              >
                <div className="w-full h-full bg-gradient-to-tr from-cyan-600/35 via-blue-500/25 to-transparent mix-blend-color"></div>
              </div>

              {/* Chlorophyll (NDVI green mapping) Layer */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-700 ease-in-out"
                style={{ opacity: chlorophyllChecked ? 0.8 : 0 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-secondary/45 via-emerald-600/30 to-transparent mix-blend-color-burn"></div>
              </div>

              {/* Nitrogen distribution heatmap Layer */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-700 ease-in-out"
                style={{ opacity: nitrogenChecked ? 0.7 : 0 }}
              >
                <div className="w-full h-full bg-gradient-to-r from-amber-600/30 via-yellow-500/20 to-transparent"></div>
              </div>

              {/* Anomaly Highlight Overlay Boundary */}
              <div
                className="absolute inset-0 pointer-events-none border-4 border-error/0 transition-all duration-700 ease-in-out"
                style={{ borderColor: anomalyChecked ? "rgba(186, 26, 26, 0.08)" : "transparent" }}
              ></div>

              {/* Floating Sensor Probe 1: Node AE-04 (Optimal) */}
              <div
                className="absolute top-1/4 left-1/3 group cursor-pointer z-10"
                onMouseEnter={() => setHoveredNode("AE-04")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse-green ring-4 ring-secondary/20 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>

                {/* Tooltip AE-04 */}
                <div
                  className={`absolute top-6 left-1/2 -translate-x-1/2 bg-background border border-outline text-[10px] p-2 rounded shadow-lg whitespace-nowrap z-20 transition-all duration-300 text-left ${
                    hoveredNode === "AE-04" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="font-bold text-primary">Probe Node AE-04</div>
                  <div className="text-on-surface-variant font-body">Depth: 45cm</div>
                  <div className="text-on-surface-variant font-body">Salinity: 1.2 dS/m</div>
                </div>
              </div>

              {/* Floating Sensor Probe 2: Node AE-12 (Anomaly - Hydration Low) */}
              <div
                className={`absolute bottom-1/2 right-1/4 group cursor-pointer z-10 transition-all duration-500 ${
                  anomalyChecked ? "opacity-100 scale-100" : "opacity-40 scale-90"
                }`}
                onMouseEnter={() => setHoveredNode("AE-12")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`w-3 h-3 rounded-full flex items-center justify-center ring-4 transition-all duration-300 ${
                  anomalyChecked ? "bg-error ring-error/20" : "bg-outline-variant ring-transparent"
                }`}></div>

                {/* Pulsing error effect */}
                {anomalyChecked && (
                  <div className="absolute inset-0 bg-error rounded-full animate-ping opacity-60"></div>
                )}

                {/* Tooltip AE-12 */}
                <div
                  className={`absolute top-6 left-1/2 -translate-x-1/2 bg-background border text-[10px] p-2 rounded shadow-lg whitespace-nowrap z-20 transition-all duration-300 text-left ${
                    anomalyChecked ? "border-error" : "border-outline"
                  } ${
                    hoveredNode === "AE-12" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className={`font-bold ${anomalyChecked ? "text-error" : "text-primary"}`}>
                    Warning: Hydration Low
                  </div>
                  <div className="text-on-surface-variant font-body">Sector 12-F</div>
                  <div className="text-on-surface-variant font-body">Action Req: Auto-Irrigate</div>
                </div>
              </div>

              {/* Legend Overlay */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-3 rounded-lg border border-outline-variant text-[11px] font-label uppercase tracking-widest text-primary flex items-center gap-6 shadow-sm select-none">
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
      <section id="hardware-sensor-suite" className="reveal py-32 px-12 max-w-[1280px] mx-auto">
        <div className="mb-20 text-left">
          <span className="font-label text-label-sm uppercase tracking-widest text-secondary font-bold">
            Hardware Ecosystem
          </span>
          <h2 className="font-headline text-[48px] text-primary mt-4">
            The IoT Sensor Suite.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: AetherProbe v4 */}
          <div className="md:col-span-8 bg-surface-container rounded-xl overflow-hidden bento-card flex flex-col md:flex-row text-left border border-outline-variant/10 shadow-sm">
            <div className="p-10 flex-1 flex flex-col justify-center">
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
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-secondary rounded-full"></span> 10cm, 30cm, 60cm, 1m Sensing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-secondary rounded-full"></span> NPK Ion Estimation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-secondary rounded-full"></span> Titanium Alloy Chassis
                </li>
              </ul>
            </div>
            <div className="flex-grow min-h-[300px] relative">
              <img
                className="w-full h-full object-cover"
                alt="AetherProbe in fertile ground spec spec"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJPUFHlAEphKuPFaiR1vOgUDI5L7nfhz0SJ8H4exDoWF92WtsHguugdUwLHxoXjZhzDXI5B9VRgdS2FGJfkMD6q_uxuylP7LHB6vIIGYzHKNBGzGuLiiAKddII0z2VC9gtzTUpm8PdwNwZoPKeJQ0DMudAV2gsIkz9O4DV01Uy31GWd7luWEYNlUxzWui3D5w0KmchHOWDVDFERz7spP1FHhbSdd933NpV3U-ygzJd57h4cjrs1TucuHrqcyzN3Yo_giFxDZ86cPA"
              />
            </div>
          </div>

          {/* Bento Item 2: Stat card */}
          <div className="md:col-span-4 bg-primary rounded-xl p-10 bento-card flex flex-col justify-between text-on-primary text-left">
            <div className="flex justify-between items-start select-none">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed font-light">satellite_alt</span>
              <div className="text-right">
                <div className="font-label text-[10px] uppercase opacity-60">
                  Refresh Rate
                </div>
                <div className="font-label text-label-md text-white font-semibold">Every 15m</div>
              </div>
            </div>
            <div className="mt-8">
              <div className="font-display text-4xl mb-2 text-white font-bold">99.9%</div>
              <p className="font-body text-body-md opacity-70 leading-relaxed">
                Fleet-wide data integrity across distributed mesh networks.
              </p>
            </div>
          </div>

          {/* Bento Item 3: AetherEye */}
          <div className="md:col-span-4 bg-surface-container-high rounded-xl p-10 bento-card border border-outline-variant/30 flex flex-col justify-between text-left">
            <div>
              <h3 className="font-headline text-headline-sm mb-4 text-primary font-normal">AetherEye</h3>
              <p className="font-body text-body-md text-on-surface-variant mb-8 leading-relaxed">
                Multispectral canopy analysis detecting photosynthetic stress before it's visible to the human eye.
              </p>
            </div>
            <div>
              <div className="h-48 rounded-lg overflow-hidden grayscale contrast-125 mb-6">
                <img
                  className="w-full h-full object-cover"
                  alt="AetherEye camera lens specs"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgYXkmzqmCThxrlRxmrNwewgoqV9eyhd3Lkm9FA3vWWzxPFcb3WIvYRbEM4ezarO5P_zFL-8Lkk4Uhl94xe_w-lWLcTG2WeCoCxVOB6hRd0XNn5fuKzdhuUO_ZBLqi2mYrmw5LMT7S3IQfekuGPIPjFvnRQCMPz9oX5e0DxArMI-Rkq_ddDGXE5i6hyCtNszoz2TLqylw6hmseF-1N95Vv0u2_iuy65yP5EF_rmHj4sLX-jhTDtQmL3Bn1Xgfu95GATix4NnxDtVU"
                />
              </div>
              <button className="font-label text-label-sm uppercase tracking-widest font-bold flex items-center gap-2 group text-primary hover:text-secondary transition-colors cursor-pointer border-0 bg-transparent p-0">
                Spec Sheet
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-sm">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Bento Item 4: Orbital Stream */}
          <div className="md:col-span-8 bg-tertiary-fixed rounded-xl overflow-hidden bento-card grid grid-cols-1 md:grid-cols-2 text-left border border-outline-variant/10">
            <div className="min-h-[300px]">
              <img
                className="w-full h-full object-cover"
                alt="Orbital Stream satellite details"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLlzpy2AG9r0MIyFkkvJSN2N7Tc0gLpdnOJeySKb6i_UMYUksiOhYAY14Vfet4Int8ZXIzUzOKKi_3N0kgXBv7ZtBIOTA8XheJToqLq0FDPcygGUPFWdSoOYHjfO3K1XhAIGp86R4vMEgkeQYBqOB8HZD1MskzFRXpqy0ZGpcqDN_QxEYOLUenr70AnjPjUPH4Rs2R-kOuYU1BJzI3e6xm_Bo2g6SJ22f_8OkQlqWhiMGwJtMlHWZHNwCS9Cjn4erinm_ryUW14To"
              />
            </div>
            <div className="p-10 flex flex-col justify-center bg-white/20 backdrop-blur-md">
              <span className="font-label text-label-sm uppercase tracking-[0.2em] text-on-tertiary-fixed-variant font-bold mb-4">
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
      <section id="predictive-yield-chart" className="reveal bg-white py-32 border-t border-b border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center" ref={chartRef}>
          
          <div className="text-left">
            <span className="font-label text-label-sm uppercase tracking-[0.2em] text-secondary font-bold mb-6 block">
              ML Performance Metrics
            </span>
            <h2 className="font-headline text-[48px] leading-tight text-primary mb-8 font-normal">
              Yield Forecasting Models.
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant mb-10 leading-relaxed">
              Our proprietary Large Agriculture Model (LAM) processes over 4 terabytes of telemetry daily to generate predictive cultivation paths. By simulating millions of environmental permutations, we provide a definitive confidence envelope for your upcoming harvest.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-outline-variant pt-10">
              <div>
                <div className="font-display text-5xl text-secondary mb-2 font-normal">+14.2%</div>
                <div className="font-label text-label-sm uppercase text-outline tracking-wider">
                  Average Yield Increase
                </div>
              </div>
              <div>
                <div className="font-display text-5xl text-primary mb-2 font-normal">92%</div>
                <div className="font-label text-label-sm uppercase text-outline tracking-wider">
                  Prediction Confidence
                </div>
              </div>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/30 shadow-sm relative text-left">
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
                  d="M0,160 Q100,140 200,100 Q300,60 400,20 L400,80 Q300,120 200,160 Q100,180 0,190 Z"
                  fill="#3b6934"
                  fillOpacity={chartAnimated ? 0.05 : 0}
                  className="transition-all duration-1000 delay-500 ease-in-out"
                ></path>

                {/* Historical Line */}
                <path
                  d="M0,170 Q100,150 200,120 Q300,90 400,80"
                  fill="none"
                  opacity="0.3"
                  stroke="#000"
                  strokeDasharray="4"
                  strokeWidth="1.5"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: chartAnimated ? 0 : 400,
                    transition: "stroke-dashoffset 2s ease-in-out",
                  }}
                ></path>

                {/* Current/Predicted Trend Line */}
                <path
                  d="M0,160 Q100,140 200,100 Q300,60 400,20"
                  fill="none"
                  stroke="#3b6934"
                  strokeWidth="3"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: chartAnimated ? 0 : 400,
                    transition: "stroke-dashoffset 2s ease-in-out",
                  }}
                ></path>

                {/* Key data point MAX_POTENTIAL */}
                {chartAnimated && (
                  <>
                    <circle
                      cx="300"
                      cy="60"
                      fill="#3b6934"
                      r="5"
                      className="animate-pulse"
                    ></circle>
                    <text
                      fill="#3b6934"
                      fontFamily="Hanken Grotesk"
                      fontSize="9"
                      fontWeight="bold"
                      x="310"
                      y="56"
                      className="select-none font-bold tracking-wider"
                    >
                      MAX_POTENTIAL
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Chart X Axis Labels */}
            <div className="flex justify-between mt-8 text-[10px] font-label font-bold uppercase text-outline select-none">
              <span>Pre-Seeding</span>
              <span>Emergence</span>
              <span>Vegetative</span>
              <span>Harvest</span>
            </div>

            {/* Float Overlay ML Card */}
            <div className="absolute -right-6 -bottom-6 bg-secondary text-on-secondary p-6 rounded-lg shadow-xl max-w-[200px] border border-white/10">
              <span className="font-label text-[10px] uppercase block mb-1 opacity-80 font-bold">
                ML Insight
              </span>
              <p className="font-body text-[12px] leading-tight text-white/95">
                Projected nitrogen uptake is 8% higher than historical average. Adjust fertigation for Sector 4-A.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Section 5: CTA */}
      <section id="platform-cta" className="reveal relative py-32 overflow-hidden bg-primary text-on-primary">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 grayscale pointer-events-none z-0">
          <img
            className="w-full h-full object-cover"
            alt="Sprout emerging from dark organic earth under dramatic spotlight"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx-HbYjKU17OZ1-6PjdjIYZUwPyCUvwGpCrKVNH_LYJiWb5u4zd1TT1b2aKsiYjxlgkzxrTBq95PmZ4USWyKvBMA208223FDQjvSpN3iuQYUZztKNPpXFcq_kdRzbojRPYu2_fgkLkXteCvKaaxy6FlCfeYYoqqDYD6tLGhxYg4nC-a3RibkL1wZcHHjVPBRqNqqV2RU1gP3hpZYgcGSBmaBLAL0Z9RkjMZ_9QvLNFP9QjWLVTi33ajhAlPT2jTsx4iHEI0NzvqxM"
          />
        </div>
        <div className="max-w-[1280px] mx-auto px-12 relative z-10 text-left">
          <div className="max-w-2xl">
            <h2 className="font-headline text-5xl md:text-[56px] leading-[1.1] text-white mb-8">
              Ready for the next cultivation cycle?
            </h2>
            <p className="font-body text-body-lg text-primary-fixed-dim mb-12">
              Deploy the world's most advanced agronomic intelligence platform. Our team of systems engineers and agronomists will design a custom telemetry network tailored to your specific regional terroir.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <button className="bg-secondary text-on-secondary px-10 py-5 rounded font-label text-label-md font-bold uppercase tracking-widest hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all cursor-pointer border-0">
                Book Pre-Season Assessment
              </button>
              <a
                className="font-label text-label-md font-bold uppercase tracking-widest flex items-center gap-3 pt-5 group text-white hover:text-secondary-fixed transition-colors cursor-pointer"
                href="#/enterprise#contact"
              >
                Contact an Agronomist
                <span className="material-symbols-outlined text-md transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  north_east
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low w-full border-t border-outline-variant/30 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start px-12 py-16 w-full max-w-[1280px] mx-auto">
          <div className="mb-12 md:mb-0">
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
            <div>
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
            <div>
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
            <div>
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
                  <a className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/20 px-12 py-8 max-w-[1280px] mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
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

    </div>
  );
}
