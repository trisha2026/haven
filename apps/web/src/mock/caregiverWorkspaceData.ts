/**
 * HAVEN — Elderly Care & Facility Management System
 * Comprehensive Caregiver Workspace Mock Dataset
 *
 * Active User: Priya Shetty, RN (Senior Registered Nurse, CG-0142)
 * KNC Registration: KNC-RN-39182 (Karnataka Nursing Council - Verified)
 * Facility: HAVEN Anandam Care Residence, Bengaluru
 * Wing: Garden Terrace (Floor 2)
 * Current Shift: Day Shift (07:00 – 15:00)
 */

import { MOCK_FULL_RESIDENTS } from './residentsData.ts';
import type { FullResident, FacilityWing } from '../types/resident.ts';

export interface CaregiverTask {
  id: string; // e.g. "TSK-2026-101"
  residentId: string;
  residentName: string;
  room: string;
  wing: FacilityWing;
  category:
    | 'Personal Hygiene'
    | 'Bathing Assistance'
    | 'Grooming'
    | 'Mobility Assistance'
    | 'Meal Assistance'
    | 'Hydration'
    | 'Position Changes'
    | 'Routine Observations'
    | 'Comfort & Wellbeing'
    | 'Follow-up Reminders';
  title: string;
  description: string;
  scheduledTime: string;
  priority: 'urgent' | 'high' | 'normal' | 'routine';
  status: 'pending' | 'in_progress' | 'completed' | 'unable_to_complete';
  assignedTo: string;
  completedAt?: string;
  completedBy?: string;
  notes?: string;
  observationValue?: string;
  clinicalEscalationFlag?: boolean;
  escalationReason?: string;
}

export interface FloorStockItem {
  id: string; // e.g. "FLR-STK-01"
  sku: string;
  name: string;
  category: 'Hygiene & Incontinence' | 'Wound Care & Dressings' | 'PPE & Protection' | 'Diagnostics & Vitals' | 'Nutrition & Hydration';
  currentStock: number;
  unit: string;
  minThreshold: number;
  location: string;
  status: 'optimal' | 'low' | 'critical';
  lastReplenished: string;
}

export interface StockConsumptionEntry {
  id: string;
  timestamp: string;
  itemName: string;
  quantityUsed: number;
  unit: string;
  residentName?: string;
  room?: string;
  purpose: string;
  caregiverName: string;
}

export interface StockReplenishmentRequest {
  id: string; // e.g. "REQ-STK-08"
  requestedAt: string;
  itemName: string;
  quantityRequested: number;
  unit: string;
  urgency: 'routine' | 'urgent';
  reason: string;
  status: 'pending_review' | 'approved_by_pharmacy' | 'delivered';
  requestedBy: string;
}

export interface TemporaryAssignmentRecord {
  id: string; // e.g. "EMG-2026-004"
  assignmentType: 'Resident Standby' | 'Wing Floor Coverage';
  targetResidentId?: string;
  targetResidentName?: string;
  targetRoom?: string;
  targetWing: FacilityWing;
  scope: string;
  reason: string;
  authorizedBy: string;
  authorizedAt: string;
  startTime: string;
  expiryTime: string;
  status: 'active' | 'completed' | 'expired';
  notes: string;
}

export interface ResidentHandoverItem {
  residentId: string;
  residentName: string;
  room: string;
  careClassification: string;
  observationsSummary: string;
  medicationExceptions: string;
  pendingTasksSummary: string;
  mobilityAlert: string;
  followUpInstructions: string;
  criticalFlag: boolean;
}

export interface ShiftHandoverReport {
  id: string; // e.g. "HND-2026-042"
  shiftDate: string;
  outgoingShift: string;
  outgoingLead: string;
  outgoingLeadId: string;
  incomingShift: string;
  incomingLead: string;
  incomingLeadId: string;
  wing: FacilityWing;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'acknowledged';
  acknowledgedAt?: string;
  acknowledgementNotes?: string;
  residentEntries: ResidentHandoverItem[];
}

// -------------------------------------------------------------------------
// CANONICAL CAREGIVER IDENTITIES & ASSIGNMENTS
// -------------------------------------------------------------------------

