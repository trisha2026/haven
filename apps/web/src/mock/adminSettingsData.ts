export interface FacilityProfile {
  name: string;
  tagline: string;
  legalEntity: string;
  licenseNumber: string;
  gstin: string;
  pan: string;
  addressLine1: string;
  addressLine2: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  website: string;
  medicalDirector: string;
  administrator: string;
}

export interface WingConfig {
  id: string;
  name: string;
  floor: number;
  totalRooms: number;
  careSpecialty: string;
  nurseInCharge: string;
  status: 'active' | 'maintenance';
}

export interface RoomCategoryConfig {
  id: string;
  name: string;
  type: 'Single' | 'Double' | 'Suite';
  baseDailyRateINR: number;
  description: string;
  amenities: string[];
}

export interface ShiftConfig {
  id: string;
  name: string;
  code: 'morning' | 'afternoon' | 'night';
  startTime: string;
  endTime: string;
  handoverOverlapMinutes: number;
  minimumStaffCount: number;
}

export interface StaffingRatioRule {
  careLevel: string;
  dayRatio: string;
  nightRatio: string;
  mandatoryRnOnDuty: boolean;
}

export interface FacilitySettingsState {
  profile: FacilityProfile;
  wings: WingConfig[];
  roomCategories: RoomCategoryConfig[];
  shifts: ShiftConfig[];
  staffingRatios: StaffingRatioRule[];
  securityPolicies: {
    sessionTimeoutMinutes: number;
    enforceMfa: boolean;
    breakGlassMaxDurationHours: number;
    maxFailedAttempts: number;
    ipWhitelistingEnabled: boolean;
    auditLogRetentionDays: number;
  };
  clinicalRules: {
    incidentSlaMinutesFall: number;
    incidentSlaMinutesMedication: number;
    overdueMedicationAlertMinutes: number;
    vitalSignThresholdCheckIntervalHours: number;
    advanceDirectiveAnnualReviewReminder: boolean;
  };
  inventoryRules: {
    fefoEnforced: boolean;
    reorderLeadTimeDays: number;
    lowStockThresholdPercent: number;
    requireDualSignoffControlledDrugs: boolean;
  };
}

