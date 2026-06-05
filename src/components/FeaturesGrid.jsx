"use client";
import React from 'react';
import { 
  Shield, 
  Mail, 
  Globe, 
  Radar, 
  Lock, 
  Activity, 
  Search,
  Database,
  Cpu
} from 'lucide-react';

export default function FeaturesGrid() {
  const categories = [
    {
      title: "Real-Time Intelligence",
      icon: <Radar className="w-5 h-5 text-[#8b5cf6]" />,
      color: "from-[#8b5cf6]/20 to-transparent",
      borderColor: "border-[#8b5cf6]/30",
      hoverBorder: "hover:border-[#8b5cf6]/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]",
      features: [
        {
          title: "1. Threat Intelligence (VT)",
          desc: "Live Domain reputation scoring, passive DNS mapping, and malicious payload history using VirusTotal APIs.",
          icon: <Shield className="w-4 h-4 text-[#8b5cf6]" />
        },
        {
          title: "2. Phishing Protection",
          desc: "Real-time Google Safe Browsing integration to detect active phishing kits and malicious links.",
          icon: <Globe className="w-4 h-4 text-[#8b5cf6]" />
        },
        {
          title: "3. Dark Web Crawler",
          desc: "Deep web scraping using Ahmia Tor gateways to find active .onion mentions of your domain.",
          icon: <Database className="w-4 h-4 text-[#8b5cf6]" />
        },
        {
          title: "4. Social Media OSINT",
          desc: "Real-time HTTP-based footprint check across major social networks to detect brand hijacking.",
          icon: <Radar className="w-4 h-4 text-[#8b5cf6]" />
        },
        {
          title: "5. Subdomain Takeover",
          desc: "Analyze DNS CNAME records to detect dangling pointers vulnerable to high-impact takeovers.",
          icon: <Shield className="w-4 h-4 text-[#8b5cf6]" />
        }
      ]
    },
    {
      title: "Network & Web Posture",
      icon: <Activity className="w-5 h-5 text-[#0ea5e9]" />,
      color: "from-[#0ea5e9]/20 to-transparent",
      borderColor: "border-[#0ea5e9]/30",
      hoverBorder: "hover:border-[#0ea5e9]/50 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]",
      features: [
        {
          title: "6. External Attack Surface",
          desc: "Automated Shodan queries to map exposed assets, shadow IT, and discover unpatched CVEs on public IP space.",
          icon: <Search className="w-4 h-4 text-[#0ea5e9]" />
        },
        {
          title: "7. SSL/TLS Cryptography",
          desc: "Deep packet inspection of TLS certificates, checking issuer validity, cryptographic strength, and expiry timelines.",
          icon: <Lock className="w-4 h-4 text-[#0ea5e9]" />
        },
        {
          title: "8. HTTP Security Headers",
          desc: "Live header analysis for HSTS, CSP, and clickjacking protection to ensure strict transit security compliance.",
          icon: <Shield className="w-4 h-4 text-[#0ea5e9]" />
        },
        {
          title: "9. Shadow IT Port Scan",
          desc: "Active TCP socket scanning across critical management ports (21, 22, 23, 3306, 3389) to detect zero-trust violations.",
          icon: <Activity className="w-4 h-4 text-[#0ea5e9]" />
        },
        {
          title: "10. Exposed Secret Files",
          desc: "Stealthy probes for leaked .env, .git, or backup files that expose critical infrastructure credentials.",
          icon: <Database className="w-4 h-4 text-[#0ea5e9]" />
        },
        {
          title: "11. Session & CORS Analyzer",
          desc: "Deep inspection of cookie security flags and vulnerable wildcard CORS configurations preventing data theft.",
          icon: <Lock className="w-4 h-4 text-[#0ea5e9]" />
        }
      ]
    },
    {
      title: "Governance & AI Analysis",
      icon: <Cpu className="w-5 h-5 text-[#10b981]" />,
      color: "from-[#10b981]/20 to-transparent",
      borderColor: "border-[#10b981]/30",
      hoverBorder: "hover:border-[#10b981]/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]",
      features: [
        {
          title: "12. Tech Stack Profiler",
          desc: "Analyzes server responses and HTML to identify outdated technologies and specific CVE risks.",
          icon: <Search className="w-4 h-4 text-[#10b981]" />
        },
        {
          title: "13. DNSSEC Validator",
          desc: "Checks cryptographic zone signing to detect vulnerability to DNS spoofing and cache poisoning.",
          icon: <Lock className="w-4 h-4 text-[#10b981]" />
        },
        {
          title: "14. Email Security Suite",
          desc: "Automated DNS resolution of SPF, DKIM, and DMARC TXT records to prevent corporate email spoofing.",
          icon: <Mail className="w-4 h-4 text-[#10b981]" />
        },
        {
          title: "15. AI Security Copilot",
          desc: "Real-time context-aware analysis using Google Gemini. Aggregates all 14 vectors to generate executive remediation plans.",
          icon: <Cpu className="w-4 h-4 text-[#10b981]" />
        }
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Background styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#8b5cf6]/5 to-[#0ea5e9]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            15-Vector <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#0ea5e9]">Real-Time Core</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm">
            Powered by live enterprise APIs and Dark Web Crawlers. No mock data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col gap-4">
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${cat.color} border-l-2 ${cat.borderColor} p-4 rounded-r-xl flex items-center gap-3 backdrop-blur-sm`}>
                <div className="bg-black/50 p-2 rounded-lg">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">{cat.title}</h3>
              </div>

              {/* Feature Cards */}
              <div className="flex flex-col gap-3 pl-4">
                {cat.features.map((feat, j) => (
                  <div key={j} className={`bg-[#050509]/45 backdrop-blur-xl border border-white/[0.08] p-5 rounded-xl transition-all duration-300 hover:translate-x-1 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] ${cat.hoverBorder} group`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">{feat.title}</h4>
                        <p className="text-[11px] leading-relaxed text-slate-500">{feat.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
