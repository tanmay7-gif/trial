import {
  UserProfile,
  Report,
  Measurement,
  Reminder,
  DietProfile,
  DietPlan,
  ShareLink,
  ConsentLog,
  AuditLog
} from './types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'prof-ramesh',
    userId: 'user-primary',
    name: 'Ramesh Sharma',
    relation: 'self',
    dateOfBirth: '1972-04-12',
    gender: 'male',
    bloodGroup: 'B+',
    isPrimary: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prof-sunita',
    userId: 'user-primary',
    name: 'Sunita Sharma',
    relation: 'spouse',
    dateOfBirth: '1975-09-24',
    gender: 'female',
    bloodGroup: 'O+',
    isPrimary: false,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-05T00:00:00.000Z'
  },
  {
    id: 'prof-priya',
    userId: 'user-primary',
    name: 'Priya Sharma',
    relation: 'child',
    dateOfBirth: '2000-08-18',
    gender: 'female',
    bloodGroup: 'B+',
    isPrimary: false,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-10T00:00:00.000Z'
  },
  {
    id: 'prof-om-prakash',
    userId: 'user-primary',
    name: 'Om Prakash Sharma',
    relation: 'father',
    dateOfBirth: '1946-11-03',
    gender: 'male',
    bloodGroup: 'A+',
    isPrimary: false,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-15T00:00:00.000Z'
  }
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'rep-001',
    profileId: 'prof-ramesh',
    title: 'Comprehensive Diabetic & Lipid Profile',
    reportType: 'blood_test',
    reportDate: '2026-08-15',
    doctorName: 'Dr. Ashish Mehra (Endocrinologist)',
    labName: 'Apollo Diagnostics, New Delhi',
    notes: 'HbA1c elevated at 7.6%. Advised strict dietary carb control and walking 45 mins daily.',
    tags: ['Apollo', 'Fasting', 'Diabetes', 'Cholesterol'],
    isDeleted: false,
    extractedCount: 7,
    files: [
      {
        id: 'file-001',
        reportId: 'rep-001',
        fileName: 'Apollo_Diabetic_Panel_Aug2026.pdf',
        fileType: 'application/pdf',
        fileSize: 482000,
        uploadedAt: '2026-08-15T10:30:00.000Z'
      }
    ],
    createdAt: '2026-08-15T11:00:00.000Z',
    updatedAt: '2026-08-15T11:00:00.000Z'
  },
  {
    id: 'rep-002',
    profileId: 'prof-ramesh',
    title: 'Routine Quarterly Blood Panel',
    reportType: 'diabetes',
    reportDate: '2026-05-10',
    doctorName: 'Dr. Ashish Mehra',
    labName: 'Dr. Lal PathLabs',
    notes: 'Glucose trending downward compared to January. Statin medication tolerated well.',
    tags: ['LalPathLabs', 'HbA1c', 'Sugar'],
    isDeleted: false,
    extractedCount: 5,
    files: [
      {
        id: 'file-002',
        reportId: 'rep-002',
        fileName: 'LalPath_Routine_May2026.png',
        fileType: 'image/png',
        fileSize: 1250000,
        uploadedAt: '2026-05-10T14:15:00.000Z'
      }
    ],
    createdAt: '2026-05-10T14:30:00.000Z',
    updatedAt: '2026-05-10T14:30:00.000Z'
  },
  {
    id: 'rep-003',
    profileId: 'prof-ramesh',
    title: 'Annual Executive Health Checkup',
    reportType: 'lipid',
    reportDate: '2026-01-20',
    doctorName: 'Dr. R.K. Singhal',
    labName: 'SRL Diagnostics',
    notes: 'Baseline checkup before initiating metformin. Borderline high blood pressure noted.',
    tags: ['SRL', 'Executive', 'Annual'],
    isDeleted: false,
    extractedCount: 8,
    files: [
      {
        id: 'file-003',
        reportId: 'rep-003',
        fileName: 'SRL_Annual_Jan2026.pdf',
        fileType: 'application/pdf',
        fileSize: 890000,
        uploadedAt: '2026-01-20T09:00:00.000Z'
      }
    ],
    createdAt: '2026-01-20T09:30:00.000Z',
    updatedAt: '2026-01-20T09:30:00.000Z'
  },
  {
    id: 'rep-004',
    profileId: 'prof-ramesh',
    title: 'Cardiologist Prescription & ECG',
    reportType: 'prescription',
    reportDate: '2026-08-16',
    doctorName: 'Dr. V. Rao',
    labName: 'Fortis Escorts Heart Institute',
    notes: 'Normal sinus rhythm. Repeat lipid panel in 6 months.',
    tags: ['Prescription', 'Cardiology', 'ECG'],
    isDeleted: false,
    extractedCount: 2,
    files: [
      {
        id: 'file-004',
        reportId: 'rep-004',
        fileName: 'Fortis_Rx_Aug2026.jpg',
        fileType: 'image/jpeg',
        fileSize: 740000,
        uploadedAt: '2026-08-16T16:00:00.000Z'
      }
    ],
    createdAt: '2026-08-16T16:20:00.000Z',
    updatedAt: '2026-08-16T16:20:00.000Z'
  },
  {
    id: 'rep-005',
    profileId: 'prof-sunita',
    title: 'Thyroid Function Test (T3, T4, TSH)',
    reportType: 'thyroid',
    reportDate: '2026-07-22',
    doctorName: 'Dr. Neha Bansal',
    labName: 'Thyrocare',
    notes: 'TSH slightly elevated at 6.8 uIU/mL. Adjust Thyronorm dosage to 50mcg.',
    tags: ['Thyrocare', 'TSH', 'Hormones'],
    isDeleted: false,
    extractedCount: 3,
    files: [
      {
        id: 'file-005',
        reportId: 'rep-005',
        fileName: 'Thyrocare_TSH_Jul2026.pdf',
        fileType: 'application/pdf',
        fileSize: 310000,
        uploadedAt: '2026-07-22T11:00:00.000Z'
      }
    ],
    createdAt: '2026-07-22T11:15:00.000Z',
    updatedAt: '2026-07-22T11:15:00.000Z'
  }
];

