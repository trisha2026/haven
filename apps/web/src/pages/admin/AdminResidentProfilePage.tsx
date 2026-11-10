import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import {
  User,
  HeartPulse,
  Pill,
  ClipboardCheck,
  HeartHandshake,
  Bed,
  History,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { ProfileSummaryHeader } from '../../components/residents/profile/ProfileSummaryHeader.tsx';
import { OverviewTab } from '../../components/residents/profile/OverviewTab.tsx';
import { MedicalInfoTab } from '../../components/residents/profile/MedicalInfoTab.tsx';
import { MedicationsTab } from '../../components/residents/profile/MedicationsTab.tsx';
import { CarePlanTab } from '../../components/residents/profile/CarePlanTab.tsx';
import { ContactsTab } from '../../components/residents/profile/ContactsTab.tsx';
import { RoomPlacementTab } from '../../components/residents/profile/RoomPlacementTab.tsx';
import { HistoryDocumentsTab } from '../../components/residents/profile/HistoryDocumentsTab.tsx';
import { EditResidentModal } from '../../components/residents/EditResidentModal.tsx';
import { TransferRoomModal } from '../../components/residents/TransferRoomModal.tsx';
import { ChangeCareLevelModal } from '../../components/residents/ChangeCareLevelModal.tsx';
import { MOCK_FULL_RESIDENTS } from '../../mock/residentsData.ts';
import type { FullResident, ResidentCareClassification, FacilityWing } from '../../types/resident.ts';
import { cn } from '../../utils/cn.ts';

type ProfileTabId =
  | 'overview'
  | 'medical'
  | 'medications'
  | 'care-plan'
  | 'contacts'
  | 'placement'
  | 'history';

export function AdminResidentProfilePage() {
  const { id } = useParams<{ id: string }>();

  // Find resident or fallback to canonical Raghavendra Kulkarni
  const initialResident = useMemo(() => {
    return MOCK_FULL_RESIDENTS.find((r) => r.id === id) || MOCK_FULL_RESIDENTS[0];
  }, [id]);

  const [resident, setResident] = useState<FullResident>(initialResident);
  const [activeTab, setActiveTab] = useState<ProfileTabId>('overview');

  useDocumentTitle(`${resident.fullName} — Resident Profile`);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isChangeCareModalOpen, setIsChangeCareModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResidentUpdated = (updated: FullResident) => {
    setResident(updated);
    showToast('Resident profile and emergency contacts updated.');
  };

  const handleTransferCompleted = (
    _residentId: string,
    newWing: FacilityWing,
    newRoom: string,
    newBed: string,
    reason: string
  ) => {
    setResident((prev) => ({
      ...prev,
      placement: {
        ...prev.placement,
        wing: newWing,
        room: newRoom,
        bed: newBed,
      },
      transferHistory: [
        {
          id: `TR-${Date.now()}`,
          date: 'Today, Nov 10, 2026',
          from: `${prev.placement.room} (${prev.placement.wing})`,
          to: `${newRoom} (${newWing})`,
          fromRoom: `${prev.placement.room}`,
          toRoom: `${newRoom}`,
          fromWing: prev.placement.wing,
          toWing: newWing,
          reason,
          authorizedBy: 'Administrator Devika Ramanathan',
        },
        ...prev.transferHistory,
      ],
    }));
    showToast(`Resident transfer completed to ${newRoom} (${newWing}).`);
  };

  const handleCareLevelChanged = (
    _residentId: string,
    newLevel: ResidentCareClassification,
    justification: string
  ) => {
    setResident((prev) => ({
      ...prev,
      careLevel: newLevel,
      transferHistory: [
        {
          id: `CHG-${Date.now()}`,
          date: 'Today, Nov 10, 2026',
          from: prev.careLevel,
          to: newLevel,
          fromRoom: prev.placement.room,
          toRoom: prev.placement.room,
          fromWing: prev.placement.wing,
          toWing: prev.placement.wing,
          reason: `Care Classification Re-tiering to ${newLevel}: ${justification}`,
          authorizedBy: 'Dr. Anita Mehta & Administrator Devika Ramanathan',
        },
        ...prev.transferHistory,
      ],
    }));
    showToast(`Care level classification updated to ${newLevel}.`);
  };

  const TABS = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'medical', label: 'Medical Information', icon: HeartPulse },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'care-plan', label: 'Care Plan', icon: ClipboardCheck },
    { id: 'contacts', label: 'Contacts', icon: HeartHandshake },
    { id: 'placement', label: 'Room & Placement', icon: Bed },
    { id: 'history', label: 'History & Documents', icon: History },
  ] as const;

  return (
    <div className="space-y-6 pb-16">
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

      {/* 1. Persistent Summary Header with Quick Actions */}
      <ProfileSummaryHeader
        resident={resident}
        onOpenEditModal={() => setIsEditModalOpen(true)}
        onOpenTransferModal={() => setIsTransferModalOpen(true)}
        onOpenChangeCareModal={() => setIsChangeCareModalOpen(true)}
      />

      {/* 2. Seven Profile Tabs Navigation Bar */}
      <div className="border-b border-haven-border bg-white rounded-2xl px-2 shadow-haven-sm overflow-x-auto">
        <nav className="flex space-x-1 min-w-max p-1.5" aria-label="Resident profile tabs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer',
                  isActive
                    ? 'bg-haven-blue-700 text-white shadow-haven-sm'
                    : 'text-haven-slate-600 hover:text-haven-slate-900 hover:bg-haven-slate-50'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-haven-slate-400')} />
                <span>{tab.label}</span>
                {tab.id === 'history' && resident.incidents.length > 0 && (
                  <span
                    className={cn(
                      'ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold',
                      isActive ? 'bg-white/20 text-white' : 'bg-haven-danger-soft text-haven-danger'
                    )}
                  >
                    {resident.incidents.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Tab Contents */}
      <div className="pt-1">
        {activeTab === 'overview' && <OverviewTab resident={resident} />}
        {activeTab === 'medical' && <MedicalInfoTab resident={resident} />}
        {activeTab === 'medications' && <MedicationsTab resident={resident} />}
        {activeTab === 'care-plan' && <CarePlanTab resident={resident} />}
        {activeTab === 'contacts' && <ContactsTab resident={resident} />}
        {activeTab === 'placement' && (
          <RoomPlacementTab
            resident={resident}
            onInitiateTransfer={() => setIsTransferModalOpen(true)}
          />
        )}
        {activeTab === 'history' && (
          <HistoryDocumentsTab
            resident={resident}
            onDownloadDocument={(docTitle) => showToast(`Downloading document: ${docTitle}`)}
          />
        )}
      </div>

      {/* Modals */}
      <EditResidentModal
        resident={resident}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onResidentUpdated={handleResidentUpdated}
      />

      <TransferRoomModal
        resident={resident}
        open={isTransferModalOpen}
        onOpenChange={setIsTransferModalOpen}
        onTransferCompleted={handleTransferCompleted}
      />

      <ChangeCareLevelModal
        resident={resident}
        open={isChangeCareModalOpen}
        onOpenChange={setIsChangeCareModalOpen}
        onCareLevelChanged={handleCareLevelChanged}
      />
    </div>
  );
}
