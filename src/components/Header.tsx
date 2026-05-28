/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header id="app-header" className="w-full bg-slate-900 border-b border-rose-500/20 text-white py-6 px-4 md:px-8 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Name */}
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-rose-500 to-rose-700 p-3 rounded-xl shadow-inner text-white flex items-center justify-center">
            <GraduationCap className="h-8 w-8" />
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-semibold tracking-wider text-rose-400 text-xs uppercase font-mono">Office of Admissions</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
              Berklee College of Music
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Fall 2026 Live Auditions & Admission Status Inquiry Portal
            </p>
          </div>
        </div>

        {/* Security / System Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs text-slate-300">SSL Encrypted Channel</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 flex items-center gap-2 font-mono text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Database: ONLINE
          </div>
        </div>
      </div>
    </header>
  );
}
