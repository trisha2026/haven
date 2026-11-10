export type DoseOutcome = 'administered' | 'pending' | 'overdue' | 'refused' | 'withheld' | 'missed';
export type PrescriptionStatus = 'active' | 'under_review' | 'paused' | 'discontinued';

export interface FacilityPrescription {
  id: string; // e.g. "RX-2026-088"
  version: number;
  residentId: string;
  residentName: string;
  room: string;
  wing: string;
  medicationName: string;
  genericName: string;
  strength: string;
  dosage: string;
  route: string;
  frequency: string;
  timing: string[];
  prescribingDoctor: string;
  doctorLicense: string;
  authorizedDate: string;
  startDate: string;
  endDate: string;
  status: PrescriptionStatus;
  instructions: string;
  batchNumber: string;
  indication: string;
  versionHistory: {
    version: number;
    authorizedDate: string;
    doctorName: string;
    changeReason: string;
  }[];
}

export interface EmarDoseRecord {
  id: string; // e.g. "DOSE-101"
  prescriptionId: string;
  residentId: string;
  residentName: string;
  room: string;
  roomNumber?: string;
  wing: string;
  medicationName: string;
  dosage?: string;
  route?: string;
  scheduledTime: string;
  scheduledSlot: 'Morning (08:00)' | 'Noon (12:00)' | 'Evening (18:00)' | 'Night (21:00)' | string;
  slot?: string;
  outcome: DoseOutcome;
  status?: DoseOutcome | string;
  administeredTime?: string;
  administeredAt?: string;
  administeredBy?: string;
  caregiverRole?: string;
  witnessedBy?: string;
  exceptionReason?: string;
  notes?: string;
  clinicalNotes?: string;
  vitalsAtAdministration?: {
    bp?: string;
    pulse?: number;
    glucose?: number;
  };
}

export interface ActivePrescription {
  id: string;
  prescriptionNumber: string;
  residentId: string;
  residentName: string;
  roomNumber: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  route: string;
  prescribedBy: string;
  startDate: string;
  reviewDueDate: string;
  status: string;
  history: { version: number; dosage: string; revisedAt: string; revisedBy: string; reason: string }[];
}

