import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ShieldAlert,
  ArrowRight,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/Dialog.tsx';
import {
  MOCK_INCIDENTS_LIST,
  MOCK_INCIDENT_STATS,
  MOCK_INCIDENT_CATEGORIES_CHART,
  type IncidentRecord,
} from '../../mock/adminDashboard.ts';
import { cn } from '../../utils/cn.ts';

export function IncidentAnalyticsCard() {
  const navigate = useNavigate();
  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord | null>(null);

  return (
    <>
      <Card variant="default" padding="lg" className="shadow-haven-card">
        {/* Header */}
        <CardHeader className="pb-4 border-b border-haven-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-haven-danger-soft text-haven-danger flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <CardTitle as="h3" className="text-lg">Incident &amp; Safety Analytics</CardTitle>
                <Badge variant="danger" size="sm" dot>
                  {MOCK_INCIDENT_STATS.totalOpen} Open
                </Badge>
              </div>
              <CardDescription>
                Facility-wide event tracking, clinical physician sign-offs, and risk mitigation trends.
              </CardDescription>
            </div>

            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/admin/incidents')}
            >
              Incident Log
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-5 space-y-6">
          {/* Incident Stats Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
              <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                Total Open
              </span>
              <div className="text-2xl font-bold text-haven-slate-900">
                {MOCK_INCIDENT_STATS.totalOpen}
              </div>
              <span className="text-[10px] text-haven-slate-500">Active monitoring</span>
            </div>

            <div className="p-3 rounded-xl bg-haven-danger-soft/40 border border-haven-danger-border/60 space-y-1">
              <span className="text-[11px] font-semibold text-haven-danger uppercase tracking-wider block">
                Clinical Review Due
              </span>
              <div className="text-2xl font-bold text-haven-danger">
                {MOCK_INCIDENT_STATS.awaitingClinicalReview}
              </div>
              <span className="text-[10px] text-haven-danger/80">Pending Dr. Mehta</span>
            </div>

            <div className="p-3 rounded-xl bg-haven-warning-soft/40 border border-haven-warning-border/60 space-y-1">
              <span className="text-[11px] font-semibold text-haven-warning uppercase tracking-wider block">
                Under Investigation
              </span>
              <div className="text-2xl font-bold text-haven-warning">
                {MOCK_INCIDENT_STATS.underInvestigation}
              </div>
              <span className="text-[10px] text-haven-slate-500">Facilities inquiry</span>
            </div>

            <div className="p-3 rounded-xl bg-haven-success-soft/40 border border-haven-success-border/60 space-y-1">
              <span className="text-[11px] font-semibold text-haven-success uppercase tracking-wider block">
                Resolved (This Month)
              </span>
              <div className="text-2xl font-bold text-haven-success">
                {MOCK_INCIDENT_STATS.resolvedThisMonth}
              </div>
              <span className="text-[10px] text-haven-success/80">Closed with corrective action</span>
            </div>
          </div>

          {/* Grid Split: Category Recharts Chart & Recent Incident List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 5 Cols: Category Distribution Chart */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-haven-slate-500">
                <span className="font-semibold text-haven-slate-900">Event Breakdown by Category</span>
                <span className="text-[11px] font-medium text-haven-slate-500">14 Resolved vs 3 Active Open</span>
              </div>

              <div
                className="h-64 w-full bg-haven-slate-50/50 rounded-2xl p-2 border border-haven-border-light"
                role="region"
                aria-label="Incident category comparison showing 14 resolved and 3 active open incidents across 5 categories"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={MOCK_INCIDENT_CATEGORIES_CHART}
                    margin={{ top: 10, right: 15, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E6ECF4" horizontal={false} />
                    <XAxis type="number" stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
                    <YAxis
                      dataKey="category"
                      type="category"
                      stroke="#64748B"
                      fontSize={11}
                      tickLine={false}
                      width={105}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E6ECF4',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgba(23, 43, 77, 0.1)',
                        fontSize: '12px',
                      }}
                      labelFormatter={(label) => `Category: ${String(label ?? '')}`}
                      formatter={(value: unknown, name: unknown) => {
                        const num = typeof value === 'number' ? value : 0;
                        const status = name === 'resolved' || name === 'Resolved Incidents' ? 'Resolved' : 'Active / Open';
                        return [`${num} incident${num === 1 ? '' : 's'}`, status];
                      }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                    />
                    <Bar dataKey="resolved" name="Resolved Incidents" fill="#2457C5" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="open" name="Active / Open Incidents" fill="#C84D45" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right 7 Cols: Recent Incidents List */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between text-xs text-haven-slate-500">
                <span className="font-semibold text-haven-slate-900">Recent Operational Events</span>
                <span className="text-[11px]">Click row to inspect clinical notes</span>
              </div>

              <div className="space-y-2.5">
                {MOCK_INCIDENTS_LIST.map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className={cn(
                      'p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left',
                      inc.severity === 'high'
                        ? 'bg-haven-danger-soft/20 border-haven-danger-border hover:border-haven-danger'
                        : 'bg-white border-haven-border hover:border-haven-blue-500/40 hover:bg-haven-blue-50/20'
                    )}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-xs text-haven-slate-900">
                          {inc.reference}
                        </span>
                        <Badge
                          variant={
                            inc.severity === 'high'
                              ? 'danger'
                              : inc.severity === 'medium'
                              ? 'warning'
                              : 'secondary'
                          }
                          size="sm"
                          dot
                        >
                          {inc.severity.toUpperCase()}
                        </Badge>
                        <span className="text-[11px] text-haven-slate-500">
                          {inc.category}
                        </span>
                        <span className="text-[11px] text-haven-slate-500 ml-auto hidden sm:inline">
                          {inc.occurredAt}
                        </span>
                      </div>

                      <p className="text-xs text-haven-slate-700 truncate font-medium">
                        {inc.residentName} · {inc.room}
                      </p>

                      <p className="text-[11px] text-haven-slate-500 flex items-center gap-1.5">
                        <Stethoscope className="w-3 h-3 text-haven-blue-700 shrink-0" />
                        <span className="truncate">{inc.reviewState}</span>
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-haven-slate-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* INCIDENT DETAIL MODAL */}
      <Dialog open={!!selectedIncident} onOpenChange={(open) => !open && setSelectedIncident(null)}>
        <DialogContent maxWidth="md">
          {selectedIncident && (
            <div>
              <DialogHeader>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={selectedIncident.severity === 'high' ? 'danger' : 'warning'}
                      size="sm"
                      dot
                    >
                      {selectedIncident.severity.toUpperCase()} SEVERITY
                    </Badge>
                    <span className="text-xs font-mono text-haven-slate-500">
                      {selectedIncident.reference}
                    </span>
                  </div>
                  <DialogTitle>{selectedIncident.category} Event — {selectedIncident.residentName}</DialogTitle>
                  <DialogDescription>
                    Occurred {selectedIncident.occurredAt} · Location: {selectedIncident.room}
                  </DialogDescription>
                </div>
              </DialogHeader>

              <div className="py-4 space-y-3.5 text-xs">
                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                  <span className="font-bold text-haven-slate-900 block">Incident Circumstances</span>
                  <p className="text-haven-slate-700 leading-relaxed">{selectedIncident.summary}</p>
                </div>

                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                  <span className="font-bold text-haven-slate-900 block">Immediate Actions &amp; Vitals</span>
                  <p className="text-haven-slate-700 leading-relaxed">{selectedIncident.notes}</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-haven-blue-50/60 border border-haven-border text-haven-slate-500">
                  <span>Reporter: <strong className="text-haven-slate-900">{selectedIncident.reporter}</strong></span>
                  <span>Clinical State: <strong className="text-haven-blue-700">{selectedIncident.reviewState}</strong></span>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">
                    Close Details
                  </Button>
                </DialogClose>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedIncident(null);
                    navigate('/admin/incidents');
                  }}
                >
                  Open Full Incident Record →
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
