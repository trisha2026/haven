import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Users,
  ArrowRight,
  Siren,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import {
  MOCK_STAFFING_SUMMARY,
  MOCK_DAILY_STAFFING_CHART,
  MOCK_WEEKLY_STAFFING_CHART,
} from '../../mock/adminDashboard.ts';
import { cn } from '../../utils/cn.ts';

export function StaffingCoverageCard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  return (
    <Card variant="default" padding="lg" className="shadow-haven-card">
      {/* Header */}
      <CardHeader className="pb-4 border-b border-haven-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <CardTitle as="h3" className="text-lg">Staffing &amp; Workforce Coverage</CardTitle>
              <Badge variant="warning" size="sm" dot>
                1 Coverage Gap
              </Badge>
            </div>
            <CardDescription>
              Caregiver attendance, shift transitions, and on-call emergency dispatch across 4 wings.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 rounded-lg bg-haven-slate-100 border border-haven-border text-xs">
              <button
                type="button"
                onClick={() => setViewMode('daily')}
                className={cn(
                  'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer',
                  viewMode === 'daily'
                    ? 'bg-white text-haven-slate-900 shadow-haven-sm'
                    : 'text-haven-slate-500 hover:text-haven-slate-900'
                )}
              >
                Today (Hourly)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('weekly')}
                className={cn(
                  'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer',
                  viewMode === 'weekly'
                    ? 'bg-white text-haven-slate-900 shadow-haven-sm'
                    : 'text-haven-slate-500 hover:text-haven-slate-900'
                )}
              >
                7-Day Roster
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/admin/attendance')}
            >
              Shift Rosters
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-5 space-y-6">
        {/* KPI Counter Row with non-overlapping second-line scope badge layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-haven-success-soft/40 border border-haven-success-border/60 flex flex-col justify-between h-full space-y-2">
            <div className="space-y-1.5">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[11px] font-semibold text-haven-success uppercase tracking-wider leading-snug break-words">
                  Currently On Duty
                </span>
                <span className="text-[10px] font-bold text-haven-success px-1.5 py-0.5 rounded bg-haven-success/15 border border-haven-success/30 inline-flex items-center">
                  Current Shift
                </span>
              </div>
              <div className="text-2xl font-bold text-haven-success">
                {MOCK_STAFFING_SUMMARY.currentlyOnDuty}
              </div>
            </div>
            <span className="text-[10px] text-haven-success/80 block leading-tight">
              18 of 18 scheduled (100% active)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border flex flex-col justify-between h-full space-y-2">
            <div className="space-y-1.5">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider leading-snug break-words">
                  Scheduled Today (24h)
                </span>
                <span className="text-[10px] font-medium text-haven-slate-500 px-1.5 py-0.5 rounded bg-haven-slate-200/60 border border-haven-border inline-flex items-center">
                  24-Hour Scope
                </span>
              </div>
              <div className="text-2xl font-bold text-haven-slate-900">
                {MOCK_STAFFING_SUMMARY.totalScheduledToday}
              </div>
            </div>
            <span className="text-[10px] text-haven-slate-500 block leading-tight">
              26 distinct staff across 3 shifts
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-haven-warning-soft/40 border border-haven-warning-border/60 flex flex-col justify-between h-full space-y-2">
            <div className="space-y-1.5">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[11px] font-semibold text-haven-warning uppercase tracking-wider leading-snug break-words">
                  Absences / Leave Logged
                </span>
                <span className="text-[10px] font-medium text-haven-warning px-1.5 py-0.5 rounded bg-haven-warning/15 border border-haven-warning/30 inline-flex items-center">
                  24-Hour Scope
                </span>
              </div>
              <div className="text-2xl font-bold text-haven-warning">
                {MOCK_STAFFING_SUMMARY.absentOrLeave}
              </div>
            </div>
            <span className="text-[10px] text-haven-slate-500 block leading-tight">
              1 Night medical · 1 personal
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-haven-danger-soft/40 border border-haven-danger-border/60 flex flex-col justify-between h-full space-y-2">
            <div className="space-y-1.5">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[11px] font-semibold text-haven-danger uppercase tracking-wider leading-snug break-words">
                  Upcoming Coverage Gaps
                </span>
                <span className="text-[10px] font-medium text-haven-danger px-1.5 py-0.5 rounded bg-haven-danger/15 border border-haven-danger/30 inline-flex items-center">
                  Upcoming Shift
                </span>
              </div>
              <div className="text-2xl font-bold text-haven-danger">
                {MOCK_STAFFING_SUMMARY.coverageGapsCount}
              </div>
            </div>
            <span className="text-[10px] text-haven-danger/80 block leading-tight">
              Night Shift (Sunrise Pavilion)
            </span>
          </div>
        </div>

        {/* 3 Shift Roster Cards */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-haven-slate-900">
            <span>Shift Cycles &amp; Transitions</span>
            <span className="text-haven-slate-500 font-normal">Next Handover: 15:00 Day → Evening (in 4h 30m)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MOCK_STAFFING_SUMMARY.activeShifts.map((shift) => (
              <div
                key={shift.id}
                className={cn(
                  'p-3.5 rounded-2xl border transition-colors space-y-2.5',
                  shift.coverageStatus === 'gap'
                    ? 'bg-haven-danger-soft/20 border-haven-danger-border/70'
                    : shift.coverageStatus === 'pending'
                    ? 'bg-haven-warning-soft/20 border-haven-warning-border/70'
                    : 'bg-white border-haven-border'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-haven-slate-900">{shift.name}</span>
                  <Badge
                    variant={
                      shift.coverageStatus === 'full'
                        ? 'success'
                        : shift.coverageStatus === 'gap'
                        ? 'danger'
                        : 'warning'
                    }
                    size="sm"
                    dot
                  >
                    {shift.coverageStatus === 'full'
                      ? 'Active Shift (Current)'
                      : shift.coverageStatus === 'gap'
                      ? 'Gap Alert (Tonight)'
                      : 'Upcoming (in 4h 30m)'}
                  </Badge>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-haven-slate-500">{shift.timeRange}</span>
                  <span className="text-xs font-bold text-haven-slate-900">
                    {shift.onDutyStaff > 0 ? `${shift.onDutyStaff} active` : `${shift.confirmedStaff} / ${shift.scheduledStaff} confirmed`}
                  </span>
                </div>

                <div className="text-[11px] text-haven-slate-500 border-t border-haven-border-light pt-2 space-y-0.5">
                  <p className="truncate">Lead: <strong className="text-haven-slate-900">{shift.leadSupervisor}</strong></p>
                  {shift.gapNotes && (
                    <p className="text-haven-danger font-medium leading-tight pt-0.5">{shift.gapNotes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recharts Visualization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-haven-slate-500">
            <span className="font-semibold text-haven-slate-900">
              {viewMode === 'daily'
                ? 'Personnel Coverage by Shift Operating Hours (Day Shift Active at 10:30 AM)'
                : '7-Day Coverage Reliability Index (%)'}
            </span>
            <span>Blue: Actual Staff · Pale Blue: Minimum Buffer</span>
          </div>

          <div className="h-56 w-full bg-haven-slate-50/50 rounded-2xl p-2 border border-haven-border-light">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'daily' ? (
                <BarChart data={MOCK_DAILY_STAFFING_CHART} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6ECF4" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E6ECF4',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgba(23, 43, 77, 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="actual" name="On Duty Staff" fill="#2457C5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="minimumRequired" name="Minimum Mandate" fill="#E4EDFF" stroke="#3979D8" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={MOCK_WEEKLY_STAFFING_CHART} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6ECF4" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis domain={[80, 100]} stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E6ECF4',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgba(23, 43, 77, 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="fullCoverageRate" name="Shift Coverage %" fill="#2457C5" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emergency Action Banner */}
        <div className="p-3.5 rounded-xl bg-haven-warning-soft border border-haven-warning-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Siren className="w-4 h-4 text-haven-warning shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-haven-warning">Night Shift On-Call Dispatch Required</span>
              <p className="text-haven-slate-700">
                1 Caregiver absence logged for Sunrise Pavilion. Authorization needed to dispatch on-call pool.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/emergency-assignments')}
            className="shrink-0"
          >
            Dispatch Cover →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
