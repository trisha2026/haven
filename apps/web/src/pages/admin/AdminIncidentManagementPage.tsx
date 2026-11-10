import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
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
import { MOCK_INCIDENTS, type FacilityIncident } from '../../mock/incidentsData.ts';

export function AdminIncidentManagementPage() {
  useDocumentTitle('Incident Management & Safety — Administrator');

  // Incidents state
  const [incidents, setIncidents] = useState<FacilityIncident[]>(MOCK_INCIDENTS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Dialog state
  const [selectedIncidentForDetail, setSelectedIncidentForDetail] = useState<FacilityIncident | null>(null);
  const [transitionStatus, setTransitionStatus] = useState<'under_investigation' | 'corrective_action' | 'resolved'>('resolved');
  const [resolutionNotes, setResolutionNotes] = useState('Clinical review completed by Dr. Anita Mehta. Motion sensor recalibrated and family counselled.');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalIncidents = incidents.length;
  const criticalCount = incidents.filter((i) => i.severity === 'Critical' || i.severity === 'High').length;
  const openCount = incidents.filter((i) => i.status !== 'resolved').length;
  const resolvedCount = incidents.filter((i) => i.status === 'resolved').length;

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inc.reference.toLowerCase().includes(q) ||
        inc.residentName.toLowerCase().includes(q) ||
        (inc.roomNumber || inc.room || '').toLowerCase().includes(q) ||
        (inc.reporterName || inc.reportedBy || '').toLowerCase().includes(q) ||
        inc.summary.toLowerCase().includes(q);

      const matchesSev = selectedSeverity === 'all' || inc.severity === selectedSeverity;
      const matchesCat = selectedCategory === 'all' || inc.category.includes(selectedCategory);
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'open' && inc.status !== 'resolved') ||
        (selectedStatus === 'resolved' && inc.status === 'resolved');

      return matchesSearch && matchesSev && matchesCat && matchesStatus;
    });
  }, [incidents, searchQuery, selectedSeverity, selectedCategory, selectedStatus]);

  // Handle Lifecycle Status Transition
  const handleTransitionIncident = () => {
    if (!selectedIncidentForDetail) return;
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === selectedIncidentForDetail.id
          ? {
              ...i,
              status: transitionStatus,
              resolutionNotes,
              resolvedAt: transitionStatus === 'resolved' ? new Date().toISOString().split('T')[0] : undefined,
            }
          : i
      )
    );
    showToast(`Incident ${selectedIncidentForDetail.reference} status updated to ${transitionStatus.replace('_', ' ')}.`);
    setSelectedIncidentForDetail(null);
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
              <AlertTriangle className="h-3.5 w-3.5 text-[#2457C5]" />
              Clinical Governance & Resident Safety
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Incident Management & Lifecycle Tracking
          </h1>
          <p className="text-sm text-[#4A5568]">
            Fall investigations, behavioral escalations, statutory reporting, and corrective action planning (CAPA).
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Active / Open</span>
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-600">{openCount}</div>
            <div className="mt-0.5 text-xs text-rose-700">Requires Clinical Review</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>High / Critical</span>
              <ShieldAlert className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">{criticalCount}</div>
            <div className="mt-0.5 text-xs text-amber-700">Medical Director Oversight</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Resolved Incidents</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">{resolvedCount}</div>
            <div className="mt-0.5 text-xs text-emerald-700">CAPA Implemented</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Total Recorded</span>
              <FileCheck className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalIncidents}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Year-to-Date Census</div>
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
                placeholder="Search incident ID, resident, reporter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>

            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Incident Categories</option>
              <option value="Fall">Falls & Mobility</option>
              <option value="Behavioral">Behavioral / Agitation</option>
              <option value="Medication">Medication & Clinical</option>
              <option value="Equipment">Equipment & Infrastructure</option>
            </Select>

            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Lifecycle Stages</option>
              <option value="open">Open / Under Investigation</option>
              <option value="resolved">Resolved & Closed</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Incident Reference</TableHead>
              <TableHead>Resident & Room</TableHead>
              <TableHead>Category & Summary</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Lifecycle Status</TableHead>
              <TableHead>Reporter & Timestamp</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncidents.map((inc) => (
              <TableRow key={inc.id}>
                <TableCell className="font-mono text-xs font-semibold text-[#173B70]">
                  {inc.reference}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar name={inc.residentName} size="sm" />
                    <div>
                      <Link
                        to={`/admin/residents/${inc.residentId}`}
                        className="font-semibold text-[#173B70] hover:text-[#2457C5] hover:underline"
                      >
                        {inc.residentName}
                      </Link>
                      <div className="text-xs text-[#718096]">{inc.roomNumber}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-xs text-[#173B70]">{inc.category}</div>
                  <div className="text-xs text-[#4A5568] max-w-xs truncate">{inc.summary}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      inc.severity === 'Critical'
                        ? 'danger'
                        : inc.severity === 'High'
                        ? 'warning'
                        : inc.severity === 'Medium'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {inc.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={inc.status === 'resolved' ? 'success' : 'default'}
                    className="capitalize"
                  >
                    {inc.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-[#4A5568]">
                  <div className="font-medium text-[#173B70]">{inc.reporterName}</div>
                  <div className="text-[11px] text-[#718096]">{inc.reportedAt}</div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setSelectedIncidentForDetail(inc)}
                  >
                    Details & CAPA
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Incident Detail & CAPA Dialog */}
      <Dialog
        open={Boolean(selectedIncidentForDetail)}
        onOpenChange={(open) => !open && setSelectedIncidentForDetail(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#2457C5]">
                {selectedIncidentForDetail?.reference}
              </span>
              <Badge
                variant={
                  selectedIncidentForDetail?.severity === 'Critical'
                    ? 'danger'
                    : selectedIncidentForDetail?.severity === 'High'
                    ? 'warning'
                    : 'default'
                }
              >
                {selectedIncidentForDetail?.severity} Severity
              </Badge>
            </div>
            <DialogTitle className="mt-1">
              {selectedIncidentForDetail?.category} — {selectedIncidentForDetail?.residentName}
            </DialogTitle>
            <DialogDescription>
              {selectedIncidentForDetail?.roomNumber} • Reported by {selectedIncidentForDetail?.reporterName} at{' '}
              {selectedIncidentForDetail?.reportedAt}
            </DialogDescription>
          </DialogHeader>

          {selectedIncidentForDetail && (
            <div className="space-y-4 py-2 text-xs">
              {/* Narrative Summary */}
              <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 space-y-1">
                <h4 className="font-semibold text-[#173B70]">Incident Narrative & Observations</h4>
                <p className="text-[#4A5568] leading-relaxed">{selectedIncidentForDetail.summary}</p>
                {selectedIncidentForDetail.immediateActionTaken && (
                  <div className="mt-2 text-[#173B70]">
                    <span className="font-semibold">Immediate Action: </span>
                    {selectedIncidentForDetail.immediateActionTaken}
                  </div>
                )}
              </div>

              {/* Status transition controller */}
              <div className="space-y-2">
                <label className="font-semibold text-[#173B70]">Update Lifecycle Status</label>
                <Select
                  value={transitionStatus}
                  onChange={(e) =>
                    setTransitionStatus(
                      e.target.value as 'under_investigation' | 'corrective_action' | 'resolved'
                    )
                  }
                  className="text-xs"
                >
                  <option value="under_investigation">Under Investigation</option>
                  <option value="corrective_action">Corrective & Preventive Action (CAPA)</option>
                  <option value="resolved">Resolved & Closed</option>
                </Select>
              </div>

              <div>
                <label className="font-semibold text-[#173B70]">
                  Clinical Governance Notes / CAPA Implementation
                </label>
                <Input
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedIncidentForDetail(null)}
            >
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleTransitionIncident}>
              Save Lifecycle Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
