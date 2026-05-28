/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Header } from "./components/Header";
import { NoticeBoard } from "./components/NoticeBoard";
import { QueryForm } from "./components/QueryForm";
import { ResultCard } from "./components/ResultCard";
import { mockRecords, generateCustomApprovedRecord } from "./data";
import { ExamineeRecord } from "./types";
import { Sparkles, ShieldAlert } from "lucide-react";

export default function App() {
  const [record, setRecord] = useState<ExamineeRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Securing handshake with registrar database servers...",
    "Matching credentials with audited admissions registry...",
    "Compiling official decision documents and secure tokens..."
  ];

  const handleQuery = (id: string, name: string) => {
    setIsLoading(true);
    setLoadingStep(0);

    // Step 1: Connect to database
    const t1 = setTimeout(() => {
      setLoadingStep(1);
    }, 400);

    // Step 2: Compare digital signature
    const t2 = setTimeout(() => {
      setLoadingStep(2);
    }, 800);

    // Step 3: Compile final official certificate
    const t3 = setTimeout(() => {
      // Find matching mock record
      const match = mockRecords.find(
        (r) => r.id.trim() === id.trim()
      );

      if (match) {
        // If match, use it but update the name to what they typed to keep it personalized!
        setRecord({
          ...match,
          name: name.trim() // keeps it highly dynamic in case user types their own name with sample ID!
        });
      } else {
        // Guarantee "APPROVED" for any customized entry!
        setRecord(generateCustomApprovedRecord(id, name));
      }

      setIsLoading(false);
      setLoadingStep(0);
    }, 1300);
  };

  const handleReset = () => {
    setRecord(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. Header Layout */}
      <Header />

      {/* Decorative top message bar */}
      <div className="w-full bg-rose-600 text-white px-4 py-1.5 text-xs text-center font-semibold tracking-wider font-mono">
        ⚠ Official electronic inquiry terminal for Berklee College of Music board decisions.
      </div>

      {/* 2. Main content container */}
      <main id="app-main-content" className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
        
        {/* Loading Overlay State / Circular Stepper - Keeps the interface completely clean */}
        {isLoading ? (
          <div 
            id="loading-stepper" 
            className="w-full max-w-lg mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-lg p-8 py-12 flex flex-col items-center justify-center space-y-6 text-center animate-pulse"
          >
            <div className="relative">
              {/* Outer spinning borders */}
              <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-rose-600 animate-spin"></div>
              {/* Center star decorative */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-rose-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-800 text-base">Authenticating Credentials</h3>
              <p className="text-xs text-slate-500 max-w-xs font-medium font-mono min-h-[3rem] flex items-center justify-center leading-relaxed">
                {loadingMessages[loadingStep]}
              </p>
            </div>

            {/* Simulated mini ticks */}
            <div className="flex items-center gap-1.5 pt-2">
              <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${loadingStep >= 0 ? "bg-rose-600" : "bg-slate-200"}`}></span>
              <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${loadingStep >= 1 ? "bg-rose-600" : "bg-slate-200"}`}></span>
              <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${loadingStep >= 2 ? "bg-rose-600" : "bg-slate-200"}`}></span>
            </div>
          </div>
        ) : record ? (
          /* 3. Inquiry Result Card presentation */
          <div className="w-full max-w-4xl mx-auto transition-all duration-500 ease-out">
            <ResultCard record={record} onReset={handleReset} />
          </div>
        ) : (
          /* 4. Active Inquiry controls grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Guide and News Announcement (5 columns) */}
            <section className="lg:col-span-5 order-2 lg:order-1">
              <NoticeBoard />
              
              {/* Auxiliary security indicator beneath notice board */}
              <div className="mt-4 bg-slate-100 border border-slate-200 rounded-xl p-4 flex gap-3 text-xs text-slate-500">
                <ShieldAlert className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  This terminal is protected by advanced identity guards. Unauthorized access patterns or credential harvesting will trigger registrar firewalls and legal warnings.
                </p>
              </div>
            </section>

            {/* Right side: Core input lookup card (7 columns) */}
            <section className="lg:col-span-7 order-1 lg:order-2">
              <QueryForm onQuery={handleQuery} isLoading={isLoading} />
            </section>

          </div>
        )}

      </main>

      {/* 5. Footer branding */}
      <footer id="app-footer" className="w-full bg-slate-900 py-6 text-slate-500 text-xs border-t border-slate-800 text-center px-4 font-mono">
        <div className="max-w-7xl mx-auto space-y-2">
          <p>© 2026 Berklee College of Music. Board of Admissions. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px]">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy & Security Policies</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Admissions Code</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Contact Registrar IT Desk</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
