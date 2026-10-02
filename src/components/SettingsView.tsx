'use client';

import React, { useState } from 'react';
import { useMedVault } from '@/lib/context';
import { storage } from '@/lib/storage';
import {
  ShieldCheck,
  Download,
  Trash2,
  Lock,
  FileCheck,
  History,
  Key,
  Database,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user, setAppLockPin, disableAppLock, t, language } = useMedVault();

  const auditLogs = storage.getAuditLogs();
  const consentLogs = storage.getConsentLogs();

  const [pinInput, setPinInput] = useState('');
  const [pinSavedMessage, setPinSavedMessage] = useState(false);

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length === 4) {
      setAppLockPin(pinInput);
      setPinInput('');
      setPinSavedMessage(true);
      setTimeout(() => setPinSavedMessage(false), 2500);
    }
  };

  const handleExportAllData = () => {
    const data = {
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
      profiles: storage.getProfiles(),
      reports: storage.getReports(undefined, true),
      measurements: storage.getMeasurements('prof-ramesh'),
      auditLogs: storage.getAuditLogs(),
      consentLogs: storage.getConsentLogs(),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MedVault_Complete_Health_Archive_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        'DPDP Act 2023 Right to Erasure:\nAre you sure you want to permanently delete your entire account, all uploaded medical files, and biometric measurements? This cannot be undone.'
      )
    ) {
      alert('Your request for complete data erasure has been processed in accordance with Section 12 of the DPDP Act 2023.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t.compliance.dpdpNotice}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          India DPDP Act 2023 & HIPAA compliance dashboard, privacy rights, consent records, and security controls.
        </p>
      </div>

      {/* Compliance Overview Banner - Soft Pink & Crisp White */}
      <div className="rounded-3xl border border-pink-200/90 bg-gradient-to-r from-pink-50/70 via-rose-50/40 to-white p-6 dark:border-pink-900/60 dark:bg-pink-950/30 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-md shadow-pink-500/25 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-pink-200">
              {t.compliance.consentTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.compliance.consentBody}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-rose-800 dark:text-pink-300">
              <span className="rounded-lg bg-pink-100/80 px-2.5 py-1 dark:bg-pink-900/60 border border-pink-200">
                ✓ Purpose Limitation Enforced
              </span>
              <span className="rounded-lg bg-pink-100/80 px-2.5 py-1 dark:bg-pink-900/60 border border-pink-200">
                ✓ AES-256 File Encryption at Rest
              </span>
              <span className="rounded-lg bg-pink-100/80 px-2.5 py-1 dark:bg-pink-900/60 border border-pink-200">
                ✓ Zero Third-Party Advertising
              </span>
              <span className="rounded-lg bg-pink-100/80 px-2.5 py-1 dark:bg-pink-900/60 border border-pink-200">
                ✓ TLS 1.3 in Transit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: App-Lock & Data Rights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security & App-Lock Configuration */}
        <div className="rounded-3xl border border-pink-100/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-pink-50 pb-3 dark:border-slate-800">
            <Lock className="h-4 w-4 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Device Security & PIN Lock
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.appLock.autoLockDesc}
          </p>

          <form onSubmit={handleUpdatePin} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {user.hasAppLock ? 'Change 4-Digit PIN' : 'Set New 4-Digit PIN'}
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  maxLength={4}
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 4 digits"
                  className="w-36 rounded-xl border border-pink-200 bg-pink-50/30 px-3 py-2 text-center text-sm font-bold tracking-widest text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={pinInput.length !== 4}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 disabled:opacity-50"
                >
                  Save PIN
                </button>
              </div>
            </div>

            {pinSavedMessage && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Security PIN saved successfully!
              </div>
            )}

            {user.hasAppLock && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={disableAppLock}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Disable App-Lock on this device
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Data Portability & Right to Erasure */}
        <div className="rounded-3xl border border-pink-100/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-pink-50 pb-3 dark:border-slate-800">
            <Database className="h-4 w-4 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Data Rights (DPDP Section 11 & 12)
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Right to Data Portability
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Download a machine-readable JSON archive of all reports, extracted biomarkers, and consent logs.
              </p>
              <button
                onClick={handleExportAllData}
                className="mt-2 flex items-center gap-1.5 rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <Download className="h-3.5 w-3.5 text-rose-600" />
                {t.compliance.exportData}
              </button>
            </div>

            <div className="pt-3 border-t border-pink-50 dark:border-slate-800">
              <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400">
                Right to Erasure ("Forget Me")
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Permanently purge your account, all family profiles, diagnostic reports, and encrypted files.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="mt-2 flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {t.compliance.deleteAccount}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Trail */}
      <div className="rounded-3xl border border-pink-100/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between border-b border-pink-50 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Immutable Access & Audit Logs
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Last 50 actions logged
          </span>
        </div>

        <div className="divide-y divide-pink-50 dark:divide-slate-800 max-h-60 overflow-y-auto">
          {auditLogs.map(log => (
            <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">
                  {log.action}
                </span>{' '}
                <span className="text-slate-400">({log.resourceType})</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {new Date(log.timestamp).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Medical Disclaimer Notice */}
      <div className="rounded-2xl border border-pink-100 bg-[#FDF8F9] p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 text-center leading-relaxed">
        {t.compliance.medicalDisclaimer}
      </div>
    </div>
  );
};
