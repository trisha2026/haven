/**
 * HAVEN — Elderly Care & Facility Management System
 * Comprehensive Doctor Workspace Mock Dataset
 *
 * Active Practitioner: Dr. Anita Mehta, MD, FICP
 * Registration: KMC-88391 (Karnataka Medical Council - Demonstration Reference)
 * Facility: HAVEN Anandam Care Residence, Bengaluru
 * Role: Lead Attending Physician / Consultant Geriatrician
 * Affiliation: HAVEN Clinical Directorate & Manipal Hospital, Bengaluru
 */

import { MOCK_FULL_RESIDENTS } from './residentsData.ts';
import type { FullResident, FacilityWing } from '../types/resident.ts';

export interface DoctorClinicalNote {
  id: string; // e.g. "NOTE-2026-041"
  residentId: string;
  residentName: string;
  room: string;
  wing: FacilityWing;
  type:
    | 'Progress Note'
    | 'Initial Assessment'
    | 'Follow-up Assessment'
    | 'Medication Review'
    | 'Post-Incident Assessment'
    | 'Specialist Consultation'
    | 'Discharge / Transfer Summary';
  authorName: string;
  authorRole: string;
  authorKmc: string;
  date: string;
  time: string;
  status: 'draft' | 'signed' | 'amended';
  subjectiveObservations: string;
  objectiveFindings: {
    bp: string;
    pulse: number;
    spo2: number;
    temp?: string;
    bloodGlucose?: string;
    weight?: string;
  };
  clinicalAssessment: string;
  carePlanDirective: string;
  followUpInstructions: string;
  relatedMedicationOrIncident?: string;
  signedAt?: string;
  addenda?: {
    id: string;
    timestamp: string;
    author: string;
    text: string;
    reason: string;
  }[];
}

export interface DoctorTask {
  id: string; // e.g. "DOC-TSK-101"
  residentId: string;
  residentName: string;
  room: string;
  wing: FacilityWing;
  category:
    | 'Resident Review'
    | 'Prescription Review'
    | 'Medication Exception'
    | 'Incident Review'
    | 'Lab Follow-up'
    | 'Consultation';
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'normal' | 'routine';
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedDoctor: string;
  relatedRecordUrl: string;
  completedAt?: string;
  completedNotes?: string;
}

export interface DoctorAccessGrant {
  id: string; // e.g. "GRT-2026-08"
  requestId: string;
  residentId: string;
  residentName: string;
  room: string;
  wing: FacilityWing;
  doctorId: string;
  doctorName: string;
  clinicalPurpose: string;
  accessLevel: 'read_only' | 'full_clinical';
  status: 'active' | 'expired' | 'revoked';
  grantedBy: string;
  grantedAt: string;
  expiresAt: string;
  isEmergencyBreakGlass: boolean;
  notes: string;
}

export interface ClinicalDocument {
  id: string; // e.g. "DOC-CLIN-01"
  residentId: string;
  residentName: string;
  title: string;
  category: 'Diagnostic Lab Report' | 'Cardiology ECG' | 'Discharge Summary' | 'Advance Directive (DNR)' | 'Radiology X-Ray';
  uploadDate: string;
  uploadedBy: string;
  fileSize: string;
  status: 'verified' | 'review_required';
  summary: string;
  referenceNumber: string;
}

// -------------------------------------------------------------------------
// ACTIVE DOCTOR PROFILE
// -------------------------------------------------------------------------

export const ACTIVE_DOCTOR = {
  id: 'DOC-001',
  userId: 'USR-D-0031',
  fullName: 'Dr. Anita Mehta',
  preferredName: 'Dr. Anita',
  title: 'MD, FICP · Lead Geriatrician',
  specialty: 'Geriatric Medicine',
  registrationNumber: 'KMC-88391',
  registrationCouncil: 'Karnataka Medical Council (NMC Registered · Demonstration Reference)',
  verificationStatus: 'verified' as const,
  hospitalAffiliation: 'HAVEN Clinical Directorate & Manipal Hospital, Bengaluru',
  email: 'anita.mehta@haven-care.in.example',
  phone: '+91 94480 12471',
  facility: 'HAVEN Anandam Care Residence, Bengaluru',
  onCallSchedule: 'Mon – Sat · 08:30 – 16:30 (On-call 24/7 for acute escalations)',
  qualifications: 'MBBS, MD (General Medicine), Post-Doctoral Fellowship in Geriatrics',
  bio: 'Over 22 years of clinical geriatrics experience leading multidisciplinary elderly-care teams, polypharmacy rationalization, and advance care planning.',
};

