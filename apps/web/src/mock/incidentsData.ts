export type IncidentLifecycleStatus =
  | 'reported'
  | 'initial_review'
  | 'clinical_review'
  | 'under_investigation'
  | 'corrective_action'
  | 'resolved';

export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentCategory = 'Fall / Slip' | 'Behavioural' | 'Equipment / Facility' | 'Medication Discrepancy' | 'Elopement Risk';

export interface IncidentStatusTransition {
  fromStatus: IncidentLifecycleStatus;
  toStatus: IncidentLifecycleStatus;
  timestamp: string;
  actor: string;
  role: string;
  reason: string;
}

export interface DetailedIncidentRecord {
  id: string; // e.g. "INC-001"
  reference: string; // e.g. "INC-2026-088"
  residentId: string;
  residentName: string;
  room: string;
  roomNumber?: string;
  wing: string;
  category: IncidentCategory | string;
  severity: IncidentSeverity | string;
  occurredAt: string;
  reportedAt?: string;
  reportedBy: string;
  reporterName?: string;
  reporterRole: string;
  assignedReviewer: string;
  reviewerRole: string;
  status: IncidentLifecycleStatus;
  summary: string;
  clinicalObservations: string;
  vitalsPostIncident?: {
    bp: string;
    pulse: number;
    spo2: number;
  };
  correctiveActionTaken: string;
  immediateActionTaken?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
  physicianSignOffStatus: 'pending' | 'signed_off' | 'not_required';
  physicianSignOffNotes?: string;
  statusHistory: IncidentStatusTransition[];
}

export type FacilityIncident = DetailedIncidentRecord;

