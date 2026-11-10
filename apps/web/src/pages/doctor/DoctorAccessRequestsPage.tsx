import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  Plus,
  ArrowRight,
  User,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/Dialog.tsx';
import {
  ACTIVE_DOCTOR_ACCESS_GRANTS,
  PRIMARY_DOCTOR_RESIDENT_IDS,
  ACTIVE_DOCTOR,
  type DoctorAccessGrant,
} from '../../mock/doctorWorkspaceData.ts';
import { MOCK_FULL_RESIDENTS } from '../../mock/residentsData.ts';

interface AccessRequestItem {
  id: string;
  residentId: string;
  residentName: string;
  room: string;
  wing: string;
  purpose: string;
  accessLevel: 'full_clinical' | 'read_only';
  duration: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewerNotes?: string;
}

const INITIAL_REQUESTS: AccessRequestItem[] = [
  {
    id: 'REQ-2026-042',
    residentId: 'RES-004',
    residentName: 'Aarav Deshmukh',
    room: 'Room 104',
    wing: 'Sunrise Pavilion',
    purpose: 'Sundowning behavioural plan audit and memory care psychotropic medication evaluation.',
    accessLevel: 'full_clinical',
    duration: '7 Days',
    status: 'approved',
    submittedAt: 'Nov 09, 2026 · 10:15 IST',
    reviewerNotes: 'Approved by Devika Ramanathan (Facility Administrator) for memory care review.',
  },
  {
    id: 'REQ-2026-039',
    residentId: 'RES-008',
    residentName: 'Kavya Reddy',
    room: 'Suite 302',
    wing: 'Highland Haven',
    purpose: 'Orthopedic post-operative mobility review cross-consultation.',
    accessLevel: 'read_only',
    duration: '3 Days',
    status: 'pending',
    submittedAt: 'Nov 10, 2026 · 08:30 IST',
  },
];

