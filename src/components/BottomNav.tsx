'use client';

import React from 'react';
import { useMedVault } from '@/lib/context';
import {
  LayoutDashboard,
  FolderArchive,
  TrendingUp,
  Utensils,
  Bell,
  ShieldCheck
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useMedVault();

  const tabs = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'vault', label: t.nav.vault, icon: FolderArchive },
    { id: 'trends', label: t.nav.trends, icon: TrendingUp },
    { id: 'diet', label: t.nav.diet, icon: Utensils },
    { id: 'reminders', label: t.nav.reminders, icon: Bell },
    { id: 'settings', label: t.nav.settings, icon: ShieldCheck }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-lg px-2 py-2 dark:border-slate-800 dark:bg-slate-900/95 transition-colors">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 transition-all ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
