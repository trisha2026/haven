import { useState, useMemo } from 'react';
import {
  CalendarX,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  FileText,
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
import { MOCK_LEAVE_REQUESTS, type LeaveRequest } from '../../mock/workforceData.ts';

export function AdminLeaveManagementPage() {
  useDocumentTitle('Staff Leave Management — Administrator');

  // Leave requests state
  const [requests, setRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Decision Modal state
  const [selectedRequestForDecision, setSelectedRequestForDecision] = useState<LeaveRequest | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('Approved following confirmation of adequate peer cover across the assigned wing.');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalRequests = requests.length;
  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const approvedCount = requests.filter((r) => r.status === 'approved').length;
  const rejectedCount = requests.filter((r) => r.status === 'rejected').length;

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (req.staffName || req.employeeName || '').toLowerCase().includes(q) ||
        (req.requestId || req.id).toLowerCase().includes(q) ||
        req.role.toLowerCase().includes(q) ||
        req.reason.toLowerCase().includes(q);

      const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
      const matchesType = selectedType === 'all' || req.leaveType === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [requests, searchQuery, selectedStatus, selectedType]);

  // Handle Approve / Reject
  const handleDecideLeave = (status: 'approved' | 'rejected') => {
    if (!selectedRequestForDecision) return;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequestForDecision.id
          ? {
              ...r,
              status,
              decidedBy: 'Rajesh Varma (Administrator)',
              decidedAt: new Date().toISOString().split('T')[0],
              decisionNotes,
            }
          : r
      )
    );
    showToast(`Leave request ${selectedRequestForDecision.requestId} for ${selectedRequestForDecision.staffName} marked as ${status}.`);
    setSelectedRequestForDecision(null);
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
              <CalendarX className="h-3.5 w-3.5 text-[#2457C5]" />
              Workforce Leave & Shift Coverage
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Staff Leave Requests & Cover Planning
          </h1>
          <p className="text-sm text-[#4A5568]">
            Review leave applications, assess minimum staffing quota impacts, and confirm designated shift covers.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Pending Decisions</span>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">{pendingCount}</div>
            <div className="mt-0.5 text-xs text-amber-700">Requires Administrator Sign-off</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Approved Leave</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">{approvedCount}</div>
            <div className="mt-0.5 text-xs text-emerald-700">Cover Scheduled</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Declined Requests</span>
              <XCircle className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-700">{rejectedCount}</div>
            <div className="mt-0.5 text-xs text-rose-700">Staffing Quota Conflict</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Total Applications</span>
              <FileText className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalRequests}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Current Month Log</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
              <Input
                placeholder="Search staff, request ID, reason..."
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
              <option value="all">All Statuses</option>
              <option value="pending">Pending Approval ({pendingCount})</option>
              <option value="approved">Approved ({approvedCount})</option>
              <option value="rejected">Rejected ({rejectedCount})</option>
            </Select>

            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Leave Types</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Casual / Sick Leave">Casual / Sick Leave</option>
              <option value="Medical Emergency">Medical Emergency</option>
              <option value="Compensatory Off">Compensatory Off</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID & Staff</TableHead>
              <TableHead>Role & Leave Type</TableHead>
              <TableHead>Dates & Duration</TableHead>
              <TableHead>Reason & Justification</TableHead>
              <TableHead>Shift Coverage Assessment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={req.staffName} size="sm" />
                    <div>
                      <div className="font-semibold text-[#173B70]">{req.staffName}</div>
                      <div className="font-mono text-xs text-[#718096]">{req.requestId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs font-medium text-[#173B70]">{req.role}</div>
                  <div className="text-[11px] text-[#2457C5]">{req.leaveType}</div>
                </TableCell>
                <TableCell>
                  <div className="text-xs font-semibold text-[#173B70]">
                    {req.startDate} to {req.endDate}
                  </div>
                  <div className="text-[11px] text-[#718096]">{req.days} Days Total</div>
                </TableCell>
                <TableCell className="text-xs text-[#4A5568] max-w-xs truncate">
                  {req.reason}
                </TableCell>
                <TableCell>
                  {(() => {
                    const isCovered =
                      typeof req.coverageAssessment === 'object'
                        ? req.coverageAssessment.isCoverArranged
                        : req.coverageAssessment === 'coverage_adequate';
                    const coverStaff =
                      typeof req.coverageAssessment === 'object'
                        ? req.coverageAssessment.coverStaffName
                        : 'Assigned Cover';
                    const affected =
                      typeof req.coverageAssessment === 'object'
                        ? req.coverageAssessment.affectedWing
                        : req.wing;

                    return (
                      <div className="text-xs">
                        {isCovered ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Cover: {coverStaff}
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1 font-medium">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            Shortage Warning: {affected}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      req.status === 'approved'
                        ? 'success'
                        : req.status === 'rejected'
                        ? 'danger'
                        : 'warning'
                    }
                    className="capitalize"
                  >
                    {req.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {req.status === 'pending' ? (
                    <Button
                      variant="default"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSelectedRequestForDecision(req)}
                    >
                      Review & Decide
                    </Button>
                  ) : (
                    <span className="text-xs text-[#718096]">
                      {req.decidedBy ? 'Decided' : 'Processed'}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Decision Dialog */}
      <Dialog
        open={Boolean(selectedRequestForDecision)}
        onOpenChange={(open) => !open && setSelectedRequestForDecision(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review Leave Request — {selectedRequestForDecision?.requestId}</DialogTitle>
            <DialogDescription>
              {selectedRequestForDecision?.staffName} ({selectedRequestForDecision?.role})
            </DialogDescription>
          </DialogHeader>

          {selectedRequestForDecision && (
            <div className="space-y-3.5 py-2 text-xs">
              <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#718096]">Leave Type:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedRequestForDecision.leaveType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Requested Window:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedRequestForDecision.startDate} to {selectedRequestForDecision.endDate} (
                    {selectedRequestForDecision.days} Days)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Reason:</span>
                  <span className="text-[#173B70] text-right max-w-[200px]">
                    {selectedRequestForDecision.reason}
                  </span>
                </div>
              </div>

              {/* Coverage Assessment Callout */}
              {(() => {
                const isCovered =
                  typeof selectedRequestForDecision.coverageAssessment === 'object'
                    ? selectedRequestForDecision.coverageAssessment.isCoverArranged
                    : selectedRequestForDecision.coverageAssessment === 'coverage_adequate';
                const coverStaff =
                  typeof selectedRequestForDecision.coverageAssessment === 'object'
                    ? selectedRequestForDecision.coverageAssessment.coverStaffName
                    : 'Assigned Cover';
                const affected =
                  typeof selectedRequestForDecision.coverageAssessment === 'object'
                    ? selectedRequestForDecision.coverageAssessment.affectedWing
                    : selectedRequestForDecision.wing;

                return (
                  <div
                    className={`rounded-md p-3 border ${
                      isCovered
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-rose-200 bg-rose-50 text-rose-800'
                    }`}
                  >
                    <div className="font-semibold flex items-center gap-1.5">
                      {isCovered ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                      )}
                      {isCovered ? 'Peer Cover Confirmed' : 'Staffing Coverage Gap Detected'}
                    </div>
                    <p className="mt-1">
                      {isCovered
                        ? `Staff member ${coverStaff} will cover scheduled duties.`
                        : `Approving this leave will bring ${affected} below mandatory Karnataka clinical staffing minimums.`}
                    </p>
                  </div>
                );
              })()}

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Administrator Notes</label>
                <Input
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-rose-700 border-rose-300 hover:bg-rose-50"
              onClick={() => handleDecideLeave('rejected')}
            >
              Decline Request
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleDecideLeave('approved')}
            >
              Approve Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
