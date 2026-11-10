import { useLocation, useNavigate } from 'react-router';
import {
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Plus,
  RotateCcw,
} from 'lucide-react';
import type { UserRole } from '../types/navigation.ts';
import { resolveNavEntry } from '../config/navigation/index.ts';
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Badge,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/ui/index.ts';
import { MOCK_RESIDENTS } from '../mock/data.ts';

export interface PlaceholderPageProps {
  role: UserRole;
  title?: string;
  description?: string;
}

export function PlaceholderPage({ role, title: overrideTitle, description: overrideDescription }: PlaceholderPageProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const resolved = resolveNavEntry(role, pathname);
  const title = overrideTitle || resolved?.item.label || 'Module Overview';
  const description =
    overrideDescription ||
    resolved?.item.description ||
    'Elderly care facility operational module and records.';
  const Icon = resolved?.item.icon || FileText;

  useDocumentTitle(title);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-haven-border pb-5">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-haven-blue-700 text-white flex items-center justify-center shrink-0 shadow-haven-sm mt-0.5">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-haven-navy-900">{title}</h1>
              {resolved?.item.badge && (
                <Badge variant={resolved.item.badge.variant} size="sm">
                  {resolved.item.badge.label} pending
                </Badge>
              )}
            </div>
            <p className="text-sm text-haven-slate-500 mt-1 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
            Filter View
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Entry
          </Button>
        </div>
      </div>

      {/* Module Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" padding="sm">
          <div className="p-3">
            <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
              Active Records
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-slate-900">48</span>
              <Badge variant="success" size="sm" dot>
                Verified
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Updated 12 mins ago</p>
          </div>
        </Card>

        <Card variant="default" padding="sm">
          <div className="p-3">
            <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
              Pending Actions
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-blue-700">3</span>
              <Badge variant="warning" size="sm">
                Attention
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">2 scheduled for next round</p>
          </div>
        </Card>

        <Card variant="default" padding="sm">
          <div className="p-3">
            <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
              Compliance Status
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-success">99.4%</span>
              <Badge variant="info" size="sm">
                Audit Pass
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Regulatory checks logged</p>
          </div>
        </Card>

        <Card variant="default" padding="sm">
          <div className="p-3">
            <span className="text-xs font-semibold text-haven-slate-500 uppercase tracking-wider">
              Assigned Personnel
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-haven-slate-900">14</span>
              <Badge variant="secondary" size="sm">
                Shift Active
              </Badge>
            </div>
            <p className="text-[11px] text-haven-slate-500 mt-1">Across 4 resident wings</p>
          </div>
        </Card>
      </div>

      {/* Primary Data Table Section */}
      <Card variant="default" padding="none">
        <CardHeader className="p-5 border-b border-haven-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
            <div>
              <CardTitle>{title} Ledger</CardTitle>
              <CardDescription>
                Live operational records and caregiver verification log for {resolved?.group?.label || 'HAVEN Care'}.
              </CardDescription>
            </div>
            <Badge variant="secondary" size="sm">
              Anandam Care Residence, Bengaluru
            </Badge>
          </div>
        </CardHeader>

        <Table containerClassName="border-0 rounded-none shadow-none">
          <TableHeader>
            <TableRow>
              <TableHead>Resident / Subject</TableHead>
              <TableHead>Room &amp; Wing</TableHead>
              <TableHead>Care Classification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Lead</TableHead>
              <TableHead>Last Verified</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_RESIDENTS.map((res) => (
              <TableRow key={res.id}>
                <TableCell className="font-semibold text-haven-slate-900">
                  <div>
                    <span>{res.name}</span>
                    <span className="block text-xs font-normal text-haven-slate-500">
                      ID: {res.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-xs text-haven-slate-900">{res.room}</span>
                  <span className="block text-[11px] text-haven-slate-500">{res.wing}</span>
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
                <TableCell className="text-xs text-haven-slate-500">
                  {res.primaryNurse}
                </TableCell>
                <TableCell className="text-xs text-haven-slate-900">
                  <div className="flex items-center gap-1 text-haven-slate-500">
                    <Clock className="w-3.5 h-3.5 text-haven-slate-500" />
                    <span>{res.lastCheckIn}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <CardFooter className="p-4 bg-haven-slate-50/50 border-t border-haven-border">
          <span className="text-xs text-haven-slate-500">
            Showing 4 of 48 active records in this facility registry.
          </span>
          <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Refresh Ledger
          </Button>
        </CardFooter>
      </Card>

      {/* Info Card explaining module state */}
      <Card variant="subtle" padding="md">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-haven-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-haven-navy-900 uppercase tracking-wider">
              Frontend Shared Layout Preview
            </h4>
            <p className="text-xs text-haven-slate-500 leading-relaxed">
              This route (<code>{pathname}</code>) is fully configured within the {role.toUpperCase()} navigation structure.
              Use the sidebar to navigate between modules, or test the global search (<code>⌘K</code>) and notification drawer.
            </p>
            <div className="pt-2">
              <Button
                variant="subtle"
                size="sm"
                onClick={() => navigate('/design-system')}
              >
                Inspect Component Design System Gallery →
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
