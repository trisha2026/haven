import { useState } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { AdminWelcomeHeader } from '../../components/admin/AdminWelcomeHeader.tsx';
import { AdminKpiGrid } from '../../components/admin/AdminKpiGrid.tsx';
import { PriorityActionQueue } from '../../components/admin/PriorityActionQueue.tsx';
import { MedicationOversightCard } from '../../components/admin/MedicationOversightCard.tsx';
import { StaffingCoverageCard } from '../../components/admin/StaffingCoverageCard.tsx';
import { IncidentAnalyticsCard } from '../../components/admin/IncidentAnalyticsCard.tsx';
import { InventoryAlertsCard } from '../../components/admin/InventoryAlertsCard.tsx';
import { RecentFacilityActivity } from '../../components/admin/RecentFacilityActivity.tsx';
import { Skeleton } from '../../components/ui/Skeleton.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { RefreshCw } from 'lucide-react';

export function AdminDashboardPage() {
  useDocumentTitle('Administrator Command Centre');

  // Simulated quick refresh state for verifying responsive skeleton loading
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. WELCOME HEADER AND QUICK ACTIONS */}
      <AdminWelcomeHeader />

      {/* DASHBOARD REFRESH TRIGGER / STATUS BAR */}
      <div className="flex items-center justify-between text-xs text-haven-slate-500 px-1 -mt-4">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-haven-success" />
          <span>Demonstration data · Simulated operations feed (Willow Creek Residence)</span>
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          isLoading={isRefreshing}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="text-haven-slate-500 hover:text-haven-slate-900"
        >
          {isRefreshing ? 'Simulating refresh...' : 'Simulate Feed Refresh'}
        </Button>
      </div>

      {isRefreshing ? (
        <div className="space-y-8 animate-pulse">
          {/* Skeleton KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} variant="default" padding="md">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton variant="text" width="40%" height={14} />
                    <Skeleton variant="circular" width={32} height={32} />
                  </div>
                  <Skeleton variant="text" width="60%" height={28} />
                  <Skeleton variant="text" width="80%" height={12} />
                </div>
              </Card>
            ))}
          </div>

          {/* Skeleton Priority Queue */}
          <Card variant="default" padding="lg">
            <div className="space-y-4">
              <Skeleton variant="text" width="30%" height={24} />
              <Skeleton variant="rectangular" height={80} />
              <Skeleton variant="rectangular" height={80} />
            </div>
          </Card>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="default" padding="lg">
              <Skeleton variant="rectangular" height={320} />
            </Card>
            <Card variant="default" padding="lg">
              <Skeleton variant="rectangular" height={320} />
            </Card>
          </div>
        </div>
      ) : (
        <>
          {/* 2. FOUR FACILITY KPI CARDS */}
          <section aria-label="Facility Key Performance Indicators">
            <AdminKpiGrid />
          </section>

          {/* 3. PRIORITY ACTION QUEUE (Immediately below KPI cards) */}
          <section aria-label="Priority Action Queue">
            <PriorityActionQueue />
          </section>

          {/* 4. MEDICATION OVERSIGHT SNAPSHOT & 5. STAFFING & COVERAGE */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* 4. MEDICATION OVERSIGHT */}
            <section aria-label="Medication Operations Snapshot">
              <MedicationOversightCard />
            </section>

            {/* 5. STAFFING & COVERAGE */}
            <section aria-label="Staffing & Coverage Overview">
              <StaffingCoverageCard />
            </section>
          </div>

          {/* 6. INCIDENT ANALYTICS */}
          <section aria-label="Incident Analytics & Clinical Review">
            <IncidentAnalyticsCard />
          </section>

          {/* 7. PHARMACY & INVENTORY ALERTS */}
          <section aria-label="Pharmacy & Inventory Alerts">
            <InventoryAlertsCard />
          </section>

          {/* 8. RECENT FACILITY ACTIVITY STREAM */}
          <section aria-label="Recent Facility Audit Activity">
            <RecentFacilityActivity />
          </section>
        </>
      )}
    </div>
  );
}
