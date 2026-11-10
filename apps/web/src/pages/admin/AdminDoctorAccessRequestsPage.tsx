import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Search,
  FileCheck,
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
  MOCK_ACCESS_REQUESTS,
  type DoctorAccessRequest,
} from '../../mock/accessRequestsData.ts';

export function AdminDoctorAccessRequestsPage() {
  useDocumentTitle('Doctor Access Requests — Administrator');

  // Requests state
  const [requests, setRequests] = useState<DoctorAccessRequest[]>(MOCK_ACCESS_REQUESTS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Decision Modal state
  const [selectedRequestForDecision, setSelectedRequestForDecision] = useState<DoctorAccessRequest | null>(null);
  const [decisionAction, setDecisionAction] = useState<'approve' | 'reject'>('approve');
  const [grantDuration, setGrantDuration] = useState<'24_hours' | '48_hours' | '7_days' | '30_days'>('7_days');
  const [decisionNotes, setDecisionNotes] = useState('Approved following clinical consultation order verification.');
  const [rejectionReason, setRejectionReason] = useState('Primary attending physician referral missing. Please obtain referral from Dr. Anita Mehta.');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalRequests = requests.length;
  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const activeGrantsCount = requests.filter((r) => r.status === 'approved').length;
  const breakGlassCount = requests.filter((r) => r.isEmergencyBreakGlass).length;

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        req.requestId.toLowerCase().includes(q) ||
        req.doctorName.toLowerCase().includes(q) ||
        req.residentName.toLowerCase().includes(q) ||
        req.doctorSpecialty.toLowerCase().includes(q) ||
        req.reason.toLowerCase().includes(q);

      const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, selectedStatus]);

  // Handle Approve / Reject
  const handleConfirmDecision = () => {
    if (!selectedRequestForDecision) return;
    const isApprove = decisionAction === 'approve';

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequestForDecision.id
          ? {
              ...r,
              status: isApprove ? 'approved' : 'rejected',
              reviewedBy: 'Rajesh Varma (Administrator)',
              reviewedAt: new Date().toISOString(),
              notes: isApprove ? decisionNotes : undefined,
              rejectionReason: !isApprove ? rejectionReason : undefined,
              expiresAt: isApprove
                ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                : undefined,
            }
          : r
      )
    );

    showToast(
      `Access request ${selectedRequestForDecision.requestId} for ${selectedRequestForDecision.doctorName} was ${
        isApprove ? 'Approved' : 'Declined'
      }.`
    );
    setSelectedRequestForDecision(null);
  };

  // Handle Revoke Grant
  const handleRevokeGrant = (req: DoctorAccessRequest) => {
    if (window.confirm(`Revoke resident EHR access for ${req.doctorName} immediately?`)) {
      setRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, status: 'revoked' } : r))
      );
      showToast(`EHR access token revoked for ${req.doctorName}.`);
    }
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
              <KeyRound className="h-3.5 w-3.5 text-[#2457C5]" />
              Data Governance & Record Access
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Doctor Record Access Requests
          </h1>
          <p className="text-sm text-[#4A5568]">
            Evaluate visiting physician EHR chart privileges, approve time-bound access grants, and audit emergency break-glass overrides.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Pending Reviews</span>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">{pendingCount}</div>
            <div className="mt-0.5 text-xs text-amber-700">Awaiting Decision</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Active Grants</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">{activeGrantsCount}</div>
            <div className="mt-0.5 text-xs text-emerald-700">Time-Bound Tokens</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Break-Glass Logs</span>
              <ShieldAlert className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-700">{breakGlassCount}</div>
            <div className="mt-0.5 text-xs text-rose-700">Emergency Teleconsult Overrides</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Total Requests</span>
              <FileCheck className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalRequests}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Compliance Trail Maintained</div>
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
                placeholder="Search physician, request ID, resident, hospital..."
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
              <option value="all">All Request Statuses</option>
              <option value="pending">Pending Approval ({pendingCount})</option>
              <option value="approved">Active Approved Grants ({activeGrantsCount})</option>
              <option value="rejected">Rejected Requests</option>
              <option value="expired">Expired Tokens</option>
              <option value="revoked">Revoked Tokens</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID & Doctor</TableHead>
              <TableHead>Hospital & Specialty</TableHead>
              <TableHead>Target Resident</TableHead>
              <TableHead>Access Level & Duration</TableHead>
              <TableHead>Clinical Justification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar name={req.doctorName} size="sm" />
                    <div>
                      <div className="font-semibold text-[#173B70]">{req.doctorName}</div>
                      <div className="font-mono text-xs text-[#718096]">{req.requestId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs font-medium text-[#173B70]">{req.doctorSpecialty}</div>
                  <div className="text-[11px] text-[#718096]">
                    {req.doctorHospital} ({req.doctorKmc})
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/admin/residents/${req.residentId}`}
                    className="font-semibold text-xs text-[#173B70] hover:text-[#2457C5] hover:underline"
                  >
                    {req.residentName}
                  </Link>
                  <div className="text-[11px] text-[#718096]">{req.residentRoom}</div>
                </TableCell>
                <TableCell className="text-xs">
                  <div className="font-semibold capitalize text-[#173B70]">
                    {req.requestedLevel.replace('_', ' ')}
                  </div>
                  <div className="text-[11px] text-[#718096]">
                    Duration: {req.requestedDuration.replace('_', ' ')}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-[#4A5568] max-w-xs truncate">
                  {req.reason}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant={
                        req.status === 'approved'
                          ? 'success'
                          : req.status === 'rejected' || req.status === 'revoked'
                          ? 'danger'
                          : req.status === 'expired'
                          ? 'secondary'
                          : 'warning'
                      }
                      className="capitalize"
                    >
                      {req.status}
                    </Badge>
                    {req.isEmergencyBreakGlass && (
                      <Badge variant="danger" className="text-[10px]">
                        Break-Glass
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {req.status === 'pending' ? (
                    <Button
                      variant="default"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => {
                        setSelectedRequestForDecision(req);
                        setDecisionAction('approve');
                      }}
                    >
                      Review & Decide
                    </Button>
                  ) : req.status === 'approved' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs text-rose-700 border-rose-300"
                      onClick={() => handleRevokeGrant(req)}
                    >
                      Revoke Grant
                    </Button>
                  ) : (
                    <span className="text-xs text-[#718096]">Closed</span>
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
            <DialogTitle>Evaluate Doctor Access Request</DialogTitle>
            <DialogDescription>
              {selectedRequestForDecision?.requestId} • {selectedRequestForDecision?.doctorName} (
              {selectedRequestForDecision?.doctorHospital})
            </DialogDescription>
          </DialogHeader>

          {selectedRequestForDecision && (
            <div className="space-y-3.5 py-2 text-xs">
              <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#718096]">Target Resident:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedRequestForDecision.residentName} ({selectedRequestForDecision.residentRoom})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Clinical Justification:</span>
                  <span className="text-[#173B70] text-right max-w-[200px]">
                    {selectedRequestForDecision.clinicalJustification}
                  </span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#173B70]">Decision Action</label>
                <div className="mt-1 flex gap-2">
                  <Button
                    type="button"
                    variant={decisionAction === 'approve' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setDecisionAction('approve')}
                  >
                    Grant Access Token
                  </Button>
                  <Button
                    type="button"
                    variant={decisionAction === 'reject' ? 'default' : 'outline'}
                    size="sm"
                    className={`flex-1 text-xs ${
                      decisionAction === 'reject' ? 'bg-rose-700 text-white' : ''
                    }`}
                    onClick={() => setDecisionAction('reject')}
                  >
                    Decline Request
                  </Button>
                </div>
              </div>

              {decisionAction === 'approve' ? (
                <>
                  <div>
                    <label className="font-semibold text-[#173B70]">Authorized Token Duration</label>
                    <Select
                      value={grantDuration}
                      onChange={(e) =>
                        setGrantDuration(
                          e.target.value as '24_hours' | '48_hours' | '7_days' | '30_days'
                        )
                      }
                      className="mt-1 text-xs"
                    >
                      <option value="24_hours">24 Hours (Urgent Consult)</option>
                      <option value="48_hours">48 Hours (Standard Review)</option>
                      <option value="7_days">7 Days (Treatment Planning)</option>
                      <option value="30_days">30 Days (Ongoing Specialist Care)</option>
                    </Select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#173B70]">Approval Notes</label>
                    <Input
                      value={decisionNotes}
                      onChange={(e) => setDecisionNotes(e.target.value)}
                      className="mt-1 text-xs"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="font-semibold text-[#173B70]">Reason for Clinical Denial</label>
                  <Input
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedRequestForDecision(null)}
            >
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleConfirmDecision}>
              Confirm Decision
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
