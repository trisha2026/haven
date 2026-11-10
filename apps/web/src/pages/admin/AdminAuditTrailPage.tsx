import { useState, useMemo } from 'react';
import {
  FileClock,
  Search,
  ShieldAlert,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/Table.tsx';
import {
  MOCK_AUDIT_TRAIL,
  type AuditTrailEvent,
} from '../../mock/auditTrailData.ts';

export function AdminAuditTrailPage() {
  useDocumentTitle('Compliance Audit Trail — Administrator');

  // Audit state
  const [events] = useState<AuditTrailEvent[]>(MOCK_AUDIT_TRAIL);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Detail Modal
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<AuditTrailEvent | null>(null);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ev.auditId.toLowerCase().includes(q) ||
        ev.actorName.toLowerCase().includes(q) ||
        ev.targetEntity.toLowerCase().includes(q) ||
        ev.summary.toLowerCase().includes(q) ||
        ev.ipAddress.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || ev.actionCategory === selectedCategory;
      const matchesRole = selectedRole === 'all' || ev.actorRole === selectedRole;
      const matchesStatus = selectedStatus === 'all' || ev.status === selectedStatus;

      return matchesSearch && matchesCat && matchesRole && matchesStatus;
    });
  }, [events, searchQuery, selectedCategory, selectedRole, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Lock className="h-3.5 w-3.5 text-[#2457C5]" />
              Immutable Forensic Security Ledger
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            System Audit Trail & Access Logs
          </h1>
          <p className="text-sm text-[#4A5568]">
            Cryptographically sealed activity record of clinical modifications, eMAR sign-offs, bed transfers, and access grants.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Logged Events</span>
              <FileClock className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{events.length}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Active 24-Hour Buffer</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Flagged / Clinical Hold</span>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">2</div>
            <div className="mt-0.5 text-xs text-amber-700">Requires Dual Sign-off</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Security Blocks</span>
              <ShieldAlert className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-700">1</div>
            <div className="mt-0.5 text-xs text-rose-700">Unauthorized EHR Access Blocked</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Integrity Verification</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">100%</div>
            <div className="mt-0.5 text-xs text-emerald-700">SHA-256 Validated</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
              <Input
                placeholder="Search audit ID, actor, entity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Action Categories</option>
              <option value="Medication Administration">Medication Administration</option>
              <option value="Bed Allocation">Bed Allocation</option>
              <option value="Doctor Access Grant">Doctor Access Grant</option>
              <option value="Emergency Dispatch">Emergency Dispatch</option>
              <option value="Prescription Update">Prescription Update</option>
              <option value="Inventory Receipt">Inventory Receipt</option>
              <option value="Leave Approval">Leave Approval</option>
              <option value="Incident Escalation">Incident Escalation</option>
              <option value="System Settings">System Settings</option>
            </Select>

            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Actor Roles</option>
              <option value="Administrator">Administrator</option>
              <option value="Doctor">Doctor</option>
              <option value="Caregiver">Caregiver</option>
              <option value="System">System</option>
            </Select>

            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Flagged">Flagged</option>
              <option value="Denied">Denied</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Audit ID & Time</TableHead>
              <TableHead>Actor & Role</TableHead>
              <TableHead>Action Category</TableHead>
              <TableHead>Target Entity</TableHead>
              <TableHead>Event Summary</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((ev) => (
              <TableRow key={ev.id}>
                <TableCell>
                  <div className="font-mono text-xs font-semibold text-[#173B70]">{ev.auditId}</div>
                  <div className="text-[11px] text-[#718096]">
                    {new Date(ev.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-xs text-[#173B70]">{ev.actorName}</div>
                  <div className="text-[11px] text-[#2457C5]">{ev.actorRole}</div>
                </TableCell>
                <TableCell className="text-xs font-medium text-[#173B70]">
                  {ev.actionCategory}
                </TableCell>
                <TableCell className="text-xs text-[#4A5568]">{ev.targetEntity}</TableCell>
                <TableCell className="text-xs text-[#4A5568] max-w-xs truncate">
                  {ev.summary}
                </TableCell>
                <TableCell className="font-mono text-[11px] text-[#718096]">{ev.ipAddress}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ev.status === 'Success'
                        ? 'success'
                        : ev.status === 'Denied'
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {ev.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-[#2457C5] hover:bg-[#E4EDFF]"
                    onClick={() => setSelectedEventForDetail(ev)}
                  >
                    <Eye className="mr-1 h-3.5 w-3.5" />
                    Inspect
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Audit Detail Dialog */}
      <Dialog
        open={Boolean(selectedEventForDetail)}
        onOpenChange={(open) => !open && setSelectedEventForDetail(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Audit Payload Inspector — {selectedEventForDetail?.auditId}</DialogTitle>
            <DialogDescription>
              {selectedEventForDetail?.actionCategory} recorded at{' '}
              {selectedEventForDetail?.timestamp}
            </DialogDescription>
          </DialogHeader>

          {selectedEventForDetail && (
            <div className="space-y-3.5 py-2 text-xs">
              <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#718096]">Actor:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedEventForDetail.actorName} ({selectedEventForDetail.actorRole})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Target Entity:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedEventForDetail.targetEntity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Terminal IP:</span>
                  <span className="font-mono text-[#173B70]">{selectedEventForDetail.ipAddress}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#173B70] mb-1">Details & Context</h4>
                <p className="text-[#4A5568] leading-relaxed bg-gray-50 p-2.5 rounded border border-[#E6ECF4]">
                  {selectedEventForDetail.details}
                </p>
              </div>

              {selectedEventForDetail.metadata && (
                <div>
                  <h4 className="font-semibold text-[#173B70] mb-1">Delta Modifications</h4>
                  <div className="rounded border border-[#E6ECF4] bg-white p-2.5 space-y-1">
                    <div className="text-[#718096]">
                      Field: <span className="font-semibold text-[#173B70]">{selectedEventForDetail.metadata.field}</span>
                    </div>
                    {selectedEventForDetail.metadata.previousValue && (
                      <div className="text-rose-700">
                        Previous: {selectedEventForDetail.metadata.previousValue}
                      </div>
                    )}
                    {selectedEventForDetail.metadata.newValue && (
                      <div className="text-emerald-700 font-medium">
                        New Value: {selectedEventForDetail.metadata.newValue}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedEventForDetail(null)}
            >
              Close Inspector
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
