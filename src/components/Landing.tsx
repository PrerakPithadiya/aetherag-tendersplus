import React, { useState } from "react";

export default function Landing() {
  const [farmSize, setFarmSize] = useState(2500);

  // ROI calculation logic matching the Stitch template
  const baseBoost = 25.00;
  const extra = (farmSize / 10000) * 15;
  const projectedBoost = (baseBoost + extra).toFixed(2);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFarmSize(parseInt(e.target.value, 10));
  };

  const handleRestrictedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = "#/login";
  };

  return (
    <div className="bg-background text-on-surface">
      {/* Navigation Header */}
      <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant backdrop-blur-md bg-opacity-90">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-[1280px] mx-auto">
          <div className="font-headline text-headline-sm font-bold text-primary select-none">
            AetherAg TendersPlus
          </div>
          <div className="hidden md:flex gap-8 items-center font-body text-body-md">
            <a
              onClick={handleRestrictedClick}
              className="text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              href="#/login"
            >
              Platform
            </a>
            <a
              onClick={handleRestrictedClick}
              className="text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              href="#/login"
            >
              Precision Data
            </a>
            <a
              onClick={handleRestrictedClick}
              className="text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              href="#/login"
            >
              Stewardship
            </a>
            <a
              onClick={handleRestrictedClick}
              className="text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              href="#/login"
            >
              Research
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              className="hidden sm:block font-label text-label-md text-on-surface-variant hover:text-primary px-4 py-2"
              href="#/login"
            >
              Log In
            </a>
            <a
              className="bg-primary text-on-primary px-6 py-2.5 rounded-DEFAULT font-label text-label-md hover:opacity-80 transition-opacity text-center block"
              href="#/signup"
            >
              Join TendersPlus
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[700px] md:min-h-[850px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
            <img
              className="w-full h-full object-cover"
              alt="High-end cinematic wide shot of a vast, futuristic agricultural field at dawn"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXjabVxpSiyk6iMAI7-iHp9rTnHSWbgSx-xquDM5OX6saVCB_1wj8Bj25P2RbpOR2_XHMiue78j55ZQI9knlp83bVahkEHCojrLWmwpqwSJHuAFhpeiSE3plbTTMXVKoOUcZTt293Nnt0hD0YEvfHEpMunIlRFf45YA95vCWGgZWaYVi95TwmSZcFyKYlw2T5JZCDH0D-PBpOqauWEgkh4EVtRFaqZGUcHIPAl_jCjGvCR938Cpn3yT8kVp1GV0fa_ZT0jLcyvVbk"
            />
          </div>
          <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl text-left">
              <span className="font-label text-label-md uppercase tracking-[0.2em] text-secondary mb-4 block">
                Pioneering the Future
              </span>
              <h1 className="text-4xl md:text-6xl font-headline mb-8 text-primary leading-tight">
                The New Standard in Agriscience Tendering
              </h1>
              <p className="text-body-lg text-on-surface-variant mb-10 max-w-xl">
                AetherAg TendersPlus bridges the gap between field-level precision and global market liquidity. Deploy advanced bidding algorithms backed by real-time soil telemetry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#/signup"
                  className="bg-primary text-on-primary px-8 py-4 rounded-DEFAULT font-label text-label-md hover:opacity-90 transition-all flex items-center justify-center gap-2 text-center"
                >
                  Join TendersPlus{" "}
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </a>
                <a
                  href="#/login"
                  className="border border-primary text-primary px-8 py-4 rounded-DEFAULT font-label text-label-md hover:bg-primary hover:text-on-primary transition-all text-center"
                >
                  Request Private Demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Metrics */}
        <section className="py-20 bg-surface-container-low border-b border-outline-variant">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-5xl font-headline mb-2 text-primary">
                  4.2M
                </div>
                <div className="font-label text-label-md text-secondary uppercase tracking-widest">
                  Hectares Monitored
                </div>
              </div>
              <div>
                <div className="text-5xl font-headline mb-2 text-primary">
                  $2.4B
                </div>
                <div className="font-label text-label-md text-secondary uppercase tracking-widest">
                  Bidding Volume
                </div>
              </div>
              <div>
                <div className="text-5xl font-headline mb-2 text-primary">
                  98%
                </div>
                <div className="font-label text-label-md text-secondary uppercase tracking-widest">
                  Yield Accuracy
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-28 px-6 md:px-12 max-w-[1280px] mx-auto">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline mb-6 text-primary">
              Our Foundational Ecosystem
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Sophisticated technology meets organic stewardship. We provide the infrastructure for the next generation of sustainable ag-trading.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Precision Stewardship */}
            <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant hover:border-secondary transition-colors group text-left">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">
                eco
              </span>
              <h3 className="text-2xl font-headline mb-4 text-primary">
                Precision Stewardship
              </h3>
              <p className="text-body-md text-on-surface-variant mb-6">
                Carbon-sequestering protocols integrated directly into the tender bidding process, ensuring sustainability is profitable.
              </p>
              <ul className="space-y-3 font-label text-label-md text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    check_circle
                  </span>{" "}
                  Regenerative Validation
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    check_circle
                  </span>{" "}
                  Automated ESG Reporting
                </li>
              </ul>
            </div>

            {/* Trader Bidding Portal */}
            <div className="bg-primary text-on-primary p-8 rounded-lg shadow-2xl relative overflow-hidden group text-left">
              <div className="absolute -right-8 -top-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[160px]">
                  insights
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6">
                payments
              </span>
              <h3 className="text-2xl font-headline mb-4">
                Trader Bidding Portal
              </h3>
              <p className="text-primary-fixed-dim text-body-md mb-6">
                High-frequency trading for bulk ag-commodities with micro-tiering capabilities for niche organic yields.
              </p>
              <a
                href="#/signup"
                className="bg-secondary text-on-secondary px-6 py-3 rounded-DEFAULT font-label text-label-md hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors text-center inline-block"
              >
                Explore Markets
              </a>
            </div>

            {/* Ecosystem Intelligence */}
            <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant hover:border-secondary transition-colors group text-left">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">
                query_stats
              </span>
              <h3 className="text-2xl font-headline mb-4 text-primary">
                Ecosystem Intelligence
              </h3>
              <p className="text-body-md text-on-surface-variant mb-6">
                Proprietary satellite and ground-sensor data fused into a single predictive dashboard for global crop forecasting.
              </p>
              <div className="mt-4 p-4 bg-surface-container-high rounded-DEFAULT">
                <div className="h-1 w-full bg-outline-variant rounded-full mb-2 overflow-hidden">
                  <div className="h-full bg-secondary w-3/4"></div>
                </div>
                <div className="flex justify-between font-label text-[10px] uppercase tracking-tighter text-on-surface-variant">
                  <span>Forecasting confidence</span>
                  <span>92.4%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restricted Access Teaser */}
        <section className="py-24 bg-primary text-on-primary overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div 
                className="p-8 rounded-lg relative z-10 shadow-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="blur-md pointer-events-none select-none">
                  <div className="flex justify-between mb-8">
                    <div className="w-32 h-8 bg-on-primary/10 rounded"></div>
                    <div className="w-24 h-8 bg-on-primary/10 rounded"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-40 bg-on-primary/5 rounded-DEFAULT border border-white/10"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 bg-on-primary/5 rounded-DEFAULT border border-white/10"></div>
                      <div className="h-20 bg-on-primary/5 rounded-DEFAULT border border-white/10"></div>
                      <div className="h-20 bg-on-primary/5 rounded-DEFAULT border border-white/10"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20">
                  <span className="material-symbols-outlined text-6xl mb-4 text-secondary-fixed">
                    lock
                  </span>
                  <h4 className="text-2xl font-headline mb-2">
                    Member Insights Only
                  </h4>
                  <p className="text-body-md text-primary-fixed max-w-xs mx-auto mb-6">
                    Register to access live telemetry and the global trading terminal.
                  </p>
                  <a
                    href="#/signup"
                    className="bg-secondary text-on-secondary px-8 py-3 rounded-DEFAULT font-label text-label-md hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors text-center block"
                  >
                    Sign Up for Full Access
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-5xl font-headline mb-8 leading-tight">
                Elite data for institutional grade farming.
              </h2>
              <p className="text-body-lg text-primary-fixed-dim mb-10">
                Gain access to active bidding status, sensor telemetry, and live global agriscience analytics. Our platform handles the complexity of international logistics and regulatory compliance in real-time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl">
                    sensors
                  </span>
                  <div>
                    <div className="font-label text-label-md text-on-primary font-bold">
                      Real-time Telemetry
                    </div>
                    <div className="text-body-md text-primary-fixed-dim">
                      Every field, every sensor, synced instantly.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl">
                    bid_landscape
                  </span>
                  <div>
                    <div className="font-label text-label-md text-on-primary font-bold">
                      Liquidity Pools
                    </div>
                    <div className="text-body-md text-primary-fixed-dim">
                      Direct access to institutional bidders.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Interactive Tool */}
        <section className="py-28 bg-background">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-headline mb-6 text-primary">
              Calculate Your Potential Efficiency Gain
            </h2>
            <p className="text-body-md text-on-surface-variant mb-12">
              Select your farm size and see how precision stewardship and market optimization can impact your yearly bottom line.
            </p>
            <div className="bg-surface-container-low p-8 md:p-10 rounded-lg border border-outline-variant shadow-sm text-left">
              <label
                className="font-label text-label-md uppercase tracking-wider text-on-surface-variant block mb-4"
                htmlFor="farm-size"
              >
                Total Hectares
              </label>
              <input
                className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-secondary mb-12"
                id="farm-size"
                max="10000"
                min="100"
                step="100"
                type="range"
                value={farmSize}
                onChange={handleSliderChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div>
                  <div className="font-label text-label-md text-on-surface-variant mb-1">
                    Current Output (Est.)
                  </div>
                  <div className="text-3xl font-headline text-primary">
                    {farmSize.toLocaleString()} Hectares
                  </div>
                </div>
                <div className="p-6 bg-secondary-container rounded-lg border border-secondary/20">
                  <div className="font-label text-label-md text-on-secondary-container mb-1">
                    Projected Yearly Yield Boost
                  </div>
                  <div className="text-4xl font-headline text-on-secondary-container">
                    {projectedBoost}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative overflow-hidden bg-surface-container-low">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-10"
              alt="Abstract overhead image of plant species reflecting a premium agritech brand"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC0ezKtrL7BouRdSrC8z-kXuQPnk6F-bWKokyfmBybBEMn8hfqhZ9XufLjj3jHorGdnNTloVXs_Qk849OfhojqAztZC-aTRLcNcUwIZYqL8QgzOZU0DJUfjT1CiYyiVe_vIYmOKdSBCtmTnwrdZ2itSDvv7N417IDHcoPzeJjSZhfE6Qkfj07PSVSEnaIcG3_s4bC4i5Z2iE4t8vs88zAkmm1IVzxb7LHHdzyL-G2MTKL8PysEMvdtVswkAqPWsAL-ieiUAwKCsew"
            />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-headline mb-8 max-w-4xl mx-auto text-primary">
              Ready to evolve your agricultural operations?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="#/signup"
                className="bg-primary text-on-primary px-10 py-5 rounded-DEFAULT font-label text-label-md hover:scale-105 transition-transform shadow-xl text-center inline-block"
              >
                Join TendersPlus Today
              </a>
              <a
                href="#/login"
                className="border border-outline text-primary px-10 py-5 rounded-DEFAULT font-label text-label-md hover:bg-surface-variant transition-colors text-center inline-block"
              >
                Request Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-16 text-left">
            <div className="max-w-sm">
              <div className="font-headline text-headline-sm text-primary mb-6">
                AetherAg TendersPlus
              </div>
              <p className="text-body-md text-on-surface-variant">
                The intersection of earth-bound wisdom and future-facing intelligence. For the growers who demand more.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="space-y-4">
                <div className="font-label text-label-md uppercase tracking-widest text-primary font-bold">
                  Platform
                </div>
                <ul className="space-y-2 text-body-md text-on-surface-variant">
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Marketplace
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Bidding Rules
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Telemetry APIs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="font-label text-label-md uppercase tracking-widest text-primary font-bold">
                  Company
                </div>
                <ul className="space-y-2 text-body-md text-on-surface-variant">
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Ethics
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="font-label text-label-md uppercase tracking-widest text-primary font-bold">
                  Legal
                </div>
                <ul className="space-y-2 text-body-md text-on-surface-variant">
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Sustainability Report
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="font-label text-label-md uppercase tracking-widest text-primary font-bold">
                  Connect
                </div>
                <ul className="space-y-2 text-body-md text-on-surface-variant">
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary" href="#/login">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-label-md text-on-surface-variant">
            <span>
              © 2026 AetherAg TendersPlus. All rights reserved. Precision in every field.
            </span>
            <div className="flex gap-6">
              <a className="hover:text-secondary underline decoration-secondary" href="#/login">
                Terms
              </a>
              <a className="hover:text-secondary underline decoration-secondary" href="#/login">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
