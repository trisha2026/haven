import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ShieldAlert,
  ArrowLeft,
  KeyRound,
  FileText,
  Activity,
  Pill,
  History,
  Users,
  AlertTriangle,
  FileCheck,
  Plus,
  Stethoscope,
  Phone,
  Eye,
  AlertOctagon,
  ExternalLink,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import {
  MOCK_FULL_RESIDENTS,
} from '../../mock/residentsData.ts';
import {
  isResidentAuthorizedForDoctor,
  ACTIVE_DOCTOR,
  MOCK_CLINICAL_NOTES,
  MOCK_CLINICAL_DOCUMENTS,
  type DoctorClinicalNote,
} from '../../mock/doctorWorkspaceData.ts';
import { MOCK_PRESCRIPTIONS } from '../../mock/medicationsData.ts';
import { MOCK_DETAILED_INCIDENTS } from '../../mock/incidentsData.ts';

type ProfileTab =
  | 'overview'
  | 'history'
  | 'medications'
  | 'notes'
  | 'vitals'
  | 'care-team'
  | 'incidents'
  | 'documents';

export function DoctorResidentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const resident = useMemo(() => {
    return MOCK_FULL_RESIDENTS.find((r) => r.id === id) || null;
  }, [id]);

  const authCheck = useMemo(() => {
    if (!id) return { authorized: false, reason: 'Resident identifier not provided.' };
    return isResidentAuthorizedForDoctor(id);
  }, [id]);

  useDocumentTitle(
    resident
      ? `${resident.fullName} — Medical Profile (Doctor)`
      : 'Resident Medical Profile — Doctor'
  );

  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [notesList, setNotesList] = useState<DoctorClinicalNote[]>(MOCK_CLINICAL_NOTES);
  const [selectedNote, setSelectedNote] = useState<DoctorClinicalNote | null>(null);

  // Modal states
  const [isAddendumOpen, setIsAddendumOpen] = useState(false);
  const [addendumText, setAddendumText] = useState('');
  const [addendumReason, setAddendumReason] = useState('Integration of subsequent clinical observation');

  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [newNoteType, setNewNoteType] = useState<DoctorClinicalNote['type']>('Progress Note');
  const [newNoteSubjective, setNewNoteSubjective] = useState('');
  const [newNoteAssessment, setNewNoteAssessment] = useState('');
  const [newNoteDirectives, setNewNoteDirectives] = useState('');
  const [newNoteFollowUp, setNewNoteFollowUp] = useState('');

  const [selectedDocPreview, setSelectedDocPreview] = useState<typeof MOCK_CLINICAL_DOCUMENTS[0] | null>(null);

  // Associated data
  const residentPrescriptions = useMemo(() => {
    if (!resident) return [];
    return MOCK_PRESCRIPTIONS.filter(
      (p) => p.residentId === resident.id || p.residentName.toLowerCase() === resident.fullName.toLowerCase()
    );
  }, [resident]);

  const residentNotes = useMemo(() => {
    if (!resident) return [];
    return notesList.filter(
      (n) => n.residentId === resident.id || n.residentName.toLowerCase() === resident.fullName.toLowerCase()
    );
  }, [resident, notesList]);

  const residentIncidents = useMemo(() => {
    if (!resident) return [];
    return MOCK_DETAILED_INCIDENTS.filter(
      (inc) => inc.residentId === resident.id || inc.residentName.toLowerCase() === resident.fullName.toLowerCase()
    );
  }, [resident]);

  const residentDocuments = useMemo(() => {
    if (!resident) return [];
    return MOCK_CLINICAL_DOCUMENTS.filter(
      (doc) => doc.residentId === resident.id || doc.residentName.toLowerCase() === resident.fullName.toLowerCase()
    );
  }, [resident]);

  if (!resident) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => navigate('/doctor/residents')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to Residents Directory
        </Button>
        <Card className="border-red-200 bg-red-50/50 p-8 text-center">
          <AlertOctagon className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-haven-navy-900">Resident Not Found</h2>
          <p className="text-sm text-haven-neutral-600 mt-2">
            No record matching identifier &ldquo;{id}&rdquo; was found in the HAVEN residency database.
          </p>
        </Card>
      </div>
    );
  }

  // Clinical Access Governance Gate
  if (!authCheck.authorized) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => navigate('/doctor/residents')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to My Residents
        </Button>

        <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50/30 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-8 h-8 text-amber-700" />
              </div>
              <div className="space-y-2">
                <Badge variant="warning" className="uppercase tracking-wider font-semibold text-xs">
                  Clinical Access Governance Restricted
                </Badge>
                <h1 className="text-2xl font-bold text-haven-navy-900">
                  Medical Record Access Restricted
                </h1>
                <p className="text-sm text-haven-neutral-700 leading-relaxed">
                  Under the HAVEN Clinical Governance Policy and Indian Digital Health Privacy standards, medical records and electronic prescription authority for resident{' '}
                  <strong className="text-haven-navy-900 font-semibold">{resident.fullName}</strong> ({resident.id}) are restricted to the designated Lead Attending Physician or authorized consulting specialists holding an active access grant.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white border border-amber-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-haven-navy-900 uppercase tracking-wider">
                Resident Clinical Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-haven-neutral-500 block">Resident ID</span>
                  <span className="font-semibold text-haven-navy-900">{resident.id}</span>
                </div>
                <div>
                  <span className="text-haven-neutral-500 block">Placement</span>
                  <span className="font-semibold text-haven-navy-900">{resident.placement.room} · {resident.placement.wing}</span>
                </div>
                <div>
                  <span className="text-haven-neutral-500 block">Care Tier</span>
                  <span className="font-semibold text-haven-navy-900">{resident.careLevel}</span>
                </div>
                <div>
                  <span className="text-haven-neutral-500 block">Current Status</span>
                  <Badge variant="outline" className="capitalize text-xs font-normal">
                    {resident.status}
                  </Badge>
                </div>
              </div>
              <div className="pt-2 border-t border-amber-100 flex items-center gap-2 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Reason: {authCheck.reason}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => navigate(`/doctor/access-requests?residentId=${resident.id}`)}
              >
                <KeyRound className="w-4 h-4 mr-2" /> Request Clinical Access Grant
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/doctor/residents')}
              >
                Return to My Residents Directory
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Handle Add Addendum
  const handleSaveAddendum = () => {
    if (!selectedNote || !addendumText.trim()) return;
    const newAddendum = {
      id: `ADD-${Date.now().toString().slice(-4)}`,
      timestamp: 'Nov 10, 2026 · 14:15 IST',
      author: `${ACTIVE_DOCTOR.fullName}, MD`,
      text: addendumText.trim(),
      reason: addendumReason,
    };

    setNotesList((prev) =>
      prev.map((n) => {
        if (n.id === selectedNote.id) {
          return {
            ...n,
            status: 'amended',
            addenda: [...(n.addenda || []), newAddendum],
          };
        }
        return n;
      })
    );

    setSelectedNote((prev) =>
      prev
        ? {
            ...prev,
            status: 'amended',
            addenda: [...(prev.addenda || []), newAddendum],
          }
        : null
    );

    setAddendumText('');
    setIsAddendumOpen(false);
  };

  // Handle Create Clinical Note
  const handleCreateNote = () => {
    if (!newNoteSubjective.trim() || !newNoteAssessment.trim()) return;

    const newNoteRecord: DoctorClinicalNote = {
      id: `NOTE-2026-${Math.floor(100 + Math.random() * 900)}`,
      residentId: resident.id,
      residentName: resident.fullName,
      room: resident.placement.room,
      wing: resident.placement.wing,
      type: newNoteType,
      authorName: ACTIVE_DOCTOR.fullName,
      authorRole: 'Lead Geriatrician',
      authorKmc: ACTIVE_DOCTOR.registrationNumber,
      date: 'Nov 10, 2026',
      time: '14:30 PM',
      status: 'signed',
      signedAt: 'Nov 10, 2026 · 14:30 PM IST',
      subjectiveObservations: newNoteSubjective.trim(),
      objectiveFindings: {
        bp: '126/82 mmHg',
        pulse: 74,
        spo2: 98,
        temp: '98.6°F',
      },
      clinicalAssessment: newNoteAssessment.trim(),
      carePlanDirective: newNoteDirectives.trim() || 'Continue current multidisciplinary care routine.',
      followUpInstructions: newNoteFollowUp.trim() || 'Review during regular weekly clinical rounds.',
    };

    setNotesList((prev) => [newNoteRecord, ...prev]);
    setIsNewNoteOpen(false);
    setNewNoteSubjective('');
    setNewNoteAssessment('');
    setNewNoteDirectives('');
    setNewNoteFollowUp('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/doctor/residents')}>
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Residents
          </Button>
          <div className="h-4 w-px bg-haven-neutral-300 hidden sm:block" />
          <span className="text-xs text-haven-neutral-500 hidden sm:inline">
            Resident Medical Record · Dr. Anita Mehta Caseload
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsNewNoteOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" /> Write Clinical Note
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/doctor/prescriptions')}
          >
            <Pill className="w-4 h-4 mr-1.5" /> Prescribe / Review
          </Button>
        </div>
      </div>

      {/* Hero Resident Summary Header */}
      <Card padding="none" className="border-haven-border bg-white shadow-haven-card overflow-hidden rounded-2xl">
        <div className="p-6 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <Avatar
                name={resident.fullName}
                size="xl"
                className="ring-4 ring-haven-blue-100 shrink-0 text-xl font-bold"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold text-haven-navy-900 tracking-tight">
                    {resident.fullName}
                  </h1>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-haven-slate-100 text-haven-slate-700 border border-haven-border">
                    {resident.id}
                  </span>
                  {authCheck.grantType === 'approved_grant' && (
                    <Badge variant="warning" size="sm" className="font-semibold text-xs">
                      Specialist Grant: {authCheck.expiresAt}
                    </Badge>
                  )}
                  {authCheck.grantType === 'primary' && (
                    <Badge variant="success" size="sm" className="font-semibold text-xs">
                      Primary Caseload
                    </Badge>
                  )}
                  <Badge variant="secondary" size="sm" className="capitalize text-xs">
                    {resident.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-haven-slate-600 font-medium">
                  <span>
                    <strong>Age:</strong> {resident.age} Yrs · {resident.gender}
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Blood Group:</strong> O+
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Placement:</strong> <strong className="text-haven-navy-900">{resident.placement.room}</strong> ({resident.placement.wing})
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Care Tier:</strong> <strong className="text-haven-navy-900">{resident.careLevel}</strong>
                  </span>
                </div>

                {/* Clinical alerts row */}
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Fall Risk: {resident.carePlan?.fallRiskLevel || 'Moderate'}</span>
                  </span>
                  {resident.allergies && resident.allergies.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                      <AlertOctagon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Allergies: {resident.allergies.map((a) => a.allergen).join(', ')}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-haven-blue-50 border border-haven-blue-200 text-haven-blue-900 text-xs font-medium">
                    <Stethoscope className="w-3.5 h-3.5 text-haven-blue-700 shrink-0" />
                    <span>Physician: Dr. Anita Mehta (KMC-88391)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Latest Vitals & Regimen Snapshot */}
            <div className="bg-haven-slate-50 border border-haven-border rounded-xl p-4 flex flex-row lg:flex-col justify-between gap-3 text-xs shrink-0 min-w-[240px] shadow-xs">
              <div>
                <span className="text-haven-slate-500 block text-[11px] font-bold uppercase tracking-wider">
                  Latest BP & Pulse
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-bold text-haven-navy-900">
                    128/82
                  </span>
                  <span className="text-xs text-haven-slate-500">mmHg</span>
                  <span className="text-xs font-semibold text-haven-blue-700">· 74 bpm</span>
                </div>
              </div>
              <div className="border-t border-haven-border/80 pt-2 flex items-center justify-between">
                <span className="text-haven-slate-600 font-medium">SpO2 Oxygen:</span>
                <span className="font-bold text-emerald-700">98% (Optimal)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-haven-slate-600 font-medium">Active Regimens:</span>
                <span className="font-bold text-haven-navy-900">{residentPrescriptions.length} Prescriptions</span>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Tab Navigation Bar */}
        <div className="bg-haven-slate-50/90 border-t border-haven-border px-3 sm:px-4 flex gap-1.5 overflow-x-auto scroll-smooth py-2">
          {[
            { id: 'overview', label: 'Clinical Overview', icon: Stethoscope },
            { id: 'history', label: 'Medical History', icon: History },
            { id: 'medications', label: `Medications (${residentPrescriptions.length})`, icon: Pill },
            { id: 'notes', label: `Clinical Notes (${residentNotes.length})`, icon: FileText },
            { id: 'vitals', label: 'Observations & Vitals', icon: Activity },
            { id: 'care-team', label: 'Care Team', icon: Users },
            { id: 'incidents', label: `Incidents (${residentIncidents.length})`, icon: AlertTriangle },
            { id: 'documents', label: `Documents (${residentDocuments.length})`, icon: FileCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                className={`group flex items-center gap-2 py-2 px-3.5 text-xs whitespace-nowrap shrink-0 transition-all rounded-lg cursor-pointer ${
                  isActive
                    ? 'bg-haven-blue-700 text-white font-bold shadow-sm'
                    : 'text-haven-slate-600 hover:text-haven-navy-900 hover:bg-white font-medium border border-transparent hover:border-haven-border'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-haven-slate-500 group-hover:text-haven-navy-900'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* TAB 1: CLINICAL OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Diagnoses */}
            <Card>
              <CardHeader className="pb-3 border-b border-haven-neutral-200">
                <CardTitle className="text-sm font-bold text-haven-navy-900 flex items-center justify-between">
                  <span>Active Diagnoses & Chronic Conditions</span>
                  <Badge variant="outline" className="text-xs">
                    {resident.conditions?.length || 0} Registered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 divide-y divide-haven-neutral-100">
                {resident.conditions && resident.conditions.length > 0 ? (
                  resident.conditions.map((c, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-haven-navy-900">{c.condition}</h4>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-haven-neutral-100 text-haven-neutral-700">
                            {c.icdCode}
                          </span>
                        </div>
                        <p className="text-xs text-haven-neutral-600 mt-1">{c.notes}</p>
                        <span className="text-[11px] text-haven-neutral-400 mt-1 block">
                          Diagnosed: {c.diagnosedDate}
                        </span>
                      </div>
                      <Badge
                        variant={c.status === 'chronic' ? 'warning' : 'info'}
                        className="capitalize text-xs font-medium shrink-0"
                      >
                        {c.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-haven-neutral-500 py-4">No active diagnoses registered.</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Vitals Panel */}
            <Card>
              <CardHeader className="pb-3 border-b border-haven-neutral-200">
                <CardTitle className="text-sm font-bold text-haven-navy-900 flex items-center justify-between">
                  <span>Current Hemodynamic Profile</span>
                  <span className="text-xs font-normal text-haven-neutral-500">
                    Logged today by Senior Staff Nurse
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3.5 rounded-xl bg-haven-ice-blue border border-haven-blue-100">
                    <span className="text-[11px] font-medium text-haven-neutral-500 uppercase block">Blood Pressure</span>
                    <span className="text-lg font-bold text-haven-navy-900">
                      128/82
                    </span>
                    <span className="text-[11px] text-haven-neutral-500 block mt-0.5">mmHg (Sitting)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-haven-ice-blue border border-haven-blue-100">
                    <span className="text-[11px] font-medium text-haven-neutral-500 uppercase block">Heart Rate</span>
                    <span className="text-lg font-bold text-haven-navy-900">
                      74
                    </span>
                    <span className="text-[11px] text-haven-neutral-500 block mt-0.5">bpm (Regular)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-haven-ice-blue border border-haven-blue-100">
                    <span className="text-[11px] font-medium text-haven-neutral-500 uppercase block">SpO2 Oxygen</span>
                    <span className="text-lg font-bold text-emerald-700">
                      98%
                    </span>
                    <span className="text-[11px] text-haven-neutral-500 block mt-0.5">Room air</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-haven-ice-blue border border-haven-blue-100">
                    <span className="text-[11px] font-medium text-haven-neutral-500 uppercase block">Temperature</span>
                    <span className="text-lg font-bold text-haven-navy-900">98.4°F</span>
                    <span className="text-[11px] text-haven-neutral-500 block mt-0.5">Tympanic</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advance Directive & DNR */}
            <Card className="border-haven-blue-200 bg-haven-ice-blue/40">
              <CardContent className="p-5 flex items-start gap-4">
                <FileCheck className="w-8 h-8 text-haven-royal-blue shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-haven-navy-900">
                    Advance Care Planning: Do Not Resuscitate (DNR) Protocol
                  </h4>
                  <p className="text-xs text-haven-neutral-700 leading-relaxed">
                    Formal DNR and Palliative Comfort Care Directive established with family Power of Attorney Manoj Kulkarni and confirmed by Dr. Anita Mehta (KMC-88391). In the event of acute respiratory or cardiac arrest, prioritize non-invasive comfort measures.
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-xs text-haven-royal-blue font-medium">
                    <span className="font-mono">Reference: ACP-KA-8823</span>
                    <span>•</span>
                    <button
                      onClick={() => setActiveTab('documents')}
                      className="hover:underline flex items-center gap-1"
                    >
                      View Signed Directive Document <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Emergency & Care Directives */}
          <div className="space-y-6">
            {/* Allergies Card */}
            <Card className="border-red-200">
              <CardHeader className="pb-3 border-b border-red-100 bg-red-50/50">
                <CardTitle className="text-sm font-bold text-red-900 flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-red-600" />
                  <span>Allergies & Adverse Sensitivities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {resident.allergies && resident.allergies.length > 0 ? (
                  resident.allergies.map((allergy, i) => (
                    <div key={i} className="p-3 rounded-lg bg-red-50/60 border border-red-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-red-950">{allergy.allergen}</span>
                        <Badge variant="danger" className="text-[10px] uppercase font-bold">
                          {allergy.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-red-800 mt-1">Reaction: {allergy.reaction}</p>
                      <span className="text-[10px] text-red-600 mt-0.5 block">
                        Diagnosed: {allergy.diagnosedDate}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-haven-neutral-500">No known drug or environmental allergies.</p>
                )}
              </CardContent>
            </Card>

            {/* Primary Family Contact */}
            <Card>
              <CardHeader className="pb-3 border-b border-haven-neutral-200">
                <CardTitle className="text-sm font-bold text-haven-navy-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-haven-royal-blue" />
                  <span>Family & Emergency Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-xs">
                {resident.emergencyContacts && resident.emergencyContacts.length > 0 ? (
                  <div>
                    <span className="font-bold text-haven-navy-900 text-sm block">
                      {resident.emergencyContacts[0].name}
                    </span>
                    <span className="text-haven-neutral-600 block">
                      Relationship: {resident.emergencyContacts[0].relationship}
                    </span>
                    <div className="mt-2 flex items-center gap-2 text-haven-royal-blue font-semibold">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{resident.emergencyContacts[0].phone}</span>
                    </div>
                    {resident.emergencyContacts[0].email && (
                      <span className="text-haven-neutral-500 block mt-1">
                        {resident.emergencyContacts[0].email}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-haven-neutral-500">No primary emergency contact specified.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: MEDICAL HISTORY */}
      {activeTab === 'history' && (
        <Card>
          <CardHeader className="border-b border-haven-neutral-200">
            <CardTitle className="text-base font-bold text-haven-navy-900">
              Longitudinal Clinical & Surgical History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h4 className="text-xs font-bold text-haven-neutral-500 uppercase tracking-wider mb-3">
                Chronic Medical Diagnoses
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resident.conditions?.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-haven-neutral-200 bg-haven-ice-blue/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-haven-navy-900 text-sm">{c.condition}</span>
                      <Badge variant="outline" className="text-xs">{c.icdCode}</Badge>
                    </div>
                    <p className="text-xs text-haven-neutral-600">{c.notes}</p>
                    <span className="text-[11px] text-haven-neutral-400 block pt-1">
                      Onset / Diagnosis Date: {c.diagnosedDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-haven-neutral-200">
              <h4 className="text-xs font-bold text-haven-neutral-500 uppercase tracking-wider mb-3">
                Surgical & Hospitalization History
              </h4>
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg border border-haven-neutral-200 text-xs flex items-start justify-between">
                  <div>
                    <span className="font-bold text-haven-navy-900">Total Hip Arthroplasty (Left Hip)</span>
                    <p className="text-haven-neutral-600 mt-0.5">Manipal Hospital, Bengaluru · Elective joint replacement under spinal anaesthesia. Uncomplicated recovery.</p>
                  </div>
                  <span className="text-haven-neutral-500 font-mono text-[11px] shrink-0">Nov 2021</span>
                </div>
                <div className="p-3.5 rounded-lg border border-haven-neutral-200 text-xs flex items-start justify-between">
                  <div>
                    <span className="font-bold text-haven-navy-900">Cataract Phacoemulsification (Bilateral)</span>
                    <p className="text-haven-neutral-600 mt-0.5">Narayana Nethralaya, Bengaluru · Posterior chamber IOL implantation.</p>
                  </div>
                  <span className="text-haven-neutral-500 font-mono text-[11px] shrink-0">Mar 2023</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-haven-neutral-200">
              <h4 className="text-xs font-bold text-haven-neutral-500 uppercase tracking-wider mb-3">
                Immunization Ledger (Geriatric Protocol)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-950 block">Pneumococcal 23-Valent</span>
                  <span className="text-emerald-800 text-[11px]">Administered: Oct 2024 · HAVEN Clinic</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-950 block">Influenza Quadrivalent</span>
                  <span className="text-emerald-800 text-[11px]">Administered: Sep 2026 · Annual Booster</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-950 block">COVID-19 Booster (Corbevax)</span>
                  <span className="text-emerald-800 text-[11px]">Administered: May 2024 · Verified</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 3: MEDICATIONS */}
      {activeTab === 'medications' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-haven-navy-900">Active Prescriptions & Dosage Regimen</h3>
              <p className="text-xs text-haven-neutral-500">
                Prescriptions managed under Physician License KMC-88391
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/doctor/prescriptions')}>
              <Plus className="w-4 h-4 mr-1.5" /> Issue New Prescription
            </Button>
          </div>

          <div className="space-y-4">
            {residentPrescriptions.map((rx) => (
              <Card key={rx.id} className="hover:border-haven-blue-300 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold text-haven-navy-900">
                          {rx.medicationName}
                        </span>
                        <Badge variant="outline" className="font-mono text-xs">
                          {rx.id} v{rx.version}
                        </Badge>
                        <Badge
                          variant={rx.status === 'active' ? 'success' : 'warning'}
                          className="capitalize text-xs font-medium"
                        >
                          {rx.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-haven-neutral-600">
                        <strong>Dosage:</strong> {rx.dosage} · <strong>Route:</strong> {rx.route} ·{' '}
                        <strong>Frequency:</strong> {rx.frequency} ({rx.timing.join(', ')})
                      </p>
                      <p className="text-xs text-haven-neutral-500">
                        <strong>Indication:</strong> {rx.indication} · <strong>Instructions:</strong> {rx.instructions}
                      </p>
                    </div>

                    <div className="text-right text-xs shrink-0 space-y-1">
                      <span className="text-haven-neutral-500 block">
                        Prescribed: {rx.authorizedDate}
                      </span>
                      <span className="text-haven-navy-900 font-medium block">
                        {rx.prescribingDoctor} ({rx.doctorLicense})
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => navigate('/doctor/prescriptions')}
                      >
                        Modify / Discontinue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CLINICAL NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-haven-navy-900">Clinical Assessments & Notes Ledger</h3>
              <p className="text-xs text-haven-neutral-500">
                Official SOAP clinical documentation stamped with Karnataka Medical Council registration
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setIsNewNoteOpen(true)}>
              <Plus className="w-4 h-4 mr-1.5" /> New Clinical Note
            </Button>
          </div>

          <div className="space-y-4">
            {residentNotes.length > 0 ? (
              residentNotes.map((note) => (
                <Card key={note.id} className="border-haven-neutral-200 hover:border-haven-blue-300 transition-colors">
                  <CardHeader className="pb-3 border-b border-haven-neutral-100 flex flex-row items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-haven-navy-900">{note.type}</span>
                        <Badge variant="outline" className="font-mono text-[11px]">{note.id}</Badge>
                        <Badge
                          variant={note.status === 'signed' ? 'success' : note.status === 'amended' ? 'info' : 'warning'}
                          className="capitalize text-[11px]"
                        >
                          {note.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-haven-neutral-500 mt-0.5 block">
                        Author: {note.authorName} ({note.authorRole} · {note.authorKmc}) · {note.date} at {note.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedNote(note);
                          setIsAddendumOpen(true);
                        }}
                      >
                        Add Addendum
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4 text-xs">
                    {/* SOAP Sections */}
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-haven-navy-900 text-xs block uppercase tracking-wider text-[11px]">
                          Subjective Observations & Resident Report:
                        </span>
                        <p className="text-haven-neutral-700 mt-1 leading-relaxed">{note.subjectiveObservations}</p>
                      </div>

                      {note.objectiveFindings && (
                        <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100">
                          <span className="font-bold text-haven-navy-900 text-xs block uppercase tracking-wider text-[11px] mb-1">
                            Objective Findings & Vitals:
                          </span>
                          <div className="flex flex-wrap gap-4 text-haven-navy-900">
                            <span><strong>BP:</strong> {note.objectiveFindings.bp}</span>
                            <span><strong>Pulse:</strong> {note.objectiveFindings.pulse} bpm</span>
                            <span><strong>SpO2:</strong> {note.objectiveFindings.spo2}%</span>
                            {note.objectiveFindings.temp && <span><strong>Temp:</strong> {note.objectiveFindings.temp}</span>}
                            {note.objectiveFindings.bloodGlucose && (
                              <span><strong>Blood Glucose:</strong> {note.objectiveFindings.bloodGlucose}</span>
                            )}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="font-bold text-haven-navy-900 text-xs block uppercase tracking-wider text-[11px]">
                          Clinical Assessment:
                        </span>
                        <p className="text-haven-neutral-700 mt-1 leading-relaxed">{note.clinicalAssessment}</p>
                      </div>

                      <div>
                        <span className="font-bold text-haven-navy-900 text-xs block uppercase tracking-wider text-[11px]">
                          Care Plan Directive & Orders:
                        </span>
                        <p className="text-haven-neutral-700 mt-1 leading-relaxed">{note.carePlanDirective}</p>
                      </div>

                      <div>
                        <span className="font-bold text-haven-navy-900 text-xs block uppercase tracking-wider text-[11px]">
                          Follow-up Plan:
                        </span>
                        <p className="text-haven-neutral-700 mt-1 leading-relaxed">{note.followUpInstructions}</p>
                      </div>

                      {/* Addenda list if any */}
                      {note.addenda && note.addenda.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-haven-neutral-200 space-y-2">
                          <span className="font-bold text-haven-royal-blue text-xs uppercase tracking-wider block">
                            Audited Addenda ({note.addenda.length})
                          </span>
                          {note.addenda.map((addendum) => (
                            <div
                              key={addendum.id}
                              className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between text-haven-navy-900 font-semibold">
                                <span>{addendum.author}</span>
                                <span className="font-mono text-[11px] text-haven-neutral-500">{addendum.timestamp}</span>
                              </div>
                              <p className="text-haven-neutral-800">{addendum.text}</p>
                              <span className="text-[10px] text-haven-neutral-500 block italic">
                                Justification: {addendum.reason}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-xs text-haven-neutral-500 py-6 text-center">
                No clinical notes recorded yet for this resident.
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: OBSERVATIONS & VITALS */}
      {activeTab === 'vitals' && (
        <Card>
          <CardHeader className="border-b border-haven-neutral-200">
            <CardTitle className="text-base font-bold text-haven-navy-900">
              Vitals & Clinical Observation Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-haven-neutral-200 text-haven-neutral-500 font-semibold uppercase">
                    <th className="py-2.5 px-3">Date & Time</th>
                    <th className="py-2.5 px-3">Blood Pressure</th>
                    <th className="py-2.5 px-3">Pulse</th>
                    <th className="py-2.5 px-3">SpO2</th>
                    <th className="py-2.5 px-3">Blood Glucose</th>
                    <th className="py-2.5 px-3">Recorded By</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-haven-neutral-100">
                  <tr className="hover:bg-haven-ice-blue/40">
                    <td className="py-3 px-3 font-medium text-haven-navy-900">Nov 10, 2026 · 09:15 IST</td>
                    <td className="py-3 px-3 font-semibold text-haven-navy-900">
                      132/84 mmHg
                    </td>
                    <td className="py-3 px-3">74 bpm</td>
                    <td className="py-3 px-3 text-emerald-700 font-semibold">98%</td>
                    <td className="py-3 px-3">118 mg/dL (fasting)</td>
                    <td className="py-3 px-3 text-haven-neutral-600">Nurse Sneha Joshi, RN</td>
                    <td className="py-3 px-3">
                      <Badge variant="success" className="text-[10px]">Optimal</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-haven-ice-blue/40">
                    <td className="py-3 px-3 font-medium text-haven-navy-900">Nov 09, 2026 · 17:00 IST</td>
                    <td className="py-3 px-3 font-semibold text-haven-navy-900">128/82 mmHg</td>
                    <td className="py-3 px-3">72 bpm</td>
                    <td className="py-3 px-3 text-emerald-700 font-semibold">97%</td>
                    <td className="py-3 px-3">142 mg/dL (post-prandial)</td>
                    <td className="py-3 px-3 text-haven-neutral-600">Caregiver Priya Shetty</td>
                    <td className="py-3 px-3">
                      <Badge variant="success" className="text-[10px]">Normal</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-haven-ice-blue/40">
                    <td className="py-3 px-3 font-medium text-haven-navy-900">Nov 08, 2026 · 08:30 IST</td>
                    <td className="py-3 px-3 font-semibold text-haven-navy-900">136/88 mmHg</td>
                    <td className="py-3 px-3">78 bpm</td>
                    <td className="py-3 px-3 text-emerald-700 font-semibold">98%</td>
                    <td className="py-3 px-3">124 mg/dL</td>
                    <td className="py-3 px-3 text-haven-neutral-600">Nurse Sneha Joshi, RN</td>
                    <td className="py-3 px-3">
                      <Badge variant="info" className="text-[10px]">Borderline High</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 6: CARE TEAM */}
      {activeTab === 'care-team' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-haven-blue-200">
            <CardHeader className="pb-3 border-b border-haven-neutral-100">
              <span className="text-xs font-semibold text-haven-royal-blue uppercase tracking-wider">
                Lead Attending Physician
              </span>
              <CardTitle className="text-sm font-bold text-haven-navy-900 mt-1">
                {ACTIVE_DOCTOR.fullName}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2 text-xs">
              <p className="text-haven-neutral-600">{ACTIVE_DOCTOR.title}</p>
              <p className="text-haven-neutral-500 font-mono">Reg: {ACTIVE_DOCTOR.registrationNumber}</p>
              <p className="text-haven-neutral-700 font-medium">{ACTIVE_DOCTOR.hospitalAffiliation}</p>
              <div className="pt-2 text-haven-royal-blue font-semibold">
                {ACTIVE_DOCTOR.phone}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-haven-neutral-100">
              <span className="text-xs font-semibold text-haven-neutral-500 uppercase tracking-wider">
                Assigned Primary Nurse
              </span>
              <CardTitle className="text-sm font-bold text-haven-navy-900 mt-1">
                Nurse Sneha Joshi, BSc Nursing
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2 text-xs">
              <p className="text-haven-neutral-600">Senior Staff Nurse · Wing Care Coordinator</p>
              <p className="text-haven-neutral-500 font-mono">KNC Reg: 44912-KA</p>
              <p className="text-haven-neutral-700 font-medium">Shift: Morning (07:00 – 15:30 IST)</p>
              <div className="pt-2 text-haven-royal-blue font-semibold">
                +91 98450 44102
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-haven-neutral-100">
              <span className="text-xs font-semibold text-haven-neutral-500 uppercase tracking-wider">
                Consulting Neurologist
              </span>
              <CardTitle className="text-sm font-bold text-haven-navy-900 mt-1">
                Dr. Arjun Rao, DM (Neuro)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2 text-xs">
              <p className="text-haven-neutral-600">Consultant Neurologist · Memory Care Panel</p>
              <p className="text-haven-neutral-500 font-mono">Reg: KMC-51209</p>
              <p className="text-haven-neutral-700 font-medium">Visiting Consultations: Bi-weekly Thursdays</p>
              <div className="pt-2 text-haven-royal-blue font-semibold">
                +91 94481 99201
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 7: INCIDENTS & FOLLOW-UPS */}
      {activeTab === 'incidents' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-haven-navy-900">Incident Reviews & Clinical Sign-offs</h3>
              <p className="text-xs text-haven-neutral-500">
                Institutional incident log and physician post-event assessments
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/doctor/incidents')}>
              View All Facility Incidents
            </Button>
          </div>

          <div className="space-y-4">
            {residentIncidents.length > 0 ? (
              residentIncidents.map((inc) => (
                <Card key={inc.id} className="border-haven-neutral-200">
                  <CardHeader className="pb-3 border-b border-haven-neutral-100 flex flex-row items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-haven-navy-900">{inc.category}</span>
                        <Badge variant="outline" className="font-mono text-xs">{inc.reference}</Badge>
                        <Badge
                          variant={inc.severity === 'critical' ? 'danger' : 'warning'}
                          className="capitalize text-xs"
                        >
                          {inc.severity} Severity
                        </Badge>
                      </div>
                      <span className="text-xs text-haven-neutral-500 mt-0.5 block">
                        Occurred: {inc.occurredAt} · Reported by {inc.reportedBy} ({inc.reporterRole})
                      </span>
                    </div>

                    <Badge
                      variant={inc.physicianSignOffStatus === 'signed_off' ? 'success' : 'warning'}
                      className="text-xs"
                    >
                      {inc.physicianSignOffStatus === 'signed_off' ? 'Physician Signed' : 'Sign-off Pending'}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3 text-xs">
                    <p className="text-haven-neutral-700"><strong>Summary:</strong> {inc.summary}</p>
                    <p className="text-haven-neutral-700"><strong>Clinical Findings:</strong> {inc.clinicalObservations}</p>
                    <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100 flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <span className="font-bold text-haven-navy-900 block">Post-Event Hemodynamics:</span>
                        <span className="text-haven-neutral-700">
                          BP: {inc.vitalsPostIncident?.bp || '132/84 mmHg'} · Pulse: {inc.vitalsPostIncident?.pulse || 74} bpm · SpO2: {inc.vitalsPostIncident?.spo2 || 97}%
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/doctor/incidents')}
                      >
                        Open Incident Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-xs text-haven-neutral-500 py-6 text-center">
                No incidents on record for this resident.
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 8: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-haven-navy-900">Diagnostic Reports & Advance Directives</h3>
              <p className="text-xs text-haven-neutral-500">
                Verified lab, cardiology, radiology and legal clinical documentation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {residentDocuments.length > 0 ? (
              residentDocuments.map((doc) => (
                <Card key={doc.id} className="hover:border-haven-blue-300 transition-colors">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-haven-royal-blue shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-haven-navy-900">{doc.title}</h4>
                          <span className="text-[11px] text-haven-neutral-500 font-mono">
                            {doc.referenceNumber} · {doc.category}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50 border-emerald-200">
                        {doc.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-haven-neutral-600 line-clamp-2">
                      {doc.summary}
                    </p>

                    <div className="pt-2 border-t border-haven-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-haven-neutral-400 text-[11px]">
                        Uploaded {doc.uploadDate} · {doc.fileSize}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDocPreview(doc)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" /> View Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-xs text-haven-neutral-500 py-6 text-center col-span-2">
                No diagnostic documents attached to this resident record.
              </p>
            )}
          </div>
        </div>
      )}

      {/* DIALOG 1: Add Addendum Modal */}
      <Dialog open={isAddendumOpen} onOpenChange={setIsAddendumOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Append Audited Addendum to Clinical Note
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            {selectedNote && (
              <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100">
                <span className="font-semibold text-haven-navy-900 block">
                  Original Note: {selectedNote.type} ({selectedNote.id})
                </span>
                <span className="text-haven-neutral-600">
                  Authored by {selectedNote.authorName} on {selectedNote.date}
                </span>
              </div>
            )}

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Clinical Justification / Reason:
              </label>
              <Select
                value={addendumReason}
                onChange={(e) => setAddendumReason(e.target.value)}
                className="text-xs"
              >
                <option value="Integration of subsequent clinical observation">Integration of subsequent clinical observation</option>
                <option value="Clarification of medication directive">Clarification of medication directive</option>
                <option value="Correction of typographical transcription">Correction of typographical transcription</option>
                <option value="Specialist consultation recommendation incorporation">Specialist consultation recommendation incorporation</option>
              </Select>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Addendum Entry:
              </label>
              <textarea
                value={addendumText}
                onChange={(e) => setAddendumText(e.target.value)}
                placeholder="Enter clinical observations, vital updates, or adjusted care directives..."
                rows={4}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>
            <p className="text-[11px] text-haven-neutral-500 italic">
              * Clinical addenda are permanently appended with an immutable timestamp and the signing clinician&rsquo;s Karnataka Medical Council registration.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsAddendumOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveAddendum}
              disabled={!addendumText.trim()}
            >
              Sign & Append Addendum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: Create New Clinical Note */}
      <Dialog open={isNewNoteOpen} onOpenChange={setIsNewNoteOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Record New Clinical Assessment — {resident.fullName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Note Category:</label>
                <Select
                  value={newNoteType}
                  onChange={(e) => setNewNoteType(e.target.value as DoctorClinicalNote['type'])}
                  className="text-xs"
                >
                  <option value="Progress Note">Progress Note</option>
                  <option value="Initial Assessment">Initial Assessment</option>
                  <option value="Follow-up Assessment">Follow-up Assessment</option>
                  <option value="Medication Review">Medication Review</option>
                  <option value="Post-Incident Assessment">Post-Incident Assessment</option>
                  <option value="Specialist Consultation">Specialist Consultation</option>
                  <option value="Discharge / Transfer Summary">Discharge / Transfer Summary</option>
                </Select>
              </div>
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Author / Attending:</label>
                <Input
                  disabled
                  value={`${ACTIVE_DOCTOR.fullName} (${ACTIVE_DOCTOR.registrationNumber})`}
                  className="text-xs bg-haven-neutral-100"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Subjective Observations (Resident complaints, mood, caregiver report):
              </label>
              <textarea
                value={newNoteSubjective}
                onChange={(e) => setNewNoteSubjective(e.target.value)}
                placeholder="Patient alert, oriented to time and person. Reports sleeping comfortably..."
                rows={3}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Clinical Assessment:
              </label>
              <textarea
                value={newNoteAssessment}
                onChange={(e) => setNewNoteAssessment(e.target.value)}
                placeholder="Hemodynamically stable. Essential hypertension well controlled..."
                rows={3}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Care Plan Directive / Orders:
                </label>
                <textarea
                  value={newNoteDirectives}
                  onChange={(e) => setNewNoteDirectives(e.target.value)}
                  placeholder="Continue current morning antihypertensive. Hydration 1.8L daily..."
                  rows={2}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Follow-up Instructions:
                </label>
                <textarea
                  value={newNoteFollowUp}
                  onChange={(e) => setNewNoteFollowUp(e.target.value)}
                  placeholder="Recheck vitals Q4H. Follow-up review next week..."
                  rows={2}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsNewNoteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateNote}
              disabled={!newNoteSubjective.trim() || !newNoteAssessment.trim()}
            >
              Sign & Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 3: Document Preview Modal */}
      <Dialog open={!!selectedDocPreview} onOpenChange={() => setSelectedDocPreview(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-haven-royal-blue" />
              <span>{selectedDocPreview?.title}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedDocPreview && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-haven-navy-900 block">
                    Ref: {selectedDocPreview.referenceNumber}
                  </span>
                  <span className="text-haven-neutral-600">Category: {selectedDocPreview.category}</span>
                </div>
                <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200">
                  {selectedDocPreview.status}
                </Badge>
              </div>

              <div>
                <h5 className="font-bold text-haven-navy-900 mb-1">Clinical Summary & Findings:</h5>
                <p className="text-haven-neutral-700 leading-relaxed p-3 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                  {selectedDocPreview.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px] text-haven-neutral-500 pt-2 border-t border-haven-neutral-200">
                <div>
                  <strong>Uploaded By:</strong> {selectedDocPreview.uploadedBy}
                </div>
                <div>
                  <strong>Date:</strong> {selectedDocPreview.uploadDate} ({selectedDocPreview.fileSize})
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setSelectedDocPreview(null)}>
              Close Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
