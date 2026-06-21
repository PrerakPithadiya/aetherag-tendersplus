import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type DatasetKey = "soil" | "atmospheric" | "par";

// Base datasets definition moved outside the component to prevent re-creation on render
const datasets = {
  soil: {
    request: `curl -X GET "https://api.aetherag.com/v2/telemetry/field_8829" \\\n  -H "Authorization: Bearer [API_KEY]" \\\n  -d "metric=soil_vwc"`,
    response: {
      status: "success",
      data: {
        field_id: "8829",
        timestamp: "2026-06-20T14:48:02Z",
        sensors: [
          { id: "SN-01", depth: "10cm", val: 22.4 },
          { id: "SN-02", depth: "30cm", val: 21.8 },
          { id: "SN-03", depth: "60cm", val: 19.5 }
        ],
        unit: "percentage_volumetric",
        metadata: {
          model_confidence: 0.992,
          calibration: "cal-matrix-v4.2"
        }
      }
    }
  },
  atmospheric: {
    request: `curl -X GET "https://api.aetherag.com/v2/telemetry/field_8829" \\\n  -H "Authorization: Bearer [API_KEY]" \\\n  -d "metric=atmospheric_stress"`,
    response: {
      status: "success",
      data: {
        field_id: "8829",
        timestamp: "2026-06-20T14:48:02Z",
        metrics: {
          vapor_pressure_deficit_kpa: 1.45,
          ambient_temperature_c: 28.2,
          relative_humidity_pct: 55.4,
          canopy_temperature_c: 29.5
        },
        wilt_risk: "low",
        metadata: {
          model_confidence: 0.978,
          calibration: "cal-matrix-v4.2"
        }
      }
    }
  },
  par: {
    request: `curl -X GET "https://api.aetherag.com/v2/telemetry/field_8829" \\\n  -H "Authorization: Bearer [API_KEY]" \\\n  -d "metric=par"`,
    response: {
      status: "success",
      data: {
        field_id: "8829",
        timestamp: "2026-06-20T14:48:02Z",
        reading: {
          par_umol_m2_s: 1250,
          lux: 68000,
          cloud_cover_pct: 12.0
        },
        photosynthetic_efficiency: 0.84,
        metadata: {
          model_confidence: 0.985,
          calibration: "cal-matrix-v4.2"
        }
      }
    }
  }
};

