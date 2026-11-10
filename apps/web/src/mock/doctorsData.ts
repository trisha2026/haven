export type DoctorSpecialty =
  | 'Geriatric Medicine'
  | 'Cardiovascular Medicine'
  | 'Internal Medicine'
  | 'Family Medicine'
  | 'Neurology & Cognitive Health'
  | 'Psychiatry & Memory Care';

export type DoctorType = 'Lead Attending Physician' | 'Visiting Specialist' | 'On-Call Consultant';

export interface DoctorResidentAssignment {
  residentId: string;
  residentName: string;
  room: string;
  wing: string;
  careLevel: string;
  assignmentType: 'Primary Physician' | 'Consulting Specialist';
  assignedDate: string;
  accessStatus: 'active' | 'pending_approval' | 'expired';
  accessExpiry?: string;
}

export interface DoctorStaff {
  id: string; // e.g. "DOC-001"
  name?: string;
  fullName: string;
  preferredName: string;
  title: string;
  type: DoctorType;
  specialty: DoctorSpecialty | string;
  qualifications: string;
  qualification?: string;
  registrationNumber: string; // e.g. "KMC-88391"
  kmcNumber?: string;
  registrationCouncil: string;
  verificationStatus: 'verified' | 'pending_verification';
  hospitalAffiliation: string;
  email: string;
  phone: string;
  onCallSchedule: string;
  visitingSchedule?: string;
  assignedResidents: (DoctorResidentAssignment & { primaryCondition?: string })[];
  assignedResidentsCount?: number;
  availability?: string;
  bio: string;
  activeAccessGrantsCount: number;
  pendingAccessCount: number;
}

export type Doctor = DoctorStaff & {
  name: string;
  kmcNumber: string;
  qualification: string;
  visitingSchedule: string;
  assignedResidentsCount: number;
  availability: string;
};

