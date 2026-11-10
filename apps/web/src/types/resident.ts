/**
 * HAVEN — Elderly Care & Facility Management System
 * Comprehensive Resident Management Type Definitions
 */

export type ResidentCareClassification =
  | 'Independent Living'
  | 'Assisted Living'
  | 'Memory Care'
  | 'Skilled Nursing';

export type ResidentStatus =
  | 'active'
  | 'in-clinic'
  | 'with-family'
  | 'temporary-leave'
  | 'hospital'
  | 'resting';

export type FacilityWing =
  | 'Garden Terrace'
  | 'Sunrise Pavilion'
  | 'Orchard Meadow'
  | 'Highland Haven';

export interface ResidentAllergy {
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life-threatening';
  reaction: string;
  diagnosedDate: string;
}

export interface ResidentCondition {
  condition: string;
  icdCode: string;
  diagnosedDate: string;
  status: 'chronic' | 'managed' | 'monitoring' | 'resolved';
  notes: string;
}

export interface ResidentClinicalNote {
  id: string;
  author: string;
  authorRole: string;
  date: string;
  type: 'Geriatric Assessment' | 'Nursing Evaluation' | 'Fall Incident Review' | 'Physical Therapy' | 'Dietary';
  summary: string;
  recommendations: string;
}

export interface ResidentMedicationItem {
  id: string;
  name: string;
  strength: string;
  frequency: string;
  route: string;
  prescribingDoctor: string;
  prescribedDate: string;
  timing: string[];
  status: 'active' | 'paused' | 'discontinued';
  todayAdherence: 'administered' | 'pending' | 'overdue' | 'refused';
  instructions: string;
  pharmacyBatch: string;
}

export interface ResidentAttendanceEvent {
  id: string;
  date: string;
  time: string;
  location: string;
  status: 'present' | 'activity' | 'dining' | 'clinic' | 'leave';
  verifiedBy: string;
  notes: string;
}

export interface ResidentVisitorLog {
  id: string;
  visitorName: string;
  relationship: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  badgeNumber: string;
  escortedBy: string;
}

export interface ResidentDocument {
  id: string;
  title: string;
  category: 'Agreement' | 'Directives' | 'Insurance' | 'Clinical' | 'Legal';
  uploadDate: string;
  fileSize: string;
  signedBy: string;
  status: 'verified' | 'pending-signature' | 'expired';
  referenceNumber: string;
}

export interface ResidentIncidentLink {
  id: string;
  reference: string;
  date: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  status: string;
  reporter: string;
  summary: string;
}

export interface ResidentTransferHistory {
  id: string;
  date: string;
  from: string;
  to: string;
  fromRoom?: string;
  toRoom?: string;
  fromWing?: string;
  toWing?: string;
  reason: string;
  authorizedBy: string;
}

export interface ResidentEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  isPrimary: boolean;
  isLegalGuardian: boolean;
  hasPowerOfAttorney: boolean;
  communicationPreference?: 'Phone Call' | 'SMS' | 'Email' | 'WhatsApp';
}

export interface ResidentCarePlan {
  mobilitySupport: string;
  fallRiskLevel: 'Low' | 'Medium' | 'High';
  transferAssistance: string;
  nutritionDietary: string;
  hydrationGoal: string;
  personalCareHygiene: string;
  bathingSchedule: string;
  continenceCare: string;
  dailyRoutineInstructions: string;
  sensoryAids: string[];
  caregiverActionChecklist: string[];
  nextCarePlanReviewDate: string;
}

export interface ResidentCareTeam {
  primaryDoctor: {
    name: string;
    specialty: string;
    phone: string;
    license: string;
  };
  visitingSpecialist?: {
    name: string;
    specialty: string;
    hospital: string;
  };
  primaryNurse: {
    name: string;
    role: string;
    shift: string;
  };
  caregiverTeam: string;
  physicalTherapist?: string;
}

export interface ResidentPlacement {
  wing: FacilityWing;
  room: string;
  bed: string;
  floor: string;
  roomType: 'Private Suite' | 'Standard Room' | 'Shared Memory Room';
  moveInDate: string;
}

export interface FullResident {
  id: string;
  fullName: string;
  preferredName: string;
  avatarUrl?: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: ResidentStatus;
  careLevel: ResidentCareClassification;
  placement: ResidentPlacement;
  careTeam: ResidentCareTeam;
  emergencyContacts: ResidentEmergencyContact[];
  carePlan?: ResidentCarePlan;
  alerts: string[];
  mobilityStatus: string;
  dietaryProtocol: string;
  dnrStatus: boolean;
  polstOnRecord: boolean;
  advanceDirectiveOnRecord?: boolean;
  allergies: ResidentAllergy[];
  conditions: ResidentCondition[];
  clinicalNotes: ResidentClinicalNote[];
  medications: ResidentMedicationItem[];
  attendanceLogs: ResidentAttendanceEvent[];
  visitorLogs: ResidentVisitorLog[];
  documents: ResidentDocument[];
  incidents: ResidentIncidentLink[];
  transferHistory: ResidentTransferHistory[];
}
