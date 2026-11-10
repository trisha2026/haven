import { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Coffee,
  LogOut,
  LogIn,
  Info,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { ACTIVE_CAREGIVER } from '../../mock/caregiverWorkspaceData.ts';

interface BreakLog {
  id: string;
  type: string;
  startTime: string;
  endTime?: string;
  durationMinutes?: number;
}

interface HistoricalAttendance {
  date: string;
  shift: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  breakDuration: string;
  status: 'on_time' | 'delayed' | 'leave';
}

export function CaregiverAttendancePage() {
  useDocumentTitle('Attendance & Shift Console — Caregiver');

  // Duty status state
  const [dutyStatus, setDutyStatus] = useState<'on_duty' | 'on_break' | 'checked_out'>('on_duty');
  const [checkInTime, setCheckInTime] = useState<string>('06:52 AM');
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  // Breaks state
  const [breaks, setBreaks] = useState<BreakLog[]>([
    {
      id: 'BRK-01',
      type: 'Morning Tea Break',
      startTime: '10:15 AM',
      endTime: '10:35 AM',
      durationMinutes: 20,
    },
    {
      id: 'BRK-02',
      type: 'Lunch Break',
      startTime: '13:00 PM',
      endTime: '13:30 PM',
      durationMinutes: 30,
    },
  ]);

  // Modals
  const [isCheckOutConfirmOpen, setIsCheckOutConfirmOpen] = useState(false);
  const [isStartBreakOpen, setIsStartBreakOpen] = useState(false);
  const [selectedBreakType, setSelectedBreakType] = useState('Short Rest Break');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const attendanceHistory: HistoricalAttendance[] = [
    {
      date: 'Today, Nov 10',
      shift: 'Day Shift (07:00 – 15:00)',
      checkIn: '06:52 AM',
      checkOut: 'In Progress',
      totalHours: '7.5h (Active)',
      breakDuration: '50 mins',
      status: 'on_time',
    },
    {
      date: 'Nov 09, 2026',
      shift: 'Day Shift (07:00 – 15:00)',
      checkIn: '06:55 AM',
      checkOut: '15:08 PM',
      totalHours: '8.2h',
      breakDuration: '45 mins',
      status: 'on_time',
    },
    {
      date: 'Nov 08, 2026',
      shift: 'Day Shift (07:00 – 15:00)',
      checkIn: '06:58 AM',
      checkOut: '15:10 PM',
      totalHours: '8.2h',
      breakDuration: '45 mins',
      status: 'on_time',
    },
    {
      date: 'Nov 07, 2026',
      shift: 'Day Shift (07:00 – 15:00)',
      checkIn: '07:04 AM',
      checkOut: '15:12 PM',
      totalHours: '8.1h',
      breakDuration: '45 mins',
      status: 'delayed',
    },
    {
      date: 'Nov 06, 2026',
      shift: 'Day Shift (07:00 – 15:00)',
      checkIn: '06:50 AM',
      checkOut: '15:05 PM',
      totalHours: '8.2h',
      breakDuration: '45 mins',
      status: 'on_time',
    },
  ];

  // Actions
  const handleCheckIn = () => {
    if (dutyStatus !== 'checked_out') {
      showToast('You are already checked in for today’s shift.');
      return;
    }
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setCheckInTime(`${now} IST`);
    setCheckOutTime(null);
    setDutyStatus('on_duty');
    showToast(`Checked in successfully at ${now} IST. Duty status set to ON DUTY.`);
  };

  const handleStartBreak = () => {
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const newBreak: BreakLog = {
      id: `BRK-${Date.now()}`,
      type: selectedBreakType,
      startTime: `${now} IST`,
    };
    setBreaks((prev) => [...prev, newBreak]);
    setDutyStatus('on_break');
    setIsStartBreakOpen(false);
    showToast(`Break (${selectedBreakType}) commenced at ${now} IST.`);
  };

  const handleEndBreak = () => {
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setBreaks((prev) =>
      prev.map((b, idx) =>
        idx === prev.length - 1 && !b.endTime
          ? { ...b, endTime: `${now} IST`, durationMinutes: 15 }
          : b
      )
    );
    setDutyStatus('on_duty');
    showToast(`Break concluded at ${now} IST. Duty status resumed to ON DUTY.`);
  };

  const handleConfirmCheckOut = () => {
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setCheckOutTime(`${now} IST`);
    setDutyStatus('checked_out');
    setIsCheckOutConfirmOpen(false);
    showToast(`Checked out of Day Shift at ${now} IST. Have a good rest!`);
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
              <Clock className="h-3.5 w-3.5 text-[#2457C5]" />
              Staff Shift Punch Console
            </span>
            <span className="text-xs text-[#64748B]">
              Caregiver: {ACTIVE_CAREGIVER.fullName}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Attendance & Duty Status
          </h1>
          <p className="text-sm text-[#4A5568]">
            Manage your daily clock-in, rest break recordings, and shift checkout times.
          </p>
        </div>
      </div>

      {/* Demonstration disclaimer */}
      <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-4 text-xs text-[#173B70]">
        <div className="flex items-start gap-2.5">
          <Info className="h-4 w-4 text-[#2457C5] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Demonstration Mode:</span> Attendance punches simulate the on-site physical biometric reader (Console #2, Garden Terrace Station). Timestamps reflect the Asia/Kolkata timezone.
          </div>
        </div>
      </div>

      {/* Live Punch Console Card */}
      <Card className="border-[#E6ECF4] bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Current Shift Status
              </span>
              <Badge
                variant={
                  dutyStatus === 'on_duty'
                    ? 'success'
                    : dutyStatus === 'on_break'
                    ? 'warning'
                    : 'secondary'
                }
                className="text-xs uppercase font-bold"
              >
                {dutyStatus === 'on_duty'
                  ? 'On Duty (Active)'
                  : dutyStatus === 'on_break'
                  ? 'On Break'
                  : 'Checked Out'}
              </Badge>
            </div>

            <h2 className="text-3xl font-bold text-[#173B70]">
              {ACTIVE_CAREGIVER.currentShift}
            </h2>
            <p className="text-xs text-[#64748B]">
              Primary Wing: <span className="font-semibold text-[#173B70]">{ACTIVE_CAREGIVER.assignedWing}</span> · Supervisor: {ACTIVE_CAREGIVER.supervisorName}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#334155]">
              <div>
                <span className="text-[#64748B]">Check-in:</span>{' '}
                <span className="font-bold text-[#173B70]">{checkInTime || 'Pending'}</span>
              </div>
              <div>
                <span className="text-[#64748B]">Check-out:</span>{' '}
                <span className="font-bold text-[#173B70]">{checkOutTime || 'Shift In Progress'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {dutyStatus === 'checked_out' ? (
              <Button
                variant="default"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                onClick={handleCheckIn}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Clock In for Shift
              </Button>
            ) : dutyStatus === 'on_break' ? (
              <Button
                variant="default"
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
                onClick={handleEndBreak}
              >
                <Clock className="mr-2 h-4 w-4" />
                End Break & Resume Duty
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#2457C5] text-[#2457C5] hover:bg-[#F4F8FF]"
                  onClick={() => setIsStartBreakOpen(true)}
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Take Rest Break
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
                  onClick={() => setIsCheckOutConfirmOpen(true)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Check Out of Shift
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Today's Breaks Log */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
          <CardTitle className="text-base font-bold text-[#173B70]">
            Today’s Break History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E6ECF4]">
            {breaks.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-4 text-xs hover:bg-[#F4F8FF]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                    <Coffee className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#173B70]">{b.type}</div>
                    <div className="text-[11px] text-[#64748B]">
                      Started: {b.startTime} {b.endTime ? `· Ended: ${b.endTime}` : '(Ongoing)'}
                    </div>
                  </div>
                </div>

                <Badge variant={b.endTime ? 'outline' : 'warning'} className="text-xs">
                  {b.endTime ? `${b.durationMinutes} Minutes` : 'Break Active'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past 7 Days Attendance Log */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
        <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
          <CardTitle className="text-base font-bold text-[#173B70]">
            Recent Attendance Ledger (Past 7 Days)
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="border-b border-[#E6ECF4] bg-[#F4F8FF] text-[#173B70] font-semibold">
              <tr>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Shift</th>
                <th className="p-3.5">Check-In</th>
                <th className="p-3.5">Check-Out</th>
                <th className="p-3.5">Breaks Logged</th>
                <th className="p-3.5">Total Hours</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECF4]">
              {attendanceHistory.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F4F8FF]/30 transition-colors">
                  <td className="p-3.5 font-bold text-[#173B70]">{row.date}</td>
                  <td className="p-3.5 text-[#334155]">{row.shift}</td>
                  <td className="p-3.5 font-medium text-emerald-700">{row.checkIn}</td>
                  <td className="p-3.5 text-[#64748B]">{row.checkOut}</td>
                  <td className="p-3.5 text-[#64748B]">{row.breakDuration}</td>
                  <td className="p-3.5 font-bold text-[#173B70]">{row.totalHours}</td>
                  <td className="p-3.5">
                    <Badge
                      variant={row.status === 'on_time' ? 'success' : 'warning'}
                      className="capitalize text-[10px]"
                    >
                      {row.status.replace('_', ' ')}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Start Break Dialog */}
      <Dialog open={isStartBreakOpen} onOpenChange={setIsStartBreakOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Take Rest Break</DialogTitle>
            <DialogDescription>
              Select break type. Make sure peer coverage is alerted on Garden Terrace before commencing break.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Break Category</label>
              <Select
                value={selectedBreakType}
                onChange={(e) => setSelectedBreakType(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="Morning Tea Break (15 mins)">Morning Tea Break (15 mins)</option>
                <option value="Lunch Break (30 mins)">Lunch Break (30 mins)</option>
                <option value="Afternoon Tea Break (15 mins)">Afternoon Tea Break (15 mins)</option>
                <option value="Clinical Debrief Break">Clinical Debrief Break</option>
              </Select>
            </div>
            <div className="rounded-lg bg-[#F4F8FF] p-3 text-xs text-[#173B70]">
              Peer nurse Rahul Patil / Sunita Reddy informed for floor call-button coverage.
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsStartBreakOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleStartBreak}>
              Start Break
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Checkout Confirmation Dialog */}
      <Dialog open={isCheckOutConfirmOpen} onOpenChange={setIsCheckOutConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-rose-900">Confirm Shift Checkout</DialogTitle>
            <DialogDescription>
              Are you sure you want to end your Day Shift? Confirm that all pending tasks have been completed or handed over.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 space-y-1">
            <div className="font-bold">Shift Handover Reminder:</div>
            <div>
              Ensure structured handover HND-2026-042 has been reviewed with incoming lead Rahul Patil, LPN before departing the facility.
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsCheckOutConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-rose-600 hover:bg-rose-700 text-white"
              onClick={handleConfirmCheckOut}
            >
              Confirm Checkout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
