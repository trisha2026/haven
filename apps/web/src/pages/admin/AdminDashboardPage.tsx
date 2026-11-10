import { useNavigate } from 'react-router';
import {
  Users,
  BedDouble,
  Pill,
  AlertTriangle,
  HeartHandshake,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  CalendarClock,
  FileCheck2,
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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/index.ts';
import { MOCK_RESIDENTS } from '../../mock/data.ts';

export function AdminDashboardPage() {
  useDocumentTitle('Command Centre');
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-haven-cream rounded-3xl p-6 sm:p-8 border border-haven-border shadow-haven-card relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-haven-greige/50 border border-haven-border text-haven-mocha-dark text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-haven-mocha" />
            Facility Operations Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-haven-charcoal tracking-tight">
            Administrator Command Centre
          </h1>
          <p className="text-sm text-haven-charcoal-muted leading-relaxed">
            Willow Creek Residence · 4 wings · 64 beds · All emergency response systems operational.
            Shift handover for Day Shift in progress.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Users className="w-4 h-4" />}
              onClick={() => navigate('/admin/residents')}
            >
              Manage Residents
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<CalendarClock className="w-4 h-4" />}
              onClick={() => navigate('/admin/attendance')}
            >
              Shift Rosters
            </Button>
            <Button
              variant="subtle"
              size="sm"
              leftIcon={<AlertTriangle className="w-4 h-4 text-haven-danger" />}
              onClick={() => navigate('/admin/incidents')}
            >
              Review Incidents (2 pending)
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" padding="sm" interactive onClick={() => navigate('/admin/rooms')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-charcoal-muted uppercase tracking-wider">
                Bed Occupancy
              </span>
              <BedDouble className="w-4 h-4 text-haven-taupe" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-charcoal">58 / 64</span>
              <Badge variant="success" size="sm">
                90.6%
              </Badge>
            </div>
            <p className="text-[11px] text-haven-charcoal-muted mt-1">6 available for admission</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/admin/caregivers')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-charcoal-muted uppercase tracking-wider">
                Staff On Duty
              </span>
              <HeartHandshake className="w-4 h-4 text-haven-taupe" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-charcoal">18</span>
              <Badge variant="secondary" size="sm">
                Full Coverage
              </Badge>
            </div>
            <p className="text-[11px] text-haven-charcoal-muted mt-1">14 RN/LPN + 4 Assistants</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/admin/medications')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-charcoal-muted uppercase tracking-wider">
                Medication Adherence
              </span>
              <Pill className="w-4 h-4 text-haven-taupe" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-mocha">98.2%</span>
              <Badge variant="warning" size="sm">
                3 due now
              </Badge>
            </div>
            <p className="text-[11px] text-haven-charcoal-muted mt-1">112 scheduled doses today</p>
          </div>
        </Card>

        <Card variant="default" padding="sm" interactive onClick={() => navigate('/admin/doctors')}>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-haven-charcoal-muted uppercase tracking-wider">
                Physicians Active
              </span>
              <Stethoscope className="w-4 h-4 text-haven-taupe" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-charcoal">3</span>
              <Badge variant="info" size="sm">
                1 On Site
              </Badge>
            </div>
            <p className="text-[11px] text-haven-charcoal-muted mt-1">Dr. Mehta in Garden Terrace</p>
          </div>
        </Card>
      </div>

      {/* Main Split: Resident Registry & Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Resident Registry Status */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="default" padding="none">
            <CardHeader className="p-5 border-b border-haven-borderLight">
              <div className="flex items-center justify-between w-full">
                <div>
                  <CardTitle>Resident Status Registry</CardTitle>
                  <CardDescription>
                    Real-time monitoring across Sunrise, Garden, Orchard &amp; Highland wings.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => navigate('/admin/residents')}
                >
                  View All Residents
                </Button>
              </div>
            </CardHeader>

            <Table containerClassName="border-0 rounded-none shadow-none">
              <TableHeader>
                <TableRow>
                  <TableHead>Resident</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Care Tier</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Primary Nurse</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_RESIDENTS.map((res) => (
                  <TableRow key={res.id}>
                    <TableCell className="font-semibold text-haven-charcoal">
                      <div>
                        <span>{res.name}</span>
                        <span className="block text-xs font-normal text-haven-charcoal-muted">
                          Age {res.age}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <span className="font-medium text-haven-charcoal">{res.room}</span>
                      <span className="block text-haven-charcoal-muted">{res.wing}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" size="sm">
                        {res.careLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={res.status === 'active' ? 'success' : res.status === 'resting' ? 'secondary' : 'warning'}
                        dot
                        size="sm"
                      >
                        {res.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-haven-charcoal-muted">
                      {res.primaryNurse}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Right 1 Col: Urgent Operational Alerts & Tasks */}
        <div className="space-y-4">
          <Card variant="default" padding="md">
            <CardHeader className="p-0 pb-3">
              <div className="flex items-center justify-between w-full">
                <CardTitle as="h4">Action Queue</CardTitle>
                <Badge variant="warning" size="sm">
                  Priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <div className="p-3 rounded-xl bg-haven-danger-soft border border-haven-danger-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-haven-danger">Fall Incident Review</span>
                  <span className="text-[10px] text-haven-danger">6m ago</span>
                </div>
                <p className="text-xs text-haven-charcoal">
                  George Carver Jr. in Orchard Meadow. Form signed by Nurse Kim.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => navigate('/admin/incidents')}
                >
                  Review Incident Report
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-haven-warning-soft border border-haven-warning-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-haven-warning">Shift Coverage Gap</span>
                  <span className="text-[10px] text-haven-warning">24m ago</span>
                </div>
                <p className="text-xs text-haven-charcoal">
                  Night shift short 1 caregiver in Sunrise Pavilion (23:00 – 07:00).
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => navigate('/admin/emergency-assignments')}
                >
                  Assign On-Call Cover
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-haven-offwhite border border-haven-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-haven-charcoal">Doctor Access Request</span>
                  <span className="text-[10px] text-haven-charcoal-muted">1h ago</span>
                </div>
                <p className="text-xs text-haven-charcoal-muted">
                  Dr. Ward requested records for Eleanor Vance (Cardiology).
                </p>
                <Button
                  variant="subtle"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => navigate('/admin/access-requests')}
                >
                  Review Access Scope
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Facility Compliance Pill */}
          <Card variant="subtle" padding="sm">
            <div className="p-2 flex items-center gap-3">
              <FileCheck2 className="w-5 h-5 text-haven-success shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-haven-charcoal">Fire &amp; Life Safety Check</p>
                <p className="text-[11px] text-haven-charcoal-muted">Completed today at 08:30 by Facilities Team</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