export default function Research() {
  // Timeline/Active state for API sandbox
  const [selectedDatasetKey, setSelectedDatasetKey] = useState<DatasetKey>("soil");
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Search query for publications
  const [searchQuery, setSearchQuery] = useState("");

  const [displayedResponse, setDisplayedResponse] = useState<string>(
    JSON.stringify(datasets.soil.response, null, 2)
  );

  // SEO updates and scroll animation observers
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Research & Biomorphic R&D | AetherAg";

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AetherAg Precision Systems: Agronomic Science, Calculated. Explore our R&D portal, API references, and core agronomic models."
      );
    }

    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((section) => {
      section.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
      observer.observe(section);
    });

    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleDatasetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as DatasetKey;
    setSelectedDatasetKey(value);
    setDisplayedResponse(JSON.stringify(datasets[value].response, null, 2));
  };

  const runTestRequest = () => {
    setIsRunning(true);
    
    // Simulate real-time data changes slightly
    const baseData = JSON.parse(JSON.stringify(datasets[selectedDatasetKey].response));
    baseData.data.timestamp = new Date().toISOString();
    
    if (selectedDatasetKey === "soil") {
      baseData.data.sensors = baseData.data.sensors.map((s: { id: string; depth: string; val: number }) => ({
        ...s,
        val: parseFloat((s.val + (Math.random() * 0.8 - 0.4)).toFixed(1))
      }));
    } else if (selectedDatasetKey === "atmospheric") {
      baseData.data.metrics.vapor_pressure_deficit_kpa = parseFloat((baseData.data.metrics.vapor_pressure_deficit_kpa + (Math.random() * 0.1 - 0.05)).toFixed(2));
      baseData.data.metrics.ambient_temperature_c = parseFloat((baseData.data.metrics.ambient_temperature_c + (Math.random() * 0.6 - 0.3)).toFixed(1));
      baseData.data.metrics.relative_humidity_pct = parseFloat((baseData.data.metrics.relative_humidity_pct + (Math.random() * 2 - 1)).toFixed(1));
    } else if (selectedDatasetKey === "par") {
      baseData.data.reading.par_umol_m2_s = Math.round(baseData.data.reading.par_umol_m2_s + (Math.random() * 40 - 20));
      baseData.data.reading.lux = Math.round(baseData.data.reading.lux + (Math.random() * 1000 - 500));
    }

    setTimeout(() => {
      setDisplayedResponse(JSON.stringify(baseData, null, 2));
      setIsRunning(false);
    }, 800);
  };

  const copyToClipboard = () => {
    const code = datasets[selectedDatasetKey].request;
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fallbackPublications = [
    {
      title: "The Impact of Synthetic Microbiology on Corn Yield",
      author: "Dr. Elena Vos",
      affiliation: "Wageningen Ag",
      metric: "Microbial Biomass"
    },
    {
      title: "Predictive Vapor Pressure Deficit Models",
      author: "Prof. Marcus Chen",
      affiliation: "UC Davis",
      metric: "Transpiration Rate"
    },
    {
      title: "Nitrogen Volatilization in Semi-Arid Climates",
      author: "Dr. Sarah Thompson",
      affiliation: "AetherAg Lab",
      metric: "N2O Flux"
    },
    {
      title: "Remote Sensing of Early-Stage Chlorosis",
      author: "Liam O'Connor",
      affiliation: "University of Sydney",
      metric: "Hyperspectral Index"
    }
  ];

  const [publications, setPublications] = useState(fallbackPublications);

  useEffect(() => {
    async function fetchPublications() {
      try {
        const { data, error } = await supabase
          .from("publications")
          .select("title, author, affiliation, metric");
        if (error) throw error;
        if (data && data.length > 0) {
          setPublications(data);
        }
      } catch (err) {
        console.error("Failed to fetch publications from Supabase:", err);
      }
    }
    fetchPublications();
  }, []);

  const filteredPublications = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.metric.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Section 1: Hero */}
      <section className="reveal-section relative min-h-[85vh] flex items-center overflow-hidden bg-surface-container-low py-16">
        <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-6 z-10 space-y-8 text-left">
            <div className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-label-sm uppercase tracking-widest rounded-sm">
              Research &amp; Development
            </div>
            <h1 className="font-display text-display-lg md:text-[64px] leading-tight text-on-surface">
              Agronomic Science, <br />Calculated.
            </h1>
            <p className="text-body-md text-on-surface-variant max-w-lg leading-relaxed">
              Precision biomorphic modeling at the intersection of genetic potential and environmental reality. We deploy high-fidelity sensor arrays to map the unseen pulse of the field.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => {
                  const el = document.getElementById("developer-api-sandbox");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label text-label-md uppercase tracking-widest hover:bg-secondary transition-all duration-300 flex items-center gap-2"
              >
                Explore API Reference
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("publications-database");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-outline text-primary px-8 py-4 rounded-lg font-label text-label-md uppercase tracking-widest hover:bg-surface-container transition-all duration-300"
              >
                Download Whitepaper Index
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
            <div className="absolute inset-0 bg-secondary/5 rounded-xl rotate-3 scale-95 translate-x-4"></div>
            <img 
              alt="Soybean leaf macro detailing vascular structures" 
              className="w-full h-full object-cover rounded-xl shadow-2xl z-0" 
              src="/research-image.png"
            />
          </div>
        </div>
        {/* Atmospheric Decor */}
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
      </section>

      {/* Section 2: Core Agronomic Models */}
      <section className="reveal-section py-24 bg-surface">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-outline-variant pb-8 text-left">
            <div className="space-y-2">
              <h2 className="font-display text-headline-md text-primary">Core Agronomic Models</h2>
              <p className="text-label-md text-on-surface-variant uppercase tracking-widest">NUE, Flux, and Microbiome Dynamics</p>
            </div>
            <div className="mt-4 md:mt-0 text-secondary font-medium flex items-center gap-2 cursor-pointer group">
              View Methodology Documentation
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">trending_flat</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Model Card 1 */}
            <div className="bg-surface-container p-10 rounded-xl hover:bg-surface-container-high transition-all duration-300 group border border-transparent hover:border-outline-variant">
              <div className="w-12 h-12 bg-on-primary-fixed rounded-lg flex items-center justify-center text-on-primary mb-8 group-hover:bg-secondary transition-colors">
                <span className="material-symbols-outlined">biotech</span>
              </div>
              <h3 className="font-headline text-headline-sm mb-4">Nitrogen Uptake Efficiency</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                Advanced telemetry analyzing the metabolic pathway of nitrogen assimilation in C3 and C4 cultivars relative to soil moisture saturation gradients.
              </p>
              <div className="text-label-sm font-bold text-secondary flex items-center gap-2">
                ACCURACY SCORE: 98.4%
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>
            {/* Model Card 2 */}
            <div className="bg-surface-container p-10 rounded-xl hover:bg-surface-container-high transition-all duration-300 group border border-transparent hover:border-outline-variant">
              <div className="w-12 h-12 bg-on-primary-fixed rounded-lg flex items-center justify-center text-on-primary mb-8 group-hover:bg-secondary transition-colors">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <h3 className="font-headline text-headline-sm mb-4">Biomorphic Transpiration Flux</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                Real-time modeling of stomatal conductance and sap flow dynamics. Predicting wilt point thresholds under extreme atmospheric thermal stress.
              </p>
              <div className="text-label-sm font-bold text-secondary flex items-center gap-2">
                LATENCY: &lt; 50MS
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
            </div>
            {/* Model Card 3 */}
            <div className="bg-surface-container p-10 rounded-xl hover:bg-surface-container-high transition-all duration-300 group border border-transparent hover:border-outline-variant">
              <div className="w-12 h-12 bg-on-primary-fixed rounded-lg flex items-center justify-center text-on-primary mb-8 group-hover:bg-secondary transition-colors">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h3 className="font-headline text-headline-sm mb-4">Microbiome Dynamics Analysis</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                Sub-surface soil health indexing based on fungal-to-bacterial ratios and nutrient mineralization rates across diverse soil horizons.
              </p>
              <div className="text-label-sm font-bold text-secondary flex items-center gap-2">
                SAMPLES: 4.2M+
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Publications & Whitepapers */}
      <section id="publications-database" className="reveal-section py-24 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <h2 className="font-display text-headline-md mb-12 text-center">Scientific Publications &amp; Whitepapers</h2>
          
          {/* Real-time search/filter inputs */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by title, author, or metric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary rounded-lg px-4 py-2.5 text-sm pl-10 outline-none transition-colors"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-sm">search</span>
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs text-secondary hover:underline cursor-pointer font-semibold uppercase tracking-wider"
              >
                Clear Search
              </button>
            )}
          </div>

          <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-outline-variant max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary-container text-on-primary-container border-b border-outline">
                    <th className="p-6 font-label text-label-md uppercase tracking-wider">Document Title</th>
                    <th className="p-6 font-label text-label-md uppercase tracking-wider">Lead Author</th>
                    <th className="p-6 font-label text-label-md uppercase tracking-wider">Affiliation</th>
                    <th className="p-6 font-label text-label-md uppercase tracking-wider">Metric Tested</th>
                    <th className="p-6 font-label text-label-md uppercase tracking-wider text-right">Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredPublications.length > 0 ? (
                    filteredPublications.map((pub, index) => (
                      <tr key={index} className="hover:bg-surface-container-lowest transition-colors duration-200">
                        <td className="p-6 text-body-md font-semibold">{pub.title}</td>
                        <td className="p-6 text-body-md text-on-surface-variant">{pub.author}</td>
                        <td className="p-6 text-body-md text-on-surface-variant">{pub.affiliation}</td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-label-sm whitespace-nowrap">
                            {pub.metric}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <a className="text-secondary font-bold hover:underline inline-flex items-center justify-end gap-1" href="#download">
                            PDF <span className="material-symbols-outlined text-[18px]">download</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-on-surface-variant font-body-md">
                        No publications matched "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Developer API Sandbox */}
      <section id="developer-api-sandbox" className="reveal-section py-24 bg-inverse-surface text-inverse-on-surface overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto px-gutter text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-headline-md mb-6">Developer API Sandbox</h2>
              <p className="text-body-md text-primary-fixed-dim leading-relaxed mb-10">
                Our Flux API provides direct endpoints for real-time agronomic telemetry. Authenticate via OAuth 2.0 and request filtered payloads optimized for large-scale integration.
              </p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-label-md uppercase tracking-wider text-primary-fixed block">Active Dataset Parameter</label>
                  <select 
                    value={selectedDatasetKey}
                    onChange={handleDatasetChange}
                    className="w-full bg-surface-container-highest/10 border border-outline rounded-lg p-3 text-white focus:border-secondary focus:ring-0 transition-colors cursor-pointer outline-none"
                  >
                    <option className="bg-inverse-surface text-inverse-on-surface" value="soil">Soil telemetry (volumetric water content)</option>
                    <option className="bg-inverse-surface text-inverse-on-surface" value="atmospheric">Atmospheric stress (VPD / thermal load)</option>
                    <option className="bg-inverse-surface text-inverse-on-surface" value="par">Photosynthetic Active Radiation (PAR)</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={runTestRequest}
                    disabled={isRunning}
                    className="bg-secondary text-on-secondary px-6 py-3 rounded-lg text-label-md uppercase tracking-widest font-bold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isRunning ? "Requesting..." : "Run Test Request"}
                  </button>
                  <button className="border border-outline text-inverse-on-surface px-6 py-3 rounded-lg text-label-md uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer">
                    Docs Reference
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Terminal UI */}
              <div className="bg-black/40 rounded-xl border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    <span className="ml-4 text-[11px] font-mono text-white/30 uppercase tracking-widest">
                      aetherag-shell — flux-api/v2
                    </span>
                  </div>
                  {/* Clipboard copy button */}
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-[11px] font-mono text-white/40 hover:text-white/80 cursor-pointer bg-white/5 px-2.5 py-1 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">
                      {isCopied ? "check" : "content_copy"}
                    </span>
                    <span>{isCopied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="text-secondary-fixed mb-4"># Terminal cURL request</div>
                  <div className="text-primary-fixed mb-6 whitespace-pre-wrap select-all">
                    $ {datasets[selectedDatasetKey].request}
                  </div>
                  <div className="text-secondary-fixed mb-4"># JSON Response Payload</div>
                  <pre 
                    className={`text-tertiary-fixed-dim whitespace-pre-wrap transition-opacity duration-300 ${
                      isRunning ? "opacity-30" : "opacity-100 animate-pulse-slow"
                    }`}
                  >
                    {displayedResponse}
                  </pre>
                </div>
              </div>
              {/* Floating graphic */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-secondary/20 blur-[60px] rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-[1280px] mx-auto gap-8 text-left">
          <div className="flex flex-col gap-2">
            <div className="font-headline text-headline-sm text-primary">AetherAg</div>
            <p className="font-body text-label-sm text-on-surface-variant">© 2026 AetherAg Precision Systems. All Rights Reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8">
            <a className="font-body text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#ethics">Ethics Statement</a>
            <a className="font-body text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#privacy">Data Privacy</a>
            <a className="font-body text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#terms">Terms of Service</a>
            <a className="font-body text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#contact">Contact</a>
            <a className="font-body text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#support">Support</a>
          </nav>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">language</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">terminal</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">help_outline</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
