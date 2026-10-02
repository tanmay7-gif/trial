'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Report, SupportedLanguage } from './types';
import { storage } from './storage';
import { TRANSLATIONS } from './translations';

interface UserState {
  id: string;
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
  hasAppLock: boolean;
  appLockPin: string;
  isLocked: boolean;
}

interface MedVaultContextType {
  user: UserState;
  profiles: UserProfile[];
  activeProfile: UserProfile;
  language: SupportedLanguage;
  t: typeof TRANSLATIONS.en;
  setLanguage: (lang: SupportedLanguage) => void;
  setActiveProfileId: (id: string) => void;
  addProfile: (profile: Omit<UserProfile, 'id' | 'createdAt'>) => void;
  reports: Report[];
  trashReports: Report[];
  refreshData: () => void;
  unlockVault: (pin: string) => boolean;
  unlockWithBiometrics: () => boolean;
  lockVault: () => void;
  setAppLockPin: (pin: string) => void;
  disableAppLock: () => void;
  login: (identifier: string) => void;
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  uploadModalOpen: boolean;
  setUploadModalOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  selectedReportForDetail: Report | null;
  setSelectedReportForDetail: (report: Report | null) => void;
}

const MedVaultContext = createContext<MedVaultContextType | undefined>(undefined);

export const MedVaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>({
    id: 'user-primary',
    name: 'Ramesh Sharma',
    phone: '+91 98101 23456',
    email: 'ramesh.sharma@example.com',
    isLoggedIn: true,
    hasAppLock: false,
    appLockPin: '1234',
    isLocked: false
  });

  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string>('prof-ramesh');
  const [reports, setReports] = useState<Report[]>([]);
  const [trashReports, setTrashReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedReportForDetail, setSelectedReportForDetail] = useState<Report | null>(null);

  // Load Initial State
  const refreshData = () => {
    const profs = storage.getProfiles();
    setProfiles(profs);
    const regular = storage.getReports(activeProfileId, false);
    const deleted = storage.getReports(activeProfileId, true).filter(r => r.isDeleted);
    setReports(regular);
    setTrashReports(deleted);
  };

  useEffect(() => {
    refreshData();
  }, [activeProfileId]);

  // Set Language
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('medvault_lang', lang);
    }
  };

  // Switch Active Family Member
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0] || {
    id: 'prof-ramesh',
    userId: 'user-primary',
    name: 'Ramesh Sharma',
    relation: 'self',
    dateOfBirth: '1972-04-12',
    gender: 'male',
    bloodGroup: 'B+',
    isPrimary: true,
    createdAt: new Date().toISOString()
  };

  const addProfile = (newProf: Omit<UserProfile, 'id' | 'createdAt'>) => {
    const created = storage.addProfile(newProf);
    setProfiles(storage.getProfiles());
    setActiveProfileId(created.id);
  };

  // App Lock Controls
  const unlockVault = (pin: string) => {
    if (pin === user.appLockPin) {
      setUser(prev => ({ ...prev, isLocked: false }));
      return true;
    }
    return false;
  };

  const unlockWithBiometrics = () => {
    setUser(prev => ({ ...prev, isLocked: false }));
    return true;
  };

  const lockVault = () => {
    if (user.hasAppLock) {
      setUser(prev => ({ ...prev, isLocked: true }));
    }
  };

  const setAppLockPin = (pin: string) => {
    setUser(prev => ({
      ...prev,
      hasAppLock: true,
      appLockPin: pin,
      isLocked: false
    }));
  };

  const disableAppLock = () => {
    setUser(prev => ({
      ...prev,
      hasAppLock: false,
      isLocked: false
    }));
  };

  const login = (identifier: string) => {
    const isEmail = identifier.includes('@');
    setUser(prev => ({
      ...prev,
      isLoggedIn: true,
      email: isEmail ? identifier : prev.email,
      phone: !isEmail ? identifier : prev.phone,
      isLocked: prev.hasAppLock
    }));
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false, isLocked: false }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  };

  const t = TRANSLATIONS[language];

  return (
    <MedVaultContext.Provider
      value={{
        user,
        profiles,
        activeProfile,
        language,
        t,
        setLanguage,
        setActiveProfileId,
        addProfile,
        reports,
        trashReports,
        refreshData,
        unlockVault,
        unlockWithBiometrics,
        lockVault,
        setAppLockPin,
        disableAppLock,
        login,
        logout,
        activeTab,
        setActiveTab,
        uploadModalOpen,
        setUploadModalOpen,
        isDarkMode,
        toggleDarkMode,
        selectedReportForDetail,
        setSelectedReportForDetail
      }}
    >
      {children}
    </MedVaultContext.Provider>
  );
};

export const useMedVault = () => {
  const context = useContext(MedVaultContext);
  if (!context) {
    throw new Error('useMedVault must be used within a MedVaultProvider');
  }
  return context;
};
