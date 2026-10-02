'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  LogOut,
  Lock,
  ArrowRight,
  CheckCircle2,
  Home,
  Clock
} from 'lucide-react';

export default function LogoutPage() {
  const [logoutTime, setLogoutTime] = useState<string>('');

  useEffect(() => {
    setLogoutTime(
      new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8F9] dark:bg-[#0F1117] flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-pink-500/25">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          MedVault
        </span>
      </div>

      {/* Main Farewell Card */}
      <div className="w-full max-w-md rounded-3xl border border-pink-100/90 bg-white p-8 shadow-xl shadow-pink-950/5 dark:border-slate-800 dark:bg-slate-900 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Sign Out Badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-rose-600 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-100 dark:border-pink-900/40 mb-4 shadow-inner">
          <LogOut className="h-8 w-8" />
        </div>

        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          You've Been Securely Signed Out
        </h1>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Thank you for using MedVault. Your diagnostic documents, biomarker trends, and family profiles have been safely locked.
        </p>

        {/* Security Summary Box */}
        <div className="mt-6 rounded-2xl border border-pink-100 bg-[#FDF8F9] p-4 text-left dark:border-slate-800 dark:bg-slate-850 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Encrypted Vault Locked (AES-256)</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Cached Session Tokens Purged</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>DPDP Act 2023 Consent Logs Recorded</span>
          </div>

          {logoutTime && (
            <div className="pt-2 border-t border-pink-100/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Session Ended At:
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-300 font-medium">
                {logoutTime}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-rose-600 py-3 text-xs font-bold text-white shadow-md shadow-pink-500/25 hover:bg-rose-700 active:scale-95 transition-all"
          >
            <span>Log Back In</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-pink-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-pink-50/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors shadow-xs"
          >
            <Home className="h-3.5 w-3.5 text-rose-600" />
            <span>Return to Home Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Security Reassurance */}
      <div className="mt-8 text-center text-[11px] text-slate-400 max-w-sm">
        MedVault provides HIPAA & DPDP Act 2023 compliant data isolation. To ensure complete privacy on shared devices, close this browser window.
      </div>
    </div>
  );
}
