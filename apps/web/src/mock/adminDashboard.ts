/**
 * HAVEN — Elderly Care & Facility Management System
 * Administrator Command Centre Mock Data
 *
 * Deterministic, fully reconciled dataset across:
 * - Residents & Beds (64 total beds, 2 maintenance, 62 operational, 58 occupied, 4 available)
 * - Medication Schedule & Administration (184 scheduled = 171 administered + 7 pending + 2 missed + 1 refused + 0 withheld + 3 overdue)
 * - Staffing & Shifts (26 scheduled: 18 on duty, 2 absent/leave, 1 pending clock-in, 5 upcoming evening/night)
 * - Incidents (3 open: 1 clinical review, 1 investigation, 1 monitoring; 14 resolved this month)
 * - Inventory & Pharmacy Batches (reconciled alerts for low stock, expiring batches, quarantined recall)
 * - Priority Action Queue (6 prioritized exceptions sorted by urgency)
 * - Facility Activity Stream (audit log sample)
 */

export interface FacilityBedConfig {
  totalBeds: number;
  maintenanceBeds: number;
  operationalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  occupancyRate: number; // calculated: (occupied / operational) * 100
}

// ----------------------------------------------------------------------------------
// DETERMINISTIC DEMONSTRATION REFERENCE TIMELINE
// Fixed at Tuesday, November 10, 2026 · 10:30 AM EST (Day Shift active 07:00–15:00)
// ----------------------------------------------------------------------------------
export const DEMO_DATE = 'Tuesday, November 10, 2026';
export const DEMO_TIME = '10:30 AM';
export const DEMO_TIMESTAMP_FULL = 'Tuesday, November 10, 2026 · 10:30 AM EST';

export interface MedicationSummary {
  eligibleScheduled: number;
  administered: number;
  pending: number;
  missed: number;
  refused: number;
  withheld: number;
  overdue: number;
  completionRate: number; // calculated: (administered / eligibleScheduled) * 100
}

export interface ShiftRosterItem {
  id: string;
  name: string;
  timeRange: string;
  wing: string;
  scheduledStaff: number;
  onDutyStaff: number;
  confirmedStaff: number;
  coverageStatus: 'full' | 'gap' | 'pending';
  gapNotes?: string;
  leadSupervisor: string;
}

export interface StaffingSummary {
  totalScheduledToday: number;
  currentlyOnDuty: number;
  absentOrLeave: number;
  pendingClockIn: number;
  coverageGapsCount: number;
  activeShifts: ShiftRosterItem[];
}

export type ActionPriority = 'critical' | 'high' | 'medium' | 'low';
export type ActionCategory = 'medication' | 'staffing' | 'access' | 'incident' | 'inventory';

export interface PriorityActionItem {
  id: string;
  priority: ActionPriority;
  category: ActionCategory;
  title: string;
  summary: string;
  context: {
    residentName?: string;
    room?: string;
    staffName?: string;
    role?: string;
    medicineName?: string;
    incidentRef?: string;
  };
  timestamp: string;
  status: 'pending' | 'reviewing' | 'escalated';
  actionLabel: string;
  navigationPath: string;
  actionDetails: string;
}

export interface IncidentRecord {
  id: string;
  reference: string;
  residentName: string;
  room: string;
  category: 'Fall' | 'Behavioural' | 'Skin Tear' | 'Equipment' | 'Medication Error';
  occurredAt: string;
  severity: 'high' | 'medium' | 'low';
  status: 'clinical_review' | 'under_investigation' | 'monitoring' | 'resolved';
  reporter: string;
  reviewState: string;
  summary: string;
  notes: string;
}

export interface InventoryAlertItem {
  id: string;
  medicineName: string;
  batchNumber: string;
  currentStock: number;
  minimumThreshold: number;
  unit: string;
  expiryDate?: string;
  type: 'low_stock' | 'expiring_soon' | 'expired' | 'quarantined' | 'pending_receipt';
  severity: 'critical' | 'warning' | 'info';
  actionPrompt: string;
  supplier: string;
  purchaseOrderRef?: string;
}

export interface FacilityActivityEvent {
  id: string;
  actor: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  action: string;
  target: string;
  category: 'resident' | 'medication' | 'staff' | 'safety' | 'inventory' | 'access' | 'facilities';
  timestamp: string;
  statusBadge?: {
    label: string;
    variant: 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  };
}

