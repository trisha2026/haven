export interface AuditTrailEvent {
  id: string;
  auditId: string;
  timestamp: string;
  actorName: string;
  actorRole: 'Administrator' | 'Doctor' | 'Caregiver' | 'System';
  actorId: string;
  actionCategory:
    | 'Resident Admission'
    | 'Bed Allocation'
    | 'Bed Transfer'
    | 'Medication Administration'
    | 'Prescription Update'
    | 'Inventory Receipt'
    | 'Leave Approval'
    | 'Emergency Dispatch'
    | 'Doctor Access Grant'
    | 'Incident Escalation'
    | 'System Settings';
  targetEntity: string;
  targetId: string;
  summary: string;
  details: string;
  ipAddress: string;
  status: 'Success' | 'Flagged' | 'Denied';
  metadata?: {
    field?: string;
    previousValue?: string;
    newValue?: string;
    authorizationRef?: string;
  };
}

export const MOCK_AUDIT_TRAIL: AuditTrailEvent[] = [
  {
    id: 'aud-1',
    auditId: 'AUD-2026-9842',
    timestamp: '2026-11-10T10:14:22Z',
    actorName: 'Priya Shetty RN',
    actorRole: 'Caregiver',
    actorId: 'cg-1',
    actionCategory: 'Medication Administration',
    targetEntity: 'Ananya Sharma (RES-001)',
    targetId: 'res-001',
    summary: 'Dose administered: Donepezil 10mg orally with breakfast',
    details: 'Caregiver Priya Shetty scanned resident RFID barcode and verified dual-signoff on eMAR terminal 3. Resident swallowed without distress.',
    ipAddress: '192.168.1.104',
    status: 'Success',
    metadata: {
      field: 'eMAR Status',
      previousValue: 'Pending',
      newValue: 'Administered',
      authorizationRef: 'RX-2026-8812',
    },
  },
  {
    id: 'aud-2',
    auditId: 'AUD-2026-9841',
    timestamp: '2026-11-10T09:45:10Z',
    actorName: 'Rajesh Varma',
    actorRole: 'Administrator',
    actorId: 'adm-1',
    actionCategory: 'Bed Allocation',
    targetEntity: 'Room 215, Jasmine Wing',
    targetId: 'rm-215',
    summary: 'Assigned pending admission to Room 215',
    details: 'Room 215 prepared and allocated for scheduled respite admission. Housekeeping pre-admission checklist completed.',
    ipAddress: '192.168.1.12',
    status: 'Success',
    metadata: {
      field: 'Occupancy Status',
      previousValue: 'Available',
      newValue: 'Allocated',
    },
  },
  {
    id: 'aud-3',
    auditId: 'AUD-2026-9840',
    timestamp: '2026-11-10T09:15:00Z',
    actorName: 'Dr. Meenakshi Sundaram',
    actorRole: 'Doctor',
    actorId: 'doc-5',
    actionCategory: 'Doctor Access Grant',
    targetEntity: 'Aarav Deshmukh (RES-004)',
    targetId: 'req-2',
    summary: 'Access Request REQ-2026-042 submitted for clinical review',
    details: 'Specialist access requested following evening sundowning incident report INC-2026-088.',
    ipAddress: '192.168.2.88',
    status: 'Success',
  },
  {
    id: 'aud-4',
    auditId: 'AUD-2026-9839',
    timestamp: '2026-11-10T08:50:33Z',
    actorName: 'System Monitor',
    actorRole: 'System',
    actorId: 'sys-core',
    actionCategory: 'Incident Escalation',
    targetEntity: 'INC-2026-088 (Aarav Deshmukh)',
    targetId: 'inc-088',
    summary: 'Clinical Review SLA alert generated: 2.5 hours remaining',
    details: 'Automated notification dispatched to Medical Director Dr. Anita Mehta and Administrator Rajesh Varma for pending incident sign-off.',
    ipAddress: '127.0.0.1',
    status: 'Flagged',
    metadata: {
      field: 'Escalation Tier',
      previousValue: 'Tier 1 - Local Review',
      newValue: 'Tier 2 - Medical Director Attention',
    },
  },
  {
    id: 'aud-5',
    auditId: 'AUD-2026-9838',
    timestamp: '2026-11-10T08:12:05Z',
    actorName: 'Rajesh Varma',
    actorRole: 'Administrator',
    actorId: 'adm-1',
    actionCategory: 'Emergency Dispatch',
    targetEntity: 'Deepak Gowda NP',
    targetId: 'cg-3',
    summary: 'Dispatched Emergency Shift Cover to Lotus Wing (Floor 3)',
    details: 'Cover dispatched due to unplanned caregiver medical leave. Reassigned Deepak Gowda NP for a 4-hour high-dependency relief stint.',
    ipAddress: '192.168.1.12',
    status: 'Success',
    metadata: {
      field: 'Shift Station',
      previousValue: 'Float Pool',
      newValue: 'Lotus Wing Floor 3',
    },
  },
  {
    id: 'aud-6',
    auditId: 'AUD-2026-9837',
    timestamp: '2026-11-10T07:30:19Z',
    actorName: 'Sneha Joshi RN',
    actorRole: 'Caregiver',
    actorId: 'cg-4',
    actionCategory: 'Medication Administration',
    targetEntity: 'Kavya Reddy (RES-005)',
    targetId: 'res-005',
    summary: 'Dose Withheld: Enoxaparin 40mg Subcutaneous',
    details: 'Withheld due to pre-procedure guidelines noted on chart. Surgeon telephonic hold order verified.',
    ipAddress: '192.168.1.106',
    status: 'Flagged',
    metadata: {
      field: 'eMAR Status',
      previousValue: 'Scheduled',
      newValue: 'Withheld (Clinical Hold)',
    },
  },
  {
    id: 'aud-7',
    auditId: 'AUD-2026-9836',
    timestamp: '2026-11-09T18:22:40Z',
    actorName: 'Dr. Anita Mehta',
    actorRole: 'Doctor',
    actorId: 'doc-1',
    actionCategory: 'Prescription Update',
    targetEntity: 'Raghav Kulkarni (RES-002)',
    targetId: 'rx-002',
    summary: 'Insulin Glargine titrated from 18 units to 20 units nightly',
    details: 'Dose revision authenticated with digital KMC token KMC-28491 following morning hyper-glycaemia logs.',
    ipAddress: '192.168.1.45',
    status: 'Success',
    metadata: {
      field: 'Dosage',
      previousValue: '18 Units SC at Bedtime',
      newValue: '20 Units SC at Bedtime',
    },
  },
  {
    id: 'aud-8',
    auditId: 'AUD-2026-9835',
    timestamp: '2026-11-09T16:05:12Z',
    actorName: 'Rajesh Varma',
    actorRole: 'Administrator',
    actorId: 'adm-1',
    actionCategory: 'Inventory Receipt',
    targetEntity: 'PO-4412 (MedPlus Bengaluru)',
    targetId: 'po-4412',
    summary: 'Goods received: Paracetamol 650mg (Batch PARA-902, 500 strips)',
    details: 'Pharmacy stock updated. Batch inspection passed certificate of analysis check. Total value ₹14,500.',
    ipAddress: '192.168.1.12',
    status: 'Success',
    metadata: {
      field: 'PO Status',
      previousValue: 'Issued',
      newValue: 'Delivered & Stocked',
    },
  },
  {
    id: 'aud-9',
    auditId: 'AUD-2026-9834',
    timestamp: '2026-11-09T14:10:00Z',
    actorName: 'Rajesh Varma',
    actorRole: 'Administrator',
    actorId: 'adm-1',
    actionCategory: 'Leave Approval',
    targetEntity: 'Rahul Patil LPN (LV-2026-104)',
    targetId: 'lv-104',
    summary: 'Approved Annual Leave for 18-20 Nov 2026 (3 Days)',
    details: 'Adequate nursing coverage confirmed across Jasmine Wing. Peer cover confirmed by Sunita Reddy CNA.',
    ipAddress: '192.168.1.12',
    status: 'Success',
  },
  {
    id: 'aud-10',
    auditId: 'AUD-2026-9833',
    timestamp: '2026-11-09T11:40:55Z',
    actorName: 'Security System',
    actorRole: 'System',
    actorId: 'sec-gw',
    actionCategory: 'Doctor Access Grant',
    targetEntity: 'Dr. Suresh Rao (Unregistered)',
    targetId: 'usr-unauth',
    summary: 'Unauthorized electronic health record access attempt blocked',
    details: 'IP 192.168.4.22 tried querying resident RES-003 without an active clinical privilege grant. Terminal quarantined for 15 minutes.',
    ipAddress: '192.168.4.22',
    status: 'Denied',
  },
  {
    id: 'aud-11',
    auditId: 'AUD-2026-9832',
    timestamp: '2026-11-08T15:30:00Z',
    actorName: 'Rajesh Varma',
    actorRole: 'Administrator',
    actorId: 'adm-1',
    actionCategory: 'System Settings',
    targetEntity: 'Facility Shift Schedule',
    targetId: 'cfg-shifts',
    summary: 'Adjusted Night Shift nursing minimum ratio from 1:9 to 1:8',
    details: 'Updated facility workforce policy to comply with Karnataka Healthcare Facility Accreditation guidelines.',
    ipAddress: '192.168.1.12',
    status: 'Success',
    metadata: {
      field: 'Night Staffing Minimum',
      previousValue: '1:9 resident ratio',
      newValue: '1:8 resident ratio',
    },
  },
];
