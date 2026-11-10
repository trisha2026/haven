import type { FacilityWing } from '../types/resident.ts';

export type ShiftType = 'day' | 'evening' | 'night';
export type AttendanceStatus = 'present' | 'late' | 'excused' | 'leave' | 'absent' | 'gap' | 'on_time' | 'delayed';
export type LeaveType = 'Casual Leave' | 'Sick / Medical Leave' | 'Earned Leave' | 'Bereavement Leave' | 'Training / CME';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
export type EmergencyAssignmentStatus = 'active' | 'scheduled' | 'expired' | 'revoked';

export interface ShiftRosterDefinition {
  id: string; // e.g. "SHIFT-DAY"
  name: string; // "Day Shift"
  shiftName?: string;
  timeRange: string; // "07:00 – 15:00"
  startTime?: string;
  endTime?: string;
  date?: string;
  type: ShiftType;
  wing: string;
  minimumRequired: number;
  scheduledStaffCount: number;
  assignedStaffCount?: number;
  onDutyStaffCount: number;
  leadSupervisor: string;
  leadRole: string;
  coverageStatus: 'full' | 'pending' | 'gap';
  gapNotes?: string;
  assignedStaffIds: string[];
  staffMembers?: { name: string; role: string }[];
}

export type ShiftRoster = ShiftRosterDefinition;

export interface AttendanceRecord {
  id: string; // e.g. "ATT-2026-01"
  date: string;
  employeeId: string;
  employeeName: string;
  staffName?: string;
  role: string;
  wing: FacilityWing;
  shiftName: string;
  shift?: string;
  scheduledTime: string;
  checkInTime?: string;
  checkInMethod?: string;
  checkOutTime?: string;
  breakDurationMinutes: number;
  status: AttendanceStatus;
  notes?: string;
}

export type DailyAttendanceRecord = AttendanceRecord & {
  staffName: string;
  shift: string;
  checkInMethod: string;
};

export interface LeaveCoverageInfo {
  isCoverArranged: boolean;
  coverStaffName?: string;
  affectedWing?: string;
}

export interface LeaveRequest {
  id: string; // e.g. "LV-2026-081"
  requestId?: string;
  employeeId: string;
  employeeName: string;
  staffName?: string;
  role: string;
  wing: FacilityWing;
  leaveType: LeaveType | string;
  startDate: string;
  endDate: string;
  totalDays: number;
  days?: number;
  reason: string;
  submittedAt: string;
  status: LeaveStatus | string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  decidedBy?: string;
  decidedAt?: string;
  decisionNotes?: string;
  affectedShifts: string[];
  coverageAssessment: 'coverage_adequate' | 'coverage_review_required' | 'critical_shortage' | LeaveCoverageInfo;
}

export interface EmergencyAssignment {
  id: string; // e.g. "EMG-2026-003"
  assignmentId?: string;
  employeeId?: string;
  staffId?: string;
  employeeName?: string;
  staffName?: string;
  role?: string;
  staffRole?: string;
  originWing?: string;
  targetWing: FacilityWing | string;
  targetScope?: string; // e.g. "Sunrise Pavilion (Memory Care 1:4 ratio)" or "Room 108-A 1-on-1 standby"
  startTime?: string;
  dispatchedAt?: string;
  expiryTime?: string;
  expiresAt?: string;
  authorizedBy?: string;
  dispatchedBy?: string;
  authorizedTimestamp?: string;
  reason: string;
  status: EmergencyAssignmentStatus | string;
  scopeNotes?: string;
  notes?: string;
}

export const MOCK_SHIFTS_ROSTER: ShiftRosterDefinition[] = [
  {
    id: 'SHIFT-DAY',
    name: 'Day Shift',
    timeRange: '07:00 – 15:00',
    type: 'day',
    wing: 'All Wings (Facility-wide)',
    minimumRequired: 14,
    scheduledStaffCount: 18,
    onDutyStaffCount: 18,
    leadSupervisor: 'Priya Shetty, RN',
    leadRole: 'Senior Registered Nurse',
    coverageStatus: 'full',
    assignedStaffIds: ['CG-0142', 'CG-0118', 'NP-0012', 'CG-0156', 'PT-008'],
  },
  {
    id: 'SHIFT-EVENING',
    name: 'Evening Shift',
    timeRange: '15:00 – 23:00',
    type: 'evening',
    wing: 'All Wings (Facility-wide)',
    minimumRequired: 12,
    scheduledStaffCount: 14,
    onDutyStaffCount: 0,
    leadSupervisor: 'Rahul Patil, LPN',
    leadRole: 'Incoming Shift Supervisor',
    coverageStatus: 'pending',
    gapNotes: '1 Assistant (T. Joshi) pending arrival check-in confirmation',
    assignedStaffIds: ['LPN-031'],
  },
  {
    id: 'SHIFT-NIGHT',
    name: 'Night Watch',
    timeRange: '23:00 – 07:00',
    type: 'night',
    wing: 'Sunrise & Garden Wings',
    minimumRequired: 7,
    scheduledStaffCount: 8,
    onDutyStaffCount: 0,
    leadSupervisor: 'Deepak Gowda, NP',
    leadRole: 'Nurse Practitioner (On Call)',
    coverageStatus: 'gap',
    gapNotes: 'Short 1 Caregiver in Sunrise Pavilion due to Anjali Deshmukh sick leave',
    assignedStaffIds: [],
  },
];

