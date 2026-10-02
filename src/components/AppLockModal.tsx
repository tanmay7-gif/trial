'use client';

import React, { useState } from 'react';
import { useMedVault } from '@/lib/context';
import { Lock, Fingerprint, Delete, ShieldAlert } from 'lucide-react';

export const AppLockModal: React.FC = () => {
  const { user, unlockVault, unlockWithBiometrics, t } = useMedVault();
  const [pin, setPin] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!user.isLocked) return null;

  const handleDigitClick = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        verify(nextPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setErrorMessage('');
  };

  const verify = (inputPin: string) => {
    const success = unlockVault(inputPin);
    if (!success) {
      setErrorShake(true);
      setErrorMessage(t.appLock.wrongPin);
      setTimeout(() => {
        setErrorShake(false);
        setPin('');
      }, 600);
    }
  };

  const handleBiometricClick = () => {
    unlockWithBiometrics();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4">
      <div
        className={`w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl text-center transition-all ${
          errorShake ? 'animate-shake' : ''
        }`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4 shadow-inner">
          <Lock className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">
          {t.appName} {t.nav.appLock}
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          {t.appLock.enterPin}
        </p>

        {/* PIN Indicators */}
        <div className="flex justify-center gap-4 my-8">
          {[0, 1, 2, 3].map(idx => (
            <div
              key={idx}
              className={`h-4 w-4 rounded-full transition-all duration-200 ${
                pin.length > idx
                  ? 'bg-rose-500 scale-110 shadow-lg shadow-rose-500/50'
                  : 'border-2 border-slate-700 bg-slate-800'
              }`}
            />
          ))}
        </div>

        {errorMessage && (
          <div className="mb-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-400 animate-in fade-in">
            <ShieldAlert className="h-4 w-4" />
            {errorMessage}
          </div>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-[260px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button
              key={num}
              onClick={() => handleDigitClick(num)}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 text-xl font-bold text-white hover:bg-slate-700 active:scale-95 transition-all border border-slate-700/50 shadow-xs"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleBiometricClick}
            title={t.appLock.unlockWithBiometrics}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-950/60 text-rose-400 hover:bg-rose-900/60 active:scale-95 transition-all border border-rose-800/40"
          >
            <Fingerprint className="h-6 w-6" />
          </button>
          <button
            onClick={() => handleDigitClick('0')}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 text-xl font-bold text-white hover:bg-slate-700 active:scale-95 transition-all border border-slate-700/50 shadow-xs"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            title="Delete"
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white active:scale-95 transition-all border border-slate-700/50"
          >
            <Delete className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 text-[11px] text-slate-500">
          Default Test PIN: <span className="font-mono text-rose-400 font-bold">1234</span> or click Touch ID
        </div>
      </div>
    </div>
  );
};