/**
 * Primary Caseload Resident IDs for Dr. Anita Mehta:
 * - RES-044: Raghavendra Kulkarni (Orchard Meadow, Room 108-A) - Skilled Nursing
 * - RES-041: Ananya Sharma (Garden Terrace, Room 204-B) - Assisted Living
 * - RES-042: Vikram Hegde (Sunrise Pavilion, Room 112) - Memory Care
 * - RES-043: Nandini Iyer (Highland Haven, Suite 301) - Independent Living
 * - RES-001: Meera Krishnan (Garden Terrace, Room 201-A)
 * - RES-002: Parvati Sundararajan (Garden Terrace, Room 201-B)
 * - RES-003: Sunita Verma (Garden Terrace, Room 202)
 * - RES-005: Revathi Sampath (Garden Terrace, Room 204-A)
 */
export const PRIMARY_DOCTOR_RESIDENT_IDS = [
  'RES-044',
  'RES-041',
  'RES-042',
  'RES-043',
  'RES-001',
  'RES-002',
  'RES-003',
  'RES-005',
];

/**
 * Approved Active Access Grants for Dr. Anita Mehta:
 * - RES-004: Aarav Deshmukh (Sunrise Pavilion, Room 104) - Memory Care consultation
 */
export const ACTIVE_DOCTOR_ACCESS_GRANTS: DoctorAccessGrant[] = [
  {
    id: 'GRT-2026-08',
    requestId: 'REQ-2026-042',
    residentId: 'RES-004',
    residentName: 'Aarav Deshmukh',
    room: 'Room 104',
    wing: 'Sunrise Pavilion',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Anita Mehta',
    clinicalPurpose: 'Sundowning behavioural plan audit and memory care psychotropic medication evaluation.',
    accessLevel: 'full_clinical',
    status: 'active',
    grantedBy: 'Devika Ramanathan (Facility Administrator)',
    grantedAt: 'Nov 09, 2026 · 11:30 IST',
    expiresAt: 'Nov 16, 2026 · 11:30 IST (6 Days Remaining)',
    isEmergencyBreakGlass: false,
    notes: 'Approved for memory care clinical review following nurse request.',
  },
];

/**
 * Check if the doctor has authorized clinical access to a given resident
 */
export function isResidentAuthorizedForDoctor(residentId: string): {
  authorized: boolean;
  reason: string;
  grantType?: 'primary' | 'approved_grant' | 'emergency';
  expiresAt?: string;
} {
  if (PRIMARY_DOCTOR_RESIDENT_IDS.includes(residentId)) {
    return {
      authorized: true,
      reason: 'Lead Attending Physician — Resident is in your designated primary caseload.',
      grantType: 'primary',
    };
  }

  const activeGrant = ACTIVE_DOCTOR_ACCESS_GRANTS.find(
    (g) => g.residentId === residentId && g.status === 'active'
  );
  if (activeGrant) {
    return {
      authorized: true,
      reason: `Authorized under Active Access Grant ${activeGrant.id} (${activeGrant.clinicalPurpose}).`,
      grantType: activeGrant.isEmergencyBreakGlass ? 'emergency' : 'approved_grant',
      expiresAt: activeGrant.expiresAt,
    };
  }

  return {
    authorized: false,
    reason: 'Clinical Access Restricted: This resident is not in your primary caseload and has no active specialist access grant. Submit a scoped Doctor Access Request to review medical records.',
  };
}

/**
 * Get all resident records currently accessible to Dr. Anita Mehta
 */
