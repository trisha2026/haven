import { useState, useMemo } from 'react';
import {
  Pill,
  Search,
  Plus,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
  Stethoscope,
  Edit3,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/Dialog.tsx';
import {
  MOCK_PRESCRIPTIONS,
  type FacilityPrescription,
} from '../../mock/medicationsData.ts';
import {
  getDoctorAuthorizedResidents,
  ACTIVE_DOCTOR,
} from '../../mock/doctorWorkspaceData.ts';

interface MedExceptionItem {
  id: string;
  residentId: string;
  residentName: string;
  room: string;
  wing: string;
  medicationName: string;
  dosage: string;
  scheduledTime: string;
  outcome: 'refused' | 'overdue' | 'withheld' | 'rescheduled';
  reportedBy: string;
  caregiverRole: string;
  exceptionReason: string;
  doctorDirective?: string;
  reviewedByDoctor: boolean;
}

const INITIAL_MED_EXCEPTIONS: MedExceptionItem[] = [
  {
    id: 'EXC-101',
    residentId: 'RES-041',
    residentName: 'Ananya Sharma',
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    medicationName: 'Lisinopril 10mg',
    dosage: '1 Tablet Oral',
    scheduledTime: 'Today · 08:00 AM',
    outcome: 'rescheduled',
    reportedBy: 'Priya Shetty',
    caregiverRole: 'Shift Caregiver',
    exceptionReason: 'Resident reported mild early morning nausea; requested dose after 13:00 lunch. BP checked: 134/86 mmHg.',
    reviewedByDoctor: false,
  },
  {
    id: 'EXC-102',
    residentId: 'RES-042',
    residentName: 'Vikram Hegde',
    room: 'Room 112',
    wing: 'Sunrise Pavilion',
    medicationName: 'Donepezil 5mg',
    dosage: '1 Tablet Oral (Night)',
    scheduledTime: 'Yesterday · 21:00 PM',
    outcome: 'refused',
    reportedBy: 'Kavita Nair',
    caregiverRole: 'Memory Care Specialist',
    exceptionReason: 'Resident was asleep and became agitated upon verbal waking. Caregiver withheld dose per gentle care protocol.',
    doctorDirective: 'Withhold overnight dose. Re-attempt at 08:00 morning round with breakfast.',
    reviewedByDoctor: true,
  },
  {
    id: 'EXC-103',
    residentId: 'RES-044',
    residentName: 'Raghavendra Kulkarni',
    room: 'Room 108-A',
    wing: 'Orchard Meadow',
    medicationName: 'Metformin ER 500mg',
    dosage: '1 Tablet Oral (Morning)',
    scheduledTime: 'Today · 08:30 AM',
    outcome: 'withheld',
    reportedBy: 'Sneha Joshi',
    caregiverRole: 'Senior Staff Nurse',
    exceptionReason: 'Fasting blood glucose 78 mg/dL following poor dinner intake. Withheld pending physician morning review.',
    reviewedByDoctor: false,
  },
];

export function DoctorPrescriptionsPage() {
  useDocumentTitle('Medication & Prescription Management — Doctor');

  const authorizedResidents = useMemo(() => getDoctorAuthorizedResidents(), []);
  const [prescriptions, setPrescriptions] = useState<FacilityPrescription[]>(MOCK_PRESCRIPTIONS);
  const [exceptions, setExceptions] = useState<MedExceptionItem[]>(INITIAL_MED_EXCEPTIONS);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'exceptions' | 'history'>('prescriptions');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'under_review' | 'discontinued'>('all');

  // Dialog States
  const [isNewRxOpen, setIsNewRxOpen] = useState(false);
  const [isModifyRxOpen, setIsModifyRxOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState<FacilityPrescription | null>(null);

  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [selectedException, setSelectedException] = useState<MedExceptionItem | null>(null);
  const [doctorDirectiveInput, setDoctorDirectiveInput] = useState('');

  // New Rx Form
  const [newResidentId, setNewResidentId] = useState(authorizedResidents[0]?.id || 'RES-044');
  const [newMedName, setNewMedName] = useState('');
  const [newGenericName, setNewGenericName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newRoute, setNewRoute] = useState('Oral');
  const [newFrequency, setNewFrequency] = useState('Once Daily (OD)');
  const [newIndication, setNewIndication] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  // Modify Rx Form
  const [modifyAction, setModifyAction] = useState<'modify' | 'discontinue'>('modify');
  const [modifyDosage, setModifyDosage] = useState('');
  const [modifyReason, setModifyReason] = useState('');

  // Filtered Prescriptions
  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((rx) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        rx.medicationName.toLowerCase().includes(q) ||
        rx.residentName.toLowerCase().includes(q) ||
        rx.id.toLowerCase().includes(q) ||
        rx.room.toLowerCase().includes(q);

      const matchesWing = selectedWing === 'all' || rx.wing === selectedWing;
      const matchesStatus = statusFilter === 'all' || rx.status === statusFilter;

      return matchesSearch && matchesWing && matchesStatus;
    });
  }, [prescriptions, searchQuery, selectedWing, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const active = prescriptions.filter((p) => p.status === 'active').length;
    const underReview = prescriptions.filter((p) => p.status === 'under_review').length;
    const pendingExceptions = exceptions.filter((e) => !e.reviewedByDoctor).length;
    const discontinued = prescriptions.filter((p) => p.status === 'discontinued').length;
    return { active, underReview, pendingExceptions, discontinued };
  }, [prescriptions, exceptions]);

  // Create Rx Handler
  const handleCreatePrescription = () => {
    if (!newMedName.trim() || !newDosage.trim()) return;

    const targetRes = authorizedResidents.find((r) => r.id === newResidentId);
    if (!targetRes) return;

    const newRx: FacilityPrescription = {
      id: `RX-2026-${Math.floor(100 + Math.random() * 900)}`,
      version: 1,
      residentId: targetRes.id,
      residentName: targetRes.fullName,
      room: targetRes.placement.room,
      wing: targetRes.placement.wing,
      medicationName: newMedName.trim(),
      genericName: newGenericName.trim() || newMedName.trim(),
      strength: newDosage.trim(),
      dosage: newDosage.trim(),
      route: newRoute,
      frequency: newFrequency,
      timing: ['08:00 AM'],
      prescribingDoctor: ACTIVE_DOCTOR.fullName,
      doctorLicense: ACTIVE_DOCTOR.registrationNumber,
      authorizedDate: 'Nov 10, 2026',
      startDate: 'Nov 10, 2026',
      endDate: 'May 10, 2027',
      status: 'active',
      instructions: newInstructions.trim() || 'Administer as directed with water.',
      batchNumber: `BAT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      indication: newIndication.trim() || 'Clinical maintenance',
      versionHistory: [
        {
          version: 1,
          authorizedDate: 'Nov 10, 2026',
          doctorName: ACTIVE_DOCTOR.fullName,
          changeReason: 'Initial prescription authorization.',
        },
      ],
    };

    setPrescriptions((prev) => [newRx, ...prev]);
    setIsNewRxOpen(false);
    setNewMedName('');
    setNewGenericName('');
    setNewDosage('');
    setNewIndication('');
    setNewInstructions('');
  };

  // Modify or Discontinue Rx Handler
  const handleModifyPrescription = () => {
    if (!selectedRx || !modifyReason.trim()) return;

    if (modifyAction === 'discontinue') {
      setPrescriptions((prev) =>
        prev.map((rx) => {
          if (rx.id === selectedRx.id) {
            return {
              ...rx,
              status: 'discontinued',
              versionHistory: [
                ...rx.versionHistory,
                {
                  version: rx.version + 1,
                  authorizedDate: 'Nov 10, 2026',
                  doctorName: ACTIVE_DOCTOR.fullName,
                  changeReason: `Discontinued: ${modifyReason.trim()}`,
                },
              ],
            };
          }
          return rx;
        })
      );
    } else {
      setPrescriptions((prev) =>
        prev.map((rx) => {
          if (rx.id === selectedRx.id) {
            return {
              ...rx,
              version: rx.version + 1,
              dosage: modifyDosage.trim() || rx.dosage,
              authorizedDate: 'Nov 10, 2026',
              versionHistory: [
                ...rx.versionHistory,
                {
                  version: rx.version + 1,
                  authorizedDate: 'Nov 10, 2026',
                  doctorName: ACTIVE_DOCTOR.fullName,
                  changeReason: `Modified: ${modifyReason.trim()}`,
                },
              ],
            };
          }
          return rx;
        })
      );
    }

    setIsModifyRxOpen(false);
    setSelectedRx(null);
    setModifyDosage('');
    setModifyReason('');
  };

  // Exception Directive Handler
  const handleSaveExceptionDirective = () => {
    if (!selectedException || !doctorDirectiveInput.trim()) return;

    setExceptions((prev) =>
      prev.map((exc) => {
        if (exc.id === selectedException.id) {
          return {
            ...exc,
            doctorDirective: doctorDirectiveInput.trim(),
            reviewedByDoctor: true,
          };
        }
        return exc;
      })
    );

    setIsExceptionModalOpen(false);
    setSelectedException(null);
    setDoctorDirectiveInput('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
            Medication & Prescription Management
          </h1>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Authorizing Clinician: {ACTIVE_DOCTOR.fullName}, MD · License: {ACTIVE_DOCTOR.registrationNumber} (Karnataka Medical Council)
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsNewRxOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" /> Authorize New Prescription
        </Button>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-haven-blue-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Active Prescriptions
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                {stats.active}
              </span>
              <span className="text-[11px] text-haven-royal-blue block mt-0.5">
                Current clinical orders
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-haven-ice-blue border border-haven-blue-100 flex items-center justify-center text-haven-royal-blue">
              <Pill className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Pending Exceptions
              </span>
              <span className="text-2xl font-bold text-amber-700 mt-1 block">
                {stats.pendingExceptions}
              </span>
              <span className="text-[11px] text-amber-800 block mt-0.5">
                Refused / Rescheduled doses
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-haven-blue-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Under Review
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                {stats.underReview}
              </span>
              <span className="text-[11px] text-haven-neutral-500 block mt-0.5">
                Due for 6-month renewal
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-haven-royal-blue">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-haven-neutral-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Discontinued
              </span>
              <span className="text-2xl font-bold text-haven-neutral-600 mt-1 block">
                {stats.discontinued}
              </span>
              <span className="text-[11px] text-haven-neutral-500 block mt-0.5">
                Historical records preserved
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-haven-neutral-100 border border-haven-neutral-200 flex items-center justify-center text-haven-neutral-500">
              <History className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-haven-neutral-200 flex gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'prescriptions'
              ? 'border-haven-royal-blue text-haven-royal-blue'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Active & Managed Prescriptions ({prescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('exceptions')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'exceptions'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Caregiver eMAR Exception Queue ({exceptions.filter((e) => !e.reviewedByDoctor).length} New)</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-1 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'history'
              ? 'border-haven-royal-blue text-haven-royal-blue'
              : 'border-transparent text-haven-neutral-500 hover:text-haven-navy-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Audit Version History</span>
        </button>
      </div>

      {/* TAB 1: PRESCRIPTIONS LIST */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-haven-neutral-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medication, resident, or Rx ID..."
                className="pl-8 text-xs h-8"
              />
            </div>

            <Select
              value={selectedWing}
              onChange={(e) => setSelectedWing(e.target.value)}
              className="text-xs h-8"
            >
              <option value="all">All Wings</option>
              <option value="Orchard Meadow">Orchard Meadow</option>
              <option value="Garden Terrace">Garden Terrace</option>
              <option value="Sunrise Pavilion">Sunrise Pavilion</option>
              <option value="Highland Haven">Highland Haven</option>
            </Select>

            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'under_review' | 'discontinued')}
              className="text-xs h-8"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="under_review">Under Review</option>
              <option value="discontinued">Discontinued</option>
            </Select>
          </div>

          {/* Prescriptions Table Card */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-haven-neutral-200 bg-haven-neutral-50 text-haven-neutral-500 font-semibold uppercase">
                    <th className="py-3 px-4">Rx ID & Ver</th>
                    <th className="py-3 px-4">Resident</th>
                    <th className="py-3 px-4">Medication & Strength</th>
                    <th className="py-3 px-4">Dosage & Frequency</th>
                    <th className="py-3 px-4">Indication</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-haven-neutral-100">
                  {filteredPrescriptions.map((rx) => (
                    <tr key={rx.id} className="hover:bg-haven-ice-blue/30 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-haven-navy-900 block">{rx.id}</span>
                        <span className="text-[10px] text-haven-neutral-400">Ver. {rx.version}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-haven-navy-900 block">{rx.residentName}</span>
                        <span className="text-[11px] text-haven-neutral-500 font-mono">
                          {rx.room} · {rx.residentId}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-haven-navy-900 block">{rx.medicationName}</span>
                        <span className="text-[11px] text-haven-neutral-500">{rx.strength}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-haven-navy-900 block">{rx.dosage} ({rx.route})</span>
                        <span className="text-[11px] text-haven-neutral-500">{rx.frequency}</span>
                      </td>
                      <td className="py-3 px-4 text-haven-neutral-600">
                        {rx.indication}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            rx.status === 'active'
                              ? 'success'
                              : rx.status === 'under_review'
                              ? 'warning'
                              : 'danger'
                          }
                          className="capitalize text-[10px]"
                        >
                          {rx.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRx(rx);
                            setModifyDosage(rx.dosage);
                            setModifyAction('modify');
                            setIsModifyRxOpen(true);
                          }}
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" /> Revise / Cease
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: CAREGIVER MEDICATION EXCEPTION QUEUE */}
      {activeTab === 'exceptions' && (
        <div className="space-y-4">
          <Card className="border-amber-300 bg-gradient-to-r from-amber-50/70 to-orange-50/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-amber-700 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-amber-950">
                    Caregiver eMAR Clinical Exception Ledger
                  </h3>
                  <p className="text-xs text-amber-800">
                    Real-time medication exceptions reported by floor nurses and caregivers requiring physician evaluation and directive orders.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {exceptions.map((exc) => (
              <Card
                key={exc.id}
                className={`border transition-colors ${
                  exc.reviewedByDoctor ? 'border-haven-neutral-200' : 'border-amber-300 bg-amber-50/20'
                }`}
              >
                <CardContent className="p-4 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-haven-navy-900 text-sm">
                        {exc.medicationName} ({exc.dosage})
                      </span>
                      <Badge
                        variant={
                          exc.outcome === 'refused'
                            ? 'danger'
                            : exc.outcome === 'withheld'
                            ? 'warning'
                            : 'info'
                        }
                        className="uppercase text-[10px] font-bold"
                      >
                        {exc.outcome}
                      </Badge>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {exc.id}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      {exc.reviewedByDoctor ? (
                        <Badge variant="success" className="text-[10px]">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Reviewed by Dr. Anita Mehta
                        </Badge>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setSelectedException(exc);
                            setDoctorDirectiveInput('');
                            setIsExceptionModalOpen(true);
                          }}
                        >
                          <Stethoscope className="w-3.5 h-3.5 mr-1" /> Review & Issue Directive
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-haven-neutral-600 bg-haven-neutral-50 p-2.5 rounded-lg border border-haven-neutral-200/60">
                    <div>
                      <strong className="text-haven-navy-900">Resident:</strong> {exc.residentName} ({exc.room})
                    </div>
                    <div>
                      <strong className="text-haven-navy-900">Scheduled:</strong> {exc.scheduledTime}
                    </div>
                    <div>
                      <strong className="text-haven-navy-900">Reported By:</strong> {exc.reportedBy} ({exc.caregiverRole})
                    </div>
                  </div>

                  <p className="text-haven-neutral-800">
                    <strong>Floor Clinical Reason:</strong> {exc.exceptionReason}
                  </p>

                  {exc.doctorDirective && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                      <span className="font-bold block text-[11px] uppercase tracking-wider text-emerald-800">
                        Physician Order Directive (KMC-88391):
                      </span>
                      <p>{exc.doctorDirective}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT VERSION HISTORY */}
      {activeTab === 'history' && (
        <Card>
          <CardHeader className="pb-3 border-b border-haven-neutral-200">
            <CardTitle className="text-sm font-bold text-haven-navy-900">
              Prescription Lifecycle & Version Ledger
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4 text-xs">
            {prescriptions.map((rx) => (
              <div key={rx.id} className="p-3 rounded-lg border border-haven-neutral-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-haven-navy-900 text-sm">
                      {rx.medicationName} ({rx.strength})
                    </span>
                    <span className="text-haven-neutral-500 ml-2">for {rx.residentName} ({rx.room})</span>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">{rx.id}</Badge>
                </div>

                <div className="space-y-1.5 pl-3 border-l-2 border-haven-blue-200 text-[11px]">
                  {rx.versionHistory.map((ver, idx) => (
                    <div key={idx} className="text-haven-neutral-700">
                      <strong>v{ver.version}</strong> ({ver.authorizedDate}) · Authored by {ver.doctorName}: &ldquo;{ver.changeReason}&rdquo;
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* DIALOG 1: Authorize New Prescription */}
      <Dialog open={isNewRxOpen} onOpenChange={setIsNewRxOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Issue & Authorize New Clinical Prescription
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs max-h-[70vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Target Resident:</label>
                <Select
                  value={newResidentId}
                  onChange={(e) => setNewResidentId(e.target.value)}
                  className="text-xs"
                >
                  {authorizedResidents.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.fullName} ({r.placement.room})
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Authorizing Doctor:</label>
                <Input
                  disabled
                  value={`${ACTIVE_DOCTOR.fullName} (${ACTIVE_DOCTOR.registrationNumber})`}
                  className="text-xs bg-haven-neutral-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Medication Name:</label>
                <Input
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  placeholder="e.g. Amlodipine"
                  className="text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Generic / Molecule:</label>
                <Input
                  value={newGenericName}
                  onChange={(e) => setNewGenericName(e.target.value)}
                  placeholder="e.g. Amlodipine Besylate"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Dosage / Strength:</label>
                <Input
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  placeholder="e.g. 5mg, 1 Tab"
                  className="text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Route:</label>
                <Select
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  className="text-xs"
                >
                  <option value="Oral">Oral</option>
                  <option value="Topical">Topical</option>
                  <option value="Subcutaneous">Subcutaneous</option>
                  <option value="Inhalation">Inhalation</option>
                  <option value="Ophthalmic">Ophthalmic</option>
                </Select>
              </div>
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Frequency:</label>
                <Select
                  value={newFrequency}
                  onChange={(e) => setNewFrequency(e.target.value)}
                  className="text-xs"
                >
                  <option value="Once Daily (OD)">Once Daily (OD)</option>
                  <option value="Twice Daily (BD)">Twice Daily (BD)</option>
                  <option value="Thrice Daily (TID)">Thrice Daily (TID)</option>
                  <option value="SOS / PRN (As Needed)">SOS / PRN (As Needed)</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">Clinical Indication:</label>
              <Input
                value={newIndication}
                onChange={(e) => setNewIndication(e.target.value)}
                placeholder="e.g. Primary Essential Hypertension"
                className="text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">Floor Administration Instructions:</label>
              <textarea
                value={newInstructions}
                onChange={(e) => setNewInstructions(e.target.value)}
                placeholder="Administer morning post-breakfast. Check BP if patient reports dizziness..."
                rows={2}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsNewRxOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreatePrescription}
              disabled={!newMedName.trim() || !newDosage.trim()}
            >
              Authorize & Sign Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: Modify / Discontinue Prescription */}
      <Dialog open={isModifyRxOpen} onOpenChange={setIsModifyRxOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Prescription Order Modification — {selectedRx?.medicationName}
            </DialogTitle>
          </DialogHeader>
          {selectedRx && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100">
                <span className="font-bold text-haven-navy-900 block">
                  Current: {selectedRx.medicationName} ({selectedRx.dosage})
                </span>
                <span className="text-haven-neutral-600 block">
                  Resident: {selectedRx.residentName} · Version: v{selectedRx.version}
                </span>
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Select Clinical Action:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setModifyAction('modify')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold ${
                      modifyAction === 'modify'
                        ? 'border-haven-royal-blue bg-haven-ice-blue text-haven-royal-blue'
                        : 'border-haven-neutral-300 text-haven-neutral-700'
                    }`}
                  >
                    Modify Dosage / Regimen
                  </button>
                  <button
                    type="button"
                    onClick={() => setModifyAction('discontinue')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold ${
                      modifyAction === 'discontinue'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-haven-neutral-300 text-haven-neutral-700'
                    }`}
                  >
                    Discontinue Prescription
                  </button>
                </div>
              </div>

              {modifyAction === 'modify' && (
                <div>
                  <label className="font-semibold text-haven-navy-900 block mb-1">New Dosage / Strength:</label>
                  <Input
                    value={modifyDosage}
                    onChange={(e) => setModifyDosage(e.target.value)}
                    placeholder="e.g. 20mg Once Daily"
                    className="text-xs"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Clinical Rationale & Justification:
                </label>
                <textarea
                  value={modifyReason}
                  onChange={(e) => setModifyReason(e.target.value)}
                  placeholder="Document clinical reason for modification or cessation..."
                  rows={3}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsModifyRxOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={modifyAction === 'discontinue' ? 'danger' : 'primary'}
              size="sm"
              onClick={handleModifyPrescription}
              disabled={!modifyReason.trim()}
            >
              Confirm Clinical Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 3: Exception Review Modal */}
      <Dialog open={isExceptionModalOpen} onOpenChange={setIsExceptionModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-haven-royal-blue" />
              <span>Issue Directive for Medication Exception</span>
            </DialogTitle>
          </DialogHeader>
          {selectedException && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-950 block">
                  {selectedException.medicationName} ({selectedException.dosage}) — {selectedException.outcome.toUpperCase()}
                </span>
                <span className="text-amber-900 block mt-0.5">
                  Resident: {selectedException.residentName} ({selectedException.room})
                </span>
                <p className="text-amber-800 mt-2">
                  <strong>Floor Report:</strong> &ldquo;{selectedException.exceptionReason}&rdquo;
                </p>
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Physician Clinical Directive & Orders:
                </label>
                <textarea
                  value={doctorDirectiveInput}
                  onChange={(e) => setDoctorDirectiveInput(e.target.value)}
                  placeholder="e.g. Authorize administration at 14:00 round. If patient remains symptomatic, withhold next dose and check BP..."
                  rows={4}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsExceptionModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveExceptionDirective}
              disabled={!doctorDirectiveInput.trim()}
            >
              Sign Directive (KMC-88391)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
