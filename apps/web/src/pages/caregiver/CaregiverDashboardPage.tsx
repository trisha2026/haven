import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Pill,
  Clock,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  ShieldCheck,
  Users,
  ChevronRight,
  Activity,
  Flame,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import {
  ACTIVE_CAREGIVER,
  getAuthorizedResidents,
  MOCK_CAREGIVER_TASKS,
  ACTIVE_TEMPORARY_ASSIGNMENTS,
} from '../../mock/caregiverWorkspaceData.ts';
import { MOCK_EMAR_DOSES } from '../../mock/medicationsData.ts';

export function CaregiverDashboardPage() {
  useDocumentTitle('Caregiver Command Centre — HAVEN');
  const navigate = useNavigate();

  // Authorized residents in Priya's caseload
  const assignedResidents = useMemo(() => getAuthorizedResidents(), []);

  // Filter doses for assigned residents
  const assignedResidentIds = useMemo(
    () => assignedResidents.map((r) => r.id),
    [assignedResidents]
  );

  const relevantDoses = useMemo(
    () => MOCK_EMAR_DOSES.filter((d) => assignedResidentIds.includes(d.residentId)),
    [assignedResidentIds]
  );

  // Derive metrics
  const totalTasks = MOCK_CAREGIVER_TASKS.length;
  const completedTasks = MOCK_CAREGIVER_TASKS.filter((t) => t.status === 'completed').length;
  const pendingTasks = MOCK_CAREGIVER_TASKS.filter((t) => t.status === 'pending' || t.status === 'in_progress').length;
  const overdueOrUrgentTasks = MOCK_CAREGIVER_TASKS.filter(
    (t) => (t.priority === 'urgent' || t.priority === 'high') && t.status !== 'completed'
  ).length;

  const pendingDoses = relevantDoses.filter((d) => d.outcome === 'pending' || d.outcome === 'overdue').length;
  const completedDoses = relevantDoses.filter((d) => d.outcome === 'administered').length;

  // Active temporary assignment
  const activeEmergency = ACTIVE_TEMPORARY_ASSIGNMENTS.find((t) => t.status === 'active');

  // Chronological timeline events
  const timelineEvents = [
    { time: '07:00 AM', title: 'Shift Check-in & Night Handover', desc: 'Acknowledged night watch handover from Kavita Menon, RN', status: 'done' },
    { time: '08:00 AM', title: 'Morning Medication Round', desc: 'Oral medications administered for 4 residents on Garden Terrace', status: 'done' },
    { time: '08:30 AM', title: 'Assisted Shower — Revathi Sampath', desc: 'Shower chair transfer completed, skin barrier emollient applied', status: 'done' },
    { time: '10:30 AM', title: 'Mid-Morning Hydration Round', desc: 'Tender coconut water & ORS intake recorded across rooms 201–204', status: 'done' },
    { time: '11:15 AM', title: 'Veranda Walkway Assist — Ananya Sharma', desc: '15 mins walking conditioning with rolling walker completed', status: 'done' },
    { time: '12:00 PM', title: 'Post-Fall Vitals Check — Raghavendra Kulkarni', desc: 'Emergency assignment EMG-2026-004: vitals stable (BP 132/84, SpO2 97%)', status: 'done' },
    { time: '12:45 PM', title: 'Lunchtime Diabetic Supervision', desc: 'Verified 80% meal intake and post-meal hydration', status: 'done' },
    { time: '13:45 PM', title: 'Pre-Medication Vitals Check — Ananya Sharma', desc: 'Target: Check sitting BP and radial pulse before Lisinopril 10mg', status: 'active' },
    { time: '14:00 PM', title: 'Afternoon Medication Round', desc: 'Afternoon doses due for Garden Terrace residents', status: 'active' },
    { time: '14:15 PM', title: 'Recliner Repositioning — Meera Krishnan', desc: 'Comfort positioning and Telugu reading material assist', status: 'upcoming' },
    { time: '14:45 PM', title: 'Shift Handover Preparation', desc: 'Prepare structured handover report for Rahul Patil, LPN (Evening Shift)', status: 'upcoming' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Personalized Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E6ECF4] bg-gradient-to-r from-[#173B70] via-[#2457C5] to-[#173B70] p-6 text-white shadow-md">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold backdrop-blur-xs">
                <Clock className="h-3.5 w-3.5 text-emerald-300" />
                {ACTIVE_CAREGIVER.currentShift} · {ACTIVE_CAREGIVER.assignedWing}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-200 border border-emerald-400/30">
                <ShieldCheck className="h-3 w-3" />
                Duty Status: On Duty
              </span>
              <span className="text-xs text-white/80">
                Check-in: {ACTIVE_CAREGIVER.checkInTime} IST
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, {ACTIVE_CAREGIVER.preferredName}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-2xl">
              Senior Registered Nurse · Employee ID: {ACTIVE_CAREGIVER.employeeId} · Reg: {ACTIVE_CAREGIVER.registrationNumber}
            </p>
            <p className="text-xs text-white/75">
              HAVEN Anandam Care Residence, Bengaluru · Tuesday, Nov 10, 2026 · Asia/Kolkata
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
            <Button
              variant="white"
              size="sm"
              leftIcon={<Pill className="h-4 w-4 text-[#2457C5]" />}
              onClick={() => navigate('/caregiver/medications')}
              className="font-semibold shadow-sm text-xs"
            >
              14:00 Med Round
            </Button>
            <Button
              variant="white"
              size="sm"
              leftIcon={<ListChecks className="h-4 w-4 text-[#2457C5]" />}
              onClick={() => navigate('/caregiver/tasks')}
              className="font-semibold shadow-sm text-xs"
            >
              Care Tasks ({pendingTasks})
            </Button>
            <Button
              variant="white"
              size="sm"
              leftIcon={<ClipboardCheck className="h-4 w-4 text-[#2457C5]" />}
              onClick={() => navigate('/caregiver/handover')}
              className="font-semibold shadow-sm text-xs"
            >
              Prepare Handover
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Active Temporary Assignment Callout (if active) */}
      {activeEmergency && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-amber-900 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Active Emergency Cross-Coverage
                  </span>
                  <Badge variant="warning" className="text-[10px]">
                    {activeEmergency.id}
                  </Badge>
                </div>
                <h4 className="text-sm font-semibold text-amber-950 mt-0.5">
                  {activeEmergency.targetResidentName} ({activeEmergency.targetRoom}, {activeEmergency.targetWing})
                </h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  {activeEmergency.scope} Authorized by {activeEmergency.authorizedBy}. Window: {activeEmergency.startTime} to {activeEmergency.expiryTime}.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-amber-300 bg-white hover:bg-amber-100 text-amber-900"
                onClick={() => navigate(`/caregiver/residents/${activeEmergency.targetResidentId}`)}
              >
                Open Resident Profile
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Core Shift Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/caregiver/residents')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>My Residents</span>
            <Users className="h-4 w-4 text-[#2457C5]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">{assignedResidents.length}</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
            5 Primary + 1 Standby
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/caregiver/tasks')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Care Tasks Due</span>
            <ListChecks className="h-4 w-4 text-[#3979D8]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalTasks}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">
            {completedTasks} completed today
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/caregiver/tasks')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Pending Tasks</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-700">{pendingTasks}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">
            Require shift action
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/caregiver/medications')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Pending Meds</span>
            <Pill className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-700">{pendingDoses}</div>
          <div className="text-[11px] text-rose-700 mt-0.5">
            {completedDoses} doses recorded
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/caregiver/tasks')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Urgent / High</span>
            <Flame className="h-4 w-4 text-orange-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-orange-700">{overdueOrUrgentTasks}</div>
          <div className="text-[11px] text-orange-700 mt-0.5">
            High clinical priority
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/caregiver/handover')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Shift Handover</span>
            <ClipboardCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">14:45</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">
            To Rahul Patil (Eve)
          </div>
        </Card>
      </div>

      {/* 4. Priority Section: Doses & Urgent Tasks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Medication Rounds & Approaching Doses */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#E6ECF4] px-5 py-4">
            <div>
              <CardTitle className="text-base font-bold text-[#173B70]">
                Priority Medication Rounds
              </CardTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Doses approaching scheduled time for Garden Terrace caseload
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-[#2457C5] border-[#2457C5]/30 hover:bg-[#F4F8FF]"
              onClick={() => navigate('/caregiver/medications')}
            >
              Open eMAR
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E6ECF4]">
              {relevantDoses.slice(0, 4).map((dose) => (
                <div
                  key={dose.id}
                  className="flex items-center justify-between p-4 hover:bg-[#F4F8FF]/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-lg p-2 ${
                        dose.outcome === 'administered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : dose.outcome === 'overdue'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-[#E4EDFF] text-[#2457C5]'
                      }`}
                    >
                      <Pill className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#173B70]">
                          {dose.residentName}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {dose.room}
                        </Badge>
                        <span className="text-[11px] font-medium text-[#64748B]">
                          {dose.scheduledTime}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#334155] mt-0.5">
                        {dose.medicationName} ({dose.dosage})
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {dose.clinicalNotes || dose.notes || 'Routine scheduled administration.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
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
                    <Button
                      variant="subtle"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => navigate('/caregiver/medications')}
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Care Tasks */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#E6ECF4] px-5 py-4">
            <div>
              <CardTitle className="text-base font-bold text-[#173B70]">
                Priority Care Tasks
              </CardTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Critical hygiene, vitals observations, and follow-up reminders
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-[#2457C5] border-[#2457C5]/30 hover:bg-[#F4F8FF]"
              onClick={() => navigate('/caregiver/tasks')}
            >
              All Tasks
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E6ECF4]">
              {MOCK_CAREGIVER_TASKS.filter((t) => t.status !== 'completed')
                .concat(MOCK_CAREGIVER_TASKS.filter((t) => t.status === 'completed'))
                .slice(0, 4)
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 hover:bg-[#F4F8FF]/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 rounded-lg p-2 ${
                          task.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : task.priority === 'urgent'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Activity className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#173B70]">
                            {task.residentName}
                          </span>
                          <span className="text-[11px] text-[#64748B]">
                            {task.room} · {task.category}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-[#334155] mt-0.5">
                          {task.title}
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant={
                          task.status === 'completed'
                            ? 'success'
                            : task.priority === 'urgent'
                            ? 'danger'
                            : 'warning'
                        }
                        className="text-xs capitalize"
                      >
                        {task.status === 'completed' ? 'Done' : task.scheduledTime}
                      </Badge>
                      <Button
                        variant="subtle"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => navigate('/caregiver/tasks')}
                      >
                        {task.status === 'completed' ? 'View' : 'Execute'}
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Chronological Today's Schedule & Quick Workflows */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's Schedule (2 cols on large) */}
        <Card className="lg:col-span-2 border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#E6ECF4] px-5 py-4">
            <div>
              <CardTitle className="text-base font-bold text-[#173B70]">
                Shift Schedule & Routine Rounds
              </CardTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Chronological sequence of clinical rounds, meals, hygiene and handovers
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-[#2457C5] border-[#2457C5]/30 hover:bg-[#F4F8FF]"
              onClick={() => navigate('/caregiver/schedule')}
            >
              Full Roster
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="p-5">
            <div className="relative border-l-2 border-[#E4EDFF] pl-5 space-y-4">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative group">
                  {/* Indicator Dot */}
                  <div
                    className={`absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white shadow-xs ${
                      evt.status === 'done'
                        ? 'bg-emerald-500'
                        : evt.status === 'active'
                        ? 'bg-[#2457C5] animate-pulse'
                        : 'bg-slate-300'
                    }`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#173B70]">{evt.time}</span>
                      <span className="text-xs font-semibold text-[#334155]">{evt.title}</span>
                    </div>
                    <Badge
                      variant={
                        evt.status === 'done'
                          ? 'success'
                          : evt.status === 'active'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-[10px] w-fit"
                    >
                      {evt.status === 'done' ? 'Completed' : evt.status === 'active' ? 'Due Now' : 'Scheduled'}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">{evt.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Handover Status */}
        <div className="space-y-6">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
              <CardTitle className="text-base font-bold text-[#173B70]">
                Quick Workflows
              </CardTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Fast navigation for bedside and medication tasks
              </p>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              <button
                onClick={() => navigate('/caregiver/residents')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#E4EDFF] p-2 text-[#2457C5]">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">My Assigned Residents</div>
                    <div className="text-[11px] text-[#64748B]">Caseload directory & care plans</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#64748B]" />
              </button>

              <button
                onClick={() => navigate('/caregiver/medications')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">Medication Administration</div>
                    <div className="text-[11px] text-[#64748B]">eMAR recording & dose verification</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#64748B]" />
              </button>

              <button
                onClick={() => navigate('/caregiver/tasks')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#E4EDFF] p-2 text-[#2457C5]">
                    <ListChecks className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">Daily Care Tasks</div>
                    <div className="text-[11px] text-[#64748B]">Hygiene, hydration & observations</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#64748B]" />
              </button>

              <button
                onClick={() => navigate('/caregiver/attendance')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">Duty Attendance & Breaks</div>
                    <div className="text-[11px] text-[#64748B]">Check-in/out and break tracking</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#64748B]" />
              </button>

              <button
                onClick={() => navigate('/caregiver/assignments')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">QR Scan & Temp Coverage</div>
                    <div className="text-[11px] text-[#64748B]">Resident identification & standby</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#64748B]" />
              </button>
            </CardContent>
          </Card>

          {/* Handover Notice */}
          <Card className="border-[#E6ECF4] bg-[#F4F8FF] p-4 text-[#173B70] shadow-xs">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="h-5 w-5 text-[#2457C5] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#173B70]">
                  Shift Handover to Rahul Patil, LPN
                </h4>
                <p className="text-xs text-[#4A5568] mt-1">
                  Draft report HND-2026-042 contains 4 resident summaries. Please review notes before 14:45 PM.
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="mt-3 h-8 text-xs"
                  onClick={() => navigate('/caregiver/handover')}
                >
                  Review Handover Draft
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