export function getDoctorAuthorizedResidents(): (FullResident & { accessType: 'primary' | 'approved_grant' | 'emergency' })[] {
  const result: (FullResident & { accessType: 'primary' | 'approved_grant' | 'emergency' })[] = [];

  for (const r of MOCK_FULL_RESIDENTS) {
    const auth = isResidentAuthorizedForDoctor(r.id);
    if (auth.authorized && auth.grantType) {
      result.push({
        ...r,
        accessType: auth.grantType,
      });
    }
  }

  return result;
}

// -------------------------------------------------------------------------
// CLINICAL NOTES & ASSESSMENTS DATASET
// -------------------------------------------------------------------------

export const MOCK_CLINICAL_NOTES: DoctorClinicalNote[] = [
  {
    id: 'NOTE-2026-088',
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    room: 'Room 108-A',
    wing: 'Orchard Meadow',
    type: 'Post-Incident Assessment',
    authorName: 'Dr. Anita Mehta, MD',
    authorRole: 'Lead Geriatrician',
    authorKmc: 'KMC-88391',
    date: 'Nov 10, 2026',
    time: '09:45 AM',
    status: 'signed',
    signedAt: 'Nov 10, 2026 · 10:15 AM IST',
    subjectiveObservations: 'Reviewed following morning unassisted transfer slip in Room 108-A (INC-2026-088). Resident alert, denies loss of consciousness or headache. Mild tenderness over right hip, no deformity or limb shortening.',
    objectiveFindings: {
      bp: '132/84 mmHg',
      pulse: 74,
      spo2: 97,
      temp: '98.4°F',
      weight: '64.2 kg',
    },
    clinicalAssessment: 'Post-fall contusion right trochanteric region without neurological deficit or clinical evidence of fracture. Stable hemodynamics.',
    carePlanDirective: 'Continue 2-person transfer assist. Prescribed Paracetamol 650mg SOS for musculoskeletal discomfort. Ice pack application 15 mins TID.',
    followUpInstructions: 'Recheck vitals Q4H. Escalate immediately if weight-bearing pain increases or dizziness occurs. Follow-up review Nov 11 morning rounds.',
    relatedMedicationOrIncident: 'INC-2026-088 (Fall Slip Review)',
    addenda: [
      {
        id: 'ADD-01',
        timestamp: 'Nov 10, 2026 · 13:00 IST',
        author: 'Dr. Anita Mehta, MD',
        text: 'Secondary observation check at 12:15 PM by Nurse Priya Shetty confirmed pupil reactivity PERLA and SpO2 97%. Resident resting comfortably.',
        reason: 'Integration of secondary nursing vital signs.',
      },
    ],
  },
  {
    id: 'NOTE-2026-072',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    type: 'Medication Review',
    authorName: 'Dr. Anita Mehta, MD',
    authorRole: 'Lead Geriatrician',
    authorKmc: 'KMC-88391',
    date: 'Nov 09, 2026',
    time: '14:20 PM',
    status: 'signed',
    signedAt: 'Nov 09, 2026 · 14:45 PM IST',
    subjectiveObservations: 'Routine polypharmacy evaluation and hypertension management review. Resident reports feeling energetic, no postural lightheadedness.',
    objectiveFindings: {
      bp: '128/82 mmHg',
      pulse: 76,
      spo2: 98,
      bloodGlucose: '118 mg/dL (fasting)',
    },
    clinicalAssessment: 'Essential hypertension well controlled on Lisinopril 10mg. Type 2 Diabetes well compensated on Metformin ER 500mg. Renal panel within normal geriatric parameters (eGFR 68 mL/min).',
    carePlanDirective: 'Continue current medication regimen. Re-evaluate fasting blood sugar in 4 weeks. Maintain hydration protocol (1.8L daily).',
    followUpInstructions: 'Scheduled review Q1 2027 or earlier if blood pressure exceeds 145/90 mmHg.',
    relatedMedicationOrIncident: 'RX-2026-041 (Lisinopril 10mg)',
  },
  {
    id: 'NOTE-2026-065',
    residentId: 'RES-042',
    residentName: 'Vikram Hegde',
    room: 'Room 112',
    wing: 'Sunrise Pavilion',
    type: 'Progress Note',
    authorName: 'Dr. Anita Mehta, MD',
    authorRole: 'Lead Geriatrician',
    authorKmc: 'KMC-88391',
    date: 'Nov 08, 2026',
    time: '11:00 AM',
    status: 'signed',
    signedAt: 'Nov 08, 2026 · 11:30 AM IST',
    subjectiveObservations: 'Memory Care pod rounds. Staff report mild evening pacing. Resident oriented to person, pleasant and cooperative during exam.',
    objectiveFindings: {
      bp: '124/78 mmHg',
      pulse: 70,
      spo2: 98,
    },
    clinicalAssessment: 'Mild cognitive impairment stage 2 with sundowning restlessness. Physical exam non-focal.',
    carePlanDirective: 'Optimize sensory calming routines with evening music therapy. Ensure hydration prior to 17:00 PM.',
    followUpInstructions: 'Next cognitive assessment review with Dr. Arjun Rao on Nov 14.',
  },
  {
    id: 'NOTE-2026-090',
    residentId: 'RES-004',
    residentName: 'Aarav Deshmukh',
    room: 'Room 104',
    wing: 'Sunrise Pavilion',
    type: 'Specialist Consultation',
    authorName: 'Dr. Anita Mehta, MD',
    authorRole: 'Lead Geriatrician',
    authorKmc: 'KMC-88391',
    date: 'Nov 10, 2026',
    time: '11:15 AM',
    status: 'draft',
    subjectiveObservations: 'Consultation conducted under approved grant GRT-2026-08. Reviewed recent behavioral agitation records.',
    objectiveFindings: {
      bp: '136/84 mmHg',
      pulse: 82,
      spo2: 96,
    },
    clinicalAssessment: 'Sundowning exacerbation related to environmental noise during evening shift shift change.',
    carePlanDirective: 'Draft directive: Recommend room repositioning away from central corridor. Avoid sedative initiation at this stage.',
    followUpInstructions: 'Finalize assessment after consulting with Head Nurse Sneha Joshi.',
  },
];

