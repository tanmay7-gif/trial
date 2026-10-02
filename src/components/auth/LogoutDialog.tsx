'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMedVault } from '@/lib/context';
import { LogOut, X, ShieldAlert, Lock } from 'lucide-react';

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { logout, activeProfile } = useMedVault();

  if (!isOpen) return null;

  const handleConfirmLogout = () => {
    logout();
    onClose();
    router.push('/logout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-rose-600 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-100 dark:border-pink-900/40">
            <LogOut className="h-6 w-6" />
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-xl p-1.5 text-slate-400 hover:bg-pink-50 hover:text-rose-600 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h2
            id="logout-dialog-title"
            className="text-lg font-bold text-slate-900 dark:text-white"
          >
            Sign Out of MedVault?
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your active session for <strong className="text-slate-700 dark:text-slate-200">{activeProfile.name}</strong> will be ended. All encrypted health records, diagnostic files, and biomarker trends will be securely locked on this device.
          </p>

          <div className="mt-4 rounded-2xl border border-pink-100 bg-[#FDF8F9] p-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-300 flex items-center gap-2">
            <Lock className="h-4 w-4 text-rose-600 shrink-0" />
            <span>DPDP Act 2023: Session tokens and client decryption keys will be cleared.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-pink-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-pink-500/20 hover:bg-rose-700 active:scale-95 transition-all"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
