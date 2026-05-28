/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CheckCircle2, Download, Printer, RefreshCw, Award, Landmark, ShieldCheck } from "lucide-react";
import { ExamineeRecord } from "../types";

function stringToHex(str: string): string {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16);
  }
  return hex;
}

interface ResultCardProps {
  record: ExamineeRecord;
  onReset: () => void;
}

export function ResultCard({ record, onReset }: ResultCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Simulating a real PDF compile and generating a downloadable text-encoded certificate
      const timestamp = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
      const txtContent = `=======================================================
               BERKLEE COLLEGE OF MUSIC
         Official Audition and Portfolio Assessment Letter
=======================================================

[Applicant Profile Credentials]
Registration ID   : ${record.id}
Applicant Name    : ${record.name}
Admitted Program  : ${record.department}
Admission Pathway : ${record.category}
Decision Released   : ${record.registrationDate}

[Audition Scoring and Academic Portfolio Metrics]
${record.subjects.map((sub) => `▶ ${sub.name} :
   Raw Score: ${sub.score.toFixed(1)} | Weight: ${(sub.weight * 100).toFixed(0)}% | Assigned Points: ${sub.weightedScore.toFixed(2)} | Scaled Letter Grade: ${sub.grade}`).join("\n")}

-------------------------------------------------------
Total Weighted Aggregate Score  : ${record.totalScore.toFixed(2)} / 100
Assigned Audition Department Rank: Rank ${record.rank}
-------------------------------------------------------

[Admissions Council Official Action]
FINAL VERDICT     : ★★★★★ REVIEW APPROVED (PASS) ★★★★★

[Audition Panel Comments & Committee Notes]
${record.decisionText}

-------------------------------------------------------
[Secure Token ID] BERKLEE-SEC-SIGN-SHA256-${record.id}-${stringToHex(record.name).toUpperCase().slice(0, 10)}
[Downloaded On]  ${timestamp} UTC
[Origin Server]  https://ai.studio/build
Berklee Admissions Council & Board of Registrars
=======================================================`;

      const element = document.createElement("a");
      const file = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
      element.href = URL.createObjectURL(file);
      element.download = `Berklee_Admissions_Approved_Letter_${record.name}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div id="result-container" className="space-y-6">
      {/* Top Banner indicating success */}
      <div 
        id="result-status-banner" 
        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
      >
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="bg-emerald-500 text-white p-3.5 rounded-full shadow-lg shadow-emerald-500/20 flex items-center justify-center animate-bounce">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] bg-emerald-600 text-white font-extrabold uppercase px-1.5 py-0.5 rounded tracking-widest font-mono">
                System Verified
              </span>
              <span className="text-xs text-emerald-600 font-semibold font-mono">Verification Match Complete</span>
            </div>
            <h2 className="text-2xl font-black text-emerald-800 tracking-tight mt-1">
              Identity Matched: Committee Decision Posted
            </h2>
          </div>
        </div>

        {/* The target display string - highly stylized */}
        <div className="bg-white border-2 border-emerald-500 rounded-2xl px-6 py-4 flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
          {/* Pulsing ring */}
          <span className="absolute inset-0 bg-emerald-500/5 animate-pulse rounded-2xl"></span>
          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-0.5 font-mono">
            Final Action
          </span>
          <p id="badge-approved-text" className="text-3xl font-black text-emerald-600 tracking-[0.1em] select-none hover:scale-105 transition-transform duration-300">
            REVIEW APPROVED
          </p>
        </div>
      </div>

      {/* Main Classical Certificate Card */}
      <div 
        id="official-certificate-card" 
        className="bg-white border-8 border-slate-100 rounded-3xl p-6 shadow-md relative overflow-hidden print:border-0 print:shadow-none print:p-0"
        style={{ backgroundImage: "linear-gradient(rgba(241, 245, 249, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(241, 245, 249, 0.25) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      >
        {/* Certificate Double borders inside */}
        <div className="border border-slate-200/80 rounded-xl p-5 md:p-8 relative font-sans">
          
          {/* Certificate Corner Ribbons or Marks */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-slate-300"></div>
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-slate-300"></div>
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-slate-300"></div>
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-slate-300"></div>

          {/* Academic watermark background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <Landmark className="h-80 w-80 text-slate-900" />
          </div>

          {/* Certificate Header */}
          <div className="text-center pb-6 border-b border-dashed border-slate-200">
            <Landmark className="h-9 w-9 text-slate-800 mx-auto stroke-[1.5] mb-2" />
            <h3 className="text-xl font-black text-slate-800 tracking-wider">
              Berklee College of Music Admissions Board
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              OFFICIAL CERTIFICATE OF ADMISSION STATUS
            </p>
          </div>

          {/* Student Profile Block */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="space-y-2">
              <div className="text-xs flex items-center">
                <span className="text-slate-400 w-28 flex-shrink-0 font-medium">Registration ID:</span>
                <span className="font-mono text-slate-800 font-bold select-all">{record.id}</span>
              </div>
              <div className="text-xs flex items-center">
                <span className="text-slate-400 w-28 flex-shrink-0 font-medium">Applicant Name:</span>
                <span className="text-slate-800 font-bold">{record.name}</span>
              </div>
              <div className="text-xs flex items-center">
                <span className="text-slate-400 w-28 flex-shrink-0 font-medium">Program Category:</span>
                <span className="text-slate-700 bg-slate-200/60 px-1.5 py-0.5 rounded font-medium">{record.category}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-xs flex items-center">
                <span className="text-slate-400 w-28 flex-shrink-0 font-medium">Department Major:</span>
                <span className="text-slate-800 font-bold">{record.department}</span>
              </div>
              <div className="text-xs flex items-center">
                <span className="text-slate-400 w-28 flex-shrink-0 font-medium">Decision Released:</span>
                <span className="font-mono text-slate-700 font-medium">{record.registrationDate}</span>
              </div>
              <div className="text-xs flex items-center">
                <span className="text-slate-400 w-28 flex-shrink-0 font-medium">Verification Token:</span>
                <span className="font-mono text-slate-500 text-[10px] bg-slate-200/30 font-semibold px-2 py-0.5 rounded select-all">
                  BERKLEE-SEC-#{record.id}
                </span>
              </div>
            </div>
          </div>

          {/* Grades breakdown Segment */}
          <div className="mt-8">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-slate-400" />
              Audition Metrics & Portfolio Valuation Details
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-100 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-600 font-semibold uppercase font-mono">
                  <tr>
                    <th scope="col" className="px-4 py-3">Assessed Skill Area</th>
                    <th scope="col" className="px-4 py-3 text-right">Raw Score</th>
                    <th scope="col" className="px-4 py-3 text-right">Weight</th>
                    <th scope="col" className="px-4 py-3 text-right">Weighted score</th>
                    <th scope="col" className="px-4 py-3 text-center">Grade Letter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {record.subjects.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-700">{sub.name}</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-600">{sub.score.toFixed(1)}</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-400">{(sub.weight * 100).toFixed(0)}%</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-800">{sub.weightedScore.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-2 py-0.5 font-bold font-mono rounded bg-slate-100 text-rose-700">
                          {sub.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Aggregates footer */}
                  <tr className="bg-slate-50/60 font-semibold text-slate-800">
                    <td className="px-4 py-3.5">Integrated Grade Score (Total Aggregate)</td>
                    <td colSpan={2} className="px-4 py-3.5 text-right text-slate-400 text-[11px] font-mono">
                      Weighted Cumulative Calculation
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-base font-extrabold text-slate-900 border-t border-slate-200">
                      {record.totalScore.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="text-xs bg-slate-900 text-rose-400 px-2 py-1 rounded-md font-bold font-mono">
                        Rank #{record.rank}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Committee Note Paragraph & Red Wax Stamp Grid */}
          <div className="mt-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-stretch">
            {/* Memo */}
            <div className="flex-1 bg-amber-50/30 border border-rose-500/10 rounded-xl p-4 leading-relaxed text-xs text-slate-600 md:self-center">
              <span className="font-bold text-slate-800 block mb-1">【Admissions Evaluation Council Remarks】</span>
              <p className="indent-5">{record.decisionText}</p>
            </div>

            {/* Official University Seal Stamp graphic (pure CSS - highly professional, retro red wax look) */}
            <div id="official-seal-imprint" className="self-center md:self-auto flex items-center justify-center p-3 relative select-none">
              <div 
                className="w-28 h-28 border-4 border-rose-600 rounded-full flex flex-col items-center justify-center text-rose-600 p-2 text-center relative rotate-12 select-none opacity-80"
                style={{
                  boxShadow: "0 0 0 1px rgba(225, 29, 72, 0.3) inset",
                }}
              >
                {/* Stamp Outer Dotted lines mimic authentic wax stamps */}
                <div className="absolute inset-1 border border-dashed border-rose-600 rounded-full"></div>
                <span className="text-[8px] font-bold tracking-widest leading-none mt-1">BERKLEE COLLEGE</span>
                {/* Horizontal line divider */}
                <div className="w-16 h-[1.5px] bg-rose-600 my-1"></div>
                <span className="text-xs font-black tracking-widest">APPROVED</span>
                <div className="w-16 h-[1.5px] bg-rose-600 my-1"></div>
                <span className="text-[7px] tracking-widest font-bold leading-none mb-1">BOARD OF ADMISSIONS</span>
              </div>
            </div>
          </div>

          {/* Validator digital sign footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Admissions verification stamp active. Token ID: SHA256:{stringToHex(record.id + record.name).toUpperCase().slice(0, 16)}
            </span>
            <span>Berklee College of Music Helpline: +1 (617) 747-2222</span>
          </div>

        </div>
      </div>

      {/* Controller Actions */}
      <div id="result-controllers font-sans" className="flex flex-wrap gap-3 items-center justify-between font-sans">
        <button
          type="button"
          id="cert-back-btn"
          onClick={onReset}
          className="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-xl shadow-sm cursor-pointer transition-all active:scale-[0.98] flex items-center gap-1.5"
        >
          <RefreshCw className="h-4 w-4" />
          Back to Verification Engine
        </button>

        <div className="flex gap-2">
          {/* Print button */}
          <button
            type="button"
            id="cert-print-btn"
            onClick={handlePrint}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl cursor-pointer transition-all active:scale-[0.98] flex items-center gap-1.5"
          >
            <Printer className="h-4 w-4" />
            Print Decision Status
          </button>

          {/* Stimulated PDF download button */}
          <button
            type="button"
            id="cert-download-btn"
            disabled={downloading}
            onClick={handleDownload}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-rose-400 font-semibold text-xs rounded-xl cursor-pointer transition-all active:scale-[0.98] flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Formatting transcript..." : downloadSuccess ? "Downloaded!" : "Download Official Letter (.txt)"}
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div id="toast-notif animate-fade-in" className="bg-slate-900 border border-slate-800 text-white p-3.5 rounded-xl shadow-lg flex items-center gap-3 text-xs w-fit mx-auto mt-4 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Official Berklee Admissions Letter decrypted & generated on device storage successfully.</span>
        </div>
      )}
    </div>
  );
}
