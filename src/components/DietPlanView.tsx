'use client';

import React, { useState } from 'react';
import { useMedVault } from '@/lib/context';
import { storage } from '@/lib/storage';
import {
  Utensils,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  ShoppingCart,
  Heart,
  ChevronRight,
  Flame,
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const DietPlanView: React.FC = () => {
  const { activeProfile, t, language } = useMedVault();

  const dietPlan = storage.getDietPlan(activeProfile.id);
  const dietProfile = storage.getDietProfile(activeProfile.id);
  const measurements = storage.getMeasurements(activeProfile.id);

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'meal_plan' | 'why_reasons' | 'grocery' | 'profile'>('meal_plan');
  const [safetyAcknowledged, setSafetyAcknowledged] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Safety Gate Check:
  // Flag if user has kidney disease (CKD), pregnancy, or critical lab values
  const hasKidneyOrCritical =
    dietProfile?.existingConditions?.includes('ckd') ||
    dietProfile?.existingConditions?.includes('pregnancy') ||
    measurements.some(m => m.status === 'critical');

  const handleRegeneratePlan = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      alert('Diet plan adjusted with latest biomarker parameters!');
    }, 1000);
  };

  if (hasKidneyOrCritical && !safetyAcknowledged) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-rose-300 bg-rose-50/90 p-8 shadow-xl text-center dark:border-rose-900 dark:bg-rose-950/40 my-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-300 mb-4">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-rose-950 dark:text-rose-100">
          Clinical Safety Gate Required
        </h2>
        <p className="mt-2 text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
          Due to complex diagnostic indicators (e.g. renal parameters, critical lab values, or specific conditions), automated diet planning must be reviewed alongside a certified nephrologist or clinical dietitian.
        </p>

        <div className="mt-6 rounded-2xl bg-white/80 p-4 text-xs text-left text-slate-700 dark:bg-slate-900/80 dark:text-slate-300 border border-rose-200 dark:border-rose-800">
          <strong>Mandatory Safety Disclaimer:</strong> MedVault provides supportive nutritional references only and never prescribes or replaces medical therapy.
        </div>

        <button
          onClick={() => setSafetyAcknowledged(true)}
          className="mt-6 w-full rounded-2xl bg-rose-600 py-3 text-xs font-bold text-white shadow-md hover:bg-rose-700 transition-all"
        >
          I have consulted my physician — Proceed to View Reference Guidance
        </button>
      </div>
    );
  }

  if (!dietPlan) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
        <Utensils className="mx-auto h-12 w-12 text-teal-600 mb-3" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No Diet Plan Configured
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Complete the health intake profile to generate a customized 7-day Indian meal plan based on your blood lab trends.
        </p>
      </div>
    );
  }

  const currentDay = dietPlan.days[activeDayIndex] || dietPlan.days[0];

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md mb-3 border border-white/10">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Biomarker-Linked Indian Dietary Advisory</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {dietPlan.title}
          </h1>

          {/* Calorie & Macro Target Strip */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200">
                <Flame className="h-3.5 w-3.5" />
                Target Energy
              </div>
              <div className="mt-1 text-xl font-black">
                {dietPlan.targetCalories}{' '}
                <span className="text-xs font-medium text-emerald-200">kcal/day</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10">
              <div className="text-xs text-emerald-200">Protein</div>
              <div className="mt-1 text-xl font-black">
                {dietPlan.targetProteinG}{' '}
                <span className="text-xs font-medium text-emerald-200">g</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10">
              <div className="text-xs text-emerald-200">Carbs (Low GI)</div>
              <div className="mt-1 text-xl font-black">
                {dietPlan.targetCarbsG}{' '}
                <span className="text-xs font-medium text-emerald-200">g</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10">
              <div className="text-xs text-emerald-200">Healthy Fats</div>
              <div className="mt-1 text-xl font-black">
                {dietPlan.targetFatsG}{' '}
                <span className="text-xs font-medium text-emerald-200">g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('meal_plan')}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'meal_plan'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            7-Day Meal Plan
          </button>
          <button
            onClick={() => setActiveTab('why_reasons')}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'why_reasons'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Info className="h-3.5 w-3.5" />
            <span>Why This Plan? ({dietPlan.rationales.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('grocery')}
            className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'grocery'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Grocery List</span>
          </button>
        </div>

        <button
          onClick={handleRegeneratePlan}
          disabled={isProcessingRegenerate()}
          className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Recalculate with New Labs</span>
        </button>
      </div>

      {/* TAB CONTENT: 7-DAY MEAL PLAN */}
      {activeTab === 'meal_plan' && (
        <div className="space-y-6">
          {/* Day Selector Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {dietPlan.days.map((day, idx) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(idx)}
                className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
                  activeDayIndex === idx
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {language === 'hi' ? day.dayNameHi : day.dayNameEn}
              </button>
            ))}
          </div>

          {/* Meals for Selected Day */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDay.meals.map((meal, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                      {meal.mealType}
                    </span>
                    <span className="font-semibold text-slate-500">
                      {meal.calories} kcal
                    </span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                    {language === 'hi' ? meal.nameHi : meal.nameEn}
                  </h3>

                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Portion: {meal.portion}
                  </div>

                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                    💡 <strong>Nutritional Note:</strong> {meal.notes}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span>P: {meal.proteinG}g • C: {meal.carbsG}g • F: {meal.fatsG}g</span>
                  <button
                    onClick={() => alert(`Swapping ${meal.nameEn} with healthy alternative...`)}
                    className="text-teal-600 font-semibold hover:underline"
                  >
                    Swap Meal ⇄
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Foods to Favor & Foods to Limit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Foods to Favor (अनुशंसित खाद्य पदार्थ)
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {(language === 'hi' ? dietPlan.foodsToFavorHi : dietPlan.foodsToFavorEn).map(
                  (f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-5 dark:border-rose-900/60 dark:bg-rose-950/20">
              <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-rose-600" />
                Foods to Strictly Limit (सीमित करने योग्य पदार्थ)
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {(language === 'hi' ? dietPlan.foodsToLimitHi : dietPlan.foodsToLimitEn).map(
                  (f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: WHY WAS THIS PLAN GENERATED? */}
      {activeTab === 'why_reasons' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-4 dark:border-teal-900/60 dark:bg-teal-950/30 text-xs text-slate-700 dark:text-slate-300">
            <strong>Evidence-Based Linkage:</strong> Every ingredient and portion adjustment in your meal plan is linked directly to your physiological lab biomarkers.
          </div>

          <div className="grid grid-cols-1 gap-4">
            {dietPlan.rationales.map((rat, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {rat.biomarkerName}
                    </span>
                    <span className="rounded-full bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-bold dark:bg-rose-950 dark:text-rose-200 uppercase">
                      {rat.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Parameter: {rat.parameterCode}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Clinical Rationale:</strong>{' '}
                  {language === 'hi' ? rat.clinicalReasonHi : rat.clinicalReasonEn}
                </div>

                <div className="rounded-2xl bg-teal-50/80 p-3 dark:bg-teal-950/40 text-xs text-teal-950 dark:text-teal-200 border border-teal-100 dark:border-teal-900">
                  <strong>Plan Action Taken:</strong>{' '}
                  {language === 'hi' ? rat.actionTakenHi : rat.actionTakenEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: GROCERY LIST */}
      {activeTab === 'grocery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Weekly Indian Grocery List (साप्ताहिक किराना सूची)
            </h3>
            <button
              onClick={() => window.print()}
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
            >
              Print Grocery List
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dietPlan.groceryList.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3"
              >
                <h4 className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider border-b border-slate-100 pb-2 dark:border-slate-800">
                  {cat.category}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {(language === 'hi' ? cat.itemsHi : cat.itemsEn).map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  function isProcessingRegenerate() {
    return isRegenerating;
  }
};
