import { ParameterDefinition, BiomarkerStatus } from './types';

export const CLINICAL_PARAMETERS: ParameterDefinition[] = [
  {
    code: 'hba1c',
    nameEn: 'HbA1c (Glycated Hemoglobin)',
    nameHi: 'एचबीए1सी (ग्लिकेटेड हीमोग्लोबिन)',
    category: 'diabetes',
    unit: '%',
    minNormal: 4.0,
    maxNormal: 5.6,
    criticalLow: 3.5,
    criticalHigh: 10.0,
    descriptionEn: 'Measures your average blood sugar levels over the past 2 to 3 months. Normal: below 5.7%, Prediabetes: 5.7%-6.4%, Diabetes: 6.5% and above.',
    descriptionHi: 'पिछले 2 से 3 महीनों में आपके औसत रक्त शर्करा स्तर को मापता है। सामान्य: 5.7% से कम, प्रीडायबिटीज: 5.7%-6.4%, डायबिटीज: 6.5% या अधिक।'
  },
  {
    code: 'fbs',
    nameEn: 'Fasting Blood Sugar (FBS)',
    nameHi: 'फास्टिंग ब्लड शुगर (खाली पेट)',
    category: 'diabetes',
    unit: 'mg/dL',
    minNormal: 70,
    maxNormal: 99,
    criticalLow: 50,
    criticalHigh: 300,
    descriptionEn: 'Blood glucose level after an overnight fast (8-10 hours). Normal: 70-99 mg/dL. Prediabetes: 100-125 mg/dL.',
    descriptionHi: 'रातभर (8-10 घंटे) भूखे पेट रहने के बाद रक्त शर्करा। सामान्य: 70-99 mg/dL।'
  },
  {
    code: 'ppbs',
    nameEn: 'Post Prandial Blood Sugar (PPBS)',
    nameHi: 'पीपी ब्लड शुगर (खाने के 2 घंटे बाद)',
    category: 'diabetes',
    unit: 'mg/dL',
    minNormal: 80,
    maxNormal: 140,
    criticalLow: 60,
    criticalHigh: 350,
    descriptionEn: 'Glucose level taken 2 hours after a meal. Normal: under 140 mg/dL.',
    descriptionHi: 'भोजन के ठीक 2 घंटे बाद का शर्करा स्तर। सामान्य: 140 mg/dL से कम।'
  },
  {
    code: 'chol_total',
    nameEn: 'Total Cholesterol',
    nameHi: 'कुल कोलेस्ट्रॉल',
    category: 'lipid',
    unit: 'mg/dL',
    minNormal: 125,
    maxNormal: 200,
    criticalHigh: 300,
    descriptionEn: 'Total amount of cholesterol found in blood. Desirable: under 200 mg/dL.',
    descriptionHi: 'रक्त में मौजूद कुल कोलेस्ट्रॉल की मात्रा। वांछनीय: 200 mg/dL से कम।'
  },
  {
    code: 'chol_ldl',
    nameEn: 'LDL Cholesterol (Bad)',
    nameHi: 'एलडीएल कोलेस्ट्रॉल (खराब वसा)',
    category: 'lipid',
    unit: 'mg/dL',
    minNormal: 50,
    maxNormal: 100,
    criticalHigh: 190,
    descriptionEn: 'Low-density lipoprotein can build up plaque in arteries. Optimal: below 100 mg/dL.',
    descriptionHi: 'यह धमनियों में रुकावट पैदा कर सकता है। सबसे बेहतर: 100 mg/dL से कम।'
  },
  {
    code: 'chol_hdl',
    nameEn: 'HDL Cholesterol (Good)',
    nameHi: 'एचडीएल कोलेस्ट्रॉल (अच्छा वसा)',
    category: 'lipid',
    unit: 'mg/dL',
    minNormal: 40,
    maxNormal: 60,
    criticalLow: 25,
    descriptionEn: 'High-density lipoprotein protects cardiovascular health by carrying bad cholesterol away. Healthy: 40+ mg/dL for men, 50+ for women.',
    descriptionHi: 'यह हृदय के स्वास्थ्य की रक्षा करता है। पुरुषों में 40+ और महिलाओं में 50+ mg/dL सुरक्षित माना जाता है।'
  },
  {
    code: 'triglycerides',
    nameEn: 'Triglycerides',
    nameHi: 'ट्राइग्लिसराइड्स',
    category: 'lipid',
    unit: 'mg/dL',
    minNormal: 50,
    maxNormal: 150,
    criticalHigh: 500,
    descriptionEn: 'Fat type used for energy storage. Elevated levels often correlate with refined carb intake and metabolic syndrome.',
    descriptionHi: 'यह शरीर में वसा का एक प्रकार है। मीठा और तला-भुना खाने से यह तेजी से बढ़ता है। सामान्य: 150 mg/dL से कम।'
  },
  {
    code: 'tsh',
    nameEn: 'TSH (Thyroid Stimulating Hormone)',
    nameHi: 'टीएसएच (थायरॉयड हार्मोन)',
    category: 'thyroid',
    unit: 'μIU/mL',
    minNormal: 0.4,
    maxNormal: 4.5,
    criticalLow: 0.05,
    criticalHigh: 15.0,
    descriptionEn: 'Pituitary hormone regulating thyroid function. High TSH indicates underactive thyroid (hypothyroidism).',
    descriptionHi: 'थायरॉयड ग्रंथि के कार्य को नियंत्रित करता है। उच्च टीएसएच हाइपोथायरायडिज्म का संकेत देता है।'
  },
  {
    code: 'creatinine',
    nameEn: 'Serum Creatinine',
    nameHi: 'सीरम क्रिएटिनिन (किडनी फंक्शन)',
    category: 'renal',
    unit: 'mg/dL',
    minNormal: 0.6,
    maxNormal: 1.2,
    criticalLow: 0.3,
    criticalHigh: 4.0,
    descriptionEn: 'Waste byproduct filtered by kidneys. Higher levels indicate diminished kidney filtration efficiency.',
    descriptionHi: 'गुर्दे (किडनी) की कार्यप्रणाली का मुख्य सूचक। स्तर बढ़ना गुर्दे की कमजोरी दर्शाता है।'
  },
  {
    code: 'hemoglobin',
    nameEn: 'Hemoglobin (Hb)',
    nameHi: 'हीमोग्लोबिन',
    category: 'hematology',
    unit: 'g/dL',
    minNormal: 12.0,
    maxNormal: 16.5,
    criticalLow: 7.0,
    criticalHigh: 20.0,
    descriptionEn: 'Iron-rich protein in red blood cells that carries oxygen throughout the body. Low indicates anemia.',
    descriptionHi: 'लाल रक्त कोशिकाओं में ऑक्सीजन ले जाने वाला प्रोटीन। कम स्तर एनीमिया (खून की कमी) दर्शाता है।'
  },
  {
    code: 'vit_d',
    nameEn: 'Vitamin D (25-OH)',
    nameHi: 'विटामिन डी (25-ओएच)',
    category: 'vitamins',
    unit: 'ng/mL',
    minNormal: 30,
    maxNormal: 100,
    criticalLow: 10,
    descriptionEn: 'Vital for bone density, calcium absorption, and immune function. Very commonly deficient in Indian populations.',
    descriptionHi: 'हड्डियों की मजबूती और रोग प्रतिरोधक क्षमता के लिए आवश्यक। भारतीय आबादी में इसकी भारी कमी देखी जाती है।'
  },
  {
    code: 'vit_b12',
    nameEn: 'Vitamin B12',
    nameHi: 'विटामिन बी12',
    category: 'vitamins',
    unit: 'pg/mL',
    minNormal: 211,
    maxNormal: 911,
    criticalLow: 150,
    descriptionEn: 'Crucial for nerve health and RBC formation. Frequently depleted in vegetarian and vegan diets.',
    descriptionHi: 'तंत्रिका तंत्र और रक्त निर्माण के लिए जरूरी। शाकाहारी आहार लेने वालों में अक्सर कम पाया जाता है।'
  },
  {
    code: 'bp_systolic',
    nameEn: 'Blood Pressure (Systolic)',
    nameHi: 'ब्लड प्रेशर (सिस्टोलिक - ऊपर का)',
    category: 'vitals',
    unit: 'mmHg',
    minNormal: 90,
    maxNormal: 120,
    criticalLow: 80,
    criticalHigh: 180,
    descriptionEn: 'Pressure in blood vessels during heart contractions. Normal: below 120 mmHg.',
    descriptionHi: 'हृदय संकुचन के समय रक्तचाप। सामान्य: 120 mmHg से कम।'
  },
  {
    code: 'bp_diastolic',
    nameEn: 'Blood Pressure (Diastolic)',
    nameHi: 'ब्लड प्रेशर (डायस्टोलिक - नीचे का)',
    category: 'vitals',
    unit: 'mmHg',
    minNormal: 60,
    maxNormal: 80,
    criticalLow: 50,
    criticalHigh: 120,
    descriptionEn: 'Pressure in blood vessels when heart rests between beats. Normal: below 80 mmHg.',
    descriptionHi: 'हृदय आराम की स्थिति में रक्तचाप। सामान्य: 80 mmHg से कम।'
  },
  {
    code: 'weight',
    nameEn: 'Body Weight',
    nameHi: 'शरीर का वजन',
    category: 'vitals',
    unit: 'kg',
    minNormal: 45,
    maxNormal: 85,
    descriptionEn: 'Total body mass in kilograms.',
    descriptionHi: 'किलोग्राम में शरीर का कुल वजन।'
  }
];