export const INITIAL_MEASUREMENTS: Measurement[] = [
  // Ramesh Sharma - Jan 2026
  {
    id: 'm-001',
    profileId: 'prof-ramesh',
    reportId: 'rep-003',
    parameterCode: 'hba1c',
    value: 8.2,
    unit: '%',
    measuredAt: '2026-01-20',
    status: 'high',
    confidenceScore: 0.98,
    verifiedByUser: true
  },
  {
    id: 'm-002',
    profileId: 'prof-ramesh',
    reportId: 'rep-003',
    parameterCode: 'fbs',
    value: 165,
    unit: 'mg/dL',
    measuredAt: '2026-01-20',
    status: 'high',
    confidenceScore: 0.96,
    verifiedByUser: true
  },
  {
    id: 'm-003',
    profileId: 'prof-ramesh',
    reportId: 'rep-003',
    parameterCode: 'chol_total',
    value: 238,
    unit: 'mg/dL',
    measuredAt: '2026-01-20',
    status: 'high',
    confidenceScore: 0.95,
    verifiedByUser: true
  },
  {
    id: 'm-004',
    profileId: 'prof-ramesh',
    reportId: 'rep-003',
    parameterCode: 'chol_ldl',
    value: 168,
    unit: 'mg/dL',
    measuredAt: '2026-01-20',
    status: 'high',
    confidenceScore: 0.94,
    verifiedByUser: true
  },
  {
    id: 'm-005',
    profileId: 'prof-ramesh',
    reportId: 'rep-003',
    parameterCode: 'chol_hdl',
    value: 38,
    unit: 'mg/dL',
    measuredAt: '2026-01-20',
    status: 'low',
    confidenceScore: 0.95,
    verifiedByUser: true
  },
  {
    id: 'm-006',
    profileId: 'prof-ramesh',
    reportId: 'rep-003',
    parameterCode: 'triglycerides',
    value: 210,
    unit: 'mg/dL',
    measuredAt: '2026-01-20',
    status: 'high',
    confidenceScore: 0.97,
    verifiedByUser: true
  },
  {
    id: 'm-007',
    profileId: 'prof-ramesh',
    reportId: 'rep-003',
    parameterCode: 'bp_systolic',
    value: 138,
    unit: 'mmHg',
    measuredAt: '2026-01-20',
    status: 'borderline_high',
    confidenceScore: 0.99,
    verifiedByUser: true
  },
  {
    id: 'm-008',
    profileId: 'prof-ramesh',
    reportId: 'rep-003',
    parameterCode: 'bp_diastolic',
    value: 88,
    unit: 'mmHg',
    measuredAt: '2026-01-20',
    status: 'borderline_high',
    confidenceScore: 0.99,
    verifiedByUser: true
  },

  // Ramesh Sharma - May 2026
  {
    id: 'm-009',
    profileId: 'prof-ramesh',
    reportId: 'rep-002',
    parameterCode: 'hba1c',
    value: 7.9,
    unit: '%',
    measuredAt: '2026-05-10',
    status: 'high',
    confidenceScore: 0.99,
    verifiedByUser: true
  },
  {
    id: 'm-010',
    profileId: 'prof-ramesh',
    reportId: 'rep-002',
    parameterCode: 'fbs',
    value: 152,
    unit: 'mg/dL',
    measuredAt: '2026-05-10',
    status: 'high',
    confidenceScore: 0.97,
    verifiedByUser: true
  },
  {
    id: 'm-011',
    profileId: 'prof-ramesh',
    reportId: 'rep-002',
    parameterCode: 'chol_total',
    value: 215,
    unit: 'mg/dL',
    measuredAt: '2026-05-10',
    status: 'borderline_high',
    confidenceScore: 0.96,
    verifiedByUser: true
  },
  {
    id: 'm-012',
    profileId: 'prof-ramesh',
    reportId: 'rep-002',
    parameterCode: 'chol_ldl',
    value: 150,
    unit: 'mg/dL',
    measuredAt: '2026-05-10',
    status: 'high',
    confidenceScore: 0.95,
    verifiedByUser: true
  },
  {
    id: 'm-013',
    profileId: 'prof-ramesh',
    reportId: 'rep-002',
    parameterCode: 'weight',
    value: 78.5,
    unit: 'kg',
    measuredAt: '2026-05-10',
    status: 'normal',
    confidenceScore: 0.99,
    verifiedByUser: true
  },

  // Ramesh Sharma - Aug 2026 (Latest)
  {
    id: 'm-014',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'hba1c',
    value: 7.6,
    unit: '%',
    measuredAt: '2026-08-15',
    status: 'high',
    confidenceScore: 0.99,
    verifiedByUser: true
  },
  {
    id: 'm-015',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'fbs',
    value: 142,
    unit: 'mg/dL',
    measuredAt: '2026-08-15',
    status: 'high',
    confidenceScore: 0.98,
    verifiedByUser: true
  },
  {
    id: 'm-016',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'chol_total',
    value: 202,
    unit: 'mg/dL',
    measuredAt: '2026-08-15',
    status: 'borderline_high',
    confidenceScore: 0.97,
    verifiedByUser: true
  },
  {
    id: 'm-017',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'chol_ldl',
    value: 138,
    unit: 'mg/dL',
    measuredAt: '2026-08-15',
    status: 'high',
    confidenceScore: 0.96,
    verifiedByUser: true
  },
  {
    id: 'm-018',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'chol_hdl',
    value: 44,
    unit: 'mg/dL',
    measuredAt: '2026-08-15',
    status: 'normal',
    confidenceScore: 0.98,
    verifiedByUser: true
  },
  {
    id: 'm-019',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'triglycerides',
    value: 172,
    unit: 'mg/dL',
    measuredAt: '2026-08-15',
    status: 'borderline_high',
    confidenceScore: 0.95,
    verifiedByUser: true
  },
  {
    id: 'm-020',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'creatinine',
    value: 0.95,
    unit: 'mg/dL',
    measuredAt: '2026-08-15',
    status: 'normal',
    confidenceScore: 0.99,
    verifiedByUser: true
  },
  {
    id: 'm-021',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'vit_d',
    value: 22,
    unit: 'ng/mL',
    measuredAt: '2026-08-15',
    status: 'low',
    confidenceScore: 0.98,
    verifiedByUser: true
  },
  {
    id: 'm-022',
    profileId: 'prof-ramesh',
    reportId: 'rep-001',
    parameterCode: 'vit_b12',
    value: 195,
    unit: 'pg/mL',
    measuredAt: '2026-08-15',
    status: 'low',
    confidenceScore: 0.96,
    verifiedByUser: true
  },
  {
    id: 'm-023',
    profileId: 'prof-ramesh',
    reportId: 'rep-004',
    parameterCode: 'bp_systolic',
    value: 128,
    unit: 'mmHg',
    measuredAt: '2026-08-16',
    status: 'borderline_high',
    confidenceScore: 0.99,
    verifiedByUser: true
  },
  {
    id: 'm-024',
    profileId: 'prof-ramesh',
    reportId: 'rep-004',
    parameterCode: 'bp_diastolic',
    value: 82,
    unit: 'mmHg',
    measuredAt: '2026-08-16',
    status: 'borderline_high',
    confidenceScore: 0.99,
    verifiedByUser: true
  }
];

