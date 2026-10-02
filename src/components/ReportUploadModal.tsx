'use client';

import React, { useState, useRef } from 'react';
import { useMedVault } from '@/lib/context';
import { ReportCategory, Measurement, BiomarkerStatus } from '@/lib/types';
import { storage } from '@/lib/storage';
import { CLINICAL_PARAMETERS, evaluateBiomarkerStatus, getStatusColor } from '@/lib/referenceRanges';
import {
  X,
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Plus
} from 'lucide-react';

interface ExtractedCandidate {
  parameterCode: string;
  nameEn: string;
  value: number;
  unit: string;
  confidence: number;
  status: BiomarkerStatus;
}

export const ReportUploadModal: React.FC = () => {
  const {
    uploadModalOpen,
    setUploadModalOpen,
    activeProfile,
    refreshData,
    t,
    language
  } = useMedVault();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<'upload' | 'extract_confirm'>('upload');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [reportType, setReportType] = useState<ReportCategory>('blood_test');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [doctorName, setDoctorName] = useState('');
  const [labName, setLabName] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [notes, setNotes] = useState('');

  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [extractedValues, setExtractedValues] = useState<ExtractedCandidate[]>([]);

  if (!uploadModalOpen) return null;

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setSelectedFiles(prev => [...prev, ...fileArray]);

    if (!title && fileArray[0]) {
      const baseName = fileArray[0].name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setTitle(baseName.charAt(0).toUpperCase() + baseName.slice(1));
    }
  };

  const handleRunOcrExtraction = async () => {
    if (selectedFiles.length === 0 && !title) {
      alert('Please select a report file or enter a title');
      return;
    }

    setIsProcessingOcr(true);

    setTimeout(() => {
      let simulatedCandidates: ExtractedCandidate[] = [];

      if (reportType === 'diabetes' || reportType === 'blood_test') {
        simulatedCandidates.push(
          {
            parameterCode: 'hba1c',
            nameEn: 'HbA1c (Glycated Hemoglobin)',
            value: 7.4,
            unit: '%',
            confidence: 0.97,
            status: evaluateBiomarkerStatus('hba1c', 7.4)
          },
          {
            parameterCode: 'fbs',
            nameEn: 'Fasting Blood Sugar (FBS)',
            value: 138,
            unit: 'mg/dL',
            confidence: 0.95,
            status: evaluateBiomarkerStatus('fbs', 138)
          }
        );
      }

      if (reportType === 'lipid' || reportType === 'blood_test') {
        simulatedCandidates.push(
          {
            parameterCode: 'chol_total',
            nameEn: 'Total Cholesterol',
            value: 210,
            unit: 'mg/dL',
            confidence: 0.94,
            status: evaluateBiomarkerStatus('chol_total', 210)
          },
          {
            parameterCode: 'chol_ldl',
            nameEn: 'LDL Cholesterol',
            value: 142,
            unit: 'mg/dL',
            confidence: 0.93,
            status: evaluateBiomarkerStatus('chol_ldl', 142)
          },
          {
            parameterCode: 'chol_hdl',
            nameEn: 'HDL Cholesterol',
            value: 42,
            unit: 'mg/dL',
            confidence: 0.96,
            status: evaluateBiomarkerStatus('chol_hdl', 42)
          },
          {
            parameterCode: 'triglycerides',
            nameEn: 'Triglycerides',
            value: 168,
            unit: 'mg/dL',
            confidence: 0.92,
            status: evaluateBiomarkerStatus('triglycerides', 168)
          }
        );
      }

      if (reportType === 'thyroid') {
        simulatedCandidates.push({
          parameterCode: 'tsh',
          nameEn: 'TSH (Thyroid Stimulating Hormone)',
          value: 6.2,
          unit: 'μIU/mL',
          confidence: 0.99,
          status: evaluateBiomarkerStatus('tsh', 6.2)
        });
      }

      if (simulatedCandidates.length === 0) {
        simulatedCandidates.push(
          {
            parameterCode: 'hemoglobin',
            nameEn: 'Hemoglobin (Hb)',
            value: 13.2,
            unit: 'g/dL',
            confidence: 0.98,
            status: evaluateBiomarkerStatus('hemoglobin', 13.2)
          },
          {
            parameterCode: 'creatinine',
            nameEn: 'Serum Creatinine',
            value: 0.92,
            unit: 'mg/dL',
            confidence: 0.97,
            status: evaluateBiomarkerStatus('creatinine', 0.92)
          }
        );
      }

      setExtractedValues(simulatedCandidates);
      setIsProcessingOcr(false);
      setStep('extract_confirm');
    }, 1200);
  };

  const handleSaveWithoutExtraction = () => {
    saveReportToVault([]);
  };

  const handleConfirmExtractionAndSave = () => {
    saveReportToVault(extractedValues);
  };

  const saveReportToVault = (measurementsToSave: ExtractedCandidate[]) => {
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const createdReport = storage.addReport({
      profileId: activeProfile.id,
      title: title || 'Medical Diagnostic Report',
      reportType,
      reportDate,
      doctorName: doctorName || undefined,
      labName: labName || undefined,
      notes: notes || undefined,
      tags,
      extractedCount: measurementsToSave.length,
      files: selectedFiles.map((file, idx) => ({
        id: `file-${Date.now()}-${idx}`,
        reportId: '',
        fileName: file.name,
        fileType: file.type || 'application/pdf',
        fileSize: file.size,
        uploadedAt: new Date().toISOString()
      }))
    });

    if (measurementsToSave.length > 0) {
      storage.addMeasurements(
        measurementsToSave.map(m => ({
          profileId: activeProfile.id,
          reportId: createdReport.id,
          parameterCode: m.parameterCode,
          value: m.value,
          unit: m.unit,
          measuredAt: reportDate,
          status: m.status,
          confidenceScore: m.confidence,
          verifiedByUser: true
        }))
      );
    }

    refreshData();
    handleClose();
  };

  const handleClose = () => {
    setUploadModalOpen(false);
    setStep('upload');
    setSelectedFiles([]);
    setTitle('');
    setDoctorName('');
    setLabName('');
    setTagsInput('');
    setNotes('');
    setExtractedValues([]);
  };

  const handleUpdateExtractedValue = (index: number, newValue: number) => {
    setExtractedValues(prev => {
      const updated = [...prev];
      const item = updated[index];
      item.value = newValue;
      item.status = evaluateBiomarkerStatus(item.parameterCode, newValue);
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-pink-100 bg-white p-5 sm:p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-50 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-rose-600 dark:bg-pink-950/60 dark:text-pink-400 border border-pink-100">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {step === 'upload' ? t.uploadModal.title : t.extraction.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {step === 'upload'
                  ? `Filing for ${activeProfile.name} (${activeProfile.relation})`
                  : t.extraction.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-pink-50 hover:text-rose-700 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 'upload' ? (
          /* STEP 1: UPLOAD AND METADATA */
          <div className="mt-4 space-y-4">
            {/* File Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer rounded-2xl border-2 border-dashed border-pink-200/90 bg-[#FDF8F9] p-5 text-center hover:border-rose-400 hover:bg-pink-50/50 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-pink-500 transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,image/png,image/jpeg"
                onChange={e => handleFilesSelected(e.target.files)}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={e => handleFilesSelected(e.target.files)}
                className="hidden"
              />

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-rose-700 dark:bg-pink-950 dark:text-pink-300 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                {t.uploadModal.dragDrop}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t.uploadModal.supportedFormats}
              </p>

              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    cameraInputRef.current?.click();
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-pink-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-xs"
                >
                  <Camera className="h-3.5 w-3.5 text-rose-600" />
                  {t.uploadModal.cameraCapture}
                </button>
              </div>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {selectedFiles.length} file(s) attached:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-xl bg-pink-50 px-3 py-1.5 text-xs font-medium text-rose-800 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-200/80"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span className="max-w-[150px] truncate">{f.name}</span>
                      <span className="text-[10px] opacity-75">
                        ({(f.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.uploadModal.reportTitle} *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Apollo HbA1c & Lipid Panel"
                  className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.uploadModal.selectCategory}
                </label>
                <select
                  value={reportType}
                  onChange={e => setReportType(e.target.value as ReportCategory)}
                  className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none capitalize"
                >
                  <option value="blood_test">Blood Test / CBC</option>
                  <option value="diabetes">Diabetes / HbA1c</option>
                  <option value="lipid">Lipid Profile / Cholesterol</option>
                  <option value="thyroid">Thyroid Function</option>
                  <option value="xray">X-Ray</option>
                  <option value="mri">MRI / CT Scan</option>
                  <option value="prescription">Doctor Prescription</option>
                  <option value="discharge_summary">Discharge Summary</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.uploadModal.dateTaken}
                </label>
                <input
                  type="date"
                  value={reportDate}
                  onChange={e => setReportDate(e.target.value)}
                  className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.uploadModal.doctorName}
                </label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={e => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. Ashish Mehra"
                  className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.uploadModal.labName}
                </label>
                <input
                  type="text"
                  value={labName}
                  onChange={e => setLabName(e.target.value)}
                  placeholder="e.g. Dr. Lal PathLabs"
                  className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.vault.tags}
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  placeholder="e.g. Fasting, Annual, Apollo"
                  className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.vault.notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Clinical notes, advice, or medication instructions..."
                  className="w-full rounded-xl border border-pink-200 bg-[#FDF8F9] px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-pink-50 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleSaveWithoutExtraction}
                className="w-full sm:w-auto rounded-xl border border-pink-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-pink-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {t.uploadModal.saveOnly}
              </button>

              <button
                type="button"
                disabled={isProcessingOcr}
                onClick={handleRunOcrExtraction}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-pink-500/25 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50"
              >
                {isProcessingOcr ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Extracting Readings...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {t.uploadModal.runExtraction}
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* STEP 2: VERIFICATION GATE (NEVER SILENTLY TRUST OCR) */
          <div className="mt-4 space-y-4">
            {/* Safety Disclaimer Banner */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3.5 dark:border-amber-900/60 dark:bg-amber-950/40">
              <div className="flex gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    {t.extraction.neverTrustNotice}
                  </h4>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                    MedVault requires explicit verification before numbers enter your permanent health record.
                  </p>
                </div>
              </div>
            </div>

            {/* Extracted Biomarkers Table */}
            <div className="rounded-2xl border border-pink-100 dark:border-slate-800 overflow-hidden">
              <div className="bg-pink-50/60 dark:bg-slate-800/80 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 border-b border-pink-100 dark:border-slate-800 flex justify-between">
                <span>{t.extraction.detectedBiomarkers} ({extractedValues.length})</span>
                <span className="text-[11px] font-normal text-slate-500">Edit values if OCR misread</span>
              </div>

              <div className="divide-y divide-pink-50 dark:divide-slate-800 max-h-[300px] overflow-y-auto">
                {extractedValues.map((item, idx) => {
                  const colors = getStatusColor(item.status);
                  return (
                    <div key={idx} className="p-3 flex items-center justify-between gap-3 hover:bg-pink-50/30 dark:hover:bg-slate-800/50">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {item.nameEn}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${colors.badge}`}>
                            {language === 'hi' ? colors.labelHi : colors.labelEn}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            OCR Confidence: {(item.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="number"
                          step="any"
                          value={item.value}
                          onChange={e => handleUpdateExtractedValue(idx, parseFloat(e.target.value) || 0)}
                          className="w-24 rounded-lg border border-pink-200 bg-white px-2 py-1 text-right text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none"
                        />
                        <span className="text-xs text-slate-500 font-medium w-12">
                          {item.unit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirmation Buttons */}
            <div className="pt-3 border-t border-pink-50 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setStep('upload')}
                className="w-full sm:w-auto rounded-xl border border-pink-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-pink-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Back to Edit Details
              </button>

              <button
                type="button"
                onClick={handleConfirmExtractionAndSave}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-pink-500/25 hover:from-rose-600 hover:to-pink-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                {t.extraction.confirmAndSave}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
