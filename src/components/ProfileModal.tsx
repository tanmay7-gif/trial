'use client';

import React, { useState } from 'react';
import { useMedVault } from '@/lib/context';
import { RelationType } from '@/lib/types';
import { X, UserPlus, Users, HeartPulse } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { addProfile, t } = useMedVault();

  const [name, setName] = useState('');
  const [relation, setRelation] = useState<RelationType>('spouse');
  const [dateOfBirth, setDateOfBirth] = useState('1985-05-15');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [bloodGroup, setBloodGroup] = useState('B+');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addProfile({
      userId: 'user-primary',
      name: name.trim(),
      relation,
      dateOfBirth,
      gender,
      bloodGroup,
      isPrimary: false
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-pink-50 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-rose-600 dark:bg-pink-950/60 dark:text-pink-400 border border-pink-100">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.profiles.addNew}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Organize tests and diet charts for your family
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.profiles.name} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Sunita Sharma"
              className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.profiles.relation}
              </label>
              <select
                value={relation}
                onChange={e => setRelation(e.target.value as RelationType)}
                className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none capitalize"
              >
                <option value="father">{t.profiles.father}</option>
                <option value="mother">{t.profiles.mother}</option>
                <option value="spouse">{t.profiles.spouse}</option>
                <option value="child">{t.profiles.child}</option>
                <option value="self">{t.profiles.self}</option>
                <option value="other">{t.profiles.other}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as any)}
                className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.profiles.dob}
              </label>
              <input
                type="date"
                required
                value={dateOfBirth}
                onChange={e => setDateOfBirth(e.target.value)}
                className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.profiles.bloodGroup}
              </label>
              <select
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-pink-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-pink-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-pink-500/20 hover:bg-rose-700"
            >
              {t.profiles.addNew}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
