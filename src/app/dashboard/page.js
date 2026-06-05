"use client";
import React, { useState } from 'react';
import {
   Target, Search, CheckCircle2, ChevronRight, Activity,
   ShieldAlert, Download, Bell, Plus, Home, Shield, Radar, Globe, Database,
   Mail, Fingerprint, Crosshair, AlertCircle, Settings, Server
} from 'lucide-react';
import DetailedVectorList from '@/components/VectorVisualizations';

// High-fidelity pre-populated simulated security scan results for the default state
const MOCK_SCAN_DATA = [
  {
    name: "Subdomain Takeover",
    raw: {
      results: [
        "dev.trinetrashield-demo.com",
        "staging-api.trinetrashield-demo.com"
      ]
    }
  },
  {
    name: "Exposed Secret Files",
    raw: {
      results: [
        { path: "/.env", status: "open" },
        { path: "/backup.sql", status: "open" },
        { path: "/package.json", status: "secure" },
        { path: "/.git/config", status: "secure" }
      ]
    }
  },
  {
    name: "Session & CORS Analyzer",
    raw: {
      wildcardCORS: true
    }
  },
  {
    name: "Tech Stack Profiler",
    raw: {
      headers: {
        server: "nginx/1.18.0",
        x_powered_by: "PHP/7.4.3"
      },
      techDetected: ["Nginx 1.18.0", "React 18.2.0", "Next.js 14.2.3", "PHP 7.4.3", "OpenSSL 1.1.1"]
    }
  },
  {
    name: "DNSSEC Validator",
    raw: {
      isDNSSECEnabled: false
    }
  },
  {
    name: "Threat Intelligence (VT)",
    raw: {
      last_analysis_stats: {
        malicious: 3,
        suspicious: 1,
        harmless: 85,
        undetected: 0
      }
    }
  },
  {
    name: "Phishing Protection",
    raw: {
      matches: []
    }
  },
  {
    name: "Dark Web Crawler",
    raw: {
      results: [
        "Leaked email: admin@trinetrashield-demo.com (Password: Hash78x...)",
        "Database dump 'trinetra_users' found on Torum Forum",
        "Active phishing mirror domain: trinetra-shield-login.onion"
      ]
    }
  },
  {
    name: "Social Media OSINT",
    raw: {
      results: {
        twitter: true,
        linkedin: true,
        github: true,
        facebook: false,
        instagram: false
      }
    }
  },
  {
    name: "External Attack Surface (EASM)",
    raw: {
      ports: [22, 80, 443, 3389, 8080],
      vulns: ["CVE-2021-34473", "CVE-2021-31207"],
      hostnames: ["api.trinetrashield-demo.com", "vpn.trinetrashield-demo.com", "mail.trinetrashield-demo.com"],
      ip_str: "104.21.32.19"
    }
  },
  {
    name: "SSL/TLS Cryptography",
    raw: {
      valid: true
    }
  },
  {
    name: "HTTP Security Headers",
    raw: {
      headers: {
        hsts: true,
        csp: false,
        x_frame: false,
        x_content: true,
        referrer: false
      }
    }
  },
  {
    name: "Shadow IT Port Scan",
    raw: {
      results: [
        { port: 22, name: "SSH", status: "open" },
        { port: 80, name: "HTTP", status: "open" },
        { port: 443, name: "HTTPS", status: "open" },
        { port: 3389, name: "RDP", status: "open" },
        { port: 8080, name: "HTTP-ALT", status: "open" }
      ]
    }
  },
  {
    name: "Email Security Suite",
    raw: {
      hasSPF: true,
      hasDMARC: false
    }
  },
  {
    name: "AI Security Copilot",
    raw: {
      summary: "Simulated security audit complete. Major concerns found: 3 malicious indicators on VirusTotal, exposed SSH and RDP ports, dangling DNS records, and an exposed .env file containing API credentials on the public server."
    }
  }
];

