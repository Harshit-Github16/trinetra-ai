"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Shield, ArrowRight, Lock, Mail, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "dummy@gmail.com" && password === "123456") {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Try dummy@gmail.com / 123456");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[url('/hero_cyber_bg.png')] bg-cover bg-center bg-no-repeat text-slate-100 flex items-center justify-center font-cyber relative overflow-hidden p-4">
      {/* Dark overlay to merge the background image smoothly with the main background color and keep text highly readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/90 via-[#020204]/80 to-[#020204]/90 z-0"></div>

      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-0"></div>

      {/* Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] hover:border-[#8b5cf6]/35 p-8 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.05)] relative z-10 transition-all duration-300">

        <div className="flex flex-col items-center justify-center space-y-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-black shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Image src="/logo.jpg" alt="Trinetra Logo" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-black text-white tracking-widest uppercase">TRINETRA AI</h1>
            <p className="text-xs text-slate-400 mt-1">Enterprise Authentication</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs text-center flex items-center justify-center gap-2 font-mono">
            <AlertTriangle className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block ml-1">Work Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="dummy@gmail.com"
                className="w-full bg-black/30 border border-white/[0.08] hover:border-white/[0.15] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-black/30 border border-white/[0.08] hover:border-white/[0.15] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative group w-full flex items-center justify-center bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer overflow-hidden mt-4"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
            {loading ? (
              <span className="relative flex items-center gap-2">
                <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Authenticating
              </span>
            ) : (
              <span className="relative flex items-center gap-2">
                Secure Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-500 font-medium">
            Demo Credentials: <span className="text-white font-mono bg-zinc-800 px-1 rounded">dummy@gmail.com</span> / <span className="text-white font-mono bg-zinc-800 px-1 rounded">123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}
