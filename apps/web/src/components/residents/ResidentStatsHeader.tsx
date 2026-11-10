import { Users, Stethoscope, Brain, HeartHandshake } from 'lucide-react';
import { Card } from '../ui/Card.tsx';
import type { FullResident } from '../../types/resident.ts';

export interface ResidentStatsHeaderProps {
  residents: FullResident[];
}

export function ResidentStatsHeader({ residents }: ResidentStatsHeaderProps) {
  const totalCount = residents.length;
  const skilledCount = residents.filter((r) => r.careLevel === 'Skilled Nursing').length;
  const memoryCount = residents.filter((r) => r.careLevel === 'Memory Care').length;
  const assistedAndIndependentCount = residents.filter(
    (r) => r.careLevel === 'Assisted Living' || r.careLevel === 'Independent Living'
  ).length;
  const offSiteOrClinicCount = residents.filter((r) => r.status !== 'active').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      <Card variant="default" padding="md" className="shadow-haven-card">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
              Total Residents
            </span>
            <div className="text-2xl font-bold text-haven-navy-900">{totalCount}</div>
            <span className="text-[10px] text-haven-slate-500">Across 4 facility wings</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </Card>

      <Card variant="default" padding="md" className="shadow-haven-card">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-haven-danger uppercase tracking-wider block">
              Skilled Nursing
            </span>
            <div className="text-2xl font-bold text-haven-danger">{skilledCount}</div>
            <span className="text-[10px] text-haven-slate-500">Intensive clinical care</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-haven-danger-soft text-haven-danger flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
        </div>
      </Card>

      <Card variant="default" padding="md" className="shadow-haven-card">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-haven-warning uppercase tracking-wider block">
              Memory Care
            </span>
            <div className="text-2xl font-bold text-haven-warning">{memoryCount}</div>
            <span className="text-[10px] text-haven-slate-500">Secured Sunrise Pavilion</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-haven-warning-soft text-haven-warning flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5" />
          </div>
        </div>
      </Card>

      <Card variant="default" padding="md" className="shadow-haven-card">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-haven-blue-700 uppercase tracking-wider block">
              Assisted &amp; Independent
            </span>
            <div className="text-2xl font-bold text-haven-blue-700">{assistedAndIndependentCount}</div>
            <span className="text-[10px] text-haven-slate-500">
              {offSiteOrClinicCount} off-site / in clinic today
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
        </div>
      </Card>
    </div>
  );
}
