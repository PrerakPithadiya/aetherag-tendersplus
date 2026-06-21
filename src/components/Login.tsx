import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface LoginProps {
  onSuccess?: () => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("aetherag_remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (rememberMe) {
        localStorage.setItem("aetherag_remember_email", email);
      } else {
        localStorage.removeItem("aetherag_remember_email");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        window.location.hash = "#";
      }
    } catch (err) {
      console.error("Login error:", err);
      let message = err instanceof Error ? err.message : "Failed to sign in. Please check your credentials.";
      if (message.toLowerCase().includes("email rate limit exceeded") || message.toLowerCase().includes("rate limit")) {
        message = "Rate limit exceeded. (Development Tip: Go to your Supabase Dashboard under Authentication > Providers > Email and disable 'Confirm Email' for easy local testing, or wait an hour.)";
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error(`${provider} OAuth login error:`, err);
      setErrorMsg(err instanceof Error ? err.message : `Failed to sign in with ${provider}.`);
    }
  };

  return (
    <>
      <style>{`
        @keyframes breathing-glow {
            0%, 100% { text-shadow: 0 0 10px rgba(59, 105, 52, 0.4); opacity: 0.9; }
            50% { text-shadow: 0 0 25px rgba(59, 105, 52, 0.8); opacity: 1; }
        }
        .animate-glow {
            animation: breathing-glow 4s ease-in-out infinite;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .micro-lift {
            transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.2s ease;
        }
        .micro-lift:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>

      <main className="flex h-screen w-full overflow-hidden bg-background">
        {/* Left Pane: Visual & Quote (Hidden on Mobile) */}
        <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-primary h-full">
          <div className="absolute inset-0 grayscale contrast-125 opacity-70">
            <img
              alt="Macro agriculture"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida/AP1WRLuo2_yYugZUNhtg1G_V3gcWWOa3SC6l8yuuGSRL98wdyjx1gGfhlCZBHbypcJUUDBAWl94zr0T1kg5ZJ6CtqItUveNUMJUyz0SfGMF8054rGLj3qAkdCQghC1QykEu6IajiTiPPX9u1ffHe8hd-OvUBtWTh3g4BtN2d9lGJEpczt_Ot9B9g4dRWhaqWhHw-9nGr2fNIuyBDzWZl07fuERTjVE2pViL873EntynnD6PQdmmw6Sr899YG0w"
            />
          </div>
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-16 h-full w-full">
            <blockquote className="max-w-md">
              <p className="font-display text-4xl lg:text-5xl text-on-primary animate-glow leading-tight italic">
                "Cultivating the future through precision data."
              </p>
              <footer className="mt-8">
                <div className="h-px w-12 bg-secondary mb-4"></div>
                <p className="font-label text-label-md text-on-primary-container tracking-widest uppercase">
                  AetherAg Solutions
                </p>
              </footer>
            </blockquote>
          </div>

          {/* Subtle brand mark in corner */}
          <div className="absolute bottom-12 left-16 z-10">
            <p className="text-white/20 font-headline text-lg tracking-tighter">EST. 2024</p>
          </div>
        </section>

        {/* Right Pane: Login Form */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12 bg-surface h-full overflow-hidden">
          <div className="w-full max-w-[440px]">
            {/* Center Auth Container */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 md:p-8 shadow-sm transition-all duration-500">
              {/* Branding & Header */}
              <div className="mb-5 text-center">
                <div className="flex justify-center mb-4">
                  <span className="font-headline text-2xl font-bold tracking-tighter text-primary">AetherAg</span>
                </div>
                <h1 className="font-headline text-3xl text-on-surface mb-2">Welcome Back</h1>
                <p className="font-body text-on-surface-variant text-body-md">
                  Enter your credentials to access the grid.
                </p>
              </div>

              {/* Error Message Display */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-lg bg-error-container text-on-error-container text-sm border border-error/20 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="font-label text-label-md text-on-surface-variant" htmlFor="email">
                    Email Address
                  </label>
                  <div className={`relative group transition-transform duration-200 ${emailFocused ? "scale-[1.01]" : ""}`}>
                    <input
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all placeholder:text-outline-variant/60"
                      id="email"
                      name="email"
                      placeholder="name@enterprise.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      disabled={loading}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-secondary pointer-events-none transition-colors">
                      mail
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-label text-label-md text-on-surface-variant" htmlFor="password">
                      Password
                    </label>
                    <a
                      className="font-label text-label-sm text-secondary hover:underline transition-all"
                      href="#/forgot-password"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className={`relative group transition-transform duration-200 ${passwordFocused ? "scale-[1.01]" : ""}`}>
                    <input
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all placeholder:text-outline-variant/60"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      disabled={loading}
                    />
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 py-1">
                  <input
                    className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer"
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <label
                    className="font-body text-body-md text-on-surface-variant cursor-pointer select-none"
                    htmlFor="remember"
                  >
                    Remember this device
                  </label>
                </div>

                <button
                  className="w-full bg-primary text-on-primary py-3 rounded-lg font-label text-label-md uppercase tracking-widest micro-lift active:opacity-90 disabled:opacity-50 transition-opacity flex justify-center items-center"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30"></div>
                </div>
                <span className="relative px-4 bg-surface-container-lowest text-outline text-label-sm font-label uppercase tracking-widest">
                  or continue with
                </span>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleOAuthLogin("google")}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-2.5 px-4 hover:bg-surface-container-low transition-colors group disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="font-label text-label-sm text-on-surface group-hover:text-primary">Google</span>
                </button>

                <button
                  onClick={() => handleOAuthLogin("github")}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-2.5 px-4 hover:bg-surface-container-low transition-colors group disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="font-label text-label-sm text-on-surface group-hover:text-primary">GitHub</span>
                </button>
              </div>

              {/* Bottom Nav Link */}
              <div className="mt-6 text-center">
                <p className="font-body text-body-md text-on-surface-variant">
                  New to the platform?{" "}
                  <a className="text-secondary font-semibold hover:underline" href="#/signup">
                    Contact Sales
                  </a>
                </p>
              </div>
            </div>

            {/* Footer Text for Small Screen */}
            <footer className="mt-12 md:hidden text-center opacity-60">
              <p className="font-label text-label-sm uppercase tracking-widest text-on-surface-variant">
                © 2026 AetherAg Solutions
              </p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