// ----------------------------------------------------------------------------------
// 1. BED & RESIDENT OCCUPANCY RECONCILIATION
// ----------------------------------------------------------------------------------
const TOTAL_BEDS = 64;
const MAINTENANCE_BEDS = 2; // Room 108-B (electrical repair) & Room 304-A (sanitization)
const OPERATIONAL_BEDS = TOTAL_BEDS - MAINTENANCE_BEDS; // 62
const OCCUPIED_BEDS = 58;
const AVAILABLE_BEDS = OPERATIONAL_BEDS - OCCUPIED_BEDS; // 4
const OCCUPANCY_RATE = parseFloat(((OCCUPIED_BEDS / OPERATIONAL_BEDS) * 100).toFixed(1)); // 93.5%

export const MOCK_BED_CONFIG: FacilityBedConfig = {
  totalBeds: TOTAL_BEDS,
  maintenanceBeds: MAINTENANCE_BEDS,
  operationalBeds: OPERATIONAL_BEDS,
  occupiedBeds: OCCUPIED_BEDS,
  availableBeds: AVAILABLE_BEDS,
  occupancyRate: OCCUPANCY_RATE,
};

// ----------------------------------------------------------------------------------
// 2. MEDICATION OVERSIGHT RECONCILIATION
// ----------------------------------------------------------------------------------
// Reconciled total: 171 + 7 + 2 + 1 + 0 + 3 = 184 eligible scheduled doses
const MED_ELIGIBLE = 184;
const MED_ADMINISTERED = 171;
const MED_PENDING = 7;
const MED_MISSED = 2;
const MED_REFUSED = 1;
const MED_WITHHELD = 0;
const MED_OVERDUE = 3;
const MED_COMPLETION_RATE = parseFloat(((MED_ADMINISTERED / MED_ELIGIBLE) * 100).toFixed(1)); // 92.9%

export const MOCK_MEDICATION_SUMMARY: MedicationSummary = {
  eligibleScheduled: MED_ELIGIBLE,
  administered: MED_ADMINISTERED,
  pending: MED_PENDING,
  missed: MED_MISSED,
  refused: MED_REFUSED,
  withheld: MED_WITHHELD,
  overdue: MED_OVERDUE,
  completionRate: MED_COMPLETION_RATE,
};

// Hourly daily medication profile (today — relative to 10:30 AM reference timeline)
export const MOCK_DAILY_MEDICATION_TIMELINE = [
  { hour: '06:00', scheduled: 24, administered: 24, overdue: 0, pending: 0, missed: 0 },
  { hour: '08:00', scheduled: 48, administered: 46, overdue: 1, pending: 0, missed: 1 },
  { hour: '10:00', scheduled: 32, administered: 30, overdue: 2, pending: 0, missed: 0 },
  { hour: '14:00', scheduled: 52, administered: 47, overdue: 0, pending: 5, missed: 0 },
  { hour: '18:00', scheduled: 18, administered: 16, overdue: 0, pending: 2, missed: 0 },
  { hour: '21:00', scheduled: 10, administered: 8, overdue: 0, pending: 0, missed: 1 },
];

// Weekly medication profile (last 7 days)
export const MOCK_WEEKLY_MEDICATION_TIMELINE = [
  { day: 'Wed', administered: 178, eligible: 182, adherence: 97.8, overdue: 1 },
  { day: 'Thu', administered: 180, eligible: 185, adherence: 97.3, overdue: 2 },
  { day: 'Fri', administered: 182, eligible: 184, adherence: 98.9, overdue: 0 },
  { day: 'Sat', administered: 174, eligible: 180, adherence: 96.6, overdue: 2 },
  { day: 'Sun', administered: 176, eligible: 181, adherence: 97.2, overdue: 1 },
  { day: 'Mon', administered: 181, eligible: 186, adherence: 97.3, overdue: 1 },
  { day: 'Today', administered: 171, eligible: 184, adherence: 92.9, overdue: 3 },
];