export const MOCK_DAILY_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'ATT-2026-01',
    date: 'Today, Nov 10, 2026',
    employeeId: 'CG-0142',
    employeeName: 'Priya Shetty',
    role: 'Senior Registered Nurse',
    wing: 'Garden Terrace',
    shiftName: 'Day Shift',
    scheduledTime: '07:00 – 15:00',
    checkInTime: '06:52 AM',
    breakDurationMinutes: 30,
    status: 'present',
    notes: 'Completed morning vital verification round for 8 residents.',
  },
  {
    id: 'ATT-2026-02',
    date: 'Today, Nov 10, 2026',
    employeeId: 'CG-0118',
    employeeName: 'Rahul Patil',
    role: 'Licensed Practical Nurse',
    wing: 'Sunrise Pavilion',
    shiftName: 'Day Shift',
    scheduledTime: '07:00 – 15:00',
    checkInTime: '06:58 AM',
    breakDurationMinutes: 30,
    status: 'present',
    notes: 'Memory care routine check-in completed.',
  },
  {
    id: 'ATT-2026-03',
    date: 'Today, Nov 10, 2026',
    employeeId: 'NP-0012',
    employeeName: 'Deepak Gowda',
    role: 'Nurse Practitioner',
    wing: 'Orchard Meadow',
    shiftName: 'Day Shift',
    scheduledTime: '07:00 – 15:00',
    checkInTime: '06:45 AM',
    breakDurationMinutes: 20,
    status: 'present',
    notes: 'Reviewed fall incident for Raghavendra Kulkarni (INC-2026-088).',
  },
  {
    id: 'ATT-2026-04',
    date: 'Today, Nov 10, 2026',
    employeeId: 'CG-0156',
    employeeName: 'Sneha Joshi',
    role: 'Senior Registered Nurse',
    wing: 'Highland Haven',
    shiftName: 'Day Shift',
    scheduledTime: '07:00 – 15:00',
    checkInTime: '07:04 AM',
    breakDurationMinutes: 30,
    status: 'present',
    notes: 'Independent living morning wellness rounds.',
  },
  {
    id: 'ATT-2026-05',
    date: 'Today, Nov 10, 2026',
    employeeId: 'CNA-018',
    employeeName: 'Anjali Deshmukh',
    role: 'Certified Nursing Assistant',
    wing: 'Sunrise Pavilion',
    shiftName: 'Night Watch',
    scheduledTime: '23:00 – 07:00',
    breakDurationMinutes: 0,
    status: 'leave',
    notes: 'Medical leave approved (viral fever). Replacement required for 1:4 ratio.',
  },
  {
    id: 'ATT-2026-06',
    date: 'Today, Nov 10, 2026',
    employeeId: 'PT-008',
    employeeName: 'Kavya Reddy',
    role: 'Physiotherapist',
    wing: 'Orchard Meadow',
    shiftName: 'Day Shift',
    scheduledTime: '07:00 – 15:00',
    checkInTime: '07:10 AM',
    breakDurationMinutes: 45,
    status: 'late',
    notes: 'Traffic delay; notified charge nurse in advance.',
  },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LV-2026-081',
    employeeId: 'CNA-018',
    employeeName: 'Anjali Deshmukh',
    role: 'Certified Nursing Assistant',
    wing: 'Sunrise Pavilion',
    leaveType: 'Sick / Medical Leave',
    startDate: 'Nov 10, 2026',
    endDate: 'Nov 11, 2026',
    totalDays: 2,
    reason: 'Acute seasonal viral infection; medical certificate submitted.',
    submittedAt: 'Today, 09:45 AM',
    status: 'approved',
    reviewedBy: 'Devika Ramanathan',
    reviewedAt: 'Today, 10:00 AM',
    reviewerNotes: 'Approved. Dispatched Sunita Reddy from on-call pool to maintain Memory Care ratio.',
    affectedShifts: ['Night Watch (Nov 10)', 'Night Watch (Nov 11)'],
    coverageAssessment: 'coverage_review_required',
  },
  {
    id: 'LV-2026-082',
    employeeId: 'CG-0142',
    employeeName: 'Priya Shetty',
    role: 'Senior Registered Nurse',
    wing: 'Garden Terrace',
    leaveType: 'Earned Leave',
    startDate: 'Nov 22, 2026',
    endDate: 'Nov 25, 2026',
    totalDays: 4,
    reason: 'Annual family festival visit to Udupi.',
    submittedAt: 'Nov 07, 2026',
    status: 'approved',
    reviewedBy: 'Devika Ramanathan',
    reviewedAt: 'Nov 08, 2026',
    reviewerNotes: 'Approved. Sneha Joshi agreed to rotate day supervisor duties.',
    affectedShifts: ['Day Shift (Nov 22 – 25)'],
    coverageAssessment: 'coverage_adequate',
  },
  {
    id: 'LV-2026-083',
    employeeId: 'LPN-031',
    employeeName: 'Karan Verma',
    role: 'Licensed Practical Nurse',
    wing: 'Orchard Meadow',
    leaveType: 'Training / CME',
    startDate: 'Nov 18, 2026',
    endDate: 'Nov 19, 2026',
    totalDays: 2,
    reason: 'State Geriatric Palliative Care Conference at NIMHANS Bengaluru.',
    submittedAt: 'Yesterday, 14:30 PM',
    status: 'pending',
    affectedShifts: ['Evening Shift (Nov 18)', 'Evening Shift (Nov 19)'],
    coverageAssessment: 'coverage_review_required',
  },
  {
    id: 'LV-2026-084',
    employeeId: 'PT-008',
    employeeName: 'Kavya Reddy',
    role: 'Physiotherapist',
    wing: 'Orchard Meadow',
    leaveType: 'Casual Leave',
    startDate: 'Dec 02, 2026',
    endDate: 'Dec 03, 2026',
    totalDays: 2,
    reason: 'Personal family engagement.',
    submittedAt: 'Nov 09, 2026',
    status: 'pending',
    affectedShifts: ['Day Shift (Dec 02 – 03)'],
    coverageAssessment: 'coverage_adequate',
  },
];

