import { useNavigate } from 'react-router';
import {
  FileClock,
  ArrowRight,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import { Avatar } from '../ui/Avatar.tsx';
import {
  MOCK_FACILITY_ACTIVITIES,
} from '../../mock/adminDashboard.ts';

export function RecentFacilityActivity() {
  const navigate = useNavigate();

  return (
    <Card variant="default" padding="lg" className="shadow-haven-card">
      {/* Header */}
      <CardHeader className="pb-4 border-b border-haven-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center shrink-0">
                <FileClock className="w-4 h-4" />
              </div>
              <CardTitle as="h3" className="text-lg">Recent Facility Activity Stream</CardTitle>
            </div>
            <CardDescription>
              Chronological log of clinical administrations, staff clock-ins, safety events, and access changes.
            </CardDescription>
          </div>

          <Button
            variant="ghost"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => navigate('/admin/audit-trail')}
          >
            Full Audit Trail
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-4">
        <div className="divide-y divide-haven-border-light">
          {MOCK_FACILITY_ACTIVITIES.map((item) => (
            <div
              key={item.id}
              className="py-3.5 flex items-start gap-3.5 hover:bg-haven-slate-50/60 px-2 rounded-xl transition-colors"
            >
              <Avatar
                initials={item.actor.avatarInitials}
                size="md"
              />

              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-xs text-haven-slate-900">
                    {item.actor.name}
                  </span>
                  <span className="text-[11px] text-haven-slate-500">
                    ({item.actor.role})
                  </span>
                  <span className="text-xs text-haven-slate-700">
                    {item.action}
                  </span>
                  <strong className="text-xs text-haven-slate-900 font-semibold truncate">
                    {item.target}
                  </strong>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-haven-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-haven-slate-500" />
                    <span>{item.timestamp}</span>
                  </span>
                  <span>·</span>
                  <span className="capitalize">Module: {item.category}</span>
                </div>
              </div>

              {item.statusBadge && (
                <div className="shrink-0 self-center">
                  <Badge variant={item.statusBadge.variant} size="sm">
                    {item.statusBadge.label}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-haven-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-haven-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-haven-success shrink-0" />
            <span>Cryptographic audit hashes recorded in compliance with Digital Personal Data Protection (DPDP) and clinical audit standards.</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/audit-trail')}
          >
            Export Regulatory Report →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
