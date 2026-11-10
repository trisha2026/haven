import { useNavigate } from 'react-router';
import {
  Users,
  BedDouble,
  Pill,
  ClockAlert,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import {
  MOCK_BED_CONFIG,
  MOCK_MEDICATION_SUMMARY,
} from '../../mock/adminDashboard.ts';

export function AdminKpiGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* CARD 1: TOTAL RESIDENTS */}
      <Card
        variant="default"
        padding="sm"
        interactive
        onClick={() => navigate('/admin/residents')}
        className="group hover:border-haven-blue-500/40 transition-all"
      >
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
              Total Residents
            </span>
            <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center group-hover:bg-haven-blue-700 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-haven-slate-900 tracking-tight">
              {MOCK_BED_CONFIG.occupiedBeds}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-haven-success bg-haven-success-soft px-2 py-0.5 rounded-full border border-haven-success-border">
              <TrendingUp className="w-3 h-3" />
              +2 this month
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-haven-border-light text-[11px] text-haven-slate-500">
            <span>58 registered · 4 care tiers</span>
            <span className="inline-flex items-center gap-0.5 text-haven-blue-700 font-medium group-hover:underline">
              View roster
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>

      {/* CARD 2: OCCUPANCY */}
      <Card
        variant="default"
        padding="sm"
        interactive
        onClick={() => navigate('/admin/rooms')}
        className="group hover:border-haven-blue-500/40 transition-all"
      >
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
              Occupancy Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center group-hover:bg-haven-blue-700 group-hover:text-white transition-colors">
              <BedDouble className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-haven-slate-900 tracking-tight">
              {MOCK_BED_CONFIG.occupancyRate}%
            </span>
            <Badge variant="success" size="sm">
              Optimal
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-haven-border-light text-[11px] text-haven-slate-500">
            <span>
              {MOCK_BED_CONFIG.occupiedBeds} of {MOCK_BED_CONFIG.operationalBeds} beds ({MOCK_BED_CONFIG.availableBeds} available)
            </span>
            <span className="inline-flex items-center gap-0.5 text-haven-blue-700 font-medium group-hover:underline">
              Rooms &amp; Beds
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>

      {/* CARD 3: MEDICATION COMPLETION */}
      <Card
        variant="default"
        padding="sm"
        interactive
        onClick={() => navigate('/admin/medications')}
        className="group hover:border-haven-blue-500/40 transition-all"
      >
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
              Medication Completion
            </span>
            <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center group-hover:bg-haven-blue-700 group-hover:text-white transition-colors">
              <Pill className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-haven-blue-700 tracking-tight">
              {MOCK_MEDICATION_SUMMARY.completionRate}%
            </span>
            <Badge variant="info" size="sm">
              Today
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-haven-border-light text-[11px] text-haven-slate-500">
            <span>
              {MOCK_MEDICATION_SUMMARY.administered} of {MOCK_MEDICATION_SUMMARY.eligibleScheduled} doses logged
            </span>
            <span className="inline-flex items-center gap-0.5 text-haven-blue-700 font-medium group-hover:underline">
              Oversight
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>

      {/* CARD 4: OVERDUE DOSES */}
      <Card
        variant="default"
        padding="sm"
        interactive
        onClick={() => navigate('/admin/medications')}
        className="group hover:border-haven-danger/40 transition-all"
      >
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
              Overdue Doses
            </span>
            <div className="w-8 h-8 rounded-lg bg-haven-danger-soft text-haven-danger flex items-center justify-center group-hover:bg-haven-danger group-hover:text-white transition-colors">
              <ClockAlert className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-haven-danger tracking-tight">
              {MOCK_MEDICATION_SUMMARY.overdue}
            </span>
            <Badge variant="danger" size="sm" dot>
              Action Due
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-haven-border-light text-[11px] text-haven-slate-500">
            <span className="truncate">Requires follow-up review</span>
            <span className="inline-flex items-center gap-0.5 text-haven-danger font-medium group-hover:underline">
              Inspect
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
