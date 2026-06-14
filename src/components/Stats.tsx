import { useState } from "react";

export default function Stats() {
  const [activeStat, setActiveStat] = useState<number | null>(null);

  const stats = [
    { value: "4.2M", label: "Hectares Monitored", detail: "Active sensor arrays across 6 continents" },
    { value: "0.05%", label: "Data Variance", detail: "Industry-leading precision calibrations" },
    { value: "24/7", label: "Real-time Telemetry", detail: "Continuous biomorphic monitoring" },
    { value: "180+", label: "Crop Variants", detail: "Custom models for localized growth" },
  ];

  return (
    <section id="precision-data" className="py-xl max-w-container-max mx-auto px-12 border-b border-outline-variant pb-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter reveal">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 p-4 rounded-DEFAULT cursor-pointer ${
              activeStat === idx ? "bg-surface-container-low" : "bg-transparent"
            }`}
            onMouseEnter={() => setActiveStat(idx)}
            onMouseLeave={() => setActiveStat(null)}
          >
            <span className="font-display-lg text-display-lg block mb-xs text-primary">
              {stat.value}
            </span>
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest block mb-1">
              {stat.label}
            </span>
            <p className={`font-body-md text-xs text-on-surface-variant transition-opacity duration-300 ${
              activeStat === idx ? "opacity-100" : "opacity-0 md:opacity-50"
            }`}>
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
