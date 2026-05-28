/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Eye, EyeOff, Search, Sparkles, User, FileText, ArrowRight } from "lucide-react";
import { mockRecords } from "../data";

interface QueryFormProps {
  onQuery: (id: string, name: string) => void;
  isLoading: boolean;
}

export function QueryForm({ onQuery, isLoading }: QueryFormProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [showIdentity, setShowIdentity] = useState(false);
  const [errors, setErrors] = useState<{ id?: string; name?: string }>({});

  const handleQuickFill = (targetId: string, targetName: string, idCard: string) => {
    setId(targetId);
    setName(targetName);
    setIdentityCard(idCard);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { id?: string; name?: string } = {};

    if (!id.trim()) {
      newErrors.id = "Please enter your registration ID";
    } else if (!/^\d+$/.test(id.trim())) {
      newErrors.id = "Registration ID must be composed of digits only";
    }

    if (!name.trim()) {
      newErrors.name = "Please enter applicant name";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onQuery(id, name);
  };

  return (
    <div id="query-form-card" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Absolute ambient glow card top */}
      <div className="absolute top-0 inset-x-0 h-1 bg-slate-900"></div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Search className="h-5 w-5 text-slate-600" />
          Verify Admissions Credentials
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Double-check your credentials below. Safe encrypted pathways are authorized for all queries.
        </p>

        {/* Quick Fill Profile Utility */}
        <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
            <span>Sandbox Presets (Load Pre-Evaluated Candidates)</span>
          </div>
          <div className="flex flex-col gap-2">
            {mockRecords.map((record) => (
              <button
                key={record.id}
                type="button"
                id={`autofill-btn-${record.id}`}
                disabled={isLoading}
                onClick={() => handleQuickFill(record.id, record.name, record.identityCard)}
                className="flex items-center justify-between text-left text-xs bg-white hover:bg-slate-100 border border-slate-200 p-2.5 rounded-lg active:scale-[0.98] transition-all text-slate-700 disabled:opacity-50"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">{record.name} - {record.department}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {record.id} | SSN: {record.identityCard}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Examinee ID */}
        <div>
          <label htmlFor="examinee-id" className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              Registration ID / Audition Number <sub className="text-rose-500 text-xs">*</sub>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">(e.g., 20261001)</span>
          </label>
          <input
            type="text"
            id="examinee-id"
            disabled={isLoading}
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              if (errors.id) setErrors({ ...errors, id: undefined });
            }}
            placeholder="Enter your 8-digit Registration ID"
            className={`w-full px-4 py-2.5 bg-slate-50 border ${
              errors.id ? "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500" : "border-slate-200 focus:ring-slate-900/5 focus:border-slate-950"
            } rounded-xl text-sm transition-all focus:outline-none focus:ring-4 font-mono`}
          />
          {errors.id && (
            <p id="error-id-msg" className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
              <span>⚠</span> {errors.id}
            </p>
          )}
        </div>

        {/* Student Name */}
        <div>
          <label htmlFor="examinee-name" className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-slate-400" />
              Applicant Legal Full Name <sub className="text-rose-500 text-xs">*</sub>
            </span>
          </label>
          <input
            type="text"
            id="examinee-name"
            disabled={isLoading}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="Enter name exactly as printed in files"
            className={`w-full px-4 py-2.5 bg-slate-50 border ${
              errors.name ? "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500" : "border-slate-200 focus:ring-slate-900/5 focus:border-slate-950"
            } rounded-xl text-sm transition-all focus:outline-none focus:ring-4`}
          />
          {errors.name && (
            <p id="error-name-msg" className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
              <span>⚠</span> {errors.name}
            </p>
          )}
        </div>

        {/* Identity Card (Optional validation aesthetic) */}
        <div>
          <label htmlFor="identity-card" className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>SSN / Passport / ID Card Number (Secure Guard)</span>
          </label>
          <div className="relative">
            <input
              type={showIdentity ? "text" : "password"}
              id="identity-card"
              disabled={isLoading}
              value={identityCard}
              onChange={(e) => setIdentityCard(e.target.value.toUpperCase())}
              placeholder="First alphabetic character + numbers (Optional)"
              className="w-full pl-4 pr-11 py-2.5 bg-slate-50 border border-slate-200 focus:ring-slate-900/5 focus:border-slate-950 rounded-xl text-sm focus:outline-none focus:ring-4 transition-all font-mono tracking-widest"
            />
            <button
              type="button"
              id="toggle-id-visibility"
              onClick={() => setShowIdentity(!showIdentity)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 rounded-md"
            >
              {showIdentity ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit button with animation handles */}
        <button
          type="submit"
          id="query-submit-btn"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-rose-400 font-semibold text-sm py-3 px-4 rounded-xl shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:text-white disabled:cursor-not-allowed group mt-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Matching Registrar Database...
            </>
          ) : (
            <>
              Submit Authorized Query
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
