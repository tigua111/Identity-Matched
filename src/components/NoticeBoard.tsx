/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AlertCircle, Calendar, CheckCircle2, Info } from "lucide-react";

export function NoticeBoard() {
  return (
    <div id="notice-board" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 overflow-hidden relative">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500"></div>

      <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-3">
        <Info className="h-5 w-5 text-slate-500" />
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">Admissions Bulletin</h2>
      </div>

      <div className="space-y-4 text-sm text-slate-600">
        <div className="flex gap-3 items-start">
          <div className="bg-amber-50 text-amber-600 p-1.5 rounded-lg mt-0.5 flex-shrink-0">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Fall 2026 Board Decisions Released</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Global audition metrics are finalized as of May 28, 2026. Accepted applicants should expect physical welcome letters and scholarship portfolios via certified mail shortly.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg mt-0.5 flex-shrink-0">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Status Verification Guide</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Upon query submission, successfully approved portfolios will instantly display <span className="text-emerald-600 font-semibold font-mono">APPROVED</span> status alongside your accredited aggregate scores.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div className="bg-slate-100 text-slate-600 p-1.5 rounded-lg mt-0.5 flex-shrink-0">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Verification Sandbox Mode</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Use the "Quick Fill" presets on the right to simulate live authenticated queries. Any credentials submitted will evaluate and generate an official electronic admissions letter representing Berklee.
            </p>
          </div>
        </div>
      </div>

      {/* Security Disclaimer footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Office of the Registrar</span>
        <span>Version: v4.2.1-SEC</span>
      </div>
    </div>
  );
}
