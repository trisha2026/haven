import { Search, LayoutGrid, Table as TableIcon, RotateCcw, X } from 'lucide-react';
import { Button } from '../ui/Button.tsx';
import { Select } from '../ui/Select.tsx';
import { cn } from '../../utils/cn.ts';

export interface ResidentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedWing: string;
  onWingChange: (wing: string) => void;
  selectedFloor: string;
  onFloorChange: (floor: string) => void;
  selectedCareLevel: string;
  onCareLevelChange: (careLevel: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  viewMode: 'table' | 'grid';
  onViewModeChange: (mode: 'table' | 'grid') => void;
  onResetFilters: () => void;
  isFiltered: boolean;
  totalFilteredCount: number;
  totalCount: number;
}

export function ResidentFilters({
  searchQuery,
  onSearchChange,
  selectedWing,
  onWingChange,
  selectedFloor,
  onFloorChange,
  selectedCareLevel,
  onCareLevelChange,
  selectedStatus,
  onStatusChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  isFiltered,
  totalFilteredCount,
  totalCount,
}: ResidentFiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-haven-border p-4 shadow-haven-card space-y-3.5">
      {/* Top Row: Search Input + View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-haven-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by resident name, ID (e.g. RES-044) or room..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-sm border border-haven-border bg-haven-slate-50 text-haven-slate-900 placeholder:text-haven-slate-500 focus:outline-none focus:ring-2 focus:ring-haven-blue-700/20 focus:border-haven-blue-700 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-haven-slate-500 hover:text-haven-slate-900 p-0.5 rounded cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Toggle & Counter */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-haven-slate-500 font-medium hidden sm:inline">
            Showing <strong className="text-haven-slate-900">{totalFilteredCount}</strong> of {totalCount} residents
          </span>

          <div className="flex items-center p-1 rounded-xl bg-haven-slate-100 border border-haven-border text-xs">
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer',
                viewMode === 'table'
                  ? 'bg-white text-haven-navy-900 shadow-haven-sm'
                  : 'text-haven-slate-500 hover:text-haven-slate-900'
              )}
              aria-label="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer',
                viewMode === 'grid'
                  ? 'bg-white text-haven-navy-900 shadow-haven-sm'
                  : 'text-haven-slate-500 hover:text-haven-slate-900'
              )}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Filter Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-haven-border-light">
        {/* Wing Filter */}
        <div className="min-w-[150px] flex-1 sm:flex-initial">
          <Select
            options={[
              { value: 'all', label: 'All Facility Wings' },
              { value: 'Garden Terrace', label: 'Garden Terrace' },
              { value: 'Sunrise Pavilion', label: 'Sunrise Pavilion' },
              { value: 'Orchard Meadow', label: 'Orchard Meadow' },
              { value: 'Highland Haven', label: 'Highland Haven' },
            ]}
            value={selectedWing}
            onChange={(e) => onWingChange(e.target.value)}
          />
        </div>

        {/* Floor Filter */}
        <div className="min-w-[130px] flex-1 sm:flex-initial">
          <Select
            options={[
              { value: 'all', label: 'All Floors' },
              { value: 'Floor 1', label: 'Floor 1' },
              { value: 'Floor 2', label: 'Floor 2' },
              { value: 'Floor 3', label: 'Floor 3' },
            ]}
            value={selectedFloor}
            onChange={(e) => onFloorChange(e.target.value)}
          />
        </div>

        {/* Care Level Filter */}
        <div className="min-w-[160px] flex-1 sm:flex-initial">
          <Select
            options={[
              { value: 'all', label: 'All Care Classifications' },
              { value: 'Independent Living', label: 'Independent Living' },
              { value: 'Assisted Living', label: 'Assisted Living' },
              { value: 'Memory Care', label: 'Memory Care' },
              { value: 'Skilled Nursing', label: 'Skilled Nursing' },
            ]}
            value={selectedCareLevel}
            onChange={(e) => onCareLevelChange(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="min-w-[150px] flex-1 sm:flex-initial">
          <Select
            options={[
              { value: 'all', label: 'All Resident Statuses' },
              { value: 'active', label: 'In Residence (Active)' },
              { value: 'in-clinic', label: 'In Clinic / Assessment' },
              { value: 'with-family', label: 'With Family / Leave' },
              { value: 'resting', label: 'Resting / Private' },
            ]}
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
          />
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-haven-slate-500 hover:text-haven-slate-900"
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
