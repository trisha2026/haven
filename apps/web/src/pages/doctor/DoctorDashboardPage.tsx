import { useNavigate } from 'react-router';
import {
  Stethoscope,
  FileHeart,
  Pill,
  AlertTriangle,
  NotebookPen,
  KeyRound,
  ArrowRight,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
} from '../../components/ui/index.ts';
import { MOCK_RESIDENTS } from '../../mock/data.ts';

export function DoctorDashboardPage() {
  useDocumentTitle('Doctor Command Centre');
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Clinical Lead Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-haven-border shadow-haven-card relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-haven-blue-100 border border-haven-blue-500/20 text-haven-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-haven-blue-700" />
            Clinical Practice &amp; Medical Oversight
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-haven-navy-900 tracking-tight">
            Doctor Command Centre
          </h1>
          <p className="text-sm text-haven-slate-500 leading-relaxed">
            Good afternoon, Dr. Mehta. You have 1 incident clinical review, 2 prescription renewals,
            and 4 comprehensive assessments pending your sign-off today.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<FileHeart className="w-4 h-4" />}
              onClick={() => navigate('/doctor/records')}
            >
              Resident Medical Records
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Pill className="w-4 h-4" />}
              onClick={() => navigate('/doctor/prescriptions')}
            >
              Prescription Orders
            </Button>
            <Button
              variant="subtle"
              size="sm"
              leftIcon={<AlertTriangle className="w-4 h-4 text-haven-danger" />}
              onClick={() => navigate('/doctor/incidents')}
            >
              Review Incidents (1 pending)
            </Button>
          </div>
        </div>
      </div>

      {/* Clinical KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" padding="sm" interactive onClick={() => navigate('/doctor/residents')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
                Residents Under Care
              </span>
              <FileHeart className="w-4 h-4 text-haven-slate-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-slate-900">24</span>
              <Badge variant="success" size="sm">
                Active Access
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Garden Terrace &amp; Sunrise Pavilion</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/doctor/prescriptions')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
                Rx Authorizations
              </span>
              <Pill className="w-4 h-4 text-haven-slate-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-blue-700">2</span>
              <Badge variant="warning" size="sm">
                Action Due
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Metformin renewal &amp; antibiotic titration</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/doctor/notes')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
                Assessments Done
              </span>
              <NotebookPen className="w-4 h-4 text-haven-slate-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-slate-900">7</span>
              <Badge variant="secondary" size="sm">
                This Week
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Cognitive &amp; mobility reviews logged</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/doctor/access-requests')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
                Access Permissions
              </span>
              <KeyRound className="w-4 h-4 text-haven-slate-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-slate-900">Valid</span>
              <Badge variant="info" size="sm">
                HIPAA / GDPR
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Full audit trail maintained</p>
          </div>
        </Card>
      </div>

      {/* Main Split: Clinical Review List & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Clinical Resident Reviews */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-haven-navy-900">
              Clinical Review Roster
            </h3>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/doctor/residents')}
            >
              All Residents
            </Button>
          </div>

          <div className="space-y-3">
            {MOCK_RESIDENTS.map((res) => (
              <Card key={res.id} variant="default" padding="md" interactive>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-haven-slate-900">{res.name}</span>
                      <Badge variant="outline" size="sm">{res.careLevel}</Badge>
                      <Badge variant="secondary" size="sm">{res.room}</Badge>
                    </div>
                    <p className="text-xs text-haven-slate-500">
                      Allergies: <strong className="text-haven-danger">{res.allergies.join(', ')}</strong> · Lead Nurse: {res.primaryNurse}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/doctor/records')}
                    >
                      Medical Chart
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/doctor/notes')}
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Doctor Clinical Action Queue */}
        <div className="space-y-4">
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-3">
              <div className="flex items-center justify-between w-full">
                <CardTitle as="h4">Clinical Actions Due</CardTitle>
                <Badge variant="danger" size="sm">
                  1 Urgent
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <div className="p-3 rounded-xl bg-haven-danger-soft border border-haven-danger-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-haven-danger">Fall Assessment Sign-Off</span>
                  <span className="text-[10px] text-haven-danger">1h 45m ago</span>
                </div>
                <p className="text-xs text-haven-slate-900">
                  George Washington Carver Jr. (Room 108-A). Physical therapy consult recommended.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => navigate('/doctor/incidents')}
                >
                  Conduct Clinical Review
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-haven-warning-soft border border-haven-warning-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-haven-warning">Lab Result: Arthur Pendelton</span>
                  <span className="text-[10px] text-haven-warning">2h ago</span>
                </div>
                <p className="text-xs text-haven-slate-900">
                  HbA1c results uploaded (7.1%). Dose adjustment suggested.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => navigate('/doctor/prescriptions')}
                >
                  Adjust Prescription
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-haven-slate-900">Access Granted: Martha Higgins</span>
                  <span className="text-[10px] text-haven-slate-500">45m ago</span>
                </div>
                <p className="text-xs text-haven-slate-500">
                  Full medical record access active until 30 November.
                </p>
                <Button
                  variant="subtle"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => navigate('/doctor/records')}
                >
                  Inspect Patient Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