export const MOCK_ADMIN_SETTINGS: FacilitySettingsState = {
  profile: {
    name: 'HAVEN Anandam Care Residence',
    tagline: 'A safer, smarter and more caring place for every resident.',
    legalEntity: 'Anandam Healthcare & Senior Living Private Limited',
    licenseNumber: 'KA-DHS-ELDERLY-2024-8842',
    gstin: '29AAACA1234F1Z8',
    pan: 'AAACA1234F',
    addressLine1: 'Plot 42, 4th Cross, 3rd Block',
    addressLine2: 'Koramangala Valley',
    locality: 'Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    phone: '+91 80 4920 1100',
    emergencyPhone: '+91 80 4920 1199',
    email: 'contact@havenanandam.in',
    website: 'https://www.havenanandam.in',
    medicalDirector: 'Dr. Anita Mehta (MD, Geriatrics)',
    administrator: 'Rajesh Varma (MHA, Hospital Admin)',
  },
  wings: [
    {
      id: 'wing-mag',
      name: 'Magnolia Wing',
      floor: 1,
      totalRooms: 16,
      careSpecialty: 'Dementia & Memory Care',
      nurseInCharge: 'Sneha Joshi RN',
      status: 'active',
    },
    {
      id: 'wing-jas',
      name: 'Jasmine Wing',
      floor: 2,
      totalRooms: 16,
      careSpecialty: 'Post-Operative & Skilled Nursing',
      nurseInCharge: 'Priya Shetty RN',
      status: 'active',
    },
    {
      id: 'wing-lot',
      name: 'Lotus Wing',
      floor: 3,
      totalRooms: 16,
      careSpecialty: 'High Dependency & Assisted Living',
      nurseInCharge: 'Deepak Gowda NP',
      status: 'active',
    },
    {
      id: 'wing-orc',
      name: 'Orchid Wing',
      floor: 4,
      totalRooms: 16,
      careSpecialty: 'Independent Living & Wellness Suites',
      nurseInCharge: 'Rahul Patil LPN',
      status: 'active',
    },
  ],
  roomCategories: [
    {
      id: 'cat-deluxe',
      name: 'Deluxe Single Room',
      type: 'Single',
      baseDailyRateINR: 4800,
      description: 'Private ensuite room with motorized hospital-grade low bed, circadian lighting, and garden view.',
      amenities: ['Motorized profiling bed', 'Ensuite accessible bath', 'Panic pendant sensor', 'Oxygen pipeline'],
    },
    {
      id: 'cat-twin',
      name: 'Standard Shared Suite',
      type: 'Double',
      baseDailyRateINR: 3200,
      description: 'Semi-private twin sharing room partitioned with privacy curtains and dual nurse call consoles.',
      amenities: ['Twin adjustable beds', 'Dual nurse call', 'Individual climate control', 'Shared accessible bath'],
    },
    {
      id: 'cat-memory',
      name: 'Memory Care Safe Studio',
      type: 'Single',
      baseDailyRateINR: 5400,
      description: 'Anti-wandering enabled studio with rounded architectural profiles, soft-fall flooring and smart acoustic sensor.',
      amenities: ['Soft-fall padded flooring', 'Smart acoustic sensors', 'Wander-prevention RFID door lock', 'Circadian lighting'],
    },
    {
      id: 'cat-exec',
      name: 'Executive Long-Stay Suite',
      type: 'Suite',
      baseDailyRateINR: 7500,
      description: 'Expansive private suite with companion sitting lounge, kitchenette and balcony overlook.',
      amenities: ['Separate attendant lounge', 'Kitchenette', 'Private balcony', 'Smart TV and telemedicine terminal'],
    },
  ],
  shifts: [
    {
      id: 'sh-morn',
      name: 'Morning Shift',
      code: 'morning',
      startTime: '07:00',
      endTime: '15:30',
      handoverOverlapMinutes: 30,
      minimumStaffCount: 12,
    },
    {
      id: 'sh-aft',
      name: 'Afternoon / Evening Shift',
      code: 'afternoon',
      startTime: '15:00',
      endTime: '23:30',
      handoverOverlapMinutes: 30,
      minimumStaffCount: 10,
    },
    {
      id: 'sh-night',
      name: 'Night Vigil Shift',
      code: 'night',
      startTime: '23:00',
      endTime: '07:30',
      handoverOverlapMinutes: 30,
      minimumStaffCount: 6,
    },
  ],
  staffingRatios: [
    {
      careLevel: 'Memory Care',
      dayRatio: '1 : 4',
      nightRatio: '1 : 6',
      mandatoryRnOnDuty: true,
    },
    {
      careLevel: 'High Dependency / Skilled Nursing',
      dayRatio: '1 : 4',
      nightRatio: '1 : 6',
      mandatoryRnOnDuty: true,
    },
    {
      careLevel: 'Assisted Living',
      dayRatio: '1 : 8',
      nightRatio: '1 : 12',
      mandatoryRnOnDuty: false,
    },
    {
      careLevel: 'Independent Living',
      dayRatio: '1 : 15',
      nightRatio: '1 : 20',
      mandatoryRnOnDuty: false,
    },
  ],
  securityPolicies: {
    sessionTimeoutMinutes: 30,
    enforceMfa: true,
    breakGlassMaxDurationHours: 24,
    maxFailedAttempts: 5,
    ipWhitelistingEnabled: false,
    auditLogRetentionDays: 365,
  },
  clinicalRules: {
    incidentSlaMinutesFall: 15,
    incidentSlaMinutesMedication: 30,
    overdueMedicationAlertMinutes: 30,
    vitalSignThresholdCheckIntervalHours: 4,
    advanceDirectiveAnnualReviewReminder: true,
  },
  inventoryRules: {
    fefoEnforced: true,
    reorderLeadTimeDays: 3,
    lowStockThresholdPercent: 20,
    requireDualSignoffControlledDrugs: true,
  },
};
