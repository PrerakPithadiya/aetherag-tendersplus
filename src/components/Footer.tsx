import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          // Unique key violation -> already subscribed
          setSubscribed(true);
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
      }
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to subscribe. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-xl">
      <div className="flex flex-col md:flex-row justify-between items-start w-full px-12 py-12 max-w-container-max mx-auto gap-base">
        {/* Company info and Newsletter */}
        <div className="flex flex-col gap-sm max-w-[340px]">
          <div>
            <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tighter">AetherAg</span>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[300px] mt-2 leading-relaxed">
              The pinnacle of precision agriculture. Precision data for planetary stewardship.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <label htmlFor="newsletter" className="font-label-md text-label-md text-primary font-bold">
              Subscribe to Insights
            </label>
            <div className="flex gap-2">
              <input
                id="newsletter"
                type="email"
                required
                disabled={loading}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface border border-outline-variant rounded-DEFAULT px-3 py-1.5 text-xs w-full focus:outline-none focus:border-secondary transition-colors disabled:opacity-55"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-on-primary px-4 py-1.5 rounded-DEFAULT font-label-md text-label-md hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-55 cursor-pointer"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-secondary font-medium animate-pulse">
                ✓ Successfully subscribed to newsletter.
              </p>
            )}
            {errorMsg && (
              <p className="text-[10px] text-error font-medium">
                ✗ {errorMsg}
              </p>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="flex flex-col sm:flex-row gap-lg md:gap-xl w-full md:w-auto">
          <div className="flex flex-col gap-xs">
            <span className="font-label-md text-label-md text-primary font-bold">Solutions</span>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#yield-opt">
              Yield Optimization
            </a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#soil-cons">
              Soil Conservation
            </a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#satellite">
              Satellite Imaging
            </a>
          </div>

          <div className="flex flex-col gap-xs">
            <span className="font-label-md text-label-md text-primary font-bold">Resources</span>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#papers">
              Research Papers
            </a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#sustain">
              Sustainability Report
            </a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#api-docs">
              API Documentation
            </a>
          </div>

          <div className="flex flex-col gap-xs">
            <span className="font-label-md text-label-md text-primary font-bold">Company</span>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#privacy">
              Privacy Policy
            </a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#terms">
              Terms of Service
            </a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#/enterprise#contact">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-12 py-6 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-base">
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">
          © 2026 AetherAg Precision Systems. All rights reserved.
        </p>
        <div className="flex gap-md font-label-sm text-label-sm text-on-surface-variant opacity-60">
          <span className="hover:text-primary cursor-pointer">LinkedIn</span>
          <span className="hover:text-primary cursor-pointer">Twitter</span>
          <span className="hover:text-primary cursor-pointer">GitHub</span>
        </div>
      </div>
    </footer>
  );
}
