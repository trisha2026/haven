import { useState, useMemo } from 'react';
import {
  Siren,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Plus,
  Users,
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
  MOCK_EMERGENCY_ASSIGNMENTS,
  type EmergencyAssignment,
} from '../../mock/workforceData.ts';
import { MOCK_CAREGIVERS } from '../../mock/caregiversData.ts';

export function AdminEmergencyAssignmentsPage() {
  useDocumentTitle('Emergency Staff Assignments — Administrator');

  // Assignments state
  const [assignments, setAssignments] = useState<EmergencyAssignment[]>(MOCK_EMERGENCY_ASSIGNMENTS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [targetWing, setTargetWing] = useState('Lotus Wing (Floor 3)');
  const [dispatchReason, setDispatchReason] = useState('Unplanned night shift caregiver sick leave cover');
  const [durationHours, setDurationHours] = useState('4');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const activeAssignmentsCount = assignments.filter((a) => a.status === 'active').length;

  // Filtered assignments
  const filteredAssignments = useMemo(() => {
    return assignments.filter((as) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (as.staffName || as.employeeName || '').toLowerCase().includes(q) ||
        as.targetWing.toLowerCase().includes(q) ||
        as.reason.toLowerCase().includes(q) ||
        (as.assignmentId || as.id).toLowerCase().includes(q);

      const matchesStatus = selectedStatus === 'all' || as.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchQuery, selectedStatus]);

  // Handle Dispatch
  const handleConfirmDispatch = () => {
    if (!selectedStaffId) return;
    const staff = MOCK_CAREGIVERS.find((c) => c.id === selectedStaffId);
    if (!staff) return;

    const newAssignment: EmergencyAssignment = {
      id: `emg-${Date.now()}`,
      assignmentId: `EMG-2026-${Math.floor(10 + Math.random() * 90)}`,
      staffId: staff.id,
      staffName: staff.name,
      staffRole: staff.role,
      originWing: staff.assignedWing,
      targetWing,
      reason: dispatchReason,
      dispatchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expiresAt: `${Number(durationHours)} Hours`,
      dispatchedBy: 'Rajesh Varma (Administrator)',
      status: 'active',
      scopeNotes: 'Provide immediate clinical supervision, vital signs monitoring, and assist with eMAR bedtime medication round.',
    };

    setAssignments([newAssignment, ...assignments]);
    showToast(`Emergency cover dispatched: ${staff.name} deployed to ${targetWing}.`);
    setIsDispatchModalOpen(false);
    setSelectedStaffId('');
  };

  // Handle Recall
  const handleRecallAssignment = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'recalled' } : a))
    );
    showToast('Emergency assignment recalled and staff returned to normal station.');
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

      {/* Active Shortage Warning Banner */}
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2 text-amber-700">
              <Siren className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Active Staffing Alert: Lotus Wing (Floor 3) Shortage
              </h3>
              <p className="mt-0.5 text-xs text-amber-800">
                Night shift requires 1 additional Registered Nurse or LPN to satisfy Karnataka Elderly Care regulations (1:6 high dependency ratio).
              </p>
            </div>
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-amber-700 hover:bg-amber-800 text-white"
            onClick={() => setIsDispatchModalOpen(true)}
          >
            <Siren className="mr-1.5 h-3.5 w-3.5" />
            Dispatch Relief Cover
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Siren className="h-3.5 w-3.5 text-[#2457C5]" />
              Rapid Workforce Deployment
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Emergency Staff Assignments
          </h1>
          <p className="text-sm text-[#4A5568]">
            Immediate cross-wing reassignment of caregivers and nurses during surges, medical emergencies, and unexpected absences.
          </p>
        </div>

        <Button variant="default" size="sm" onClick={() => setIsDispatchModalOpen(true)}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Deploy Emergency Assignment
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Active Dispatches</span>
              <Siren className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{activeAssignmentsCount}</div>
            <div className="mt-0.5 text-xs text-emerald-700">Currently Stationed</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Average Dispatch SLA</span>
              <Clock className="h-4 w-4 text-[#3979D8]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">8.4 mins</div>
            <div className="mt-0.5 text-xs text-[#718096]">Rapid Response Time</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Standby Float Pool</span>
              <Users className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">3 Nurses</div>
            <div className="mt-0.5 text-xs text-emerald-700">Ready for Re-allocation</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Compliance Guard</span>
              <ShieldCheck className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">100%</div>
            <div className="mt-0.5 text-xs text-[#718096]">Auto-logged in Audit Trail</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
              <Input
                placeholder="Search staff, target wing, dispatch reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Assignment Statuses</option>
              <option value="active">Active ({activeAssignmentsCount})</option>
              <option value="expired">Expired</option>
              <option value="recalled">Recalled</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assignment ID</TableHead>
              <TableHead>Staff Member</TableHead>
              <TableHead>Station Transfer</TableHead>
              <TableHead>Emergency Reason</TableHead>
              <TableHead>Timing & Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((as) => (
              <TableRow key={as.id}>
                <TableCell className="font-mono text-xs font-semibold text-[#173B70]">
                  {as.assignmentId}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar name={as.staffName} size="sm" />
                    <div>
                      <div className="font-semibold text-[#173B70]">{as.staffName}</div>
                      <div className="text-xs text-[#718096]">{as.staffRole}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  <div className="text-[#718096]">From: {as.originWing}</div>
                  <div className="font-semibold text-[#173B70]">To: {as.targetWing}</div>
                </TableCell>
                <TableCell className="text-xs text-[#4A5568] max-w-xs truncate">
                  {as.reason}
                </TableCell>
                <TableCell className="text-xs">
                  <div className="text-[#173B70]">Dispatched: {as.dispatchedAt}</div>
                  <div className="text-[11px] text-[#718096]">Valid: {as.expiresAt}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      as.status === 'active'
                        ? 'default'
                        : as.status === 'recalled'
                        ? 'secondary'
                        : 'neutral'
                    }
                    className="capitalize"
                  >
                    {as.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {as.status === 'active' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs text-rose-700 border-rose-300"
                      onClick={() => handleRecallAssignment(as.id)}
                    >
                      Recall to Base
                    </Button>
                  ) : (
                    <span className="text-xs text-[#718096]">Completed</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Dispatch Modal */}
      <Dialog open={isDispatchModalOpen} onOpenChange={setIsDispatchModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Deploy Emergency Staff Relief</DialogTitle>
            <DialogDescription>
              Assign available nurse to cover acute care surge or unplanned shift absence.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Select Staff to Reassign</label>
              <Select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="">Select available nurse...</option>
                {MOCK_CAREGIVERS.map((cg) => (
                  <option key={cg.id} value={cg.id}>
                    {cg.name} ({cg.role}) — Base: {cg.assignedWing}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Target Wing / Floor</label>
              <Select
                value={targetWing}
                onChange={(e) => setTargetWing(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="Lotus Wing (Floor 3)">Lotus Wing (Floor 3 - High Dependency)</option>
                <option value="Magnolia Wing (Floor 1)">Magnolia Wing (Floor 1 - Memory Care)</option>
                <option value="Jasmine Wing (Floor 2)">Jasmine Wing (Floor 2 - Skilled Nursing)</option>
                <option value="Orchid Wing (Floor 4)">Orchid Wing (Floor 4 - Wellness Suites)</option>
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Clinical Reason for Dispatch</label>
              <Input
                value={dispatchReason}
                onChange={(e) => setDispatchReason(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Assignment Duration</label>
              <Select
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="2">2 Hours (Immediate Relief)</option>
                <option value="4">4 Hours (Half Shift)</option>
                <option value="8">8 Hours (Full Shift Cover)</option>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsDispatchModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={!selectedStaffId}
              onClick={handleConfirmDispatch}
            >
              Authorize Emergency Dispatch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
