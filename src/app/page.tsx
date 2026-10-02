'use client';

import React, { useState } from 'react';
import { MedVaultProvider, useMedVault } from '@/lib/context';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { DashboardView } from '@/components/DashboardView';
import { VaultView } from '@/components/VaultView';
import { TrendsView } from '@/components/TrendsView';
import { DietPlanView } from '@/components/DietPlanView';
import { RemindersView } from '@/components/RemindersView';
import { SettingsView } from '@/components/SettingsView';
import { AppLockModal } from '@/components/AppLockModal';
import { ProfileModal } from '@/components/ProfileModal';
import { TrashModal } from '@/components/TrashModal';
import { ReportUploadModal } from '@/components/ReportUploadModal';
import { ReportDetailModal } from '@/components/ReportDetailModal';

function MedVaultMain() {
  const { activeTab } = useMedVault();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 pb-24 transition-colors">
      {/* Top Navigation */}
      <Navbar
        onOpenProfileModal={() => setProfileModalOpen(true)}
        onOpenTrashModal={() => setTrashModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'vault' && <VaultView />}
        {activeTab === 'trends' && <TrendsView />}
        {activeTab === 'diet' && <DietPlanView />}
        {activeTab === 'reminders' && <RemindersView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Mobile-First Bottom Tab Bar */}
      <BottomNav />

      {/* Modals & Overlay Drawers */}
      <AppLockModal />
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
      <TrashModal
        isOpen={trashModalOpen}
        onClose={() => setTrashModalOpen(false)}
      />
      <ReportUploadModal />
      <ReportDetailModal />
    </div>
  );
}

export default function Page() {
  return (
    <MedVaultProvider>
      <MedVaultMain />
    </MedVaultProvider>
  );
}
