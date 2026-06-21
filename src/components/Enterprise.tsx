import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Enterprise() {
  // Calculator State
  const [hectares, setHectares] = useState<number>(5000);
  const [cropType, setCropType] = useState<"grains" | "perennials">("grains");
  const [spend, setSpend] = useState<number>(450);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    enterprise: "",
    hectaresForm: "",
    email: "",
    challenge: "",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Live Calculations
  const cropFactor = cropType === "grains" ? 1.0 : 1.45;
  const savings = Math.round(hectares * spend * 0.15 * cropFactor);
  const carbon = Math.round(hectares * 0.43 * cropFactor);
  const payback = Math.max(8, Math.round(20 - hectares / 5000));

  // Intersection Observer for scroll animations & SEO title/meta update
  useEffect(() => {
    // Dynamic Page Title & Description for SEO
    const prevTitle = document.title;
    document.title = "Enterprise Solutions | AetherAg";

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Integrate AetherAg across agricultural cooperatives and holdings. Calculate your estimated ROI, reduce input spend, and read our viticulture and grain case studies."
      );
    }

    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
      observer.observe(section);
    });

    // Handle hash scroll on mount
    const hash = window.location.hash;
    if (hash.includes("calculator")) {
      setTimeout(() => {
        const el = document.getElementById("calculator");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else if (hash.includes("contact")) {
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.enterprise) {
      setFormError("Please fill out all required fields.");
      return;
    }
    setFormError("");
    setLoading(true);

    try {
      const interests = formData.hectaresForm ? [`Hectares: ${formData.hectaresForm}`] : [];
      const { error } = await supabase
        .from("enterprise_consultations")
        .insert([
          {
            name: formData.name,
            company: formData.enterprise,
            email: formData.email,
            message: formData.challenge,
            interests: interests
          }
        ]);

      if (error) throw error;
      setFormSubmitted(true);
    } catch (err) {
      console.error("Enterprise inquiry submission error:", err);
      setFormError(
        err instanceof Error ? err.message : "Failed to submit inquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-canvas text-on-surface font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Hero Section */}
      <section className="relative min-h-[870px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover grayscale-[20%] brightness-75"
            alt="Cinematic wheat field sunset landscape"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCafbcLz68qPrd_myoh8b5tpsP5mdezQQD9zWS8cLO5hxPk-6ephD4agIPn-LFfO5ziCu-h3gMTrNDItUpJETjSYJU4u9G0fqEylr3T16yPAIR2JR1vRFPDk4MQpT2XdGqr_Mbw4Fji--emrL_qoDfatTGMlaYKG0hIWY7Q6wC0cs7iIhVpYHR_Ax2aXXtQU0RQXOSetlvnbI8u7OybXGxe01uqCk6XIfjuTB87l2YW48aaN--au546HSvTcO3gxb9tBEgqPvi07pk"
          />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full">
          <div className="max-w-3xl text-left">
            <h1 className="font-headline text-[56px] leading-[1.1] text-white mb-6">
              Planetary Stewardship at Enterprise Scale
            </h1>
            <p className="font-body text-xl text-white/90 mb-10 max-w-xl leading-relaxed">
              AetherAg empowers multinational agricultural enterprises to synchronize yields with ecological restoration. High-resolution data for a high-stakes future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-label text-label-md tracking-wider flex items-center justify-center gap-2 hover:bg-on-secondary-container transition-colors cursor-pointer text-center"
                onClick={() => {
                  const el = document.getElementById("calculator");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                LAUNCH ROI CALCULATOR
              </a>
              <a
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-lg font-label text-label-md tracking-wider text-center hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                CONSULT AN AGRONOMIST
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 text-white/40 flex items-center gap-4">
          <span className="text-xs font-label tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-12 bg-white/40"></div>
        </div>
      </section>

      {/* Capabilities Bento Grid */}
      <section className="py-24 max-w-[1280px] mx-auto px-8">
        <div className="mb-16 text-left">
          <span className="font-label text-label-sm uppercase tracking-[0.2em] text-secondary mb-4 block">
            Core Competencies
          </span>
          <h2 className="font-headline text-4xl text-on-surface">
            Precision Infrastructure
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          {/* Item 1 */}
          <div className="md:col-span-8 bg-surface-container-low p-10 rounded-xl flex flex-col justify-between group hover:bg-surface-container transition-all border border-outline-variant/30">
            <div>
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">hub</span>
              <h3 className="font-headline text-2xl mb-2 text-primary">Multi-Region Tenant Architecture</h3>
              <p className="text-on-surface-variant max-w-md font-body text-body-md leading-relaxed">
                Orchestrate operations across continents with localized data compliance and unified global reporting dashboards.
              </p>
            </div>
            <div className="text-secondary font-label text-label-md flex items-center gap-2 cursor-pointer font-bold hover:underline">
              View Schema <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="md:col-span-4 bg-primary text-on-primary p-10 rounded-xl flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-3xl mb-4">groups</span>
              <h3 className="font-headline text-2xl mb-2 text-white">Dedicated Agronomy Team</h3>
            </div>
            <p className="text-on-primary-container relative z-10 font-body text-body-md opacity-90 leading-relaxed">
              24/7 expert oversight for mission-critical decisions.
            </p>
            <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12 text-white select-none pointer-events-none">
              <span className="material-symbols-outlined text-[160px]">diversity_3</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="md:col-span-5 bg-tertiary-container text-on-tertiary p-10 rounded-xl flex flex-col justify-center gap-4">
            <span className="material-symbols-outlined text-on-tertiary-container text-3xl">api</span>
            <h3 className="font-headline text-2xl text-white">Enterprise API Integration</h3>
            <p className="text-on-tertiary-container/80 text-sm font-body leading-relaxed">
              Seamlessly push field data into SAP, John Deere Operations Center, or custom ERP solutions via our high-throughput REST API.
            </p>
          </div>

          {/* Item 4 */}
          <div className="md:col-span-7 border border-outline-variant rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 flex flex-col justify-between bg-surface-container-low">
              <div>
                <h3 className="font-headline text-2xl mb-2 text-primary">Hardware Fleet Deployment</h3>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                  Turnkey sensor suites deployed and managed by AetherAg technicians globally.
                </p>
              </div>
              <button className="text-secondary font-label text-label-md flex items-center gap-2 font-bold text-left cursor-pointer w-fit hover:opacity-85 transition-opacity">
                Logistics Portal <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            <div className="bg-surface-container-high relative overflow-hidden group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Precision ag sensor suite"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCiA1ohNT9UTsgZWlk3p5sTE9jErhPV149LHGyQzBXRfLEzXl2bi9oow4IYti6xpJO6XpY-OOVt3B-uXLI_fwkq1ry1jrA-8kTO9IWaXUHiELeN4IbqRRDg_Sg3aCtVBPvb--t4QG_StE2WS7Le_y-KvM4FbMuLXLeoSZ5DNO_yyzrVB4UQLOLLL_37S9mzdx-pQtp2l2RAJp3E7g-MRgc1ZbrmCAaUrew3O9mRrXZUgQMaJUNB2M_TSp9AEgsW_yt9f7KXdg_HvY"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-headline text-4xl text-primary">Stewardship in Practice</h2>
            <a className="font-label text-label-sm uppercase tracking-widest text-on-surface-variant border-b border-outline hover:text-primary transition-colors cursor-pointer pb-1 font-bold">
              See all case studies
            </a>
          </div>

          {/* Mendoza Valley */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
            <div className="md:col-span-7">
              <div className="aspect-[16/9] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-sm border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover"
                  alt="Aerial Mendoza Valley vineyards"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnROJ0BbwmiCA4LhpwB57HK1h9pEiqVkoDNKYjoy8nmbHun9q6lpoAdUl82krFaYaBtWSzSNIwjIjAtwNFne_N03TKV8rOQcNqhg_D9v_GAUFnctfrjrt3Mbp-4z7Ln-3x2ct2pnyYp8yWdHUsh7epxppumpiZVJFSjt5xSj8wmCg0T8QJ3PmyRqtQPR6IIu50uEixLoEkwU3_uQUHV2I-7LhzUAKVTjkyjY2Bic66XN9ikjasFH1CFH60AUV5k4oatlEyjuXMFF8"
                />
              </div>
            </div>
            <div className="md:col-span-5 text-left">
              <span className="font-label text-label-sm text-secondary uppercase tracking-widest mb-4 block font-bold">
                Viticulture
              </span>
              <h3 className="font-headline text-3xl mb-6 text-primary">Mendoza Valley Vineyards</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed font-body text-body-md">
                Implementing hyper-local irrigation protocols reduced water consumption by 22% while increasing brix levels across 1,200 hectares of premium Malbec.
              </p>
              <div className="flex gap-12 border-t border-outline-variant pt-6 font-body">
                <div>
                  <span className="block font-headline text-2xl text-primary">{`22%`}</span>
                  <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-tighter">Water Saved</span>
                </div>
                <div>
                  <span className="block font-headline text-2xl text-primary">{`4.2x`}</span>
                  <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-tighter">ROI Year 1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Great Plains */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center flex-row-reverse">
            <div className="md:col-span-5 order-2 md:order-1 text-left">
              <span className="font-label text-label-sm text-secondary uppercase tracking-widest mb-4 block font-bold">
                Grains &amp; Oilseeds
              </span>
              <h3 className="font-headline text-3xl mb-6 text-primary">Great Plains Agricultural Co-op</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed font-body text-body-md">
                A fleet-wide nitrogen management deployment across 45,000 acres, utilizing real-time soil nitrogen sensing to prevent runoff into the Mississippi watershed.
              </p>
              <div className="flex gap-12 border-t border-outline-variant pt-6 font-body">
                <div>
                  <span className="block font-headline text-2xl text-primary">{`140k`}</span>
                  <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-tighter">CO2e Credits</span>
                </div>
                <div>
                  <span className="block font-headline text-2xl text-primary">{`-$1.2M`}</span>
                  <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-tighter">Input Costs</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="aspect-[16/9] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-sm border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover"
                  alt="Great Plains wheat crop close-up"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJvENT_IC0g-W_CUchsVt8FGkFpd6Rc42aK2icANf2Da5s9yNSICucbJVuaPlYQsTTnpXmiys81RPIUbTrhTy7PfL3qaiQJoRYPfpM5CLC-MW3FrGCldCW3-BII_-0O1T5bun6gwOouUDiRmPzWLUaJjPuN4SqJ32ClE-OqCAkV5ujr07PUqIc25prCSxQSDugrBKc41eRCcQ3Kb3xG-nkICqphz0QAmDkLcNYDv1CblOTWueOJhshBm7Etux7IfQuZLKR6HSHrzc"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Stewardship Calculator */}
      <section className="py-24 bg-surface" id="calculator">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Inputs Panel */}
            <div className="bg-white p-12 rounded-xl shadow-sm border border-outline-variant/30">
              <h2 className="font-headline text-3xl mb-8 text-primary">Stewardship Impact Calculator</h2>
              <div className="space-y-10">
                {/* Land Area */}
                <div>
                  <div className="flex justify-between mb-4 font-body">
                    <label className="font-label text-label-md uppercase tracking-wider text-on-surface-variant">
                      Total Land Area (Hectares)
                    </label>
                    <span className="font-headline text-xl text-primary font-bold animate-fade-in" id="hectares-val">
                      {hectares.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    id="hectares"
                    min="100"
                    max="50000"
                    step="100"
                    value={hectares}
                    onChange={(e) => setHectares(parseInt(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Crop Type */}
                <div>
                  <label className="font-label text-label-md uppercase tracking-wider text-on-surface-variant mb-4 block">
                    Crop System
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setCropType("grains")}
                      className={`crop-btn px-4 py-3 border rounded font-label text-label-md cursor-pointer transition-all ${
                        cropType === "grains"
                          ? "active border-secondary bg-secondary/5 text-secondary font-bold"
                          : "border-outline-variant hover:border-secondary text-on-surface-variant"
                      }`}
                    >
                      Grains &amp; Corn
                    </button>
                    <button
                      onClick={() => setCropType("perennials")}
                      className={`crop-btn px-4 py-3 border rounded font-label text-label-md cursor-pointer transition-all ${
                        cropType === "perennials"
                          ? "active border-secondary bg-secondary/5 text-secondary font-bold"
                          : "border-outline-variant hover:border-secondary text-on-surface-variant"
                      }`}
                    >
                      Perennials &amp; Orchards
                    </button>
                  </div>
                </div>

                {/* Annual Input Spend */}
                <div>
                  <div className="flex justify-between mb-4 font-body">
                    <label className="font-label text-label-md uppercase tracking-wider text-on-surface-variant">
                      Annual Input Spend ($/Ha)
                    </label>
                    <span className="font-headline text-xl text-primary font-bold" id="spend-val">
                      ${spend.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    id="spend"
                    min="50"
                    max="2000"
                    step="10"
                    value={spend}
                    onChange={(e) => setSpend(parseInt(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Outputs Panel */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-primary text-white p-12 rounded-xl shadow-ambient">
                <h3 className="font-label text-label-sm uppercase tracking-[0.3em] text-on-primary-container mb-8">
                  Estimated Enterprise Yield
                </h3>
                <div className="space-y-12">
                  <div>
                    <span className="text-on-primary-container font-label text-label-sm uppercase tracking-widest block mb-2">
                      Projected Annual Savings
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline text-5xl text-white font-bold" id="out-savings">
                        ${savings.toLocaleString()}
                      </span>
                      <span className="text-secondary-fixed text-lg font-bold">USD</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 font-body">
                    <div>
                      <span className="text-on-primary-container font-label text-label-sm uppercase tracking-widest block mb-2">
                        Carbon Offset (mt)
                      </span>
                      <span className="font-headline text-2xl text-white font-bold" id="out-carbon">
                        {carbon.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-on-primary-container font-label text-label-sm uppercase tracking-widest block mb-2">
                        Payback Period
                      </span>
                      <span className="font-headline text-2xl text-white font-bold" id="out-payback">
                        {payback} Months
                      </span>
                    </div>
                  </div>
                  <div className="pt-8 font-body">
                    <p className="text-sm text-on-primary-container italic mb-6">
                      Calculations based on 15% efficiency gain benchmarks from AetherAg global deployments.
                    </p>
                    <button className="w-full py-4 bg-secondary hover:bg-on-secondary-container transition-colors rounded-lg font-label text-label-md tracking-widest cursor-pointer font-bold border-0 text-white">
                      DOWNLOAD FULL IMPACT REPORT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Intake Form */}
      <section id="contact" className="py-24 bg-surface-container-high border-t border-outline-variant">
        <div className="max-w-[800px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl mb-4 text-primary">
              Inquire for Enterprise Deployment
            </h2>
            <p className="text-on-surface-variant font-body text-body-md">
              Connect with our strategic solutions team to discuss fleet integration.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-surface-container-lowest p-8 rounded-lg border border-secondary/20 shadow-ambient text-center animate-fade-in">
              <span className="material-symbols-outlined text-secondary text-5xl mb-4">
                check_circle
              </span>
              <h3 className="font-headline text-2xl mb-2 text-primary">Inquiry Initialized</h3>
              <p className="text-on-surface-variant font-body text-body-md max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our corporate solutions agronomy team will review your parameters for the <strong>{formData.enterprise}</strong> holdings and contact you at <strong>{formData.email}</strong> within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-12">
              {formError && (
                <div className="text-error text-sm font-semibold mb-4 bg-error-container/20 p-3 rounded border border-error/10">
                  {formError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    required
                    disabled={loading}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none disabled:opacity-55"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                  >
                    Full Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="enterprise"
                    required
                    disabled={loading}
                    value={formData.enterprise}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none disabled:opacity-55"
                  />
                  <label
                    htmlFor="enterprise"
                    className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                  >
                    Enterprise Entity
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative">
                  <input
                    type="number"
                    id="hectaresForm"
                    disabled={loading}
                    value={formData.hectaresForm}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none disabled:opacity-55"
                  />
                  <label
                    htmlFor="hectaresForm"
                    className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                  >
                    Total Hectares
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    disabled={loading}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none disabled:opacity-55"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                  >
                    Corporate Email
                  </label>
                </div>
              </div>

              <div className="relative">
                <textarea
                  id="challenge"
                  rows={3}
                  disabled={loading}
                  value={formData.challenge}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none resize-none font-body text-body-md disabled:opacity-55"
                />
                <label
                  htmlFor="challenge"
                  className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                >
                  Primary Operational Challenge
                </label>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-5 rounded-lg font-label text-label-md tracking-[0.3em] uppercase hover:bg-primary-container transition-all cursor-pointer font-bold border-0 disabled:opacity-55"
                >
                  {loading ? "Initializing..." : "Initialize Inquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto bg-surface-container-high border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-12 max-w-[1280px] mx-auto">
          <div className="text-left">
            <div className="font-headline text-headline-sm text-primary mb-4">AetherAg</div>
            <p className="font-body text-body-md text-on-surface-variant max-w-sm mb-6">
              © 2024 AetherAg. Sustainable precision for a growing world.
            </p>
            <div className="flex gap-6">
              <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
                <span className="material-symbols-outlined">share</span>
              </a>
              <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <h4 className="font-label text-label-sm uppercase tracking-widest text-primary mb-4 font-bold">Legal</h4>
              <a className="block text-on-surface-variant/70 hover:text-secondary text-sm" href="#">
                Terms of Service
              </a>
              <a className="block text-on-surface-variant/70 hover:text-secondary text-sm" href="#">
                Privacy Policy
              </a>
            </div>
            <div className="space-y-2">
              <h4 className="font-label text-label-sm uppercase tracking-widest text-primary mb-4 font-bold">Resources</h4>
              <a className="block text-on-surface-variant/70 hover:text-secondary text-sm" href="#">
                Sustainability Report
              </a>
              <a className="block text-on-surface-variant/70 hover:text-secondary text-sm" href="#">
                Research Archive
              </a>
              <a className="block text-on-surface-variant/70 hover:text-secondary text-sm" href="#">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
