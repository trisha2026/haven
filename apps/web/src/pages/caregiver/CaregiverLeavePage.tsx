import { useState } from 'react';
import {
  CalendarX,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Info,
  Calendar,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { ACTIVE_CAREGIVER } from '../../mock/caregiverWorkspaceData.ts';

interface PersonalLeaveApplication {
  id: string; // e.g. "LV-2026-081"
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  administratorNotes?: string;
  decidedBy?: string;
}

export function CaregiverLeavePage() {
  useDocumentTitle('Leave Management & Applications — Caregiver');

  // Leave requests state for Priya Shetty (CG-0142)
  const [requests, setRequests] = useState<PersonalLeaveApplication[]>([
    {
      id: 'LV-2026-081',
      leaveType: 'Earned Leave',
      startDate: 'Nov 14, 2026',
      endDate: 'Nov 16, 2026',
      days: 3,
      reason: 'Attending family wedding ceremony in Mangaluru.',
      submittedAt: 'Nov 08, 2026',
      status: 'pending',
      administratorNotes: 'Awaiting shift coverage assignment for Garden Terrace.',
    },
    {
      id: 'LV-2026-054',
      leaveType: 'Casual Leave',
      startDate: 'Oct 02, 2026',
      endDate: 'Oct 02, 2026',
      days: 1,
      reason: 'Gandhi Jayanti family festival observance.',
      submittedAt: 'Sep 25, 2026',
      status: 'approved',
      administratorNotes: 'Approved. Peer cover assigned to Rahul Patil LPN.',
      decidedBy: 'Devika Ramanathan (Administrator)',
    },
    {
      id: 'LV-2026-039',
      leaveType: 'Training / CME',
      startDate: 'Sep 10, 2026',
      endDate: 'Sep 11, 2026',
      days: 2,
      reason: 'State Geriatric Emergency Nursing Certification Workshop.',
      submittedAt: 'Aug 28, 2026',
      status: 'approved',
      administratorNotes: 'Approved with sponsorship. CME credits recognized.',
      decidedBy: 'Devika Ramanathan (Administrator)',
    },
  ]);

  // Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('Earned Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [coverageNotes, setCoverageNotes] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPIs
  const totalBalance = ACTIVE_CAREGIVER.leaveBalanceDays;
  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const approvedCount = requests.filter((r) => r.status === 'approved').length;
  const rejectedCount = requests.filter((r) => r.status === 'rejected').length;

  // Handle Submit
  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate || !reason.trim()) {
      showToast('Please fill in all mandatory application fields.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      showToast('Start date cannot be after end date.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (startDate < todayStr) {
      showToast('Cannot request leave for dates in the past.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newApp: PersonalLeaveApplication = {
      id: `LV-2026-${Math.floor(100 + Math.random() * 900)}`,
      leaveType,
      startDate,
      endDate,
      days: diffDays,
      reason,
      submittedAt: 'Today, Nov 10, 2026',
      status: 'pending',
      administratorNotes: 'Application submitted. Under review by Devika Ramanathan.',
    };

    setRequests((prev) => [newApp, ...prev]);
    setIsApplyModalOpen(false);
    setReason('');
    setStartDate('');
    setEndDate('');
    setCoverageNotes('');
    showToast(`Leave application ${newApp.id} submitted successfully to Facility Administration.`);
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
              <CalendarX className="h-3.5 w-3.5 text-[#2457C5]" />
              Workforce Entitlements
            </span>
            <span className="text-xs text-[#64748B]">
              Caregiver: {ACTIVE_CAREGIVER.fullName}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Leave Requests & Entitlement Balance
          </h1>
          <p className="text-sm text-[#4A5568]">
            Apply for planned leaves, view your annual entitlement balance, and track administrator approval decisions.
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          className="bg-[#173B70] text-white hover:bg-[#2457C5]"
          onClick={() => setIsApplyModalOpen(true)}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Apply for Leave
        </Button>
      </div>

      {/* Policy Notice Banner */}
      <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-4 text-xs text-[#173B70]">
        <div className="flex items-start gap-2.5">
          <Info className="h-4 w-4 text-[#2457C5] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Karnataka Healthcare Establishment Leave Policy:</span> Planned leaves should be submitted at least 5 business days in advance to allow administration to schedule qualified nursing cover across Garden Terrace. Caregivers may not approve their own leave.
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Available Leave Balance</span>
            <Calendar className="h-4 w-4 text-[#2457C5]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalBalance} Days</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Annual paid balance remaining</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Pending Approvals</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-700">{pendingCount}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">With Administrator</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Approved History</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-700">{approvedCount}</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Cover confirmed</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Declined Requests</span>
            <XCircle className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-700">{rejectedCount}</div>
          <div className="text-[11px] text-rose-700 mt-0.5">Staffing ratio conflicts</div>
        </Card>
      </div>

      {/* Applications Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
        <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
          <CardTitle className="text-base font-bold text-[#173B70]">
            My Leave Applications Ledger
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="border-b border-[#E6ECF4] bg-[#F4F8FF] text-[#173B70] font-semibold">
              <tr>
                <th className="p-3.5">Application ID</th>
                <th className="p-3.5">Leave Type</th>
                <th className="p-3.5">Requested Dates</th>
                <th className="p-3.5">Duration</th>
                <th className="p-3.5">Reason & Purpose</th>
                <th className="p-3.5">Administrator Review</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECF4]">
              {requests.map((app) => (
                <tr key={app.id} className="hover:bg-[#F4F8FF]/30 transition-colors">
                  <td className="p-3.5 font-bold text-[#173B70]">{app.id}</td>
                  <td className="p-3.5 font-semibold text-[#2457C5]">{app.leaveType}</td>
                  <td className="p-3.5 text-[#334155]">
                    {app.startDate} to {app.endDate}
                  </td>
                  <td className="p-3.5 font-medium text-[#173B70]">{app.days} Days</td>
                  <td className="p-3.5 max-w-xs text-[#4A5568]">
                    {app.reason}
                  </td>
                  <td className="p-3.5 max-w-xs text-[11px] text-[#64748B]">
                    {app.administratorNotes || 'Under formal review.'}
                  </td>
                  <td className="p-3.5 text-right">
                    <Badge
                      variant={
                        app.status === 'approved'
                          ? 'success'
                          : app.status === 'rejected'
                          ? 'danger'
                          : 'warning'
                      }
                      className="capitalize text-xs"
                    >
                      {app.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Apply Leave Modal */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleApplyLeave}>
            <DialogHeader>
              <DialogTitle>Apply for Staff Leave</DialogTitle>
              <DialogDescription>
                Submit a formal leave request for administrator evaluation and peer cover scheduling.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-2 text-xs">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Leave Type *</label>
                <Select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="Earned Leave">Earned Leave (Annual Entitlement)</option>
                  <option value="Casual Leave">Casual Leave (Short Personal)</option>
                  <option value="Sick / Medical Leave">Sick / Medical Leave</option>
                  <option value="Bereavement Leave">Bereavement Leave</option>
                  <option value="Training / CME">Training / Continuing Medical Education</option>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173B70]">Start Date *</label>
                  <Input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173B70]">End Date *</label>
                  <Input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Reason for Application *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State the purpose of your leave request..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Proposed Shift Cover (Optional)</label>
                <Input
                  placeholder="e.g. Discussed with Rahul Patil LPN for tentative swap"
                  value={coverageNotes}
                  onChange={(e) => setCoverageNotes(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsApplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm">
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