export function evaluateBiomarkerStatus(code: string, value: number): BiomarkerStatus {
  const param = CLINICAL_PARAMETERS.find(p => p.code === code);
  if (!param) return 'normal';

  if (param.criticalHigh && value >= param.criticalHigh) return 'critical';
  if (param.criticalLow && value <= param.criticalLow) return 'critical';

  if (value > param.maxNormal) {
    const margin = (param.maxNormal - param.minNormal) * 0.15;
    if (value <= param.maxNormal + margin) return 'borderline_high';
    return 'high';
  }

  if (value < param.minNormal) {
    const margin = (param.maxNormal - param.minNormal) * 0.15;
    if (value >= param.minNormal - margin) return 'borderline_low';
    return 'low';
  }

  return 'normal';
}

export function getStatusColor(status: BiomarkerStatus): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  labelEn: string;
  labelHi: string;
} {
  switch (status) {
    case 'normal':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-800',
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
        labelEn: 'Normal',
        labelHi: 'सामान्य'
      };
    case 'borderline_high':
    case 'borderline_low':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-800',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
        labelEn: 'Borderline',
        labelHi: 'सीमांत'
      };
    case 'high':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-700 dark:text-rose-300',
        border: 'border-rose-200 dark:border-rose-800',
        badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
        labelEn: 'High',
        labelHi: 'अधिक'
      };
    case 'low':
      return {
        bg: 'bg-indigo-50 dark:bg-indigo-950/40',
        text: 'text-indigo-700 dark:text-indigo-300',
        border: 'border-indigo-200 dark:border-indigo-800',
        badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
        labelEn: 'Low',
        labelHi: 'कम'
      };
    case 'critical':
      return {
        bg: 'bg-red-100 dark:bg-red-950/70',
        text: 'text-red-900 dark:text-red-200',
        border: 'border-red-400 dark:border-red-700 animate-pulse',
        badge: 'bg-red-600 text-white dark:bg-red-700 dark:text-white',
        labelEn: 'Critical (Consult Doctor)',
        labelHi: 'अति गंभीर (डॉक्टर से मिलें)'
      };
  }
}