export function DoctorAccessRequestsPage() {
  useDocumentTitle('Doctor Access Requests & Governance — Doctor');
  const navigate = useNavigate();

  const [grants, setGrants] = useState<DoctorAccessGrant[]>(ACTIVE_DOCTOR_ACCESS_GRANTS);
  const [requests, setRequests] = useState<AccessRequestItem[]>(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState<'grants' | 'requests' | 'breakglass'>('grants');

  // Dialog states
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [isBreakGlassOpen, setIsBreakGlassOpen] = useState(false);

  // New Request Form
  const nonCaseloadResidents = useMemo(() => {
    return MOCK_FULL_RESIDENTS.filter((r) => !PRIMARY_DOCTOR_RESIDENT_IDS.includes(r.id));
  }, []);

  const [reqResidentId, setReqResidentId] = useState(nonCaseloadResidents[0]?.id || 'RES-008');
  const [reqPurpose, setReqPurpose] = useState('');
  const [reqAccessLevel, setReqAccessLevel] = useState<'full_clinical' | 'read_only'>('full_clinical');
  const [reqDuration, setReqDuration] = useState('7 Days');

  // Break-Glass Form
  const [bgResidentId, setBgResidentId] = useState(nonCaseloadResidents[0]?.id || 'RES-008');
  const [bgRationale, setBgRationale] = useState('');
  const [bgConfirmed, setBgConfirmed] = useState(false);

  // Handle Standard Access Request
  const handleSubmitRequest = () => {
    if (!reqPurpose.trim()) return;

    const res = nonCaseloadResidents.find((r) => r.id === reqResidentId);
    if (!res) return;

    const newReq: AccessRequestItem = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      residentId: res.id,
      residentName: res.fullName,
      room: res.placement.room,
      wing: res.placement.wing,
      purpose: reqPurpose.trim(),
      accessLevel: reqAccessLevel,
      duration: reqDuration,
      status: 'pending',
      submittedAt: 'Nov 10, 2026 · 15:00 IST',
    };

    setRequests((prev) => [newReq, ...prev]);
    setIsNewRequestOpen(false);
    setReqPurpose('');
  };

  // Handle Emergency Break-Glass Access
  const handleBreakGlassConfirm = () => {
    if (!bgRationale.trim() || !bgConfirmed) return;

    const res = nonCaseloadResidents.find((r) => r.id === bgResidentId);
    if (!res) return;

    const newEmergencyGrant: DoctorAccessGrant = {
      id: `GRT-EMERG-${Math.floor(100 + Math.random() * 900)}`,
      requestId: `EMERG-${Date.now().toString().slice(-4)}`,
      residentId: res.id,
      residentName: res.fullName,
      room: res.placement.room,
      wing: res.placement.wing,
      doctorId: ACTIVE_DOCTOR.id,
      doctorName: ACTIVE_DOCTOR.fullName,
      clinicalPurpose: `EMERGENCY BREAK-GLASS: ${bgRationale.trim()}`,
      accessLevel: 'full_clinical',
      status: 'active',
      grantedBy: 'EMERGENCY PROTOCOL (Self-Authorized)',
      grantedAt: 'Nov 10, 2026 · 15:00 IST',
      expiresAt: 'Nov 11, 2026 · 15:00 IST (24 Hours Emergency Window)',
      isEmergencyBreakGlass: true,
      notes: 'Immediate clinical override executed. Institutional audit logged and dispatched to Facility Administrator.',
    };

    setGrants((prev) => [newEmergencyGrant, ...prev]);
    setIsBreakGlassOpen(false);
    setBgRationale('');
    setBgConfirmed(false);
    setActiveTab('grants');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
            Doctor Access Requests & Clinical Governance
          </h1>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Manage scoped clinical access grants, specialist consultation authorizations, and emergency break-glass privileges
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBreakGlassOpen(true)}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <ShieldAlert className="w-4 h-4 mr-1.5 text-red-600" /> Emergency Break-Glass
          </Button>

          <Button variant="primary" size="sm" onClick={() => setIsNewRequestOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" /> Request Clinical Access
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-haven-blue-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Primary Caseload
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                {PRIMARY_DOCTOR_RESIDENT_IDS.length}
              </span>
              <span className="text-[11px] text-haven-neutral-500 block mt-0.5">
                Designated lead residents
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-haven-ice-blue border border-haven-blue-100 flex items-center justify-center text-haven-royal-blue">
              <User className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Active Access Grants
              </span>
              <span className="text-2xl font-bold text-emerald-700 mt-1 block">
                {grants.filter((g) => g.status === 'active').length}
              </span>
              <span className="text-[11px] text-emerald-800 block mt-0.5">
                Specialist / cross-coverage
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Pending Requests
              </span>
              <span className="text-2xl font-bold text-amber-700 mt-1 block">
                {requests.filter((r) => r.status === 'pending').length}
              </span>
              <span className="text-[11px] text-amber-800 block mt-0.5">
                Awaiting admin approval
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Emergency Overrides
              </span>
              <span className="text-2xl font-bold text-red-700 mt-1 block">
                {grants.filter((g) => g.isEmergencyBreakGlass).length}
              </span>
              <span className="text-[11px] text-red-800 block mt-0.5">
                Break-glass active grants
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-haven-neutral-200 flex gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('grants')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'grants'
              ? 'border-haven-royal-blue text-haven-royal-blue'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Active Specialist Grants ({grants.filter((g) => g.status === 'active').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'requests'
              ? 'border-haven-royal-blue text-haven-royal-blue'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Submitted Access Requests ({requests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('breakglass')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'breakglass'
              ? 'border-red-600 text-red-700'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Emergency Break-Glass Governance Policy</span>
        </button>
      </div>

      {/* TAB 1: ACTIVE ACCESS GRANTS */}
      {activeTab === 'grants' && (
        <div className="space-y-4">
          {grants.map((grant) => (
            <Card
              key={grant.id}
              className={`border transition-colors ${
                grant.isEmergencyBreakGlass
                  ? 'border-red-300 bg-red-50/20'
                  : 'border-emerald-200 bg-emerald-50/15'
              }`}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-base text-haven-navy-900">
                        {grant.residentName}
                      </span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {grant.residentId}
                      </Badge>
                      <Badge
                        variant={grant.isEmergencyBreakGlass ? 'danger' : 'success'}
                        className="text-xs uppercase font-bold"
                      >
                        {grant.isEmergencyBreakGlass ? 'Emergency Break-Glass' : 'Approved Specialist Grant'}
                      </Badge>
                      <Badge variant="secondary" className="capitalize text-xs">
                        {grant.accessLevel.replace('_', ' ')}
                      </Badge>
                    </div>

                    <p className="text-xs text-haven-neutral-600">
                      Placement: <strong>{grant.room} ({grant.wing})</strong> · Grant Reference: <span className="font-mono">{grant.id}</span>
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/doctor/residents/${grant.residentId}`)}
                  >
                    Open Resident Profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-white border border-haven-neutral-200 text-xs text-haven-navy-900">
                  <strong className="block text-[11px] uppercase tracking-wider text-haven-neutral-500 mb-1">
                    Authorized Clinical Purpose:
                  </strong>
                  <p>{grant.clinicalPurpose}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-haven-neutral-600 pt-1">
                  <div>
                    <strong>Granted By:</strong> {grant.grantedBy}
                  </div>
                  <div>
                    <strong>Authorized At:</strong> {grant.grantedAt}
                  </div>
                  <div className="font-semibold text-haven-royal-blue">
                    <strong>Validity:</strong> {grant.expiresAt}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 2: REQUESTS HISTORY */}
      {activeTab === 'requests' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-haven-neutral-200 bg-haven-neutral-50 text-haven-neutral-500 font-semibold uppercase">
                  <th className="py-3 px-4">Request ID</th>
                  <th className="py-3 px-4">Resident</th>
                  <th className="py-3 px-4">Clinical Purpose</th>
                  <th className="py-3 px-4">Access Level</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-haven-neutral-100">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-haven-ice-blue/30">
                    <td className="py-3 px-4 font-mono font-bold text-haven-navy-900">{req.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-haven-navy-900 block">{req.residentName}</span>
                      <span className="text-[11px] text-haven-neutral-500 font-mono">
                        {req.residentId} · {req.room}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-haven-neutral-700 max-w-xs">{req.purpose}</td>
                    <td className="py-3 px-4 capitalize">{req.accessLevel.replace('_', ' ')}</td>
                    <td className="py-3 px-4">{req.duration}</td>
                    <td className="py-3 px-4 text-haven-neutral-500">{req.submittedAt}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          req.status === 'approved'
                            ? 'success'
                            : req.status === 'pending'
                            ? 'warning'
                            : 'danger'
                        }
                        className="capitalize text-[10px]"
                      >
                        {req.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: BREAK-GLASS GOVERNANCE POLICY */}
      {activeTab === 'breakglass' && (
        <Card className="border-haven-blue-200 bg-haven-ice-blue/40">
          <CardHeader className="pb-3 border-b border-haven-blue-100">
            <CardTitle className="text-base font-bold text-haven-navy-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>HAVEN Emergency Break-Glass Governance Framework</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs text-haven-neutral-700 leading-relaxed">
            <p>
              In life-critical emergency scenarios or acute clinical decompensation where immediate medical record access or electronic prescribing authority is required for a resident outside a clinician&rsquo;s primary caseload, attending physicians are authorized to execute <strong>Emergency Break-Glass Access</strong>.
            </p>
            <div className="p-4 rounded-xl bg-white border border-red-200 space-y-2 text-red-950">
              <h4 className="font-bold text-xs uppercase tracking-wider text-red-800">
                Mandatory Institutional Safeguards:
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>Every break-glass invocation creates an immutable audit trail logged with the clinician&rsquo;s Karnataka Medical Council registration.</li>
                <li>Automated high-priority notifications are transmitted to the Facility Administrator, Lead Geriatrician, and Clinical Directorate.</li>
                <li>Break-glass access expires automatically after 24 hours. Continuation of care requires submission of a standard access request.</li>
                <li>A retrospective clinical justification review is conducted within 48 hours by the Institutional Ethics & Clinical Governance Committee.</li>
              </ul>
            </div>
            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => setIsBreakGlassOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Initiate Emergency Break-Glass Override
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* DIALOG 1: Submit Standard Request */}
      <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Submit Scoped Clinical Access Request
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">Target Resident (Non-Caseload):</label>
              <Select
                value={reqResidentId}
                onChange={(e) => setReqResidentId(e.target.value)}
                className="text-xs"
              >
                {nonCaseloadResidents.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.fullName} ({r.placement.room} · {r.placement.wing})
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Requested Access Level:</label>
                <Select
                  value={reqAccessLevel}
                  onChange={(e) => setReqAccessLevel(e.target.value as 'full_clinical' | 'read_only')}
                  className="text-xs"
                >
                  <option value="full_clinical">Full Clinical & Prescribing</option>
                  <option value="read_only">Read-Only Medical Records</option>
                </Select>
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Required Duration:</label>
                <Select
                  value={reqDuration}
                  onChange={(e) => setReqDuration(e.target.value)}
                  className="text-xs"
                >
                  <option value="24 Hours">24 Hours (Cross-cover)</option>
                  <option value="3 Days">3 Days</option>
                  <option value="7 Days">7 Days (Consultation)</option>
                  <option value="14 Days">14 Days</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Clinical Referral Rationale & Purpose:
              </label>
              <textarea
                value={reqPurpose}
                onChange={(e) => setReqPurpose(e.target.value)}
                placeholder="State clinical rationale (e.g. Memory care consultation, polypharmacy audit, cross-cover attending duty)..."
                rows={3}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsNewRequestOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmitRequest}
              disabled={!reqPurpose.trim()}
            >
              Submit Access Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: Emergency Break-Glass Modal */}
      <Dialog open={isBreakGlassOpen} onOpenChange={setIsBreakGlassOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-red-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>Execute Emergency Break-Glass Clinical Access</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-950 space-y-1">
              <span className="font-bold block text-xs uppercase tracking-wider text-red-800">
                Institutional Emergency Warning:
              </span>
              <p className="text-xs leading-relaxed">
                You are about to override clinical access restrictions under emergency medical protocol. This action is permanently audited and reported directly to the Clinical Directorate and Facility Administrator.
              </p>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">Select Emergency Resident:</label>
              <Select
                value={bgResidentId}
                onChange={(e) => setBgResidentId(e.target.value)}
                className="text-xs"
              >
                {nonCaseloadResidents.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.fullName} ({r.placement.room} · {r.placement.wing})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Emergency Clinical Rationale (Mandatory):
              </label>
              <textarea
                value={bgRationale}
                onChange={(e) => setBgRationale(e.target.value)}
                placeholder="Describe the acute medical emergency necessitating immediate clinical intervention..."
                rows={3}
                className="w-full rounded-lg border border-red-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>

            <div className="p-3 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="bgCheckbox"
                checked={bgConfirmed}
                onChange={(e) => setBgConfirmed(e.target.checked)}
                className="mt-0.5 rounded border-haven-neutral-300 text-red-600 focus:ring-red-500/30"
              />
              <label htmlFor="bgCheckbox" className="text-haven-navy-900 font-medium text-xs leading-tight">
                I attest that this override is required for immediate patient safety and life-critical clinical management under my Karnataka Medical Council license ({ACTIVE_DOCTOR.registrationNumber}).
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsBreakGlassOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleBreakGlassConfirm}
              disabled={!bgRationale.trim() || !bgConfirmed}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Authorize Emergency Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
