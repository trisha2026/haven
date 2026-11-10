import { useNavigate } from 'react-router';
import { Eye, ArrowRightLeft, ShieldCheck, MapPin, Stethoscope, HeartPulse } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card.tsx';
import { Avatar } from '../ui/Avatar.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import type { FullResident, ResidentCareClassification, ResidentStatus } from '../../types/resident.ts';

export interface ResidentGridProps {
  residents: FullResident[];
  onOpenTransferModal: (resident: FullResident) => void;
  onOpenChangeCareModal: (resident: FullResident) => void;
}

export function ResidentGrid({
  residents,
  onOpenTransferModal,
  onOpenChangeCareModal,
}: ResidentGridProps) {
  const navigate = useNavigate();

  const getStatusBadge = (status: ResidentStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm" dot>In Residence</Badge>;
      case 'in-clinic':
        return <Badge variant="danger" size="sm" dot>In Clinic</Badge>;
      case 'with-family':
        return <Badge variant="warning" size="sm" dot>With Family</Badge>;
      case 'temporary-leave':
        return <Badge variant="secondary" size="sm" dot>Day Pass</Badge>;
      case 'hospital':
        return <Badge variant="danger" size="sm" dot>Hospital</Badge>;
      case 'resting':
        return <Badge variant="secondary" size="sm" dot>Resting</Badge>;
      default:
        return <Badge variant="secondary" size="sm">Active</Badge>;
    }
  };

  const getCareBadge = (careLevel: ResidentCareClassification) => {
    switch (careLevel) {
      case 'Skilled Nursing':
        return <Badge variant="danger" size="sm">Skilled Nursing</Badge>;
      case 'Memory Care':
        return <Badge variant="warning" size="sm">Memory Care</Badge>;
      case 'Assisted Living':
        return <Badge variant="default" size="sm">Assisted Living</Badge>;
      case 'Independent Living':
        return <Badge variant="info" size="sm">Independent</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {residents.map((resident) => (
        <Card
          key={resident.id}
          variant="default"
          padding="none"
          className="shadow-haven-card hover:border-haven-blue-500/50 hover:shadow-haven-md transition-all flex flex-col justify-between overflow-hidden group"
        >
          {/* Header */}
          <div className="p-4 border-b border-haven-border-light space-y-3">
            <div className="flex items-start justify-between gap-2">
              <Avatar
                initials={resident.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')}
                size="lg"
                className="bg-haven-blue-100 text-haven-blue-700 font-bold shrink-0"
              />
              <div className="flex flex-col items-end gap-1">
                {getStatusBadge(resident.status)}
                <span className="text-[11px] font-mono text-haven-slate-400">
                  {resident.id}
                </span>
              </div>
            </div>

            <div>
              <h4
                onClick={() => navigate(`/admin/residents/${resident.id}`)}
                className="font-bold text-sm text-haven-slate-900 group-hover:text-haven-blue-700 transition-colors cursor-pointer"
              >
                {resident.fullName}
              </h4>
              <p className="text-xs text-haven-slate-500">
                Age {resident.age} · {resident.gender}
              </p>
            </div>
          </div>

          {/* Details Body */}
          <CardContent className="p-4 space-y-2.5 text-xs flex-1">
            {/* Placement */}
            <div className="flex items-center gap-2 text-haven-slate-700">
              <MapPin className="w-3.5 h-3.5 text-haven-blue-700 shrink-0" />
              <span className="font-semibold text-haven-slate-900 truncate">
                {resident.placement.room} · {resident.placement.wing}
              </span>
            </div>

            {/* Classification */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-haven-slate-500">Classification</span>
              {getCareBadge(resident.careLevel)}
            </div>

            {/* Doctor */}
            <div className="flex items-start gap-2 text-haven-slate-500 border-t border-haven-border-light pt-2">
              <Stethoscope className="w-3.5 h-3.5 text-haven-slate-400 shrink-0 mt-0.5" />
              <div className="truncate">
                <span className="text-haven-slate-900 font-medium block truncate">
                  {resident.careTeam.primaryDoctor.name}
                </span>
                <span className="text-[10px] text-haven-slate-400 block truncate">
                  {resident.careTeam.primaryDoctor.specialty}
                </span>
              </div>
            </div>

            {/* Alerts pill if any */}
            {resident.alerts.length > 0 && (
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] text-haven-danger bg-haven-danger-soft px-2 py-0.5 rounded-full font-medium truncate max-w-full">
                  <HeartPulse className="w-3 h-3 shrink-0" />
                  <span className="truncate">{resident.alerts[0]}</span>
                </span>
              </div>
            )}
          </CardContent>

          {/* Footer Actions */}
          <CardFooter className="p-3 bg-haven-slate-50 border-t border-haven-border-light flex items-center justify-between gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenTransferModal(resident)}
              className="text-[11px] px-2"
              title="Transfer Room"
            >
              <ArrowRightLeft className="w-3 h-3" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChangeCareModal(resident)}
              className="text-[11px] px-2"
              title="Change Care Level"
            >
              <ShieldCheck className="w-3 h-3" />
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/admin/residents/${resident.id}`)}
              leftIcon={<Eye className="w-3.5 h-3.5" />}
              className="flex-1 text-xs"
            >
              Profile
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
