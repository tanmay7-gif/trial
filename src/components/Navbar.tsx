'use client';

import React, { useState } from 'react';
import { useMedVault } from '@/lib/context';
import {
  ShieldCheck,
  User,
  Plus,
  Lock,
  Unlock,
  Sun,
  Moon,
  Upload,
  Globe,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface NavbarProps {
  onOpenProfileModal: () => void;
  onOpenTrashModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProfileModal,
  onOpenTrashModal,
  onOpenAuthModal
}) => {
  const {
    activeProfile,
    profiles,
    setActiveProfileId,
    language,
    setLanguage,
    t,
    user,
    lockVault,
    setAppLockPin,
    disableAppLock,
    isDarkMode,
    toggleDarkMode,
    setUploadModalOpen,
    activeTab,
    setActiveTab,
    trashReports
  } = useMedVault();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [pinPromptOpen, setPinPromptOpen] = useState(false);
  const [newPin, setNewPin] = useState('');

  const handleSetupPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4) {
      setAppLockPin(newPin);
      setPinPromptOpen(false);
      setNewPin('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-100/90 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors shadow-[0_1px_3px_rgba(244,114,182,0.05)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {t.appName}
                </span>
                <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-pink-950/70 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                  DPDP Ready
                </span>
              </div>
              <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                {t.tagline}
              </p>
            </div>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Profile Switcher */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 rounded-xl border border-pink-100 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-pink-50/50 hover:border-pink-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/60 transition-all shadow-xs"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white uppercase shadow-xs">
                {activeProfile.name.charAt(0)}
              </div>
              <span className="hidden sm:inline max-w-[120px] truncate">{activeProfile.name}</span>
              <span className="text-[11px] rounded-md bg-pink-50 px-1.5 py-0.5 font-medium text-rose-700 dark:bg-slate-700 dark:text-slate-300">
                {activeProfile.relation}
              </span>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-pink-100 bg-white p-2 shadow-xl shadow-pink-950/5 dark:border-slate-800 dark:bg-slate-900 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {t.profiles.familyMembers}
                </div>
                {profiles.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveProfileId(p.id);
                      setProfileDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                      p.id === activeProfile.id
                        ? 'bg-pink-50 text-rose-900 font-semibold dark:bg-pink-950/60 dark:text-pink-200'
                        : 'text-slate-700 hover:bg-pink-50/40 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-xs font-semibold text-rose-700 dark:bg-slate-700 dark:text-slate-200">
                        {p.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-[11px] text-slate-500 capitalize">{p.relation} • {p.bloodGroup || 'Blood Type N/A'}</div>
                      </div>
                    </div>
                    {p.id === activeProfile.id && (
                      <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    )}
                  </button>
                ))}
                <div className="my-1 border-t border-pink-100 dark:border-slate-800"></div>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onOpenProfileModal();
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-950/40"
                >
                  <Plus className="h-4 w-4" />
                  {t.profiles.addNew}
                </button>
              </div>
            )}
          </div>

          {/* Language Toggle (EN / HI) */}
          <div className="flex items-center rounded-xl border border-pink-100 bg-pink-50/50 p-0.5 dark:border-slate-800 dark:bg-slate-800 text-xs font-medium">
            <button
              onClick={() => setLanguage('en')}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                language === 'en'
                  ? 'bg-white text-rose-600 shadow-sm dark:bg-slate-700 dark:text-white font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                language === 'hi'
                  ? 'bg-white text-rose-600 shadow-sm dark:bg-slate-700 dark:text-white font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* App-Lock Button */}
          <div className="relative">
            {user.hasAppLock ? (
              <button
                onClick={lockVault}
                title={t.appLock.lockNow}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-200 bg-pink-50 text-rose-600 hover:bg-pink-100 dark:border-pink-900/60 dark:bg-pink-950/50 dark:text-pink-300 transition-colors shadow-xs"
              >
                <Lock className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setPinPromptOpen(true)}
                title={t.appLock.enableLock}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-100 bg-white text-slate-500 hover:bg-pink-50/50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 transition-colors"
              >
                <Unlock className="h-4 w-4" />
              </button>
            )}

            {pinPromptOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-pink-100 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t.appLock.setupPin}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.appLock.subtext}
                </p>
                <form onSubmit={handleSetupPin} className="mt-3 space-y-3">
                  <input
                    type="password"
                    maxLength={4}
                    value={newPin}
                    onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="4-digit PIN"
                    className="w-full rounded-xl border border-pink-200 bg-pink-50/30 px-3 py-2 text-center text-lg font-bold tracking-widest text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={newPin.length !== 4}
                      className="w-full rounded-xl bg-rose-600 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50 shadow-xs"
                    >
                      Save PIN
                    </button>
                    <button
                      type="button"
                      onClick={() => setPinPromptOpen(false)}
                      className="w-full rounded-xl border border-pink-200 py-1.5 text-xs font-medium text-slate-600 hover:bg-pink-50 dark:border-slate-700 dark:text-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            title="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-100 bg-white text-slate-600 hover:bg-pink-50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Trash Recovery Indicator */}
          {trashReports.length > 0 && (
            <button
              onClick={onOpenTrashModal}
              title={t.nav.trash}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
            >
              <Trash2 className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                {trashReports.length}
              </span>
            </button>
          )}

          {/* Upload Report CTA Button */}
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-3.5 py-2 text-sm font-semibold text-white shadow-md shadow-pink-500/25 hover:from-rose-600 hover:to-pink-700 active:scale-95 transition-all"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">{t.nav.upload}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
