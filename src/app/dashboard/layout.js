import React from 'react';
import { Shield, LayoutDashboard, Settings, LogOut, Search, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#020204] text-slate-100 flex font-cyber relative overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 bg-[#050509] border-r border-zinc-900 flex-shrink-0 hidden md:flex flex-col relative z-20 shadow-2xl">
        <div className="h-16 flex items-center px-6 border-b border-zinc-900">
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-black">
              <Image src="/logo.jpg" alt="Trinetra AI Logo" width={32} height={32} className="object-cover" />
            </div>
            <span className="text-sm font-black tracking-widest text-white">
              TRINETRA <span className="text-[#8b5cf6]">AI</span>
            </span>
          </Link>
        </div>

        <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
          <nav className="space-y-1">
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-3 px-3">Main</div>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] font-bold text-xs">
              <LayoutDashboard className="w-4 h-4" />
              <span>Intelligence Center</span>
            </a>

            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-6 mb-3 px-3">Network & Web Security</div>
            {[
              "External Attack Surface", "SSL/TLS Security", "HTTP Security Headers", "Shadow IT & Port Scan"
            ].map((item, i) => (
              <a key={`ti-${i}`} href="#" className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium text-xs transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]/60"></div>
                <span>{item}</span>
              </a>
            ))}

            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-6 mb-3 px-3">Threat Intelligence</div>
            {[
              "Threat Intelligence (VT)", "Phishing Protection", "Dark Web Crawler", "Social Media OSINT"
            ].map((item, i) => (
              <a key={`rp-${i}`} href="#" className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium text-xs transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]/60"></div>
                <span>{item}</span>
              </a>
            ))}

            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-6 mb-3 px-3">Governance & AI</div>
            {[
              "Email Security Suite", "Identity Security", "Breach Simulation", "Compliance", "Reports", "Incidents", "AI Security Copilot"
            ].map((item, i) => (
              <a key={`ga-${i}`} href="#" className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium text-xs transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]/60"></div>
                <span>{item}</span>
              </a>
            ))}
          </nav>


        </div>

        <div className="p-4 border-t border-zinc-900 space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 font-medium text-xs transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </a>
          <a href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 font-medium text-xs transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen relative z-10 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-[#050509]/40 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)] flex items-center justify-between px-6 shrink-0 relative z-30">
          <div className="flex items-center bg-black/50 border border-zinc-800 rounded-lg px-3 py-1.5 w-96">
            <Search className="w-4 h-4 text-slate-500 mr-2" />
            <input
              type="text"
              placeholder="Search across 19 vectors..."
              className="bg-transparent border-0 text-xs text-white placeholder-slate-600 focus:outline-none w-full font-mono"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" title="System Online"></div>
            <div className="flex items-center space-x-2 bg-black/40 border border-zinc-800 rounded-full pl-2 pr-1 py-1">
              <span className="text-xs font-bold text-white pl-2 pr-3">Security Admin</span>
              <div className="h-7 w-7 rounded-full bg-[#8b5cf6] flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          {children}
        </div>
      </main>

    </div>
  );
}