export const ACTIVE_CAREGIVER = {
  id: 'CG-0142',
  userId: 'USR-C-0142',
  fullName: 'Priya Shetty, RN',
  preferredName: 'Priya',
  role: 'Senior Registered Nurse',
  employeeId: 'CG-0142',
  registrationNumber: 'KNC-RN-39182',
  registrationStatus: 'verified',
  email: 'priya.shetty@haven-care.in.example',
  phone: '+91 98860 17834',
  facility: 'HAVEN Anandam Care Residence, Bengaluru',
  assignedWing: 'Garden Terrace' as FacilityWing,
  currentShift: 'Day Shift (07:00 – 15:00)',
  dutyStatus: 'on_duty' as 'on_duty' | 'on_break' | 'checked_out',
  checkInTime: '06:52 AM',
  leaveBalanceDays: 14,
  supervisorName: 'Devika Ramanathan',
  supervisorTitle: 'Facility Administrator',
  supervisorPhone: '+91 98450 14229',
};

/**
 * Permanently assigned residents for Priya Shetty (Garden Terrace):
 * RES-041: Ananya Sharma (Room 204-B)
 * RES-001: Meera Krishnan (Room 201-A)
 * RES-002: Parvati Sundararajan (Room 201-B)
 * RES-003: Sunita Verma (Room 202)
 * RES-005: Revathi Sampath (Room 204-A)
 */
export const PERMANENT_ASSIGNED_RESIDENT_IDS = [
  'RES-041',
  'RES-001',
  'RES-002',
  'RES-003',
  'RES-005',
];

/**
 * Active temporary emergency assignment for Priya Shetty:
 * RES-044: Raghavendra Kulkarni (Room 108-A, Orchard Meadow) - Post-fall observation standby
 */
export const ACTIVE_TEMPORARY_ASSIGNMENTS: TemporaryAssignmentRecord[] = [
  {
    id: 'EMG-2026-004',
    assignmentType: 'Resident Standby',
    targetResidentId: 'RES-044',
    targetResidentName: 'Raghavendra Kulkarni',
    targetRoom: 'Room 108-A',
    targetWing: 'Orchard Meadow',
    scope: 'Post-incident clinical observation and vitals monitoring following morning fall (INC-2026-088).',
    reason: 'Deepak Gowda NP required on clinic transfer triage; Priya assigned to secondary clinical observation window.',
    authorizedBy: 'Devika Ramanathan (Facility Administrator)',
    authorizedAt: 'Today, 09:15 AM',
    startTime: 'Today, 09:30 AM',
    expiryTime: 'Today, 14:30 PM (5 Hours window)',
    status: 'active',
    notes: 'Standing protocol: Monitor blood pressure, pupils, and mobility caution. Escalate if dizziness reported.',
  },
  {
    id: 'EMG-2026-001',
    assignmentType: 'Wing Floor Coverage',
    targetWing: 'Sunrise Pavilion',
    scope: 'Memory Care pod assistance during breakfast medication round.',
    reason: 'Planned peer coverage during morning staff briefing.',
    authorizedBy: 'Devika Ramanathan (Facility Administrator)',
    authorizedAt: 'Nov 07, 2026, 07:15 AM',
    startTime: 'Nov 07, 2026, 07:30 AM',
    expiryTime: 'Nov 07, 2026, 09:00 AM',
    status: 'completed',
    notes: 'Completed without exceptions. Handed over back to Rahul Patil LPN.',
  },
];

/**
 * Check if the active caregiver has clinical authorization to access a given resident
 */
export function isResidentAuthorizedForCaregiver(residentId: string): {
  authorized: boolean;
  reason: string;
  assignmentType?: 'permanent' | 'temporary';
} {
  if (PERMANENT_ASSIGNED_RESIDENT_IDS.includes(residentId)) {
    return {
      authorized: true,
      reason: 'Permanently assigned to your primary caseload (Garden Terrace).',
      assignmentType: 'permanent',
    };
  }

  const activeTemp = ACTIVE_TEMPORARY_ASSIGNMENTS.find(
    (t) => t.status === 'active' && t.targetResidentId === residentId
  );
  if (activeTemp) {
    return {
      authorized: true,
      reason: `Authorized under Active Emergency Assignment ${activeTemp.id} (${activeTemp.scope}).`,
      assignmentType: 'temporary',
    };
  }

  return {
    authorized: false,
    reason: 'Access Restricted: This resident is not in your primary caseload and is not covered by any active temporary assignment. In accordance with Karnataka Healthcare Privacy and HAVEN Clinical Governance rules, direct record access is restricted.',
  };
}

/**
 * Returns all FullResident objects currently accessible to Priya Shetty
 */
