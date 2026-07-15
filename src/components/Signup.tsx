import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length > 0) strength = 1;
    if (pass.length >= 6) strength = 2;
    if (pass.length >= 8 && /[A-Z]/.test(pass)) strength = 3;
    if (pass.length >= 10 && /[!@#$%^&*]/.test(pass)) strength = 4;
    return strength;
  };

  const strength = calculatePasswordStrength(password);

  const getMeterColor = (index: number) => {
    if (index >= strength) return "bg-surface-container-highest";
    switch (strength) {
      case 1:
        return "bg-error";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-lime-500";
      case 4:
        return "bg-secondary";
      default:
        return "bg-surface-container-highest";
    }
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 0:
        return "Security Status";
      case 1:
        return "Weak Security";
      case 2:
        return "Moderate Security";
      case 3:
        return "High Security";
      case 4:
        return "Exceptional Security";
      default:
        return "";
    }
  };

  const getMatchIndicator = () => {
    if (confirmPassword.length === 0) return null;
    const isMatch = password === confirmPassword;
    return (
      <span
        className="material-symbols-outlined absolute right-0 top-3 text-lg select-none"
        style={{ color: isMatch ? "#3b6934" : "#ba1a1a" }}
      >
        {isMatch ? "check_circle" : "cancel"}
      </span>
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }

      setShowSuccessOverlay(true);
    } catch (err) {
      console.error("Signup error:", err);
      let message = err instanceof Error ? err.message : "Failed to sign up. Please try again later.";
      if (message.toLowerCase().includes("email rate limit exceeded")) {
        message = "Email rate limit exceeded. (Development Tip: Go to your Supabase Dashboard under Authentication > Providers > Email and disable 'Confirm Email' for easy local testing, or wait an hour.)";
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body { font-family: 'Hanken Grotesk', sans-serif; }
        .font-headline { font-family: 'Libre Caslon Text', serif; }
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .signup-container {
          min-height: 100vh;
          display: flex;
        }

        @media (min-width: 769px) {
          .signup-container {
            height: 100vh;
            max-height: 100vh;
            overflow: hidden;
          }
          .right-pane {
            height: 100%;
            overflow-y: hidden;
          }
        }

        .left-pane {
          flex: 1;
          position: relative;
          background-size: cover;
          background-position: center;
        }

        .right-pane {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 3rem;
          background-color: #f9f9f7;
        }

        @media (max-width: 768px) {
          .signup-container { flex-direction: column; }
          .left-pane { min-height: 300px; flex: none; }
        }

        .check-pulse {
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        input:focus {
          outline: none !important;
          border-bottom-color: #3b6934 !important;
          box-shadow: none !important;
        }
      `}</style>

      <main className="signup-container bg-background text-on-background selection:bg-secondary/30">
        {/* Left Pane */}
        <div
          className="left-pane overflow-hidden hidden md:block"
          style={{
            backgroundImage: "url('/signup_bg.png')",
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
          {/* Branding/Logo */}
          <div className="absolute top-12 left-12">
            <span className="font-headline text-2xl font-normal text-on-primary">AetherAg</span>
          </div>
          {/* Quote Container */}
          <div className="absolute bottom-24 left-12 right-12">
            <blockquote className="font-headline text-4xl text-on-primary leading-tight max-w-lg">
              "Cultivating the future through precision data."
            </blockquote>
            <div className="mt-4 w-12 h-1 bg-secondary"></div>
          </div>
        </div>

        {/* Right Pane */}
        <div className="right-pane relative">
          <div className="w-full max-w-md">
            <div className="mb-5">
              <h1 className="font-headline text-headline-md text-primary mb-1">Create an Account</h1>
              <p className="text-on-surface-variant font-body">
                Join the elite ecosystem of precision stewardship.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-4 rounded-lg bg-error-container text-on-error-container text-sm border border-error/20 flex items-start gap-2">
                <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4" id="signup-form">
              {/* Full Name */}
              <div className="space-y-1">
                <label
                  className="block font-label text-label-md uppercase tracking-wider text-on-surface-variant"
                  htmlFor="full_name"
                >
                  Full Name
                </label>
                <input
                  className="w-full px-0 py-2 bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 transition-all text-body-md"
                  id="full_name"
                  name="full_name"
                  placeholder="Johnathan Arable"
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  className="block font-label text-label-md uppercase tracking-wider text-on-surface-variant"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full px-0 py-2 bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 transition-all text-body-md"
                  id="email"
                  name="email"
                  placeholder="j.arable@precision.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="space-y-1 relative">
                <label
                  className="block font-label text-label-md uppercase tracking-wider text-on-surface-variant"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-0 py-2 bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 transition-all text-body-md"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                {/* Strength Meter */}
                <div className="flex gap-1 mt-2 h-1 w-full">
                  <div className={`flex-1 rounded-full transition-colors duration-300 ${getMeterColor(0)}`}></div>
                  <div className={`flex-1 rounded-full transition-colors duration-300 ${getMeterColor(1)}`}></div>
                  <div className={`flex-1 rounded-full transition-colors duration-300 ${getMeterColor(2)}`}></div>
                  <div className={`flex-1 rounded-full transition-colors duration-300 ${getMeterColor(3)}`}></div>
                </div>
                <p
                  className={`text-[10px] font-label uppercase tracking-widest mt-1 ${
                    strength === 0 ? "text-outline" : "text-on-surface"
                  }`}
                  id="strength-text"
                >
                  {getStrengthLabel()}
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1 relative">
                <label
                  className="block font-label text-label-md uppercase tracking-wider text-on-surface-variant"
                  htmlFor="confirm_password"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-0 py-2 bg-transparent border-t-0 border-x-0 border-b border-outline-variant focus:ring-0 transition-all text-body-md"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="••••••••"
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                  {getMatchIndicator()}
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full bg-primary text-on-primary py-3 px-6 font-label text-label-md uppercase tracking-widest hover:bg-zinc-800 active:opacity-90 transition-all duration-300 mt-2 rounded-sm shadow-sm flex justify-center items-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Get Started"
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-body-md text-on-surface-variant">
                Already part of the ecosystem?{" "}
                <a
                  className="text-secondary font-semibold hover:underline transition-all"
                  href="#/login"
                >
                  Enterprise Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Success State Overlay */}
      {showSuccessOverlay && (
        <div
          className="flex flex-col p-12"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(249, 249, 247, 0.98)",
            zIndex: 50,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          id="success-overlay"
        >
          <div className="max-w-md mx-auto">
            <div className="check-pulse bg-secondary-container text-on-secondary-container w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h2 className="font-headline text-display-lg text-primary mb-4">Registration Successful</h2>
            <p className="font-body text-body-lg text-on-surface-variant mb-8">
              We've sent a secure verification link to your email. Please verify your identity to begin your
              stewardship journey.
            </p>
            <button
              className="border border-outline px-8 py-3 font-label text-label-md uppercase tracking-widest hover:bg-surface-container-high transition-colors"
              onClick={() => {
                setShowSuccessOverlay(false);
                window.location.hash = "#/login";
              }}
            >
              Back to Portal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
