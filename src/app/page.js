"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Radar, Shield, Target, ChevronRight, ChevronLeft, Database, Mail, Phone, MapPin, Check, Plus, Minus, ShieldCheck, Globe, Share2, Users, AlertTriangle, Activity, Cloud, Lock, Server, Cpu, Code, Eye, GitBranch, CheckCircle, Percent, Zap, Layers, Terminal, Scale } from "lucide-react";
import FeaturesGrid from "../components/FeaturesGrid";

export default function Home() {
  // --- Active Diagnostics Scanner State (Embedded) ---
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("infra");

  // Custom Email exposure checker (Dark Web tab)
  const [customEmail, setCustomEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const [emailError, setEmailError] = useState(null);

  // Custom DKIM selector checker (Email Security tab)
  const [dkimSelector, setDkimSelector] = useState("");
  const [dkimLoading, setDkimLoading] = useState(false);
  const [dkimData, setDkimData] = useState(null);
  const [dkimError, setDkimError] = useState(null);

  // Terminal scanner simulator
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Testimonials Slider State & Data
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const testimonials = [
    {
      id: 1,
      name: "Rohit Verma",
      role: "CISO, PaySecure",
      avatar: "RV",
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.15)]",
      quote: "Trinetra AI has transformed our brand protection strategy. The visibility and accuracy are unmatched in the industry."
    },
    {
      id: 2,
      name: "Anita Sharma",
      role: "Head of Security, ShopCart",
      avatar: "AS",
      color: "border-purple-500/30 text-purple-400 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.15)]",
      quote: "The real-time alerts and actionable insights help us stay ahead of threats every single day. Absolute game-changer."
    },
    {
      id: 3,
      name: "Vikram Patel",
      role: "Security Director, FinTrust",
      avatar: "VP",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
      quote: "Excellent platform with powerful threat intelligence. Highly recommended for any financial organization."
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      role: "VP of SecOps, CloudVanguard",
      avatar: "SJ",
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.15)]",
      quote: "Trinetra AI's active scanning is a lifesaver. We identified 3 typosquatted domains targeting our customers within the first day of deployment."
    },

    {
      id: 5,
      name: "Marcus Vance",
      role: "CISO, FinLeap",
      avatar: "MV",
      color: "border-rose-500/30 text-rose-400 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.15)]",
      quote: "Before Trinetra, threat hunting was a manual chore. Now, the autonomous threat correlation gives us complete peace of mind."
    }
  ];

  const nextSlide = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };
  const prevSlide = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play interval for testimonials carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % 6);
    }, 4500); // slide every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  // Cybersecurity Risk Estimator State
  const [estDomains, setEstDomains] = useState(5);
  const [estSocials, setEstSocials] = useState(3);
  const [estEmployees, setEstEmployees] = useState(100);

  // Demo Form State
  const [demoForm, setDemoForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  // Collapsed state
  const [whoisCollapsed, setWhoisCollapsed] = useState(true);

  // Live Threat Logs inside Dashboard Mockup
  const [mockLiveThreats, setMockLiveThreats] = useState([
    { id: 1, type: "Fake domain detected", target: "example-brand-secure.com", risk: "High", time: "2m ago" },
    { id: 2, type: "Phishing page detected", target: "secure-login-update.com", risk: "High", time: "15m ago" },
    { id: 3, type: "Social impersonation", target: "@brand_support_official", risk: "Medium", time: "45m ago" },
    { id: 4, type: "Marketplace abuse", target: "Fake product listing found", risk: "Medium", time: "1h ago" },
  ]);

  const testSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const scanStages = [
    "Initializing Trinetra AI cyber core threat vector engine...",
    "Retrieving system DNS resolvers...",
    "Sending secure ICMP telemetry packets to target host...",
    "Querying authoritative zone DNS registers (A, MX, NS, TXT)...",
    "Initiating TLS 1.3 cryptographic handshake on port 443...",
    "Downloading public certificate chain & validating X.509 metadata...",
    "Auditing SPF validation schemas & DMARC alignment settings...",
    "Running parallel query for 5 default DKIM selectors...",
    "Generating lookalike domain permutations (Homoglyph substitutions)...",
    "Resolving active IP assignments on typosquatted domains...",
    "Running reputation checks on Google Safe Browsing API databases...",
    "Connecting to VirusTotal intelligence database for vendor reputation...",
    "Exposing darkweb credential leaks via XposedOrNot feeds...",
    "Retrieving public databases monitored directory (XposedOrNot)...",
    "Auditing Google Play Store apps using live scraper indexing...",
    "Querying Google News RSS for active brand threat reports...",
    "Running local brand risk index and priority AI models...",
    "Compiling business context news and global feed timelines...",
    "Generating secure digital threat posture grade & report..."
  ];

  // GSAP Animations on Mount
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section fade-ins
    gsap.from(".gsap-hero-title", {
      opacity: 0,
      y: 45,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".gsap-hero-sub", {
      opacity: 0,
      y: 35,
      duration: 1,
      delay: 0.25,
      ease: "power3.out",
    });

    gsap.from(".gsap-hero-ctas", {
      opacity: 0,
      y: 25,
      duration: 0.8,
      delay: 0.45,
      ease: "power3.out",
    });

    gsap.from(".gsap-hero-trust", {
      opacity: 0,
      y: 15,
      duration: 0.8,
      delay: 0.65,
      stagger: 0.15,
      ease: "power3.out",
    });

    gsap.from(".gsap-hero-dashboard", {
      opacity: 0,
      scale: 0.95,
      duration: 1.3,
      delay: 0.4,
      ease: "power3.out",
    });


  }, []);

  // Logger Simulator
  useEffect(() => {
    let interval;
    if (loading) {
      setConsoleLogs([]);
      setLogIndex(0);

      interval = setInterval(() => {
        setLogIndex((prevIndex) => {
          if (prevIndex < scanStages.length) {
            const time = new Date().toLocaleTimeString();
            setConsoleLogs((prevLogs) => [
              ...prevLogs,
              {
                time,
                text: `> ${scanStages[prevIndex]}`,
                type: prevIndex % 5 === 0 ? "ai" : prevIndex % 5 === 1 ? "success" : prevIndex % 5 === 2 ? "purple" : prevIndex % 5 === 3 ? "crimson" : "neutral"
              }
            ]);
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 140);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSearch = async (e, sampleQuery = null) => {
    if (e) e.preventDefault();
    const searchQuery = sampleQuery || query;
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);
    setEmailData(null);
    setDkimData(null);

    // Scroll to Diagnostics area
    testSectionRef.current?.scrollIntoView({ behavior: "smooth" });

    try {
      const response = await fetch("/api/monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName: searchQuery.trim() }),
      });

      const resJson = await response.json();

      // Delay to view logs
      await new Promise(resolve => setTimeout(resolve, 2800));

      if (resJson.success) {
        setData(resJson.data);
        setActiveTab("infra");
      } else {
        setError(resJson.message || "Failed to fetch domain data.");
      }
    } catch (err) {
      setError("An error occurred while monitoring the domain. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Custom Email Breach Scan (Dark Web)
  const handleEmailScan = async (e) => {
    e.preventDefault();
    if (!customEmail.trim() || !customEmail.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailLoading(true);
    setEmailError(null);
    setEmailData(null);

    try {
      const response = await fetch("/api/monitor/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: customEmail.trim() })
      });

      const resJson = await response.json();
      if (resJson.success) {
        setEmailData(resJson);
      } else {
        setEmailError(resJson.message || "Email check failed.");
      }
    } catch (err) {
      setEmailError("Error querying the leak database.");
    } finally {
      setEmailLoading(false);
    }
  };

  // Custom DKIM DNS Check
  const handleDkimScan = async (e) => {
    e.preventDefault();
    if (!dkimSelector.trim() || !data?.domain) {
      setDkimError("Please enter a valid selector name.");
      return;
    }

    setDkimLoading(true);
    setDkimError(null);
    setDkimData(null);

    try {
      const response = await fetch("/api/monitor/dkim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: data.domain,
          selector: dkimSelector.trim()
        })
      });

      const resJson = await response.json();
      if (resJson.success) {
        setDkimData(resJson);
      } else {
        setDkimError(resJson.message || "DKIM check failed.");
      }
    } catch (err) {
      setDkimError("Error checking DKIM record.");
    } finally {
      setDkimLoading(false);
    }
  };

  const selectSample = (sample) => {
    setQuery(sample);
    handleSearch(null, sample);
  };

  const calculateGrade = (report) => {
    if (!report) return { grade: "N/A", color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-800" };

    let score = 100;
    if (report.domainStatus.status === "offline") return { grade: "F", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/30" };
    if (!report.sslCertificate.valid) score -= 30;
    else if (report.sslCertificate.daysRemaining < 30) score -= 10;
    if (report.emailSecurity.spf.status === "missing") score -= 15;
    if (report.emailSecurity.dmarc.status === "missing") score -= 15;
    if (report.intelligence.virusTotal.maliciousCount > 0) score -= 25;
    const activeLookalikes = report.lookalikes.lookalikes.filter(l => l.active).length;
    score -= (activeLookalikes * 5);

    if (score >= 90) return { grade: "A", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" };
    if (score >= 80) return { grade: "B", color: "text-[#8b5cf6]", bg: "bg-indigo-500/10", border: "border-indigo-500/30" };
    if (score >= 70) return { grade: "C", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" };
    if (score >= 60) return { grade: "D", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" };
    return { grade: "F", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/30" };
  };

  const securityGrade = calculateGrade(data);

  const riskScore = Math.min(99, Math.max(15, Math.round((estDomains * 6 + estSocials * 8 + estEmployees * 0.08) + 10)));
  const weeklyAlerts = Math.round(estDomains * 1.5 + estSocials * 2.2 + estEmployees * 0.04);
  const darkWebMentions = Math.round(estEmployees * 0.07 + estDomains * 0.8);

  const getRiskDetails = (score) => {
    if (score > 70) {
      return {
        label: "CRITICAL RISK EXPOSURE",
        desc: "Immediate intervention required. High volume of active lookup attacks & imposter profiles.",
        color: "text-rose-450",
        stroke: "stroke-rose-500",
        bg: "bg-rose-500/5",
        border: "border-rose-500/20",
        pulse: "bg-rose-500"
      };
    } else if (score > 40) {
      return {
        label: "ELEVATED RISK EXPOSURE",
        desc: "Active vectors detected. Enhanced brand protection and daily threat auditing recommended.",
        color: "text-amber-450",
        stroke: "stroke-amber-500",
        bg: "bg-amber-500/5",
        border: "border-amber-500/20",
        pulse: "bg-amber-500"
      };
    } else {
      return {
        label: "SECURE PROFILE POSTURE",
        desc: "Healthy security posture. Continuous low-profile brand vulnerability indexing is recommended.",
        color: "text-emerald-400",
        stroke: "stroke-emerald-400",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20",
        pulse: "bg-emerald-400"
      };
    }
  };

  const risk = getRiskDetails(riskScore);

  // Configuration for dynamic security architecture section customized for Trinetra AI features
  const securitySources = [
    {
      name: "DNS & Domains",
      icon: Globe,
      desc: "CNAME records, SPF/DKIM/DMARC TXT, DNSSEC signatures",
      activeAgents: [1, 6], // Takeover Detector, Email Security Validator
      activeModules: [0, 6], // Surface Analyzer, DNSSEC & Mail Auditor
    },
    {
      name: "Public IPs & Ports",
      icon: Server,
      desc: "Shodan exposed hosts, TCP socket states, shadow IT",
      activeAgents: [3, 7], // Port Scanning Agent, Vulnerability Assessor
      activeModules: [2, 5], // Exposed Port Map, Timeline Log
    },
    {
      name: "Dark Web Crawler",
      icon: Database,
      desc: "Ahmia Tor gateway crawls, onion paste leak monitoring",
      activeAgents: [5, 7], // Secrets Leak Agent, Vulnerability Assessor
      activeModules: [1, 4], // Dark Web Monitor, Gemini Insights Engine
    },
    {
      name: "SSL & HTTP Headers",
      icon: Lock,
      desc: "TLS certificate strength, CSP policies, HSTS flags",
      activeAgents: [4], // Cryptography Inspector
      activeModules: [3, 6], // Web Posture Check, DNSSEC & Mail Auditor
    },
    {
      name: "Exposed Secret Files",
      icon: Code,
      desc: ".env probes, .git configs, legacy backups, stack versions",
      activeAgents: [5, 7], // Secrets Leak Agent, Vulnerability Assessor
      activeModules: [2, 3], // Exposed Port Map, Web Posture Check
    },
    {
      name: "Social Networks",
      icon: Radar,
      desc: "HTTP footprint audits, brand impersonation vectors",
      activeAgents: [2, 7], // OSINT Web Crawler, Vulnerability Assessor
      activeModules: [1, 4], // Dark Web Monitor, Gemini Insights Engine
    },
  ];

  const microAgents = [
    { name: "Reputation Scanner", icon: ShieldCheck },
    { name: "Takeover Detector", icon: GitBranch },
    { name: "OSINT Web Crawler", icon: Search },
    { name: "Port Scanning Agent", icon: Radar },
    { name: "Cryptography Inspector", icon: Lock },
    { name: "Secrets Leak Agent", icon: Code },
    { name: "Email Security Validator", icon: Mail },
    { name: "Vulnerability Assessor", icon: Cpu },
  ];

  const platformModules = [
    { name: "Surface Analyzer", desc: "Shodan & VT exposed assets tracking" },
    { name: "Dark Web Monitor", desc: "Active Onion space surveillance logs" },
    { name: "Exposed Port Map", desc: "Live TCP socket status auditor" },
    { name: "Web Posture Check", desc: "SSL profiles & security header compliance" },
    { name: "Gemini Insights Engine", desc: "Executive reports & remediation plans" },
    { name: "DNSSEC & Mail Auditor", desc: "SPF, DKIM, DMARC validation" },
    { name: "Timeline Log", desc: "Audit logs of threat exposures" },
  ];

  // Demo Submission
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoLoading(true);
    setTimeout(() => {
      setDemoLoading(false);
      setDemoSubmitted(true);
      setDemoForm({ name: "", email: "", company: "", phone: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020204] text-slate-100 flex flex-col font-sans selection:bg-[#8b5cf6] selection:text-white relative overflow-hidden">

      {/* Indigo Cyber Grid backdrop */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-0"></div>
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none z-0"></div>

      {/* Indigo/Purple Ambient Glows */}
      <div className="absolute -top-48 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/15 via-indigo-900/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0 glow-spot"></div>
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-gradient-to-br from-indigo-950/15 via-purple-950/5 to-transparent rounded-full blur-[130px] pointer-events-none z-0 glow-spot"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-950/10 via-transparent to-transparent rounded-full blur-[160px] pointer-events-none z-0 glow-spot"></div>

      {/* 1. Header/Navbar (Fixed on scroll, blur background) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <header className="bg-[#050409]/40 backdrop-blur-xl rounded-xl py-3 px-6 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] border border-white/[0.08] hover:border-[#8b5cf6]/35 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Image src="/logo.jpg" alt="Trinetra AI Logo" width={32} height={32} className="object-cover" />
            </div>
            <span className="text-lg font-black tracking-widest text-white flex items-center gap-1 font-cyber">
              TRINETRA <span className="text-[#8b5cf6] font-bold">AI</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-slate-400 font-cyber">
            <div className="relative group cursor-pointer hover:text-white flex items-center gap-1">
              Product <span className="text-[10px] text-slate-650">▼</span>
            </div>
            <div className="relative group cursor-pointer hover:text-white flex items-center gap-1">
              Solutions <span className="text-[10px] text-slate-650">▼</span>
            </div>
            <div className="relative group cursor-pointer hover:text-white flex items-center gap-1">
              Resources <span className="text-[10px] text-slate-650">▼</span>
            </div>

            <div className="relative group cursor-pointer hover:text-white flex items-center gap-1">
              Company <span className="text-[10px] text-slate-650">▼</span>
            </div>
          </nav>

          <div className="flex items-center space-x-4 font-cyber">
            <a href="/login" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer">
              Log in
            </a>
            <button
              onClick={() => {
                contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative group inline-flex items-center justify-center bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md shadow-indigo-500/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] active:scale-95 cursor-pointer overflow-hidden"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
              <span className="relative flex items-center gap-1.5">Schedule Demo <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
            </button>
          </div>
        </header>
      </div>

      {/* 2. Restructured Hero Section (Perspective 3D Mockup Display) */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-28 w-full bg-[url('/hero_cyber_bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden border-b border-zinc-900/60 z-10">
        {/* Dark overlay to merge the background image smoothly with the main background color and keep text highly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/92 via-[#020204]/75 to-[#020204]/94 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Text details */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold tracking-widest uppercase font-cyber shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Next-Gen Cyber Intelligence
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] font-sans">
              Autonomous <br className="hidden lg:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#0ea5e9] to-[#10b981] animate-pulse">Threat Detection</span> <br className="hidden lg:inline" />
              & Brand Protection
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Trinetra AI correlates intelligence from 15+ attack vectors to instantly identify and neutralize phishing, impersonation, and dark web threats before they impact your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 font-cyber">
              <button
                onClick={() => { testSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                className="relative group inline-flex items-center justify-center bg-[#8b5cf6] hover:bg-[#7c3aed] active:scale-[0.98] text-white font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300 text-xs uppercase tracking-wider overflow-hidden"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-72 opacity-10"></span>
                <span className="relative flex items-center gap-2">Explore Platform <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </button>
              <button
                onClick={() => { contactSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                className="relative group inline-flex items-center justify-center bg-transparent hover:bg-zinc-900/60 text-slate-300 hover:text-white border border-zinc-800 hover:border-zinc-700 font-bold px-8 py-4 rounded-xl transition-all duration-300 text-xs uppercase tracking-wider overflow-hidden"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-72 opacity-5"></span>
                <span className="relative flex items-center gap-2">Book a Live Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-10 max-w-2xl mx-auto lg:mx-0">
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600 mb-4 font-cyber">Trusted by Enterprise Security Teams</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#8b5cf6]" />
                  <span className="text-xs font-bold text-slate-400">24/7 AI Overatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radar className="w-5 h-5 text-[#0ea5e9]" />
                  <span className="text-xs font-bold text-slate-400">Deep Vector Scan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#10b981]" />
                  <span className="text-xs font-bold text-slate-400">Zero-Day Defense</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Dashboard Image */}
          <div className="lg:col-span-6 relative flex justify-center w-full perspective-card mt-12 lg:mt-0 z-10">
            <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-[#8b5cf6]/30 via-transparent to-[#0ea5e9]/30 blur-[100px] pointer-events-none"></div>

            <div className="relative w-full max-w-[750px] perspective-card-inner transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
              <div className="bg-[#050509]/90 backdrop-blur-2xl rounded-2xl p-2 sm:p-3 border border-zinc-800/80 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="rounded-xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[#8b5cf6]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
                  <div className="scanline"></div>
                  <div className="absolute top-4 left-4 z-20 bg-black/85 border border-zinc-800 px-3 py-1.5 rounded font-mono text-[9px] text-[#10b981] flex items-center gap-2 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping"></span>
                    <span>OVERWATCH AGENT ONLINE</span>
                  </div>
                  <Image
                    src="/cybersecurity_dashboard.png"
                    alt="Trinetra AI Advanced Cybersecurity Platform"
                    width={1400}
                    height={900}
                    priority
                    className="w-full h-auto object-cover rounded-xl shadow-inner relative z-0"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* 3. Trusted Companies Section */}
      <section className="py-12 bg-[#020204] relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b5cf6]/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8 font-cyber flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-slate-700"></span>
            <span><span className="text-[#8b5cf6]">TRUSTED BY</span> SECURITY TEAMS WORLDWIDE</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-slate-700"></span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {["Microsoft", "Adobe", "Atlassian", "Stripe", "Salesforce", "HubSpot"].map((name) => (
              <div key={name} className="relative group cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8b5cf6]/20 to-[#0ea5e9]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#050508]/80 backdrop-blur-md border border-zinc-800/80 px-8 py-3.5 rounded-lg flex items-center justify-center shadow-lg group-hover:border-[#8b5cf6]/40 group-hover:-translate-y-1 transition-all duration-300">
                  <span className="font-cyber font-black text-xs md:text-sm tracking-widest text-slate-500 group-hover:text-white transition-colors uppercase flex items-center gap-2">
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4b. Interactive Cyber Architecture Data Engine Section */}
      <section className="py-24 relative z-10 overflow-hidden border-t border-zinc-900/60 bg-[url('/engine_cyber_dark_bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/96 via-[#020204]/93 to-[#020204]/96 backdrop-blur-[1px] z-0"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#8b5cf6]/5 blur-[130px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#0ea5e9]/5 blur-[130px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#8b5cf6] px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">INTEGRATED ARCHITECTURE</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-6">Autonomous Security Data Engine</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
              Trace how Trinetra AI processes live logs from across your entire internet-facing footprint to drive active micro-agents and enforce continuous exposure validation.
            </p>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Enterprise Security Data Sources (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4 flex flex-col justify-center">
              <div className="text-left mb-2">
                <span className="text-[10px] uppercase font-cyber font-bold tracking-wider text-slate-500 block">01 / Input threat vectors</span>
                <h3 className="text-xs font-black text-slate-350 uppercase tracking-widest mt-1">Security Data Inputs</h3>
              </div>
              
              <div className="space-y-3">
                {securitySources.map((source, idx) => {
                  const Icon = source.icon;
                  const isActive = activeSourceIndex === idx;
                  return (
                    <button
                      key={source.name}
                      onClick={() => setActiveSourceIndex(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative group cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-[#8b5cf6]/20 via-[#8b5cf6]/10 to-transparent border-[#8b5cf6]/55 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                          : "bg-slate-950/90 border-zinc-900/80 backdrop-blur-md hover:border-zinc-750 hover:bg-[#07070c]/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                          isActive
                            ? "bg-[#8b5cf6]/20 border-[#8b5cf6]/40 text-[#8b5cf6]"
                            : "bg-[#0b0b12] border-zinc-850 text-slate-400 group-hover:text-white"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`block text-xs font-bold transition-colors ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                            {source.name}
                          </span>
                          <span className="block text-[9px] text-slate-500 truncate mt-0.5 font-medium leading-none">
                            {source.desc}
                          </span>
                        </div>
                      </div>
                      
                      {/* Interactive edge dot indicators */}
                      {isActive && (
                        <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#8b5cf6] rounded-full border border-black shadow-[0_0_8px_#8b5cf6] z-20"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Central AI Brain & Security Lakehouse (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/65 backdrop-blur-2xl border border-white/[0.08] rounded-3xl relative overflow-hidden min-h-[460px]">
              {/* Circuit background traces inside the central engine card */}
              <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none z-0"></div>
              
              {/* Dynamic SVG data flow paths connecting Left Sources to Center Brain */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block" viewBox="0 0 400 500">
                {/* Flow lines from left button coordinates to center brain input (x: 200, y: 175) */}
                {securitySources.map((_, idx) => {
                  const yStart = 50 + idx * 72;
                  const isActive = activeSourceIndex === idx;
                  return (
                    <path
                      key={idx}
                      d={`M 10 ${yStart} C 100 ${yStart}, 120 175, 185 175`}
                      fill="none"
                      stroke={isActive ? "#8b5cf6" : "#27272a"}
                      strokeWidth={isActive ? "2" : "1"}
                      className={isActive ? "animate-dash-flow" : ""}
                      opacity={isActive ? "0.85" : "0.2"}
                      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                    />
                  );
                })}
                
                {/* Flow lines from center brain (x: 200, y: 175) to AI Micro agents list on the right (approx x: 390) */}
                {microAgents.map((agent, idx) => {
                  const yEnd = 45 + idx * 52;
                  const isAgentActive = securitySources[activeSourceIndex].activeAgents.includes(idx);
                  return (
                    <path
                      key={idx}
                      d={`M 215 175 C 280 175, 300 ${yEnd}, 390 ${yEnd}`}
                      fill="none"
                      stroke={isAgentActive ? "#0ea5e9" : "#27272a"}
                      strokeWidth={isAgentActive ? "1.5" : "0.75"}
                      className={isAgentActive ? "animate-dash-flow" : ""}
                      opacity={isAgentActive ? "0.85" : "0.15"}
                      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                    />
                  );
                })}
              </svg>

              <div className="relative z-20 flex flex-col items-center space-y-6 w-full">
                
                {/* Glowing AI Brain */}
                <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-black/85 border border-zinc-800 shadow-[0_10px_35px_rgba(0,0,0,0.85)] animate-brain-glow z-20">
                  <div className="absolute inset-0 bg-[#8b5cf6]/10 rounded-full blur-xl pointer-events-none"></div>
                  
                  {/* Glowing neon brain logo */}
                  <svg className="w-14 h-14 text-[#0ea5e9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-2.735l-.014-.09a3.75 3.75 0 00-.733-1.74l-.062-.078a3.75 3.75 0 01-.692-2.138v-.151A3.75 3.75 0 0010.5 7.5H10a3.75 3.75 0 00-3.75 3.75v.065c0 .942-.352 1.851-.988 2.53l-.116.124a3.75 3.75 0 00-.898 2.454l-.004.143a3.75 3.75 0 003.75 3.75h.5a3.75 3.75 0 003.75-3.75z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 01-.495-2.735l.014-.09a3.75 3.75 0 01.733-1.74l.062-.078a3.75 3.75 0 00.692-2.138v-.151A3.75 3.75 0 0113.5 7.5H14a3.75 3.75 0 013.75 3.75v.065c0 .942.352 1.851.988 2.53l.116.124a3.75 3.75 0 01.898 2.454l.004.143a3.75 3.75 0 01-3.75 3.75h-.5a3.75 3.75 0 01-3.75-3.75z" />
                    <circle cx="12" cy="7.5" r="1.5" fill="#8b5cf6" />
                    <circle cx="6.5" cy="11.5" r="1" fill="#8b5cf6" />
                    <circle cx="17.5" cy="11.5" r="1" fill="#0ea5e9" />
                    <line x1="12" y1="9" x2="12" y2="21" stroke="#8b5cf6" />
                  </svg>
                  
                  {/* Orbiting data rings */}
                  <div className="absolute inset-0 border border-indigo-500/20 border-dashed rounded-full animate-orbit"></div>
                </div>

                {/* Central Data Lakehouse */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-14 bg-black/70 border border-zinc-800 rounded-lg flex flex-col justify-between p-2 shadow-inner relative">
                    <div className="absolute inset-x-0 -top-1.5 h-3 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
                      <div className="w-16 h-1 bg-cyan-500/20 rounded-full"></div>
                    </div>
                    
                    <div className="flex justify-between items-center w-full mt-2">
                      <Database className="w-4 h-4 text-[#0ea5e9]" />
                      <div className="h-1 w-8 bg-zinc-800 rounded overflow-hidden">
                        <div className="h-full bg-[#0ea5e9] animate-pulse w-3/4"></div>
                      </div>
                    </div>
                    <div className="text-[7px] font-mono text-center font-black tracking-widest text-[#0ea5e9] leading-none uppercase">
                      THREAT DB
                    </div>
                  </div>
                  <span className="text-[10px] font-cyber font-extrabold text-slate-400 mt-2 block tracking-widest">GEMINI SEC CORE</span>
                </div>

                {/* Status Bar Console */}
                <div className="w-full bg-[#05050a] border border-zinc-900 rounded-xl p-3 text-center space-y-1.5 shadow-lg">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping"></span>
                    <span className="text-[8px] font-mono text-slate-400 tracking-wider font-bold uppercase">
                      ANALYSIS CLUSTER ACTIVE
                    </span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#0ea5e9] h-4 overflow-hidden truncate">
                    Correlating vector: {securitySources[activeSourceIndex].name}...
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: AI Micro Agents (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-4 flex flex-col justify-center">
              <div className="text-left mb-2">
                <span className="text-[10px] uppercase font-cyber font-bold tracking-wider text-slate-500 block">02 / Engine agent cluster</span>
                <h3 className="text-xs font-black text-slate-350 uppercase tracking-widest mt-1">AI Micro Agents</h3>
              </div>

              <div className="space-y-2.5">
                {microAgents.map((agent, idx) => {
                  const AgentIcon = agent.icon;
                  const isAgentActive = securitySources[activeSourceIndex].activeAgents.includes(idx);
                  return (
                    <div
                      key={agent.name}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-[11px] font-bold transition-all duration-350 ${
                        isAgentActive
                          ? "bg-[#0ea5e9]/15 border-[#0ea5e9]/55 text-white shadow-[0_0_15px_rgba(14,165,233,0.2)] scale-[1.02] border-l-2"
                          : "bg-slate-950/85 border-zinc-900/65 backdrop-blur-md text-slate-450 opacity-65 hover:opacity-90"
                      }`}
                    >
                      <AgentIcon className={`w-3.5 h-3.5 ${isAgentActive ? "text-[#0ea5e9]" : "text-slate-650"}`} />
                      <span className="truncate leading-none">{agent.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 4: Platform Modules (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4 flex flex-col justify-center">
              <div className="text-left mb-2">
                <span className="text-[10px] uppercase font-cyber font-bold tracking-wider text-slate-500 block">03 / Platform module outputs</span>
                <h3 className="text-xs font-black text-slate-350 uppercase tracking-widest mt-1">Platform Modules</h3>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {platformModules.map((module, idx) => {
                  const isModuleActive = securitySources[activeSourceIndex].activeModules.includes(idx);
                  return (
                    <div
                      key={module.name}
                      className={`p-3 rounded-xl border text-[11px] font-bold transition-all duration-300 relative overflow-hidden ${
                        isModuleActive
                          ? "bg-gradient-to-r from-[#10b981]/20 to-transparent border-[#10b981]/55 text-white shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-[1.03]"
                          : "bg-slate-950/85 border-zinc-900/65 backdrop-blur-md text-slate-450"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate leading-none">{module.name}</span>
                        {isModuleActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_5px_#10b981] animate-pulse"></span>
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                        )}
                      </div>
                      
                      {/* Module Description to improve UI fidelity */}
                      <p className={`text-[9px] font-medium leading-tight mt-1 truncate ${isModuleActive ? "text-[#10b981]/85" : "text-slate-650"}`}>
                        {module.desc}
                      </p>
                      
                      {/* Active modules have a glowing sidebar indicators */}
                      {isModuleActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#10b981]"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Restructured Capabilities Bento Grid */}
      <section id="threat-landscape" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


        {/* Comprehensive 15-Feature Grid */}
        <div className="">
          <FeaturesGrid />
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-24 relative z-10 bg-[url('/cyber_steps_bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden border-y border-zinc-900/60">
        <div className="absolute inset-0 bg-[#020204]/90 backdrop-blur-[1.5px] z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto space-y-3 mb-24">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#10b981] px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">HOW IT WORKS</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-6">AI-Powered Protection in 3 Steps</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* The connector line (Hidden on mobile) */}
            <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-zinc-700 to-transparent z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 group">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-[#8b5cf6] to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-700"></div>
              <div className="bg-[#050508]/45 backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl h-full transform transition duration-500 group-hover:-translate-y-2 group-hover:border-[#8b5cf6]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] group-hover:shadow-[0_20px_50px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#0a0a12] border border-[#8b5cf6]/30 flex items-center justify-center mb-8 shadow-[0_0_25px_rgba(139,92,246,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(139,92,246,0.3)] transition duration-500">
                  <Search className="w-8 h-8 text-[#8b5cf6]" />
                </div>
                <div className="text-[10px] text-[#8b5cf6] font-bold tracking-widest uppercase mb-3">Step 01</div>
                <h3 className="text-xl font-bold text-white mb-4">Continuous Monitor</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We continuously scan the open web, social platforms, marketplaces, and deep/dark web environments 24/7.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 group mt-4 lg:mt-0">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-[#0ea5e9] to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-700"></div>
              <div className="bg-[#050508]/45 backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl h-full transform transition duration-500 group-hover:-translate-y-2 group-hover:border-[#0ea5e9]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] group-hover:shadow-[0_20px_50px_rgba(14,165,233,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#0a0a12] border border-[#0ea5e9]/30 flex items-center justify-center mb-8 shadow-[0_0_25px_rgba(14,165,233,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(14,165,233,0.3)] transition duration-500">
                  <Radar className="w-8 h-8 text-[#0ea5e9]" />
                </div>
                <div className="text-[10px] text-[#0ea5e9] font-bold tracking-widest uppercase mb-3">Step 02</div>
                <h3 className="text-xl font-bold text-white mb-4">Detect & Analyze</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  AI models instantly analyze and prioritize threats based on potential business risk, impact, and attacker intent.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 group mt-4 lg:mt-0">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-[#10b981] to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-700"></div>
              <div className="bg-[#050508]/45 backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl h-full transform transition duration-500 group-hover:-translate-y-2 group-hover:border-[#10b981]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#0a0a12] border border-[#10b981]/30 flex items-center justify-center mb-8 shadow-[0_0_25px_rgba(16,185,129,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition duration-500">
                  <Shield className="w-8 h-8 text-[#10b981]" />
                </div>
                <div className="text-[10px] text-[#10b981] font-bold tracking-widest uppercase mb-3">Step 03</div>
                <h3 className="text-xl font-bold text-white mb-4">Alert & Protect</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Get real-time alerts and actionable playbooks to instantly take down threats and protect your brand's reputation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. All Your Brand Threats. One Unified View. (Split Dashboard Section) */}
      <section id="live-soc" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#8b5cf6] px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">POWERFUL DASHBOARD</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mt-6">
                All Your Brand Threats.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#0ea5e9]">One Unified View.</span>
              </h2>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              Stop switching between tabs. Trinetra correlates intelligence from 15+ vectors into a single, intuitive dashboard giving you absolute visibility over your attack surface.
            </p>

            <ul className="space-y-4 font-medium text-sm text-slate-300">
              {[
                "Real-time threat intelligence feeds",
                "Interactive visual threat timeline",
                "Geographic risk prioritization heatmap",
                "Automated custom executive reports"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 group cursor-default">
                  <div className="w-5 h-5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center group-hover:bg-[#10b981]/20 transition-colors">
                    <span className="text-[#10b981] text-[10px] font-bold">✓</span>
                  </div>
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => { testSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-6 relative group inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold text-white transition-all duration-300 bg-[#8b5cf6] rounded-xl overflow-hidden hover:bg-[#7c3aed] shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center gap-2">Explore Dashboard <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </button>
          </div>

          <div className="lg:col-span-7 relative flex justify-center w-full mt-10 lg:mt-0 perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/30 to-[#0ea5e9]/30 blur-[100px] opacity-40 rounded-full transform rotate-12"></div>

            <div className="relative bg-[#050508]/80 backdrop-blur-xl rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full border border-zinc-800/80 transform hover:scale-[1.02] transition duration-700">
              <div className="absolute top-0 left-10 w-32 h-1 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent opacity-50"></div>
              <div className="rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/10 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700 z-10 pointer-events-none"></div>
                <Image
                  src="/brand_threat_landscape.png"
                  alt="Trinetra AI Brand Threat Correlation Map"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Statistics Row */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="bg-[#050508] border border-zinc-800/60 p-6 rounded-2xl relative flex flex-col sm:flex-row sm:items-center gap-5 hover:border-emerald-500/30 transition duration-500">
                <div className="w-14 h-14 rounded-xl bg-[#0a0a12] border border-emerald-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition duration-500">
                  <Database className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white tracking-tight">50M+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Assets Monitored</div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-purple-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="bg-[#050508] border border-zinc-800/60 p-6 rounded-2xl relative flex flex-col sm:flex-row sm:items-center gap-5 hover:border-purple-500/30 transition duration-500">
                <div className="w-14 h-14 rounded-xl bg-[#0a0a12] border border-purple-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-110 transition duration-500">
                  <Radar className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white tracking-tight">200K+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Threats Detected</div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500/20 to-sky-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="bg-[#050508] border border-zinc-800/60 p-6 rounded-2xl relative flex flex-col sm:flex-row sm:items-center gap-5 hover:border-sky-500/30 transition duration-500">
                <div className="w-14 h-14 rounded-xl bg-[#0a0a12] border border-sky-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.15)] group-hover:scale-110 transition duration-500">
                  <Target className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white tracking-tight">99.8%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Detection Accuracy</div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-amber-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="bg-[#050508] border border-zinc-800/60 p-6 rounded-2xl relative flex flex-col sm:flex-row sm:items-center gap-5 hover:border-amber-500/30 transition duration-500">
                <div className="w-14 h-14 rounded-xl bg-[#0a0a12] border border-amber-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:scale-110 transition duration-500">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white tracking-tight">24/7</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Continuous Protection</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Combined Testimonials & Comparison Sections with shared fixed background */}
      <div className="relative w-full bg-[url('/testimonials_comparison_bg.png')] bg-cover bg-center bg-fixed bg-no-repeat overflow-hidden border-y border-zinc-900/60 z-10">
        {/* Dark overlay to blend background image and keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/92 via-[#020204]/80 to-[#020204]/94 backdrop-blur-[0.5px] z-0"></div>

        {/* 8. Testimonials Section with Carousel Slider */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8b5cf6]/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10 gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#8b5cf6] px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">TRUSTED BY SECURITY LEADERS</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">What CISOs Say About Us</h2>
            </div>

            {/* Carousel Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="p-3 rounded-xl border border-zinc-800 bg-[#050508]/80 hover:bg-[#0a0a0f] hover:border-[#8b5cf6]/50 text-slate-400 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-xl border border-zinc-800 bg-[#050508]/80 hover:bg-[#0a0a0f] hover:border-[#8b5cf6]/50 text-slate-400 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[0, 1, 2].map((offset) => {
              const index = (currentTestimonialIndex + offset) % testimonials.length;
              const item = testimonials[index];
              return (
                <div
                  key={item.id}
                  className={`bg-[#050508]/45 backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl relative group hover:-translate-y-2 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#8b5cf6]/50 flex flex-col min-h-[280px] animate-fadeIn ${offset === 1 ? 'hidden md:flex' : offset === 2 ? 'hidden lg:flex' : 'flex'
                    }`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="mb-6 opacity-30 group-hover:opacity-60 transition duration-500">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-1 italic">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center space-x-4 mt-auto pt-6 border-t border-zinc-800/50">
                    <div className={`h-10 w-10 rounded-full border flex items-center justify-center text-xs font-bold transition duration-500 ${item.color}`}>
                      {item.avatar}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">{item.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{item.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel indicator dots */}
          <div className="flex justify-center items-center gap-2.5 mt-10 relative z-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonialIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentTestimonialIndex === idx ? 'w-8 bg-[#8b5cf6]' : 'w-2 bg-zinc-850 hover:bg-zinc-700'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 10. Comparison Table Section */}
        <section className="py-24 relative z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10b981]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#10b981] px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">EVALUATION GUIDE</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-6">Trinetra AI vs Legacy Platforms</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
                How our automated threat correlation compares to outdated manual monitoring frameworks.
              </p>
            </div>

            <div className="bg-[#050508]/80 backdrop-blur-xl rounded-3xl border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-5xl mx-auto overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#10b981] to-transparent opacity-50"></div>

              <div className="grid grid-cols-12 gap-4 p-6 border-b border-zinc-800/50 bg-[#0a0a0f]/50">
                <div className="col-span-5 md:col-span-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Monitoring Vectors</div>
                <div className="col-span-7 md:col-span-4 text-xs font-black text-[#10b981] uppercase tracking-widest text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 hidden sm:block" /> Trinetra AI Core
                </div>
                <div className="hidden md:flex col-span-4 text-xs font-bold text-slate-500 uppercase tracking-widest justify-center">Traditional Solutions</div>
              </div>

              <div className="divide-y divide-zinc-800/50">
                {[
                  { feature: "AI Detection & Mappings", us: "Real-time Permutations", them: "Manual lookup directories" },
                  { feature: "Real-Time DNS Scans", us: "Live API Handshakes", them: "Daily/weekly cron logs" },
                  { feature: "Marketplace Scraping", us: "15+ Portals Audited", them: "Limited domain registries" },
                  { feature: "Automated Takedown DMCA", us: "Instant Legal Alerts", them: "Manual lawyer consultation" },
                  { feature: "Dark Web Monitoring", us: "Tor Forum Indexing", them: "No dark web scan capabilities" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/[0.02] transition-colors group">
                    <div className="col-span-12 md:col-span-4 font-bold text-white text-sm mb-2 md:mb-0">{row.feature}</div>
                    <div className="col-span-6 md:col-span-4 flex items-center justify-start md:justify-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#10b981]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-[#10b981] font-bold" />
                      </div>
                      <span className="text-emerald-400 font-bold text-sm">{row.us}</span>
                    </div>
                    <div className="col-span-6 md:col-span-4 text-slate-500 font-medium text-sm text-right md:text-center">
                      {row.them}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>



      {/* 11b. Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-zinc-900/60">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#8b5cf6] px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">TRANSPARENT PRICING</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-6">Plans Built For Any Brand Scale</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            Choose the package matching your security monitoring scale. 14-day free trial on Startup & Professional tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-[#050508]/90 border border-zinc-800/80 p-8 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition duration-500 shadow-xl">
            <div>
              <div className="text-[#8b5cf6] text-xs font-bold uppercase tracking-wider mb-2">Startup Shield</div>
              <div className="text-3xl font-black text-white mb-4">$499 <span className="text-xs text-slate-500 font-medium">/ month</span></div>
              <p className="text-slate-450 text-xs mb-8">Essential digital asset protection & monitoring for startups and independent brands.</p>

              <ul className="space-y-4 mb-8 text-xs text-slate-350">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Up to 3 Monitored Domains</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Lookalike Permutations Check</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Basic Social Footprint</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Daily Core Scan Cycle</li>
              </ul>
            </div>
            <button
              onClick={() => contactSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="w-full bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-xs uppercase tracking-wider transition"
            >
              Start Free Trial
            </button>
          </div>

          {/* Card 2 - Featured */}
          <div className="bg-gradient-to-b from-[#0a0a14] to-[#050508] border-2 border-[#8b5cf6] p-8 rounded-2xl flex flex-col justify-between hover:scale-[1.01] transition duration-500 shadow-2xl relative">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#8b5cf6] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              Popular Plan
            </div>
            <div>
              <div className="text-[#8b5cf6] text-xs font-bold uppercase tracking-wider mb-2">Professional Overwatch</div>
              <div className="text-3xl font-black text-white mb-4">$1,299 <span className="text-xs text-slate-500 font-medium">/ month</span></div>
              <p className="text-slate-455 text-xs mb-8">Full monitoring overwatch cycle including dark web scanning and automated DMCA alerts.</p>

              <ul className="space-y-4 mb-8 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Up to 10 Monitored Domains</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Tor Darkweb Forum Scraper</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> 15+ Core Threat Vectors</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> API Access & Integration Webhooks</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Hourly Scan Priority Loops</li>
              </ul>
            </div>
            <button
              onClick={() => contactSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.3)] transition"
            >
              Start Free Trial
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-[#050508]/90 border border-zinc-800/80 p-8 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition duration-500 shadow-xl">
            <div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Enterprise Custom</div>
              <div className="text-3xl font-black text-white mb-4">Contact Sales</div>
              <p className="text-slate-450 text-xs mb-8">Tailored threat intelligence feeds, legal take-down support, and dedicated analyst review loops.</p>

              <ul className="space-y-4 mb-8 text-xs text-slate-350">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Unlimited Monitored Assets</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Dedicated Threat Intelligence Analyst</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Custom Legal Action (DMCA Assist)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Full SIEM & SOAR Native Plugins</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#8b5cf6]" /> Custom Scan Intervals</li>
              </ul>
            </div>
            <button
              onClick={() => contactSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="w-full bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-xs uppercase tracking-wider transition"
            >
              Contact Sales Team
            </button>
          </div>

        </div>
      </section>



      {/* 12. FAQ Section & Get In Touch (Combined Split Layout) */}
      <section id="contact" ref={contactSectionRef} className="py-24 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left FAQ Accordion */}
            <div className="lg:col-span-6 space-y-10">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#8b5cf6] px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">FAQ</span>
                <h2 className="text-3xl sm:text-5xl font-black text-white mt-6 tracking-tight">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {[
                  { q: "What types of threats can Trinetra detect?", a: "Trinetra AI monitors lookalike domain registrations, phishing scams, social media profiles impersonations, dark web exposures, credential leaks, and counterfeit app directories." },
                  { q: "How often are scans performed?", a: "Scans run continuously. Standard queries cycle daily, while priority enterprise assets check on constant hourly and real-time CT log loops." },
                  { q: "Can I monitor multiple brands and domains?", a: "Yes, you can register and monitor multiple domains, trademarks, social handles, and subsidiaries directly through our overwatch interface." },
                  { q: "Does Trinetra include dark web monitoring?", a: "Yes, our threat intelligence gathers packet dumps, pastes registries, and Tor forum credentials logs to alert you on mailbox associations leaks." },
                  { q: "Is API access available?", a: "API endpoints are available on our Professional and Enterprise plans, permitting direct integrations with SIEM tools." }
                ].map((faq, idx) => (
                  <div key={idx} className={`border ${openFaq === idx ? 'border-[#8b5cf6]/50 bg-[#8b5cf6]/5' : 'border-zinc-800/80 bg-[#050508]'} rounded-2xl overflow-hidden transition-all duration-300`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-6 font-bold text-white text-sm flex justify-between items-center focus:outline-none cursor-pointer group"
                    >
                      <span className="group-hover:text-[#8b5cf6] transition-colors">{faq.q}</span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openFaq === idx ? 'bg-[#8b5cf6] text-white' : 'bg-zinc-800 text-slate-400 group-hover:bg-[#8b5cf6]/20 group-hover:text-[#8b5cf6]'}`}>
                        {openFaq === idx ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </div>
                    </button>

                    {openFaq === idx && (
                      <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed font-medium animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent blur-[80px] rounded-full pointer-events-none"></div>

              <div className="bg-[#050508]/90 backdrop-blur-2xl border border-zinc-800/80 p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 inline-block mb-4">GET IN TOUCH</span>
                    <h3 className="text-2xl font-black text-white">Let's Secure Your Brand</h3>
                    <p className="text-slate-400 text-xs mt-2">Our analysts usually respond within 2 hours.</p>
                  </div>

                  {demoSubmitted ? (
                    <div className="text-center py-12 space-y-4 animate-fadeIn bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Request Logged</h4>
                      <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                        We have received your details. A threat analyst will connect with you via email shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleDemoSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text" required placeholder="Full Name"
                          value={demoForm.name} onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                          className="bg-[#0a0a0f] border border-zinc-800 text-sm px-4 py-3.5 rounded-xl text-white placeholder-slate-500 w-full focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                        />
                        <input
                          type="email" required placeholder="Work Email"
                          value={demoForm.email} onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                          className="bg-[#0a0a0f] border border-zinc-800 text-sm px-4 py-3.5 rounded-xl text-white placeholder-slate-500 w-full focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text" required placeholder="Company"
                          value={demoForm.company} onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                          className="bg-[#0a0a0f] border border-zinc-800 text-sm px-4 py-3.5 rounded-xl text-white placeholder-slate-500 w-full focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                        />
                        <input
                          type="tel" required placeholder="Phone Number"
                          value={demoForm.phone} onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                          className="bg-[#0a0a0f] border border-zinc-800 text-sm px-4 py-3.5 rounded-xl text-white placeholder-slate-500 w-full focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                        />
                      </div>

                      <textarea
                        rows={3} required placeholder="How can we help you?"
                        value={demoForm.message} onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                        className="bg-[#0a0a0f] border border-zinc-800 text-sm px-4 py-3.5 rounded-xl text-white placeholder-slate-500 w-full focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all resize-none"
                      ></textarea>

                      <button
                        type="submit" disabled={demoLoading}
                        className="w-full relative group inline-flex items-center justify-center bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-50 text-white font-bold text-sm py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] mt-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transform hover:-translate-y-0.5 overflow-hidden"
                      >
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-72 opacity-10"></span>
                        <span className="relative flex items-center gap-2">
                          {demoLoading ? "SENDING REQUEST..." : "Request a Demo"}
                          {!demoLoading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Contact Details Footer */}
                <div className="pt-8 mt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-6 justify-between items-center text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="text-white hover:text-[#8b5cf6] transition-colors cursor-pointer">hello@trinetra.ai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="text-white hover:text-[#8b5cf6] transition-colors cursor-pointer">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="text-white">San Francisco, CA</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 13. Footer Section */}
      <footer className="py-16 relative z-10 border-t border-zinc-900 bg-[url('/footer_cyber_bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
        {/* Ambient overlay to ensure readability while displaying the high-tech background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/95 via-[#030305]/85 to-[#020204]/98 backdrop-blur-[0.5px] z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 text-sm">

            <div className="col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <Image src="/logo.jpg" alt="Trinetra AI Logo" width={32} height={32} className="object-cover" />
                </div>
                <span className="text-lg font-black text-white tracking-widest">TRINETRA AI</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                AI-powered brand protection platform that helps organizations monitor, detect and respond to digital threats in real-time across the global web.
              </p>
              <div className="flex space-x-4 pt-2">
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#8b5cf6] hover:text-white text-slate-400 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#8b5cf6] hover:text-white text-slate-400 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#8b5cf6] hover:text-white text-slate-400 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="font-bold text-white block tracking-wide">Product</span>
              <ul className="space-y-3 text-slate-400">
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Features</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Monitoring Vectors</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Dashboard</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Integrations</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Pricing</span></li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="font-bold text-white block tracking-wide">Solutions</span>
              <ul className="space-y-3 text-slate-400">
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">By Industry</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Use Cases</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Brand Protection</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Threat Intelligence</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Attack Surface</span></li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="font-bold text-white block tracking-wide">Resources</span>
              <ul className="space-y-3 text-slate-400">
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Blog</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Research Center</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Documentation</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">API Reference</span></li>
                <li><span className="hover:text-[#8b5cf6] transition-colors cursor-pointer">Help Center</span></li>
              </ul>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <span>© 2026 Trinetra AI. All rights reserved.</span>
            <div className="flex space-x-6 font-medium">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-white transition-colors cursor-pointer">Security</span>
              <span className="hover:text-white transition-colors cursor-pointer">Compliance</span>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}
