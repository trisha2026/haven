import type { FacilityWing } from '../types/resident.ts';
import { MOCK_FULL_RESIDENTS } from './residentsData.ts';

export type CaregiverRole = 'Senior Registered Nurse' | 'Licensed Practical Nurse' | 'Nurse Practitioner' | 'Certified Nursing Assistant' | 'Physiotherapist';
export type StaffAvailability = 'on_duty' | 'available' | 'on_break' | 'off_duty' | 'on_leave';
export type StaffStatus = 'active' | 'temporary_leave' | 'probation' | 'inactive';

export interface CaregiverAssignment {
  residentId: string;
  residentName: string;
  room: string;
  wing: FacilityWing;
  careLevel: string;
  assignedSince: string;
  isPrimary: boolean;
}

export interface CaregiverShiftRecord {
  date: string;
  shiftName: string;
  timeRange: string;
  wing: FacilityWing;
  attendanceStatus: 'present' | 'late' | 'excused' | 'leave';
  hoursWorked: number;
}

export interface CaregiverStaff {
  id: string; // e.g. "CG-0142"
  employeeId?: string;
  name?: string;
  fullName: string;
  preferredName: string;
  role: CaregiverRole | string;
  department?: string;
  credentials: string; // e.g. "B.Sc Nursing, RN (KNC-RN-39182)"
  registrationNumber: string; // e.g. "KNC-RN-39182"
  kncRegistrationNumber?: string;
  registrationStatus: 'verified' | 'renewal_pending';
  email: string;
  phone: string;
  assignedWing: FacilityWing | string;
  currentShift: 'Day Shift (07:00 – 15:00)' | 'Evening Shift (15:00 – 23:00)' | 'Night Watch (23:00 – 07:00)' | 'Off Duty' | string;
  shiftTiming?: string;
  availability: StaffAvailability;
  status: StaffStatus | string;
  joinDate: string;
  experienceYears?: number;
  assignedResidentIds: string[];
  assignedResidentsCount?: number;
  assignedResidents?: { id: string; name: string; room: string; careLevel: string }[];
  skills: string[];
  certifications: string[];
  leaveBalanceDays: number;
  recentShifts: CaregiverShiftRecord[];
  notes: string;
}

export type Caregiver = CaregiverStaff & {
  employeeId: string;
  name: string;
  kncRegistrationNumber: string;
  assignedResidentsCount: number;
  assignedResidents: { id: string; name: string; room: string; careLevel: string }[];
  shiftTiming: string;
};

