import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Pill,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  ShieldAlert,
  History,
  Check,
  RefreshCw,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/Table.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import {
  MOCK_EMAR_DOSES,
  MOCK_ACTIVE_PRESCRIPTIONS,
  type EmarDoseRecord,
  type ActivePrescription,
} from '../../mock/medicationsData.ts';

export function AdminMedicationOversightPage() {
  useDocumentTitle('Medication Oversight & eMAR — Administrator');

  // Sub-tabs: 'emar' | 'prescriptions'
  const [activeTab, setActiveTab] = useState<'emar' | 'prescriptions'>('emar');

  // State
  const [doses, setDoses] = useState<EmarDoseRecord[]>(MOCK_EMAR_DOSES);
  const [prescriptions] = useState<ActivePrescription[]>(MOCK_ACTIVE_PRESCRIPTIONS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals
  const [selectedDoseForReview, setSelectedDoseForReview] = useState<EmarDoseRecord | null>(null);
  const [selectedRxForHistory, setSelectedRxForHistory] = useState<ActivePrescription | null>(null);
  const [reviewActionNotes, setReviewActionNotes] = useState('Reviewed by nursing supervisor and attending physician notified.');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalDosesToday = doses.length;
  const administeredCount = doses.filter((d) => d.status === 'administered').length;
  const overdueCount = doses.filter((d) => d.status === 'overdue').length;
  const withheldCount = doses.filter((d) => d.status === 'withheld' || d.status === 'refused').length;
  const pendingCount = doses.filter((d) => d.status === 'pending').length;
  const adherenceRate = ((administeredCount / (totalDosesToday - pendingCount || 1)) * 100).toFixed(1);

  // Filtered Doses
  const filteredDoses = useMemo(() => {
    return doses.filter((dose) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dose.residentName.toLowerCase().includes(q) ||
        dose.medicationName.toLowerCase().includes(q) ||
        (dose.roomNumber || dose.room || '').toLowerCase().includes(q) ||
        (dose.administeredBy && dose.administeredBy.toLowerCase().includes(q));

      const matchesSlot = selectedSlot === 'all' || dose.slot === selectedSlot;
      const matchesStatus = selectedStatus === 'all' || dose.status === selectedStatus;

      return matchesSearch && matchesSlot && matchesStatus;
    });
  }, [doses, searchQuery, selectedSlot, selectedStatus]);

  // Filtered Prescriptions
  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((rx) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        rx.residentName.toLowerCase().includes(q) ||
        rx.medicationName.toLowerCase().includes(q) ||
        rx.prescribedBy.toLowerCase().includes(q) ||
        rx.prescriptionNumber.toLowerCase().includes(q)
      );
    });
  }, [prescriptions, searchQuery]);

  // Handle Mark Reviewed / Resolve Overdue
  const handleResolveDoseException = () => {
    if (!selectedDoseForReview) return;
    setDoses((prev) =>
      prev.map((d) =>
        d.id === selectedDoseForReview.id
          ? {
              ...d,
              status: 'administered',
              administeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              administeredBy: 'Priya Shetty RN (Supervisor Sign-off)',
              notes: reviewActionNotes,
            }
          : d
      )
    );
    showToast(`Dose exception for ${selectedDoseForReview.residentName} marked as resolved.`);
    setSelectedDoseForReview(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#173B70] px-4 py-3 text-sm font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-[#3979D8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Pill className="h-3.5 w-3.5 text-[#2457C5]" />
              Facility Clinical Pharmacy & eMAR
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Medication Oversight & Administration
          </h1>
          <p className="text-sm text-[#4A5568]">
            Real-time eMAR schedule, dose compliance tracking, high-risk dual witness audits, and prescription lifecycle records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              showToast('eMAR sync completed with automated dispensing cabinets.');
            }}
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Sync Cabinets
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Scheduled Doses</span>
              <Clock className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalDosesToday}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Today's Facility Roster</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Administered</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">{administeredCount}</div>
            <div className="mt-0.5 text-xs text-emerald-700">{adherenceRate}% Adherence</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Overdue / Missed</span>
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-600">{overdueCount}</div>
            <div className="mt-0.5 text-xs text-rose-700">Requires Escalation</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Withheld / Refused</span>
              <ShieldAlert className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">{withheldCount}</div>
            <div className="mt-0.5 text-xs text-amber-700">Clinical Hold Noted</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs col-span-2 sm:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Active Prescriptions</span>
              <FileText className="h-4 w-4 text-[#3979D8]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{prescriptions.length}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Under Medical Review</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & View Switcher */}
      <div className="flex border-b border-[#E6ECF4]">
        <button
          onClick={() => setActiveTab('emar')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'emar'
              ? 'border-[#2457C5] text-[#173B70]'
              : 'border-transparent text-[#718096] hover:text-[#173B70]'
          }`}
        >
          <Clock className="h-4 w-4" />
          Today's eMAR Administration Schedule ({doses.length})
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'prescriptions'
              ? 'border-[#2457C5] text-[#173B70]'
              : 'border-transparent text-[#718096] hover:text-[#173B70]'
          }`}
        >
          <FileText className="h-4 w-4" />
          Facility Prescription Registry ({prescriptions.length})
        </button>
      </div>

      {activeTab === 'emar' ? (
        <div className="space-y-4">
          {/* Time Slot Filter Pills & Search */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
                  <Input
                    placeholder="Search resident, medication, nurse..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedSlot('all')}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedSlot === 'all'
                        ? 'bg-[#173B70] text-white'
                        : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
                    }`}
                  >
                    All Day Slots
                  </button>
                  <button
                    onClick={() => setSelectedSlot('Morning (08:00)')}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedSlot === 'Morning (08:00)'
                        ? 'bg-[#173B70] text-white'
                        : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
                    }`}
                  >
                    Morning (08:00)
                  </button>
                  <button
                    onClick={() => setSelectedSlot('Noon (13:00)')}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedSlot === 'Noon (13:00)'
                        ? 'bg-[#173B70] text-white'
                        : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
                    }`}
                  >
                    Noon (13:00)
                  </button>
                  <button
                    onClick={() => setSelectedSlot('Evening (19:00)')}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedSlot === 'Evening (19:00)'
                        ? 'bg-[#173B70] text-white'
                        : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
                    }`}
                  >
                    Evening (19:00)
                  </button>
                  <button
                    onClick={() => setSelectedSlot('Night (21:30)')}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedSlot === 'Night (21:30)'
                        ? 'bg-[#173B70] text-white'
                        : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
                    }`}
                  >
                    Night (21:30)
                  </button>

                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="text-xs sm:w-36"
                  >
                    <option value="all">All Statuses</option>
                    <option value="administered">Administered</option>
                    <option value="overdue">Overdue</option>
                    <option value="pending">Pending</option>
                    <option value="withheld">Withheld</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* eMAR Table */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resident & Room</TableHead>
                  <TableHead>Medication & Dose</TableHead>
                  <TableHead>Route & Slot</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Administered By</TableHead>
                  <TableHead>Dual Witness / Notes</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoses.map((dose) => (
                  <TableRow key={dose.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar name={dose.residentName} size="sm" />
                        <div>
                          <Link
                            to={`/admin/residents/${dose.residentId}`}
                            className="font-semibold text-[#173B70] hover:text-[#2457C5] hover:underline"
                          >
                            {dose.residentName}
                          </Link>
                          <div className="text-xs text-[#718096]">{dose.roomNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-[#173B70]">{dose.medicationName}</div>
                      <div className="text-xs text-[#2457C5] font-medium">{dose.dosage}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-[#173B70]">{dose.slot}</div>
                      <div className="text-[11px] text-[#718096]">Route: {dose.route}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          dose.status === 'administered'
                            ? 'success'
                            : dose.status === 'overdue'
                            ? 'danger'
                            : dose.status === 'pending'
                            ? 'secondary'
                            : 'warning'
                        }
                        className="capitalize"
                      >
                        {dose.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-[#4A5568]">
                      {dose.administeredBy ? (
                        <div>
                          <span className="font-medium text-[#173B70]">{dose.administeredBy}</span>
                          <span className="block text-[11px] text-[#718096]">at {dose.administeredAt}</span>
                        </div>
                      ) : (
                        <span className="text-[#718096] italic">Awaiting administration</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-[#4A5568]">
                      {dose.witnessedBy && (
                        <div className="font-medium text-emerald-800 text-[11px]">
                          Dual Witness: {dose.witnessedBy}
                        </div>
                      )}
                      {dose.notes && <div className="text-[11px] text-amber-800">{dose.notes}</div>}
                    </TableCell>
                    <TableCell className="text-right">
                      {dose.status === 'overdue' || dose.status === 'withheld' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs text-rose-700 border-rose-300 hover:bg-rose-50"
                          onClick={() => setSelectedDoseForReview(dose)}
                        >
                          Review Exception
                        </Button>
                      ) : (
                        <span className="text-xs text-emerald-700 flex items-center justify-end gap-1">
                          <Check className="h-3.5 w-3.5" />
                          Logged
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      ) : (
        /* Prescriptions Tab */
        <div className="space-y-4">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardContent className="p-4">
              <div className="relative sm:max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
                <Input
                  placeholder="Search resident, medication, prescription ID, doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prescription ID</TableHead>
                  <TableHead>Resident</TableHead>
                  <TableHead>Medication & Strength</TableHead>
                  <TableHead>Dosage Schedule</TableHead>
                  <TableHead>Prescribing Physician</TableHead>
                  <TableHead>Review Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">History</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((rx) => (
                  <TableRow key={rx.id}>
                    <TableCell className="font-mono text-xs font-semibold text-[#173B70]">
                      {rx.prescriptionNumber}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/admin/residents/${rx.residentId}`}
                        className="font-semibold text-[#173B70] hover:text-[#2457C5] hover:underline"
                      >
                        {rx.residentName}
                      </Link>
                      <div className="text-xs text-[#718096]">{rx.roomNumber}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-[#173B70]">{rx.medicationName}</div>
                      <div className="text-xs text-[#718096]">{rx.dosage}</div>
                    </TableCell>
                    <TableCell className="text-xs text-[#4A5568]">
                      <div>{rx.frequency}</div>
                      <div className="text-[11px] text-[#718096]">Route: {rx.route}</div>
                    </TableCell>
                    <TableCell className="text-xs text-[#173B70]">
                      <div className="font-medium">{rx.prescribedBy}</div>
                      <div className="text-[11px] text-[#718096]">Started {rx.startDate}</div>
                    </TableCell>
                    <TableCell className="text-xs text-[#4A5568]">{rx.reviewDueDate}</TableCell>
                    <TableCell>
                      <Badge variant="success" className="capitalize">
                        {rx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-[#2457C5] hover:bg-[#E4EDFF]"
                        onClick={() => setSelectedRxForHistory(rx)}
                      >
                        <History className="mr-1 h-3.5 w-3.5" />
                        Versions
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {/* Exception Review Dialog */}
      <Dialog
        open={Boolean(selectedDoseForReview)}
        onOpenChange={(open) => !open && setSelectedDoseForReview(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>eMAR Dose Exception Review</DialogTitle>
            <DialogDescription>
              Resolve non-compliance or clinical hold for {selectedDoseForReview?.residentName} (
              {selectedDoseForReview?.roomNumber}).
            </DialogDescription>
          </DialogHeader>

          {selectedDoseForReview && (
            <div className="space-y-3 py-2 text-xs">
              <div className="rounded-md border border-rose-200 bg-rose-50 p-2.5 text-rose-800">
                <div className="font-semibold">
                  {selectedDoseForReview.medicationName} — {selectedDoseForReview.dosage}
                </div>
                <div className="mt-0.5">
                  Slot: {selectedDoseForReview.slot} • Status: {selectedDoseForReview.status}
                </div>
                {selectedDoseForReview.notes && (
                  <div className="mt-1 text-xs italic">Note: {selectedDoseForReview.notes}</div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Administrator / Nursing Supervisor Note</label>
                <Input
                  value={reviewActionNotes}
                  onChange={(e) => setReviewActionNotes(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDoseForReview(null)}
            >
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleResolveDoseException}>
              Sign Off & Resolve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Prescription Version History Dialog */}
      <Dialog
        open={Boolean(selectedRxForHistory)}
        onOpenChange={(open) => !open && setSelectedRxForHistory(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Prescription Version History</DialogTitle>
            <DialogDescription>
              Audit trail of clinical modifications for {selectedRxForHistory?.prescriptionNumber} (
              {selectedRxForHistory?.medicationName}).
            </DialogDescription>
          </DialogHeader>

          {selectedRxForHistory && (
            <div className="space-y-3 py-2 text-xs">
              <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3">
                <div className="font-bold text-[#173B70]">{selectedRxForHistory.residentName}</div>
                <div className="text-[#4A5568]">
                  Current: {selectedRxForHistory.medicationName} {selectedRxForHistory.dosage} (
                  {selectedRxForHistory.frequency})
                </div>
                <div className="text-[11px] text-[#718096]">
                  Prescribed by {selectedRxForHistory.prescribedBy} • Next review: {selectedRxForHistory.reviewDueDate}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#173B70] mb-2">Revision Log</h4>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {selectedRxForHistory.history.map((h, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-[#E6ECF4] bg-white p-2.5 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#173B70]">Version {h.version}</span>
                        <span className="text-[11px] text-[#718096]">{h.revisedAt}</span>
                      </div>
                      <div className="text-[#4A5568]">Dose: {h.dosage}</div>
                      <div className="text-[#718096] text-[11px]">
                        Revised by: {h.revisedBy} • Reason: {h.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedRxForHistory(null)}
            >
              Close History
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
