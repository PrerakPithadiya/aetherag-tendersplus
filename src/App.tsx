import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stewardship from "./components/Stewardship";
import Modules from "./components/Modules";
import VisualBreak from "./components/VisualBreak";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import Enterprise from "./components/Enterprise";
import Platform from "./components/Platform";
import Trader from "./components/Trader";
import Research from "./components/Research";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Terms from "./components/Terms";
import { AuthProvider, useAuth } from "./lib/AuthProvider";

function AppContent() {
  const { user, loading } = useAuth();
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  const scrollMemory = useRef<Record<number, number>>({ 0: 0 });
  const currentHistoryIndex = useRef<number>(0);
  const nextHistoryIndex = useRef<number>(1);
  const prevHash = useRef(window.location.hash);

  // Initialize scrollRestoration to manual so browser doesn't do jumpy native scrolling
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Initialize history state on mount
  useEffect(() => {
    const state = window.history.state;
    if (state && typeof state.index === "number") {
      currentHistoryIndex.current = state.index;
      nextHistoryIndex.current = state.index + 1;
    } else {
      window.history.replaceState({ index: 0 }, "");
      currentHistoryIndex.current = 0;
      nextHistoryIndex.current = 1;
    }
  }, []);

  // Listen to scroll events to record current scroll position
  useEffect(() => {
    const handleScroll = () => {
      const idx = currentHistoryIndex.current;
      scrollMemory.current[idx] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBaseRoute = (hash: string) => {
    if (hash.startsWith("#/enterprise") || hash === "#enterprise") return "enterprise";
    if (hash.startsWith("#/platform") || hash === "#platform") return "platform";
    if (hash.startsWith("#/trader") || hash === "#trader") return "trader";
    if (hash.startsWith("#/research") || hash === "#research") return "research";
    if (hash.startsWith("#/login") || hash === "#login") return "login";
    if (hash.startsWith("#/signup") || hash === "#signup") return "signup";
    if (hash.startsWith("#/terms") || hash === "#terms") return "terms";
    return "home";
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle route change and scroll restoration
  useEffect(() => {
    const oldHash = prevHash.current;
    const newHash = currentHash;
    prevHash.current = newHash;

    const oldBase = getBaseRoute(oldHash);
    const newBase = getBaseRoute(newHash);

    if (oldBase !== newBase) {
      const state = window.history.state;
      if (state && typeof state.index === "number") {
        // Back/Forward navigation
        const newIdx = state.index;
        currentHistoryIndex.current = newIdx;
        const targetScrollY = scrollMemory.current[newIdx] || 0;
        setTimeout(() => {
          window.scrollTo(0, targetScrollY);
        }, 50);
      } else {
        // New navigation
        const newIdx = nextHistoryIndex.current;
        nextHistoryIndex.current = newIdx + 1;
        currentHistoryIndex.current = newIdx;
        window.history.replaceState({ index: newIdx }, "");
        scrollMemory.current[newIdx] = 0;
        window.scrollTo(0, 0);
      }
    }
  }, [currentHash]);

  const isEnterpriseRoute =
    currentHash.startsWith("#/enterprise") ||
    currentHash === "#enterprise";

  const isPlatformRoute =
    currentHash.startsWith("#/platform") ||
    currentHash === "#platform";

  const isTraderRoute =
    currentHash.startsWith("#/trader") ||
    currentHash === "#trader";

  const isResearchRoute =
    currentHash.startsWith("#/research") ||
    currentHash === "#research";

  const isLoginRoute =
    currentHash.startsWith("#/login") ||
    currentHash === "#login";

  const isSignupRoute =
    currentHash.startsWith("#/signup") ||
    currentHash === "#signup";

  const isTermsRoute =
    currentHash.startsWith("#/terms") ||
    currentHash === "#terms";

  // Navigation guard
  useEffect(() => {
    if (loading) return;

    if (!user) {
      // If logged out, only allow login or signup routes. Anything else resets/keeps landing.
      if (isEnterpriseRoute || isPlatformRoute || isTraderRoute || isResearchRoute) {
        window.location.hash = "#/login";
      }
    } else {
      // If logged in, redirect away from login/signup to home dashboard
      if (isLoginRoute || isSignupRoute) {
        window.location.hash = "#";
      }
    }
  }, [user, loading, isEnterpriseRoute, isPlatformRoute, isTraderRoute, isResearchRoute, isLoginRoute, isSignupRoute]);

  useEffect(() => {
    if (!user || isLoginRoute || isSignupRoute || isEnterpriseRoute || isPlatformRoute || isTraderRoute || isResearchRoute || isTermsRoute) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px", // triggers slightly before entry
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    // Handle smooth scroll for anchor links
    if (currentHash) {
      const id = currentHash.replace("#/", "").replace("#", "");
      if (id && id !== "enterprise" && id !== "platform" && id !== "research" && id !== "login" && id !== "signup") {
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      }
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [user, isEnterpriseRoute, isPlatformRoute, isTraderRoute, isResearchRoute, isLoginRoute, isSignupRoute, currentHash]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center text-on-surface">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl animate-spin text-secondary">
            progress_activity
          </span>
          <span className="font-label text-label-md">Loading AetherAg TendersPlus...</span>
        </div>
      </div>
    );
  }

  // Unauthenticated layout
  if (!user) {
    if (isLoginRoute || isSignupRoute) {
      return (
        <div className="bg-background min-h-screen text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
          {isLoginRoute ? <Login /> : <Signup />}
        </div>
      );
    }
    if (isTermsRoute) {
      return (
        <div className="bg-background min-h-screen text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
          {/* Navigation Header */}
          <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant backdrop-blur-md bg-opacity-90">
            <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-[1280px] mx-auto">
              <div 
                className="font-headline text-headline-sm font-bold text-primary select-none cursor-pointer" 
                onClick={() => window.location.hash = "#"}
              >
                AetherAg TendersPlus
              </div>
              <div className="flex items-center gap-4">
                <a className="font-label text-label-md text-on-surface-variant hover:text-primary px-4 py-2" href="#/login">
                  Log In
                </a>
                <a className="bg-primary text-on-primary px-6 py-2.5 rounded-DEFAULT font-label text-label-md hover:opacity-80 transition-opacity text-center block" href="#/signup">
                  Join TendersPlus
                </a>
              </div>
            </nav>
          </header>
          <main className="py-12 px-6 max-w-[1280px] mx-auto md:px-12 min-h-[60vh]">
            <Terms />
          </main>
          {/* Simplified Footer */}
          <footer className="bg-surface-container-low border-t border-outline-variant py-8">
            <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-label-md text-on-surface-variant">
              <span>© 2026 AetherAg TendersPlus. All rights reserved.</span>
              <div className="flex gap-6 font-label-md">
                <a className="hover:text-secondary underline decoration-secondary" href="#/">Back to Home</a>
              </div>
            </div>
          </footer>
        </div>
      );
    }
    // Show Landing Page for all other routes
    return <Landing />;
  }

  // Authenticated layout
  return (
    <div className="bg-background min-h-screen text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <Header />
      <main className="pt-[80px] md:pt-[100px] overflow-hidden">
        {isTermsRoute ? (
          <div className="py-12 px-6 max-w-[1280px] mx-auto md:px-12">
            <Terms />
          </div>
        ) : isEnterpriseRoute ? (
          <Enterprise />
        ) : isPlatformRoute ? (
          <Platform />
        ) : isTraderRoute ? (
          <Trader />
        ) : isResearchRoute ? (
          <Research />
        ) : (
          <>
            <Hero />
            <div className="reveal">
              <Stewardship />
            </div>
            <div className="reveal">
              <Modules />
            </div>
            <div className="reveal">
              <VisualBreak />
            </div>
            <div className="reveal">
              <Stats />
            </div>
          </>
        )}
      </main>
      {!isEnterpriseRoute && !isPlatformRoute && !isTraderRoute && !isResearchRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