export const INITIAL_REMINDERS: Reminder[] = [
  {
    id: 'rem-001',
    profileId: 'prof-ramesh',
    title: 'Quarterly HbA1c & Fasting Sugar Check',
    titleHi: 'तिमाही एचबीए1सी और खाली पेट शुगर जांच',
    parameterCode: 'hba1c',
    frequencyMonths: 3,
    lastLoggedDate: '2026-08-15',
    nextDueDate: '2026-11-15',
    status: 'pending',
    notifyEmail: true,
    notifySmsWhatsapp: true
  },
  {
    id: 'rem-002',
    profileId: 'prof-ramesh',
    title: 'Lipid Panel Follow-up (Cholesterol / Triglycerides)',
    titleHi: 'लिपिड प्रोफाइल जांच (कोलेस्ट्रॉल)',
    parameterCode: 'chol_total',
    frequencyMonths: 6,
    lastLoggedDate: '2026-08-15',
    nextDueDate: '2027-02-15',
    status: 'pending',
    notifyEmail: true,
    notifySmsWhatsapp: false
  },
  {
    id: 'rem-003',
    profileId: 'prof-ramesh',
    title: 'Weekly Home Blood Pressure & Weight Log',
    titleHi: 'साप्ताहिक ब्लड प्रेशर और वजन लॉग',
    parameterCode: 'bp_systolic',
    frequencyMonths: 1,
    lastLoggedDate: '2026-08-16',
    nextDueDate: '2026-09-01',
    status: 'pending',
    notifyEmail: false,
    notifySmsWhatsapp: true
  }
];

export const INITIAL_DIET_PROFILE: DietProfile = {
  profileId: 'prof-ramesh',
  age: 54,
  sex: 'male',
  heightCm: 172,
  weightKg: 78,
  activityLevel: 'light',
  dietPreference: 'veg',
  region: 'north_indian',
  allergies: ['peanuts'],
  existingConditions: ['diabetes', 'high_cholesterol', 'hypertension'],
  medications: 'Metformin 500mg (OD), Atorvastatin 10mg (HS), Telmisartan 40mg (Morning)',
  healthGoals: ['Lower HbA1c to < 7.0%', 'Reduce LDL < 100 mg/dL', 'Target Weight 72 kg']
};

