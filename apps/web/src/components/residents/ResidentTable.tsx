import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  ArrowRightLeft,
  ShieldCheck,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/Table.tsx';
import { Avatar } from '../ui/Avatar.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import type { FullResident, ResidentCareClassification, ResidentStatus } from '../../types/resident.ts';

export interface ResidentTableProps {
  residents: FullResident[];
  onOpenTransferModal: (resident: FullResident) => void;
  onOpenChangeCareModal: (resident: FullResident) => void;
}

type SortField = 'fullName' | 'room' | 'careLevel' | 'admissionDate' | 'status';
type SortDirection = 'asc' | 'desc';

export function ResidentTable({
  residents,
  onOpenTransferModal,
  onOpenChangeCareModal,
}: ResidentTableProps) {
  const navigate = useNavigate();

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('fullName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Quick action dropdown menu state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort logic
  const sortedResidents = [...residents].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'fullName') {
      comparison = a.fullName.localeCompare(b.fullName);
    } else if (sortField === 'room') {
      comparison = a.placement.room.localeCompare(b.placement.room);
    } else if (sortField === 'careLevel') {
      comparison = a.careLevel.localeCompare(b.careLevel);
    } else if (sortField === 'admissionDate') {
      comparison = a.placement.moveInDate.localeCompare(b.placement.moveInDate);
    } else if (sortField === 'status') {
      comparison = a.status.localeCompare(b.status);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedResidents.length / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedResidents = sortedResidents.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

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
    <div className="space-y-4">
      <div className="relative overflow-x-auto rounded-2xl border border-haven-border bg-white shadow-haven-card">
        <Table>
          <TableHeader>
            <TableRow>
              {/* 1. Resident */}
              <TableHead>
                <button
                  type="button"
                  onClick={() => handleSort('fullName')}
                  className="flex items-center gap-1.5 font-semibold text-haven-slate-900 cursor-pointer hover:text-haven-blue-700 transition-colors"
                >
                  <span>Resident</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-haven-slate-400" />
                </button>
              </TableHead>

              {/* 2. Room & Wing */}
              <TableHead>
                <button
                  type="button"
                  onClick={() => handleSort('room')}
                  className="flex items-center gap-1.5 font-semibold text-haven-slate-900 cursor-pointer hover:text-haven-blue-700 transition-colors"
                >
                  <span>Room &amp; Wing</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-haven-slate-400" />
                </button>
              </TableHead>

              {/* 3. Care Classification */}
              <TableHead>
                <button
                  type="button"
                  onClick={() => handleSort('careLevel')}
                  className="flex items-center gap-1.5 font-semibold text-haven-slate-900 cursor-pointer hover:text-haven-blue-700 transition-colors"
                >
                  <span>Care Classification</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-haven-slate-400" />
                </button>
              </TableHead>

              {/* 4. Assigned Doctor */}
              <TableHead>Assigned Doctor</TableHead>

              {/* 5. Caregiver Team */}
              <TableHead>Caregiver Team</TableHead>

              {/* 6. Admission Date */}
              <TableHead>
                <button
                  type="button"
                  onClick={() => handleSort('admissionDate')}
                  className="flex items-center gap-1.5 font-semibold text-haven-slate-900 cursor-pointer hover:text-haven-blue-700 transition-colors"
                >
                  <span>Admission Date</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-haven-slate-400" />
                </button>
              </TableHead>

              {/* 7. Status */}
              <TableHead>
                <button
                  type="button"
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1.5 font-semibold text-haven-slate-900 cursor-pointer hover:text-haven-blue-700 transition-colors"
                >
                  <span>Resident Status</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-haven-slate-400" />
                </button>
              </TableHead>

              {/* 8. Actions */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedResidents.map((resident) => (
              <TableRow
                key={resident.id}
                className="cursor-pointer group hover:bg-haven-blue-50/60 transition-colors"
                onClick={() => navigate(`/admin/residents/${resident.id}`)}
              >
                {/* 1. Resident info */}
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={resident.fullName
                        .split(' ')
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')}
                      size="md"
                      className="bg-haven-blue-100 text-haven-blue-700 font-bold"
                    />
                    <div>
                      <span className="font-bold text-sm text-haven-slate-900 group-hover:text-haven-blue-700 transition-colors block">
                        {resident.fullName}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-haven-slate-500 font-mono">
                        <span>{resident.id}</span>
                        {resident.preferredName && (
                          <span className="font-sans font-normal text-haven-slate-400">
                            (&quot;{resident.preferredName}&quot;)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* 2. Room & Wing */}
                <TableCell>
                  <div className="space-y-0.5">
                    <span className="font-semibold text-xs text-haven-slate-900 block">
                      {resident.placement.room} · {resident.placement.bed}
                    </span>
                    <span className="text-[11px] text-haven-slate-500 block">
                      {resident.placement.wing} ({resident.placement.floor})
                    </span>
                  </div>
                </TableCell>

                {/* 3. Care Classification */}
                <TableCell>{getCareBadge(resident.careLevel)}</TableCell>

                {/* 4. Assigned Doctor */}
                <TableCell>
                  <div className="space-y-0.5">
                    <span className="font-medium text-xs text-haven-slate-900 block">
                      {resident.careTeam.primaryDoctor.name}
                    </span>
                    <span className="text-[11px] text-haven-slate-500 block">
                      {resident.careTeam.primaryDoctor.specialty}
                    </span>
                  </div>
                </TableCell>

                {/* 5. Caregiver Team */}
                <TableCell>
                  <div className="space-y-0.5">
                    <span className="text-xs text-haven-slate-700 font-medium block">
                      {resident.careTeam.caregiverTeam}
                    </span>
                    <span className="text-[11px] text-haven-slate-500 block">
                      Nurse: {resident.careTeam.primaryNurse.name}
                    </span>
                  </div>
                </TableCell>

                {/* 6. Admission Date */}
                <TableCell>
                  <span className="text-xs text-haven-slate-600 font-medium">
                    {resident.placement.moveInDate}
                  </span>
                </TableCell>

                {/* 7. Status */}
                <TableCell>{getStatusBadge(resident.status)}</TableCell>

                {/* 8. Actions */}
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1 relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/residents/${resident.id}`)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Profile
                    </Button>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenuId(activeMenuId === resident.id ? null : resident.id)
                      }
                      className="p-1.5 rounded-lg text-haven-slate-500 hover:text-haven-slate-900 hover:bg-haven-slate-100 transition-colors cursor-pointer"
                      aria-label="More actions"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Quick Action Popup Menu */}
                    {activeMenuId === resident.id && (
                      <div className="absolute right-0 top-10 w-48 rounded-xl bg-white border border-haven-border shadow-haven-lg py-1 z-30 text-left">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            navigate(`/admin/residents/${resident.id}`);
                          }}
                          className="w-full px-3 py-2 text-xs font-medium text-haven-slate-700 hover:bg-haven-blue-50/70 hover:text-haven-blue-700 flex items-center gap-2"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Profile</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onOpenTransferModal(resident);
                          }}
                          className="w-full px-3 py-2 text-xs font-medium text-haven-slate-700 hover:bg-haven-blue-50/70 hover:text-haven-blue-700 flex items-center gap-2"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                          <span>Transfer Room</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onOpenChangeCareModal(resident);
                          }}
                          className="w-full px-3 py-2 text-xs font-medium text-haven-slate-700 hover:bg-haven-blue-50/70 hover:text-haven-blue-700 flex items-center gap-2"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Change Care Level</span>
                        </button>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 text-xs text-haven-slate-500">
        <div>
          Showing{' '}
          <strong className="text-haven-slate-900">
            {sortedResidents.length === 0 ? 0 : Math.min((safeCurrentPage - 1) * pageSize + 1, sortedResidents.length)}
          </strong>{' '}
          to{' '}
          <strong className="text-haven-slate-900">
            {Math.min(safeCurrentPage * pageSize, sortedResidents.length)}
          </strong>{' '}
          of <strong className="text-haven-slate-900">{sortedResidents.length}</strong> residents
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage(Math.max(safeCurrentPage - 1, 1))}
            leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
          >
            Previous
          </Button>

          <span className="px-2 font-medium text-haven-slate-700">
            Page {safeCurrentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={safeCurrentPage === totalPages}
            onClick={() => setCurrentPage(Math.min(safeCurrentPage + 1, totalPages))}
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
