export type RelationType = 'self' | 'father' | 'mother' | 'spouse' | 'child' | 'other';

export type ReportCategory =
  | 'blood_test'
  | 'thyroid'
  | 'lipid'
  | 'diabetes'
  | 'xray'
  | 'mri'
  | 'prescription'
  | 'discharge_summary'
  | 'vaccination'
  | 'other';

export type BiomarkerStatus = 'normal' | 'borderline_low' | 'borderline_high' | 'low' | 'high' | 'critical';

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  relation: RelationType;
  dateOfBirth: string; // YYYY-MM-DD
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  isPrimary: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface ReportFile {
  id: string;
  reportId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  dataUrl?: string; // base64 or object URL for local preview
  uploadedAt: string;
}

export interface Report {
  id: string;
  profileId: string;
  title: string;
  reportType: ReportCategory;
  reportDate: string; // YYYY-MM-DD
  doctorName?: string;
  labName?: string;
  notes?: string;
  tags: string[];
  files: ReportFile[];
  isDeleted: boolean;
  deletedAt?: string; // ISO string
  extractedCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ParameterDefinition {
  code: string;
  nameEn: string;
  nameHi: string;
  category: 'diabetes' | 'lipid' | 'thyroid' | 'renal' | 'hematology' | 'vitamins' | 'vitals';
  unit: string;
  minNormal: number;
  maxNormal: number;
  criticalLow?: number;
  criticalHigh?: number;
  descriptionEn: string;
  descriptionHi: string;
}

export interface Measurement {
  id: string;
  profileId: string;
  reportId?: string;
  parameterCode: string;
  value: number;
  unit: string;
  measuredAt: string; // YYYY-MM-DD
  status: BiomarkerStatus;
  confidenceScore?: number;
  verifiedByUser: boolean;
  notes?: string;
}

export interface Reminder {
  id: string;
  profileId: string;
  title: string;
  titleHi?: string;
  parameterCode?: string;
  frequencyMonths: number;
  lastLoggedDate?: string;
  nextDueDate: string;
  status: 'pending' | 'done' | 'snoozed' | 'skipped';
  notifyEmail: boolean;
  notifySmsWhatsapp: boolean;
  snoozeUntil?: string;
}

export interface DietProfile {
  profileId: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  dietPreference: 'veg' | 'non-veg' | 'vegan' | 'jain';
  region: 'north_indian' | 'south_indian' | 'west_indian' | 'east_indian';
  allergies: string[];
  existingConditions: string[];
  medications?: string;
  healthGoals: string[];
}

export interface MealRecommendation {
  mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  nameEn: string;
  nameHi: string;
  portion: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  notes: string;
}

export interface DayDietPlan {
  dayNumber: number; // 1 to 7
  dayNameEn: string;
  dayNameHi: string;
  meals: MealRecommendation[];
  totalCalories: number;
}

export interface DietRationale {
  parameterCode: string;
  biomarkerName: string;
  currentValue: number;
  unit: string;
  status: BiomarkerStatus;
  clinicalReasonEn: string;
  clinicalReasonHi: string;
  actionTakenEn: string;
  actionTakenHi: string;
}

export interface DietPlan {
  id: string;
  profileId: string;
  title: string;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatsG: number;
  rationales: DietRationale[];
  foodsToFavorEn: string[];
  foodsToFavorHi: string[];
  foodsToLimitEn: string[];
  foodsToLimitHi: string[];
  days: DayDietPlan[];
  groceryList: {
    category: string;
    itemsEn: string[];
    itemsHi: string[];
  }[];
  safetyGateRequired: boolean;
  safetyGateReason?: string;
  generatedAt: string;
}

export interface ShareLink {
  id: string;
  profileId: string;
  token: string;
  passcodeHash?: string;
  expiresAt: string;
  isRevoked: boolean;
  includeAllReports: boolean;
  selectedReportIds?: string[];
  viewCount: number;
  createdAt: string;
}

export interface ConsentLog {
  id: string;
  userId: string;
  purpose: string;
  isGranted: boolean;
  recordedAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export type SupportedLanguage = 'en' | 'hi';