export function getAuthorizedResidents(): (FullResident & { assignmentType: 'permanent' | 'temporary' })[] {
  const result: (FullResident & { assignmentType: 'permanent' | 'temporary' })[] = [];

  for (const r of MOCK_FULL_RESIDENTS) {
    const auth = isResidentAuthorizedForCaregiver(r.id);
    if (auth.authorized && auth.assignmentType) {
      result.push({
        ...r,
        assignmentType: auth.assignmentType,
      });
    }
  }

  return result;
}

// -------------------------------------------------------------------------
// CAREGIVER CARE TASKS DATASET
// -------------------------------------------------------------------------

export const MOCK_CAREGIVER_TASKS: CaregiverTask[] = [
  {
    id: 'TSK-2026-101',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    category: 'Hydration',
    title: 'Mid-Morning Hydration Round & Electrolyte Cup',
    description: 'Ensure resident takes at least 250ml tender coconut water or lemon-infused water. Target: 1.8L daily.',
    scheduledTime: '10:30 AM',
    priority: 'high',
    status: 'completed',
    assignedTo: 'Priya Shetty, RN',
    completedAt: '10:35 AM',
    completedBy: 'Priya Shetty, RN',
    notes: 'Resident drank 300ml fresh tender coconut water without hesitation.',
    observationValue: '300 mL consumed',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-102',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    category: 'Mobility Assistance',
    title: 'Veranda Walkway Assist & Quadriceps Conditioning',
    description: 'Assisted 15-minute gentle walk to garden gazebo using rolling walker with handbrakes. Standby assist.',
    scheduledTime: '11:15 AM',
    priority: 'normal',
    status: 'completed',
    assignedTo: 'Priya Shetty, RN',
    completedAt: '11:32 AM',
    completedBy: 'Priya Shetty, RN',
    notes: 'Walked two rounds of the courtyard garden comfortably. Mild right knee stiffness noted, no dizziness.',
    observationValue: '15 mins completed with rolling walker',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-103',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    category: 'Meal Assistance',
    title: 'Lunchtime Diabetic Diet Supervision',
    description: 'Ensure low-sodium diabetic thali portioning (millets roti, dal, steamed sabzi). Verify post-meal water intake.',
    scheduledTime: '12:45 PM',
    priority: 'normal',
    status: 'completed',
    assignedTo: 'Priya Shetty, RN',
    completedAt: '13:10 PM',
    completedBy: 'Priya Shetty, RN',
    notes: 'Consumed 80% meal. Avoided sweet dessert as per dietary care plan.',
    observationValue: '80% meal intake',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-104',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    category: 'Routine Observations',
    title: 'Pre-Medication Blood Pressure & Pulse Check',
    description: 'Check sitting BP and radial pulse prior to scheduled 14:00 Lisinopril 10mg administration.',
    scheduledTime: '13:45 PM',
    priority: 'urgent',
    status: 'pending',
    assignedTo: 'Priya Shetty, RN',
    notes: '',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-105',
    residentId: 'RES-001',
    residentName: 'Meera Krishnan',
    room: 'Room 201-A',
    wing: 'Garden Terrace',
    category: 'Personal Hygiene',
    title: 'Post-Lunch Oral Hygiene & Facial Freshening',
    description: 'Assist with warm rinse, dentures cleaning, and gentle face washing.',
    scheduledTime: '13:30 PM',
    priority: 'normal',
    status: 'completed',
    assignedTo: 'Priya Shetty, RN',
    completedAt: '13:38 PM',
    completedBy: 'Priya Shetty, RN',
    notes: 'Dentures cleansed and reseated comfortably. Skin intact around lips.',
    observationValue: 'Grooming completed',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-106',
    residentId: 'RES-001',
    residentName: 'Meera Krishnan',
    room: 'Room 201-A',
    wing: 'Garden Terrace',
    category: 'Comfort & Wellbeing',
    title: 'Afternoon Recliner Repositioning & Reading Assist',
    description: 'Position resident in high-back armchair with lumbar cushion. Place Telugu literature and spectacles within reach.',
    scheduledTime: '14:15 PM',
    priority: 'routine',
    status: 'pending',
    assignedTo: 'Priya Shetty, RN',
    notes: '',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-107',
    residentId: 'RES-002',
    residentName: 'Parvati Sundararajan',
    room: 'Room 201-B',
    wing: 'Garden Terrace',
    category: 'Position Changes',
    title: 'Pressure Relief Heel Offloading & Lateral Shift',
    description: 'Reposition legs with gel foot-elevators to protect bilateral heels from pressure sores.',
    scheduledTime: '14:00 PM',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Priya Shetty, RN',
    notes: '',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-108',
    residentId: 'RES-003',
    residentName: 'Sunita Verma',
    room: 'Room 202',
    wing: 'Garden Terrace',
    category: 'Follow-up Reminders',
    title: 'Family Day-Leave Return Checklist Preparation',
    description: 'Verify resident luggage, medication log sheet, and review signed family return confirmation.',
    scheduledTime: '14:45 PM',
    priority: 'normal',
    status: 'pending',
    assignedTo: 'Priya Shetty, RN',
    notes: '',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-109',
    residentId: 'RES-005',
    residentName: 'Revathi Sampath',
    room: 'Room 204-A',
    wing: 'Garden Terrace',
    category: 'Bathing Assistance',
    title: 'Assisted Shower & Skin Barrier Cream Application',
    description: 'Shower chair transfer assist with warm water bath. Apply cetomacrogol emollient to lower limbs.',
    scheduledTime: '08:30 AM',
    priority: 'high',
    status: 'completed',
    assignedTo: 'Priya Shetty, RN',
    completedAt: '08:55 AM',
    completedBy: 'Priya Shetty, RN',
    notes: 'Shower completed smoothly with grab bar support. Skin in good condition, no breakdown.',
    observationValue: 'Shower complete, skin hydrated',
    clinicalEscalationFlag: false,
  },
  {
    id: 'TSK-2026-110',
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    room: 'Room 108-A',
    wing: 'Orchard Meadow',
    category: 'Routine Observations',
    title: 'Post-Fall Neurological & Pulse Oximetry Check (EMG-2026-004)',
    description: 'Secondary clinical monitoring as authorized under emergency assignment. Assess gait confidence, check bilateral pupillary response, radial pulse, and SpO2.',
    scheduledTime: '12:00 PM',
    priority: 'urgent',
    status: 'completed',
    assignedTo: 'Priya Shetty, RN',
    completedAt: '12:15 PM',
    completedBy: 'Priya Shetty, RN',
    notes: 'Pupils equal and reactive. Pulse 74 bpm regular, SpO2 97% on room air. Resident resting in bed comfortably without pain.',
    observationValue: 'SpO2 97%, Pulse 74 bpm, Pupils PERLA',
    clinicalEscalationFlag: false,
  },
];