export const MOCK_DOCTORS: DoctorStaff[] = [
  {
    id: 'DOC-001',
    fullName: 'Dr. Anita Mehta',
    preferredName: 'Dr. Anita',
    title: 'MD, FICP · Lead Geriatrician',
    type: 'Lead Attending Physician',
    specialty: 'Geriatric Medicine',
    qualifications: 'MBBS, MD (General Medicine), Post-Doctoral Fellowship in Geriatrics',
    registrationNumber: 'KMC-88391',
    registrationCouncil: 'Karnataka Medical Council (NMC Registered)',
    verificationStatus: 'verified',
    hospitalAffiliation: 'HAVEN Clinical Directorate & Manipal Hospital',
    email: 'anita.mehta@haven-care.in.example',
    phone: '+91 94480 12471',
    onCallSchedule: 'Mon – Sat · 08:30 – 16:30 (On-call 24/7 for acute escalations)',
    bio: 'Over 22 years of clinical geriatrics experience leading multidisciplinary elderly-care teams, polypharmacy rationalization, and advance care planning.',
    activeAccessGrantsCount: 38,
    pendingAccessCount: 0,
    assignedResidents: [
      { residentId: 'RES-044', residentName: 'Raghavendra Kulkarni', room: 'Room 108-A', wing: 'Orchard Meadow', careLevel: 'Skilled Nursing', assignmentType: 'Primary Physician', assignedDate: 'Aug 12, 2023', accessStatus: 'active' },
      { residentId: 'RES-041', residentName: 'Ananya Sharma', room: 'Room 204-B', wing: 'Garden Terrace', careLevel: 'Assisted Living', assignmentType: 'Primary Physician', assignedDate: 'Apr 04, 2024', accessStatus: 'active' },
      { residentId: 'RES-042', residentName: 'Vikram Hegde', room: 'Room 112', wing: 'Sunrise Pavilion', careLevel: 'Memory Care', assignmentType: 'Primary Physician', assignedDate: 'Sep 18, 2023', accessStatus: 'active' },
      { residentId: 'RES-043', residentName: 'Nandini Iyer', room: 'Suite 301', wing: 'Highland Haven', careLevel: 'Independent Living', assignmentType: 'Primary Physician', assignedDate: 'Jan 10, 2024', accessStatus: 'active' },
    ],
  },
  {
    id: 'DOC-002',
    fullName: 'Dr. Arjun Rao',
    preferredName: 'Dr. Arjun',
    title: 'MD, DM (Cardiology) · Visiting Cardiologist',
    type: 'Visiting Specialist',
    specialty: 'Cardiovascular Medicine',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FACC',
    registrationNumber: 'KMC-68412',
    registrationCouncil: 'Karnataka Medical Council (NMC Registered)',
    verificationStatus: 'verified',
    hospitalAffiliation: 'Manipal Hospital, Bengaluru',
    email: 'arjun.rao@haven-care.in.example',
    phone: '+91 98450 68412',
    onCallSchedule: 'Tuesdays & Thursdays · 10:00 – 14:00 (Rounds & Outpatient consults)',
    bio: 'Consultant Senior Interventional Cardiologist specializing in geriatric cardiovascular disease, heart failure management, and hypertension control.',
    activeAccessGrantsCount: 3,
    pendingAccessCount: 1,
    assignedResidents: [
      { residentId: 'RES-041', residentName: 'Ananya Sharma', room: 'Room 204-B', wing: 'Garden Terrace', careLevel: 'Assisted Living', assignmentType: 'Consulting Specialist', assignedDate: 'May 10, 2024', accessStatus: 'pending_approval', accessExpiry: 'Nov 12, 2026' },
      { residentId: 'RES-044', residentName: 'Raghavendra Kulkarni', room: 'Room 108-A', wing: 'Orchard Meadow', careLevel: 'Skilled Nursing', assignmentType: 'Consulting Specialist', assignedDate: 'Aug 20, 2023', accessStatus: 'active', accessExpiry: 'Nov 30, 2026' },
    ],
  },
  {
    id: 'DOC-003',
    fullName: 'Dr. Priya Nair',
    preferredName: 'Dr. Priya',
    title: 'MD (Internal Medicine) · Consultant Physician',
    type: 'Visiting Specialist',
    specialty: 'Internal Medicine',
    qualifications: 'MBBS, MD (General Medicine), MRCP (UK)',
    registrationNumber: 'KMC-74219',
    registrationCouncil: 'Karnataka Medical Council (NMC Registered)',
    verificationStatus: 'verified',
    hospitalAffiliation: 'Apollo Specialty Hospital, Bengaluru',
    email: 'priya.nair@haven-care.in.example',
    phone: '+91 98450 74219',
    onCallSchedule: 'Wednesdays & Fridays · 14:00 – 18:00',
    bio: 'Internal medicine specialist dedicated to chronic multi-morbidity in aging adults, metabolic syndrome, and geriatric pharmacotherapy.',
    activeAccessGrantsCount: 8,
    pendingAccessCount: 0,
    assignedResidents: [
      { residentId: 'RES-001', residentName: 'Aarav Deshmukh', room: 'Room 201-A', wing: 'Garden Terrace', careLevel: 'Assisted Living', assignmentType: 'Primary Physician', assignedDate: 'Feb 15, 2024', accessStatus: 'active' },
      { residentId: 'RES-002', residentName: 'Kavya Reddy', room: 'Room 201-B', wing: 'Garden Terrace', careLevel: 'Assisted Living', assignmentType: 'Primary Physician', assignedDate: 'Feb 15, 2024', accessStatus: 'active' },
    ],
  },
  {
    id: 'DOC-004',
    fullName: 'Dr. Karthik Srinivasan',
    preferredName: 'Dr. Karthik',
    title: 'MD (Family Medicine) · Attending Physician',
    type: 'Lead Attending Physician',
    specialty: 'Family Medicine',
    qualifications: 'MBBS, DNB (Family Medicine)',
    registrationNumber: 'KMC-61842',
    registrationCouncil: 'Karnataka Medical Council (NMC Registered)',
    verificationStatus: 'verified',
    hospitalAffiliation: 'Narayana Health City, Bengaluru',
    email: 'karthik.srinivasan@haven-care.in.example',
    phone: '+91 98450 61842',
    onCallSchedule: 'Mon, Wed, Fri · 09:00 – 13:00',
    bio: 'Comprehensive family medicine physician with special interest in preventive geriatric care, immunizations, and continuity of care for residential elders.',
    activeAccessGrantsCount: 12,
    pendingAccessCount: 0,
    assignedResidents: [
      { residentId: 'RES-043', residentName: 'Nandini Iyer', room: 'Suite 301', wing: 'Highland Haven', careLevel: 'Independent Living', assignmentType: 'Primary Physician', assignedDate: 'Jan 10, 2024', accessStatus: 'active' },
    ],
  },
  {
    id: 'DOC-005',
    fullName: 'Dr. Meenakshi Sundaram',
    preferredName: 'Dr. Meenakshi',
    title: 'MD, DM (Neurology) · Cognitive Specialist',
    type: 'Visiting Specialist',
    specialty: 'Neurology & Cognitive Health',
    qualifications: 'MBBS, MD (Medicine), DM (Neurology), Fellow in Cognitive Disorders',
    registrationNumber: 'KMC-52194',
    registrationCouncil: 'Karnataka Medical Council (NMC Registered)',
    verificationStatus: 'verified',
    hospitalAffiliation: 'NIMHANS & Fortis Hospital, Bengaluru',
    email: 'meenakshi.sundaram@haven-care.in.example',
    phone: '+91 98450 52194',
    onCallSchedule: 'Thursdays · 11:00 – 16:00 (Dedicated Memory Care rounds)',
    bio: 'Cognitive neurologist leading dementia staging, non-pharmacological behavioral therapy programs, and neurological evaluations for Sunrise Pavilion residents.',
    activeAccessGrantsCount: 6,
    pendingAccessCount: 0,
    assignedResidents: [
      { residentId: 'RES-042', residentName: 'Vikram Hegde', room: 'Room 112', wing: 'Sunrise Pavilion', careLevel: 'Memory Care', assignmentType: 'Consulting Specialist', assignedDate: 'Oct 05, 2023', accessStatus: 'active', accessExpiry: 'Dec 15, 2026' },
    ],
  },
];

MOCK_DOCTORS.forEach((d) => {
  d.name = d.fullName;
  d.kmcNumber = d.registrationNumber;
  d.qualification = d.qualifications;
  d.visitingSchedule = d.onCallSchedule;
  d.assignedResidentsCount = d.assignedResidents.length;
  d.availability = d.type === 'Lead Attending Physician' ? 'Available' : 'On-Call';
  d.assignedResidents.forEach((ar) => {
    ar.primaryCondition = ar.assignmentType;
  });
});

