import { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  History,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import {
  MOCK_SHIFT_HANDOVERS,
  type ShiftHandoverReport,
  type ResidentHandoverItem,
} from '../../mock/caregiverWorkspaceData.ts';

export function CaregiverHandoverPage() {
  useDocumentTitle('Shift Handover Protocol — Caregiver');

  const [handovers, setHandovers] = useState<ShiftHandoverReport[]>(MOCK_SHIFT_HANDOVERS);
  const activeReport = handovers[0]; // Current report HND-2026-042

  // Edit / Add Resident Handover Item Modal
  const [editingItem, setEditingItem] = useState<ResidentHandoverItem | null>(null);
  const [obsSummary, setObsSummary] = useState('');
  const [medExceptions, setMedExceptions] = useState('');
  const [pendingTasks, setPendingTasks] = useState('');
  const [mobilityAlert, setMobilityAlert] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [isCritical, setIsCritical] = useState(false);

  // Acknowledge Dialog
  const [isAcknowledgeOpen, setIsAcknowledgeOpen] = useState(false);
  const [ackNotes, setAckNotes] = useState('Reviewed and acknowledged. All resident clinical summaries noted.');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Edit Item
  const handleOpenEdit = (item: ResidentHandoverItem) => {
    setEditingItem(item);
    setObsSummary(item.observationsSummary);
    setMedExceptions(item.medicationExceptions);
    setPendingTasks(item.pendingTasksSummary);
    setMobilityAlert(item.mobilityAlert);
    setFollowUp(item.followUpInstructions);
    setIsCritical(item.criticalFlag);
  };

  // Save Edit Item
  const handleSaveItem = () => {
    if (!editingItem) return;

    setHandovers((prev) =>
      prev.map((h, i) =>
        i === 0
          ? {
              ...h,
              residentEntries: h.residentEntries.map((e) =>
                e.residentId === editingItem.residentId
                  ? {
                      ...e,
                      observationsSummary: obsSummary,
                      medicationExceptions: medExceptions,
                      pendingTasksSummary: pendingTasks,
                      mobilityAlert: mobilityAlert,
                      followUpInstructions: followUp,
                      criticalFlag: isCritical,
                    }
                  : e
              ),
            }
          : h
      )
    );

    showToast(`Updated handover notes for ${editingItem.residentName}.`);
    setEditingItem(null);
  };

  // Submit Handover
  const handleSubmitHandover = () => {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setHandovers((prev) =>
      prev.map((h, i) =>
        i === 0
          ? {
              ...h,
              status: 'submitted',
              submittedAt: `Today, ${timestamp} IST`,
            }
          : h
      )
    );
    showToast(`Shift Handover ${activeReport.id} SUBMITTED to incoming lead ${activeReport.incomingLead}.`);
  };

  // Acknowledge Handover (Incoming Lead)
  const handleAcknowledge = () => {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setHandovers((prev) =>
      prev.map((h, i) =>
        i === 0
          ? {
              ...h,
              status: 'acknowledged',
              acknowledgedAt: `Today, ${timestamp} IST`,
              acknowledgementNotes: ackNotes,
            }
          : h
      )
    );
    setIsAcknowledgeOpen(false);
    showToast(`Handover ${activeReport.id} ACKNOWLEDGED by incoming nurse.`);
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
              <ClipboardCheck className="h-3.5 w-3.5 text-[#2457C5]" />
              Structured Clinical Continuity
            </span>
            <span className="text-xs text-[#64748B]">
              Primary Caseload: Garden Terrace
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Shift Handover & Clinical Continuity Protocol
          </h1>
          <p className="text-sm text-[#4A5568]">
            Prepare, review, and formally transfer resident observations, pending doses, and safety alerts between shifts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeReport.status === 'draft' ? (
            <Button
              variant="default"
              size="sm"
              className="bg-[#173B70] text-white hover:bg-[#2457C5]"
              onClick={handleSubmitHandover}
            >
              <Send className="mr-1.5 h-3.5 w-3.5" />
              Submit Handover to Evening Shift
            </Button>
          ) : activeReport.status === 'submitted' ? (
            <Button
              variant="default"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => setIsAcknowledgeOpen(true)}
            >
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
              Acknowledge as Incoming Nurse
            </Button>
          ) : (
            <Badge variant="success" className="text-xs py-1 px-3">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Handover Fully Acknowledged
            </Badge>
          )}
        </div>
      </div>

      {/* Shift Transfer Overview Header Card */}
      <Card className="border-[#E6ECF4] bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#64748B]">Report ID: {activeReport.id}</span>
              <Badge
                variant={
                  activeReport.status === 'acknowledged'
                    ? 'success'
                    : activeReport.status === 'submitted'
                    ? 'default'
                    : 'warning'
                }
                className="capitalize text-xs font-semibold"
              >
                {activeReport.status}
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-[#173B70]">
              Day Shift (07:00 – 15:00) ➔ Evening Shift (15:00 – 23:00)
            </h2>
            <p className="text-xs text-[#64748B]">
              Handover Window: <span className="font-semibold text-[#173B70]">14:45 PM – 15:00 PM IST</span> · Facility: HAVEN Anandam Care Residence, Bengaluru
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-3 text-left">
              <div className="text-[10px] uppercase font-bold text-[#64748B]">Outgoing Shift Lead</div>
              <div className="font-bold text-[#173B70] mt-0.5">{activeReport.outgoingLead}</div>
              <div className="text-[11px] text-[#2457C5]">Garden Terrace RN</div>
            </div>

            <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-3 text-left">
              <div className="text-[10px] uppercase font-bold text-[#64748B]">Incoming Shift Lead</div>
              <div className="font-bold text-[#173B70] mt-0.5">{activeReport.incomingLead}</div>
              <div className="text-[11px] text-[#2457C5]">Evening Shift LPN</div>
            </div>
          </div>
        </div>

        {activeReport.acknowledgedAt && (
          <div className="mt-4 pt-4 border-t border-[#E6ECF4] text-xs text-emerald-800 bg-emerald-50/50 p-3 rounded-lg flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Acknowledgement Record:</span> Confirmed at {activeReport.acknowledgedAt} by {activeReport.incomingLead}. Notes: &quot;{activeReport.acknowledgementNotes}&quot;
            </div>
          </div>
        )}
      </Card>

      {/* Structured Resident Handover Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B70]">
            Caseload Resident Continuity Cards ({activeReport.residentEntries.length} Residents)
          </h3>
          <span className="text-xs text-[#64748B]">
            Includes primary Garden Terrace caseload + emergency standby
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeReport.residentEntries.map((item) => (
            <Card
              key={item.residentId}
              className={`border bg-white shadow-xs p-5 space-y-3 transition-colors ${
                item.criticalFlag ? 'border-amber-300 bg-amber-50/20' : 'border-[#E6ECF4]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6ECF4] pb-3">
                <div className="flex items-center gap-3">
                  <Avatar name={item.residentName} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#173B70]">
                        {item.residentName}
                      </h4>
                      <Badge variant="outline" className="text-[10px]">
                        {item.room}
                      </Badge>
                      <span className="text-[11px] text-[#2457C5] font-medium">
                        {item.careClassification}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.criticalFlag && (
                    <Badge variant="warning" className="text-[10px]">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Critical Standby
                    </Badge>
                  )}
                  {activeReport.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleOpenEdit(item)}
                    >
                      Edit Notes
                    </Button>
                  )}
                </div>
              </div>

              {/* Grid of Handover Sections */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 text-xs">
                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/50 p-3 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Shift Observations
                  </div>
                  <p className="text-[#334155]">{item.observationsSummary}</p>
                </div>

                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/50 p-3 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Medication & Dosing Status
                  </div>
                  <p className="text-[#334155]">{item.medicationExceptions}</p>
                </div>

                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/50 p-3 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Pending Tasks for Evening
                  </div>
                  <p className="text-[#334155]">{item.pendingTasksSummary}</p>
                </div>

                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/50 p-3 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Mobility & Safety Precautions
                  </div>
                  <p className="text-[#334155]">{item.mobilityAlert}</p>
                  <div className="text-[11px] font-semibold text-[#2457C5] pt-1">
                    Follow-up: {item.followUpInstructions}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Previous Shift Reference */}
      <Card className="border-[#E6ECF4] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E6ECF4] pb-3">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-[#2457C5]" />
            <span className="text-xs font-bold text-[#173B70]">
              Previous Handover Record: Night Watch ➔ Day Shift ({handovers[1]?.id})
            </span>
          </div>
          <Badge variant="success" className="text-[10px]">
            Acknowledged at 07:05 AM
          </Badge>
        </div>
        <p className="text-xs text-[#4A5568] mt-2">
          {handovers[1]?.acknowledgementNotes} Outgoing lead: {handovers[1]?.outgoingLead}.
        </p>
      </Card>

      {/* Edit Handover Item Modal */}
      <Dialog open={Boolean(editingItem)} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="max-w-lg">
          {editingItem && (
            <div className="space-y-3.5 py-1 text-xs">
              <DialogHeader>
                <DialogTitle>Edit Handover — {editingItem.residentName}</DialogTitle>
                <DialogDescription>
                  Update continuity summary for incoming nurse ({editingItem.room})
                </DialogDescription>
              </DialogHeader>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Shift Observations *</label>
                <textarea
                  rows={2}
                  value={obsSummary}
                  onChange={(e) => setObsSummary(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Medication Round Notes *</label>
                <textarea
                  rows={2}
                  value={medExceptions}
                  onChange={(e) => setMedExceptions(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Pending Tasks for Evening Shift *</label>
                <textarea
                  rows={2}
                  value={pendingTasks}
                  onChange={(e) => setPendingTasks(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Mobility Alert & Instructions *</label>
                <Input
                  value={mobilityAlert}
                  onChange={(e) => setMobilityAlert(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Follow-Up Clinical Instructions</label>
                <Input
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="critCheck"
                  checked={isCritical}
                  onChange={(e) => setIsCritical(e.target.checked)}
                  className="rounded border-amber-400 text-[#2457C5]"
                />
                <label htmlFor="critCheck" className="text-xs font-bold text-amber-900 cursor-pointer">
                  Mark as High-Priority / Critical Continuity Watch
                </label>
              </div>

              <DialogFooter className="pt-2">
                <Button variant="outline" size="sm" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSaveItem}>
                  Save Handover Notes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Acknowledge Dialog */}
      <Dialog open={isAcknowledgeOpen} onOpenChange={setIsAcknowledgeOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Acknowledge Shift Handover</DialogTitle>
            <DialogDescription>
              Sign off on handover {activeReport.id} from Priya Shetty, RN.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <p className="text-[#4A5568]">
              By acknowledging, you confirm receipt of clinical continuity notes and agree to assume primary nursing responsibility for the Garden Terrace caseload for the Evening Shift (15:00 – 23:00).
            </p>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Incoming Lead Sign-off Note *</label>
              <textarea
                rows={2}
                value={ackNotes}
                onChange={(e) => setAckNotes(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsAcknowledgeOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleAcknowledge}
            >
              Confirm & Assume Shift Duty
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