// -------------------------------------------------------------------------
// CLINICAL TASKS & WORK QUEUE DATASET
// -------------------------------------------------------------------------

export const MOCK_DOCTOR_TASKS: DoctorTask[] = [
  {
    id: 'DOC-TSK-101',
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    room: 'Room 108-A',
    wing: 'Orchard Meadow',
    category: 'Incident Review',
    title: 'Physician Clinical Sign-off for Fall Incident INC-2026-088',
    description: 'Complete physical evaluation, sign post-fall clinical review, and confirm transfer assist care plan.',
    priority: 'urgent',
    dueDate: 'Today · 12:00 PM',
    status: 'completed',
    assignedDoctor: 'Dr. Anita Mehta',
    relatedRecordUrl: '/doctor/incidents',
    completedAt: '10:15 AM IST',
    completedNotes: 'Signed clinical findings in incident ledger. Paracetamol 650mg SOS authorized.',
  },
  {
    id: 'DOC-TSK-102',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    category: 'Medication Exception',
    title: 'Review Overdue Lisinopril 10mg Morning Administration',
    description: 'Caregiver reported dose rescheduled to 14:00 round. Review blood pressure logs and authorize administration.',
    priority: 'high',
    dueDate: 'Today · 14:00 PM',
    status: 'pending',
    assignedDoctor: 'Dr. Anita Mehta',
    relatedRecordUrl: '/doctor/prescriptions',
  },
  {
    id: 'DOC-TSK-103',
    residentId: 'RES-043',
    residentName: 'Nandini Iyer',
    room: 'Suite 301',
    wing: 'Highland Haven',
    category: 'Prescription Review',
    title: 'Atorvastatin 10mg 6-Month Prescription Renewal',
    description: 'Current prescription version 1 expiring on Nov 30. Review lipid panel and issue version 2 renewal.',
    priority: 'normal',
    dueDate: 'Nov 12, 2026',
    status: 'pending',
    assignedDoctor: 'Dr. Anita Mehta',
    relatedRecordUrl: '/doctor/prescriptions',
  },
  {
    id: 'DOC-TSK-104',
    residentId: 'RES-004',
    residentName: 'Aarav Deshmukh',
    room: 'Room 104',
    wing: 'Sunrise Pavilion',
    category: 'Consultation',
    title: 'Finalize Sundowning Consultation Note (GRT-2026-08)',
    description: 'Complete draft consultation note NOTE-2026-090 and communicate non-pharmacological recommendations to care team.',
    priority: 'high',
    dueDate: 'Today · 16:00 PM',
    status: 'in_progress',
    assignedDoctor: 'Dr. Anita Mehta',
    relatedRecordUrl: '/doctor/notes',
  },
  {
    id: 'DOC-TSK-105',
    residentId: 'RES-001',
    residentName: 'Meera Krishnan',
    room: 'Room 201-A',
    wing: 'Garden Terrace',
    category: 'Resident Review',
    title: 'Comprehensive Geriatric Assessment (Quarterly Audit)',
    description: 'Assess cognitive function, gait confidence, and polypharmacy interactions for Q4 care plan review.',
    priority: 'routine',
    dueDate: 'Nov 15, 2026',
    status: 'pending',
    assignedDoctor: 'Dr. Anita Mehta',
    relatedRecordUrl: '/doctor/records',
  },
];

