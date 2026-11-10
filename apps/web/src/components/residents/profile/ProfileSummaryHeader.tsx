import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  ArrowRightLeft,
  ShieldCheck,
  Edit,
  MoreVertical,
  Printer,
  FileDown,
  UserCheck,
  MapPin,
  Calendar,
  Stethoscope,
  Users,
  AlertTriangle,
} from 'lucide-react';
import { Avatar } from '../../ui/Avatar.tsx';
import { Badge } from '../../ui/Badge.tsx';
import { Button } from '../../ui/Button.tsx';
import type { FullResident, ResidentCareClassification, ResidentStatus } from '../../../types/resident.ts';

export interface ProfileSummaryHeaderProps {
  resident: FullResident;
  onOpenEditModal: () => void;
  onOpenTransferModal: () => void;
  onOpenChangeCareModal: () => void;
}

export function ProfileSummaryHeader({
  resident,
  onOpenEditModal,
  onOpenTransferModal,
  onOpenChangeCareModal,
}: ProfileSummaryHeaderProps) {
  const navigate = useNavigate();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setIsMoreMenuOpen(false);
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const getStatusBadge = (status: ResidentStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm" dot>In Residence (Active)</Badge>;
      case 'in-clinic':
        return <Badge variant="danger" size="sm" dot>In Clinic Assessment</Badge>;
      case 'with-family':
        return <Badge variant="warning" size="sm" dot>With Family (Leave)</Badge>;
      case 'temporary-leave':
        return <Badge variant="secondary" size="sm" dot>Day Pass Active</Badge>;
      case 'hospital':
        return <Badge variant="danger" size="sm" dot>Hospital Care</Badge>;
      case 'resting':
        return <Badge variant="secondary" size="sm" dot>Resting in Quarters</Badge>;
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
        return <Badge variant="info" size="sm">Independent Living</Badge>;
    }
  };

  return (
    <div className="space-y-3">
      {/* Back Button & Breadcrumb Context */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/residents')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="text-haven-slate-500 hover:text-haven-slate-900 -ml-2"
        >
          Back to Residents Directory
        </Button>

        <span className="text-xs text-haven-slate-500">
          Facility Resident Dossier · Last verified today
        </span>
      </div>

      {actionNotice && (
        <div className="p-3 rounded-xl bg-haven-blue-100 text-haven-blue-700 border border-haven-blue-500/20 text-xs flex items-center justify-between">
          <span>{actionNotice}</span>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="text-haven-blue-700 font-bold ml-2 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Persistent Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-haven-border shadow-haven-card relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-haven-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* Left Block: Avatar + Name + Core Metadata */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar
              initials={resident.fullName
                .split(' ')
                .map((n) => n[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')}
              size="lg"
              className="bg-haven-blue-100 text-haven-blue-700 font-bold text-lg ring-4 ring-white shadow-haven-sm shrink-0"
            />

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-haven-navy-900 tracking-tight">
                  {resident.fullName}
                </h1>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-haven-slate-100 text-haven-slate-700 border border-haven-border">
                  {resident.id}
                </span>
                {getStatusBadge(resident.status)}
                {getCareBadge(resident.careLevel)}
              </div>

              {/* Sub-identity row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-haven-slate-500">
                {resident.preferredName && (
                  <span>
                    Preferred: <strong className="text-haven-slate-700">&quot;{resident.preferredName}&quot;</strong>
                  </span>
                )}
                <span>Age {resident.age} ({resident.gender})</span>
                <span>DOB: {resident.dateOfBirth}</span>
                {resident.dnrStatus && (
                  <span className="inline-flex items-center gap-1 text-haven-danger font-bold bg-haven-danger-soft px-1.5 py-0.5 rounded">
                    Documented Resuscitation Preferences
                  </span>
                )}
              </div>

              {/* Placement & Doctor pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-haven-slate-50 text-haven-slate-700 border border-haven-border text-xs">
                  <MapPin className="w-3.5 h-3.5 text-haven-blue-700" />
                  <strong>{resident.placement.room} · {resident.placement.bed}</strong> ({resident.placement.wing})
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-haven-slate-50 text-haven-slate-700 border border-haven-border text-xs">
                  <Calendar className="w-3.5 h-3.5 text-haven-slate-500" />
                  Admitted: {resident.placement.moveInDate}
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-haven-slate-50 text-haven-slate-700 border border-haven-border text-xs">
                  <Stethoscope className="w-3.5 h-3.5 text-haven-blue-700" />
                  {resident.careTeam.primaryDoctor.name}
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-haven-slate-50 text-haven-slate-700 border border-haven-border text-xs">
                  <Users className="w-3.5 h-3.5 text-haven-slate-500" />
                  {resident.careTeam.caregiverTeam}
                </span>
              </div>
            </div>
          </div>

          {/* Right Block: Quick Actions Cluster */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 relative">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenEditModal}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit Details
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenTransferModal}
              leftIcon={<ArrowRightLeft className="w-3.5 h-3.5" />}
            >
              Transfer Room
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChangeCareModal}
              leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
            >
              Change Care Level
            </Button>

            {/* More Actions dropdown toggle */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="px-2"
                aria-label="More profile actions"
              >
                <MoreVertical className="w-4 h-4 text-haven-slate-600" />
              </Button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 top-10 w-56 rounded-2xl bg-white border border-haven-border shadow-haven-lg py-1.5 z-40 text-left text-xs">
                  <button
                    type="button"
                    onClick={() => handleAction('Resident Face Sheet sent to facility printer.')}
                    className="w-full px-3.5 py-2 text-haven-slate-700 hover:bg-haven-blue-50/70 hover:text-haven-blue-700 flex items-center gap-2.5"
                  >
                    <Printer className="w-4 h-4 text-haven-slate-500" />
                    <span>Print Resident Face Sheet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAction('Medical Dossier PDF exported successfully.')}
                    className="w-full px-3.5 py-2 text-haven-slate-700 hover:bg-haven-blue-50/70 hover:text-haven-blue-700 flex items-center gap-2.5"
                  >
                    <FileDown className="w-4 h-4 text-haven-slate-500" />
                    <span>Export Medical Dossier (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAction('Visitor check-in entry staged for front desk.')}
                    className="w-full px-3.5 py-2 text-haven-slate-700 hover:bg-haven-blue-50/70 hover:text-haven-blue-700 flex items-center gap-2.5"
                  >
                    <UserCheck className="w-4 h-4 text-haven-slate-500" />
                    <span>Log Family Visitor Arrival</span>
                  </button>

                  <div className="border-t border-haven-border-light my-1" />

                  <button
                    type="button"
                    onClick={() => handleAction('Temporary leave authorization pass logged.')}
                    className="w-full px-3.5 py-2 text-haven-warning hover:bg-haven-warning-soft flex items-center gap-2.5 font-medium"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Authorize Temporary Pass</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
