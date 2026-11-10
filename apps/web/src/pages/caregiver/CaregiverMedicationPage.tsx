import { useState, useMemo } from 'react';
import {
  Pill,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import {
  ACTIVE_CAREGIVER,
  getAuthorizedResidents,
} from '../../mock/caregiverWorkspaceData.ts';
import {
  MOCK_EMAR_DOSES,
  type EmarDoseRecord,
  type DoseOutcome,
} from '../../mock/medicationsData.ts';

export function CaregiverMedicationPage() {
  useDocumentTitle('Medication Administration (eMAR) — Caregiver');

  // Authorized residents for Priya
  const authorizedResidents = useMemo(() => getAuthorizedResidents(), []);
  const authorizedResidentIds = useMemo(
    () => authorizedResidents.map((r) => r.id),
    [authorizedResidents]
  );

  // eMAR doses state for authorized residents
  const [doses, setDoses] = useState<EmarDoseRecord[]>(() =>
    MOCK_EMAR_DOSES.filter((d) => authorizedResidentIds.includes(d.residentId))
  );

  // Round / Slot Filter
  const [selectedSlot, setSelectedSlot] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('all');

  // Dose Verification Modal
  const [selectedDose, setSelectedDose] = useState<EmarDoseRecord | null>(null);
  const [decisionOutcome, setDecisionOutcome] = useState<DoseOutcome>('administered');
  const [exceptionReason, setExceptionReason] = useState<string>('');
  const [recordedBp, setRecordedBp] = useState<string>('124/80');
  const [recordedPulse, setRecordedPulse] = useState<string>('74');
  const [witnessedBy, setWitnessedBy] = useState<string>('');
  const [caregiverNotes, setCaregiverNotes] = useState<string>('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPIs
  const administeredCount = doses.filter((d) => d.outcome === 'administered').length;
  const pendingCount = doses.filter((d) => d.outcome === 'pending').length;
  const overdueCount = doses.filter((d) => d.outcome === 'overdue').length;
  const exceptionCount = doses.filter(
    (d) => d.outcome === 'refused' || d.outcome === 'withheld' || d.outcome === 'missed'
  ).length;

  // Filtered doses
  const filteredDoses = useMemo(() => {
    return doses.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.residentName.toLowerCase().includes(q) ||
        d.room.toLowerCase().includes(q) ||
        d.medicationName.toLowerCase().includes(q);

      const matchesSlot =
        selectedSlot === 'all' ||
        (selectedSlot === 'morning' && d.scheduledSlot.toLowerCase().includes('morning')) ||
        (selectedSlot === 'noon' && (d.scheduledSlot.toLowerCase().includes('noon') || d.scheduledSlot.toLowerCase().includes('afternoon'))) ||
        (selectedSlot === 'evening' && d.scheduledSlot.toLowerCase().includes('evening')) ||
        (selectedSlot === 'night' && d.scheduledSlot.toLowerCase().includes('night'));

      const matchesOutcome = outcomeFilter === 'all' || d.outcome === outcomeFilter;

      return matchesSearch && matchesSlot && matchesOutcome;
    });
  }, [doses, searchQuery, selectedSlot, outcomeFilter]);

  // Open administration dialog
  const handleOpenDoseModal = (dose: EmarDoseRecord) => {
    setSelectedDose(dose);
    setDecisionOutcome('administered');
    setExceptionReason('');
    setRecordedBp('124/80');
    setRecordedPulse('74');
    setWitnessedBy('');
    setCaregiverNotes('');
  };

  // Execute administration
  const handleConfirmAdministration = () => {
    if (!selectedDose) return;

    if (decisionOutcome !== 'administered' && !exceptionReason.trim()) {
      showToast('Exception reason is mandatory when withholding, refusing, or marking dose unavailable.');
      return;
    }

    const timestamp = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setDoses((prev) =>
      prev.map((d) =>
        d.id === selectedDose.id
          ? {
              ...d,
              outcome: decisionOutcome,
              status: decisionOutcome,
              administeredTime: `${timestamp} IST`,
              administeredAt: `${timestamp} IST`,
              administeredBy: ACTIVE_CAREGIVER.fullName,
              caregiverRole: ACTIVE_CAREGIVER.role,
              exceptionReason: decisionOutcome !== 'administered' ? exceptionReason : undefined,
              witnessedBy: witnessedBy ? witnessedBy : undefined,
              notes: caregiverNotes || undefined,
              vitalsAtAdministration: {
                bp: recordedBp,
                pulse: Number(recordedPulse) || 74,
              },
            }
          : d
      )
    );

    showToast(
      `Dose for ${selectedDose.residentName} (${selectedDose.medicationName}) marked as ${decisionOutcome.toUpperCase()} at ${timestamp}.`
    );
    setSelectedDose(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#173B70] px-4 py-3 text-sm font-medium text-white shadow-xl animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Pill className="h-3.5 w-3.5 text-[#2457C5]" />
              eMAR Clinical Administration
            </span>
            <span className="text-xs text-[#64748B]">
              Logged as: {ACTIVE_CAREGIVER.fullName} ({ACTIVE_CAREGIVER.role})
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Medication Administration Workspace
          </h1>
          <p className="text-sm text-[#4A5568]">
            Adhere to the 5 Rights of Medication Administration: Right Resident, Right Medication, Right Dose, Right Route, and Right Time.
          </p>
        </div>
      </div>

      {/* Safety Notice Callout */}
      <div className="rounded-xl border border-blue-200 bg-[#F4F8FF] p-4 text-xs text-[#173B70]">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-[#2457C5] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Strict Safety Protocol:</span>
            <p className="text-[#334155]">
              Caregivers may only administer doctor-prescribed medications for residents in their authorized caseload. Doses must be individually confirmed at bedside. Bulk administration is strictly prohibited under Karnataka Clinical Safety Regulations.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Administered Today</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-700">{administeredCount}</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">
            Confirmed with vitals
          </div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Pending Doses</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-700">{pendingCount}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">
            Awaiting scheduled round
          </div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Overdue Doses</span>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-700">{overdueCount}</div>
          <div className="text-[11px] text-rose-700 mt-0.5">
            Requires immediate round action
          </div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Recorded Exceptions</span>
            <XCircle className="h-4 w-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-purple-700">{exceptionCount}</div>
          <div className="text-[11px] text-purple-700 mt-0.5">
            Withheld / Refused with reason
          </div>
        </Card>
      </div>

      {/* Rounds Tabs & Filters */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4 space-y-3">
          {/* Time Round Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#E6ECF4] pb-3 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Rounds Today' },
              { id: 'morning', label: 'Morning Round (08:00)' },
              { id: 'noon', label: 'Noon / Afternoon (12:00 – 14:00)' },
              { id: 'evening', label: 'Evening Round (18:00)' },
              { id: 'night', label: 'Night Watch Round (21:00)' },
            ].map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  selectedSlot === slot.id
                    ? 'bg-[#173B70] text-white shadow-xs'
                    : 'bg-[#F4F8FF] text-[#173B70] hover:bg-[#E4EDFF]'
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>

          {/* Search & Status Filters */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748B]" />
              <Input
                placeholder="Search resident name, room, or medication name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <div>
              <Select
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value)}
                className="text-xs"
              >
                <option value="all">All Outcomes</option>
                <option value="pending">Pending</option>
                <option value="administered">Administered</option>
                <option value="overdue">Overdue</option>
                <option value="withheld">Withheld</option>
                <option value="refused">Refused</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doses Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="border-b border-[#E6ECF4] bg-[#F4F8FF] text-[#173B70] font-semibold">
              <tr>
                <th className="p-3.5">Resident & Room</th>
                <th className="p-3.5">Medication & Dose</th>
                <th className="p-3.5">Scheduled Slot</th>
                <th className="p-3.5">Instructions & Clinical Notes</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECF4]">
              {filteredDoses.map((dose) => {
                const isAdministered = dose.outcome === 'administered';

                return (
                  <tr
                    key={dose.id}
                    className={`hover:bg-[#F4F8FF]/30 transition-colors ${
                      dose.outcome === 'overdue' ? 'bg-rose-50/20' : ''
                    }`}
                  >
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={dose.residentName} size="sm" />
                        <div>
                          <div className="font-bold text-[#173B70]">{dose.residentName}</div>
                          <div className="text-[11px] text-[#64748B]">
                            {dose.room} · {dose.wing}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-[#173B70]">{dose.medicationName}</div>
                      <div className="text-[11px] text-[#2457C5]">
                        {dose.dosage || '1 Unit'} · {dose.route || 'Oral'}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-[#173B70]">{dose.scheduledTime}</div>
                      <div className="text-[11px] text-[#64748B]">{dose.scheduledSlot}</div>
                    </td>

                    <td className="p-3.5 max-w-xs">
                      <div className="text-[#334155] line-clamp-2">
                        {dose.clinicalNotes || dose.notes || 'Administer with fresh water.'}
                      </div>
                      {dose.administeredBy && (
                        <div className="text-[10px] text-emerald-700 mt-0.5">
                          Administered by {dose.administeredBy} ({dose.administeredTime})
                        </div>
                      )}
                      {dose.exceptionReason && (
                        <div className="text-[10px] text-rose-700 mt-0.5 font-medium">
                          Exception: {dose.exceptionReason}
                        </div>
                      )}
                    </td>

                    <td className="p-3.5">
                      <Badge
                        variant={
                          dose.outcome === 'administered'
                            ? 'success'
                            : dose.outcome === 'overdue'
                            ? 'danger'
                            : dose.outcome === 'pending'
                            ? 'warning'
                            : 'secondary'
                        }
                        className="capitalize text-[10px]"
                      >
                        {dose.outcome}
                      </Badge>
                    </td>

                    <td className="p-3.5 text-right">
                      {isAdministered ? (
                        <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Logged
                        </Badge>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          className="h-7 text-xs bg-[#173B70] text-white hover:bg-[#2457C5]"
                          onClick={() => handleOpenDoseModal(dose)}
                        >
                          Verify & Record
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredDoses.length === 0 && (
          <div className="p-8 text-center text-xs text-[#64748B]">
            No medication doses matched the current round and outcome filters.
          </div>
        )}
      </Card>

      {/* DOSE ADMINISTRATION WORKFLOW MODAL */}
      <Dialog
        open={Boolean(selectedDose)}
        onOpenChange={(open) => !open && setSelectedDose(null)}
      >
        <DialogContent className="max-w-lg">
          {selectedDose && (
            <div className="space-y-4 py-1 text-xs">
              <DialogHeader>
                <DialogTitle className="text-base text-[#173B70]">
                  Bedside Medication Administration (eMAR)
                </DialogTitle>
                <DialogDescription>
                  Perform physical identity verification and record administration outcome.
                </DialogDescription>
              </DialogHeader>

              {/* Step 1: Resident Identity Check */}
              <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={selectedDose.residentName} size="md" />
                  <div>
                    <div className="font-bold text-sm text-[#173B70]">
                      {selectedDose.residentName}
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      {selectedDose.residentId} · {selectedDose.room} ({selectedDose.wing})
                    </div>
                  </div>
                </div>
                <Badge variant="default" className="text-[10px]">
                  ID Verified at Bedside
                </Badge>
              </div>

              {/* Step 2: Medication Details */}
              <div className="rounded-lg border border-[#E6ECF4] p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Medication:</span>
                  <span className="font-bold text-[#173B70]">{selectedDose.medicationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Prescribed Dosage:</span>
                  <span className="font-semibold text-[#2457C5]">{selectedDose.dosage || '1 Unit'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Scheduled Slot:</span>
                  <span className="text-[#334155]">{selectedDose.scheduledTime} ({selectedDose.scheduledSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Route:</span>
                  <span className="text-[#334155]">{selectedDose.route || 'Oral'}</span>
                </div>
                <div className="pt-1 text-[11px] text-[#4A5568] border-t border-[#E6ECF4]">
                  <span className="font-semibold">Instructions:</span> {selectedDose.clinicalNotes || selectedDose.notes || 'Administer with full glass of water.'}
                </div>
              </div>

              {/* Step 3: Vitals at Administration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173B70]">Sitting Blood Pressure *</label>
                  <Input
                    value={recordedBp}
                    onChange={(e) => setRecordedBp(e.target.value)}
                    placeholder="e.g. 120/80"
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173B70]">Pulse (bpm) *</label>
                  <Input
                    value={recordedPulse}
                    onChange={(e) => setRecordedPulse(e.target.value)}
                    placeholder="e.g. 74"
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              {/* Step 4: Outcome Selection */}
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Administration Outcome *</label>
                <div className="grid grid-cols-2 gap-2 mt-1 sm:grid-cols-4">
                  {[
                    { id: 'administered', label: 'Administered', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                    { id: 'withheld', label: 'Withheld', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                    { id: 'refused', label: 'Refused', color: 'border-rose-500 bg-rose-50 text-rose-800' },
                    { id: 'missed', label: 'Unavailable / Missed', color: 'border-purple-500 bg-purple-50 text-purple-800' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDecisionOutcome(opt.id as DoseOutcome)}
                      className={`p-2 rounded-lg border text-xs font-semibold text-center transition-all ${
                        decisionOutcome === opt.id
                          ? opt.color + ' ring-2 ring-[#2457C5]/30'
                          : 'border-[#E6ECF4] bg-white text-[#64748B] hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mandatory Reason if not administered */}
              {decisionOutcome !== 'administered' && (
                <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 space-y-1">
                  <label className="text-xs font-bold text-amber-900">
                    Exception Clinical Reason (Mandatory) *
                  </label>
                  <Input
                    required
                    placeholder="e.g. BP below 100/60 mmHg hold parameter OR Resident requested postponement"
                    value={exceptionReason}
                    onChange={(e) => setExceptionReason(e.target.value)}
                    className="mt-1 text-xs border-amber-300"
                  />
                </div>
              )}

              {/* Step 5: Witness & Notes */}
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Witnessing Staff (Optional)</label>
                <Input
                  placeholder="e.g. Deepak Gowda, NP (required for high-alert or controlled drugs)"
                  value={witnessedBy}
                  onChange={(e) => setWitnessedBy(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Caregiver Administration Notes</label>
                <Input
                  placeholder="e.g. Resident alert, tolerated medication well with water"
                  value={caregiverNotes}
                  onChange={(e) => setCaregiverNotes(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              {/* Confirmation Footer */}
              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDose(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="bg-[#173B70] text-white hover:bg-[#2457C5]"
                  onClick={handleConfirmAdministration}
                >
                  Confirm & Commit to eMAR
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
