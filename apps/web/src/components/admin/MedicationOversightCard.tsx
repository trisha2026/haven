import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Pill,
  ArrowRight,
  ShieldCheck,
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
  MOCK_MEDICATION_SUMMARY,
  MOCK_DAILY_MEDICATION_TIMELINE,
  MOCK_WEEKLY_MEDICATION_TIMELINE,
} from '../../mock/adminDashboard.ts';
import { cn } from '../../utils/cn.ts';

export function MedicationOversightCard() {
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
                <Pill className="w-4 h-4" />
              </div>
              <CardTitle as="h3" className="text-lg">Medication Oversight Snapshot</CardTitle>
              <Badge variant="success" size="sm">
                {MOCK_MEDICATION_SUMMARY.completionRate}% Logged
              </Badge>
            </div>
            <CardDescription>
              Real-time administration adherence, scheduled tolerance windows, and exception logs.
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
                7-Day Trend
              </button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/admin/medications')}
            >
              Full Ledger
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-5 space-y-6">
        {/* Reconciled KPI Metrics Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* Scheduled */}
          <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
            <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
              Scheduled Doses
            </span>
            <div className="text-xl font-bold text-haven-slate-900">
              {MOCK_MEDICATION_SUMMARY.eligibleScheduled}
            </div>
            <span className="text-[10px] text-haven-slate-500">100% eligible pool</span>
          </div>

          {/* Administered */}
          <div className="p-3 rounded-xl bg-haven-success-soft/40 border border-haven-success-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-haven-success uppercase tracking-wider block">
              Administered
            </span>
            <div className="text-xl font-bold text-haven-success">
              {MOCK_MEDICATION_SUMMARY.administered}
            </div>
            <span className="text-[10px] text-haven-success/80">Nurse verified</span>
          </div>

          {/* Pending */}
          <div className="p-3 rounded-xl bg-haven-blue-50/50 border border-haven-blue-500/20 space-y-1">
            <span className="text-[11px] font-semibold text-haven-blue-700 uppercase tracking-wider block">
              Pending Next Round
            </span>
            <div className="text-xl font-bold text-haven-blue-700">
              {MOCK_MEDICATION_SUMMARY.pending}
            </div>
            <span className="text-[10px] text-haven-slate-500">18:00 &amp; 21:00</span>
          </div>

          {/* Overdue */}
          <div className="p-3 rounded-xl bg-haven-danger-soft/40 border border-haven-danger-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-haven-danger uppercase tracking-wider block">
              Overdue Review
            </span>
            <div className="text-xl font-bold text-haven-danger">
              {MOCK_MEDICATION_SUMMARY.overdue}
            </div>
            <span className="text-[10px] text-haven-danger/80">Window passed</span>
          </div>

          {/* Missed */}
          <div className="p-3 rounded-xl bg-haven-warning-soft/40 border border-haven-warning-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-haven-warning uppercase tracking-wider block">
              Missed Doses
            </span>
            <div className="text-xl font-bold text-haven-warning">
              {MOCK_MEDICATION_SUMMARY.missed}
            </div>
            <span className="text-[10px] text-haven-slate-500">Clinical logged</span>
          </div>

          {/* Refused / Withheld */}
          <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
            <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
              Refused / Withheld
            </span>
            <div className="text-xl font-bold text-haven-slate-900">
              {MOCK_MEDICATION_SUMMARY.refused + MOCK_MEDICATION_SUMMARY.withheld}
            </div>
            <span className="text-[10px] text-haven-slate-500">Resident preference</span>
          </div>
        </div>

        {/* Recharts Chart Visualization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-haven-slate-500">
            <span className="font-semibold text-haven-slate-900">
              {viewMode === 'daily'
                ? 'Hourly Dose Administration Timeline (Today)'
                : '7-Day Dose Adherence Comparison'}
            </span>
            <span>Blue: Administered · Amber: Pending · Red: Overdue</span>
          </div>

          <div className="h-64 w-full bg-haven-slate-50/50 rounded-2xl p-2 border border-haven-border-light">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'daily' ? (
                <BarChart data={MOCK_DAILY_MEDICATION_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6ECF4" vertical={false} />
                  <XAxis dataKey="hour" stroke="#64748B" fontSize={11} tickLine={false} />
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
                  <Bar dataKey="administered" name="Administered" fill="#2457C5" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="pending" name="Pending" fill="#A96B12" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="overdue" name="Overdue" fill="#C84D45" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="missed" name="Missed" fill="#64748B" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              ) : (
                <BarChart data={MOCK_WEEKLY_MEDICATION_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6ECF4" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
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
                  <Bar dataKey="administered" name="Administered Doses" fill="#2457C5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="eligible" name="Eligible Doses" fill="#E4EDFF" stroke="#3979D8" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Safety Note & Governance */}
        <div className="p-3 rounded-xl bg-haven-blue-50/60 border border-haven-border text-xs text-haven-slate-500 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-haven-blue-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clinical Safety Protocol:</strong> Overdue status signals a missed scheduling tolerance window.
            Administrators must review nurse assignments rather than repeating doses without physician countersign.
            Refused and withheld doses are strictly excluded from completion metrics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
