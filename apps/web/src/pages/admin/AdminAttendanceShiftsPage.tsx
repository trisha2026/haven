import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  CalendarClock,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Search,
  Siren,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/Table.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import {
  MOCK_DAILY_ATTENDANCE,
  MOCK_SHIFT_ROSTERS,
  type AttendanceRecord,
  type ShiftRoster,
} from '../../mock/workforceData.ts';

export function AdminAttendanceShiftsPage() {
  useDocumentTitle('Attendance & Shift Rosters — Administrator');

  // Sub-tab: 'attendance' | 'roster'
  const [activeTab, setActiveTab] = useState<'attendance' | 'roster'>('attendance');

  // Attendance state
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_DAILY_ATTENDANCE);
  const [rosters] = useState<ShiftRoster[]>(MOCK_SHIFT_ROSTERS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShift, setSelectedShift] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Dialog state for Manual Punch / Roster Adjust
  const [isPunchModalOpen, setIsPunchModalOpen] = useState(false);
  const [selectedStaffForPunch, setSelectedStaffForPunch] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalScheduled = attendance.length;
  const onTimeCount = attendance.filter((a) => a.status === 'on_time').length;
  const delayedCount = attendance.filter((a) => a.status === 'delayed').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;

  // Filtered attendance
  const filteredAttendance = useMemo(() => {
    return attendance.filter((rec) => {
      const q = searchQuery.toLowerCase().trim();
      const displayName = rec.staffName || rec.employeeName;
      const matchesSearch =
        !q ||
        displayName.toLowerCase().includes(q) ||
        rec.employeeId.toLowerCase().includes(q) ||
        rec.wing.toLowerCase().includes(q);

      const matchesShift = selectedShift === 'all' || (rec.shift || rec.shiftName).includes(selectedShift);
      const matchesStatus = selectedStatus === 'all' || rec.status === selectedStatus;

      return matchesSearch && matchesShift && matchesStatus;
    });
  }, [attendance, searchQuery, selectedShift, selectedStatus]);

  // Handle Manual Biometric Override Punch
  const handleManualPunch = () => {
    if (!selectedStaffForPunch) return;
    setAttendance((prev) =>
      prev.map((a) =>
        a.id === selectedStaffForPunch
          ? {
              ...a,
              status: 'on_time' as const,
              checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              checkInMethod: 'Biometric Override (Admin)',
            }
          : a
      )
    );
    showToast('Manual attendance check-in logged and timestamped.');
    setIsPunchModalOpen(false);
    setSelectedStaffForPunch('');
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
              <CalendarClock className="h-3.5 w-3.5 text-[#2457C5]" />
              Workforce Operations & Duty Rosters
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Attendance & Shift Management
          </h1>
          <p className="text-sm text-[#4A5568]">
            Biometric turnstile check-ins, wing coverage quotas, handover overlap, and workforce punctuality.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPunchModalOpen(true)}
          >
            <UserCheck className="mr-1.5 h-3.5 w-3.5" />
            Manual Attendance Punch
          </Button>

          <Link to="/admin/emergency-assignments">
            <Button variant="default" size="sm">
              <Siren className="mr-1.5 h-3.5 w-3.5" />
              Emergency Cover
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Scheduled Today</span>
              <Users className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalScheduled}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Across 3 Active Shifts</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>On Time Check-ins</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">{onTimeCount}</div>
            <div className="mt-0.5 text-xs text-emerald-700">92.8% Punctuality</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Delayed Check-ins</span>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">{delayedCount}</div>
            <div className="mt-0.5 text-xs text-amber-700">&gt; 15 min handover delay</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Shortages / Absent</span>
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-700">{absentCount}</div>
            <div className="mt-0.5 text-xs text-rose-700">Relief Dispatch Active</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E6ECF4]">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'attendance'
              ? 'border-[#2457C5] text-[#173B70]'
              : 'border-transparent text-[#718096] hover:text-[#173B70]'
          }`}
        >
          <Clock className="h-4 w-4" />
          Daily Clock-In Log ({attendance.length})
        </button>

        <button
          onClick={() => setActiveTab('roster')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'roster'
              ? 'border-[#2457C5] text-[#173B70]'
              : 'border-transparent text-[#718096] hover:text-[#173B70]'
          }`}
        >
          <Calendar className="h-4 w-4" />
          Wing Shift Rosters & Quotas
        </button>
      </div>

      {activeTab === 'attendance' ? (
        <div className="space-y-4">
          {/* Filters */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
                  <Input
                    placeholder="Search staff name, employee ID, wing..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>

                <Select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="text-xs"
                >
                  <option value="all">All Shifts</option>
                  <option value="Morning">Morning Shift (07:00 - 15:30)</option>
                  <option value="Afternoon">Afternoon Shift (15:00 - 23:30)</option>
                  <option value="Night">Night Shift (23:00 - 07:30)</option>
                </Select>

                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs"
                >
                  <option value="all">All Attendance Statuses</option>
                  <option value="on_time">On Time</option>
                  <option value="delayed">Delayed</option>
                  <option value="absent">Absent / Unplanned Leave</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Role & Wing</TableHead>
                  <TableHead>Shift Timing</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead>Terminal / Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={rec.staffName || rec.employeeName} size="sm" />
                        <div>
                          <div className="font-semibold text-[#173B70]">{rec.staffName || rec.employeeName}</div>
                          <div className="text-xs text-[#718096]">{rec.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium text-[#173B70]">{rec.role}</div>
                      <div className="text-[11px] text-[#718096]">{rec.wing}</div>
                    </TableCell>
                    <TableCell className="text-xs text-[#4A5568]">{rec.shift}</TableCell>
                    <TableCell>
                      <div className="text-xs font-semibold text-[#173B70]">
                        {rec.checkInTime || '—'}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-[#718096]">{rec.checkInMethod}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          rec.status === 'on_time'
                            ? 'success'
                            : rec.status === 'delayed'
                            ? 'warning'
                            : 'danger'
                        }
                        className="capitalize"
                      >
                        {rec.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {rec.status === 'absent' ? (
                        <Link to="/admin/emergency-assignments">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs text-rose-700 border-rose-300"
                          >
                            Dispatch Cover
                          </Button>
                        </Link>
                      ) : (
                        <span className="text-xs text-[#718096]">Verified</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      ) : (
        /* Roster Grid */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rosters.map((roster) => (
            <Card key={roster.id} className="border-[#E6ECF4] bg-white shadow-xs">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="font-semibold">
                    {roster.wing}
                  </Badge>
                  <span className="text-xs text-[#718096]">{roster.date}</span>
                </div>
                <CardTitle className="text-base text-[#173B70] mt-1">{roster.shiftName}</CardTitle>
                <CardDescription className="text-xs">
                  Timing: {roster.startTime} - {roster.endTime} IST
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-3">
                <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-2.5 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#718096]">Assigned Staff:</span>
                    <span className="font-bold text-[#173B70]">{roster.assignedStaffCount} Nurses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718096]">Required Minimum:</span>
                    <span className="font-semibold text-[#173B70]">{roster.minimumRequired} Nurses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718096]">Coverage Status:</span>
                    <Badge
                      variant={
                        (roster.assignedStaffCount || 0) >= roster.minimumRequired ? 'success' : 'danger'
                      }
                    >
                      {(roster.assignedStaffCount || 0) >= roster.minimumRequired
                        ? 'Optimal Quota'
                        : 'Staffing Shortage'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#173B70] mb-1.5">Stationed Staff</h4>
                  <div className="space-y-1">
                    {roster.staffMembers?.map((staff: { name: string; role: string }, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded bg-gray-50 px-2 py-1 text-xs"
                      >
                        <span className="font-medium text-[#173B70]">{staff.name}</span>
                        <span className="text-[11px] text-[#718096]">{staff.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E6ECF4]">
                  <Link to="/admin/emergency-assignments">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Adjust Roster Allocations
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Manual Attendance Punch Dialog */}
      <Dialog open={isPunchModalOpen} onOpenChange={setIsPunchModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manual Attendance Punch Override</DialogTitle>
            <DialogDescription>
              Record administrator-verified biometric check-in for staff experiencing credential reader issues.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Select Staff Member</label>
              <Select
                value={selectedStaffForPunch}
                onChange={(e) => setSelectedStaffForPunch(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="">Select staff record...</option>
                {attendance.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.staffName || a.employeeName} ({a.employeeId}) — {a.wing} ({a.shift || a.shiftName})
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsPunchModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={!selectedStaffForPunch}
              onClick={handleManualPunch}
            >
              Confirm Biometric Punch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
