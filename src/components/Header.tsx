import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isEnterprise = hash.startsWith("#/enterprise") || hash === "#enterprise";
  const isPlatform = hash.startsWith("#/platform") || hash === "#platform";
  const isTrader = hash.startsWith("#/trader") || hash === "#trader";
  const isResearch = hash.startsWith("#/research") || hash === "#research";

  useEffect(() => {
    const handleScroll = () => {
      // Header py padding trigger
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scrollspy active section detection using viewport client rects
      const sections = ["stewardship", "platform", "research", "precision-data"];
      let currentActive = "";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Virtual trigger line at y = 250px from top of viewport
          if (rect.top <= 250 && rect.bottom >= 250) {
            currentActive = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <nav className="flex justify-between items-center w-full px-12 max-w-container-max mx-auto">
        <div className="flex items-center gap-base">
          <span className="text-headline-sm font-headline-sm font-bold tracking-tighter text-primary">
            {isTrader ? "TendersPlus" : "AetherAg"}
          </span>
        </div>

        {/* Desktop Menu */}
        {isTrader ? (
          <div className="hidden md:flex items-center gap-lg">
            <a
              className="text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent font-label-md text-label-md transition-all duration-300"
              href="#bidding-types"
            >
              Bidding Types
            </a>
            <a
              className="text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent font-label-md text-label-md transition-all duration-300"
              href="#bidding-process"
            >
              Bidding Process
            </a>
            <a
              className="text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent font-label-md text-label-md transition-all duration-300"
              href="#why-tendersplus"
            >
              Why TendersPlus
            </a>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-lg">
            <a
              className={`${
                !isEnterprise && !isPlatform && !isResearch && activeSection === "stewardship"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
              } font-label-md text-label-md transition-all duration-300`}
              href="#stewardship"
            >
              Stewardship
            </a>
            <a
              className={`${
                isPlatform
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
              } font-label-md text-label-md transition-all duration-300`}
              href="#/platform"
            >
              Platform
            </a>
            <a
              className={`${
                isResearch
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
              } font-label-md text-label-md transition-all duration-300`}
              href="#/research"
            >
              Research
            </a>
            <a
              className={`${
                isEnterprise
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
              } font-label-md text-label-md transition-all duration-300`}
              href="#/enterprise"
            >
              Precision Data
            </a>
          </div>
        )}

        <div className="hidden md:block">
          <button
            onClick={() => {
              const targetId = isTrader ? "contact-trader" : "contact";
              const el = document.getElementById(targetId);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.hash = isTrader ? "#/trader#contact-trader" : "#/enterprise#contact";
              }
            }}
            className="bg-primary text-on-primary px-6 py-2 rounded-DEFAULT font-label-md text-label-md hover:opacity-80 transition-opacity cursor-pointer border-0"
          >
            {isTrader ? "Get Free Trial" : "Get Started"}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-base">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary hover:text-secondary focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-surface border-b border-primary/10 transition-all duration-300 ease-in-out origin-top ${
          mobileMenuOpen ? "opacity-100 scale-y-100 h-screen" : "opacity-0 scale-y-0 h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col p-6 gap-md bg-surface h-full">
          {isTrader ? (
            <>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-on-surface-variant hover:text-primary font-semibold text-lg py-2 border-b border-primary/5"
                href="#bidding-types"
              >
                Bidding Types
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-on-surface-variant hover:text-primary font-semibold text-lg py-2 border-b border-primary/5"
                href="#bidding-process"
              >
                Bidding Process
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-on-surface-variant hover:text-primary font-semibold text-lg py-2 border-b border-primary/5"
                href="#why-tendersplus"
              >
                Why TendersPlus
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById("contact-trader");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.hash = "#/trader#contact-trader";
                  }
                }}
                className="bg-primary text-on-primary mt-6 py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full border-0 cursor-pointer"
              >
                Get Free Trial
              </button>
            </>
          ) : (
            <>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  !isEnterprise && !isPlatform && !isResearch && activeSection === "stewardship" ? "text-primary" : "text-on-surface-variant hover:text-primary"
                } font-semibold text-lg py-2 border-b border-primary/5`}
                href="#stewardship"
              >
                Stewardship
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isPlatform ? "text-primary" : "text-on-surface-variant hover:text-primary"
                } font-semibold text-lg py-2 border-b border-primary/5`}
                href="#/platform"
              >
                Platform
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isResearch ? "text-primary" : "text-on-surface-variant hover:text-primary"
                } font-semibold text-lg py-2 border-b border-primary/5`}
                href="#/research"
              >
                Research
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isEnterprise ? "text-primary" : "text-on-surface-variant hover:text-primary"
                } font-semibold text-lg py-2 border-b border-primary/5`}
                href="#/enterprise"
              >
                Precision Data
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById("contact");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.hash = "#/enterprise#contact";
                  }
                }}
                className="bg-primary text-on-primary mt-6 py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full border-0 cursor-pointer"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
