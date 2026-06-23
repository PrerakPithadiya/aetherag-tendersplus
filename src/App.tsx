import { useEffect, useState } from "react";
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
import { AuthProvider, useAuth } from "./lib/AuthProvider";

function AppContent() {
  const { user, loading } = useAuth();
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
    if (!user || isLoginRoute || isSignupRoute || isEnterpriseRoute || isPlatformRoute || isTraderRoute || isResearchRoute) return;

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
    // Show Landing Page for all other routes
    return <Landing />;
  }

  // Authenticated layout
  return (
    <div className="bg-background min-h-screen text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <Header />
      <main className="pt-[80px] md:pt-[100px] overflow-hidden">
        {isEnterpriseRoute ? (
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

