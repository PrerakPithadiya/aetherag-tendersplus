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
          <span className="text-headline-sm font-headline-sm font-bold tracking-tighter text-primary">AetherAg</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-lg">
          <a
            className={`${
              !isEnterprise && activeSection === "stewardship"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
            } font-label-md text-label-md transition-all duration-300`}
            href="#stewardship"
          >
            Stewardship
          </a>
          <a
            className={`${
              !isEnterprise && activeSection === "platform"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
            } font-label-md text-label-md transition-all duration-300`}
            href="#platform"
          >
            Platform
          </a>
          <a
            className={`${
              !isEnterprise && activeSection === "research"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
            } font-label-md text-label-md transition-all duration-300`}
            href="#research"
          >
            Research
          </a>
          <a
            className={`${
              isEnterprise || (!isEnterprise && activeSection === "precision-data")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary pb-1 border-b-2 border-transparent"
            } font-label-md text-label-md transition-all duration-300`}
            href="#/enterprise"
          >
            Precision Data
          </a>
        </div>

        <div className="hidden md:block">
          <button className="bg-primary text-on-primary px-6 py-2 rounded-DEFAULT font-label-md text-label-md hover:opacity-80 transition-opacity cursor-pointer">
            Get Started
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
          <a
            onClick={() => setMobileMenuOpen(false)}
            className={`${
              !isEnterprise && activeSection === "stewardship" ? "text-primary" : "text-on-surface-variant hover:text-primary"
            } font-semibold text-lg py-2 border-b border-primary/5`}
            href="#stewardship"
          >
            Stewardship
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className={`${
              !isEnterprise && activeSection === "platform" ? "text-primary" : "text-on-surface-variant hover:text-primary"
            } font-semibold text-lg py-2 border-b border-primary/5`}
            href="#platform"
          >
            Platform
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className={`${
              !isEnterprise && activeSection === "research" ? "text-primary" : "text-on-surface-variant hover:text-primary"
            } font-semibold text-lg py-2 border-b border-primary/5`}
            href="#research"
          >
            Research
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className={`${
              isEnterprise || (!isEnterprise && activeSection === "precision-data") ? "text-primary" : "text-on-surface-variant hover:text-primary"
            } font-semibold text-lg py-2 border-b border-primary/5`}
            href="#/enterprise"
          >
            Precision Data
          </a>
          <button className="bg-primary text-on-primary mt-6 py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