export const MOCK_DETAILED_INCIDENTS: DetailedIncidentRecord[] = [
  {
    id: 'INC-001',
    reference: 'INC-2026-088',
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    room: 'Room 108-A',
    wing: 'Orchard Meadow',
    category: 'Fall / Slip',
    severity: 'high',
    occurredAt: 'Today, 08:45 AM',
    reportedBy: 'Deepak Gowda',
    reporterRole: 'Nurse Practitioner',
    assignedReviewer: 'Dr. Anita Mehta',
    reviewerRole: 'Lead Geriatric Physician',
    status: 'clinical_review',
    summary: 'Resident attempted unassisted standing transfer from armchair to bathroom and slipped on floor mat.',
    clinicalObservations: 'Vitals stable immediately post-fall: BP 138/82, HR 74, SpO2 98%. Mild soft-tissue tenderness over left patella; no visible deformity or open hematoma. Neurological exam pupils equal and reactive.',
    vitalsPostIncident: { bp: '138/82', pulse: 74, spo2: 98 },
    correctiveActionTaken: 'Assisted to bed via 2-person team; ice pack applied to left knee. Non-skid floor mat anchored. Mobility restricted pending formal physician sign-off.',
    physicianSignOffStatus: 'pending',
    physicianSignOffNotes: 'Dr. Mehta scheduled for in-person knee evaluation and neurological clearance during morning rounds.',
    statusHistory: [
      {
        fromStatus: 'reported',
        toStatus: 'initial_review',
        timestamp: 'Today, 08:50 AM',
        actor: 'Deepak Gowda, NP',
        role: 'Nurse Practitioner',
        reason: 'Immediate baseline vitals and cold compress protocol initiated.',
      },
      {
        fromStatus: 'initial_review',
        toStatus: 'clinical_review',
        timestamp: 'Today, 09:10 AM',
        actor: 'Devika Ramanathan',
        role: 'Facility Administrator',
        reason: 'Escalated to Lead Physician Dr. Mehta for formal neurological and mobility sign-off.',
      },
    ],
  },
  {
    id: 'INC-002',
    reference: 'INC-2026-087',
    residentId: 'RES-042',
    residentName: 'Vikram Hegde',
    room: 'Room 112',
    wing: 'Sunrise Pavilion',
    category: 'Behavioural',
    severity: 'medium',
    occurredAt: 'Yesterday, 19:30 PM',
    reportedBy: 'Rahul Patil',
    reporterRole: 'Licensed Practical Nurse',
    assignedReviewer: 'Sneha Joshi',
    reviewerRole: 'Senior Registered Nurse',
    status: 'under_investigation',
    summary: 'Sundowning agitation and restlessness observed in dining pavilion during evening seating.',
    clinicalObservations: 'Resident expressed anxiety regarding finding his family home. Paced corridors; no verbal or physical aggression towards staff or peers.',
    correctiveActionTaken: 'Guided to sensory courtyard with chamomile tea; soft classical ragas played. Settled comfortably within 15 minutes without chemical restraint.',
    physicianSignOffStatus: 'signed_off',
    physicianSignOffNotes: 'Dr. Meenakshi Sundaram reviewed log; non-pharmacological soothing protocol confirmed effective.',
    statusHistory: [
      {
        fromStatus: 'reported',
        toStatus: 'initial_review',
        timestamp: 'Yesterday, 19:40 PM',
        actor: 'Rahul Patil, LPN',
        role: 'LPN',
        reason: 'Caregiver debrief conducted and calming intervention logged.',
      },
      {
        fromStatus: 'initial_review',
        toStatus: 'under_investigation',
        timestamp: 'Yesterday, 20:15 PM',
        actor: 'Sneha Joshi, RN',
        role: 'Charge Nurse',
        reason: 'Reviewing evening ambient lighting and dining seating arrangement in Sunrise Pavilion.',
      },
    ],
  },
  {
    id: 'INC-003',
    reference: 'INC-2026-086',
    residentId: 'RES-043',
    residentName: 'Nandini Iyer',
    room: 'Suite 301',
    wing: 'Highland Haven',
    category: 'Equipment / Facility',
    severity: 'low',
    occurredAt: 'Nov 08, 11:20 AM',
    reportedBy: 'Sneha Joshi',
    reporterRole: 'Senior Registered Nurse',
    assignedReviewer: 'Devika Ramanathan',
    reviewerRole: 'Facility Administrator',
    status: 'corrective_action',
    summary: 'Bathroom overhead pull cord switch exhibited intermittent connectivity during routine morning testing.',
    clinicalObservations: 'No resident harm. Secondary wall push-button alert verified 100% functional.',
    correctiveActionTaken: 'Facilities work order WO-8812 assigned to electrical contractor. Replacement switch installed Nov 09.',
    physicianSignOffStatus: 'not_required',
    statusHistory: [
      {
        fromStatus: 'reported',
        toStatus: 'initial_review',
        timestamp: 'Nov 08, 11:30 AM',
        actor: 'Sneha Joshi, RN',
        role: 'RN',
        reason: 'Safety equipment test failure logged.',
      },
      {
        fromStatus: 'initial_review',
        toStatus: 'corrective_action',
        timestamp: 'Nov 08, 13:00 PM',
        actor: 'Devika Ramanathan',
        role: 'Administrator',
        reason: 'Dispatched maintenance contractor for hardware replacement.',
      },
    ],
  },
  {
    id: 'INC-004',
    reference: 'INC-2026-085',
    residentId: 'RES-015',
    residentName: 'Manjula Rao',
    room: 'Room 114',
    wing: 'Sunrise Pavilion',
    category: 'Elopement Risk',
    severity: 'medium',
    occurredAt: 'Nov 05, 16:45 PM',
    reportedBy: 'Rahul Patil',
    reporterRole: 'Licensed Practical Nurse',
    assignedReviewer: 'Devika Ramanathan',
    reviewerRole: 'Facility Administrator',
    status: 'resolved',
    summary: 'Resident approached secondary courtyard exit door during shift change; magnetic perimeter alarm chimed as designed.',
    clinicalObservations: 'Resident accompanied back to garden lounge. Calm and cooperative.',
    correctiveActionTaken: 'Perimeter magnetic latch inspected and re-calibrated. Shift handover door escort protocol reaffirmed.',
    physicianSignOffStatus: 'signed_off',
    physicianSignOffNotes: 'Cognitive plan updated to include courtyard accompaniment.',
    statusHistory: [
      {
        fromStatus: 'reported',
        toStatus: 'resolved',
        timestamp: 'Nov 06, 10:00 AM',
        actor: 'Devika Ramanathan',
        role: 'Administrator',
        reason: 'Full perimeter test completed; family notified of routine alarm response.',
      },
    ],
  },
];

// Augment for administrator views
MOCK_DETAILED_INCIDENTS.forEach((inc) => {
  inc.roomNumber = inc.room;
  inc.reportedAt = inc.occurredAt;
  inc.reporterName = inc.reportedBy;
  inc.immediateActionTaken = inc.correctiveActionTaken;
  inc.resolutionNotes = inc.physicianSignOffNotes || inc.clinicalObservations;
  // Capitalize severity
  if (inc.severity === 'critical') inc.severity = 'Critical';
  else if (inc.severity === 'high') inc.severity = 'High';
  else if (inc.severity === 'medium') inc.severity = 'Medium';
  else if (inc.severity === 'low') inc.severity = 'Low';
});

export const MOCK_INCIDENTS: FacilityIncident[] = MOCK_DETAILED_INCIDENTS;