export const MOCK_EMERGENCY_ASSIGNMENTS: EmergencyAssignment[] = [
  {
    id: 'EMG-2026-003',
    employeeId: 'CNA-022',
    employeeName: 'Sunita Reddy',
    role: 'Certified Nursing Assistant',
    targetWing: 'Sunrise Pavilion',
    targetScope: 'Sunrise Pavilion Memory Pod (1:4 ratio compliance)',
    startTime: 'Today, 23:00 PM',
    expiryTime: 'Tomorrow, 07:00 AM (8 Hours Shift Duration)',
    authorizedBy: 'Devika Ramanathan (Administrator)',
    authorizedTimestamp: 'Today, 10:15 AM',
    reason: 'Temporary emergency replacement for Anjali Deshmukh (approved medical leave).',
    status: 'scheduled',
    notes: 'Sunita accepted overtime call-in. Verified 0 overtime hours previously logged this pay period.',
  },
  {
    id: 'EMG-2026-002',
    employeeId: 'CG-0118',
    employeeName: 'Rahul Patil',
    role: 'Licensed Practical Nurse',
    targetWing: 'Garden Terrace',
    targetScope: 'Room 204-B (Overdue cardiac medication administration backup)',
    startTime: 'Today, 10:20 AM',
    expiryTime: 'Today, 11:30 AM (70 Minutes window)',
    authorizedBy: 'Devika Ramanathan (Administrator)',
    authorizedTimestamp: 'Today, 10:20 AM',
    reason: 'Primary nurse engaged in emergency transit; secondary nurse deployed to administer overdue Lisinopril.',
    status: 'active',
    notes: 'Temporary clinical cross-coverage scope authorized under protocol SEC-04.',
  },
];

// Augment workforce records for administrator views
MOCK_DAILY_ATTENDANCE.forEach((a: AttendanceRecord) => {
  a.staffName = a.employeeName;
  a.shift = a.shiftName;
  a.checkInMethod = a.checkInTime ? 'Biometric Console #2' : 'Pending Check-in';
  if (a.status === 'present') a.status = 'on_time';
  else if (a.status === 'late') a.status = 'delayed';
});

MOCK_SHIFTS_ROSTER.forEach((s) => {
  s.shiftName = s.name;
  s.startTime = s.timeRange.split('–')[0]?.trim() || '07:00';
  s.endTime = s.timeRange.split('–')[1]?.trim() || '15:00';
  s.date = 'Today, Nov 10';
  s.assignedStaffCount = s.onDutyStaffCount || s.scheduledStaffCount;
  s.staffMembers = [
    { name: s.leadSupervisor, role: s.leadRole },
    { name: 'Sneha Joshi', role: 'Staff Nurse' },
  ];
});

MOCK_LEAVE_REQUESTS.forEach((l) => {
  l.requestId = l.id;
  l.staffName = l.employeeName;
  l.days = l.totalDays;
  const isCovered = l.coverageAssessment === 'coverage_adequate';
  l.coverageAssessment = {
    isCoverArranged: isCovered,
    coverStaffName: isCovered ? 'Priya Shetty, RN' : undefined,
    affectedWing: l.wing,
  };
});

MOCK_EMERGENCY_ASSIGNMENTS.forEach((e) => {
  e.assignmentId = e.id;
  e.staffId = e.employeeId;
  e.staffName = e.employeeName;
  e.staffRole = e.role;
  e.originWing = 'Float Pool';
  e.dispatchedAt = e.startTime || '10:00 AM';
  e.expiresAt = e.expiryTime || '4 Hours';
  e.dispatchedBy = e.authorizedBy;
  e.scopeNotes = e.targetScope;
});

export const MOCK_SHIFT_ROSTERS = MOCK_SHIFTS_ROSTER;


