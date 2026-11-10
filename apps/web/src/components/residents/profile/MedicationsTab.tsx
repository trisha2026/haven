import { Pill, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import type { FullResident, ResidentMedicationItem } from '../../../types/resident.ts';

export interface MedicationsTabProps {
  resident: FullResident;
}

export function MedicationsTab({ resident }: MedicationsTabProps) {
  const getAdherenceBadge = (status: ResidentMedicationItem['todayAdherence']) => {
    switch (status) {
      case 'administered':
        return (
          <Badge variant="success" size="sm" dot>
            Administered
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" size="sm" dot>
            Pending Next Dose
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="danger" size="sm" dot>
            Overdue Review
          </Badge>
        );
      case 'refused':
        return (
          <Badge variant="secondary" size="sm" dot>
            Refused / Logged
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Ledger Overview Card */}
      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center shrink-0">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <CardTitle as="h3" className="text-base">Active Prescriptions &amp; Administration Schedule</CardTitle>
                <p className="text-xs text-haven-slate-500">
                  Electronic Medication Administration Record (eMAR) — Daily schedule and vault batch reconciliation.
                </p>
              </div>
            </div>

            <Badge variant="default" size="sm">
              {resident.medications.length} Prescriptions Active
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-5 space-y-4">
          {resident.medications.length > 0 ? (
            <div className="space-y-3.5">
              {resident.medications.map((med) => (
                <div
                  key={med.id}
                  className="p-4 rounded-2xl border border-haven-border bg-white shadow-haven-sm hover:border-haven-blue-500/40 transition-colors space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-haven-border-light pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-sm text-haven-slate-900">
                        {med.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-haven-blue-100 text-haven-blue-700 font-bold text-xs">
                        {med.strength}
                      </span>
                      <span className="text-haven-slate-500">· {med.route}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getAdherenceBadge(med.todayAdherence)}
                      <span className="font-mono text-[11px] text-haven-slate-400 bg-haven-slate-100 px-2 py-0.5 rounded">
                        Batch #{med.pharmacyBatch}
                      </span>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-haven-slate-600">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-haven-slate-400 block">Frequency &amp; Times</span>
                      <span className="font-semibold text-haven-slate-900">{med.frequency}</span>
                      <div className="flex items-center gap-1.5 pt-1">
                        {med.timing.map((t, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-haven-slate-50 border border-haven-border font-mono text-[11px] text-haven-slate-700 font-medium"
                          >
                            <Clock className="w-3 h-3 text-haven-slate-400" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-haven-slate-400 block">Prescribing Physician</span>
                      <span className="font-medium text-haven-slate-900">{med.prescribingDoctor}</span>
                      <span className="text-[10px] text-haven-slate-400 block pt-0.5">Prescribed on {med.prescribedDate}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-haven-slate-400 block">Dispensing &amp; Nurse Instructions</span>
                      <p className="text-haven-slate-700 leading-snug">{med.instructions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-haven-slate-50 rounded-2xl border border-haven-border text-haven-slate-500 text-xs">
              <Pill className="w-8 h-8 text-haven-slate-400 mx-auto mb-2" />
              <p className="font-semibold text-haven-slate-700">No active maintenance prescriptions</p>
              <p>Resident has zero active prescription orders staged in the central pharmacy vault.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
