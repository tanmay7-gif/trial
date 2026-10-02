'use client';

import React from 'react';
import { useMedVault } from '@/lib/context';
import { storage } from '@/lib/storage';
import { X, Trash2, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

interface TrashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrashModal: React.FC<TrashModalProps> = ({ isOpen, onClose }) => {
  const { trashReports, refreshData, t } = useMedVault();

  if (!isOpen) return null;

  const handleRestore = (id: string) => {
    storage.restoreReport(id);
    refreshData();
  };

  const handlePermanentDelete = (id: string) => {
    if (confirm('Permanently delete this report? This cannot be undone and will purge all linked biomarkers.')) {
      storage.permanentDeleteReport(id);
      refreshData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-pink-50 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-rose-600 dark:bg-pink-950/60 dark:text-pink-400 border border-pink-100">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.nav.trash} ({trashReports.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.vault.deletedNotice}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-pink-50 hover:text-rose-700 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto">
          {trashReports.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-slate-400 dark:bg-slate-800 mb-2 border border-pink-100">
                <Trash2 className="h-6 w-6" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Trash is empty. No deleted reports found.
              </p>
            </div>
          ) : (
            trashReports.map(rep => (
              <div
                key={rep.id}
                className="flex items-center justify-between rounded-2xl border border-pink-100 p-3.5 dark:border-slate-800 bg-[#FDF8F9] dark:bg-slate-850"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {rep.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {rep.reportDate} • {rep.files.length} file(s)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRestore(rep.id)}
                    className="flex items-center gap-1 rounded-xl bg-white border border-pink-200 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-pink-50 dark:bg-pink-950 dark:text-pink-300"
                    title={t.vault.restore}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{t.vault.restore}</span>
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(rep.id)}
                    className="flex items-center gap-1 rounded-xl bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300"
                    title={t.vault.permanentDelete}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
