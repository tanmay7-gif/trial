'use client';

import React, { useState } from 'react';
import { useMedVault } from '@/lib/context';
import { storage } from '@/lib/storage';
import { CLINICAL_PARAMETERS, getStatusColor } from '@/lib/referenceRanges';
import {
  X,
  Calendar,
  User,
  Building2,
  Tag,
  Download,
  Share2,
  Trash2,
  Lock,
  Clock,
  Check,
  AlertCircle,
  FileText,
  Eye,
  ShieldCheck
} from 'lucide-react';

export const ReportDetailModal: React.FC = () => {
  const {
    selectedReportForDetail,
    setSelectedReportForDetail,
    refreshData,
    activeProfile,
    t,
    language
  } = useMedVault();

  const [shareDrawerOpen, setShareDrawerOpen] = useState(false);
  const [expiryHours, setExpiryHours] = useState(24);
  const [passcode, setPasscode] = useState('4821');
  const [createdShareUrl, setCreatedShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeShareToken, setActiveShareToken] = useState<string>('');

  if (!selectedReportForDetail) return null;

  const report = selectedReportForDetail;
  const measurements = storage
    .getMeasurements(activeProfile.id)
    .filter(m => m.reportId === report.id);

  const handleSoftDelete = () => {
    if (confirm('Are you sure you want to move this report to trash? It can be restored within 30 days.')) {
      storage.softDeleteReport(report.id);
      refreshData();
      setSelectedReportForDetail(null);
    }
  };

  const handleGenerateShare = () => {
    const link = storage.createShareLink(activeProfile.id, expiryHours, passcode || undefined);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    setCreatedShareUrl(`${origin}/share/${link.token}`);
    setActiveShareToken(link.token);
  };

  const handleRevokeShare = () => {
    if (activeShareToken) {
      storage.revokeShareLink(activeShareToken);
      setCreatedShareUrl('');
      setActiveShareToken('');
      alert(t.shareModal.revokeConfirm);
    }
  };

  const handleCopy = () => {
    if (createdShareUrl && navigator.clipboard) {
      navigator.clipboard.writeText(createdShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl border border-pink-100 bg-white p-5 sm:p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-pink-50 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-bold text-rose-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 capitalize">
                {report.reportType.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-slate-400">
                Filing for {activeProfile.name}
              </span>
            </div>
            <h2 className="mt-1 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {report.title}
            </h2>
          </div>
          <button
            onClick={() => setSelectedReportForDetail(null)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-pink-50 hover:text-rose-700 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metadata Sidebar */}
          <div className="space-y-4 text-xs">
            <div className="rounded-2xl border border-pink-100 bg-[#FDF8F9] p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Calendar className="h-4 w-4 text-rose-500 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {new Date(report.reportDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-[10px] text-slate-400">{t.vault.reportDate}</div>
                </div>
              </div>

              {report.doctorName && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <User className="h-4 w-4 text-rose-500 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {report.doctorName}
                    </div>
                    <div className="text-[10px] text-slate-400">{t.vault.doctor}</div>
                  </div>
                </div>
              )}

              {report.labName && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Building2 className="h-4 w-4 text-rose-500 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {report.labName}
                    </div>
                    <div className="text-[10px] text-slate-400">{t.vault.lab}</div>
                  </div>
                </div>
              )}

              {report.tags && report.tags.length > 0 && (
                <div className="pt-2 border-t border-pink-100/60 dark:border-slate-700/60">
                  <div className="text-[10px] font-semibold text-slate-400 mb-1.5">
                    {t.vault.tags}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {report.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-pink-100/70 px-1.5 py-0.5 text-[10px] font-medium text-rose-800 dark:bg-slate-700 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Doctor Remarks */}
            {report.notes && (
              <div className="rounded-2xl border border-pink-200 bg-pink-50/50 p-4 dark:border-pink-900/50 dark:bg-pink-950/20">
                <div className="text-[10px] font-bold text-rose-800 dark:text-pink-300 uppercase tracking-wider mb-1">
                  {t.vault.notes}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  "{report.notes}"
                </p>
              </div>
            )}

            {/* Attached Files List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.vault.filesAttached} ({report.files.length})
              </div>
              {report.files.map(f => (
                <div
                  key={f.id}
                  className="flex items-center justify-between rounded-xl border border-pink-100 p-2.5 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 text-rose-500 shrink-0" />
                    <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                      {f.fileName}
                    </span>
                  </div>
                  <button
                    onClick={() => alert(`Simulating secure decrypted download for: ${f.fileName}`)}
                    className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-pink-400"
                    title="Download"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Panel: Extracted Biomarkers & Document Preview */}
          <div className="md:col-span-2 space-y-4">
            {/* Extracted Biomarkers Section */}
            <div className="rounded-2xl border border-pink-100 dark:border-slate-800 overflow-hidden">
              <div className="bg-pink-50/60 dark:bg-slate-800/80 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 border-b border-pink-100 dark:border-slate-800 flex justify-between items-center">
                <span>Verified Biomarkers ({measurements.length})</span>
                <span className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-pink-400 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  User Verified
                </span>
              </div>

              {measurements.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No biomarkers were extracted from this report.
                </div>
              ) : (
                <div className="divide-y divide-pink-50 dark:divide-slate-800">
                  {measurements.map(m => {
                    const paramDef = CLINICAL_PARAMETERS.find(p => p.code === m.parameterCode);
                    const colors = getStatusColor(m.status);
                    return (
                      <div
                        key={m.id}
                        className="p-3 flex items-center justify-between hover:bg-pink-50/30 dark:hover:bg-slate-800/40"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">
                            {language === 'hi' ? paramDef?.nameHi : paramDef?.nameEn || m.parameterCode}
                          </div>
                          {paramDef && (
                            <div className="text-[10px] text-slate-400">
                              Normal: {paramDef.minNormal} - {paramDef.maxNormal} {paramDef.unit}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {m.value} <span className="text-xs font-normal text-slate-500">{m.unit}</span>
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${colors.badge}`}>
                            {language === 'hi' ? colors.labelHi : colors.labelEn}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Document In-App Mock Preview */}
            <div className="rounded-2xl border border-pink-100 bg-[#FDF8F9] dark:border-slate-800 dark:bg-slate-950 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Document Preview (Encrypted AES-256 Vault)
                </span>
                <span className="text-[10px] text-rose-600 dark:text-pink-400 font-mono">
                  SHA256: 7f8b9a2c...
                </span>
              </div>
              <div className="h-44 rounded-xl border border-pink-100 bg-white dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center justify-center text-center p-4 shadow-inner">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-rose-600 dark:bg-pink-950 dark:text-pink-400 mb-2 border border-pink-100">
                  <Eye className="h-6 w-6" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {report.files[0]?.fileName || 'Report Document'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 max-w-sm">
                  Clinical watermarked viewer with short-lived authenticated access tokens.
                </div>
              </div>
            </div>

            {/* Doctor Share Drawer */}
            {shareDrawerOpen && (
              <div className="rounded-2xl border border-pink-200 bg-pink-50/70 p-4 dark:border-pink-900/60 dark:bg-pink-950/40 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-rose-900 dark:text-pink-200 flex items-center gap-1.5">
                    <Share2 className="h-4 w-4" />
                    {t.shareModal.title}
                  </h4>
                  <button
                    onClick={() => setShareDrawerOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {!createdShareUrl ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {t.shareModal.expiry}
                        </label>
                        <select
                          value={expiryHours}
                          onChange={e => setExpiryHours(Number(e.target.value))}
                          className="w-full rounded-xl border border-pink-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          <option value={1}>{t.shareModal.expiry1h}</option>
                          <option value={24}>{t.shareModal.expiry24h}</option>
                          <option value={168}>{t.shareModal.expiry7d}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {t.shareModal.passcodeProtect}
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={passcode}
                          onChange={e => setPasscode(e.target.value)}
                          placeholder="e.g. 4821"
                          className="w-full rounded-xl border border-pink-200 bg-white px-2.5 py-1.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateShare}
                      className="w-full rounded-xl bg-rose-600 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
                    >
                      {t.shareModal.generateLink}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={createdShareUrl}
                        className="w-full rounded-xl border border-pink-200 bg-white px-3 py-1.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <button
                        onClick={handleCopy}
                        className="shrink-0 flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                      >
                        {copied ? <Check className="h-3.5 w-3.5" /> : t.shareModal.copyLink}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Doctor Passcode: <strong className="font-mono text-rose-700 dark:text-pink-300">{passcode || 'None'}</strong></span>
                      <button
                        onClick={handleRevokeShare}
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        {t.shareModal.revokeNow}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 border-t border-pink-50 dark:border-slate-800 pt-4 flex items-center justify-between">
          <button
            onClick={handleSoftDelete}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
          >
            <Trash2 className="h-4 w-4" />
            {t.vault.softDelete}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShareDrawerOpen(!shareDrawerOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-pink-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Share2 className="h-4 w-4 text-rose-600" />
              {t.vault.shareDoctor}
            </button>
            <button
              onClick={() => setSelectedReportForDetail(null)}
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
