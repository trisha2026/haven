import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ShieldAlert,
  ArrowLeft,
  Pill,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Plus,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import { MOCK_FULL_RESIDENTS } from '../../mock/residentsData.ts';
import {
  isResidentAuthorizedForCaregiver,
  MOCK_CAREGIVER_TASKS,
  ACTIVE_CAREGIVER,
  type CaregiverTask,
} from '../../mock/caregiverWorkspaceData.ts';
import { MOCK_EMAR_DOSES } from '../../mock/medicationsData.ts';

type ProfileTab =
  | 'overview'
  | 'care_plan'
  | 'medications'
  | 'observations'
  | 'tasks'
  | 'contacts'
  | 'history';

interface ObservationRecord {
  id: string;
  timestamp: string;
  type: string;
  value: string;
  notes: string;
  recordedBy: string;
}

export function CaregiverResidentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 1. Authorization check
  const authStatus = useMemo(() => {
    if (!id) return { authorized: false, reason: 'Resident ID missing.' };
    return isResidentAuthorizedForCaregiver(id);
  }, [id]);

  // Find resident data
  const resident = useMemo(() => {
    return MOCK_FULL_RESIDENTS.find((r) => r.id === id);
  }, [id]);

  useDocumentTitle(
    resident ? `${resident.fullName} (${resident.id}) — Caregiver Profile` : 'Resident Profile'
  );

  // Active tab
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');

  // Resident tasks state
  const [residentTasks, setResidentTasks] = useState<CaregiverTask[]>(() =>
    MOCK_CAREGIVER_TASKS.filter((t) => t.residentId === id)
  );

  // Observations state
  const [observations, setObservations] = useState<ObservationRecord[]>([
    {
      id: 'OBS-101',
      timestamp: 'Today, 11:30 AM',
      type: 'Mobility & Gait',
      value: '15 mins walking with rolling walker',
      notes: 'Completed garden walk comfortably. Mild right knee stiffness noted. Alert and oriented.',
      recordedBy: 'Priya Shetty, RN',
    },
    {
      id: 'OBS-102',
      timestamp: 'Today, 10:35 AM',
      type: 'Fluid Intake',
      value: '300 mL tender coconut water',
      notes: 'Hydration goal progression on track. Oral intake unassisted.',
      recordedBy: 'Priya Shetty, RN',
    },
    {
      id: 'OBS-103',
      timestamp: 'Today, 08:00 AM',
      type: 'Morning Vitals',
      value: 'BP 130/82 mmHg, Pulse 72 bpm',
      notes: 'Stable resting vitals recorded before breakfast round.',
      recordedBy: 'Priya Shetty, RN',
    },
  ]);

  // Add Observation Modal
  const [isAddObsOpen, setIsAddObsOpen] = useState(false);
  const [obsType, setObsType] = useState('Vitals Check');
  const [obsValue, setObsValue] = useState('');
  const [obsNotes, setObsNotes] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle adding an observation
  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obsValue.trim()) return;

    const newObs: ObservationRecord = {
      id: `OBS-${Date.now()}`,
      timestamp: 'Just now',
      type: obsType,
      value: obsValue,
      notes: obsNotes,
      recordedBy: ACTIVE_CAREGIVER.fullName,
    };

    setObservations((prev) => [newObs, ...prev]);
    setIsAddObsOpen(false);
    setObsValue('');
    setObsNotes('');
    showToast('Care observation recorded successfully into clinical demonstration log.');
  };

  // Handle complete task
  const handleCompleteTask = (taskId: string) => {
    setResidentTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'completed',
              completedAt: 'Just now',
              completedBy: ACTIVE_CAREGIVER.fullName,
            }
          : t
      )
    );
    showToast('Task marked as completed.');
  };

  // Access Restriction Gate
  if (!authStatus.authorized || !resident) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => navigate('/caregiver/residents')}
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back to My Caseload
        </Button>

        <Card className="border-rose-200 bg-rose-50/50 p-8 text-center max-w-xl mx-auto shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-4">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-rose-950">Clinical Access Restricted</h2>
          <p className="mt-2 text-xs sm:text-sm text-rose-800 leading-relaxed">
            {authStatus.reason}
          </p>
          <div className="mt-4 rounded-lg border border-rose-200 bg-white p-3 text-xs text-rose-900 text-left">
            <span className="font-semibold">Policy Note:</span> In accordance with the Karnataka Clinical Establishments Act and HAVEN Role-Based Access Control, caregivers only possess authorization to inspect resident charts within their designated shift caseload. To request temporary clinical coverage, consult your shift administrator (Devika Ramanathan).
          </div>
          <Button
            variant="default"
            className="mt-6 bg-[#173B70] text-white hover:bg-[#2457C5]"
            onClick={() => navigate('/caregiver/residents')}
          >
            Return to Authorized Residents
          </Button>
        </Card>
      </div>
    );
  }

  // Related medication records for this resident
  const residentDoses = MOCK_EMAR_DOSES.filter((d) => d.residentId === resident.id);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#173B70] px-4 py-3 text-sm font-medium text-white shadow-xl animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => navigate('/caregiver/residents')}
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back to My Residents
        </Button>

        <div className="flex items-center gap-2">
          <Badge
            variant={authStatus.assignmentType === 'permanent' ? 'default' : 'warning'}
            className="text-xs"
          >
            {authStatus.assignmentType === 'permanent'
              ? 'Primary Caseload (Garden Terrace)'
              : 'Active Emergency Standby'}
          </Badge>
          <Button
            variant="default"
            size="sm"
            className="text-xs"
            onClick={() => setIsAddObsOpen(true)}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Record Observation
          </Button>
        </div>
      </div>

      {/* Persistent Resident Summary Header */}
      <Card className="border-[#E6ECF4] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Avatar
              name={resident.fullName}
              size="xl"
              className="border-2 border-[#2457C5]/30 bg-[#E4EDFF] text-[#173B70] font-bold text-xl"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-[#173B70]">
                  {resident.fullName}
                </h1>
                <Badge variant="outline" className="text-xs font-semibold">
                  {resident.id}
                </Badge>
                <Badge variant="success" className="text-xs capitalize">
                  {resident.status}
                </Badge>
              </div>

              <p className="text-xs text-[#64748B]">
                Age {resident.age} ({resident.gender}) · Born {resident.dateOfBirth} · Moved in {resident.placement.moveInDate}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#334155]">
                <span className="font-semibold text-[#173B70]">
                  {resident.placement.room} · {resident.placement.bed}
                </span>
                <span className="text-[#64748B]">({resident.placement.wing}, {resident.placement.floor})</span>
                <span className="text-[#64748B]">·</span>
                <span className="font-medium text-[#2457C5]">{resident.careLevel}</span>
                <span className="text-[#64748B]">·</span>
                <span>Dr. {resident.careTeam.primaryDoctor.name}</span>
              </div>
            </div>
          </div>

          {/* Quick Alerts Callout */}
          {resident.alerts && resident.alerts.length > 0 && (
            <div className="max-w-md rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Care Alert:</span> {resident.alerts[0]}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap border-b border-[#E6ECF4] gap-1 text-xs font-semibold">
          {[
            { id: 'overview', label: '1. Overview' },
            { id: 'care_plan', label: '2. Care Plan' },
            { id: 'medications', label: '3. Medication Schedule' },
            { id: 'observations', label: '4. Observations' },
            { id: 'tasks', label: `5. Tasks (${residentTasks.length})` },
            { id: 'contacts', label: '6. Contacts & Family' },
            { id: 'history', label: '7. Care History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProfileTab)}
              className={`px-4 py-2.5 transition-all border-b-2 -mb-[1px] ${
                activeTab === tab.id
                  ? 'border-[#2457C5] text-[#2457C5]'
                  : 'border-transparent text-[#64748B] hover:text-[#173B70]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Allergies & Diet */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
              <CardTitle className="text-sm font-bold text-[#173B70]">
                Allergies & Clinical Precautions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {resident.allergies && resident.allergies.length > 0 ? (
                resident.allergies.map((allergy, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-rose-950">{allergy.allergen}</div>
                      <div className="text-rose-700">{allergy.reaction}</div>
                    </div>
                    <Badge variant="danger" className="uppercase text-[10px]">
                      {allergy.severity}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#64748B]">No known drug or dietary allergies.</p>
              )}

              <div className="mt-4 pt-4 border-t border-[#E6ECF4]">
                <div className="text-xs font-semibold text-[#173B70]">Dietary Specification:</div>
                <div className="text-xs text-[#334155] mt-1">
                  {resident.carePlan?.nutritionDietary || 'Standard senior nutrition diet with hydration monitoring.'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diagnosed Conditions */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
              <CardTitle className="text-sm font-bold text-[#173B70]">
                Diagnosed Medical Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-2.5">
              {resident.conditions && resident.conditions.length > 0 ? (
                resident.conditions.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between rounded-lg border border-[#E6ECF4] p-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#173B70]">{c.condition}</div>
                      <div className="text-[11px] text-[#64748B]">ICD: {c.icdCode} · {c.notes}</div>
                    </div>
                    <Badge variant="outline" className="capitalize text-[10px]">
                      {c.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#64748B]">No chronic conditions documented.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: CARE PLAN */}
      {activeTab === 'care_plan' && (
        <div className="space-y-6">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-[#173B70]">
                    Approved Clinical Care Plan
                  </CardTitle>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Prescribed by Dr. {resident.careTeam.primaryDoctor.name} · Review due: {resident.carePlan?.nextCarePlanReviewDate || 'Q1 2027'}
                  </p>
                </div>
                <Badge variant="default" className="text-xs">
                  Active Approved Directive
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/50 p-4 space-y-1">
                  <div className="text-xs font-bold text-[#173B70]">Mobility & Fall Prevention</div>
                  <p className="text-xs text-[#334155]">
                    {resident.carePlan?.mobilitySupport || 'Assisted walking with rolling walker.'}
                  </p>
                  <div className="text-[11px] font-semibold text-rose-700 pt-1">
                    Fall Risk: {resident.carePlan?.fallRiskLevel || 'Medium'}
                  </div>
                </div>

                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/50 p-4 space-y-1">
                  <div className="text-xs font-bold text-[#173B70]">Hydration Goal & Routine</div>
                  <p className="text-xs text-[#334155]">
                    {resident.carePlan?.hydrationGoal || 'Target 1.8 Litres daily across scheduled rounds.'}
                  </p>
                  <div className="text-[11px] text-[#64748B] pt-1">
                    Preferred: Tender coconut water and lemon infusion.
                  </div>
                </div>

                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/50 p-4 space-y-1">
                  <div className="text-xs font-bold text-[#173B70]">Personal Hygiene & Bathing</div>
                  <p className="text-xs text-[#334155]">
                    {resident.carePlan?.personalCareHygiene || 'Assisted shower chair routine.'}
                  </p>
                  <div className="text-[11px] text-[#64748B] pt-1">
                    Schedule: {resident.carePlan?.bathingSchedule || 'Alternate mornings with emollient.'}
                  </div>
                </div>

                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/50 p-4 space-y-1">
                  <div className="text-xs font-bold text-[#173B70]">Sensory Aids & Equipment</div>
                  <p className="text-xs text-[#334155]">
                    {resident.carePlan?.sensoryAids?.join(', ') || 'Reading glasses and rolling walker.'}
                  </p>
                  <div className="text-[11px] text-[#64748B] pt-1">
                    Ensure items are placed within easy reach from bed and recliner.
                  </div>
                </div>
              </div>

              {/* Checklist */}
              {resident.carePlan?.caregiverActionChecklist && (
                <div className="mt-4 pt-4 border-t border-[#E6ECF4]">
                  <div className="text-xs font-bold text-[#173B70] mb-2">
                    Prescribed Caregiver Daily Checklist:
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#334155]">
                    {resident.carePlan.caregiverActionChecklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: MEDICATION SCHEDULE */}
      {activeTab === 'medications' && (
        <div className="space-y-6">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[#E6ECF4] px-5 py-4">
              <div>
                <CardTitle className="text-base font-bold text-[#173B70]">
                  Today’s eMAR Administration Schedule
                </CardTitle>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Scheduled doses for {resident.fullName} across today’s shifts
                </p>
              </div>
              <Button
                variant="default"
                size="sm"
                className="text-xs"
                onClick={() => navigate('/caregiver/medications')}
              >
                <Pill className="mr-1.5 h-3.5 w-3.5" />
                Go to eMAR Workspace
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#E6ECF4]">
                {residentDoses.map((dose) => (
                  <div
                    key={dose.id}
                    className="flex items-center justify-between p-4 hover:bg-[#F4F8FF]/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-lg p-2 ${
                          dose.outcome === 'administered'
                            ? 'bg-emerald-50 text-emerald-700'
                            : dose.outcome === 'overdue'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        <Pill className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#173B70]">
                            {dose.medicationName}
                          </span>
                          <span className="text-[11px] text-[#64748B]">({dose.dosage})</span>
                          <span className="text-[11px] font-semibold text-[#2457C5]">
                            {dose.scheduledTime}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-0.5">
                          {dose.clinicalNotes || dose.notes || 'Prescribed oral administration.'}
                        </p>
                        {dose.administeredBy && (
                          <div className="text-[10px] text-emerald-700 mt-1">
                            Administered by {dose.administeredBy} at {dose.administeredTime}
                          </div>
                        )}
                      </div>
                    </div>

                    <Badge
                      variant={
                        dose.outcome === 'administered'
                          ? 'success'
                          : dose.outcome === 'overdue'
                          ? 'danger'
                          : 'warning'
                      }
                      className="capitalize text-xs"
                    >
                      {dose.outcome}
                    </Badge>
                  </div>
                ))}
                {residentDoses.length === 0 && (
                  <div className="p-8 text-center text-xs text-[#64748B]">
                    No specific doses scheduled in today’s eMAR round for this resident.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 4: OBSERVATIONS */}
      {activeTab === 'observations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#173B70]">
              Shift Observation Logs ({observations.length})
            </h3>
            <Button
              variant="default"
              size="sm"
              className="text-xs"
              onClick={() => setIsAddObsOpen(true)}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Observation
            </Button>
          </div>

          <div className="space-y-3">
            {observations.map((obs) => (
              <Card key={obs.id} className="border-[#E6ECF4] bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#173B70]">{obs.type}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {obs.timestamp}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-[#64748B]">
                    Logged by {obs.recordedBy}
                  </span>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#2457C5] bg-[#E4EDFF]/40 rounded-md p-2">
                  {obs.value}
                </div>
                <p className="mt-2 text-xs text-[#4A5568]">{obs.notes}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: TASKS & FOLLOW-UPS */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
              <CardTitle className="text-base font-bold text-[#173B70]">
                Care Tasks for {resident.fullName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#E6ECF4]">
                {residentTasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-4 hover:bg-[#F4F8FF]/30 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#173B70]">{t.title}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {t.category}
                        </Badge>
                        <span className="text-[11px] font-medium text-[#64748B]">
                          {t.scheduledTime}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">{t.description}</p>
                      {t.completedBy && (
                        <div className="text-[10px] text-emerald-700 mt-1">
                          Completed by {t.completedBy} at {t.completedAt}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={t.status === 'completed' ? 'success' : 'warning'}
                        className="text-xs capitalize"
                      >
                        {t.status}
                      </Badge>
                      {t.status !== 'completed' && (
                        <Button
                          variant="default"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleCompleteTask(t.id)}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 6: CONTACTS & FAMILY */}
      {activeTab === 'contacts' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {resident.emergencyContacts?.map((contact, i) => (
            <Card key={i} className="border-[#E6ECF4] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#173B70]">{contact.name}</h4>
                  <Badge variant="outline" className="text-[10px]">
                    {contact.relationship}
                  </Badge>
                </div>
                {contact.isPrimary && (
                  <Badge variant="default" className="text-[10px]">
                    Primary Contact
                  </Badge>
                )}
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-[#4A5568]">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#2457C5]" />
                  <span className="font-semibold text-[#173B70]">{contact.phone}</span>
                </div>
                <div>Email: {contact.email}</div>
                <div>Address: {contact.address}</div>
                <div className="pt-2 text-[11px] font-medium text-[#2457C5]">
                  {contact.hasPowerOfAttorney && 'Power of Attorney (Medical & Financial)'}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 7: CARE HISTORY */}
      {activeTab === 'history' && (
        <Card className="border-[#E6ECF4] bg-white p-5 shadow-xs space-y-4">
          <div className="text-sm font-bold text-[#173B70]">Recent Care History & Timeline</div>
          <div className="divide-y divide-[#E6ECF4] text-xs">
            <div className="py-2.5">
              <span className="font-semibold text-[#173B70]">Shift Handover — Nov 10, 07:00 AM:</span> Night watch handover received from Kavita Menon RN. Slept peacefully with 1 brief wake for water.
            </div>
            <div className="py-2.5">
              <span className="font-semibold text-[#173B70]">Morning Medication Round — Nov 10, 08:00 AM:</span> Lisinopril scheduled, adjusted to 14:00 round.
            </div>
            <div className="py-2.5">
              <span className="font-semibold text-[#173B70]">Mobility Therapy — Nov 09, 15:30 PM:</span> Quadriceps stretching session completed with PT Kavya Reddy.
            </div>
          </div>
        </Card>
      )}

      {/* Add Observation Modal */}
      <Dialog open={isAddObsOpen} onOpenChange={setIsAddObsOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleSaveObservation}>
            <DialogHeader>
              <DialogTitle>Record Care Observation</DialogTitle>
              <DialogDescription>
                Document routine vitals, fluid intake, mobility status, or behavioral notes for {resident.fullName}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-3 text-xs">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Observation Category</label>
                <Select
                  value={obsType}
                  onChange={(e) => setObsType(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="Vitals Check">Vitals Check (BP, Pulse, SpO2)</option>
                  <option value="Fluid Intake">Fluid Intake & Hydration</option>
                  <option value="Dietary Intake">Dietary / Meal Consumption</option>
                  <option value="Mobility & Gait">Mobility & Transfer Assistance</option>
                  <option value="Skin Integrity">Skin Integrity & Barrier Care</option>
                  <option value="Mood & Orientation">Mood, Comfort & Orientation</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Recorded Value / Measurement *</label>
                <Input
                  required
                  placeholder="e.g. BP 124/80 mmHg, Pulse 76 bpm OR 250 mL consumed"
                  value={obsValue}
                  onChange={(e) => setObsValue(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Clinical Notes & Observations</label>
                <textarea
                  rows={3}
                  placeholder="Provide context on resident demeanor, comfort, or assistance required..."
                  value={obsNotes}
                  onChange={(e) => setObsNotes(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddObsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm">
                Save Observation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