// ----------------------------------------------------------------------------------
// 3. STAFFING & SHIFTS RECONCILIATION
// ----------------------------------------------------------------------------------
export const MOCK_SHIFTS: ShiftRosterItem[] = [
  {
    id: 'SHIFT-MORNING',
    name: 'Day Shift',
    timeRange: '07:00 – 15:00',
    wing: 'All Wings (Facility-wide)',
    scheduledStaff: 18,
    onDutyStaff: 18,
    confirmedStaff: 18,
    coverageStatus: 'full',
    leadSupervisor: 'Sarah Chen, RN (Lead)',
  },
  {
    id: 'SHIFT-AFTERNOON',
    name: 'Evening Shift',
    timeRange: '15:00 – 23:00',
    wing: 'All Wings (Facility-wide)',
    scheduledStaff: 14,
    onDutyStaff: 0,
    confirmedStaff: 13,
    coverageStatus: 'pending',
    gapNotes: '1 Assistant (T. Vance) pending arrival check-in',
    leadSupervisor: 'Marcus Davies, LPN (Incoming)',
  },
  {
    id: 'SHIFT-NIGHT',
    name: 'Night Watch',
    timeRange: '23:00 – 07:00',
    wing: 'Sunrise & Garden Wings',
    scheduledStaff: 8,
    onDutyStaff: 0,
    confirmedStaff: 7,
    coverageStatus: 'gap',
    gapNotes: 'Short 1 Caregiver in Sunrise Pavilion due to medical leave',
    leadSupervisor: 'David Kim, NP (On Call)',
  },
];

export const MOCK_STAFFING_SUMMARY: StaffingSummary = {
  totalScheduledToday: 26,
  currentlyOnDuty: 18,
  absentOrLeave: 2,
  pendingClockIn: 1,
  coverageGapsCount: 1,
  activeShifts: MOCK_SHIFTS,
};

// Daily staffing chart (hours vs active personnel)
export const MOCK_DAILY_STAFFING_CHART = [
  { time: '07:00', scheduled: 18, actual: 18, minimumRequired: 14 },
  { time: '10:00', scheduled: 18, actual: 18, minimumRequired: 14 },
  { time: '13:00', scheduled: 18, actual: 18, minimumRequired: 14 },
  { time: '15:00', scheduled: 14, actual: 13, minimumRequired: 12 },
  { time: '18:00', scheduled: 14, actual: 14, minimumRequired: 12 },
  { time: '21:00', scheduled: 14, actual: 14, minimumRequired: 10 },
  { time: '23:00', scheduled: 8, actual: 7, minimumRequired: 7 },
  { time: '03:00', scheduled: 8, actual: 7, minimumRequired: 7 },
];

// Weekly staffing trend
export const MOCK_WEEKLY_STAFFING_CHART = [
  { day: 'Wed', fullCoverageRate: 100, staffCount: 28, absences: 0 },
  { day: 'Thu', fullCoverageRate: 98, staffCount: 27, absences: 1 },
  { day: 'Fri', fullCoverageRate: 100, staffCount: 29, absences: 0 },
  { day: 'Sat', fullCoverageRate: 96, staffCount: 25, absences: 1 },
  { day: 'Sun', fullCoverageRate: 94, staffCount: 24, absences: 2 },
  { day: 'Mon', fullCoverageRate: 100, staffCount: 28, absences: 0 },
  { day: 'Today', fullCoverageRate: 96, staffCount: 26, absences: 2 },
];

