import { useState, useMemo } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { UserPlus, RefreshCw, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { EmptyState } from '../../components/ui/EmptyState.tsx';
import { Skeleton } from '../../components/ui/Skeleton.tsx';
import { ResidentStatsHeader } from '../../components/residents/ResidentStatsHeader.tsx';
import { ResidentFilters } from '../../components/residents/ResidentFilters.tsx';
import { ResidentTable } from '../../components/residents/ResidentTable.tsx';
import { ResidentGrid } from '../../components/residents/ResidentGrid.tsx';
import { AddResidentModal } from '../../components/residents/AddResidentModal.tsx';
import { TransferRoomModal } from '../../components/residents/TransferRoomModal.tsx';
import { ChangeCareLevelModal } from '../../components/residents/ChangeCareLevelModal.tsx';
import { MOCK_FULL_RESIDENTS } from '../../mock/residentsData.ts';
import type { FullResident, ResidentCareClassification, FacilityWing } from '../../types/resident.ts';

export function AdminResidentsPage() {
  useDocumentTitle('Residents Directory — Administrator');

  // Master resident records list
  const [residents, setResidents] = useState<FullResident[]>(MOCK_FULL_RESIDENTS);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedCareLevel, setSelectedCareLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // View mode toggle
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Simulated refresh / skeleton state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dialog states
  const [isAddResidentOpen, setIsAddResidentOpen] = useState(false);
  const [selectedResidentForTransfer, setSelectedResidentForTransfer] = useState<FullResident | null>(null);
  const [selectedResidentForCareChange, setSelectedResidentForCareChange] = useState<FullResident | null>(null);

  // Toast feedback notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Resident directory synchronized with facility roster.');
    }, 500);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedWing('all');
    setSelectedFloor('all');
    setSelectedCareLevel('all');
    setSelectedStatus('all');
  };

  const isFiltered = Boolean(
    searchQuery ||
    selectedWing !== 'all' ||
    selectedFloor !== 'all' ||
    selectedCareLevel !== 'all' ||
    selectedStatus !== 'all'
  );

  // Filtered residents calculation
  const filteredResidents = useMemo(() => {
    return residents.filter((r) => {
      // Search matching (name, ID, room)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.fullName.toLowerCase().includes(q) || r.preferredName.toLowerCase().includes(q);
        const matchesId = r.id.toLowerCase().includes(q);
        const matchesRoom = r.placement.room.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesRoom) return false;
      }

      // Wing filter
      if (selectedWing !== 'all' && r.placement.wing !== selectedWing) {
        return false;
      }

      // Floor filter
      if (selectedFloor !== 'all' && r.placement.floor !== selectedFloor) {
        return false;
      }

      // Care level filter
      if (selectedCareLevel !== 'all' && r.careLevel !== selectedCareLevel) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && r.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [residents, searchQuery, selectedWing, selectedFloor, selectedCareLevel, selectedStatus]);

  // Modal handlers
  const handleResidentAdded = (newResident: FullResident) => {
    setResidents((prev) => [newResident, ...prev]);
    showToast(`Resident ${newResident.fullName} added successfully to ${newResident.placement.room}.`);
  };

  const handleTransferCompleted = (
    residentId: string,
    newWing: FacilityWing,
    newRoom: string,
    newBed: string,
    reason: string
  ) => {
    setResidents((prev) =>
      prev.map((r) => {
        if (r.id !== residentId) return r;
        return {
          ...r,
          placement: {
            ...r.placement,
            wing: newWing,
            room: newRoom,
            bed: newBed,
          },
          transferHistory: [
            {
              id: `TR-${Date.now()}`,
              date: 'Today, Nov 10, 2026',
              from: `${r.placement.room} (${r.placement.wing})`,
              to: `${newRoom} (${newWing})`,
              reason,
              authorizedBy: 'Administrator Devika Ramanathan',
            },
            ...r.transferHistory,
          ],
        };
      })
    );
    showToast(`Room transfer completed for ${residentId}.`);
  };

  const handleCareLevelChanged = (
    residentId: string,
    newLevel: ResidentCareClassification,
    justification: string
  ) => {
    setResidents((prev) =>
      prev.map((r) => {
        if (r.id !== residentId) return r;
        return {
          ...r,
          careLevel: newLevel,
          transferHistory: [
            {
              id: `CHG-${Date.now()}`,
              date: 'Today, Nov 10, 2026',
              from: `${r.careLevel}`,
              to: `${newLevel}`,
              reason: justification,
              authorizedBy: 'Dr. Anita Mehta & Administrator Devika Ramanathan',
            },
            ...r.transferHistory,
          ],
        };
      })
    );
    showToast(`Care classification updated to ${newLevel}.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-haven-blue-100 text-haven-blue-700 border border-haven-blue-500/20 text-xs flex items-center justify-between shadow-haven-sm">
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-haven-blue-700 font-bold ml-2 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-haven-navy-900 tracking-tight">
            Resident Management
          </h1>
          <p className="text-sm text-haven-slate-500 mt-0.5">
            Facility resident directory, admissions, bed placements and clinical oversight dossiers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh Roster
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddResidentOpen(true)}
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Admit New Resident
          </Button>
        </div>
      </div>

      {/* Summary KPI Counters */}
      <ResidentStatsHeader residents={residents} />

      {/* Filter and View Mode Toolbar */}
      <ResidentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedWing={selectedWing}
        onWingChange={setSelectedWing}
        selectedFloor={selectedFloor}
        onFloorChange={setSelectedFloor}
        selectedCareLevel={selectedCareLevel}
        onCareLevelChange={setSelectedCareLevel}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
        totalFilteredCount={filteredResidents.length}
        totalCount={residents.length}
      />

      {/* Content: Skeletons, Empty State, or Directory (Table / Grid) */}
      {isRefreshing ? (
        <div className="space-y-3">
          <Skeleton variant="rectangular" height={52} className="rounded-xl" />
          <Skeleton variant="rectangular" height={52} className="rounded-xl" />
          <Skeleton variant="rectangular" height={52} className="rounded-xl" />
          <Skeleton variant="rectangular" height={52} className="rounded-xl" />
        </div>
      ) : filteredResidents.length === 0 ? (
        <div className="p-10 bg-white rounded-2xl border border-haven-border shadow-haven-card text-center">
          <EmptyState
            icon={<Users className="w-6 h-6" />}
            title="No matching residents found"
            description="No resident records match your current search criteria or active filters. Try resetting the filters to view all residents."
            action={
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                Reset All Filters
              </Button>
            }
          />
        </div>
      ) : viewMode === 'table' ? (
        <ResidentTable
          residents={filteredResidents}
          onOpenTransferModal={setSelectedResidentForTransfer}
          onOpenChangeCareModal={setSelectedResidentForCareChange}
        />
      ) : (
        <ResidentGrid
          residents={filteredResidents}
          onOpenTransferModal={setSelectedResidentForTransfer}
          onOpenChangeCareModal={setSelectedResidentForCareChange}
        />
      )}

      {/* Modals */}
      <AddResidentModal
        open={isAddResidentOpen}
        onOpenChange={setIsAddResidentOpen}
        onResidentAdded={handleResidentAdded}
      />

      <TransferRoomModal
        resident={selectedResidentForTransfer}
        open={!!selectedResidentForTransfer}
        onOpenChange={(open) => !open && setSelectedResidentForTransfer(null)}
        onTransferCompleted={handleTransferCompleted}
      />

      <ChangeCareLevelModal
        resident={selectedResidentForCareChange}
        open={!!selectedResidentForCareChange}
        onOpenChange={(open) => !open && setSelectedResidentForCareChange(null)}
        onCareLevelChanged={handleCareLevelChanged}
      />
    </div>
  );
}
