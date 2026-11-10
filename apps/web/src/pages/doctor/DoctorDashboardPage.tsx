import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Stethoscope,
  Users,
  FileHeart,
  Pill,
  AlertTriangle,
  NotebookPen,
  Clock,
  ArrowRight,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import {
  ACTIVE_DOCTOR,
  getDoctorAuthorizedResidents,
  MOCK_CLINICAL_NOTES,
  MOCK_DOCTOR_TASKS,
  ACTIVE_DOCTOR_ACCESS_GRANTS,
} from '../../mock/doctorWorkspaceData.ts';
import { MOCK_PRESCRIPTIONS, MOCK_EMAR_DOSES } from '../../mock/medicationsData.ts';
import { MOCK_DETAILED_INCIDENTS } from '../../mock/incidentsData.ts';

export function DoctorDashboardPage() {
  useDocumentTitle('Doctor Command Centre — HAVEN');
  const navigate = useNavigate();

  // Authorized residents for Dr. Anita Mehta
  const authorizedResidents = useMemo(() => getDoctorAuthorizedResidents(), []);
  const authorizedIds = useMemo(() => authorizedResidents.map((r) => r.id), [authorizedResidents]);

  // Derived metrics from shared datasets
  const activeCasesCount = authorizedResidents.length;
  const pendingNotesCount = MOCK_CLINICAL_NOTES.filter((n) => n.status === 'draft').length;
  const pendingPrescriptionsCount = MOCK_PRESCRIPTIONS.filter(
    (rx) => authorizedIds.includes(rx.residentId) && rx.status === 'active'
  ).length;

  const relevantExceptions = useMemo(
    () =>
      MOCK_EMAR_DOSES.filter(
        (d) =>
          authorizedIds.includes(d.residentId) &&
          (d.outcome === 'overdue' || d.outcome === 'refused' || d.outcome === 'withheld')
      ),
    [authorizedIds]
  );

  const pendingIncidentReviews = useMemo(
    () =>
      MOCK_DETAILED_INCIDENTS.filter(
        (inc) => authorizedIds.includes(inc.residentId) && inc.status === 'clinical_review'
      ),
    [authorizedIds]
  );

  const pendingTasksCount = MOCK_DOCTOR_TASKS.filter((t) => t.status !== 'completed').length;

  // Chronological clinical schedule for today
  const clinicalSchedule = [
    { time: '08:30 AM', title: 'Clinical Handover & Morning Rounds Briefing', location: 'Medical Directorate Room', status: 'done' },
    { time: '09:15 AM', title: 'Bedside Post-Fall Assessment — Raghavendra Kulkarni', location: 'Room 108-A (Orchard Meadow)', status: 'done' },
    { time: '10:00 AM', title: 'Incident Clinical Sign-off (INC-2026-088)', location: 'Clinical Console', status: 'done' },
    { time: '11:15 AM', title: 'Specialist Consultation — Aarav Deshmukh', location: 'Room 104 (Sunrise Pavilion)', status: 'active' },
    { time: '13:30 PM', title: 'Review Overdue Lisinopril Dosing — Ananya Sharma', location: 'eMAR Review Desk', status: 'upcoming' },
    { time: '14:30 PM', title: 'Prescription Renewal Audit (Atorvastatin 10mg)', location: 'Pharmacy Integration Console', status: 'upcoming' },
    { time: '16:00 PM', title: 'Multidisciplinary Team Debrief with Devika Ramanathan', location: 'Administrative Boardroom', status: 'upcoming' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Clinical Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E6ECF4] bg-gradient-to-r from-[#173B70] via-[#2457C5] to-[#173B70] p-6 text-white shadow-md">
        <div className="relative z-10 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold backdrop-blur-xs">
                <Stethoscope className="h-3.5 w-3.5 text-emerald-300" />
                {ACTIVE_DOCTOR.specialty} · {ACTIVE_DOCTOR.title}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-200 border border-emerald-400/30">
                <ShieldCheck className="h-3 w-3" />
                KMC Reg: {ACTIVE_DOCTOR.registrationNumber} (Verified)
              </span>
              <span className="text-xs text-white/80">
                Hospital: {ACTIVE_DOCTOR.hospitalAffiliation}
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
              Welcome, {ACTIVE_DOCTOR.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-white/90">
              HAVEN Anandam Care Residence, Bengaluru · Clinical Practice &amp; Medical Directorate
            </p>
            <p className="text-xs text-white/75">
              Tuesday, Nov 10, 2026 · Asia/Kolkata (IST) · Primary Caseload: {authorizedResidents.length} Residents
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 xl:pt-0">
            <Button
              variant="white"
              size="sm"
              leftIcon={<FileHeart className="h-4 w-4 text-[#2457C5]" />}
              onClick={() => navigate('/doctor/residents')}
              className="font-semibold shadow-sm text-xs"
            >
              My Residents ({authorizedResidents.length})
            </Button>
            <Button
              variant="white"
              size="sm"
              leftIcon={<Pill className="h-4 w-4 text-[#2457C5]" />}
              onClick={() => navigate('/doctor/prescriptions')}
              className="font-semibold shadow-sm text-xs"
            >
              Prescriptions &amp; eMAR
            </Button>
            <Button
              variant="white"
              size="sm"
              leftIcon={<AlertTriangle className="h-4 w-4 text-rose-600" />}
              onClick={() => navigate('/doctor/incidents')}
              className="font-semibold shadow-sm text-xs"
            >
              Incident Reviews ({pendingIncidentReviews.length})
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Active Access Grants Notice */}
      {ACTIVE_DOCTOR_ACCESS_GRANTS.length > 0 && (
        <div className="rounded-xl border border-blue-200 bg-[#F4F8FF] p-4 text-[#173B70] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-[#E4EDFF] p-2 text-[#2457C5]">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#173B70]">
                    Active Specialist Access Grant
                  </span>
                  <Badge variant="default" className="text-[10px]">
                    {ACTIVE_DOCTOR_ACCESS_GRANTS[0].id}
                  </Badge>
                </div>
                <h4 className="text-sm font-semibold text-[#173B70] mt-0.5">
                  {ACTIVE_DOCTOR_ACCESS_GRANTS[0].residentName} ({ACTIVE_DOCTOR_ACCESS_GRANTS[0].room}, {ACTIVE_DOCTOR_ACCESS_GRANTS[0].wing})
                </h4>
                <p className="text-xs text-[#4A5568] mt-0.5">
                  {ACTIVE_DOCTOR_ACCESS_GRANTS[0].clinicalPurpose} Valid until {ACTIVE_DOCTOR_ACCESS_GRANTS[0].expiresAt}.
                </p>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              className="h-8 text-xs shrink-0"
              onClick={() => navigate(`/doctor/residents/${ACTIVE_DOCTOR_ACCESS_GRANTS[0].residentId}`)}
            >
              Open Scoped Record
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* 3. Core Clinical Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/doctor/residents')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Assigned Caseload</span>
            <Users className="h-4 w-4 text-[#2457C5]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">{activeCasesCount}</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
            Active Clinical Access
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/doctor/notes')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Clinical Notes</span>
            <NotebookPen className="h-4 w-4 text-[#3979D8]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">{MOCK_CLINICAL_NOTES.length}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">
            {pendingNotesCount} draft pending signature
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/doctor/prescriptions')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Active Prescriptions</span>
            <Pill className="h-4 w-4 text-[#2457C5]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">{pendingPrescriptionsCount}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">
            Doctor authorized regimens
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/doctor/prescriptions')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Med Exceptions</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-700">{relevantExceptions.length}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">
            Require physician review
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/doctor/incidents')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Incident Referrals</span>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-700">{pendingIncidentReviews.length}</div>
          <div className="text-[11px] text-rose-700 mt-0.5">
            Awaiting clinical sign-off
          </div>
        </Card>

        <Card
          className="border-[#E6ECF4] bg-white p-3.5 shadow-xs cursor-pointer hover:border-[#2457C5] transition-colors"
          onClick={() => navigate('/doctor/tasks')}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Clinical Tasks</span>
            <Clock className="h-4 w-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-purple-700">{pendingTasksCount}</div>
          <div className="text-[11px] text-purple-700 mt-0.5">
            Reviews &amp; follow-ups
          </div>
        </Card>
      </div>

      {/* 4. Priority Clinical Action Queue */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between border-b border-[#E6ECF4] px-5 py-4">
          <div>
            <CardTitle className="text-base font-bold text-[#173B70]">
              Priority Clinical Queue
            </CardTitle>
            <p className="text-xs text-[#64748B] mt-0.5">
              Urgent incidents, medication exceptions, and consultations awaiting physician action
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs text-[#2457C5] border-[#2457C5]/30 hover:bg-[#F4F8FF]"
            onClick={() => navigate('/doctor/tasks')}
          >
            All Workflows ({MOCK_DOCTOR_TASKS.length})
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E6ECF4]">
            {MOCK_DOCTOR_TASKS.map((task) => (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-[#F4F8FF]/40 transition-colors gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 rounded-lg p-2 ${
                      task.priority === 'urgent'
                        ? 'bg-rose-50 text-rose-700'
                        : task.priority === 'high'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-[#E4EDFF] text-[#2457C5]'
                    }`}
                  >
                    {task.category === 'Incident Review' ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : task.category === 'Medication Exception' || task.category === 'Prescription Review' ? (
                      <Pill className="h-4 w-4" />
                    ) : (
                      <NotebookPen className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[#173B70]">{task.residentName}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {task.room} · {task.wing}
                      </Badge>
                      <Badge
                        variant={
                          task.priority === 'urgent'
                            ? 'danger'
                            : task.priority === 'high'
                            ? 'warning'
                            : 'secondary'
                        }
                        className="text-[10px] uppercase font-bold"
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-[11px] text-[#64748B]">Due: {task.dueDate}</span>
                    </div>

                    <div className="text-xs font-semibold text-[#334155] mt-1">
                      {task.title}
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5 max-w-2xl">
                      {task.description}
                    </p>
                    {task.completedNotes && (
                      <div className="text-[11px] text-emerald-700 font-medium mt-1">
                        Completed: {task.completedNotes}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Badge
                    variant={task.status === 'completed' ? 'success' : 'warning'}
                    className="capitalize text-xs"
                  >
                    {task.status.replace('_', ' ')}
                  </Badge>
                  <Button
                    variant={task.status === 'completed' ? 'outline' : 'default'}
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => navigate(task.relatedRecordUrl)}
                  >
                    {task.status === 'completed' ? 'Inspect' : 'Review & Sign'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. Chronological Clinical Schedule & Fast Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Schedule */}
        <Card className="lg:col-span-2 border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#E6ECF4] px-5 py-4">
            <div>
              <CardTitle className="text-base font-bold text-[#173B70]">
                Today&apos;s Clinical Itinerary
              </CardTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Bedside rounds, multidisciplinary consultations, and administrative sign-offs
              </p>
            </div>
            <span className="text-xs font-bold text-[#173B70]">Nov 10, 2026</span>
          </CardHeader>
          <CardContent className="p-5">
            <div className="relative border-l-2 border-[#E4EDFF] pl-5 space-y-4">
              {clinicalSchedule.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div
                    className={`absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white shadow-xs ${
                      item.status === 'done'
                        ? 'bg-emerald-500'
                        : item.status === 'active'
                        ? 'bg-[#2457C5] animate-pulse'
                        : 'bg-slate-300'
                    }`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#173B70]">{item.time}</span>
                      <span className="text-xs font-semibold text-[#334155]">{item.title}</span>
                    </div>
                    <Badge
                      variant={
                        item.status === 'done'
                          ? 'success'
                          : item.status === 'active'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-[10px] w-fit"
                    >
                      {item.status === 'done' ? 'Completed' : item.status === 'active' ? 'Current Session' : 'Scheduled'}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">{item.location}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clinical Quick Access Panel */}
        <div className="space-y-6">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
              <CardTitle className="text-base font-bold text-[#173B70]">
                Clinical Quick Workflows
              </CardTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Direct navigation for diagnostic and prescription orders
              </p>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              <button
                onClick={() => navigate('/doctor/residents')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#E4EDFF] p-2 text-[#2457C5]">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">My Residents Caseload</div>
                    <div className="text-[11px] text-[#64748B]">Active clinical access &amp; care plans</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#64748B]" />
              </button>

              <button
                onClick={() => navigate('/doctor/records')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                    <FileHeart className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">Medical Records &amp; Timeline</div>
                    <div className="text-[11px] text-[#64748B]">Histories, vitals &amp; diagnostic documents</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#64748B]" />
              </button>

              <button
                onClick={() => navigate('/doctor/prescriptions')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#E4EDFF] p-2 text-[#2457C5]">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">Prescription Management</div>
                    <div className="text-[11px] text-[#64748B]">Issue versioned orders &amp; review eMAR</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#64748B]" />
              </button>

              <button
                onClick={() => navigate('/doctor/notes')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-50 p-2 text-purple-700">
                    <NotebookPen className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">Draft Clinical Assessment</div>
                    <div className="text-[11px] text-[#64748B]">Progress notes &amp; auditable addenda</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#64748B]" />
              </button>

              <button
                onClick={() => navigate('/doctor/access-requests')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E6ECF4] hover:border-[#2457C5] hover:bg-[#F4F8FF] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#173B70]">Doctor Access Requests</div>
                    <div className="text-[11px] text-[#64748B]">Request chart review or emergency access</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#64748B]" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