export const MOCK_PRESCRIPTIONS: FacilityPrescription[] = [
  {
    id: 'RX-2026-041',
    version: 2,
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    medicationName: 'Lisinopril',
    genericName: 'Lisinopril Anhydrous',
    strength: '10mg',
    dosage: '1 Tablet',
    route: 'Oral (PO)',
    frequency: 'Once Daily',
    timing: ['10:00 AM'],
    prescribingDoctor: 'Dr. Anita Mehta, MD',
    doctorLicense: 'KMC-88391',
    authorizedDate: 'Oct 15, 2026',
    startDate: 'Apr 04, 2024',
    endDate: 'Apr 04, 2027',
    status: 'active',
    instructions: 'Take 1 tablet with water. Hold if systolic BP is under 100 mmHg.',
    batchNumber: 'LIS-991-IN',
    indication: 'Essential Hypertension & Renal Protection',
    versionHistory: [
      { version: 1, authorizedDate: 'Apr 04, 2024', doctorName: 'Dr. Anita Mehta, MD', changeReason: 'Initial prescription at 5mg daily' },
      { version: 2, authorizedDate: 'Oct 15, 2026', doctorName: 'Dr. Anita Mehta, MD', changeReason: 'Titrated up to 10mg daily following cardiology consult' },
    ],
  },
  {
    id: 'RX-2026-042',
    version: 1,
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    medicationName: 'Metformin Extended Release',
    genericName: 'Metformin Hydrochloride ER',
    strength: '500mg',
    dosage: '1 Tablet',
    route: 'Oral (PO)',
    frequency: 'Twice Daily',
    timing: ['08:30 AM', '20:30 PM'],
    prescribingDoctor: 'Dr. Anita Mehta, MD',
    doctorLicense: 'KMC-88391',
    authorizedDate: 'May 02, 2025',
    startDate: 'May 02, 2025',
    endDate: 'May 02, 2027',
    status: 'active',
    instructions: 'Administer immediately after meals to reduce GI irritation.',
    batchNumber: 'MTF-2026-B4',
    indication: 'Type 2 Diabetes Mellitus',
    versionHistory: [
      { version: 1, authorizedDate: 'May 02, 2025', doctorName: 'Dr. Anita Mehta, MD', changeReason: 'Initial diabetic maintenance schedule' },
    ],
  },
  {
    id: 'RX-2026-044',
    version: 3,
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    room: 'Room 108-A',
    wing: 'Orchard Meadow',
    medicationName: 'Amlodipine Besylate',
    genericName: 'Amlodipine',
    strength: '5mg',
    dosage: '1 Tablet (Crushed in apple puree)',
    route: 'Oral with Puree',
    frequency: 'Once Daily',
    timing: ['08:00 AM'],
    prescribingDoctor: 'Dr. Anita Mehta, MD',
    doctorLicense: 'KMC-88391',
    authorizedDate: 'Today, 09:15 AM',
    startDate: 'Aug 12, 2023',
    endDate: 'Aug 12, 2027',
    status: 'active',
    instructions: 'Check sitting BP prior to administration. Crush and mix with thick applesauce.',
    batchNumber: 'AML-441-B',
    indication: 'Hypertension',
    versionHistory: [
      { version: 1, authorizedDate: 'Aug 12, 2023', doctorName: 'Dr. Anita Mehta, MD', changeReason: 'Baseline admission prescription' },
      { version: 2, authorizedDate: 'Mar 10, 2025', doctorName: 'Dr. Anita Mehta, MD', changeReason: 'Dose schedule shifted to morning' },
      { version: 3, authorizedDate: 'Today, 09:15 AM', doctorName: 'Dr. Anita Mehta, MD', changeReason: 'Dysphagia crushing protocol authorized post-fall' },
    ],
  },
  {
    id: 'RX-2026-045',
    version: 1,
    residentId: 'RES-042',
    residentName: 'Vikram Hegde',
    room: 'Room 112',
    wing: 'Sunrise Pavilion',
    medicationName: 'Carboxymethylcellulose 0.5% Drops',
    genericName: 'Carboxymethylcellulose Sodium',
    strength: '0.5%',
    dosage: '1-2 Drops in both eyes',
    route: 'Ophthalmic',
    frequency: 'Morning & Evening',
    timing: ['10:15 AM', '18:15 PM'],
    prescribingDoctor: 'Dr. Anita Mehta, MD',
    doctorLicense: 'KMC-88391',
    authorizedDate: 'Jul 10, 2025',
    startDate: 'Jul 10, 2025',
    endDate: 'Jul 10, 2027',
    status: 'active',
    instructions: 'Comfort lubricating eye drops for dry eyes. Resident may gently close eyes for 30s.',
    batchNumber: 'EYE-112-C',
    indication: 'Dry Eye Syndrome',
    versionHistory: [
      { version: 1, authorizedDate: 'Jul 10, 2025', doctorName: 'Dr. Anita Mehta, MD', changeReason: 'Comfort eye care order' },
    ],
  },
  {
    id: 'RX-2026-046',
    version: 2,
    residentId: 'RES-042',
    residentName: 'Vikram Hegde',
    room: 'Room 112',
    wing: 'Sunrise Pavilion',
    medicationName: 'Donepezil Hydrochloride',
    genericName: 'Donepezil',
    strength: '10mg',
    dosage: '1 Tablet',
    route: 'Oral (PO)',
    frequency: 'Bedtime',
    timing: ['21:00 PM'],
    prescribingDoctor: 'Dr. Meenakshi Sundaram, MD',
    doctorLicense: 'KMC-52194',
    authorizedDate: 'Jan 15, 2026',
    startDate: 'Sep 18, 2023',
    endDate: 'Sep 18, 2027',
    status: 'active',
    instructions: 'Take at bedtime with half a glass of warm water.',
    batchNumber: 'DON-881-A',
    indication: 'Alzheimer\'s Type Cognitive Impairment',
    versionHistory: [
      { version: 1, authorizedDate: 'Sep 18, 2023', doctorName: 'Dr. Anita Mehta, MD', changeReason: 'Initial 5mg dose' },
      { version: 2, authorizedDate: 'Jan 15, 2026', doctorName: 'Dr. Meenakshi Sundaram, MD', changeReason: 'Stepped up to 10mg maintenance' },
    ],
  },
  {
    id: 'RX-2026-047',
    version: 1,
    residentId: 'RES-043',
    residentName: 'Nandini Iyer',
    room: 'Suite 301',
    wing: 'Highland Haven',
    medicationName: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    strength: '10mg',
    dosage: '1 Tablet',
    route: 'Oral (PO)',
    frequency: 'Nightly',
    timing: ['21:30 PM'],
    prescribingDoctor: 'Dr. Karthik Srinivasan, MD',
    doctorLicense: 'KMC-61842',
    authorizedDate: 'Jan 12, 2026',
    startDate: 'Jan 10, 2024',
    endDate: 'Jan 10, 2027',
    status: 'active',
    instructions: 'Take after dinner. Routine annual lipid panel scheduled for January 2027.',
    batchNumber: 'ATO-770-IN',
    indication: 'Hypercholesterolemia Prophylaxis',
    versionHistory: [
      { version: 1, authorizedDate: 'Jan 12, 2026', doctorName: 'Dr. Karthik Srinivasan, MD', changeReason: 'Routine annual renewal' },
    ],
  },
];