// -------------------------------------------------------------------------
// WING FLOOR STOCK & INVENTORY
// -------------------------------------------------------------------------

export const MOCK_FLOOR_STOCK: FloorStockItem[] = [
  {
    id: 'FLR-STK-01',
    sku: 'FLR-GT-BRIEF-L',
    name: 'Adult Incontinence Briefs (Large)',
    category: 'Hygiene & Incontinence',
    currentStock: 28,
    unit: 'Pieces',
    minThreshold: 20,
    location: 'Garden Terrace Utility Cabinet 2',
    status: 'optimal',
    lastReplenished: 'Nov 08, 2026',
  },
  {
    id: 'FLR-STK-02',
    sku: 'FLR-GT-GLV-M',
    name: 'Nitrile Examination Gloves (Medium)',
    category: 'PPE & Protection',
    currentStock: 12,
    unit: 'Boxes (100 pcs)',
    minThreshold: 15,
    location: 'Nursing Station Cupboard A',
    status: 'low',
    lastReplenished: 'Nov 06, 2026',
  },
  {
    id: 'FLR-STK-03',
    sku: 'FLR-GT-CHX-WIP',
    name: 'Chlorhexidine 2% Antiseptic Skin Wipes',
    category: 'Hygiene & Incontinence',
    currentStock: 8,
    unit: 'Packs (50 wipes)',
    minThreshold: 10,
    location: 'Clinical Cart Drawer 1',
    status: 'low',
    lastReplenished: 'Nov 05, 2026',
  },
  {
    id: 'FLR-STK-04',
    sku: 'FLR-GT-SAL-500',
    name: 'Normal Saline 0.9% Flush (100ml)',
    category: 'Wound Care & Dressings',
    currentStock: 18,
    unit: 'Bottles',
    minThreshold: 12,
    location: 'Clinical Treatment Room Tray',
    status: 'optimal',
    lastReplenished: 'Nov 09, 2026',
  },
  {
    id: 'FLR-STK-05',
    sku: 'FLR-GT-DRS-MED',
    name: 'Sterile Hydrocolloid Foam Dressing (10x10cm)',
    category: 'Wound Care & Dressings',
    currentStock: 5,
    unit: 'Packs',
    minThreshold: 8,
    location: 'Clinical Cart Drawer 3',
    status: 'low',
    lastReplenished: 'Nov 04, 2026',
  },
  {
    id: 'FLR-STK-06',
    sku: 'FLR-GT-GLU-STP',
    name: 'Blood Glucose Test Strips (Accu-Chek)',
    category: 'Diagnostics & Vitals',
    currentStock: 42,
    unit: 'Strips',
    minThreshold: 50,
    location: 'Glucometer Station Drawer',
    status: 'low',
    lastReplenished: 'Nov 07, 2026',
  },
  {
    id: 'FLR-STK-07',
    sku: 'FLR-GT-ORS-SACH',
    name: 'Electral Oral Rehydration Salts (ORS)',
    category: 'Nutrition & Hydration',
    currentStock: 35,
    unit: 'Sachets (21.8g)',
    minThreshold: 20,
    location: 'Pantry Nutrition Shelf',
    status: 'optimal',
    lastReplenished: 'Nov 09, 2026',
  },
];