export const INITIAL_DIET_PLAN: DietPlan = {
  id: 'diet-001',
  profileId: 'prof-ramesh',
  title: 'Metabolic & Heart-Protective North Indian Vegetarian Plan',
  targetCalories: 1750,
  targetProteinG: 68,
  targetCarbsG: 195,
  targetFatsG: 45,
  safetyGateRequired: false,
  rationales: [
    {
      parameterCode: 'hba1c',
      biomarkerName: 'HbA1c (7.6%)',
      currentValue: 7.6,
      unit: '%',
      status: 'high',
      clinicalReasonEn: 'Your HbA1c indicates persistent hyperglycemia over the last 90 days.',
      clinicalReasonHi: 'आपका एचबीए1सी 7.6% पिछले 90 दिनों में उच्च रक्त शर्करा को दर्शाता है।',
      actionTakenEn: 'Replaced high-glycemic white rice and refined maida with whole foxtail/kodo millets, besan chilla, and high-fiber methi roti.',
      actionTakenHi: 'सफेद चावल और मैदे की जगह मोटे अनाज (कोदो/कंगनी मिलेट), बेसन चीला और मेथी की रोटी शामिल की गई है।'
    },
    {
      parameterCode: 'chol_ldl',
      biomarkerName: 'LDL Cholesterol (138 mg/dL)',
      currentValue: 138,
      unit: 'mg/dL',
      status: 'high',
      clinicalReasonEn: 'Elevated LDL increases the risk of coronary plaque formation.',
      clinicalReasonHi: 'बढ़ा हुआ एलडीएल कोलेस्ट्रॉल हृदय धमनियों में रुकावट का जोखिम बढ़ाता है।',
      actionTakenEn: 'Eliminated deep-fried snacks, restricted desi ghee to 1 tsp/day, and added soluble fiber sources like roasted flaxseeds and oat bran.',
      actionTakenHi: 'तले हुए स्नैक्स बंद किए गए, देसी घी 1 चम्मच तक सीमित किया, और अलसी के बीज तथा ओट्स चोकर शामिल किए।'
    },
    {
      parameterCode: 'vit_d',
      biomarkerName: 'Vitamin D (22 ng/mL)',
      currentValue: 22,
      unit: 'ng/mL',
      status: 'low',
      clinicalReasonEn: 'Sub-optimal Vitamin D impairs calcium absorption and immune response.',
      clinicalReasonHi: 'विटामिन डी की कमी हड्डियों और इम्युनिटी को प्रभावित करती है।',
      actionTakenEn: 'Incorporated fortified low-fat cow milk, overnight soaked almonds, and sun-exposed button mushrooms.',
      actionTakenHi: 'कम वसा वाला गाय का दूध, भीगे बादाम और मशरूम शामिल किए गए हैं।'
    },
    {
      parameterCode: 'vit_b12',
      biomarkerName: 'Vitamin B12 (195 pg/mL)',
      currentValue: 195,
      unit: 'pg/mL',
      status: 'low',
      clinicalReasonEn: 'Low B12 often causes tingling, lethargy, and mild peripheral neuropathy in diabetic individuals on metformin.',
      clinicalReasonHi: 'मेटफॉर्मिन दवा लेने वाले डायबिटीज रोगियों में बी12 कम होने से पैरों में सुन्नपन और कमजोरी आती है।',
      actionTakenEn: 'Added fermented homemade curd (dahi), paneer portions, and fortified nutritional yeast to meals.',
      actionTakenHi: 'रोजाना घर का ताजा दही, ताजा पनीर और फोर्टिफाइड न्यूट्रिशनल यीस्ट जोड़ा गया है।'
    }
  ],
  foodsToFavorEn: [
    'Foxtail millet / Jowar rotis',
    'Soaked methi (fenugreek) water in the morning',
    'Palak, Lauki, Karela, and Bhindi',
    'Moong dal and chana dal sprouts',
    'Roasted chana and makhana (foxnuts)',
    '1 glass fresh buttermilk (chaas) with roasted jeera'
  ],
  foodsToFavorHi: [
    'ज्वार और कंगनी (फॉक्सटेल) मिलेट की रोटियां',
    'सुबह खाली पेट भीगे मेथी दाने का पानी',
    'पालक, लौकी, करेला, तोरई और भिंडी',
    'अंकुरित मूंग और चना',
    'भुना हुआ चना और मखाना',
    'भुने जीरे और हींग के साथ ताजा छाछ'
  ],
  foodsToLimitEn: [
    'Deep-fried pakoras, samosas, and namkeens',
    'Refined maida, white bread, and bakery biscuits',
    'Sweets, jaggery, honey, and packaged fruit juices',
    'Excess table salt and processed pickles/papad',
    'Full-fat buffalo milk, malai, and excess vanaspati ghee'
  ],
  foodsToLimitHi: [
    'तले हुए समोसे, कचौरी, पकौड़े और भुजिया',
    'मैदा, सफेद ब्रेड और बेकरी बिस्कुट',
    'मिठाइयां, गुड़, शहद और पैक्ड फ्रूट जूस',
    'अतिरिक्त नमक, तीखा बाजारू अचार और पापड़',
    'गाढ़ा भैंस का दूध, मलाई और वनस्पति घी'
  ],
  days: [
    {
      dayNumber: 1,
      dayNameEn: 'Monday',
      dayNameHi: 'सोमवार',
      totalCalories: 1740,
      meals: [
        {
          mealType: 'breakfast',
          nameEn: 'Methi Besan Chilla with Mint Chutney',
          nameHi: 'पुदीना चटनी के साथ मेथी बेसन चीला',
          portion: '2 medium chillas + 2 tbsp chutney',
          calories: 340,
          proteinG: 14,
          carbsG: 42,
          fatsG: 11,
          notes: 'High fiber and low glycemic index to prevent morning sugar spike.'
        },
        {
          mealType: 'lunch',
          nameEn: 'Jowar Roti + Lauki Dal + Kachumber Salad + Fresh Curd',
          nameHi: 'ज्वार रोटी + लौकी वाली मूंग दाल + कचुम्बर सलाद + ताजा दही',
          portion: '2 small rotis, 1 bowl dal, 1 bowl dahi (100g), salad',
          calories: 560,
          proteinG: 22,
          carbsG: 78,
          fatsG: 14,
          notes: 'Potassium-rich lauki aids BP regulation; curd restores Vitamin B12.'
        },
        {
          mealType: 'snack',
          nameEn: 'Roasted Makhana & Roasted Chana + Green Tea',
          nameHi: 'भुना मखाना व चना + दालचीनी ग्रीन टी',
          portion: '1 fistful makhana (30g) + 20g chana',
          calories: 190,
          proteinG: 8,
          carbsG: 26,
          fatsG: 4,
          notes: 'Satisfies 4 PM hunger without elevating triglycerides.'
        },
        {
          mealType: 'dinner',
          nameEn: 'Palak Paneer (Low Fat) + Multigrain Phulka + Steamed Veggies',
          nameHi: 'कम तेल वाला पालक पनीर + 2 मल्टीग्रेन फुल्के + उबली सब्जियां',
          portion: '1 bowl palak paneer (50g paneer), 2 phulkas',
          calories: 520,
          proteinG: 20,
          carbsG: 52,
          fatsG: 15,
          notes: 'Keep dinner 2.5 hours before bedtime for optimal fasting blood glucose.'
        }
      ]
    },
    {
      dayNumber: 2,
      dayNameEn: 'Tuesday',
      dayNameHi: 'मंगलवार',
      totalCalories: 1720,
      meals: [
        {
          mealType: 'breakfast',
          nameEn: 'Vegetable Oats Upma with Peanuts & Mustard Seeds',
          nameHi: 'सब्जियों वाला ओट्स उपमा + 5 भीगे बादाम',
          portion: '1.5 medium bowls (150g cooked)',
          calories: 330,
          proteinG: 11,
          carbsG: 48,
          fatsG: 10,
          notes: 'Beta-glucan fiber in oats binds bile acids, actively reducing LDL.'
        },
        {
          mealType: 'lunch',
          nameEn: 'Bajra Roti + Baingan Bharta + Yellow Moong Dal + Buttermilk',
          nameHi: 'बाजरा रोटी + भुना बैंगन भर्ता + पीली मूंग दाल + जीरा छाछ',
          portion: '2 small rotis, 1 katori bharta, 1 katori dal, 200ml chaas',
          calories: 580,
          proteinG: 21,
          carbsG: 80,
          fatsG: 16,
          notes: 'Fermented buttermilk soothes gut and enhances mineral bioavailability.'
        },
        {
          mealType: 'snack',
          nameEn: 'Sprouted Moong Chaat with Lemon & Rock Salt',
          nameHi: 'नींबू और खीरे वाली अंकुरित मूंग चाट',
          portion: '1 small bowl (100g)',
          calories: 180,
          proteinG: 10,
          carbsG: 24,
          fatsG: 3,
          notes: 'Live enzymes in sprouts support cellular energy metabolism.'
        },
        {
          mealType: 'dinner',
          nameEn: 'Clear Vegetable Soup + Tofu / Paneer Tikka (Tawa Grill) + 1 Phulka',
          nameHi: 'मिक्स वेज सूप + तवा ग्रिल्ड पनीर टिक्का + 1 फुल्का',
          portion: '1 bowl hot soup, 80g paneer tikka, 1 phulka',
          calories: 490,
          proteinG: 22,
          carbsG: 42,
          fatsG: 14,
          notes: 'Light evening meal minimizes nocturnal GERD and morning insulin resistance.'
        }
      ]
    },
    {
      dayNumber: 3,
      dayNameEn: 'Wednesday',
      dayNameHi: 'बुधवार',
      totalCalories: 1750,
      meals: [
        {
          mealType: 'breakfast',
          nameEn: 'Moong Dal Idli (No Rice) + Tomato Coriander Chutney',
          nameHi: 'बिना चावल वाली मूंग दाल इडली + टमाटर धनिया चटनी',
          portion: '3 medium idlis + 3 tbsp chutney',
          calories: 320,
          proteinG: 15,
          carbsG: 46,
          fatsG: 6,
          notes: 'Fermentation lowers phytates and enhances Vitamin B complex.'
        },
        {
          mealType: 'lunch',
          nameEn: 'Foxtail Millet Khichdi with Mixed Veggies + Dahi',
          nameHi: 'कंगनी (फॉक्सटेल) मिलेट वेज खिचड़ी + 1 कटोरी दही',
          portion: '1 large bowl khichdi (200g) + 100g fresh curd',
          calories: 550,
          proteinG: 20,
          carbsG: 76,
          fatsG: 13,
          notes: 'Foxtail millet releases glucose steadily over 4 hours.'
        },
        {
          mealType: 'snack',
          nameEn: 'Boiled Kala Chana Salad + Lemon',
          nameHi: 'उबला काला चना सलाद + प्याज टमाटर नींबू',
          portion: '1 small bowl (80g)',
          calories: 200,
          proteinG: 9,
          carbsG: 28,
          fatsG: 4,
          notes: 'Resistant starch feeds beneficial gut microbiome.'
        },
        {
          mealType: 'dinner',
          nameEn: 'Methi Thepla (Zero Ghee) + Lauki Kofta Curry (Steamed) + Salad',
          nameHi: 'मेथी थेपला + उबली लौकी कोफ्ता करी + खीरा टमाटर',
          portion: '2 thin theplas + 1 bowl kofta curry',
          calories: 510,
          proteinG: 16,
          carbsG: 64,
          fatsG: 14,
          notes: 'Fenugreek leaves contain galactomannan which buffers carbohydrate uptake.'
        }
      ]
    },
    {
      dayNumber: 4,
      dayNameEn: 'Thursday',
      dayNameHi: 'गुरुवार',
      totalCalories: 1730,
      meals: [
        {
          mealType: 'breakfast',
          nameEn: 'Poha with Green Peas, Carrots & Crushed Peanuts',
          nameHi: 'मटर और गाजर वाला वेज पोहा + 1 कप बिना चीनी अदरक चाय',
          portion: '1 medium plate (140g)',
          calories: 340,
          proteinG: 9,
          carbsG: 52,
          fatsG: 9,
          notes: 'Poha is iron-rich; lemon juice adds Vitamin C for iron absorption.'
        },
        {
          mealType: 'lunch',
          nameEn: 'Ragi & Wheat Phulka + Rajma Curry + Cabbage Poriyal + Chaas',
          nameHi: 'रागी-गेहूं फुल्का + राजमा करी + पत्तागोभी सब्जी + छाछ',
          portion: '2 phulkas, 1 bowl rajma, 1 bowl sabzi, 1 glass chaas',
          calories: 590,
          proteinG: 24,
          carbsG: 82,
          fatsG: 12,
          notes: 'Ragi brings calcium and magnesium, assisting arterial relaxation for BP.'
        },
        {
          mealType: 'snack',
          nameEn: 'Roasted Soynuts / Sunflower Seeds + Tender Coconut Water',
          nameHi: 'भुने सोयाबीन के दाने + ताजा नारियल पानी',
          portion: '25g nuts + 1 small coconut water',
          calories: 180,
          proteinG: 9,
          carbsG: 16,
          fatsG: 7,
          notes: 'Natural electrolytes without processed sugar.'
        },
        {
          mealType: 'dinner',
          nameEn: 'Tinda / Turai Sabzi + Dal Tadka (Olive/Mustard oil) + 2 Phulkas',
          nameHi: 'तोरई की सब्जी + मूंग दाल तड़का + 2 फुल्के + सलाद',
          portion: '1 bowl sabzi, 1 bowl dal, 2 rotis',
          calories: 500,
          proteinG: 18,
          carbsG: 68,
          fatsG: 12,
          notes: 'Gourd vegetables ease hepatic and digestive load during night.'
        }
      ]
    },
    {
      dayNumber: 5,
      dayNameEn: 'Friday',
      dayNameHi: 'शुक्रवार',
      totalCalories: 1760,
      meals: [
        {
          mealType: 'breakfast',
          nameEn: 'Paneer Bhurji (Low Oil) + 2 Whole Wheat Toast',
          nameHi: 'कम तेल में भुर्जी + 2 मल्टीग्रेन ब्रेड टोस्ट',
          portion: '60g fresh paneer + 2 slices',
          calories: 360,
          proteinG: 18,
          carbsG: 34,
          fatsG: 14,
          notes: 'Protein-heavy start blunts ghrelin (hunger hormone) through mid-day.'
        },
        {
          mealType: 'lunch',
          nameEn: 'Jowar Roti + Chana Dal Palak + Radish Beet Salad + Curd',
          nameHi: 'ज्वार रोटी + पालक चना दाल + मूली चुकंदर सलाद + दही',
          portion: '2 rotis, 1 large bowl dal, salad, 100g curd',
          calories: 570,
          proteinG: 23,
          carbsG: 78,
          fatsG: 13,
          notes: 'Nitrates in beetroot assist vasodilation and blood pressure modulation.'
        },
        {
          mealType: 'snack',
          nameEn: 'Warm Roasted Jeera Makhana + Masala Chaas',
          nameHi: 'जीरा भुना मखाना + ठंडा मसाला छाछ',
          portion: '30g makhana + 1 glass chaas',
          calories: 170,
          proteinG: 6,
          carbsG: 22,
          fatsG: 4,
          notes: 'Cumin stimulates pancreatic lipase and bile flow.'
        },
        {
          mealType: 'dinner',
          nameEn: 'Karela Sabzi (Bitter Gourd) + Masoor Dal + 2 Multigrain Rotis',
          nameHi: 'करेला प्याज सब्जी + लाल मसूर दाल + 2 मल्टीग्रेन रोटियां',
          portion: '1 bowl karela, 1 bowl dal, 2 rotis',
          calories: 530,
          proteinG: 19,
          carbsG: 66,
          fatsG: 14,
          notes: 'Charantin and polypeptide-p in bitter gourd mimic insulin action.'
        }
      ]
    },
    {
      dayNumber: 6,
      dayNameEn: 'Saturday',
      dayNameHi: 'शनिवार',
      totalCalories: 1710,
      meals: [
        {
          mealType: 'breakfast',
          nameEn: 'Vegetable Dalia (Broken Wheat) Porridge',
          nameHi: 'सब्जियों वाला नमकीन दलिया + 1 उबला अंडा / पनीर टुकड़ा',
          portion: '1 large bowl (200g)',
          calories: 320,
          proteinG: 11,
          carbsG: 50,
          fatsG: 6,
          notes: 'High insoluble fiber accelerates gastrointestinal transit.'
        },
        {
          mealType: 'lunch',
          nameEn: 'Brown Rice Pulao (Beans & Carrots) + Dal Makhani (No Cream) + Salad',
          nameHi: 'ब्राउन राइस वेज पुलाव + बिना मक्खन वाली उड़द दाल + खीरा ककड़ी',
          portion: '1 bowl brown rice pulao, 1 bowl dal, salad',
          calories: 570,
          proteinG: 21,
          carbsG: 84,
          fatsG: 12,
          notes: 'Weekend meal with familiar taste profiles yet strict glycemic moderation.'
        },
        {
          mealType: 'snack',
          nameEn: '1 Small Apple / Guava with Black Salt + Walnuts',
          nameHi: '1 छोटा अमरूद या सेब + 3 अखरोट गिरी',
          portion: '1 whole fruit + 15g walnuts',
          calories: 170,
          proteinG: 3,
          carbsG: 22,
          fatsG: 8,
          notes: 'Guava is very low GI and loaded with ascorbic acid (Vitamin C).'
        },
        {
          mealType: 'dinner',
          nameEn: 'Mixed Vegetable Khichdi with Ghee (1 tsp) + Roasted Papad + Curd',
          nameHi: 'मूंग दाल खिचड़ी (1 चम्मच गाय का घी) + भुना पापड़ + दही',
          portion: '1.5 bowls khichdi, 1 papad, 80g curd',
          calories: 510,
          proteinG: 17,
          carbsG: 68,
          fatsG: 13,
          notes: 'Calming comfort meal for Saturday evening.'
        }
      ]
    },
    {
      dayNumber: 7,
      dayNameEn: 'Sunday',
      dayNameHi: 'रविवार',
      totalCalories: 1750,
      meals: [
        {
          mealType: 'breakfast',
          nameEn: 'Sprouted Moong Paratha (No Ghee Frying, Dry Toasted) + Dahi',
          nameHi: 'अंकुरित मूंग दाल स्टफ्ड पराठा (तवे पर सूखा सेंका) + दही',
          portion: '1 medium paratha + 1 katori fresh dahi',
          calories: 360,
          proteinG: 15,
          carbsG: 46,
          fatsG: 10,
          notes: 'Satisfying Sunday breakfast without trans-fats.'
        },
        {
          mealType: 'lunch',
          nameEn: 'Sarson/Palak Saag + Makki Roti (1 piece) + Yellow Dal + Salad',
          nameHi: 'सरसों/पालक का साग + 1 मक्के की रोटी + पीली दाल + प्याज टमाटर',
          portion: '1 bowl saag, 1 roti, 1 bowl dal, salad',
          calories: 580,
          proteinG: 20,
          carbsG: 78,
          fatsG: 16,
          notes: 'Lutein and zeaxanthin in dark leafy greens protect diabetic retinal capillaries.'
        },
        {
          mealType: 'snack',
          nameEn: 'Roasted Murmura (Puffed Rice) Bhel with Raw Mango & Peanuts',
          nameHi: 'कच्चे आम और भुनी मूंगफली वाली कुरकुरी झाल-मूरी / भेल',
          portion: '1 medium katori',
          calories: 180,
          proteinG: 5,
          carbsG: 28,
          fatsG: 5,
          notes: 'Flavorful light evening snack with minimal oil.'
        },
        {
          mealType: 'dinner',
          nameEn: 'Pumpkin (Kaddu) Sabzi + Whole Wheat Phulka (2) + Moong Dal Soup',
          nameHi: 'मीठे कद्दू की सादी सब्जी + 2 फुल्के + मूंग दाल सूप',
          portion: '1 bowl kaddu, 2 rotis, 1 bowl dal soup',
          calories: 490,
          proteinG: 16,
          carbsG: 64,
          fatsG: 12,
          notes: 'Light dinner sets optimal stage for Monday morning fasting glucose check.'
        }
      ]
    }
  ],
  groceryList: [
    {
      category: 'Grains & Millets (अनाज और मिलेट्स)',
      itemsEn: ['Jowar Flour (1 kg)', 'Bajra Flour (500g)', 'Foxtail Millet (1 kg)', 'Rolled Oats (1 kg)', 'Broken Wheat / Dalia (500g)'],
      itemsHi: ['ज्वार का आटा (1 किलो)', 'बाजरा आटा (500 ग्राम)', 'कंगनी मिलेट (1 किलो)', 'ओट्स (1 किलो)', 'दलिया (500 ग्राम)']
    },
    {
      category: 'Pulses & Legumes (दालें और अंकुरित)',
      itemsEn: ['Yellow Moong Dal (1 kg)', 'Whole Green Moong (for sprouting, 500g)', 'Kala Chana (500g)', 'Rajma (500g)', 'Besan / Gram Flour (1 kg)'],
      itemsHi: ['पीली मूंग दाल (1 किलो)', 'साबुत हरी मूंग (अंकुरित के लिए, 500 ग्राम)', 'काला चना (500 ग्राम)', 'राजमा (500 ग्राम)', 'बेसन (1 किलो)']
    },
    {
      category: 'Vegetables & Greens (सब्जियां और साग)',
      itemsEn: ['Methi leaves (2 bunches)', 'Palak / Spinach (2 bunches)', 'Lauki / Bottle Gourd (2 pieces)', 'Karela / Bitter Gourd (500g)', 'Coriander, Mint & Green Chillies'],
      itemsHi: ['ताजा मेथी (2 गड्डी)', 'पालक (2 गड्डी)', 'लौकी (2 मध्यम)', 'करेला (500 ग्राम)', 'हरा धनिया, पुदीना और हरी मिर्च']
    },
    {
      category: 'Dairy & Nuts (डेयरी और मेवे)',
      itemsEn: ['Low-fat Cow Milk (500ml/day)', 'Fresh Paneer (200g)', 'Almonds (250g)', 'Walnuts (150g)', 'Phool Makhana (200g)', 'Flaxseeds (100g)'],
      itemsHi: ['कम वसा वाला गाय का दूध', 'ताजा पनीर (200 ग्राम)', 'बादाम (250 ग्राम)', 'अखरोट (150 ग्राम)', 'फूल मखाना (200 ग्राम)', 'अलसी के बीज (100 ग्राम)']
    }
  ],
  generatedAt: '2026-08-16T10:00:00.000Z'
};

