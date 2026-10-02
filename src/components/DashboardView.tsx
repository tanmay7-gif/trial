'use client';

import React from 'react';
import { useMedVault } from '@/lib/context';
import { storage } from '@/lib/storage';
import { CLINICAL_PARAMETERS, getStatusColor } from '@/lib/referenceRanges';
import {
  Activity,
  Heart,
  Droplets,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  FileText,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
  Utensils,
  Bell
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    activeProfile,
    reports,
    setActiveTab,
    setUploadModalOpen,
    t,
    language
  } = useMedVault();

  const measurements = storage.getMeasurements(activeProfile.id);
  const reminders = storage.getReminders(activeProfile.id);
  const dietPlan = storage.getDietPlan(activeProfile.id);

  // Group latest measurement per parameter code
  const latestByCode: Record<string, typeof measurements[0]> = {};
  const previousByCode: Record<string, typeof measurements[0]> = {};

  measurements.forEach(m => {
    if (!latestByCode[m.parameterCode]) {
      latestByCode[m.parameterCode] = m;
    } else {
      previousByCode[m.parameterCode] = latestByCode[m.parameterCode];
      latestByCode[m.parameterCode] = m;
    }
  });

  const primaryCards = [
    { code: 'hba1c', fallbackName: 'HbA1c' },
    { code: 'fbs', fallbackName: 'Fasting Sugar' },
    { code: 'chol_ldl', fallbackName: 'LDL Cholesterol' },
    { code: 'bp_systolic', fallbackName: 'Systolic BP' }
  ];

  const needsAttention = Object.values(latestByCode).filter(
    m => m.status === 'high' || m.status === 'critical' || m.status === 'low'
  );

  const handleExportSummaryPdf = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-800 via-emerald-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-teal-200 backdrop-blur-md mb-3 border border-white/10">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>DPDP Act 2023 End-to-End Encrypted Locker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'hi' ? 'नमस्ते' : 'Hello'}, {activeProfile.name}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            {language === 'hi'
              ? 'आपके स्वास्थ्य रुझान और लैब परीक्षण सुरक्षित रूप से ट्रैक किए जा रहे हैं।'
              : 'Your health trends and longitudinal medical records are synchronized and ready.'}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="rounded-2xl bg-white px-4 py-2 text-xs font-bold text-teal-900 shadow-md hover:bg-teal-50 active:scale-95 transition-all"
            >
              + {t.vault.uploadNew}
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className="rounded-2xl bg-teal-700/60 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700 active:scale-95 transition-all border border-teal-500/30"
            >
              {t.nav.trends} →
            </button>
            <button
              onClick={handleExportSummaryPdf}
              className="rounded-2xl bg-teal-700/60 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700 active:scale-95 transition-all border border-teal-500/30 flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Doctor Summary
            </button>
          </div>
        </div>
      </div>

      {/* Primary Biomarker Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {primaryCards.map(item => {
          const latest = latestByCode[item.code];
          const previous = previousByCode[item.code];
          const paramDef = CLINICAL_PARAMETERS.find(p => p.code === item.code);
          const colors = latest ? getStatusColor(latest.status) : null;

          const change =
            latest && previous ? Number((latest.value - previous.value).toFixed(1)) : null;

          return (
            <div
              key={item.code}
              onClick={() => setActiveTab('trends')}
              className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                  {language === 'hi' ? paramDef?.nameHi : paramDef?.nameEn || item.fallbackName}
                </span>
                {colors && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${colors.badge}`}>
                    {language === 'hi' ? colors.labelHi : colors.labelEn}
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {latest ? latest.value : '--'}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {latest ? latest.unit : paramDef?.unit}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                {change !== null ? (
                  <span
                    className={`flex items-center gap-0.5 font-semibold ${
                      change < 0 ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {change < 0 ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : (
                      <TrendingUp className="h-3 w-3" />
                    )}
                    {change > 0 ? `+${change}` : change} vs last
                  </span>
                ) : (
                  <span>Baseline record</span>
                )}

                {paramDef && (
                  <span className="hidden sm:inline">
                    Range: {paramDef.minNormal}-{paramDef.maxNormal}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Needs Attention & Condition Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Needs Attention / Clinical Insights */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Biomarkers Needing Attention ({needsAttention.length})
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('trends')}
                className="text-xs font-semibold text-teal-600 hover:underline dark:text-teal-400"
              >
                View Graphs →
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
              {needsAttention.map(m => {
                const paramDef = CLINICAL_PARAMETERS.find(p => p.code === m.parameterCode);
                const colors = getStatusColor(m.status);
                return (
                  <div key={m.id} className="py-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {language === 'hi' ? paramDef?.nameHi : paramDef?.nameEn || m.parameterCode}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${colors.badge}`}>
                          {language === 'hi' ? colors.labelHi : colors.labelEn}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                        {language === 'hi' ? paramDef?.descriptionHi : paramDef?.descriptionEn}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {m.value} {m.unit}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(m.measuredAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Guidance to Diet Plan */}
          {dietPlan && (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 shrink-0">
                  <Utensils className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    Personalized Indian Diet Plan Active
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
                    Calibrated for HbA1c {latestByCode['hba1c']?.value || '7.6'}% and LDL{' '}
                    {latestByCode['chol_ldl']?.value || '138'} mg/dL.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('diet')}
                className="shrink-0 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
              >
                View 7-Day Plan →
              </button>
            </div>
          )}
        </div>

        {/* Sidebar: Upcoming Reminders & Vault Summary */}
        <div className="space-y-4">
          {/* Reminders Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Condition Reminders
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('reminders')}
                className="text-xs font-semibold text-teal-600 hover:underline dark:text-teal-400"
              >
                All →
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {reminders.slice(0, 3).map(r => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-850"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {language === 'hi' && r.titleHi ? r.titleHi : r.title}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-teal-700 dark:text-teal-300 font-medium">
                      <Calendar className="h-3 w-3" />
                      Due: {r.nextDueDate}
                    </span>
                    <span className="capitalize">{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vault Summary Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Vault Storage
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('vault')}
                className="text-xs font-semibold text-teal-600 hover:underline dark:text-teal-400"
              >
                Open Vault →
              </button>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Total Active Reports:</span>
                <strong className="text-slate-900 dark:text-white">{reports.length}</strong>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Total Extracted Metrics:</span>
                <strong className="text-slate-900 dark:text-white">{measurements.length}</strong>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Storage Security:</span>
                <span className="text-emerald-600 font-semibold">AES-256 Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
