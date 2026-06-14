import { useState } from "react";

export default function Modules() {
  // Soil Diagnostics Card State
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState({
    confidence: 88,
    nitrogen: "142 kg/ha",
    moisture: "34.2%",
    pH: "6.8",
  });

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        confidence: Math.floor(Math.random() * 8) + 88, // 88 - 95
        nitrogen: `${Math.floor(Math.random() * 20) + 130} kg/ha`,
        moisture: `${(Math.random() * 5 + 32).toFixed(1)}%`,
        pH: (Math.random() * 0.4 + 6.6).toFixed(1),
      });
    }, 1800);
  };

  // Yield Forecasting Card State
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [forecastYear, setForecastYear] = useState(2026);
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
    { id: 1, x: "30%", y: "40%", title: "Stomata Density", desc: "94.2% - Optimal transpiration index" },
    { id: 2, x: "70%", y: "65%", title: "Vein Health", desc: "Uniform fluid transport, 0% chlorosis" },
    { id: 3, x: "50%", y: "25%", title: "Hydration Status", desc: "89% relative turgidity" },
  ];

  return (
    <section id="platform" className="py-xl max-w-container-max mx-auto px-12">
      <div className="flex justify-between items-end mb-lg reveal">
        <div>
          <span className="font-label-md text-label-md text-secondary tracking-widest uppercase block mb-base">
            The Toolkit
          </span>
          <h2 className="font-headline-md text-headline-md text-primary">
            Integrated Intelligence Modules
          </h2>
        </div>
        <a
          className="hidden md:flex items-center gap-xs font-label-md text-label-md text-primary hover:translate-x-1 transition-all"
          href="#all-modules"
        >
          View All Modules{" "}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {/* Soil Health Card (Interactive Sensor Simulator) */}
        <div className="group bg-surface-container-high p-lg border border-outline-variant hover:border-secondary transition-all duration-300 flex flex-col justify-between reveal">
          <div>
            <div className="flex justify-between items-start mb-md">
              <span className="material-symbols-outlined text-primary text-3xl">eco</span>
              <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-DEFAULT text-[10px] font-bold uppercase tracking-wider">
                Telemetry
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-base text-primary">Soil Diagnostics</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              Real-time microbiome and nutrient density monitoring with sub-centimeter accuracy across thousands of hectares.
            </p>

            {/* Micro scan readings panel */}
            <div className="bg-surface-container-highest p-3 rounded-DEFAULT border border-outline-variant grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="text-on-surface-variant text-[9px] uppercase tracking-wider">Nitrogen</p>
                <p className={`font-semibold text-primary mt-0.5 ${isScanning ? "animate-pulse" : ""}`}>
                  {isScanning ? "..." : scanResult.nitrogen}
                </p>
              </div>
              <div>
                <p className="text-on-surface-variant text-[9px] uppercase tracking-wider">Moisture</p>
                <p className={`font-semibold text-primary mt-0.5 ${isScanning ? "animate-pulse" : ""}`}>
                  {isScanning ? "..." : scanResult.moisture}
                </p>
              </div>
              <div>
                <p className="text-on-surface-variant text-[9px] uppercase tracking-wider">pH Level</p>
                <p className={`font-semibold text-primary mt-0.5 ${isScanning ? "animate-pulse" : ""}`}>
                  {isScanning ? "..." : scanResult.pH}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-md">
            <div className="h-1 w-full bg-surface-container-highest mb-xs relative">
              <div
                style={{ width: `${scanResult.confidence}%` }}
                className={`h-full bg-secondary transition-all duration-[1500ms] ease-out ${
                  isScanning ? "w-[20%] animate-pulse bg-secondary-fixed" : ""
                }`}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Optimal Range: {scanResult.confidence}% Confidence
              </span>
              <button
                onClick={triggerScan}
                disabled={isScanning}
                className="text-secondary font-label-md text-label-md hover:underline cursor-pointer disabled:text-outline disabled:no-underline flex items-center gap-xs"
              >
                {isScanning ? "Scanning..." : "Scan Field"}
                <span className={`material-symbols-outlined text-sm ${isScanning ? "animate-spin" : ""}`}>
                  sync
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Crop Yield Card (Interactive Dashboard Simulator) */}
        <div className="group bg-primary text-on-primary p-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden reveal">
          <div className="z-10">
            <span className="material-symbols-outlined text-on-primary text-3xl mb-md block">analytics</span>
            <h3 className="font-headline-sm text-headline-sm mb-base text-white">Yield Forecasting</h3>
            
            {!dashboardOpen ? (
              <p className="font-body-md text-body-md opacity-80">
                Advanced algorithmic modeling predicting harvest quality and quantity using multi-spectral atmospheric data.
              </p>
            ) : (
              <div className="mt-xs bg-primary-container border border-on-primary-container/10 p-3 rounded-DEFAULT flex flex-col gap-2">
                <div className="flex justify-between items-center pb-1 border-b border-on-primary-container/20">
                  <span className="text-[10px] uppercase tracking-widest text-on-primary-container font-semibold">
                    Simulated Analytics
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setForecastYear(2026)}
                      className={`text-[9px] px-1.5 py-0.5 rounded-DEFAULT font-bold transition-all ${
                        forecastYear === 2026 ? "bg-secondary text-white" : "bg-surface-container-highest text-primary-fixed-dim"
                      }`}
                    >
                      2026
                    </button>
                    <button
                      onClick={() => setForecastYear(2027)}
                      className={`text-[9px] px-1.5 py-0.5 rounded-DEFAULT font-bold transition-all ${
                        forecastYear === 2027 ? "bg-secondary text-white" : "bg-surface-container-highest text-primary-fixed-dim"
                      }`}
                    >
                      2027 (Proj)
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  {telemetryStats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-[8px] uppercase tracking-wider text-on-primary-container">{stat.label}</p>
                      <p className="font-bold text-xs text-white mt-0.5">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-md z-10 flex justify-between items-center">
            <button
              onClick={() => setDashboardOpen(!dashboardOpen)}
              className="flex items-center gap-base font-label-md text-label-md border-b border-on-primary/20 pb-1 w-fit hover:border-on-primary transition-all text-white cursor-pointer"
            >
              {dashboardOpen ? "Show Description" : "Launch Dashboard"}
            </button>
          </div>

          {/* Decorative background leaf structure */}
          <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.07] text-white text-[200px] select-none pointer-events-none material-symbols-outlined">
            eco
          </div>
        </div>

        {/* Research Data Card (Interactive Hotspots) */}
        <div className="group bg-surface-container-high p-lg border border-outline-variant hover:border-secondary transition-all duration-300 flex flex-col justify-between reveal">
          <div className="relative overflow-hidden mb-md h-32 w-full">
            <img
              alt="Lush foliage top view"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzw6Lk9lUnm97JEM4vPnuJ9KAKPOSeWjaLr2NTdiNgVB4IXUc3bt0HydV7PkH6Tdl2c67J9-suk_DJpIVDwMhjQ4XFRCiTBVdiDYoIvl-ADWGhzZpFwmSt7ZrZZVjiPgdJzCtudqL-CK6S7DJMksTb4ZzeDnRHX1jCy2QQxufxBm8Ekyk8KcpZwxCjD84HShD565bTQRVYiyW3fsHoiArYWaX_62_wKCuaUy5jpT4YCkDUKZsFh1F3pp_PT7J2zpdJT31Ki6pmqak"
            />
            {/* Interactive Hotspots Overlay */}
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                style={{ left: spot.x, top: spot.y }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                className="absolute w-3.5 h-3.5 bg-secondary border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer shadow-md hover:scale-125 transition-transform"
                aria-label={`Hotspot ${spot.id}`}
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute"></span>
              </button>
            ))}

            {/* Hotspot details overlay */}
            {activeHotspot !== null && (
              <div className="absolute inset-x-2 bottom-2 bg-surface-container-highest/95 backdrop-blur-sm p-2 rounded-DEFAULT border border-outline-variant shadow-md text-xs transition-opacity duration-300">
                <p className="font-semibold text-secondary">
                  {hotspots.find((h) => h.id === activeHotspot)?.title}
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  {hotspots.find((h) => h.id === activeHotspot)?.desc}
                </p>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm mb-base text-primary">Biomorphic R&D</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Collaborative portal for research teams to sync observational data with automated system telemetry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