export const MOCK_EMAR_DOSES: EmarDoseRecord[] = [
  {
    id: 'DOSE-101',
    prescriptionId: 'RX-2026-044',
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    room: 'Room 108-A',
    wing: 'Orchard Meadow',
    medicationName: 'Amlodipine Besylate 5mg',
    scheduledTime: '08:00 AM',
    scheduledSlot: 'Morning (08:00)',
    outcome: 'administered',
    administeredTime: '08:05 AM',
    administeredBy: 'Deepak Gowda',
    caregiverRole: 'Nurse Practitioner',
    vitalsAtAdministration: { bp: '138/82', pulse: 74 },
    clinicalNotes: 'Mixed with applesauce as per dysphagia order. Ingested without difficulty.',
  },
  {
    id: 'DOSE-102',
    prescriptionId: 'RX-2026-042',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    medicationName: 'Metformin ER 500mg',
    scheduledTime: '08:30 AM',
    scheduledSlot: 'Morning (08:00)',
    outcome: 'administered',
    administeredTime: '08:35 AM',
    administeredBy: 'Priya Shetty',
    caregiverRole: 'Senior Registered Nurse',
    vitalsAtAdministration: { glucose: 134, pulse: 72 },
    clinicalNotes: 'Taken post breakfast tray.',
  },
  {
    id: 'DOSE-103',
    prescriptionId: 'RX-2026-041',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    medicationName: 'Lisinopril 10mg',
    scheduledTime: '10:00 AM',
    scheduledSlot: 'Morning (08:00)',
    outcome: 'overdue',
    exceptionReason: 'Primary RN delayed due to resident emergency transfer in East corridor. Secondary nurse notified.',
    clinicalNotes: 'Critical cardio medication. Tolerance window is 60 minutes. Handover active to Rahul Patil.',
  },
  {
    id: 'DOSE-104',
    prescriptionId: 'RX-2026-045',
    residentId: 'RES-042',
    residentName: 'Vikram Hegde',
    room: 'Room 112',
    wing: 'Sunrise Pavilion',
    medicationName: 'Carboxymethylcellulose 0.5% Drops',
    scheduledTime: '10:15 AM',
    scheduledSlot: 'Morning (08:00)',
    outcome: 'refused',
    administeredBy: 'Rahul Patil',
    caregiverRole: 'Licensed Practical Nurse',
    exceptionReason: 'Resident politely declined citing slight ocular stinging yesterday. Eyes inspected; no erythema.',
    clinicalNotes: 'Non-critical comfort medication. Optometry consult scheduled for Thursday review.',
  },
  {
    id: 'DOSE-105',
    prescriptionId: 'RX-2026-048',
    residentId: 'RES-029',
    residentName: 'Suresh Menon',
    room: 'Room 102-A',
    wing: 'Orchard Meadow',
    medicationName: 'Metoprolol Tartrate 25mg',
    scheduledTime: '09:00 AM',
    scheduledSlot: 'Morning (08:00)',
    outcome: 'withheld',
    administeredBy: 'Deepak Gowda',
    caregiverRole: 'Nurse Practitioner',
    exceptionReason: 'Pre-dose pulse was 54 bpm (protocol threshold: hold if HR < 60 bpm).',
    clinicalNotes: 'Dr. Anita Mehta notified. Vitals recheck planned for 12:00 PM.',
    vitalsAtAdministration: { bp: '112/68', pulse: 54 },
  },
  {
    id: 'DOSE-106',
    prescriptionId: 'RX-2026-046',
    residentId: 'RES-042',
    residentName: 'Vikram Hegde',
    room: 'Room 112',
    wing: 'Sunrise Pavilion',
    medicationName: 'Donepezil HCl 10mg',
    scheduledTime: '21:00 PM',
    scheduledSlot: 'Night (21:00)',
    outcome: 'pending',
    clinicalNotes: 'Scheduled evening dose with caregiver nighttime tea round.',
  },
  {
    id: 'DOSE-107',
    prescriptionId: 'RX-2026-047',
    residentId: 'RES-043',
    residentName: 'Nandini Iyer',
    room: 'Suite 301',
    wing: 'Highland Haven',
    medicationName: 'Atorvastatin 10mg',
    scheduledTime: '21:30 PM',
    scheduledSlot: 'Night (21:00)',
    outcome: 'pending',
    clinicalNotes: 'Resident on leave with family; family provided with weekend dose container and dosage sign-off sheet.',
  },
];

// Augment eMAR records
MOCK_EMAR_DOSES.forEach((d) => {
  d.roomNumber = d.room;
  d.slot = d.scheduledSlot;
  d.status = d.outcome;
  d.dosage = '1 Tablet';
  d.route = 'Oral';
  d.administeredAt = d.administeredTime;
  d.notes = d.exceptionReason || d.clinicalNotes;
});

export const MOCK_ACTIVE_PRESCRIPTIONS: ActivePrescription[] = MOCK_PRESCRIPTIONS.map((rx) => ({
  id: rx.id,
  prescriptionNumber: rx.id,
  residentId: rx.residentId,
  residentName: rx.residentName,
  roomNumber: rx.room,
  medicationName: rx.medicationName,
  dosage: `${rx.strength} (${rx.dosage})`,
  frequency: rx.frequency,
  route: rx.route,
  prescribedBy: rx.prescribingDoctor,
  startDate: rx.startDate,
  reviewDueDate: rx.endDate,
  status: rx.status,
  history: rx.versionHistory.map((vh) => ({
    version: vh.version,
    dosage: rx.dosage,
    revisedAt: vh.authorizedDate,
    revisedBy: vh.doctorName,
    reason: vh.changeReason,
  })),
}));

