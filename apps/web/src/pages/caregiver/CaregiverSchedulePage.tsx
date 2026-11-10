import { useState } from 'react';
import {
  CalendarClock,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { ACTIVE_CAREGIVER, ACTIVE_TEMPORARY_ASSIGNMENTS } from '../../mock/caregiverWorkspaceData.ts';

interface ShiftScheduleItem {
  id: string;
  date: string;
  dayOfWeek: string;
  shiftName: string;
  timing: string;
  wing: string;
  status: 'active' | 'upcoming' | 'completed' | 'off_duty';
  hours: number;
  supervisor: string;
  temporaryCoverage?: string;
  notes?: string;
}

export function CaregiverSchedulePage() {
  useDocumentTitle('My Schedule & Shifts — Caregiver');

  const [activeView, setActiveView] = useState<'today' | 'week' | 'month'>('today');

  const scheduleList: ShiftScheduleItem[] = [
    {
      id: 'SHF-01',
      date: 'Nov 10, 2026',
      dayOfWeek: 'Tuesday (Today)',
      shiftName: 'Day Shift',
      timing: '07:00 – 15:00',
      wing: 'Garden Terrace (Floor 2)',
      status: 'active',
      hours: 8,
      supervisor: 'Devika Ramanathan (Facility Administrator)',
      temporaryCoverage: 'EMG-2026-004: Orchard Meadow Room 108-A Standby',
      notes: 'Active roster assignment. Lead RN for Garden Terrace rounds.',
    },
    {
      id: 'SHF-02',
      date: 'Nov 11, 2026',
      dayOfWeek: 'Wednesday',
      shiftName: 'Day Shift',
      timing: '07:00 – 15:00',
      wing: 'Garden Terrace (Floor 2)',
      status: 'upcoming',
      hours: 8,
      supervisor: 'Devika Ramanathan',
      notes: 'Routine scheduled day shift.',
    },
    {
      id: 'SHF-03',
      date: 'Nov 12, 2026',
      dayOfWeek: 'Thursday',
      shiftName: 'Day Shift',
      timing: '07:00 – 15:00',
      wing: 'Garden Terrace (Floor 2)',
      status: 'upcoming',
      hours: 8,
      supervisor: 'Devika Ramanathan',
      notes: 'Scheduled day shift.',
    },
    {
      id: 'SHF-04',
      date: 'Nov 13, 2026',
      dayOfWeek: 'Friday',
      shiftName: 'Weekly Rest (Off Duty)',
      timing: 'Off Duty',
      wing: 'N/A',
      status: 'off_duty',
      hours: 0,
      supervisor: 'Devika Ramanathan',
      notes: 'Scheduled rest day per Karnataka clinical labor regulations.',
    },
    {
      id: 'SHF-05',
      date: 'Nov 14, 2026',
      dayOfWeek: 'Saturday',
      shiftName: 'Day Shift',
      timing: '07:00 – 15:00',
      wing: 'Garden Terrace (Floor 2)',
      status: 'upcoming',
      hours: 8,
      supervisor: 'Devika Ramanathan',
      notes: 'Weekend clinical lead coverage.',
    },
    {
      id: 'SHF-06',
      date: 'Nov 15, 2026',
      dayOfWeek: 'Sunday',
      shiftName: 'Evening Shift',
      timing: '15:00 – 23:00',
      wing: 'Garden Terrace (Floor 2)',
      status: 'upcoming',
      hours: 8,
      supervisor: 'Devika Ramanathan',
      notes: 'Evening medication rounds lead.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <CalendarClock className="h-3.5 w-3.5 text-[#2457C5]" />
              Workforce Roster Schedule
            </span>
            <span className="text-xs text-[#64748B]">
              Employee: {ACTIVE_CAREGIVER.fullName} ({ACTIVE_CAREGIVER.employeeId})
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            My Schedule & Assigned Shifts
          </h1>
          <p className="text-sm text-[#4A5568]">
            Review your approved shift rosters, reporting supervisors, and authorized temporary coverages.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center rounded-lg border border-[#E6ECF4] bg-white p-0.5 shadow-xs">
          {(['today', 'week', 'month'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                activeView === view
                  ? 'bg-[#173B70] text-white'
                  : 'text-[#64748B] hover:text-[#173B70]'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Policy Callout */}
      <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-4 text-xs text-[#173B70]">
        <div className="flex items-start gap-2.5">
          <Info className="h-4 w-4 text-[#2457C5] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Roster Governance Note:</span> Master shift rosters are published and governed by Facility Administration. Caregivers may view schedules and submit leave requests, but cannot modify published roster shifts directly. For emergency shift swaps, contact administrator Devika Ramanathan.
          </div>
        </div>
      </div>

      {/* TODAY'S SHIFT DETAIL */}
      {activeView === 'today' && (
        <div className="space-y-6">
          <Card className="border-[#E6ECF4] bg-white shadow-xs p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" className="text-xs">
                    Current Active Shift
                  </Badge>
                  <span className="text-xs font-semibold text-[#173B70]">
                    Tuesday, Nov 10, 2026
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-[#173B70]">
                  Day Shift · 07:00 – 15:00 IST (8.0 Hours)
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Assigned Wing: <span className="font-semibold text-[#173B70]">Garden Terrace (Floor 2)</span> · Primary Caseload: 5 Residents
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 text-right shrink-0">
                <div className="font-bold text-sm">Checked In: 06:52 AM IST</div>
                <div className="text-emerald-700 mt-0.5">Console #2 Biometric Verified</div>
                <div className="text-[11px] text-emerald-600 mt-1">Shift In Progress (7.2h logged)</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 pt-6 border-t border-[#E6ECF4] text-xs">
              <div className="rounded-lg border border-[#E6ECF4] p-3.5 space-y-1">
                <div className="text-[#64748B]">Reporting Supervisor</div>
                <div className="font-bold text-[#173B70]">{ACTIVE_CAREGIVER.supervisorName}</div>
                <div className="text-[11px] text-[#64748B]">{ACTIVE_CAREGIVER.supervisorTitle} · {ACTIVE_CAREGIVER.supervisorPhone}</div>
              </div>

              <div className="rounded-lg border border-[#E6ECF4] p-3.5 space-y-1">
                <div className="text-[#64748B]">Designated Breaks</div>
                <div className="font-bold text-[#173B70]">Morning Tea: 10:15 (Completed)</div>
                <div className="text-[11px] text-[#64748B]">Lunch Break: 13:00 – 13:30 (Logged)</div>
              </div>

              <div className="rounded-lg border border-[#E6ECF4] p-3.5 space-y-1">
                <div className="text-[#64748B]">Upcoming Handover Window</div>
                <div className="font-bold text-[#173B70]">14:45 PM – 15:00 PM</div>
                <div className="text-[11px] text-[#2457C5]">Incoming Lead: Rahul Patil, LPN (Evening)</div>
              </div>
            </div>

            {/* Active temporary coverage attached to shift */}
            {ACTIVE_TEMPORARY_ASSIGNMENTS.length > 0 && (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-amber-900">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Active Temporary Emergency Assignment Attached to Today’s Shift:
                </div>
                <div className="mt-1">
                  <span className="font-semibold">{ACTIVE_TEMPORARY_ASSIGNMENTS[0].id}:</span> {ACTIVE_TEMPORARY_ASSIGNMENTS[0].scope} ({ACTIVE_TEMPORARY_ASSIGNMENTS[0].targetResidentName}, {ACTIVE_TEMPORARY_ASSIGNMENTS[0].targetRoom}). Window: {ACTIVE_TEMPORARY_ASSIGNMENTS[0].startTime} – {ACTIVE_TEMPORARY_ASSIGNMENTS[0].expiryTime}.
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* WEEK & MONTH VIEWS */}
      {(activeView === 'week' || activeView === 'month') && (
        <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
          <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
            <CardTitle className="text-base font-bold text-[#173B70]">
              {activeView === 'week' ? 'Weekly Shift Roster (Nov 10 – Nov 16)' : 'Monthly Overview (November 2026)'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E6ECF4]">
              {scheduleList.map((shift) => (
                <div
                  key={shift.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-[#F4F8FF]/30 transition-colors gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`rounded-lg p-2.5 text-center min-w-[70px] ${
                        shift.status === 'active'
                          ? 'bg-[#E4EDFF] text-[#2457C5]'
                          : shift.status === 'off_duty'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-white border border-[#E6ECF4] text-[#173B70]'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold text-[#64748B]">
                        {shift.dayOfWeek.split(' ')[0]}
                      </div>
                      <div className="text-xs font-bold text-[#173B70] mt-0.5">
                        {shift.date.split(',')[0]}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#173B70]">{shift.shiftName}</span>
                        <span className="text-xs text-[#2457C5] font-semibold">{shift.timing}</span>
                        <Badge
                          variant={
                            shift.status === 'active'
                              ? 'success'
                              : shift.status === 'off_duty'
                              ? 'secondary'
                              : 'outline'
                          }
                          className="capitalize text-[10px]"
                        >
                          {shift.status === 'active' ? 'Today (Active)' : shift.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="text-xs text-[#64748B] mt-0.5">
                        Wing: {shift.wing} · Supervisor: {shift.supervisor}
                      </div>
                      {shift.temporaryCoverage && (
                        <div className="text-[10px] text-amber-700 font-medium mt-0.5">
                          {shift.temporaryCoverage}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs font-medium text-[#64748B]">
                      {shift.hours > 0 ? `${shift.hours} Hours` : 'Rest Day'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
