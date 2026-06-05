"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { 
  Radar, Globe, Database, ShieldAlert, AlertTriangle, 
  CheckCircle2, XCircle, Activity, Lock, Mail, 
  Fingerprint, Code, Server, Search, ChevronRight,
  Shield, Users, Crosshair, AlertCircle, Terminal, 
  FileText, Check, AlertOctagon, ShieldCheck
} from 'lucide-react';

const DashboardCard = ({ title, icon, status, children, actionLabel = "Audit Log" }) => {
  const statusColors = {
    'HIGH RISK': 'text-red-400 bg-red-950/20 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    'MEDIUM RISK': 'text-amber-400 bg-amber-950/20 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    'LOW RISK': 'text-emerald-400 bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    'neutral': 'text-slate-400 bg-zinc-900/40 border-zinc-800'
  };

  const statusColor = statusColors[status] || statusColors.neutral;

  // Pulse dot color mapping
  const pulseDotColors = {
    'HIGH RISK': 'bg-red-500 shadow-red-500',
    'MEDIUM RISK': 'bg-amber-500 shadow-amber-500',
    'LOW RISK': 'bg-emerald-500 shadow-emerald-500',
    'neutral': 'bg-slate-500 shadow-slate-500'
  };
  const pulseColor = pulseDotColors[status] || pulseDotColors.neutral;

  return (
    <div className="bg-[#050608]/90 border border-zinc-900 hover:border-zinc-800/80 rounded-xl overflow-hidden flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 relative group">
      {/* Decorative cyber grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
      
      <div className="p-5 flex-grow flex flex-col z-10">
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2.5">
             <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/50 text-[#8b5cf6] group-hover:text-white transition-colors duration-300">
               {icon}
             </div>
             <div>
               <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">{title}</h3>
               <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Vector Security Report</span>
             </div>
          </div>
          {status && (
            <div className={`px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border flex items-center gap-1.5 transition-all ${statusColor}`}>
              <span className={`relative flex h-1.5 w-1.5`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColor}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${pulseColor}`}></span>
              </span>
              {status}
            </div>
          )}
        </div>
        
        {/* Card Body */}
        <div className="flex-grow flex flex-col justify-between">
          {children}
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="px-5 py-3 border-t border-zinc-900/60 bg-[#050608]/40 flex justify-between items-center z-10 shrink-0">
        <span className="text-[9px] text-slate-600 font-mono">Status Check: SECURE</span>
        <button className="text-[10px] text-[#8b5cf6] hover:text-[#7c3aed] font-black uppercase tracking-wider flex items-center gap-1 transition-colors">
          {actionLabel} <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default function DetailedVectorList({ features = [], isDemo = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // List of all 12 cards to map
  const requiredCards = [
     "EASM", "ThreatIntel", "DarkWeb", "Phishing", "BrandSec", "Social", 
     "Email", "Vuln", "Breach", "Identity", "Compliance", "Incidents"
  ];

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {requiredCards.map((c) => (
          <div key={c} className="h-64 bg-[#050608]/90 border border-zinc-900 rounded-xl animate-pulse flex items-center justify-center">
             <div className="text-slate-700 text-xs font-mono">Initializing System Visualizer...</div>
          </div>
        ))}
      </div>
    );
  }

  // Helper to extract specific feature from real API response array
  const getFeat = (searchStr) => {
     return features.find(f => f.name.toLowerCase().includes(searchStr.toLowerCase())) || {};
  };

  // Robust extraction function that handles both raw mock structures and API responses
  const getMetrics = (feat) => {
    if (!feat || !feat.raw) return null;
    const rawObj = feat.raw;
    
    // Check if it's a direct mock structure
    if (rawObj.ports || rawObj.results || rawObj.last_analysis_stats || rawObj.wildcardCORS || rawObj.isDNSSECEnabled !== undefined || rawObj.matches) {
      return rawObj;
    }
    
    // Check if it's a wrapper from standard next.js route { success, data: { ..., raw: actualData } }
    if (rawObj.success && rawObj.data) {
      const dataObj = rawObj.data;
      if (dataObj.raw) {
        return dataObj.raw;
      }
      return dataObj;
    }
    
    return rawObj;
  };

  const renderVisualization = (featType) => {
    
    // ==========================================
    // 1. External Attack Surface (EASM) using Shodan
    // ==========================================
    if (featType === "EASM") {
      const feat = getFeat("External Attack");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      // Extract details or use simulated defaults if loading / demo
      const openPorts = isLoaded && metrics.ports ? metrics.ports : (isDemo ? [22, 80, 443, 3389, 8080] : []);
      const openPortsCount = openPorts.length;
      const vulns = isLoaded && metrics.vulns ? metrics.vulns : (isDemo ? ["CVE-2021-34473", "CVE-2021-31207"] : []);
      const ip = isLoaded && metrics.ip ? metrics.ip : (isLoaded && metrics.ip_str ? metrics.ip_str : (isDemo ? "104.21.32.19" : "--"));
      const assetsCount = isLoaded && metrics.hostnames ? metrics.hostnames.length : (isDemo ? 14 : "--");

      const status = openPortsCount > 4 || vulns.length > 0 ? "HIGH RISK" : (openPortsCount > 0 ? "MEDIUM RISK" : "LOW RISK");
      
      const mockChartData = [
        {name: '1', val: 2}, {name: '2', val: 5}, {name: '3', val: 4}, 
        {name: '4', val: 7}, {name: '5', val: 5}, {name: '6', val: 9}, {name: '7', val: openPortsCount || 3}
      ];

      return (
        <DashboardCard title="External Attack Surface (EASM)" icon={<Search className="w-4 h-4"/>} status={isLoaded || isDemo ? status : "neutral"}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Continuous discovery and scanning of internet-facing digital assets, IP blocks, and cloud instances.</p>
           
           <div className="grid grid-cols-4 gap-3 bg-[#0a0b0e] border border-zinc-900 rounded-lg p-3 mb-4">
              <div>
                 <div className="text-[9px] text-slate-500 font-mono uppercase">IP Address</div>
                 <div className="text-xs font-bold font-mono text-slate-200 mt-1 truncate" title={ip}>{ip}</div>
              </div>
              <div>
                 <div className="text-[9px] text-slate-500 font-mono uppercase">Open Ports</div>
                 <div className="text-xs font-bold text-slate-200 mt-1 flex items-baseline gap-1">
                    {isLoaded || isDemo ? openPortsCount : "--"}
                    {(isLoaded || isDemo) && openPortsCount > 0 && <span className="text-[8px] text-rose-500">↑</span>}
                 </div>
              </div>
              <div>
                 <div className="text-[9px] text-slate-500 font-mono uppercase">Vulnerabilities</div>
                 <div className="text-xs font-bold mt-1 text-slate-200 flex items-center gap-1">
                    {isLoaded || isDemo ? vulns.length : "--"}
                    {(isLoaded || isDemo) && vulns.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>}
                 </div>
              </div>
              <div>
                 <div className="text-[9px] text-slate-500 font-mono uppercase">Cloud Assets</div>
                 <div className="text-xs font-bold text-slate-200 mt-1">{assetsCount}</div>
              </div>
           </div>

           <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                 <div className="text-[9px] text-slate-500 font-mono uppercase mb-1.5">Exposed Ports Registry</div>
                 <div className="flex flex-wrap gap-1">
                    {isLoaded || isDemo ? (
                       openPorts.length > 0 ? openPorts.map(p => (
                          <span key={p} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-slate-300 font-mono text-[9px]">
                             {p}
                          </span>
                       )) : <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> No exposed ports detected</span>
                    ) : <span className="text-[10px] text-slate-600 italic">Awaiting analysis...</span>}
                 </div>
              </div>
              
              <div className="w-24 h-12 bg-black/40 border border-zinc-900 rounded p-1 shrink-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                       <Line type="monotone" dataKey="val" stroke="#8b5cf6" strokeWidth={1.5} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 2. Threat Intelligence (VirusTotal)
    // ==========================================
    if (featType === "ThreatIntel") {
      const feat = getFeat("Threat Intelligence");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      const stats = isLoaded ? metrics : (isDemo ? { malicious: 3, suspicious: 1, harmless: 85, undetected: 0 } : null);
      
      const malicious = stats ? stats.malicious : 0;
      const suspicious = stats ? stats.suspicious : 0;
      const harmless = stats ? stats.harmless : 0;
      const total = stats ? (malicious + suspicious + harmless) : 0;

      const isHighRisk = malicious > 0;
      const riskStatus = isHighRisk ? "HIGH RISK" : (suspicious > 0 ? "MEDIUM RISK" : "LOW RISK");

      return (
        <DashboardCard title="Threat Intelligence (VirusTotal)" icon={<Radar className="w-4 h-4 text-rose-500 animate-pulse"/>} status={isLoaded || isDemo ? riskStatus : "neutral"}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Aggregated malicious signature data from 80+ security intelligence vendors and reputation checkers.</p>
           
           <div className="flex justify-between items-center gap-6 h-full mt-1">
              <div className="space-y-2.5 flex-1">
                 <div className="flex justify-between items-center border-b border-zinc-900/60 pb-1.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Security Scans</span>
                    <span className="text-xs font-bold text-slate-200 font-mono">{isLoaded || isDemo ? total : "--"} Engines</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-zinc-900/60 pb-1.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Malicious Flags</span>
                    <span className={`text-xs font-bold font-mono ${malicious > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{isLoaded || isDemo ? malicious : "--"}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Suspicious Flags</span>
                    <span className={`text-xs font-bold font-mono ${suspicious > 0 ? 'text-amber-500' : 'text-slate-300'}`}>{isLoaded || isDemo ? suspicious : "--"}</span>
                 </div>
              </div>

              <div className="w-24 h-24 flex items-center justify-center shrink-0 relative">
                 {/* Circular threat meter vector */}
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="38" className="stroke-zinc-900 fill-none" strokeWidth="6" />
                    {(isLoaded || isDemo) && (
                       <circle cx="48" cy="48" r="38" 
                          className={`fill-none ${isHighRisk ? 'stroke-red-500' : 'stroke-emerald-500'}`} 
                          strokeWidth="6" 
                          strokeDasharray={238} 
                          strokeDashoffset={238 - (238 * (isHighRisk ? 15 : 100)) / 100} 
                       />
                    )}
                 </svg>
                 <div className="absolute flex flex-col items-center justify-center text-center">
                    <div className={`text-lg font-black font-mono leading-none ${isHighRisk ? 'text-red-500' : 'text-emerald-400'}`}>
                       {isLoaded || isDemo ? malicious : "0"}
                    </div>
                    <span className="text-[7px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">Threats</span>
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 3. Dark Web Monitor
    // ==========================================
    if (featType === "DarkWeb") {
      const feat = getFeat("Dark Web");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      const results = isLoaded ? metrics.results : (isDemo ? [
        "Leaked email: admin@trinetrashield-demo.com (Password: Hash78x...)",
        "Database dump 'trinetra_users' found on Torum Forum",
        "Active phishing mirror domain: trinetra-shield-login.onion"
      ] : []);

      const hasLeaks = results && results.length > 0;
      const status = hasLeaks ? "HIGH RISK" : "LOW RISK";

      return (
        <DashboardCard title="Dark Web Monitor" icon={<Database className="w-4 h-4 text-amber-500"/>} status={isLoaded || isDemo ? status : "neutral"}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Stealth crawling of onion networks, paste sites, and threat forums to detect leaks and database exposure.</p>
           
           <div className="flex flex-col lg:flex-row gap-3">
              <div className="w-full lg:w-1/3 flex flex-col justify-center gap-3">
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2.5">
                    <div className="text-[9px] text-slate-500 font-mono uppercase">Credentials Leaked</div>
                    <div className={`text-sm font-bold font-mono mt-0.5 ${hasLeaks ? 'text-red-400' : 'text-slate-300'}`}>{isLoaded || isDemo ? (hasLeaks ? "12 Emails" : "0") : "--"}</div>
                 </div>
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2.5">
                    <div className="text-[9px] text-slate-500 font-mono uppercase">Onion Mentions</div>
                    <div className={`text-sm font-bold font-mono mt-0.5 ${hasLeaks ? 'text-amber-400' : 'text-slate-300'}`}>{isLoaded || isDemo ? results.length : "--"}</div>
                 </div>
              </div>

              {/* Glowing Console Window */}
              <div className="flex-1 bg-[#030406] border border-zinc-900/80 rounded-lg p-2.5 font-mono text-[9px] overflow-hidden relative shadow-inner">
                 <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-1.5 mb-1.5 text-zinc-600">
                    <Terminal className="w-3.5 h-3.5 text-amber-500" />
                    <span>onion_crawler.sh</span>
                 </div>
                 <div className="space-y-1.5 max-h-[70px] overflow-y-auto custom-scrollbar select-none">
                    {isLoaded || isDemo ? (
                       results.length > 0 ? results.map((log, idx) => (
                          <div key={idx} className="text-amber-400/80 flex items-start gap-1">
                             <span className="text-red-500 font-bold shrink-0">!</span>
                             <span className="truncate">{log}</span>
                          </div>
                       )) : <div className="text-emerald-500/80 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> 0 Threat alerts in dark web repositories</div>
                    ) : <div className="text-slate-600 italic">Tor networks initializing...</div>}
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 4. Phishing Protection (Google Safe Browsing)
    // ==========================================
    if (featType === "Phishing") {
      const feat = getFeat("Phishing");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      const matches = isLoaded ? metrics.matches : [];
      const isSafe = isLoaded ? matches.length === 0 : true; // default safe in demo
      
      const status = isLoaded || isDemo ? (isSafe ? "LOW RISK" : "HIGH RISK") : "neutral";

      return (
        <DashboardCard title="Phishing Protection" icon={<ShieldAlert className="w-4 h-4 text-emerald-500"/>} status={status}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Real-time check against Google Safe Browsing and PhishTank databases to identify active domain hijacking.</p>
           
           <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 w-full space-y-2">
                 <div className="flex items-center justify-between p-1.5 border-b border-zinc-900 text-[10px]">
                    <span className="text-slate-500">Safe Browsing Status</span>
                    <span className="text-emerald-400 font-semibold font-mono flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Clean
                    </span>
                 </div>
                 <div className="flex items-center justify-between p-1.5 border-b border-zinc-900 text-[10px]">
                    <span className="text-slate-500">Phishing URL Detections</span>
                    <span className="text-emerald-400 font-semibold font-mono">0 Hits</span>
                 </div>
                 <div className="flex items-center justify-between p-1.5 text-[10px]">
                    <span className="text-slate-500">Domain Reputation Score</span>
                    <span className="text-emerald-400 font-bold font-mono">100/100</span>
                 </div>
              </div>

              {/* Glowing shield vector */}
              <div className="w-20 h-20 bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-850 rounded-xl flex items-center justify-center shrink-0 relative shadow-lg">
                 <div className="absolute inset-0 bg-emerald-500/5 rounded-xl blur-lg pointer-events-none"></div>
                 <div className="flex flex-col items-center">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                    <span className="text-[8px] font-black uppercase text-emerald-400 tracking-wider mt-1.5">CLEAN</span>
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 5. Brand Security Suite (Subdomain Takeover)
    // ==========================================
    if (featType === "BrandSec") {
      const feat = getFeat("Subdomain");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      const dangling = isLoaded ? metrics.results : (isDemo ? [
        "dev.trinetrashield-demo.com",
        "staging-api.trinetrashield-demo.com"
      ] : []);
      const isHighRisk = dangling && dangling.length > 0;
      const status = isLoaded || isDemo ? (isHighRisk ? "HIGH RISK" : "LOW RISK") : "neutral";

      return (
        <DashboardCard title="Brand Security & DNS Takeover" icon={<Globe className="w-4 h-4 text-violet-500"/>} status={status}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">DNS record analysis targeting dangling CNAME configuration pointers susceptible to host takeovers.</p>
           
           <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/3 flex flex-col justify-center gap-2">
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 text-center">
                    <span className="text-[8px] text-slate-500 uppercase font-mono">Total Subdomains</span>
                    <div className="text-base font-bold font-mono text-slate-200 mt-0.5">{isLoaded || isDemo ? (isDemo ? "42" : "15") : "--"}</div>
                 </div>
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 text-center">
                    <span className="text-[8px] text-slate-500 uppercase font-mono">Dangling CNAMEs</span>
                    <div className={`text-base font-bold font-mono mt-0.5 ${isHighRisk ? 'text-red-400' : 'text-emerald-400'}`}>{isLoaded || isDemo ? dangling.length : "--"}</div>
                 </div>
              </div>

              {/* Table of subdomains and status */}
              <div className="flex-1 bg-black/40 border border-zinc-900 rounded-lg p-2.5 min-h-[72px] flex flex-col justify-center">
                 <div className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2 font-mono">Vulnerable Subdomains</div>
                 <div className="space-y-1.5 text-[10px] font-mono">
                    {isLoaded || isDemo ? (
                       dangling && dangling.length > 0 ? dangling.slice(0, 2).map((domain, i) => (
                          <div key={i} className="flex justify-between items-center border-b border-zinc-900/40 pb-1 last:border-0 last:pb-0">
                             <span className="text-red-400 truncate max-w-[150px]">{domain}</span>
                             <span className="px-1.5 py-0.2 rounded bg-red-950/20 text-red-500 text-[8px] uppercase font-bold border border-red-500/20 shrink-0">Takeover Risk</span>
                          </div>
                       )) : <div className="text-emerald-400 flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> DNS mapping records are fully secure</div>
                    ) : <div className="text-slate-600 italic">Scanning DNS records...</div>}
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 6. Social Media OSINT
    // ==========================================
    if (featType === "Social") {
      const feat = getFeat("Social");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      const results = isLoaded ? metrics.results : (isDemo ? {
        twitter: true,
        linkedin: true,
        github: true,
        facebook: false,
        instagram: false
      } : {});

      let foundProfiles = 0;
      if (isLoaded || isDemo) {
         Object.values(results).forEach(v => { if (v) foundProfiles++ });
      }

      return (
        <DashboardCard title="Social Media OSINT Scan" icon={<Users className="w-4 h-4 text-sky-400"/>} status={isLoaded || isDemo ? "LOW RISK" : "neutral"}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">OSINT scanner resolving registered brand profiles on social media networks to map brand spoofing.</p>
           
           <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="w-full lg:w-1/2 space-y-2">
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-mono">Found Profiles</span>
                    <span className="font-bold font-mono text-slate-200">{isLoaded || isDemo ? `${foundProfiles} Accounts` : "--"}</span>
                 </div>
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-mono">Fake Accounts</span>
                    <span className="font-bold font-mono text-amber-500">0 Alerts</span>
                 </div>
              </div>

              <div className="flex-1 w-full grid grid-cols-3 gap-1.5">
                 {isLoaded || isDemo ? (
                    Object.keys(results).map(platform => {
                       const active = results[platform];
                       return (
                          <div key={platform} className={`border rounded p-1.5 flex flex-col justify-between items-center font-mono text-[9px] ${active ? 'bg-indigo-950/10 border-indigo-900/30 text-indigo-400' : 'bg-zinc-950/40 border-zinc-900 text-slate-600'}`}>
                             <span className="capitalize font-bold">{platform}</span>
                             <span className={`text-[7px] uppercase mt-1 font-bold ${active ? 'text-indigo-400' : 'text-slate-600'}`}>
                                {active ? 'Active' : 'Unregistered'}
                             </span>
                          </div>
                       );
                    })
                 ) : (
                    <div className="col-span-3 text-center text-slate-600 text-[10px] italic py-2">Awaiting target parameters...</div>
                 )}
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 7. Email Security
    // ==========================================
    if (featType === "Email") {
      const feat = getFeat("Email Security");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      const hasSPF = isLoaded ? metrics.hasSPF : true;
      const hasDMARC = isLoaded ? metrics.hasDMARC : false;
      const status = isLoaded || isDemo ? (hasSPF && hasDMARC ? "LOW RISK" : "MEDIUM RISK") : "neutral";

      return (
        <DashboardCard title="Email Security Suite" icon={<Mail className="w-4 h-4 text-emerald-400"/>} status={status}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">DNS record validator evaluating SPF, DKIM, and DMARC rules for email-spoofing defense capabilities.</p>
           
           <div className="grid grid-cols-2 gap-3 mb-1">
              <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 flex items-center justify-between">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-200">SPF Record</span>
                    <span className="text-[8px] text-slate-500 font-mono mt-0.5 truncate max-w-[120px]">{isLoaded || isDemo ? "v=spf1 include:_spf.google..." : "--"}</span>
                 </div>
                 <div className="shrink-0">
                    {isLoaded || isDemo ? (
                       hasSPF ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />
                    ) : <span className="text-zinc-700 text-xs">-</span>}
                 </div>
              </div>

              <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 flex items-center justify-between">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-200">DMARC Policy</span>
                    <span className="text-[8px] text-slate-500 font-mono mt-0.5 truncate max-w-[120px]">{isLoaded || isDemo ? (hasDMARC ? "v=DMARC1; p=reject..." : "v=DMARC1; p=none...") : "--"}</span>
                 </div>
                 <div className="shrink-0">
                    {isLoaded || isDemo ? (
                       hasDMARC ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
                    ) : <span className="text-zinc-700 text-xs">-</span>}
                 </div>
              </div>
           </div>

           <div className="mt-1 flex items-center justify-between text-[10px] bg-zinc-900/20 border border-dashed border-zinc-900 p-1.5 rounded">
              <span className="text-slate-500 font-mono">BIMI Authentication Score</span>
              <span className="text-amber-500 font-black font-mono">Not Configured</span>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 8. Vulnerability Monitor (Tech Stack)
    // ==========================================
    if (featType === "Vuln") {
      const feat = getFeat("Tech Stack");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      const headers = isLoaded && metrics.headers ? metrics.headers : (isDemo ? { server: "nginx/1.18.0", x_powered_by: "PHP/7.4.3" } : {});
      const techDetected = isLoaded && metrics.techDetected ? metrics.techDetected : (isDemo ? ["Nginx 1.18.0", "React 18.2.0", "Next.js 14.2.3", "PHP 7.4.3", "OpenSSL 1.1.1"] : []);
      
      const status = isLoaded || isDemo ? (techDetected.length > 3 ? "MEDIUM RISK" : "LOW RISK") : "neutral";

      return (
        <DashboardCard title="Vulnerability & Tech Stack Profiler" icon={<Shield className="w-4 h-4 text-amber-500"/>} status={status}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Scans HTTP response signatures and raw assets to index the backend technology stack and flag CVEs.</p>
           
           <div className="flex flex-col lg:flex-row gap-3">
              <div className="w-full lg:w-1/2 space-y-2">
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2">
                    <span className="text-[8px] text-slate-500 font-mono uppercase">Detected Web Server</span>
                    <div className="text-[10.5px] font-bold font-mono text-slate-200 mt-0.5 truncate">{isLoaded || isDemo ? (headers.server || "Apache/2.4") : "--"}</div>
                 </div>
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2">
                    <span className="text-[8px] text-slate-500 font-mono uppercase">Powered-By Signature</span>
                    <div className="text-[10.5px] font-bold font-mono text-amber-500 mt-0.5 truncate">{isLoaded || isDemo ? (headers.x_powered_by || "Hidden") : "--"}</div>
                 </div>
              </div>

              {/* Technologies Badges */}
              <div className="flex-1 bg-black/40 border border-zinc-900 rounded-lg p-2.5">
                 <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2 block font-mono">Libraries & Frameworks</span>
                 <div className="flex flex-wrap gap-1 max-h-[70px] overflow-y-auto custom-scrollbar">
                    {isLoaded || isDemo ? (
                       techDetected.map((tech, idx) => {
                          const isVulnerable = tech.toLowerCase().includes("openssl") || tech.toLowerCase().includes("nginx/1.18");
                          return (
                             <span key={idx} className={`px-1.5 py-0.5 rounded font-mono text-[9px] border ${isVulnerable ? 'bg-red-950/20 border-red-500/20 text-red-400' : 'bg-zinc-900 border-zinc-800 text-slate-300'}`}>
                                {tech}
                             </span>
                          );
                       })
                    ) : <div className="text-slate-600 text-[10px] italic">Awaiting stack profile...</div>}
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 9. Breach Simulation (Port Scan mapped)
    // ==========================================
    if (featType === "Breach") {
      const feat = getFeat("Port Scan");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      // Map open ports or simulated defaults
      const openPortsList = isLoaded && metrics.results ? metrics.results.filter(p => p.status === 'open').map(p => p.port) : (isDemo ? [22, 3389, 8080] : []);
      const openPortsCount = openPortsList.length;
      
      const status = openPortsCount > 0 ? "HIGH RISK" : "LOW RISK";

      // Grid of 15 ports representing a blade server layout
      const portsToCheck = [
        { port: 22, name: 'SSH' },
        { port: 23, name: 'Telnet' },
        { port: 25, name: 'SMTP' },
        { port: 53, name: 'DNS' },
        { port: 80, name: 'HTTP' },
        { port: 110, name: 'POP3' },
        { port: 143, name: 'IMAP' },
        { port: 443, name: 'HTTPS' },
        { port: 445, name: 'SMB' },
        { port: 1433, name: 'MSSQL' },
        { port: 3306, name: 'MySQL' },
        { port: 3389, name: 'RDP' },
        { port: 5432, name: 'Postgres' },
        { port: 8080, name: 'HTTP-ALT' },
        { port: 27017, name: 'MongoDB' }
      ];

      return (
        <DashboardCard title="Shadow IT Port Scan" icon={<Crosshair className="w-4 h-4 text-red-500 animate-pulse"/>} status={isLoaded || isDemo ? status : "neutral"}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">External TCP socket probes across common operational and databases ports to identify zero-trust violations.</p>
           
           <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="w-full lg:w-2/5 space-y-2">
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">Critical Open Ports</span>
                    <span className={`font-bold font-mono ${openPortsCount > 0 ? 'text-red-500' : 'text-emerald-400'}`}>{isLoaded || isDemo ? openPortsCount : "--"}</span>
                 </div>
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">Firewall Integrity</span>
                    <span className={`font-bold font-mono ${openPortsCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{isLoaded || isDemo ? (openPortsCount > 2 ? 'Weak' : 'Moderate') : "--"}</span>
                 </div>
              </div>

              {/* Server rack style port grid */}
              <div className="flex-1 w-full bg-[#030406] border border-zinc-900 rounded-lg p-2.5">
                 <div className="grid grid-cols-5 gap-1.5">
                    {portsToCheck.map(p => {
                       const isOpen = (isLoaded || isDemo) && openPortsList.includes(p.port);
                       const scanRun = isLoaded || isDemo;
                       return (
                          <div key={p.port} className={`border rounded p-1 flex flex-col justify-between items-center relative transition-all ${isOpen ? 'bg-red-950/10 border-red-500/20' : 'bg-zinc-950 border-zinc-900'}`} title={`Port ${p.port}: ${p.name}`}>
                             <div className="flex justify-between items-center w-full px-0.5">
                                <span className="text-[7px] text-slate-500 font-mono font-bold leading-none">{p.port}</span>
                                <span className={`h-1 w-1 rounded-full ${scanRun ? (isOpen ? 'bg-red-500 animate-pulse shadow-[0_0_6px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_6px_#10b981]') : 'bg-zinc-800'}`}></span>
                             </div>
                             <span className={`text-[7px] font-mono font-black mt-1 leading-none truncate w-full text-center ${isOpen ? 'text-red-400' : 'text-slate-500'}`}>{p.name}</span>
                          </div>
                       );
                    })}
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 10. Identity Security (Exposed Files mapped)
    // ==========================================
    if (featType === "Identity") {
      const feat = getFeat("Exposed Secret");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      // Extract results or fallback simulated files list
      const results = isLoaded ? metrics.results : (isDemo ? [
        { path: "/.env", status: "open" },
        { path: "/backup.sql", status: "open" },
        { path: "/package.json", status: "secure" },
        { path: "/.git/config", status: "secure" }
      ] : []);

      const exposedFiles = results ? results.filter(f => f.status === 'open') : [];
      const hasLeaks = exposedFiles.length > 0;
      const status = hasLeaks ? "HIGH RISK" : "LOW RISK";

      return (
        <DashboardCard title="Exposed Credentials & Secret Files" icon={<Lock className="w-4 h-4 text-emerald-400"/>} status={isLoaded || isDemo ? status : "neutral"}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Probes critical public paths looking for configuration backups, credentials files, and private keys.</p>
           
           <div className="flex flex-col lg:flex-row gap-3">
              {/* Folder tree visualization */}
              <div className="flex-grow bg-[#030406] border border-zinc-900 rounded-lg p-2.5 font-mono text-[9.5px]">
                 <div className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2">Web Application Directory Scan</div>
                 <div className="space-y-1.5">
                    {isLoaded || isDemo ? (
                       results.map((file, idx) => {
                          const isLeaked = file.status === 'open';
                          return (
                             <div key={idx} className="flex justify-between items-center border-b border-zinc-900/20 pb-1.5 last:border-0 last:pb-0">
                                <span className={`flex items-center gap-1.5 ${isLeaked ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                                   <FileText className="w-3.5 h-3.5" />
                                   {file.path}
                                </span>
                                <span className={`px-1.5 py-0.2 rounded text-[7.5px] font-black uppercase tracking-wider border ${isLeaked ? 'bg-red-950/20 border-red-500/20 text-red-500' : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-500'}`}>
                                   {isLeaked ? 'LEAKED / EXPOSED' : 'SECURE'}
                                </span>
                             </div>
                          );
                       })
                    ) : <div className="text-slate-600 italic">Scanning remote directory tree...</div>}
                 </div>
              </div>
              
              <div className="w-full lg:w-1/3 flex flex-col justify-center gap-2 shrink-0">
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2">
                    <span className="text-[8px] text-slate-500 font-mono uppercase">Critical Paths Probed</span>
                    <div className="text-sm font-bold font-mono text-slate-200 mt-0.5">{isLoaded || isDemo ? results.length : "--"}</div>
                 </div>
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2">
                    <span className="text-[8px] text-slate-500 font-mono uppercase">Private Keys Exposed</span>
                    <div className={`text-sm font-bold font-mono mt-0.5 ${hasLeaks ? 'text-red-400' : 'text-emerald-400'}`}>{isLoaded || isDemo ? exposedFiles.length : "--"}</div>
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 11. Compliance Manager (Crypto & CORS)
    // ==========================================
    if (featType === "Compliance") {
      const sslFeat = getFeat("SSL");
      const dnssecFeat = getFeat("DNSSEC");
      const corsFeat = getFeat("Session & CORS");
      
      const isSslLoaded = sslFeat.raw && !sslFeat.raw.error;
      const isDnsLoaded = dnssecFeat.raw && !dnssecFeat.raw.error;
      const isCorsLoaded = corsFeat.raw && !corsFeat.raw.error;

      // Extract metrics or simulated defaults
      const hasSsl = isSslLoaded ? sslFeat.raw.valid : true;
      const hasDnssec = isDnsLoaded ? dnssecFeat.raw.isDNSSECEnabled : false;
      const hasWildcardCors = isCorsLoaded ? corsFeat.raw.wildcardCORS : true;

      const isLoaded = isSslLoaded || isDnsLoaded || isCorsLoaded;

      const score = (hasSsl ? 35 : 0) + (hasDnssec ? 35 : 0) + (!hasWildcardCors ? 30 : 10);
      const status = score > 80 ? "LOW RISK" : (score > 50 ? "MEDIUM RISK" : "HIGH RISK");

      return (
        <DashboardCard title="Compliance Manager (Crypto & CORS)" icon={<Shield className="w-4 h-4 text-emerald-500"/>} status={isLoaded || isDemo ? status : "neutral"}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Compliance validator scoring configurations against GDPR Article 32 and PCI-DSS v4.0 standards.</p>
           
           <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="w-full lg:w-1/3 flex flex-col items-center justify-center bg-[#0a0b0e] border border-zinc-900 rounded p-2.5 text-center select-none">
                 <span className="text-[8px] text-slate-500 uppercase font-mono tracking-widest">Compliance Rating</span>
                 <div className="text-xl font-black font-mono text-emerald-400 mt-1">{isLoaded || isDemo ? `${score}%` : "--"}</div>
                 <span className="text-[7px] text-slate-500 font-mono mt-1 font-semibold">100% MAXIMUM SCORE</span>
              </div>

              {/* Progress bars scorecard */}
              <div className="flex-1 w-full space-y-2.5 font-mono text-[9px]">
                 <div>
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-slate-400 font-bold">SSL Certificate Issuer Valid</span>
                       <span className="text-emerald-400 font-bold">{isLoaded || isDemo ? (hasSsl ? '100%' : '0%') : '--'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 transition-all duration-300" style={{width: `${(isLoaded || isDemo) && hasSsl ? 100 : 0}%`}}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-slate-400 font-bold">DNSSEC Zone Authentication Signature</span>
                       <span className={hasDnssec ? 'text-emerald-400 font-bold' : 'text-amber-500 font-bold'}>{isLoaded || isDemo ? (hasDnssec ? 'Active' : 'Missing') : '--'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                       <div className={`h-full ${hasDnssec ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-300`} style={{width: `${(isLoaded || isDemo) && hasDnssec ? 100 : 20}%`}}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-slate-400 font-bold">Strict CORS Host Permissions</span>
                       <span className={!hasWildcardCors ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{isLoaded || isDemo ? (!hasWildcardCors ? 'Strict' : 'Wildcard') : '--'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                       <div className={`h-full ${!hasWildcardCors ? 'bg-emerald-500' : 'bg-red-500'} transition-all duration-300`} style={{width: `${(isLoaded || isDemo) ? (!hasWildcardCors ? 100 : 35) : 0}%`}}></div>
                    </div>
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    // ==========================================
    // 12. Incidents (HTTP Headers mapped)
    // ==========================================
    if (featType === "Incidents") {
      const feat = getFeat("HTTP Security");
      const metrics = getMetrics(feat);
      const isLoaded = metrics !== null && !metrics.error;

      const headers = isLoaded && metrics.headers ? metrics.headers : (isDemo ? {
        hsts: true,
        csp: false,
        x_frame: false,
        x_content: true,
        referrer: false
      } : {});

      // Calculate score based on present headers
      const totalHeaders = 5;
      const presentCount = Object.values(headers).filter(Boolean).length;
      const missingCount = totalHeaders - presentCount;
      const status = missingCount > 2 ? "HIGH RISK" : (missingCount > 0 ? "MEDIUM RISK" : "LOW RISK");

      return (
        <DashboardCard title="HTTP Security Headers" icon={<AlertCircle className="w-4 h-4 text-violet-400"/>} status={isLoaded || isDemo ? status : "neutral"}>
           <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">Examines response policies for Clickjacking, MIME sniffing, and Cross-Site Scripting (XSS) headers.</p>
           
           <div className="flex flex-col lg:flex-row gap-3">
              <div className="w-full lg:w-1/3 flex flex-col justify-center gap-2">
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-mono">Present</span>
                    <span className="font-bold font-mono text-emerald-400">{isLoaded || isDemo ? presentCount : "--"}</span>
                 </div>
                 <div className="bg-[#0a0b0e] border border-zinc-900 rounded p-2 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-mono">Missing</span>
                    <span className={`font-bold font-mono ${missingCount > 1 ? 'text-red-400' : 'text-slate-300'}`}>{isLoaded || isDemo ? missingCount : "--"}</span>
                 </div>
              </div>

              {/* Checklist details grid */}
              <div className="flex-1 bg-black/40 border border-zinc-900 rounded-lg p-2.5 font-mono text-[9px] flex flex-col justify-center gap-1.5">
                 <div className="flex justify-between items-center">
                    <span className="text-slate-400">Strict-Transport-Security</span>
                    <span className={`font-bold ${headers.hsts ? 'text-emerald-400' : 'text-red-500'}`}>{isLoaded || isDemo ? (headers.hsts ? '✓ PRESENT' : '✗ MISSING') : '--'}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-400">Content-Security-Policy</span>
                    <span className={`font-bold ${headers.csp ? 'text-emerald-400' : 'text-red-500'}`}>{isLoaded || isDemo ? (headers.csp ? '✓ PRESENT' : '✗ MISSING') : '--'}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-400">X-Frame-Options</span>
                    <span className={`font-bold ${headers.x_frame ? 'text-emerald-400' : 'text-red-500'}`}>{isLoaded || isDemo ? (headers.x_frame ? '✓ PRESENT' : '✗ MISSING') : '--'}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-400">X-Content-Type-Options</span>
                    <span className={`font-bold ${headers.x_content ? 'text-emerald-400' : 'text-red-500'}`}>{isLoaded || isDemo ? (headers.x_content ? '✓ PRESENT' : '✗ MISSING') : '--'}</span>
                 </div>
              </div>
           </div>
        </DashboardCard>
      );
    }

    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {requiredCards.map((c) => (
         <div key={c} className="h-full">
           {renderVisualization(c)}
         </div>
      ))}
    </div>
  );
}