export const INITIAL_SHARE_LINKS: ShareLink[] = [
  {
    id: 'share-001',
    profileId: 'prof-ramesh',
    token: 'doc-share-7f89b21a',
    passcodeHash: '1234',
    expiresAt: '2026-10-15T23:59:59.000Z',
    isRevoked: false,
    includeAllReports: true,
    viewCount: 2,
    createdAt: '2026-10-01T10:00:00.000Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-001',
    userId: 'user-primary',
    action: 'view_report',
    resourceType: 'report',
    resourceId: 'rep-001',
    timestamp: '2026-10-02T12:00:00.000Z',
    metadata: { profile: 'Ramesh Sharma' }
  },
  {
    id: 'aud-002',
    userId: 'user-primary',
    action: 'share_created',
    resourceType: 'share_link',
    resourceId: 'share-001',
    timestamp: '2026-10-01T10:00:00.000Z',
    metadata: { expiresInHours: 360, passcodeProtected: true }
  }
];

export const INITIAL_CONSENT_LOGS: ConsentLog[] = [
  {
    id: 'con-001',
    userId: 'user-primary',
    purpose: 'ocr_extraction_and_diet_guidance',
    isGranted: true,
    recordedAt: '2026-01-01T00:00:00.000Z'
  }
];

// In-Memory Storage Manager (Safe for both Server Routes and Client Hydration)
class StorageManager {
  private profiles: UserProfile[] = [...INITIAL_PROFILES];
  private reports: Report[] = [...INITIAL_REPORTS];
  private measurements: Measurement[] = [...INITIAL_MEASUREMENTS];
  private reminders: Reminder[] = [...INITIAL_REMINDERS];
  private dietProfiles: Record<string, DietProfile> = {
    'prof-ramesh': { ...INITIAL_DIET_PROFILE }
  };
  private dietPlans: Record<string, DietPlan> = {
    'prof-ramesh': { ...INITIAL_DIET_PLAN }
  };
  private shareLinks: ShareLink[] = [...INITIAL_SHARE_LINKS];
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  private consentLogs: ConsentLog[] = [...INITIAL_CONSENT_LOGS];

