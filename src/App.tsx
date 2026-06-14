import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stewardship from "./components/Stewardship";
import Modules from "./components/Modules";
import VisualBreak from "./components/VisualBreak";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import Enterprise from "./components/Enterprise";

function App() {
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

  useEffect(() => {
    if (isEnterpriseRoute) return;

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
      if (id && id !== "enterprise") {
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
  }, [isEnterpriseRoute, currentHash]);

  return (
    <div className="bg-background min-h-screen text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <Header />
      <main className="pt-[80px] md:pt-[100px] overflow-hidden">
        {isEnterpriseRoute ? (
          <Enterprise />
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
      {!isEnterpriseRoute && <Footer />}
    </div>
  );
}

export default App;
