import { useState, useEffect } from "react";

export default function Trader() {
  // Timeline Active Step State
  const [activeStep, setActiveStep] = useState<number>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // SEO updates and scroll animation observers
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "GeM Tender Bidding Process & Support | TendersPlus";

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Master the Government e-Marketplace (GeM) tender bidding process. Explore bidding types, key steps, and let TendersPlus handle your end-to-end bidding with a free trial."
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

    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.requirement) {
      setFormError("Please fill out all required fields.");
      return;
    }
    setFormError("");
    setFormSubmitted(true);
  };

  const biddingTypes = [
    {
      num: "01",
      title: "Single Bid System",
      desc: "Only one bid is allowed from each seller for a specific product or service on the GeM Portal. The bidding is straightforward, and the seller submits the specified product or service price.",
      icon: "tag",
    },
    {
      num: "02",
      title: "Open Bid System",
      desc: "Multiple sellers can participate. Sellers can submit their bids within the specified time-frame, and the buyer can choose from the received bids based on the evaluation criteria.",
      icon: "public",
    },
    {
      num: "03",
      title: "Limited Tenders",
      desc: "Involves inviting bids from a select group of pre-qualified sellers. Buyers identify a limited number of sellers eligible to participate based on certain criteria.",
      icon: "group_work",
    },
    {
      num: "04",
      title: "Negotiated Tenders",
      desc: "Limited to invitations to a single company. The key reasons are specialized work, extension of tenure to the existing contract, and new scope. The vendor submits quotations and bid is awarded after negotiation.",
      icon: "handshake",
    },
    {
      num: "05",
      title: "Competitive Bidding",
      desc: "Submission of bids by multiple sellers for a specific procurement requirement. Sellers compete based on factors such as price, quality, and other specified criteria.",
      icon: "rewarded_ads",
    },
    {
      num: "06",
      title: "Reverse Auction",
      desc: "Sellers compete to provide the lowest price for a particular product or service. The auction platform allows for real-time bidding, with prices decreasing dynamically as sellers compete.",
      icon: "trending_down",
    },
    {
      num: "07",
      title: "Semi-Closed Bidding",
      desc: "Restricting the bidding to a specific group of sellers based on certain criteria or qualifications. Only pre-approved sellers can participate in the bidding process.",
      icon: "lock_open",
    },
    {
      num: "08",
      title: "Single-Stage Two-Bid System",
      desc: "First bid (technical) assesses the bidder's qualifications and compliance with specs. Second bid (financial) includes price quotation, opened only for those who qualify the technical stage.",
      icon: "filter_alt",
    },
    {
      num: "09",
      title: "Two-Stage Tendering",
      desc: "Bidders submit qualifications in the first stage. Only qualified bidders proceed to the second stage to submit their pricing bids, streamlining complex vendor filtering.",
      icon: "rule",
    },
  ];

  const steps = [
    {
      title: "GeM Portal Registration",
      desc: "Sellers must complete the GeM registration process by providing accurate information about their business along with necessary documentation (PAN, GSTIN, Bank details, etc.).",
      support: "TendersPlus completes your online registration on the GeM Portal seamlessly, ensuring zero errors in document uploads.",
      icon: "app_registration",
    },
    {
      title: "Profile Creation",
      desc: "Login to the account and build a detailed profile. Ensure product listings and services provided are comprehensive and updated.",
      support: "We manage your product listings, catalogue creation, and profile completeness to maximize visibility to government buyers.",
      icon: "account_circle",
    },
    {
      title: "Tender Search",
      desc: "Search tenders using GeM Login credentials to identify opportunities that align with your business offerings.",
      support: "Our daily monitoring team scans the portal and filters active tenders matching your business capabilities so you never miss an opportunity.",
      icon: "search",
    },
    {
      title: "Bid Preparation",
      desc: "Read the tender documents in detail. Prepare the bid according to guidelines, keeping checklists to meet conditions like Make in India (MII) certificates.",
      support: "We conduct detailed analysis of the tender document guidelines, prepare checklist items, and compile required MII certificates.",
      icon: "edit_document",
    },
    {
      title: "Fee Payment",
      desc: "Some tenders require online payment of tender fees. Sellers must follow the specified process, ensuring compliance with all financial terms.",
      support: "We guide you on the exact fee requirements and facilitate direct online transactions to avoid payment failure bottlenecks.",
      icon: "payments",
    },
    {
      title: "Tender Submission",
      desc: "Submit your bid before the specified deadline. Late submissions are strictly rejected by the online portal.",
      support: "We coordinate timeline milestones and upload technical documentations well in advance of the deadline for safe submission.",
      icon: "cloud_upload",
    },
    {
      title: "Financial Bid Submission",
      desc: "Submit pricing details and financial proposals as per specifications. Keep in mind that GeM facilitates dynamic reverse auctions.",
      support: "Our financial analysts support you in bidding strategies and guide you through real-time reverse auction pricing rules.",
      icon: "attach_money",
    },
    {
      title: "Bid Opening",
      desc: "Bids are opened on a specified date and evaluated thoroughly against the technical parameters defined in the tender.",
      support: "We track the bid opening schedules and monitor the evaluation sheets to flag any unfair disqualifications.",
      icon: "visibility",
    },
    {
      title: "Award Process",
      desc: "If the bid matches all criteria and offers the best value, the contract is awarded. GeM publishes results transparently.",
      support: "We support you in accepting the contract and completing initial verification parameters inside the seller panel.",
      icon: "emoji_events",
    },
    {
      title: "Status Updates",
      desc: "Stay informed about the progress of the bid, clarifications requested, and results via dashboard alerts.",
      support: "Our team alerts you instantly when queries or clarifications are raised by the buyer, ensuring timely replies.",
      icon: "notifications",
    },
    {
      title: "PO & Payment Follow-up",
      desc: "After securing a contract, active follow-ups on Purchase Orders (PO) and invoice payments are crucial for smooth transactions.",
      support: "We help manage invoice generation, delivery status logs, and payment dispatch reminders in the seller account.",
      icon: "assignment_turned_in",
    },
    {
      title: "EMD Follow-up",
      desc: "Stay proactive in tracking and seeking refunds of Earnest Money Deposits (EMD) post-tender finalization.",
      support: "We file the return requests and coordinate EMD release processes to keep your cash flow optimized.",
      icon: "cached",
    },
  ];

  const valueProps = [
    {
      title: "Free Trial Offer",
      desc: "Get your very 1st service or tender bidding completely FREE of cost to test our team's speed and precision.",
      highlight: true,
      icon: "card_giftcard",
    },
    {
      title: "Pay per Listing",
      desc: "No fixed monthly fees or subscription locks. You only pay based on the actual tenders we bid for you.",
      highlight: false,
      icon: "monetization_on",
    },
    {
      title: "Expert Guidance",
      desc: "Benefit from a dedicated agritech and industrial procurement expert team for advice, checklists, and compliance.",
      highlight: false,
      icon: "psychology",
    },
    {
      title: "Comprehensive Services",
      desc: "Covers every single aspect: profile registration, MII certificate compilation, reverse auction tracking, and post-bid payment follow-ups.",
      highlight: false,
      icon: "grid_view",
    },
    {
      title: "Money Back Guarantee",
      desc: "Client satisfaction is our top priority. We offer full refunds on listings if you are not satisfied with our bidding support.",
      highlight: false,
      icon: "verified_user",
    },
    {
      title: "Efficient Document Submission",
      desc: "Let the TendersPlus team handle document compilation and uploads while you focus entirely on growing your core business operations.",
      highlight: false,
      icon: "speed",
    },
  ];

  return (
    <div className="bg-canvas text-on-surface font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Hero Section */}
      <section className="relative min-h-[750px] flex items-center overflow-hidden border-b border-outline-variant/30">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#3b6934_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-20 right-0 w-[40%] h-[60%] bg-gradient-to-br from-secondary/10 to-transparent blur-3xl rounded-full z-0"></div>

        <div className="relative z-10 max-w-container-max mx-auto px-12 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text column */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-variant font-label-md text-xs mb-6 uppercase tracking-wider animate-pulse-slow">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Partnered with TendersPlus
              </div>
              <h1 className="font-headline text-[44px] md:text-[56px] leading-[1.15] text-primary mb-6">
                Mastering GeM Tender Bidding Process
              </h1>
              <p className="font-headline text-2xl text-secondary mb-6 italic">
                A Seamless Journey with Tenders Plus
              </p>
              <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
                Achieving success in Government e-marketplace (GeM) tender bidding requires a comprehensive understanding of the diverse processes involved. The GeM portal offers a transparent platform for government procurement, and this guide provides insights into the intricacies of the tender bidding process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact-trader"
                  className="bg-primary text-on-primary px-8 py-4 rounded-DEFAULT font-label-md text-label-md tracking-wider text-center hover:opacity-90 transition-opacity cursor-pointer shadow-ambient-hover"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("contact-trader");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  CLAIM FREE FIRST BID
                </a>
                <a
                  href="#bidding-types"
                  className="bg-transparent border border-outline text-primary px-8 py-4 rounded-DEFAULT font-label-md text-label-md tracking-wider text-center hover:bg-surface-container-low transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("bidding-types");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  EXPLORE BIDDING TYPES
                </a>
              </div>
              <div className="mt-8 flex items-center gap-4 text-xs font-label text-on-surface-variant/70 border-t border-outline-variant/30 pt-6">
                <span>POSTED ON: 18 DECEMBER 2023</span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                <span>COMPLIANT WITH GeM 4.0 GUIDELINES</span>
              </div>
            </div>

            {/* Graphic column */}
            <div className="lg:col-span-5 relative">
              <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/50 shadow-ambient relative">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-error"></span>
                    <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></span>
                    <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  </div>
                  <span className="font-label-md text-xs text-secondary font-bold tracking-widest">LIVE BID MONITOR</span>
                </div>
                
                {/* Visual stats and auction tracker */}
                <div className="space-y-6 font-body text-left">
                  <div className="bg-white p-4 rounded border border-outline-variant/30">
                    <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-bold">
                      <span>BIDDING TYPE</span>
                      <span className="text-secondary">REVERSE AUCTION</span>
                    </div>
                    <span className="font-headline text-lg text-primary block">Tender Ref: GeM/2026/B/8902</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border border-outline-variant/30">
                      <span className="text-xs text-on-surface-variant block mb-1">CURRENT BID L1</span>
                      <span className="font-headline text-2xl text-primary font-bold">₹12,40,500</span>
                    </div>
                    <div className="bg-white p-4 rounded border border-outline-variant/30">
                      <span className="text-xs text-on-surface-variant block mb-1">SAVINGS TARGET</span>
                      <span className="font-headline text-2xl text-secondary font-bold">₹2,84,000</span>
                    </div>
                  </div>

                  {/* Mock live bids chart */}
                  <div className="bg-white p-4 rounded border border-outline-variant/30">
                    <span className="text-xs text-on-surface-variant block mb-3 font-bold uppercase">Dynamic Price Decrement</span>
                    <div className="h-32 flex items-end gap-3 pt-4 border-b border-l border-outline-variant/40 pl-2">
                      <div className="w-full bg-outline-variant/40 rounded-t h-[90%] flex flex-col justify-end items-center text-[10px] text-on-surface-variant pb-1"><span>Bidder A</span></div>
                      <div className="w-full bg-outline-variant/60 rounded-t h-[75%] flex flex-col justify-end items-center text-[10px] text-on-surface-variant pb-1"><span>Bidder B</span></div>
                      <div className="w-full bg-outline-variant/80 rounded-t h-[60%] flex flex-col justify-end items-center text-[10px] text-on-surface-variant pb-1"><span>Bidder C</span></div>
                      <div className="w-full bg-secondary rounded-t h-[48%] flex flex-col justify-end items-center text-[10px] text-white pb-1 font-bold"><span>L1 (Us)</span></div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-primary text-white py-4 px-6 rounded-DEFAULT shadow-ambient border border-outline-variant/10 text-center select-none pointer-events-none">
                  <span className="block font-headline text-3xl font-bold">98.2%</span>
                  <span className="font-label-md text-[10px] uppercase tracking-widest text-on-primary-container">Technical Approval Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GeM Bidding Types Grid */}
      <section id="bidding-types" className="py-24 max-w-container-max mx-auto px-12 border-b border-outline-variant/30">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="font-label text-label-sm uppercase tracking-[0.2em] text-secondary mb-4 block font-bold">
            Portal Capabilities
          </span>
          <h2 className="font-headline text-4xl text-primary mb-6">
            Government e-Marketplace Bidding Types
          </h2>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            India's GeM portal facilitates various bidding processes to streamline government procurement. Understanding these formats is critical to presenting compliant quotations and winning contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {biddingTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-outline-variant/40 shadow-ambient shadow-ambient-hover text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center border border-outline-variant/20">
                    <span className="material-symbols-outlined text-secondary text-2xl">{type.icon}</span>
                  </div>
                  <span className="font-headline text-xl text-outline-variant/70 font-bold">{type.num}</span>
                </div>
                <h3 className="font-headline text-xl text-primary mb-4">{type.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed text-sm">
                  {type.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-center text-xs font-body text-on-surface-variant italic max-w-2xl mx-auto">
          * These general bidding types are dynamically updated on the GeM portal in every tender. Sellers must follow instructions specified in the tender document guidelines.
        </p>
      </section>

      {/* Interactive Roadmap / Stepper Section */}
      <section id="bidding-process" className="py-24 bg-surface-container-low border-b border-outline-variant/30 text-left">
        <div className="max-w-container-max mx-auto px-12">
          <div className="mb-16">
            <span className="font-label text-label-sm uppercase tracking-[0.2em] text-secondary mb-4 block font-bold">
              Workflow Guide
            </span>
            <h2 className="font-headline text-4xl text-primary">
              Key Steps in the Tender Bidding Process
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Step list column (Left) */}
            <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                    activeStep === idx
                      ? "bg-white border-secondary shadow-sm"
                      : "bg-transparent border-transparent hover:bg-white/50"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-xs font-bold ${
                      activeStep === idx
                        ? "bg-secondary text-white"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className={`font-label-md text-sm ${activeStep === idx ? "text-primary font-bold" : "text-on-surface-variant"}`}>
                      {step.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Detail Display (Right) */}
            <div className="lg:col-span-7 lg:sticky lg:top-32">
              <div className="bg-white p-10 rounded-xl border border-outline-variant/40 shadow-ambient min-h-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">
                        {steps[activeStep].icon}
                      </span>
                    </div>
                    <div>
                      <span className="font-label text-label-sm uppercase tracking-widest text-secondary block font-bold">
                        STEP {activeStep + 1} OF 12
                      </span>
                      <h3 className="font-headline text-2xl text-primary">
                        {steps[activeStep].title}
                      </h3>
                    </div>
                  </div>

                  <p className="font-body text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </div>

                {/* TendersPlus Support Callout */}
                <div className="bg-surface-container-low p-6 rounded border border-secondary/15 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">verified</span>
                    <div>
                      <h4 className="font-label-md text-sm text-secondary uppercase tracking-wider mb-2 font-bold">
                        How TendersPlus Assists You
                      </h4>
                      <p className="font-body text-sm text-on-surface leading-relaxed">
                        {steps[activeStep].support}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why TendersPlus Section */}
      <section id="why-tendersplus" className="py-24 max-w-container-max mx-auto px-12 border-b border-outline-variant/30">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="font-label text-label-sm uppercase tracking-[0.2em] text-secondary mb-4 block font-bold">
            Value Proposition
          </span>
          <h2 className="font-headline text-4xl text-primary mb-6">
            Why Choose TendersPlus?
          </h2>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Our team supports in easing the bidding process by considering the analysis of documents in detail related to GeM & other Authority Tenders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {valueProps.map((prop, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
                prop.highlight
                  ? "bg-primary text-white border-primary shadow-ambient"
                  : "bg-white text-on-surface border-outline-variant/40 hover:bg-surface-container-low/50"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-12 h-12 rounded flex items-center justify-center border ${
                      prop.highlight
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-surface-container border-outline-variant/20 text-secondary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{prop.icon}</span>
                  </div>
                  {prop.highlight && (
                    <span className="bg-secondary text-on-secondary font-label text-[10px] uppercase tracking-widest px-3 py-1 rounded">
                      POPULAR OFFER
                    </span>
                  )}
                </div>
                <h3 className={`font-headline text-xl mb-4 ${prop.highlight ? "text-white" : "text-primary"}`}>
                  {prop.title}
                </h3>
                <p className={`font-body text-sm leading-relaxed ${prop.highlight ? "text-white/80" : "text-on-surface-variant"}`}>
                  {prop.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Summary Footer */}
        <div className="mt-16 bg-white p-8 md:p-10 rounded-xl border border-outline-variant/40 shadow-sm text-left max-w-4xl mx-auto font-body">
          <p className="text-on-surface-variant leading-relaxed mb-6">
            In summary, the submission of documentation and financial bids is crucial for winning tenders in the competitive landscape of tendering. Sellers should approach this process with diligence and meticulous attention to detail. Understanding and adhering to the specific requirements outlined in the tender documents are essential steps to enhance the likelihood of success in the competitive bidding environment.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-outline-variant/30 pt-6">
            <span className="font-headline text-lg text-secondary italic">
              TendersPlus simplifies the bidding process, providing a one-stop solution.
            </span>
            <button
              onClick={() => {
                const el = document.getElementById("contact-trader");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary text-on-primary px-6 py-3 rounded-DEFAULT font-label-md text-label-md hover:opacity-90 transition-opacity cursor-pointer border-0"
            >
              CLAIM YOUR FREE TRIAL
            </button>
          </div>
        </div>
      </section>

      {/* Inquiry Intake Section */}
      <section id="contact-trader" className="py-24 bg-surface-container-high border-t border-outline-variant/30 text-left">
        <div className="max-w-container-max mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-10 md:p-12 rounded-xl border border-outline-variant/40 shadow-ambient">
              <div className="mb-10">
                <h2 className="font-headline text-3xl text-primary mb-2">
                  Claim Your Free Trial Bid
                </h2>
                <p className="font-body text-on-surface-variant text-sm">
                  Let us manage your first tender bidding or portal listing free of cost.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded bg-secondary-container/20 border border-secondary/20 text-center animate-fade-in font-body">
                  <span className="material-symbols-outlined text-secondary text-5xl mb-4">check_circle</span>
                  <h3 className="font-headline text-2xl text-primary mb-2">Request Submitted</h3>
                  <p className="text-on-surface-variant text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Our expert bidding coordination desk has received your request for <strong>{formData.company || "your enterprise"}</strong>. We will contact you at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> to initialize the free bidding process.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-10">
                  {formError && (
                    <div className="text-error text-sm font-semibold mb-4 bg-error-container/20 p-3 rounded border border-error/10">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none"
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
                        id="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none"
                      />
                      <label
                        htmlFor="company"
                        className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                      >
                        Company/Business Name
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                      >
                        Phone Number
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      id="requirement"
                      required
                      rows={3}
                      value={formData.requirement}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="peer w-full bg-transparent border-0 border-b border-outline focus:border-secondary focus:ring-0 px-0 py-3 transition-all text-on-surface outline-none resize-none font-body text-body-md"
                    />
                    <label
                      htmlFor="requirement"
                      className="absolute left-0 top-3 text-on-surface-variant/60 font-label text-label-md uppercase tracking-wider transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 transition-all pointer-events-none"
                    >
                      Bidding Target / Tender Specifications
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-5 rounded-DEFAULT font-label text-label-md tracking-[0.3em] uppercase hover:opacity-90 transition-opacity cursor-pointer border-0 font-bold"
                  >
                    INITIALIZE INQUIRY
                  </button>
                </form>
              )}
            </div>

            {/* Info Cards Column (Right) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Contact Details Card */}
              <div className="bg-white p-8 rounded-xl border border-outline-variant/40 shadow-sm">
                <h3 className="font-headline text-2xl text-primary mb-6">Personalised Support</h3>
                <div className="space-y-6 font-body">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary">mail</span>
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant block uppercase tracking-wider">Email Inquiry desk</span>
                      <a href="mailto:contact@tendersplus.com" className="text-secondary font-bold hover:underline">
                        contact@tendersplus.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary">phone_iphone</span>
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant block uppercase tracking-wider">Direct Hotline Support</span>
                      <a href="tel:9279921887" className="text-secondary font-bold hover:underline">
                        +91 9279921887
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section Reference Card */}
              <div className="bg-secondary text-white p-8 rounded-xl shadow-ambient">
                <h3 className="font-headline text-2xl mb-4 text-white">Got Questions?</h3>
                <p className="font-body text-sm text-white/80 leading-relaxed mb-6">
                  Visit our FAQ section on TendersPlus for dedicated Tender Bidding queries, or contact us directly for an agronomic-related or government marketplace contract assessment.
                </p>
                 <a
                  href="#contact-trader"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("contact-trader");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest bg-white/10 hover:bg-white/20 py-2.5 px-5 rounded transition-all cursor-pointer font-bold border border-white/20"
                >
                  Visit FAQs <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