export const MOCK_CAREGIVERS: CaregiverStaff[] = [
  {
    id: 'CG-0142',
    fullName: 'Priya Shetty',
    preferredName: 'Priya',
    role: 'Senior Registered Nurse',
    credentials: 'M.Sc Nursing, RN',
    registrationNumber: 'KNC-RN-39182',
    registrationStatus: 'verified',
    email: 'priya.shetty@haven-care.in.example',
    phone: '+91 98860 17834',
    assignedWing: 'Garden Terrace',
    currentShift: 'Day Shift (07:00 – 15:00)',
    availability: 'on_duty',
    status: 'active',
    joinDate: 'March 15, 2022',
    assignedResidentIds: ['RES-041', 'RES-001', 'RES-002', 'RES-003', 'RES-004'],
    skills: ['Geriatric Medication Administration', 'Wound Management', 'Cardiovascular Monitoring', 'Emergency Triage'],
    certifications: ['Advanced Cardiac Life Support (ACLS)', 'Geriatric Care Excellence Certified', 'Palliative Nursing'],
    leaveBalanceDays: 14,
    recentShifts: [
      { date: 'Today, Nov 10', shiftName: 'Day Shift', timeRange: '07:00 – 15:00', wing: 'Garden Terrace', attendanceStatus: 'present', hoursWorked: 8 },
      { date: 'Nov 09, 2026', shiftName: 'Day Shift', timeRange: '07:00 – 15:00', wing: 'Garden Terrace', attendanceStatus: 'present', hoursWorked: 8 },
      { date: 'Nov 08, 2026', shiftName: 'Day Shift', timeRange: '07:00 – 15:00', wing: 'Garden Terrace', attendanceStatus: 'present', hoursWorked: 8 },
    ],
    notes: 'Lead RN for Garden Terrace. Primary point of contact for routine clinical rounds.',
  },
  {
    id: 'CG-0118',
    fullName: 'Rahul Patil',
    preferredName: 'Rahul',
    role: 'Licensed Practical Nurse',
    credentials: 'Diploma in Nursing Administration, LPN',
    registrationNumber: 'KNC-LPN-48192',
    registrationStatus: 'verified',
    email: 'rahul.patil@haven-care.in.example',
    phone: '+91 98450 11822',
    assignedWing: 'Sunrise Pavilion',
    currentShift: 'Day Shift (07:00 – 15:00)',
    availability: 'on_duty',
    status: 'active',
    joinDate: 'June 01, 2023',
    assignedResidentIds: ['RES-042', 'RES-015', 'RES-016', 'RES-017'],
    skills: ['Memory Care De-escalation', 'Subcutaneous Injections', 'Sensory Therapy', 'Fall Prevention'],
    certifications: ['Certified Dementia Practitioner', 'Basic Life Support (BLS)'],
    leaveBalanceDays: 11,
    recentShifts: [
      { date: 'Today, Nov 10', shiftName: 'Day Shift', timeRange: '07:00 – 15:00', wing: 'Sunrise Pavilion', attendanceStatus: 'present', hoursWorked: 8 },
      { date: 'Nov 09, 2026', shiftName: 'Day Shift', timeRange: '07:00 – 15:00', wing: 'Sunrise Pavilion', attendanceStatus: 'present', hoursWorked: 8 },
    ],
    notes: 'Memory care specialist. Highly effective in handling sundowning agitation.',
  },
  {
    id: 'NP-0012',
    fullName: 'Deepak Gowda',
    preferredName: 'Deepak',
    role: 'Nurse Practitioner',
    credentials: 'Master of Science in Gerontological Nursing, NP',
    registrationNumber: 'KNC-NP-12904',
    registrationStatus: 'verified',
    email: 'deepak.gowda@haven-care.in.example',
    phone: '+91 99001 44521',
    assignedWing: 'Orchard Meadow',
    currentShift: 'Day Shift (07:00 – 15:00)',
    availability: 'on_duty',
    status: 'active',
    joinDate: 'October 10, 2021',
    assignedResidentIds: ['RES-044', 'RES-029', 'RES-030', 'RES-031'],
    skills: ['Complex Clinical Assessments', 'Post-Fall Neurological Reviews', 'Enteral Tube Care', 'Catheter Management'],
    certifications: ['Advanced Practice Registered Nurse (APRN)', 'Wound & Stoma Care Certified', 'ACLS Instructor'],
    leaveBalanceDays: 18,
    recentShifts: [
      { date: 'Today, Nov 10', shiftName: 'Day Shift', timeRange: '07:00 – 15:00', wing: 'Orchard Meadow', attendanceStatus: 'present', hoursWorked: 8 },
    ],
    notes: 'Skilled Nursing Lead. Directly assists Dr. Mehta with clinical intake assessments.',
  },
  {
    id: 'CG-0156',
    fullName: 'Sneha Joshi',
    preferredName: 'Sneha',
    role: 'Senior Registered Nurse',
    credentials: 'B.Sc Nursing, RN',
    registrationNumber: 'KNC-RN-56120',
    registrationStatus: 'verified',
    email: 'sneha.joshi@haven-care.in.example',
    phone: '+91 97410 88291',
    assignedWing: 'Highland Haven',
    currentShift: 'Day Shift (07:00 – 15:00)',
    availability: 'on_duty',
    status: 'active',
    joinDate: 'January 20, 2024',
    assignedResidentIds: ['RES-043', 'RES-046', 'RES-047', 'RES-048'],
    skills: ['Independent Living Wellness Rounds', 'Preventive Health Checks', 'Chronic Disease Education'],
    certifications: ['BLS Certified', 'Geriatric Health Coach'],
    leaveBalanceDays: 16,
    recentShifts: [
      { date: 'Today, Nov 10', shiftName: 'Day Shift', timeRange: '07:00 – 15:00', wing: 'Highland Haven', attendanceStatus: 'present', hoursWorked: 8 },
    ],
    notes: 'Coordinates independent wellness checks and outpatient clinic visits.',
  },
  {
    id: 'CNA-018',
    fullName: 'Anjali Deshmukh',
    preferredName: 'Anjali',
    role: 'Certified Nursing Assistant',
    credentials: 'Certified Patient Care Assistant (CPCA)',
    registrationNumber: 'PCA-IN-9912',
    registrationStatus: 'verified',
    email: 'anjali.deshmukh@haven-care.in.example',
    phone: '+91 96110 33490',
    assignedWing: 'Sunrise Pavilion',
    currentShift: 'Off Duty',
    availability: 'on_leave',
    status: 'temporary_leave',
    joinDate: 'August 14, 2023',
    assignedResidentIds: ['RES-018', 'RES-019'],
    skills: ['ADL Support', 'Mobility Transfer Assistance', 'Meal Assist', 'Vitals Logging'],
    certifications: ['Patient Safety & Fall Prevention Certification'],
    leaveBalanceDays: 8,
    recentShifts: [
      { date: 'Nov 09, 2026', shiftName: 'Night Watch', timeRange: '23:00 – 07:00', wing: 'Sunrise Pavilion', attendanceStatus: 'present', hoursWorked: 8 },
    ],
    notes: 'Called in sick for tonight\'s Night Shift (medical leave). Emergency cover pending.',
  },
  {
    id: 'CNA-022',
    fullName: 'Sunita Reddy',
    preferredName: 'Sunita',
    role: 'Certified Nursing Assistant',
    credentials: 'Certified Geriatric Care Assistant',
    registrationNumber: 'PCA-IN-8831',
    registrationStatus: 'verified',
    email: 'sunita.reddy@haven-care.in.example',
    phone: '+91 98800 55123',
    assignedWing: 'Garden Terrace',
    currentShift: 'Off Duty',
    availability: 'available',
    status: 'active',
    joinDate: 'March 10, 2024',
    assignedResidentIds: ['RES-005', 'RES-006'],
    skills: ['Bedside Assistance', 'Oral Care', 'Comfort Rounding'],
    certifications: ['BLS', 'Infection Control Protocol'],
    leaveBalanceDays: 15,
    recentShifts: [],
    notes: 'On-call volunteer pool for emergency coverage. 0 overtime hours this week.',
  },
  {
    id: 'LPN-031',
    fullName: 'Karan Verma',
    preferredName: 'Karan',
    role: 'Licensed Practical Nurse',
    credentials: 'Diploma in General Nursing, LPN',
    registrationNumber: 'KNC-LPN-33120',
    registrationStatus: 'verified',
    email: 'karan.verma@haven-care.in.example',
    phone: '+91 94800 66721',
    assignedWing: 'Orchard Meadow',
    currentShift: 'Evening Shift (15:00 – 23:00)',
    availability: 'available',
    status: 'active',
    joinDate: 'November 05, 2023',
    assignedResidentIds: ['RES-032', 'RES-033'],
    skills: ['Medication Administration', 'Catheter Care', 'Dressing Changes'],
    certifications: ['BLS Certified'],
    leaveBalanceDays: 12,
    recentShifts: [],
    notes: 'Scheduled for evening shift. Eligible for backup emergency allocation.',
  },
  {
    id: 'PT-008',
    fullName: 'Kavya Reddy',
    preferredName: 'Kavya',
    role: 'Physiotherapist',
    credentials: 'Master of Physiotherapy (MPT - Neuro & Geriatric)',
    registrationNumber: 'KCPT-9941',
    registrationStatus: 'verified',
    email: 'kavya.reddy@haven-care.in.example',
    phone: '+91 98450 77123',
    assignedWing: 'Orchard Meadow',
    currentShift: 'Day Shift (07:00 – 15:00)',
    availability: 'on_duty',
    status: 'active',
    joinDate: 'September 12, 2022',
    assignedResidentIds: ['RES-044', 'RES-034', 'RES-035'],
    skills: ['Gait Training', 'Balance Rehabilitation', 'Post-Fall Recovery', 'Assistive Device Fitting'],
    certifications: ['Vestibular Rehabilitation Specialist', 'Geriatric Functional Mobility Assessment'],
    leaveBalanceDays: 17,
    recentShifts: [
      { date: 'Today, Nov 10', shiftName: 'Day Shift', timeRange: '07:00 – 15:00', wing: 'Orchard Meadow', attendanceStatus: 'present', hoursWorked: 8 },
    ],
    notes: 'Conducting post-fall physical therapy consult for Raghavendra Kulkarni.',
  },
];

// Augment for view components
MOCK_CAREGIVERS.forEach((c) => {
  c.employeeId = c.id;
  c.name = c.fullName;
  c.kncRegistrationNumber = c.registrationNumber;
  c.experienceYears = c.joinDate.includes('2022') ? 5 : 3;
  c.assignedResidentsCount = c.assignedResidentIds.length;
  c.shiftTiming = c.currentShift;
  c.department = 'Nursing & Caregiving';
  c.status = c.availability === 'on_duty' ? 'On Duty' : c.availability === 'on_leave' ? 'On Leave' : 'Off Duty';
  c.assignedResidents = c.assignedResidentIds.map((rid) => {
    const r = MOCK_FULL_RESIDENTS.find((x) => x.id === rid);
    return {
      id: rid,
      name: r ? r.fullName : 'Resident',
      room: r ? r.placement.room : 'Room 101',
      careLevel: r ? r.careLevel : 'Assisted Living',
    };
  });
});

