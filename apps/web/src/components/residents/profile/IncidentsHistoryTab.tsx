import { ShieldAlert, ArrowRightLeft, Stethoscope, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface IncidentsHistoryTabProps {
  resident: FullResident;
}

export function IncidentsHistoryTab({ resident }: IncidentsHistoryTabProps) {
  return (
    <div className="space-y-6">
      {/* 1. Incident History */}
      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-haven-danger" />
              <CardTitle as="h3" className="text-base">Documented Facility Incidents</CardTitle>
            </div>
            <Badge variant={resident.incidents.length > 0 ? 'danger' : 'secondary'} size="sm">
              {resident.incidents.length} Records
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-5 space-y-3.5 text-xs">
          {resident.incidents.length > 0 ? (
            resident.incidents.map((inc) => (
              <div
                key={inc.id}
                className="p-4 rounded-2xl bg-white border border-haven-danger-border/70 shadow-haven-sm space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-haven-border-light pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-haven-slate-900 text-sm">
                      {inc.reference}
                    </span>
                    <Badge variant={inc.severity === 'high' ? 'danger' : 'warning'} size="sm" dot>
                      {inc.severity.toUpperCase()} SEVERITY
                    </Badge>
                    <span className="font-semibold text-haven-slate-700">
                      Category: {inc.category}
                    </span>
                  </div>

                  <span className="text-[11px] text-haven-slate-500 font-mono">
                    Occurred: {inc.date}
                  </span>
                </div>

                <p className="text-haven-slate-700 leading-relaxed bg-haven-slate-50 p-2.5 rounded-xl border border-haven-border-light">
                  {inc.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-haven-slate-500 pt-1">
                  <span>Reporter: <strong className="text-haven-slate-900">{inc.reporter}</strong></span>
                  <span className="flex items-center gap-1.5 text-haven-blue-700 font-medium">
                    <Stethoscope className="w-3.5 h-3.5" />
                    Review State: {inc.status === 'clinical_review' ? 'Pending Physician Sign-Off' : inc.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-haven-slate-500 bg-haven-slate-50 rounded-2xl border border-haven-border">
              <CheckCircle2 className="w-8 h-8 text-haven-success mx-auto mb-2" />
              <p className="font-semibold text-haven-slate-700">Zero open incidents</p>
              <p>Resident has had no critical or high severity safety incidents logged during residence.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Room Placement & Transfer History Audit */}
      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-haven-blue-700" />
            <CardTitle as="h3" className="text-base">Placement &amp; Room Transfer Audit Trail</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-3 text-xs">
          {resident.transferHistory.length > 0 ? (
            resident.transferHistory.map((tr) => (
              <div
                key={tr.id}
                className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-haven-slate-900">
                    <span>{tr.from}</span>
                    <span className="text-haven-blue-700">→</span>
                    <span className="text-haven-blue-700">{tr.to}</span>
                  </div>
                  <span className="font-mono text-haven-slate-500">{tr.date}</span>
                </div>

                <p className="text-haven-slate-600 leading-relaxed">{tr.reason}</p>

                <span className="text-[10px] text-haven-slate-400 block pt-0.5">
                  Authorized by: <strong className="text-haven-slate-700">{tr.authorizedBy}</strong>
                </span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-haven-slate-500 bg-haven-slate-50 rounded-xl">
              Resident remains in original admission placement ({resident.placement.room}, {resident.placement.wing}). No transfers requested.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