// ----------------------------------------------------------------------------------
// 4. PRIORITY ACTION QUEUE (Sorted by Urgency)
// ----------------------------------------------------------------------------------
export const MOCK_PRIORITY_ACTIONS: PriorityActionItem[] = [
  {
    id: 'ACT-001',
    priority: 'critical',
    category: 'incident',
    title: 'Fall Incident Clinical Sign-Off Required',
    summary: 'George Washington Carver Jr. in Room 108-A experienced an unassisted transfer fall at 08:45 AM. Immediate vitals stable; requires formal physician evaluation before evening mobility.',
    context: {
      residentName: 'George Washington Carver Jr.',
      room: 'Room 108-A',
      staffName: 'David Kim, NP',
      incidentRef: 'INC-2026-088',
    },
    timestamp: '1h 45m ago (08:45 AM)',
    status: 'escalated',
    actionLabel: 'Review Incident Form',
    navigationPath: '/admin/incidents',
    actionDetails: 'Nurse Kim reported resident attempted to stand without walker. No visible hematoma. Vitals: BP 138/82, HR 74. On-call physician Dr. Mehta notified for neurological assessment.',
  },
  {
    id: 'ACT-002',
    priority: 'critical',
    category: 'medication',
    title: 'Overdue Cardiac Medication — Eleanor Vance',
    summary: 'Lisinopril 10mg scheduled for 10:00 AM (Room 204-B) is 30 minutes overdue. Primary RN engaged in emergency transfer.',
    context: {
      residentName: 'Eleanor Vance',
      room: 'Room 204-B',
      medicineName: 'Lisinopril 10mg',
      staffName: 'Sarah Chen, RN',
    },
    timestamp: '30m overdue',
    status: 'pending',
    actionLabel: 'Assign Backup Nurse',
    navigationPath: '/admin/medications',
    actionDetails: 'Cardio dose protocol specifies within 1 hour tolerance window. Secondary nurse Marcus Davies available in Garden Terrace to administer dose.',
  },
  {
    id: 'ACT-003',
    priority: 'high',
    category: 'staffing',
    title: 'Night Shift Coverage Shortage — Sunrise Wing',
    summary: 'Caregiver Clara Ramos called in sick for Night Shift (23:00 – 07:00). Sunrise Pavilion requires 1 licensed assistant to maintain 1:4 memory care ratio.',
    context: {
      staffName: 'Clara Ramos',
      role: 'Certified Nursing Assistant',
    },
    timestamp: '45m ago (09:45 AM)',
    status: 'pending',
    actionLabel: 'Dispatch On-Call Roster',
    navigationPath: '/admin/emergency-assignments',
    actionDetails: 'On-call pool has 2 available replacements: Anita Bell (CNA, 0 overtime hours) and Jason Miller (LPN). Administrator authorization required to dispatch emergency overtime.',
  },
  {
    id: 'ACT-004',
    priority: 'high',
    category: 'access',
    title: 'Visiting Physician Electronic Access Request',
    summary: 'Dr. Raymond Ward (Cardiology Specialist) requested 48-hour access to medical records for Eleanor Vance ahead of tomorrow’s outpatient consult.',
    context: {
      staffName: 'Dr. Raymond Ward, MD',
      role: 'Visiting Cardiologist · Memorial Hospital',
      residentName: 'Eleanor Vance',
    },
    timestamp: '1h 15m ago (09:15 AM)',
    status: 'pending',
    actionLabel: 'Review Access Scope',
    navigationPath: '/admin/access-requests',
    actionDetails: 'Credentials verified with State Board of Medicine. Request scope limited to Cardiology diagnostics, vitals, and current medication chart under HIPAA guidelines.',
  },
  {
    id: 'ACT-005',
    priority: 'medium',
    category: 'inventory',
    title: 'Low Vault Stock: Metformin 500mg',
    summary: 'Central Pharmacy stock depleted to 18 tablets (minimum buffer: 50). Three residents have daily maintenance prescriptions.',
    context: {
      medicineName: 'Metformin 500mg Extended Release',
    },
    timestamp: '2h ago (08:30 AM)',
    status: 'pending',
    actionLabel: 'Approve Reorder PO',
    navigationPath: '/admin/pharmacy',
    actionDetails: 'Willow Creek Rx distributor PO-4412 prepared for 200 tablets. Standard 4-hour emergency delivery courier available upon administrator release.',
  },
  {
    id: 'ACT-006',
    priority: 'low',
    category: 'medication',
    title: 'Medication Refusal Follow-Up — Arthur Pendelton',
    summary: 'Resident politely declined morning Eye Drops (Artificial Tears) at 10:15 AM citing slight stinging during yesterday’s dose.',
    context: {
      residentName: 'Arthur Pendelton',
      room: 'Room 112',
      medicineName: 'Carboxymethylcellulose 0.5% Drops',
      staffName: 'Marcus Davies, LPN',
    },
    timestamp: '15m ago (10:15 AM)',
    status: 'reviewing',
    actionLabel: 'View Medication Log',
    navigationPath: '/admin/medications',
    actionDetails: 'Non-critical comfort medication. Nurse Marcus noted resident eye is clear, no discharge or erythema. Optometrist Dr. Vance scheduled for Thursday review.',
  },
];

