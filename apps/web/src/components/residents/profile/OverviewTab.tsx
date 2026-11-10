import {
  AlertTriangle,
  Building,
  Clock,
  ShieldCheck,
  Stethoscope,
  Utensils,
  Accessibility,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface OverviewTabProps {
  resident: FullResident;
}

export function OverviewTab({ resident }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Top Banner: Important Alerts requiring Administrative Attention */}
      {resident.alerts.length > 0 && (
        <div className="p-4 rounded-2xl bg-haven-danger-soft/40 border border-haven-danger-border/70 space-y-2.5">
          <div className="flex items-center gap-2 text-haven-danger font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Important Operational &amp; Clinical Alerts ({resident.alerts.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {resident.alerts.map((alert, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-haven-danger-border/60 text-haven-slate-800"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-haven-danger shrink-0 mt-1.5" />
                <span className="font-medium leading-relaxed">{alert}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid: Placement & Care Profile on Left, Care Team & Attention on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Current Placement & Care Classification */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-haven-blue-700" />
                  <CardTitle as="h3" className="text-base">Current Placement &amp; Facility Context</CardTitle>
                </div>
                <Badge variant="default" size="sm">
                  {resident.careLevel}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-0.5">
                  <span className="text-[10px] text-haven-slate-500 uppercase font-semibold">Facility Wing</span>
                  <div className="font-bold text-haven-slate-900">{resident.placement.wing}</div>
                </div>

                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-0.5">
                  <span className="text-[10px] text-haven-slate-500 uppercase font-semibold">Room &amp; Bed</span>
                  <div className="font-bold text-haven-slate-900">{resident.placement.room} · {resident.placement.bed}</div>
                </div>

                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-0.5">
                  <span className="text-[10px] text-haven-slate-500 uppercase font-semibold">Room Type</span>
                  <div className="font-bold text-haven-slate-900">{resident.placement.roomType}</div>
                </div>
              </div>

              {/* Functional Protocols */}
              <div className="space-y-2 border-t border-haven-border-light pt-3">
                <div className="flex items-start gap-2.5">
                  <Accessibility className="w-4 h-4 text-haven-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-haven-slate-900 block">Mobility &amp; Physical Support</span>
                    <p className="text-haven-slate-600 leading-relaxed">{resident.mobilityStatus}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Utensils className="w-4 h-4 text-haven-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-haven-slate-900 block">Dietary &amp; Swallowing Protocol</span>
                    <p className="text-haven-slate-600 leading-relaxed">{resident.dietaryProtocol}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card: Recent Activity Stream */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Recent Resident Activity &amp; Logs</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3 text-xs">
              {resident.attendanceLogs.length > 0 ? (
                resident.attendanceLogs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-haven-slate-50/70 border border-haven-border-light"
                  >
                    <div className="w-2 h-2 rounded-full bg-haven-blue-700 shrink-0 mt-1.5" />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-haven-slate-900">{log.location}</span>
                        <span className="text-[11px] text-haven-slate-500 font-mono">{log.time}</span>
                      </div>
                      <p className="text-haven-slate-600">{log.notes}</p>
                      <span className="text-[10px] text-haven-slate-400 block pt-0.5">
                        Verified by {log.verifiedBy}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-haven-slate-500 bg-haven-slate-50 rounded-xl">
                  No recent routine exceptions logged today.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right 5 Columns */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Assigned Care Team */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Assigned Care Team</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-haven-blue-50/50 border border-haven-blue-500/20 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-haven-blue-700 block">
                  Lead Attending Physician
                </span>
                <div className="font-bold text-sm text-haven-slate-900">
                  {resident.careTeam.primaryDoctor.name}
                </div>
                <p className="text-haven-slate-600">
                  {resident.careTeam.primaryDoctor.specialty} · License {resident.careTeam.primaryDoctor.license}
                </p>
                <span className="text-[11px] font-mono text-haven-slate-500 block pt-0.5">
                  Direct Line: {resident.careTeam.primaryDoctor.phone}
                </span>
              </div>

              {resident.careTeam.visitingSpecialist && (
                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-haven-slate-500 block">
                    Visiting Specialist
                  </span>
                  <div className="font-bold text-haven-slate-900">
                    {resident.careTeam.visitingSpecialist.name}
                  </div>
                  <p className="text-haven-slate-500">
                    {resident.careTeam.visitingSpecialist.specialty} ({resident.careTeam.visitingSpecialist.hospital})
                  </p>
                </div>
              )}

              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-haven-slate-500 block">
                  Day Shift Primary Nurse
                </span>
                <div className="font-bold text-haven-slate-900">
                  {resident.careTeam.primaryNurse.name}
                </div>
                <p className="text-haven-slate-500">{resident.careTeam.primaryNurse.role}</p>
              </div>

              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-haven-slate-500 block">
                  Caregiver Cluster
                </span>
                <div className="font-bold text-haven-slate-900">
                  {resident.careTeam.caregiverTeam}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card: Administrative Action Items */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-haven-navy-900" />
                <CardTitle as="h3" className="text-base">Administrative Oversight</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-haven-slate-50 border border-haven-border">
                <CheckCircle2 className="w-4 h-4 text-haven-success shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-haven-slate-900 block">Active Residency Agreement</span>
                  <span className="text-[11px] text-haven-slate-500">Signed and verified in digital vault.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-haven-slate-50 border border-haven-border">
                <CheckCircle2 className="w-4 h-4 text-haven-success shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-haven-slate-900 block">Advance Care Planning &amp; Directives</span>
                  <span className="text-[11px] text-haven-slate-500">
                    {resident.dnrStatus ? 'Documented Resuscitation Preferences (DNR) confirmed by physician directive.' : 'Standard resuscitation preferences documented.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-haven-slate-50 border border-haven-border">
                <CheckCircle2 className="w-4 h-4 text-haven-success shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-haven-slate-900 block">Health Insurance &amp; TPA Payer Status</span>
                  <span className="text-[11px] text-haven-slate-500">Senior Healthcare Cover &amp; Family TPA verified active.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