  // Profiles
  getProfiles(): UserProfile[] {
    return this.profiles;
  }

  getProfile(id: string): UserProfile | undefined {
    return this.profiles.find(p => p.id === id);
  }

  addProfile(profile: Omit<UserProfile, 'id' | 'createdAt'>): UserProfile {
    const newProfile: UserProfile = {
      ...profile,
      id: `prof-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.profiles.push(newProfile);
    this.logAudit('create_profile', 'profile', newProfile.id, { name: newProfile.name });
    return newProfile;
  }

  // Reports
  getReports(profileId?: string, includeDeleted = false): Report[] {
    return this.reports.filter(r => {
      const matchProfile = profileId ? r.profileId === profileId : true;
      const matchDeleted = includeDeleted ? true : !r.isDeleted;
      return matchProfile && matchDeleted;
    });
  }

  getReport(id: string): Report | undefined {
    return this.reports.find(r => r.id === id);
  }

  addReport(report: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>): Report {
    const newReport: Report = {
      ...report,
      id: `rep-${Date.now()}`,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.reports.unshift(newReport);
    this.logAudit('upload_report', 'report', newReport.id, { title: newReport.title });
    return newReport;
  }

  softDeleteReport(id: string): boolean {
    const report = this.reports.find(r => r.id === id);
    if (!report) return false;
    report.isDeleted = true;
    report.deletedAt = new Date().toISOString();
    report.updatedAt = new Date().toISOString();
    this.logAudit('soft_delete_report', 'report', id, { title: report.title });
    return true;
  }

  restoreReport(id: string): boolean {
    const report = this.reports.find(r => r.id === id);
    if (!report) return false;
    report.isDeleted = false;
    delete report.deletedAt;
    report.updatedAt = new Date().toISOString();
    this.logAudit('restore_report', 'report', id, { title: report.title });
    return true;
  }

  permanentDeleteReport(id: string): boolean {
    const index = this.reports.findIndex(r => r.id === id);
    if (index === -1) return false;
    const [deleted] = this.reports.splice(index, 1);
    // Also remove associated measurements
    this.measurements = this.measurements.filter(m => m.reportId !== id);
    this.logAudit('permanent_delete_report', 'report', id, { title: deleted.title });
    return true;
  }

  // Measurements
  getMeasurements(profileId: string): Measurement[] {
    return this.measurements
      .filter(m => m.profileId === profileId)
      .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime());
  }

  addMeasurements(measurements: Omit<Measurement, 'id'>[]): Measurement[] {
    const added: Measurement[] = measurements.map((m, idx) => ({
      ...m,
      id: `m-${Date.now()}-${idx}`
    }));
    this.measurements.push(...added);
    this.logAudit('save_measurements', 'measurement_batch', undefined, { count: added.length });
    return added;
  }

  // Reminders
  getReminders(profileId: string): Reminder[] {
    return this.reminders.filter(r => r.profileId === profileId);
  }

  updateReminderStatus(id: string, status: 'done' | 'snoozed' | 'skipped' | 'pending'): boolean {
    const rem = this.reminders.find(r => r.id === id);
    if (!rem) return false;
    rem.status = status;
    if (status === 'done') {
      rem.lastLoggedDate = new Date().toISOString().split('T')[0];
      const nextDate = new Date();
      nextDate.setMonth(nextDate.getMonth() + rem.frequencyMonths);
      rem.nextDueDate = nextDate.toISOString().split('T')[0];
    }
    this.logAudit('update_reminder', 'reminder', id, { status });
    return true;
  }

  // Diet
  getDietProfile(profileId: string): DietProfile | undefined {
    return this.dietProfiles[profileId];
  }

  saveDietProfile(profile: DietProfile): void {
    this.dietProfiles[profile.profileId] = profile;
    this.logAudit('update_diet_profile', 'diet_profile', profile.profileId);
  }

  getDietPlan(profileId: string): DietPlan | undefined {
    return this.dietPlans[profileId];
  }

  saveDietPlan(plan: DietPlan): void {
    this.dietPlans[plan.profileId] = plan;
    this.logAudit('generate_diet_plan', 'diet_plan', plan.id);
  }

  // Share Links
  createShareLink(profileId: string, hoursValid: number, passcode?: string): ShareLink {
    const expires = new Date();
    expires.setHours(expires.getHours() + hoursValid);
    const link: ShareLink = {
      id: `share-${Date.now()}`,
      profileId,
      token: `med-share-${Math.random().toString(36).substring(2, 10)}`,
      passcodeHash: passcode || undefined,
      expiresAt: expires.toISOString(),
      isRevoked: false,
      includeAllReports: true,
      viewCount: 0,
      createdAt: new Date().toISOString()
    };
    this.shareLinks.push(link);
    this.logAudit('create_share_link', 'share_link', link.id, { hoursValid, hasPasscode: !!passcode });
    return link;
  }

  getShareLink(token: string): ShareLink | undefined {
    const link = this.shareLinks.find(l => l.token === token && !l.isRevoked);
    if (link) {
      if (new Date(link.expiresAt).getTime() < Date.now()) {
        return undefined; // Expired
      }
      link.viewCount += 1;
      this.logAudit('access_share_link', 'share_link', link.id);
    }
    return link;
  }

  revokeShareLink(id: string): boolean {
    const link = this.shareLinks.find(l => l.id === id);
    if (!link) return false;
    link.isRevoked = true;
    this.logAudit('revoke_share_link', 'share_link', id);
    return true;
  }

  getShareLinksForProfile(profileId: string): ShareLink[] {
    return this.shareLinks.filter(l => l.profileId === profileId);
  }

  // Audit & Consent
  logAudit(action: string, resourceType: string, resourceId?: string, metadata?: Record<string, any>): void {
    this.auditLogs.unshift({
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: 'user-primary',
      action,
      resourceType,
      resourceId,
      timestamp: new Date().toISOString(),
      metadata
    });
  }

  getAuditLogs(): AuditLog[] {
    return this.auditLogs.slice(0, 50);
  }

  logConsent(purpose: string, isGranted: boolean): void {
    this.consentLogs.push({
      id: `con-${Date.now()}`,
      userId: 'user-primary',
      purpose,
      isGranted,
      recordedAt: new Date().toISOString()
    });
    this.logAudit('consent_updated', 'consent', undefined, { purpose, isGranted });
  }

  getConsentLogs(): ConsentLog[] {
    return this.consentLogs;
  }
}

// Global Singleton Instance
export const storage = new StorageManager();
