import { useNavigate } from 'react-router';
import {
  Heart,
  Pill,
  Clock,
  ListChecks,
  QrCode,
  CheckCircle2,
  AlertCircle,
  CalendarClock,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
} from '../../components/ui/index.ts';
import { MOCK_RESIDENTS } from '../../mock/data.ts';

export function CaregiverDashboardPage() {
  useDocumentTitle('Caregiver Command Centre');
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Shift Overview Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-haven-border shadow-haven-card relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-haven-success-soft border border-haven-success-border text-haven-success text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Current Shift: Day Shift (07:00 – 15:00) · Garden Terrace
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-haven-navy-900 tracking-tight">
            Caregiver Command Centre
          </h1>
          <p className="text-sm text-haven-slate-500 leading-relaxed">
            Good afternoon, Sarah. You have 8 residents under direct care today. 2 medication rounds
            completed; afternoon round scheduled for 14:00.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Pill className="w-4 h-4" />}
              onClick={() => navigate('/caregiver/medications')}
            >
              Start 14:00 Medication Round
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<QrCode className="w-4 h-4" />}
              onClick={() => navigate('/caregiver/assignments')}
            >
              Scan Resident QR
            </Button>
            <Button
              variant="subtle"
              size="sm"
              leftIcon={<ClipboardCheck className="w-4 h-4" />}
              onClick={() => navigate('/caregiver/handover')}
            >
              Prepare Shift Handover
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Shift Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" padding="sm" interactive onClick={() => navigate('/caregiver/residents')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
                Assigned Residents
              </span>
              <Heart className="w-4 h-4 text-haven-blue-700" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-slate-900">8</span>
              <Badge variant="success" size="sm" dot>
                All Checked
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Garden Terrace Rooms 201–208</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/caregiver/medications')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
                Due Medications
              </span>
              <Pill className="w-4 h-4 text-haven-warning" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-blue-700">4</span>
              <Badge variant="warning" size="sm">
                14:00 Round
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Lisinopril, Metformin &amp; Eye drops</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/caregiver/tasks')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
                Care Tasks Due
              </span>
              <ListChecks className="w-4 h-4 text-haven-slate-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-slate-900">6</span>
              <Badge variant="secondary" size="sm">
                2 Completed
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Hydration, mobility &amp; repositioning</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/caregiver/schedule')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
                Shift Remaining
              </span>
              <CalendarClock className="w-4 h-4 text-haven-slate-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-slate-900">2h 45m</span>
              <Badge variant="info" size="sm">
                On Schedule
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Handover to Marcus at 15:00</p>
          </div>
        </Card>
      </div>

      {/* Main Split: Assigned Residents & Care Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Residents Quick Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-haven-navy-900">
              My Assigned Residents (Garden Terrace)
            </h3>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/caregiver/residents')}
            >
              View Full List
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_RESIDENTS.map((res) => (
              <Card key={res.id} variant="default" padding="md" interactive>
                <CardHeader action={<Badge variant="outline" size="sm">{res.room}</Badge>}>
                  <CardTitle>{res.name}</CardTitle>
                  <CardDescription>{res.careLevel}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-haven-slate-500">
                    <span>Last checked in:</span>
                    <span className="font-medium text-haven-slate-900">{res.lastCheckIn}</span>
                  </div>
                  <div className="flex items-center justify-between text-haven-slate-500">
                    <span>Allergies:</span>
                    <span className="font-medium text-haven-danger">{res.allergies.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-haven-slate-500">Status:</span>
                    <Badge
                      variant={res.status === 'active' ? 'success' : 'secondary'}
                      dot
                      size="sm"
                    >
                      {res.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Tasks & Follow-ups */}
        <div className="space-y-4">
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-3">
              <div className="flex items-center justify-between w-full">
                <CardTitle as="h4">Afternoon Care Tasks</CardTitle>
                <Badge variant="warning" size="sm">
                  Due Soon
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-2.5">
              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-haven-success mt-0.5 shrink-0" />
                <div className="min-w-0 text-xs">
                  <p className="font-semibold text-haven-slate-900">Morning Vital Signs Verification</p>
                  <p className="text-haven-slate-500">All 8 residents completed at 09:15</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-haven-warning-soft border border-haven-warning-border flex items-start gap-3">
                <Clock className="w-4 h-4 text-haven-warning mt-0.5 shrink-0" />
                <div className="min-w-0 text-xs">
                  <p className="font-semibold text-haven-warning">Vikram Hegde — Hydration Round</p>
                  <p className="text-haven-slate-500">Assisted hydration due at 13:45</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-haven-warning-soft border border-haven-warning-border flex items-start gap-3">
                <Pill className="w-4 h-4 text-haven-warning mt-0.5 shrink-0" />
                <div className="min-w-0 text-xs">
                  <p className="font-semibold text-haven-warning">Ananya Sharma — Lisinopril 10mg</p>
                  <p className="text-haven-slate-500">Room 204-B scheduled for 14:00</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border-light flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-haven-slate-500 mt-0.5 shrink-0" />
                <div className="min-w-0 text-xs">
                  <p className="font-semibold text-haven-slate-900">Shift Handover Preparation</p>
                  <p className="text-haven-slate-500">Compile clinical log before 14:45</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => navigate('/caregiver/tasks')}
              >
                View Full Task Board →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