export const MOCK_STOCK_CONSUMPTION_LOG: StockConsumptionEntry[] = [
  {
    id: 'LOG-CON-101',
    timestamp: 'Today, 10:35 AM',
    itemName: 'Electral Oral Rehydration Salts (ORS)',
    quantityUsed: 1,
    unit: 'Sachets',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    purpose: 'Routine mid-morning electrolyte replenishment.',
    caregiverName: 'Priya Shetty, RN',
  },
  {
    id: 'LOG-CON-102',
    timestamp: 'Today, 08:55 AM',
    itemName: 'Chlorhexidine 2% Antiseptic Skin Wipes',
    quantityUsed: 2,
    unit: 'Packs',
    residentName: 'Revathi Sampath',
    room: 'Room 204-A',
    purpose: 'Pre-shower skin sanitation and leg cleansing.',
    caregiverName: 'Priya Shetty, RN',
  },
  {
    id: 'LOG-CON-103',
    timestamp: 'Today, 07:15 AM',
    itemName: 'Nitrile Examination Gloves (Medium)',
    quantityUsed: 1,
    unit: 'Boxes',
    purpose: 'Floor shift open: replenished treatment cart glove dispenser.',
    caregiverName: 'Priya Shetty, RN',
  },
];

export const MOCK_REPLENISHMENT_REQUESTS: StockReplenishmentRequest[] = [
  {
    id: 'REQ-STK-08',
    requestedAt: 'Today, 11:20 AM',
    itemName: 'Sterile Hydrocolloid Foam Dressing (10x10cm)',
    quantityRequested: 10,
    unit: 'Packs',
    urgency: 'urgent',
    reason: 'Garden Terrace stock down to 5 packs; dressing changes scheduled tomorrow.',
    status: 'approved_by_pharmacy',
    requestedBy: 'Priya Shetty, RN',
  },
  {
    id: 'REQ-STK-09',
    requestedAt: 'Today, 08:15 AM',
    itemName: 'Nitrile Examination Gloves (Medium)',
    quantityRequested: 5,
    unit: 'Boxes',
    urgency: 'routine',
    reason: 'Floor stock approaching minimum threshold of 15 boxes.',
    status: 'pending_review',
    requestedBy: 'Priya Shetty, RN',
  },
];

// -------------------------------------------------------------------------
// STRUCTURED SHIFT HANDOVER
// -------------------------------------------------------------------------

