import { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  History,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent, CardHeader } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/Dialog.tsx';
import {
  MOCK_CLINICAL_NOTES,
  ACTIVE_DOCTOR,
  getDoctorAuthorizedResidents,
  type DoctorClinicalNote,
} from '../../mock/doctorWorkspaceData.ts';

export function DoctorClinicalNotesPage() {
  useDocumentTitle('Clinical Notes & Assessments — Doctor');

  const authorizedResidents = useMemo(() => getDoctorAuthorizedResidents(), []);
  const [notes, setNotes] = useState<DoctorClinicalNote[]>(MOCK_CLINICAL_NOTES);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedNoteIds, setExpandedNoteIds] = useState<Record<string, boolean>>({
    'NOTE-2026-088': true,
    'NOTE-2026-090': true,
  });

  // Modal States
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [isAddendumOpen, setIsAddendumOpen] = useState(false);
  const [activeNoteForAddendum, setActiveNoteForAddendum] = useState<DoctorClinicalNote | null>(null);
  const [addendumText, setAddendumText] = useState('');
  const [addendumReason, setAddendumReason] = useState('Integration of secondary nursing vital signs.');

  // Form State for New Note
  const [targetResidentId, setTargetResidentId] = useState(authorizedResidents[0]?.id || 'RES-044');
  const [noteType, setNoteType] = useState<DoctorClinicalNote['type']>('Progress Note');
  const [subjective, setSubjective] = useState('');
  const [bpInput, setBpInput] = useState('128/82 mmHg');
  const [pulseInput, setPulseInput] = useState('74');
  const [spo2Input, setSpo2Input] = useState('98');
  const [assessment, setAssessment] = useState('');
  const [directive, setDirective] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [saveAsDraft, setSaveAsDraft] = useState(false);

  // Toggle expansion
  const toggleExpand = (id: string) => {
    setExpandedNoteIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered Notes
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        n.residentName.toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q) ||
        n.clinicalAssessment.toLowerCase().includes(q) ||
        n.type.toLowerCase().includes(q);

      const matchesType = selectedType === 'all' || n.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || n.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [notes, searchQuery, selectedType, selectedStatus]);

  // Stats
  const stats = useMemo(() => {
    const total = notes.length;
    const signed = notes.filter((n) => n.status === 'signed').length;
    const drafts = notes.filter((n) => n.status === 'draft').length;
    const amended = notes.filter((n) => n.status === 'amended').length;
    return { total, signed, drafts, amended };
  }, [notes]);

  // Sign Draft Handler
  const handleSignDraft = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            status: 'signed',
            signedAt: 'Nov 10, 2026 · 14:40 IST',
          };
        }
        return n;
      })
    );
  };

  // Add Addendum Handler
  const handleSaveAddendum = () => {
    if (!activeNoteForAddendum || !addendumText.trim()) return;

    const newAddendumItem = {
      id: `ADD-${Date.now().toString().slice(-4)}`,
      timestamp: 'Nov 10, 2026 · 14:45 IST',
      author: `${ACTIVE_DOCTOR.fullName}, MD`,
      text: addendumText.trim(),
      reason: addendumReason,
    };

    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === activeNoteForAddendum.id) {
          return {
            ...n,
            status: 'amended',
            addenda: [...(n.addenda || []), newAddendumItem],
          };
        }
        return n;
      })
    );

    setIsAddendumOpen(false);
    setActiveNoteForAddendum(null);
    setAddendumText('');
  };

  // Create Note Handler
  const handleCreateNote = () => {
    if (!subjective.trim() || !assessment.trim()) return;

    const res = authorizedResidents.find((r) => r.id === targetResidentId);
    if (!res) return;

    const newNote: DoctorClinicalNote = {
      id: `NOTE-2026-${Math.floor(100 + Math.random() * 900)}`,
      residentId: res.id,
      residentName: res.fullName,
      room: res.placement.room,
      wing: res.placement.wing,
      type: noteType,
      authorName: ACTIVE_DOCTOR.fullName,
      authorRole: 'Lead Geriatrician',
      authorKmc: ACTIVE_DOCTOR.registrationNumber,
      date: 'Nov 10, 2026',
      time: '14:45 PM',
      status: saveAsDraft ? 'draft' : 'signed',
      signedAt: saveAsDraft ? undefined : 'Nov 10, 2026 · 14:45 PM IST',
      subjectiveObservations: subjective.trim(),
      objectiveFindings: {
        bp: bpInput.trim() || '128/82 mmHg',
        pulse: parseInt(pulseInput, 10) || 74,
        spo2: parseInt(spo2Input, 10) || 98,
      },
      clinicalAssessment: assessment.trim(),
      carePlanDirective: directive.trim() || 'Maintain regular elderly care routine.',
      followUpInstructions: followUp.trim() || 'Follow up in regular weekly clinic rounds.',
    };

    setNotes((prev) => [newNote, ...prev]);
    setIsNewNoteOpen(false);
    setSubjective('');
    setAssessment('');
    setDirective('');
    setFollowUp('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
            Clinical Notes & Assessments
          </h1>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Structured SOAP clinical notes, assessments, and auditable addenda stamped with KMC Registration KMC-88391
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsNewNoteOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" /> Author New Clinical Note
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-haven-blue-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Total Notes Recorded
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                {stats.total}
              </span>
              <span className="text-[11px] text-haven-neutral-500 block mt-0.5">
                Archived clinical ledger
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-haven-ice-blue border border-haven-blue-100 flex items-center justify-center text-haven-royal-blue">
              <FileText className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Signed & Finalized
              </span>
              <span className="text-2xl font-bold text-emerald-700 mt-1 block">
                {stats.signed}
              </span>
              <span className="text-[11px] text-emerald-800 block mt-0.5">
                Permanently sealed
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Pending Drafts
              </span>
              <span className="text-2xl font-bold text-amber-700 mt-1 block">
                {stats.drafts}
              </span>
              <span className="text-[11px] text-amber-800 block mt-0.5">
                Awaiting physician sign-off
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-haven-blue-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Audited Addenda
              </span>
              <span className="text-2xl font-bold text-haven-royal-blue mt-1 block">
                {stats.amended}
              </span>
              <span className="text-[11px] text-haven-royal-blue block mt-0.5">
                Notes with addenda
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-haven-ice-blue border border-haven-blue-100 flex items-center justify-center text-haven-royal-blue">
              <History className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-haven-neutral-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by resident name, ID, or keywords..."
            className="pl-8 text-xs h-8"
          />
        </div>

        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="text-xs h-8"
        >
          <option value="all">All Note Types</option>
          <option value="Progress Note">Progress Note</option>
          <option value="Initial Assessment">Initial Assessment</option>
          <option value="Follow-up Assessment">Follow-up Assessment</option>
          <option value="Medication Review">Medication Review</option>
          <option value="Post-Incident Assessment">Post-Incident Assessment</option>
          <option value="Specialist Consultation">Specialist Consultation</option>
          <option value="Discharge / Transfer Summary">Discharge / Transfer Summary</option>
        </Select>

        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="text-xs h-8"
        >
          <option value="all">All Statuses</option>
          <option value="signed">Signed & Sealed</option>
          <option value="draft">Drafts Only</option>
          <option value="amended">Amended / With Addenda</option>
        </Select>
      </div>

      {/* Notes Feed */}
      <div className="space-y-4">
        {filteredNotes.map((note) => {
          const isExpanded = !!expandedNoteIds[note.id];
          return (
            <Card
              key={note.id}
              className={`border transition-all ${
                note.status === 'draft'
                  ? 'border-amber-300 bg-amber-50/15'
                  : 'border-haven-neutral-200 hover:border-haven-blue-300'
              }`}
            >
              <CardHeader className="pb-3 border-b border-haven-neutral-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-haven-navy-900">
                        {note.type}
                      </span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {note.id}
                      </Badge>
                      <Badge
                        variant={
                          note.status === 'signed'
                            ? 'success'
                            : note.status === 'amended'
                            ? 'info'
                            : 'warning'
                        }
                        className="capitalize text-xs font-medium"
                      >
                        {note.status}
                      </Badge>
                      {note.relatedMedicationOrIncident && (
                        <span className="text-[11px] font-medium text-haven-royal-blue bg-haven-ice-blue px-2 py-0.5 rounded border border-haven-blue-100">
                          Linked: {note.relatedMedicationOrIncident}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-haven-neutral-600 flex flex-wrap items-center gap-x-2">
                      <strong className="text-haven-navy-900">{note.residentName}</strong>
                      <span>({note.room} · {note.wing})</span>
                      <span>•</span>
                      <span>Recorded: {note.date} at {note.time}</span>
                      <span>•</span>
                      <span>Author: {note.authorName} ({note.authorKmc})</span>
                    </div>
                  </div>

                  {/* Actions on note */}
                  <div className="flex items-center gap-2 shrink-0">
                    {note.status === 'draft' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSignDraft(note.id)}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Sign Note
                      </Button>
                    )}

                    {note.status !== 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActiveNoteForAddendum(note);
                          setAddendumText('');
                          setIsAddendumOpen(true);
                        }}
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Addendum
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(note.id)}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" /> Collapse
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" /> Expand SOAP
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* SOAP Details Content */}
              {isExpanded && (
                <CardContent className="pt-4 space-y-4 text-xs">
                  {/* Subjective */}
                  <div>
                    <span className="font-bold text-haven-navy-900 uppercase tracking-wider text-[11px] block">
                      Subjective Observations (Resident voice & caregiver reports):
                    </span>
                    <p className="text-haven-neutral-700 mt-1 leading-relaxed bg-white p-3 rounded-lg border border-haven-neutral-100">
                      {note.subjectiveObservations}
                    </p>
                  </div>

                  {/* Objective */}
                  {note.objectiveFindings && (
                    <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100 space-y-1.5">
                      <span className="font-bold text-haven-navy-900 uppercase tracking-wider text-[11px] block">
                        Objective Hemodynamic Readings & Exam Findings:
                      </span>
                      <div className="flex flex-wrap gap-4 text-haven-navy-900 font-medium">
                        <span><strong>BP:</strong> {note.objectiveFindings.bp}</span>
                        <span><strong>Pulse:</strong> {note.objectiveFindings.pulse} bpm</span>
                        <span><strong>SpO2:</strong> {note.objectiveFindings.spo2}%</span>
                        {note.objectiveFindings.temp && (
                          <span><strong>Temp:</strong> {note.objectiveFindings.temp}</span>
                        )}
                        {note.objectiveFindings.bloodGlucose && (
                          <span><strong>Glucose:</strong> {note.objectiveFindings.bloodGlucose}</span>
                        )}
                        {note.objectiveFindings.weight && (
                          <span><strong>Weight:</strong> {note.objectiveFindings.weight}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Assessment */}
                  <div>
                    <span className="font-bold text-haven-navy-900 uppercase tracking-wider text-[11px] block">
                      Clinical Impression & Differential Assessment:
                    </span>
                    <p className="text-haven-neutral-700 mt-1 leading-relaxed bg-white p-3 rounded-lg border border-haven-neutral-100">
                      {note.clinicalAssessment}
                    </p>
                  </div>

                  {/* Plan / Directives */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                      <span className="font-bold text-haven-navy-900 uppercase tracking-wider text-[11px] block mb-1">
                        Care Plan Directives & Medication Orders:
                      </span>
                      <p className="text-haven-neutral-700 leading-relaxed">
                        {note.carePlanDirective}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                      <span className="font-bold text-haven-navy-900 uppercase tracking-wider text-[11px] block mb-1">
                        Follow-up Instructions & Escalation Triggers:
                      </span>
                      <p className="text-haven-neutral-700 leading-relaxed">
                        {note.followUpInstructions}
                      </p>
                    </div>
                  </div>

                  {/* Addenda List */}
                  {note.addenda && note.addenda.length > 0 && (
                    <div className="pt-3 border-t border-haven-neutral-200 space-y-2">
                      <span className="font-bold text-haven-royal-blue uppercase tracking-wider text-[11px] block">
                        Appended Addenda Ledger ({note.addenda.length})
                      </span>
                      {note.addenda.map((addendum) => (
                        <div
                          key={addendum.id}
                          className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 space-y-1"
                        >
                          <div className="flex items-center justify-between text-haven-navy-900 font-semibold">
                            <span>{addendum.author}</span>
                            <span className="font-mono text-[11px] text-haven-neutral-500">
                              {addendum.timestamp}
                            </span>
                          </div>
                          <p className="text-haven-neutral-800">{addendum.text}</p>
                          <span className="text-[10px] text-haven-neutral-500 block italic">
                            Reason: {addendum.reason}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Digital Signature Badge */}
                  {note.signedAt && (
                    <div className="pt-2 flex items-center justify-between text-[11px] text-haven-neutral-500 border-t border-haven-neutral-100">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Digitally Signed & Locked by {note.authorName} ({note.authorKmc})
                      </span>
                      <span className="font-mono">{note.signedAt}</span>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* DIALOG 1: Author New Clinical Note */}
      <Dialog open={isNewNoteOpen} onOpenChange={setIsNewNoteOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Compose Clinical Note / Assessment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs max-h-[72vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Target Resident:</label>
                <Select
                  value={targetResidentId}
                  onChange={(e) => setTargetResidentId(e.target.value)}
                  className="text-xs"
                >
                  {authorizedResidents.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.fullName} ({r.placement.room})
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Note Classification:</label>
                <Select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as DoctorClinicalNote['type'])}
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
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Subjective Observations (Resident complaints, mood, caregiver handover):
              </label>
              <textarea
                value={subjective}
                onChange={(e) => setSubjective(e.target.value)}
                placeholder="Document resident statement, somatic symptoms, sleep quality..."
                rows={3}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>

            {/* Objective inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Blood Pressure:</label>
                <Input
                  value={bpInput}
                  onChange={(e) => setBpInput(e.target.value)}
                  placeholder="128/82 mmHg"
                  className="text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Pulse (bpm):</label>
                <Input
                  value={pulseInput}
                  onChange={(e) => setPulseInput(e.target.value)}
                  placeholder="74"
                  className="text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">SpO2 (%):</label>
                <Input
                  value={spo2Input}
                  onChange={(e) => setSpo2Input(e.target.value)}
                  placeholder="98"
                  className="text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Clinical Assessment & Impression:
              </label>
              <textarea
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                placeholder="Diagnostic impressions, cognitive / functional status..."
                rows={3}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Care Plan Directives & Medication Orders:
                </label>
                <textarea
                  value={directive}
                  onChange={(e) => setDirective(e.target.value)}
                  placeholder="Therapeutic directives, dietary changes..."
                  rows={2}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Follow-up Instructions:
                </label>
                <textarea
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  placeholder="Next review schedule, escalation triggers..."
                  rows={2}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="saveDraftCheckbox"
                checked={saveAsDraft}
                onChange={(e) => setSaveAsDraft(e.target.checked)}
                className="rounded border-haven-neutral-300 text-haven-royal-blue focus:ring-haven-royal-blue/30"
              />
              <label htmlFor="saveDraftCheckbox" className="font-medium text-haven-navy-900 text-xs">
                Save as Pending Draft (Leave unsigned for future modification)
              </label>
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
              disabled={!subjective.trim() || !assessment.trim()}
            >
              {saveAsDraft ? 'Save Draft Note' : 'Sign & Finalize Note (KMC-88391)'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: Append Addendum Modal */}
      <Dialog open={isAddendumOpen} onOpenChange={setIsAddendumOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Append Audited Addendum
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            {activeNoteForAddendum && (
              <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100">
                <span className="font-bold text-haven-navy-900 block">
                  Original: {activeNoteForAddendum.type} ({activeNoteForAddendum.id})
                </span>
                <span className="text-haven-neutral-600">
                  Resident: {activeNoteForAddendum.residentName} · Date: {activeNoteForAddendum.date}
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
                <option value="Integration of secondary nursing vital signs.">Integration of secondary nursing vital signs.</option>
                <option value="Clarification of medication administration instructions.">Clarification of medication administration instructions.</option>
                <option value="Specialist recommendation incorporation.">Specialist recommendation incorporation.</option>
                <option value="Correction of typographical transcription error.">Correction of typographical transcription error.</option>
              </Select>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Addendum Text Entry:
              </label>
              <textarea
                value={addendumText}
                onChange={(e) => setAddendumText(e.target.value)}
                placeholder="Enter clinical observations, vital updates, or adjusted care directives..."
                rows={4}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>
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
    </div>
  );
}
