'use client';

import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { LogoutDialog } from './LogoutDialog';

interface LogoutButtonProps {
  variant?: 'icon' | 'button' | 'dropdown-item';
  className?: string;
  showText?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'button',
  className = '',
  showText = true
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (variant === 'icon') {
    return (
      <>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          title="Sign Out"
          aria-label="Sign Out"
          className={`flex h-9 w-9 items-center justify-center rounded-xl border border-pink-100 bg-white text-slate-500 hover:bg-pink-50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-pink-300 transition-colors ${className}`}
        >
          <LogOut className="h-4 w-4" />
        </button>
        <LogoutDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
      </>
    );
  }

  if (variant === 'dropdown-item') {
    return (
      <>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-950/40 transition-colors ${className}`}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
        <LogoutDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className={`flex items-center gap-1.5 rounded-xl border border-pink-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-pink-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors ${className}`}
      >
        <LogOut className="h-3.5 w-3.5 text-rose-600" />
        {showText && <span>Sign Out</span>}
      </button>
      <LogoutDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};
