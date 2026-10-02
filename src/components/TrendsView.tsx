'use client';

import React, { useState, useMemo } from 'react';
import { useMedVault } from '@/lib/context';
import { storage } from '@/lib/storage';
import { CLINICAL_PARAMETERS, getStatusColor, evaluateBiomarkerStatus } from '@/lib/referenceRanges';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertCircle,
  Download,
  Info,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TrendsView: React.FC = () => {
  const { activeProfile, t, language } = useMedVault();

  const [selectedCode, setSelectedCode] = useState<string>('hba1c');
  const [dateRangeFilter, setDateRangeFilter] = useState<'all' | '1y' | '6m'>('all');
  const [compareBaseline, setCompareBaseline] = useState<boolean>(true);

  const measurements = storage.getMeasurements(activeProfile.id);

  // Group measurements by parameter code
  const measurementsByParam = useMemo(() => {
    const map: Record<string, typeof measurements> = {};
    measurements.forEach(m => {
      if (!map[m.parameterCode]) map[m.parameterCode] = [];
      map[m.parameterCode].push(m);
    });
    return map;
  }, [measurements]);

  const activeParam = CLINICAL_PARAMETERS.find(p => p.code === selectedCode) || CLINICAL_PARAMETERS[0];
  const activeSeries = (measurementsByParam[selectedCode] || []).sort(
    (a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime()
  );

  const latestVal = activeSeries[activeSeries.length - 1];
  const firstVal = activeSeries[0];
  const diffFromFirst = latestVal && firstVal && latestVal !== firstVal
    ? Number((latestVal.value - firstVal.value).toFixed(1))
    : null;

  // Chart coordinate calculations
  const chartHeight = 220;
  const chartWidth = 600;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };

  const values = activeSeries.map(s => s.value);
  const minVal = Math.min(activeParam.minNormal * 0.8, ...values, 0);
  const maxVal = Math.max(activeParam.maxNormal * 1.25, ...values);

  const getY = (val: number) => {
    const range = maxVal - minVal || 1;
    const norm = (val - minVal) / range;
    return chartHeight - padding.bottom - norm * (chartHeight - padding.top - padding.bottom);
  };

  const getX = (idx: number, total: number) => {
    if (total <= 1) return padding.left + (chartWidth - padding.left - padding.right) / 2;
    const step = (chartWidth - padding.left - padding.right) / (total - 1);
    return padding.left + idx * step;
  };

  const normalTopY = getY(activeParam.maxNormal);
  const normalBottomY = getY(activeParam.minNormal);
  const normalBandHeight = Math.max(normalBottomY - normalTopY, 2);

  // Generate SVG path points
  const points = activeSeries.map((s, idx) => ({
    x: getX(idx, activeSeries.length),
    y: getY(s.value),
    item: s
  }));

  const linePathD = points.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
    ''
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.nav.trends}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Longitudinal biomarker tracking with shaded normal clinical reference bands.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 shadow-sm"
        >
          <Download className="h-4 w-4 text-teal-600" />
          <span>Export Health Summary (PDF)</span>
        </button>
      </div>

      {/* Parameter Selection Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CLINICAL_PARAMETERS.filter(p => measurementsByParam[p.code]?.length).map(param => (
          <button
            key={param.code}
            onClick={() => setSelectedCode(param.code)}
            className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
              selectedCode === param.code
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {language === 'hi' ? param.nameHi.split('(')[0] : param.nameEn.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Main Chart Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
        {/* Metric Header & Change */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? activeParam.nameHi : activeParam.nameEn}
              </h2>
              {latestVal && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    getStatusColor(latestVal.status).badge
                  }`}
                >
                  {language === 'hi'
                    ? getStatusColor(latestVal.status).labelHi
                    : getStatusColor(latestVal.status).labelEn}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              {language === 'hi' ? activeParam.descriptionHi : activeParam.descriptionEn}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {latestVal ? latestVal.value : '--'}{' '}
              <span className="text-sm font-semibold text-slate-400">{activeParam.unit}</span>
            </div>
            {diffFromFirst !== null && (
              <div
                className={`mt-0.5 flex items-center justify-end gap-1 text-xs font-semibold ${
                  diffFromFirst < 0 ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {diffFromFirst < 0 ? (
                  <TrendingDown className="h-3.5 w-3.5" />
                ) : (
                  <TrendingUp className="h-3.5 w-3.5" />
                )}
                <span>
                  {diffFromFirst > 0 ? `+${diffFromFirst}` : diffFromFirst} {activeParam.unit} since{' '}
                  {new Date(firstVal.measuredAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SVG Longitudinal Chart */}
        {activeSeries.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400">
            No readings recorded yet for {activeParam.nameEn}.
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full max-w-full h-auto select-none overflow-visible"
            >
              {/* Shaded Normal Reference Zone */}
              <rect
                x={padding.left}
                y={normalTopY}
                width={chartWidth - padding.left - padding.right}
                height={normalBandHeight}
                className="fill-emerald-500/10 dark:fill-emerald-500/15"
              />
              <line
                x1={padding.left}
                y1={normalTopY}
                x2={chartWidth - padding.right}
                y2={normalTopY}
                className="stroke-emerald-500/40"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={chartWidth - padding.right + 6}
                y={normalTopY + 4}
                className="fill-emerald-600 dark:fill-emerald-400 text-[9px] font-bold"
              >
                Max: {activeParam.maxNormal}
              </text>

              <line
                x1={padding.left}
                y1={normalBottomY}
                x2={chartWidth - padding.right}
                y2={normalBottomY}
                className="stroke-emerald-500/40"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={chartWidth - padding.right + 6}
                y={normalBottomY + 4}
                className="fill-emerald-600 dark:fill-emerald-400 text-[9px] font-bold"
              >
                Min: {activeParam.minNormal}
              </text>

              {/* Data Trend Line */}
              {points.length > 1 && (
                <path
                  d={linePathD}
                  fill="none"
                  className="stroke-teal-600 dark:stroke-teal-400"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data Points */}
              {points.map((pt, idx) => {
                const colors = getStatusColor(pt.item.status);
                return (
                  <g key={idx}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      className="fill-white dark:fill-slate-900 stroke-teal-600 dark:stroke-teal-400 stroke-[3]"
                    />
                    {/* Value Badge on top */}
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      className="fill-slate-900 dark:fill-white text-[11px] font-bold"
                    >
                      {pt.item.value}
                    </text>
                    {/* Date label at bottom */}
                    <text
                      x={pt.x}
                      y={chartHeight - 12}
                      textAnchor="middle"
                      className="fill-slate-400 text-[10px] font-medium"
                    >
                      {new Date(pt.item.measuredAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-6 rounded bg-emerald-500/20 border border-emerald-500/40 inline-block" />
                  <span>Normal Reference Zone ({activeParam.minNormal} - {activeParam.maxNormal} {activeParam.unit})</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-teal-600 inline-block" />
                  <span>Recorded Values</span>
                </span>
              </div>

              <span>Showing {activeSeries.length} historical readings</span>
            </div>
          </div>
        )}
      </div>

      {/* Date Comparison Panel: Baseline vs Latest */}
      {firstVal && latestVal && firstVal !== latestVal && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-teal-600" />
            Biomarker Comparison: Baseline vs Latest
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-850">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Baseline (Initial Record)
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                {firstVal.value} {firstVal.unit}
              </div>
              <div className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(firstVal.measuredAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-4 dark:border-teal-900/50 dark:bg-teal-950/30">
              <div className="text-[11px] font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                Latest (Current Report)
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                {latestVal.value} {latestVal.unit}
              </div>
              <div className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(latestVal.measuredAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