// ----------------------------------------------------------------------------------
// 5. INCIDENTS DATASET
// ----------------------------------------------------------------------------------
export const MOCK_INCIDENTS_LIST: IncidentRecord[] = [
  {
    id: 'INC-001',
    reference: 'INC-2026-088',
    residentName: 'George Washington Carver Jr.',
    room: 'Room 108-A (Orchard Meadow)',
    category: 'Fall',
    occurredAt: 'Today, 08:45 AM',
    severity: 'high',
    status: 'clinical_review',
    reporter: 'David Kim, NP',
    reviewState: 'Pending Dr. Mehta clinical assessment',
    summary: 'Unassisted transfer from armchair to bathroom. Slipped on low rug.',
    notes: 'Vitals stable immediately post-fall. Ice compress applied to left knee as precaution. Mobility restricted until physician signs off.',
  },
  {
    id: 'INC-002',
    reference: 'INC-2026-087',
    residentName: 'Arthur Pendelton',
    room: 'Room 112 (Sunrise Pavilion)',
    category: 'Behavioural',
    occurredAt: 'Yesterday, 19:30 PM',
    severity: 'medium',
    status: 'monitoring',
    reporter: 'Marcus Davies, LPN',
    reviewState: 'Caregiver debrief completed',
    summary: 'Sundowning agitation during dinner seating in communal pavilion.',
    notes: 'Resident guided to sensory garden; calmed within 15 minutes with herbal chamomile tea and low acoustic music. No injury.',
  },
  {
    id: 'INC-003',
    reference: 'INC-2026-086',
    residentName: 'Martha Higgins',
    room: 'Suite 301 (Highland Haven)',
    category: 'Equipment',
    occurredAt: 'Nov 8, 11:20 AM',
    severity: 'low',
    status: 'under_investigation',
    reporter: 'Elena Rostova, RN',
    reviewState: 'Facilities team inspection queued',
    summary: 'Overhead bathroom call cord showed intermittent connectivity.',
    notes: 'Backup wall push-button verified fully functional. Work order WO-8812 assigned to facilities electrician.',
  },
];

export const MOCK_INCIDENT_STATS = {
  totalOpen: 3,
  awaitingClinicalReview: 1,
  underInvestigation: 1,
  monitoring: 1,
  resolvedThisMonth: 14,
  highSeverityCount: 1,
};

export const MOCK_INCIDENT_CATEGORIES_CHART = [
  { category: 'Falls / Slips', open: 1, resolved: 6 },
  { category: 'Behavioural', open: 1, resolved: 4 },
  { category: 'Skin Integrity', open: 0, resolved: 2 },
  { category: 'Equipment / Call Bell', open: 1, resolved: 1 },
  { category: 'Medication Exception', open: 0, resolved: 1 },
];

// ----------------------------------------------------------------------------------
// 6. PHARMACY & INVENTORY ALERTS
// ----------------------------------------------------------------------------------
export const MOCK_INVENTORY_ALERTS: InventoryAlertItem[] = [
  {
    id: 'INV-01',
    medicineName: 'Metformin 500mg ER',
    batchNumber: 'MTF-2026-B4',
    currentStock: 18,
    minimumThreshold: 50,
    unit: 'Tablets',
    type: 'low_stock',
    severity: 'critical',
    actionPrompt: 'Approve PO-4412 for 200 tabs',
    supplier: 'Willow Creek Rx Vault',
    purchaseOrderRef: 'PO-4412',
  },
  {
    id: 'INV-02',
    medicineName: 'Amoxicillin 250mg/5mL Susp.',
    batchNumber: 'AMX-990-EXP',
    currentStock: 4,
    minimumThreshold: 6,
    unit: 'Bottles (100ml)',
    expiryDate: 'Nov 15, 2026 (in 5 days)',
    type: 'expiring_soon',
    severity: 'warning',
    actionPrompt: 'Schedule replacement delivery',
    supplier: 'Apex Healthcare Supply',
  },
  {
    id: 'INV-03',
    medicineName: 'Silver Sulfadiazine 1% Cream',
    batchNumber: 'SSD-774-REC',
    currentStock: 6,
    minimumThreshold: 10,
    unit: 'Tubes (50g)',
    type: 'quarantined',
    severity: 'critical',
    actionPrompt: 'Lot recalled by manufacturer; segregated in quarantine vault',
    supplier: 'MedPharm Global',
  },
  {
    id: 'INV-04',
    medicineName: 'Insulin Glargine (Lantus) 100u/mL',
    batchNumber: 'LAN-331-RCV',
    currentStock: 2,
    minimumThreshold: 5,
    unit: 'Vials (10mL)',
    type: 'pending_receipt',
    severity: 'info',
    actionPrompt: 'PO-4409 dispatched; courier delivery expected 11:30 AM today (in 1 hour)',
    supplier: 'Willow Creek Rx Cold Chain',
    purchaseOrderRef: 'PO-4409',
  },
];

