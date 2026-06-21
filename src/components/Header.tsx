import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthProvider";

export default function Header() {
  const { user, signOut } = useAuth();
  const userInitial = user?.email?.charAt(0).toUpperCase() || "";
  const userName = user?.user_metadata?.full_name || user?.email || "";

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

        <div className="hidden md:flex items-center gap-base">
          {user ? (
            <div className="flex items-center gap-base">
              <div className="flex items-center gap-2 py-1 px-3 bg-surface-container rounded-full border border-outline-variant/30">
                <div className="h-7 w-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs uppercase font-label">
                  {userInitial}
                </div>
                <span className="font-label text-label-md text-on-surface truncate max-w-[120px] select-none" title={userName}>
                  {userName}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors cursor-pointer border-0 bg-transparent pl-2"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <a
                href="#/login"
                className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors mr-md"
              >
                Log In
              </a>
              <a
                href="#/signup"
                className="bg-primary text-on-primary px-6 py-2 rounded-DEFAULT font-label-md text-label-md hover:opacity-80 transition-opacity cursor-pointer border-0 block text-center"
              >
                {isTrader ? "Get Free Trial" : "Sign Up"}
              </a>
            </>
          )}
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
              {user ? (
                <div className="flex flex-col gap-2 mt-auto pb-12">
                  <div className="py-2.5 px-4 bg-surface-container rounded-lg flex items-center gap-3 border border-outline-variant/30">
                    <div className="h-8 w-8 bg-secondary text-on-secondary rounded-full flex items-center justify-center font-bold text-xs uppercase">
                      {userInitial}
                    </div>
                    <span className="font-body text-body-md text-on-surface truncate">{userName}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-error text-on-error py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full cursor-pointer border-0"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-auto pb-12">
                  <a
                    href="#/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="border border-primary text-primary py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full block transition-colors bg-transparent"
                  >
                    Log In
                  </a>
                  <a
                    href="#/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-primary text-on-primary py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full block hover:opacity-90 transition-opacity"
                  >
                    Get Free Trial
                  </a>
                </div>
              )}
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
              {user ? (
                <div className="flex flex-col gap-2 mt-auto pb-12">
                  <div className="py-2.5 px-4 bg-surface-container rounded-lg flex items-center gap-3 border border-outline-variant/30">
                    <div className="h-8 w-8 bg-secondary text-on-secondary rounded-full flex items-center justify-center font-bold text-xs uppercase">
                      {userInitial}
                    </div>
                    <span className="font-body text-body-md text-on-surface truncate">{userName}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-error text-on-error py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full cursor-pointer border-0"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-auto pb-12">
                  <a
                    href="#/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="border border-primary text-primary py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full block transition-colors bg-transparent"
                  >
                    Log In
                  </a>
                  <a
                    href="#/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-primary text-on-primary py-3 rounded-DEFAULT font-label-md text-[14px] text-center w-full block hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
