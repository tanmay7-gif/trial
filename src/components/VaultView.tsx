'use client';

import React, { useState, useMemo } from 'react';
import { useMedVault } from '@/lib/context';
import { Report, ReportCategory } from '@/lib/types';
import { storage } from '@/lib/storage';
import { CLINICAL_PARAMETERS, getStatusColor } from '@/lib/referenceRanges';
import {
  Search,
  Filter,
  FileText,
  Calendar,
  User,
  Building2,
  Share2,
  Trash2,
  Eye,
  Plus,
  ArrowUpDown,
  Tag,
  CheckCircle2,
  Upload
} from 'lucide-react';

export const VaultView: React.FC = () => {
  const {
    reports,
    activeProfile,
    setSelectedReportForDetail,
    setUploadModalOpen,
    t,
    language
  } = useMedVault();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: t.vault.allTypes },
    { key: 'blood_test', label: 'Blood Test' },
    { key: 'diabetes', label: 'Diabetes' },
    { key: 'lipid', label: 'Lipid Profile' },
    { key: 'thyroid', label: 'Thyroid' },
    { key: 'prescription', label: 'Prescription' },
    { key: 'xray', label: 'Scans & X-Ray' }
  ];

  const filteredReports = useMemo(() => {
    return reports
      .filter(r => {
        const matchesCategory =
          selectedCategory === 'all' ? true : r.reportType === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          r.title.toLowerCase().includes(q) ||
          r.doctorName?.toLowerCase().includes(q) ||
          r.labName?.toLowerCase().includes(q) ||
          r.tags?.some(tag => tag.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const timeA = new Date(a.reportDate).getTime();
        const timeB = new Date(b.reportDate).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [reports, selectedCategory, searchQuery, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.vault.allReports}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Displaying medical records filed for{' '}
            <strong className="text-rose-600 dark:text-pink-400 font-semibold">
              {activeProfile.name}
            </strong>{' '}
            ({activeProfile.relation})
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-pink-500/25 hover:from-rose-600 hover:to-pink-700 active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>{t.vault.uploadNew}</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.vault.searchPlaceholder}
            className="w-full rounded-2xl border border-pink-100 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:border-rose-500 focus:outline-none shadow-xs"
          />
        </div>

        {/* Sort & View Modes */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-1.5 rounded-2xl border border-pink-100 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-pink-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 shadow-xs"
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-rose-600" />
            <span>{sortOrder === 'desc' ? t.vault.newestFirst : t.vault.oldestFirst}</span>
          </button>

          <div className="flex rounded-2xl border border-pink-100 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 shadow-xs text-xs font-medium">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-xl px-3 py-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-pink-50 text-rose-900 font-bold dark:bg-pink-950 dark:text-pink-200'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`rounded-xl px-3 py-1.5 transition-all ${
                viewMode === 'timeline'
                  ? 'bg-pink-50 text-rose-900 font-bold dark:bg-pink-950 dark:text-pink-200'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Timeline
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(c => (
          <button
            key={c.key}
            onClick={() => setSelectedCategory(c.key)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === c.key
                ? 'bg-rose-600 text-white shadow-sm shadow-pink-500/25'
                : 'border border-pink-100 bg-white text-slate-600 hover:bg-pink-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Reports Listing */}
      {filteredReports.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl border-2 border-dashed border-pink-200/80 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-50 text-rose-600 dark:bg-pink-950/60 dark:text-pink-400 mb-3 border border-pink-100">
            <Upload className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.vault.emptyTitle}
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400">
            {t.vault.emptySubtitle}
          </p>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-pink-500/20 hover:bg-rose-700"
          >
            <Plus className="h-4 w-4" />
            {t.vault.uploadCta}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map(report => {
            const measurements = storage
              .getMeasurements(activeProfile.id)
              .filter(m => m.reportId === report.id);

            return (
              <div
                key={report.id}
                onClick={() => setSelectedReportForDetail(report)}
                className="group cursor-pointer rounded-3xl border border-pink-100/90 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-pink-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200/80 dark:border-pink-800 capitalize">
                      {report.reportType.replace(/_/g, ' ')}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Calendar className="h-3 w-3" />
                      {new Date(report.reportDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-pink-400 transition-colors line-clamp-2">
                    {report.title}
                  </h3>

                  {/* Doctor & Lab */}
                  <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    {report.doctorName && (
                      <div className="flex items-center gap-1.5 truncate">
                        <User className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{report.doctorName}</span>
                      </div>
                    )}
                    {report.labName && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Building2 className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{report.labName}</span>
                      </div>
                    )}
                  </div>

                  {/* Extracted Biomarkers Pills */}
                  {measurements.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-pink-50 dark:border-slate-800">
                      <div className="text-[10px] font-semibold text-slate-400 mb-1.5">
                        Extracted Biomarkers ({measurements.length})
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {measurements.slice(0, 3).map(m => {
                          const colors = getStatusColor(m.status);
                          return (
                            <span
                              key={m.id}
                              className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${colors.badge}`}
                            >
                              {m.parameterCode.toUpperCase()}: {m.value}
                            </span>
                          );
                        })}
                        {measurements.length > 3 && (
                          <span className="rounded-lg bg-pink-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-slate-800 dark:text-slate-400">
                            +{measurements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-pink-50 dark:border-slate-800 flex items-center justify-between text-xs text-rose-600 dark:text-pink-400 font-semibold">
                  <span className="flex items-center gap-1 text-slate-500">
                    <FileText className="h-3.5 w-3.5 text-rose-500" />
                    {report.files.length} file(s)
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-rose-600">
                    {t.vault.viewReport} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Timeline View */
        <div className="relative border-l-2 border-pink-200 dark:border-pink-900 ml-4 space-y-6 py-2">
          {filteredReports.map(report => (
            <div
              key={report.id}
              onClick={() => setSelectedReportForDetail(report)}
              className="group cursor-pointer relative pl-6 transition-all"
            >
              {/* Timeline Bullet */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-rose-500 bg-white dark:bg-slate-900 group-hover:scale-125 transition-transform shadow-xs" />

              <div className="rounded-3xl border border-pink-100/90 bg-white p-4 shadow-xs hover:border-pink-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-700 dark:text-pink-300">
                    {new Date(report.reportDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-slate-800 dark:text-slate-300 uppercase border border-pink-100">
                    {report.reportType.replace(/_/g, ' ')}
                  </span>
                </div>
                <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                  {report.title}
                </h4>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                  {report.doctorName && <span>Dr: {report.doctorName}</span>}
                  {report.labName && <span>Lab: {report.labName}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