// ----------------------------------------------------------------------------------
// 7. RECENT FACILITY ACTIVITY AUDIT STREAM
// Timestamps reconciled relative to 10:30 AM demonstration timeline
// ----------------------------------------------------------------------------------
export const MOCK_FACILITY_ACTIVITIES: FacilityActivityEvent[] = [
  {
    id: 'ACT-LOG-01',
    actor: { name: 'Sarah Chen', role: 'RN · Day Shift Lead', avatarInitials: 'SC' },
    action: 'administered prescribed morning dose',
    target: 'Eleanor Vance (Metoprolol 25mg)',
    category: 'medication',
    timestamp: '15m ago (10:15 AM)',
    statusBadge: { label: 'Verified', variant: 'success' },
  },
  {
    id: 'ACT-LOG-02',
    actor: { name: 'David Kim', role: 'NP · Clinical Specialist', avatarInitials: 'DK' },
    action: 'submitted fall incident report',
    target: 'George Washington Carver Jr. (INC-2026-088)',
    category: 'safety',
    timestamp: '1h 45m ago (08:45 AM)',
    statusBadge: { label: 'Escalated', variant: 'danger' },
  },
  {
    id: 'ACT-LOG-03',
    actor: { name: 'Marcus Davies', role: 'LPN · Assistant Supervisor', avatarInitials: 'MD' },
    action: 'completed vital signs round',
    target: 'Garden Terrace (8 residents)',
    category: 'resident',
    timestamp: '1h ago (09:30 AM)',
    statusBadge: { label: 'Complete', variant: 'success' },
  },
  {
    id: 'ACT-LOG-04',
    actor: { name: 'Dr. Anita Mehta', role: 'Lead Geriatric Physician', avatarInitials: 'AM' },
    action: 'authorized prescription renewal',
    target: 'Eleanor Vance (Metformin 500mg ER)',
    category: 'medication',
    timestamp: '1h 15m ago (09:15 AM)',
    statusBadge: { label: 'Rx Signed', variant: 'info' },
  },
  {
    id: 'ACT-LOG-05',
    actor: { name: 'Clara Ramos', role: 'Certified Nursing Assistant', avatarInitials: 'CR' },
    action: 'reported unplanned absence',
    target: 'Night Watch Roster (23:00 – 07:00)',
    category: 'staff',
    timestamp: '45m ago (09:45 AM)',
    statusBadge: { label: 'Gap Alert', variant: 'warning' },
  },
  {
    id: 'ACT-LOG-06',
    actor: { name: 'Willow Creek Pharmacy', role: 'Automated Vault System', avatarInitials: 'WP' },
    action: 'logged minimum threshold alert',
    target: 'Metformin 500mg (18 tabs remaining)',
    category: 'inventory',
    timestamp: '2h ago (08:30 AM)',
    statusBadge: { label: 'Low Stock', variant: 'warning' },
  },
  {
    id: 'ACT-LOG-07',
    actor: { name: 'Dr. Raymond Ward', role: 'Visiting Cardiologist', avatarInitials: 'RW' },
    action: 'submitted electronic record access request',
    target: 'Eleanor Vance (Cardiology scope)',
    category: 'access',
    timestamp: '1h 15m ago (09:15 AM)',
    statusBadge: { label: 'Pending Review', variant: 'info' },
  },
  {
    id: 'ACT-LOG-08',
    actor: { name: 'Elena Rostova', role: 'RN · Memory Care Wing', avatarInitials: 'ER' },
    action: 'completed care plan review',
    target: 'Arthur Pendelton (Memory Tier 3)',
    category: 'resident',
    timestamp: '2h 30m ago (08:00 AM)',
    statusBadge: { label: 'Logged', variant: 'secondary' },
  },
];