export default function DashboardPage() {
   const [domain, setDomain] = useState("");
   const [isScanning, setIsScanning] = useState(false);
   const [progress, setProgress] = useState(0);
   const [reportFeatures, setReportFeatures] = useState(MOCK_SCAN_DATA);
   const [scanComplete, setScanComplete] = useState(true);
   const [isDemoData, setIsDemoData] = useState(true);
   const [currentScanVector, setCurrentScanVector] = useState("");

   const startScan = async (e) => {
      e.preventDefault();
      if (!domain) return;

      setIsScanning(true);
      setIsDemoData(false);
      setProgress(0);
      setScanComplete(false);
      setReportFeatures([]);

      const vectors = ['subdomain', 'exposed-files', 'cookies-cors', 'tech-stack', 'dnssec', 'virustotal', 'shodan', 'safebrowsing', 'darkweb', 'social', 'ssl', 'headers', 'ports', 'email-security', 'gemini'];

      let i = 0;
      const timer = setInterval(() => {
         if (i < vectors.length) {
            setCurrentScanVector(`Scanning ${vectors[i]}...`);
            setProgress((prev) => Math.min(prev + (100 / 15), 99));
            i++;
         }
      }, 400);

      const fetchVector = async (endpoint, name) => {
         try {
            const res = await fetch(`/api/scan/${endpoint}`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ domain })
            });
            const data = await res.json();
            return { name, raw: data };
         } catch (e) {
            return { name, raw: { error: e.message } };
         }
      };

      const results = await Promise.all([
         fetchVector('subdomain', 'Subdomain Takeover'),
         fetchVector('exposed-files', 'Exposed Secret Files'),
         fetchVector('cookies-cors', 'Session & CORS Analyzer'),
         fetchVector('tech-stack', 'Tech Stack Profiler'),
         fetchVector('dnssec', 'DNSSEC Validator'),
         fetchVector('virustotal', 'Threat Intelligence (VT)'),
         fetchVector('safebrowsing', 'Phishing Protection'),
         fetchVector('darkweb', 'Dark Web Crawler'),
         fetchVector('social', 'Social Media OSINT'),
         fetchVector('shodan', 'External Attack Surface (EASM)'),
         fetchVector('ssl', 'SSL/TLS Cryptography'),
         fetchVector('headers', 'HTTP Security Headers'),
         fetchVector('ports', 'Shadow IT Port Scan'),
         fetchVector('email-security', 'Email Security Suite'),
         fetchVector('gemini', 'AI Security Copilot')
      ]);

      clearInterval(timer);
      setProgress(100);
      setCurrentScanVector("Analysis Complete");
      setReportFeatures(results);
      setScanComplete(true);
      setTimeout(() => setIsScanning(false), 1000);
   };

   return (
      <div className="w-full">
         <div className="max-w-[1400px] w-full mx-auto">
            {/* Upper Header and Domain Input */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
               <div>
                  <h1 className="text-xl font-bold text-white mb-1">Intelligence Center</h1>
                  <p className="text-[11px] text-slate-400">Overview of threat vectors, configuration policies, and compliance scores</p>
               </div>

               {/* Target Input Form */}
               <form onSubmit={startScan} className="flex gap-3 w-full lg:w-[500px]">
                  <div className="flex-1 bg-[#090b0e] border border-zinc-800 focus-within:border-[#8b5cf6]/50 rounded-lg flex items-center px-4 py-2 transition-all">
                     <Globe className="w-4 h-4 text-[#8b5cf6] mr-3" />
                     <input
                        type="text"
                        placeholder="Enter domain for live scan (e.g. google.com)"
                        className="bg-transparent border-none text-xs text-white w-full focus:outline-none placeholder-zinc-600 font-mono"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                     />
                  </div>
                  <button type="submit" disabled={isScanning} className="relative group inline-flex items-center justify-center bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] overflow-hidden shrink-0">
                     <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-48 group-hover:h-48 opacity-10"></span>
                     <span className="relative flex items-center gap-2">
                        {isScanning ? <Activity className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                        {isScanning ? 'Scanning...' : 'Launch Scan'}
                     </span>
                  </button>
               </form>
            </div>

            {/* Simulated Banner Warning */}
            {isDemoData && (
               <div className="mb-6 p-4 rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/40 to-indigo-950/20 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[0_0_15px_rgba(139,92,246,0.05)]">
                  <div className="flex items-center gap-3">
                     <div className="h-9 w-9 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shrink-0">
                        <AlertCircle className="w-5 h-5 text-violet-400 animate-pulse" />
                     </div>
                     <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                           Viewing Simulated Intelligence Report
                           <span className="px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-[8px] font-black uppercase tracking-wider border border-violet-500/30">demo mode</span>
                        </div>
                        <p className="text-[10.5px] text-slate-300 mt-0.5">This dashboard is currently showing mock threat indicators for <span className="font-mono text-violet-300 font-semibold bg-violet-500/10 px-1 rounded">trinetrashield-demo.com</span>. Enter a domain above to run a live scan.</p>
                     </div>
                  </div>
                  <button onClick={() => { setReportFeatures([]); setIsDemoData(false); setScanComplete(false); }} className="text-[10px] text-violet-400 hover:text-violet-300 font-bold underline transition-colors px-3 py-1.5 self-end md:self-center shrink-0">
                     Clear Demo Data
                  </button>
               </div>
            )}

            {/* Progress Bar */}
            {isScanning && (
               <div className="mb-6 bg-[#090b0e] border border-zinc-800/60 p-4 rounded-xl shadow-inner">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
                        {currentScanVector}
                     </span>
                     <span className="text-xs font-mono font-bold text-white">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
               </div>
            )}

            {/* Detailed Vector Cards */}
            <DetailedVectorList features={reportFeatures} isDemo={isDemoData} />

            <div className="mt-8 text-center text-[10px] text-slate-600 pb-4 font-mono">
               © 2026 Trinetra AI. All security intelligence reports are confidential.
            </div>
         </div>
      </div>
   );
}