// -------------------------------------------------------------------------
// CLINICAL DOCUMENTS
// -------------------------------------------------------------------------

export const MOCK_CLINICAL_DOCUMENTS: ClinicalDocument[] = [
  {
    id: 'DOC-CLIN-01',
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    title: 'Pelvis & Hip X-Ray Report (AP View)',
    category: 'Radiology X-Ray',
    uploadDate: 'Nov 10, 2026 · 10:30 AM',
    uploadedBy: 'Dr. Anita Mehta, MD',
    fileSize: '3.8 MB PDF',
    status: 'verified',
    summary: 'No acute fracture or dislocation identified. Moderate degenerative osteoarthritis of right hip joint.',
    referenceNumber: 'RAD-2026-8812',
  },
  {
    id: 'DOC-CLIN-02',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    title: 'Comprehensive Metabolic Panel & Lipid Profile',
    category: 'Diagnostic Lab Report',
    uploadDate: 'Nov 04, 2026',
    uploadedBy: 'Dr. Anita Mehta, MD',
    fileSize: '1.2 MB PDF',
    status: 'verified',
    summary: 'HbA1c 6.4%, eGFR 68 mL/min, Serum Creatinine 0.9 mg/dL, Total Cholesterol 182 mg/dL.',
    referenceNumber: 'LAB-2026-0418',
  },
  {
    id: 'DOC-CLIN-03',
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    title: 'Advance Care Directive & DNR Confirmation',
    category: 'Advance Directive (DNR)',
    uploadDate: 'Aug 14, 2023',
    uploadedBy: 'Dr. Anita Mehta, MD',
    fileSize: '1.1 MB PDF',
    status: 'verified',
    summary: 'Do Not Resuscitate (DNR) with comfort care prioritization signed by POA Manoj Kulkarni and Dr. Anita Mehta.',
    referenceNumber: 'ACP-KA-8823',
  },
  {
    id: 'DOC-CLIN-04',
    residentId: 'RES-042',
    residentName: 'Vikram Hegde',
    title: '12-Lead Resting Electrocardiogram (ECG)',
    category: 'Cardiology ECG',
    uploadDate: 'Sep 22, 2026',
    uploadedBy: 'Dr. Arjun Rao, MD',
    fileSize: '950 KB PDF',
    status: 'verified',
    summary: 'Normal sinus rhythm at 68 bpm. PR interval 160ms. No ischemic ST-T changes.',
    referenceNumber: 'ECG-2026-0922',
  },
];
