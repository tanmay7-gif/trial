'use client';

import React, { useState } from 'react';
import { useMedVault } from '@/lib/context';
import { storage } from '@/lib/storage';
import { Reminder } from '@/lib/types';
import {
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Plus,
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const RemindersView: React.FC = () => {
  const { activeProfile, refreshData, t, language } = useMedVault();

  const [reminders, setReminders] = useState<Reminder[]>(() =>
    storage.getReminders(activeProfile.id)
  );

  const handleUpdateStatus = (id: string, status: 'done' | 'snoozed' | 'skipped') => {
    storage.updateReminderStatus(id, status);
    setReminders(storage.getReminders(activeProfile.id));
    refreshData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.nav.reminders}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Condition-aware check-in schedules for diagnostic tests and routine biomarker logging.
          </p>
        </div>

        <button
          onClick={() => alert('Custom reminder creator dialog')}
          className="flex items-center gap-1.5 rounded-2xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-teal-500/20 hover:bg-teal-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Custom Check-in</span>
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Bell className="mx-auto h-12 w-12 text-teal-600 mb-2" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              No Pending Reminders
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              All routine screenings and vitals checks are up to date!
            </p>
          </div>
        ) : (
          reminders.map(rem => (
            <div
              key={rem.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800 uppercase">
                    Every {rem.frequencyMonths} Month(s)
                  </span>
                  <span className="text-xs text-slate-400">
                    Status: <strong className="capitalize">{rem.status}</strong>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'hi' && rem.titleHi ? rem.titleHi : rem.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-300">
                    <Calendar className="h-3.5 w-3.5" />
                    Next Due: {rem.nextDueDate}
                  </span>
                  {rem.lastLoggedDate && (
                    <span>Last Recorded: {rem.lastLoggedDate}</span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Alerts via:</span>
                    {rem.notifyEmail && <Mail className="h-3.5 w-3.5 text-teal-600" title="Email alerts" />}
                    {rem.notifySmsWhatsapp && <MessageSquare className="h-3.5 w-3.5 text-emerald-600" title="WhatsApp/SMS alerts" />}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleUpdateStatus(rem.id, 'done')}
                  className="flex items-center gap-1.5 rounded-2xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 active:scale-95"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Mark as Done
                </button>
                <button
                  onClick={() => handleUpdateStatus(rem.id, 'snoozed')}
                  className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Snooze 1 Mo
                </button>
                <button
                  onClick={() => handleUpdateStatus(rem.id, 'skipped')}
                  className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-600 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Skip
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
