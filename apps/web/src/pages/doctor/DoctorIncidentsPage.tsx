import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertTriangle,
  Search,
  CheckCircle2,
  Clock,
  Stethoscope,
  User,
  AlertOctagon,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent, CardHeader } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/Dialog.tsx';
import {
  MOCK_DETAILED_INCIDENTS,
  type DetailedIncidentRecord,
} from '../../mock/incidentsData.ts';
import { ACTIVE_DOCTOR } from '../../mock/doctorWorkspaceData.ts';

export function DoctorIncidentsPage() {
  useDocumentTitle('Incident & Clinical Review — Doctor');
  const navigate = useNavigate();

  const [incidents, setIncidents] = useState<DetailedIncidentRecord[]>(MOCK_DETAILED_INCIDENTS);
  const [activeTab, setActiveTab] = useState<'pending' | 'signed' | 'all'>('pending');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  // Sign-off modal state
  const [isSignOffModalOpen, setIsSignOffModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<DetailedIncidentRecord | null>(null);
  const [clinicalExamNotes, setClinicalExamNotes] = useState('');
  const [careDirectiveUpdates, setCareDirectiveUpdates] = useState('');
  const [followUpSchedule, setFollowUpSchedule] = useState('Recheck vitals Q4H. Follow-up review Nov 11 morning rounds.');

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inc.reference.toLowerCase().includes(q) ||
        inc.residentName.toLowerCase().includes(q) ||
        inc.summary.toLowerCase().includes(q) ||
        inc.category.toLowerCase().includes(q);

      const matchesCategory = selectedCategory === 'all' || inc.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'all' || inc.severity === selectedSeverity;

      let matchesTab = true;
      if (activeTab === 'pending') {
        matchesTab = inc.physicianSignOffStatus === 'pending';
      } else if (activeTab === 'signed') {
        matchesTab = inc.physicianSignOffStatus === 'signed_off';
      }

      return matchesSearch && matchesCategory && matchesSeverity && matchesTab;
    });
  }, [incidents, searchQuery, selectedCategory, selectedSeverity, activeTab]);

  // Statistics
  const stats = useMemo(() => {
    const total = incidents.length;
    const pendingSignOff = incidents.filter((i) => i.physicianSignOffStatus === 'pending').length;
    const signedOff = incidents.filter((i) => i.physicianSignOffStatus === 'signed_off').length;
    const criticalCount = incidents.filter((i) => i.severity === 'critical' || i.severity === 'high').length;
    return { total, pendingSignOff, signedOff, criticalCount };
  }, [incidents]);

  // Handle Clinical Sign-off
  const handleConfirmSignOff = () => {
    if (!selectedIncident || !clinicalExamNotes.trim()) return;

    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === selectedIncident.id) {
          return {
            ...inc,
            physicianSignOffStatus: 'signed_off',
            physicianSignOffNotes: `${clinicalExamNotes.trim()} Directives: ${careDirectiveUpdates.trim()}. Signed by ${ACTIVE_DOCTOR.fullName}, MD (${ACTIVE_DOCTOR.registrationNumber}) on Nov 10, 2026.`,
            status: 'corrective_action',
            statusHistory: [
              ...inc.statusHistory,
              {
                fromStatus: inc.status,
                toStatus: 'corrective_action',
                timestamp: 'Nov 10, 2026 · 14:50 IST',
                actor: ACTIVE_DOCTOR.fullName,
                role: 'Lead Geriatrician',
                reason: 'Physician post-event clinical evaluation and care plan directive authorized.',
              },
            ],
          };
        }
        return inc;
      })
    );

    setIsSignOffModalOpen(false);
    setSelectedIncident(null);
    setClinicalExamNotes('');
    setCareDirectiveUpdates('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
            Incident & Clinical Review
          </h1>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Institutional incident evaluations, post-fall assessments, and physician clinical sign-offs (KMC-88391)
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-amber-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Pending Physician Sign-off
              </span>
              <span className="text-2xl font-bold text-amber-700 mt-1 block">
                {stats.pendingSignOff}
              </span>
              <span className="text-[11px] text-amber-800 block mt-0.5">
                Requires clinical review
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Signed-off Reviews
              </span>
              <span className="text-2xl font-bold text-emerald-700 mt-1 block">
                {stats.signedOff}
              </span>
              <span className="text-[11px] text-emerald-800 block mt-0.5">
                Evaluations completed
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Critical / High Severity
              </span>
              <span className="text-2xl font-bold text-red-700 mt-1 block">
                {stats.criticalCount}
              </span>
              <span className="text-[11px] text-red-800 block mt-0.5">
                High-priority incidents
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-haven-blue-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Total Incident Records
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                {stats.total}
              </span>
              <span className="text-[11px] text-haven-neutral-500 block mt-0.5">
                All facility logs
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-haven-ice-blue border border-haven-blue-100 flex items-center justify-center text-haven-royal-blue">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-haven-neutral-200 flex gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'pending'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pending Sign-off ({stats.pendingSignOff})</span>
        </button>

        <button
          onClick={() => setActiveTab('signed')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'signed'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Signed-off ({stats.signedOff})</span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'all'
              ? 'border-haven-royal-blue text-haven-royal-blue'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>All Clinical Incidents ({stats.total})</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-haven-neutral-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reference, resident, or summary..."
            className="pl-8 text-xs h-8"
          />
        </div>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs h-8"
        >
          <option value="all">All Incident Categories</option>
          <option value="Fall / Slip">Fall / Slip</option>
          <option value="Behavioural">Behavioural</option>
          <option value="Equipment / Facility">Equipment / Facility</option>
          <option value="Medication Discrepancy">Medication Discrepancy</option>
          <option value="Elopement Risk">Elopement Risk</option>
        </Select>

        <Select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="text-xs h-8"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
      </div>

      {/* Incident Cards Feed */}
      <div className="space-y-4">
        {filteredIncidents.map((inc) => (
          <Card
            key={inc.id}
            className={`border transition-colors ${
              inc.physicianSignOffStatus === 'pending'
                ? 'border-amber-300 bg-amber-50/15'
                : 'border-haven-neutral-200'
            }`}
          >
            <CardHeader className="pb-3 border-b border-haven-neutral-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-haven-navy-900">
                      {inc.category}
                    </span>
                    <Badge variant="outline" className="font-mono text-xs">
                      {inc.reference}
                    </Badge>
                    <Badge
                      variant={
                        inc.severity === 'critical'
                          ? 'danger'
                          : inc.severity === 'high'
                          ? 'danger'
                          : inc.severity === 'medium'
                          ? 'warning'
                          : 'info'
                      }
                      className="uppercase text-xs font-bold"
                    >
                      {inc.severity}
                    </Badge>
                    <Badge
                      variant={
                        inc.physicianSignOffStatus === 'signed_off'
                          ? 'success'
                          : 'warning'
                      }
                      className="text-xs"
                    >
                      {inc.physicianSignOffStatus === 'signed_off'
                        ? 'Physician Signed'
                        : 'Sign-off Required'}
                    </Badge>
                  </div>

                  <div className="text-xs text-haven-neutral-600 flex flex-wrap items-center gap-x-2">
                    <strong className="text-haven-navy-900">{inc.residentName}</strong>
                    <span>({inc.room} · {inc.wing})</span>
                    <span>•</span>
                    <span>Occurred: {inc.occurredAt}</span>
                    <span>•</span>
                    <span>Reported by: {inc.reportedBy} ({inc.reporterRole})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {inc.physicianSignOffStatus === 'pending' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedIncident(inc);
                        setClinicalExamNotes(
                          'Post-fall contusion right trochanteric region without neurological deficit or clinical evidence of fracture. Stable hemodynamics.'
                        );
                        setCareDirectiveUpdates(
                          'Continue 2-person transfer assist. Prescribed Paracetamol 650mg SOS for musculoskeletal discomfort.'
                        );
                        setIsSignOffModalOpen(true);
                      }}
                    >
                      <Stethoscope className="w-3.5 h-3.5 mr-1" /> Complete Clinical Sign-off
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/doctor/residents/${inc.residentId}`)}
                    >
                      <User className="w-3.5 h-3.5 mr-1" /> Resident Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                <span className="font-bold text-haven-navy-900 block mb-0.5">
                  Floor Incident Report & Immediate Response:
                </span>
                <p className="text-haven-neutral-700 leading-relaxed">{inc.summary}</p>
                {inc.immediateActionTaken && (
                  <p className="text-haven-neutral-600 mt-1">
                    <strong>Immediate Action:</strong> {inc.immediateActionTaken}
                  </p>
                )}
              </div>

              {inc.vitalsPostIncident && (
                <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100 flex flex-wrap items-center gap-4 text-haven-navy-900 font-medium">
                  <span className="text-[11px] font-bold uppercase text-haven-royal-blue">
                    Post-Event Vitals:
                  </span>
                  <span><strong>BP:</strong> {inc.vitalsPostIncident.bp}</span>
                  <span><strong>Pulse:</strong> {inc.vitalsPostIncident.pulse} bpm</span>
                  <span><strong>SpO2:</strong> {inc.vitalsPostIncident.spo2}%</span>
                </div>
              )}

              {inc.physicianSignOffNotes && (
                <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-1">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Physician Clinical Findings & Sign-off:
                  </span>
                  <p className="leading-relaxed">{inc.physicianSignOffNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DIALOG: Physician Clinical Sign-Off Modal */}
      <Dialog open={isSignOffModalOpen} onOpenChange={setIsSignOffModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-haven-royal-blue" />
              <span>Physician Post-Incident Clinical Evaluation</span>
            </DialogTitle>
          </DialogHeader>
          {selectedIncident && (
            <div className="space-y-4 py-2 text-xs max-h-[70vh] overflow-y-auto pr-1">
              <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100">
                <span className="font-bold text-haven-navy-900 block">
                  Incident: {selectedIncident.category} ({selectedIncident.reference})
                </span>
                <span className="text-haven-neutral-600">
                  Resident: {selectedIncident.residentName} · Room: {selectedIncident.room}
                </span>
                <p className="text-haven-neutral-700 mt-1">
                  Summary: &ldquo;{selectedIncident.summary}&rdquo;
                </p>
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Physical & Neurological Examination Findings:
                </label>
                <textarea
                  value={clinicalExamNotes}
                  onChange={(e) => setClinicalExamNotes(e.target.value)}
                  placeholder="Document head/neck, musculoskeletal exam, pupil reactivity, limb mobility..."
                  rows={3}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Care Plan Directive Updates & Medication Orders:
                </label>
                <textarea
                  value={careDirectiveUpdates}
                  onChange={(e) => setCareDirectiveUpdates(e.target.value)}
                  placeholder="e.g. Prescribed Paracetamol 650mg SOS. 2-person transfer assist. Ice pack TID..."
                  rows={2}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Nursing Follow-up Instructions:
                </label>
                <Input
                  value={followUpSchedule}
                  onChange={(e) => setFollowUpSchedule(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="p-3 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200 text-[11px] text-haven-neutral-600">
                <p>
                  Signing Clinician: <strong>{ACTIVE_DOCTOR.fullName}, MD</strong> · Registration: <strong>{ACTIVE_DOCTOR.registrationNumber}</strong>
                </p>
                <p className="mt-0.5">
                  This submission updates the official institutional incident ledger and transitions incident status to Corrective Action.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsSignOffModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmSignOff}
              disabled={!clinicalExamNotes.trim()}
            >
              Authorize & Sign Off Incident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
