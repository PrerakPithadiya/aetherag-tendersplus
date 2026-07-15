import { useState, useEffect } from "react";

export default function Terms() {
  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms", icon: "assignment_turned_in" },
    { id: "services", title: "2. Description of Services", icon: "settings" },
    { id: "accounts", title: "3. Registration & Accounts", icon: "manage_accounts" },
    { id: "conduct", title: "4. User Conduct & Constraints", icon: "gavel" },
    { id: "data-rights", title: "5. Proprietary Data Rights", icon: "analytics" },
    { id: "tendering", title: "6. Tendering & Bidding", icon: "account_balance" },
    { id: "disclaimers", title: "7. Warranty Disclaimers", icon: "report_problem" },
    { id: "liability", title: "8. Limitation of Liability", icon: "shield" },
    { id: "governing-law", title: "9. Governing Law", icon: "gavel" },
    { id: "contact", title: "10. Contact Information", icon: "mail" },
  ];

  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = "acceptance";
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentActive = section.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120; // Accounts for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full">
      {/* Premium Sub-Header Hero */}
      <div className="relative overflow-hidden bg-surface-container-low border border-outline-variant rounded-DEFAULT p-8 md:p-12 mb-12 shadow-ambient">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="font-label text-label-md uppercase tracking-[0.2em] text-secondary mb-3 block">
            Legal Agreement
          </span>
          <h1 className="font-headline text-headline-md md:text-display-lg text-primary mb-4 leading-tight">
            Terms of Service
          </h1>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Effective Date: June 24, 2026. These terms govern your access to and use of the AetherAg TendersPlus platform, including its telemetry streams, trading mechanisms, and analytical models.
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Sticky Desktop Navigation Sidebar */}
        <aside className="lg:col-span-4 sticky top-[120px] hidden lg:block bg-surface-container-low border border-outline-variant rounded-DEFAULT p-6 shadow-ambient">
          <h3 className="font-label text-label-md uppercase tracking-wider text-primary font-bold mb-4">
            Document Sections
          </h3>
          <ul className="space-y-1">
            {sections.map((sec) => (
              <li key={sec.id}>
                <button
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 text-sm font-label rounded-DEFAULT transition-all duration-200 ${
                    activeSection === sec.id
                      ? "bg-secondary-container text-on-secondary-container font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {sec.icon}
                  </span>
                  <span>{sec.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Column */}
        <div className="lg:col-span-8 space-y-12">
          {/* Section 1 */}
          <section id="acceptance" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                assignment_turned_in
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                1. Acceptance of Terms
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                By registering an account, deploying sensors, or conducting trades on the AetherAg TendersPlus platform (the "Platform"), you irrevocably agree to comply with and be bound by these Terms of Service (the "Terms"). These Terms constitute a binding legal agreement between you and AetherAg Precision Systems Inc. ("AetherAg", "we", "us", or "our").
              </p>
              <p>
                If you are entering into these Terms on behalf of a corporate entity, farm co-operative, or agricultural enterprise, you represent and warrant that you possess the requisite legal authority to bind such entity to these Terms. If you do not agree to these terms, you must immediately cease all access to the Platform.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="services" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                settings
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                2. Description of Services
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                AetherAg provides a proprietary precision agriculture tendering and data analytics ecosystem. This ecosystem combines:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>TendersPlus Bidding Engine:</strong> An automated, telemetry-driven platform designed to connect agricultural commodity sellers with industrial buyers.
                </li>
                <li>
                  <strong>Soil Telemetry & Satellite Diagnostics:</strong> Real-time and historical monitoring of soil composition, moisture level, biomass indices, and atmospheric fluctuations.
                </li>
                <li>
                  <strong>Predictive Insights:</strong> Yield optimization models, risk mitigation metrics, and conservation planning guides.
                </li>
              </ul>
              <p>
                All data, reports, and bidding matching tools generated through the Platform are proprietary intellectual property of AetherAg or licensed under strict confidentiality terms.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="accounts" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                manage_accounts
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                3. Registration & Accounts
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                To utilize TendersPlus, you must complete the registration process, verify your agricultural credentials, and maintain an active account. You agree to provide accurate, current, and complete information during registration and keep such information updated.
              </p>
              <p>
                You are solely responsible for securing your account credentials (passwords, API tokens, multi-factor codes). Any activity conducted through your account will be deemed authorized by you. AetherAg is not liable for unauthorized access resulting from negligent security hygiene on your part.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="conduct" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                gavel
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                4. User Conduct & Constraints
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                You agree not to engage in any behavior that degrades the performance, reliability, or integrity of the Platform. Prohibited conduct includes, but is not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Interfering with, spoofing, or submitting fraudulent telemetry readings to distort market indices or bidding parameters.
                </li>
                <li>
                  Reverse-engineering, decompiling, or attempting to extract the underlying source code of our predictive yield models or bidding matching logic.
                </li>
                <li>
                  Deploying scrapers, bots, or automated extractors to harvest peer pricing data, regional telemetry charts, or user profiles.
                </li>
                <li>
                  Circumventing platform security barriers, rate limit controls, or user authentication schemas.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="data-rights" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                analytics
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                5. Proprietary Data Rights
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                Data ownership in precision agriculture requires precise definition. Our guidelines are structured as follows:
              </p>
              <div className="bg-surface-container border border-outline-variant p-4 rounded-DEFAULT space-y-3">
                <p className="font-semibold text-primary">
                  A. Your Field Data
                </p>
                <p className="text-sm">
                  You retain ownership of all raw field data, telemetry signals, and crop details uploaded from your hardware or manually entered.
                </p>
                <p className="font-semibold text-primary">
                  B. License to AetherAg
                </p>
                <p className="text-sm">
                  You grant AetherAg a worldwide, royalty-free, perpetual license to aggregate, anonymize, and utilize your field data to train predictive models, improve soil telemetry indices, and benchmark regional yield averages.
                </p>
                <p className="font-semibold text-primary">
                  C. Platform Output
                </p>
                <p className="text-sm">
                  Any structured reports, soil analytics dashboards, tender evaluations, or market forecasts generated by AetherAg remain the exclusive intellectual property of AetherAg.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="tendering" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                account_balance
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                6. Tendering & Bidding Integrity
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                AetherAg TendersPlus acts as a facilitator for agriscience supply contracts. By submitting a bid or publishing a tender:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  You certify that the quantity, quality, and origin of the crops match the telemetry reports attached to the listing.
                </li>
                <li>
                  You agree that once a bid is formally matched, it constitutes a binding intent to execute the transaction subject to final physical sample verification.
                </li>
                <li>
                  You agree to pay all platform transaction, listing, or processing fees as outlined in the active billing agreement at the time of match.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="disclaimers" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                report_problem
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                7. Warranty Disclaimers
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p className="italic text-primary font-medium">
                THE SERVICE AND ALL DATA GENERATED ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p>
                AetherAg does not warrant that: (i) soil telemetry metrics, crop health indicators, or satellite yield models are 100% error-free; (ii) the platform will run uninterrupted or without latency during high-volume harvest seasons; (iii) the trading engine will guarantee a matching bid for all submitted crop listings.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="liability" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                shield
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                8. Limitation of Liability
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL AETHERAG, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, CROP FAILURES, OR INCORRECT BID MATCHES.
              </p>
              <p>
                Our aggregate liability for all claims arising out of or related to these Terms or Platform usage shall not exceed the total fees paid by you to AetherAg in the twelve (12) months preceding the event giving rise to the claim.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="governing-law" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                gavel
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                9. Governing Law
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                These Terms and any dispute arising from them shall be governed by, and construed in accordance with, the laws of the State of Delaware, without regard to its conflict of law principles.
              </p>
              <p>
                Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in Wilmington, Delaware, and the parties hereby consent to personal jurisdiction and venue therein.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="contact" className="scroll-mt-32">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">
                mail
              </span>
              <h2 className="font-headline text-headline-sm text-primary">
                10. Contact Information
              </h2>
            </div>
            <div className="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                If you have any questions about these Terms, please contact our Legal and Compliance division:
              </p>
              <div className="bg-surface-container border border-outline-variant p-4 rounded-DEFAULT font-label-md text-label-md text-primary">
                <p className="font-bold">AetherAg Precision Systems Inc.</p>
                <p>Legal & Compliance Division</p>
                <p>Email: legal@aetherag.com</p>
                <p>Address: 1209 North Orange Street, Wilmington, DE 19801</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