export const MOCK_SHIFT_HANDOVERS: ShiftHandoverReport[] = [
  {
    id: 'HND-2026-042',
    shiftDate: 'Tuesday, Nov 10, 2026',
    outgoingShift: 'Day Shift (07:00 – 15:00)',
    outgoingLead: 'Priya Shetty, RN',
    outgoingLeadId: 'CG-0142',
    incomingShift: 'Evening Shift (15:00 – 23:00)',
    incomingLead: 'Rahul Patil, LPN',
    incomingLeadId: 'CG-0118',
    wing: 'Garden Terrace',
    submittedAt: 'Today, 14:40 PM',
    status: 'draft',
    residentEntries: [
      {
        residentId: 'RES-041',
        residentName: 'Ananya Sharma',
        room: 'Room 204-B',
        careClassification: 'Assisted Living',
        observationsSummary: 'Good spirits today. Completed 15-minute garden walk with rolling walker. Mild right knee stiffness noted. Alert and oriented.',
        medicationExceptions: 'Morning Lisinopril 10mg was rescheduled to 14:00 round. Afternoon round completed at 14:05 PM with BP 128/82 mmHg.',
        pendingTasksSummary: 'Evening hydration target: ensure 400ml water taken before dinner. Evening Metformin ER 500mg due at 18:00 with food.',
        mobilityAlert: 'Standby assistance required for bathroom transfers.',
        followUpInstructions: 'Dr. Anita Mehta scheduled to review blood pressure logs tomorrow morning.',
        criticalFlag: false,
      },
      {
        residentId: 'RES-001',
        residentName: 'Meera Krishnan',
        room: 'Room 201-A',
        careClassification: 'Assisted Living',
        observationsSummary: 'Resting in armchair reading. Good oral intake at lunch (approx 85%). Oral hygiene completed.',
        medicationExceptions: 'None. Morning and noon doses administered on schedule.',
        pendingTasksSummary: 'Assist to dining room at 19:30 PM for dinner. Evening blood sugar test strip before dinner.',
        mobilityAlert: 'Single cane assist. Supervise footwear.',
        followUpInstructions: 'Family visit anticipated at 17:00 PM (daughter Shanti Krishnan).',
        criticalFlag: false,
      },
      {
        residentId: 'RES-002',
        residentName: 'Parvati Sundararajan',
        room: 'Room 201-B',
        careClassification: 'Assisted Living',
        observationsSummary: 'Heel gel offloading cushions positioned at 14:00. Bilateral heels pink and intact.',
        medicationExceptions: 'None.',
        pendingTasksSummary: 'Reposition lateral turn at 17:00 PM and check heel skin integrity.',
        mobilityAlert: 'Two-person transfer assist from bed to commode.',
        followUpInstructions: 'Continue pressure ulcer prevention protocol.',
        criticalFlag: false,
      },
      {
        residentId: 'RES-044',
        residentName: 'Raghavendra Kulkarni',
        room: 'Room 108-A (Orchard Meadow Standby)',
        careClassification: 'Skilled Nursing',
        observationsSummary: 'Temporary assignment EMG-2026-004 completed. Vitals at 12:15 PM were stable (BP 132/84, SpO2 97%, Pulse 74). No dizziness or swelling.',
        medicationExceptions: 'Pain relief Paracetamol 650mg given at 09:30 post-fall.',
        pendingTasksSummary: 'Handed back over to Deepak Gowda NP for evening nursing care.',
        mobilityAlert: 'Strict 2-person assist required. Bed rail alarms active.',
        followUpInstructions: 'Dr. Anita Mehta physical examination review pending.',
        criticalFlag: true,
      },
    ],
  },
  {
    id: 'HND-2026-041',
    shiftDate: 'Tuesday, Nov 10, 2026',
    outgoingShift: 'Night Watch (23:00 – 07:00)',
    outgoingLead: 'Kavita Menon, RN',
    outgoingLeadId: 'CG-0160',
    incomingShift: 'Day Shift (07:00 – 15:00)',
    incomingLead: 'Priya Shetty, RN',
    incomingLeadId: 'CG-0142',
    wing: 'Garden Terrace',
    submittedAt: 'Today, 06:55 AM',
    status: 'acknowledged',
    acknowledgedAt: 'Today, 07:05 AM',
    acknowledgementNotes: 'Acknowledged by Priya Shetty RN. Night shift calm across Garden Terrace. Noted Ananya Sharma woke once for water at 03:30 AM.',
    residentEntries: [
      {
        residentId: 'RES-041',
        residentName: 'Ananya Sharma',
        room: 'Room 204-B',
        careClassification: 'Assisted Living',
        observationsSummary: 'Slept 6.5 hours peacefully. Woke at 03:30 AM for warm water and returned to sleep without issue.',
        medicationExceptions: 'None during night watch.',
        pendingTasksSummary: 'Morning hygiene and blood pressure check.',
        mobilityAlert: 'Ensure night lamp and slippers positioned by bedside.',
        followUpInstructions: 'Standard day schedule.',
        criticalFlag: false,
      },
    ],
  },
];
