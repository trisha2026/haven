import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertTriangle,
  Pill,
  Users,
  KeyRound,
  ShieldAlert,
  Package,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import { EmptyState } from '../ui/EmptyState.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/Dialog.tsx';
import {
  MOCK_PRIORITY_ACTIONS,
  type PriorityActionItem,
  type ActionCategory,
  type ActionPriority,
} from '../../mock/adminDashboard.ts';
import { cn } from '../../utils/cn.ts';

const CATEGORY_ICONS: Record<ActionCategory, React.ElementType> = {
  incident: ShieldAlert,
  medication: Pill,
  staffing: Users,
  access: KeyRound,
  inventory: Package,
};

const PRIORITY_ORDER: Record<ActionPriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export function PriorityActionQueue() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ActionCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<PriorityActionItem | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Filter and sort items by priority urgency then timestamp
  const sortedAndFilteredItems = useMemo(() => {
    return MOCK_PRIORITY_ACTIONS
      .filter((item) => selectedCategory === 'all' || item.category === selectedCategory)
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
  }, [selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MOCK_PRIORITY_ACTIONS.length };
    for (const item of MOCK_PRIORITY_ACTIONS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  const handleActionExecute = (item: PriorityActionItem) => {
    // If there is a direct navigation route, navigate or show dialog
    setSelectedItem(item);
  };

  const handleDialogApprove = (item: PriorityActionItem) => {
    setActionSuccessMessage(`Action executed for "${item.title}". Administrative audit logged.`);
    setTimeout(() => {
      setActionSuccessMessage(null);
      setSelectedItem(null);
    }, 1500);
  };

  return (
    <>
      <Card variant="default" padding="lg" className="border-haven-blue-500/20 shadow-haven-card">
        {/* Header Section */}
        <CardHeader className="pb-4 border-b border-haven-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-haven-danger-soft text-haven-danger flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <CardTitle as="h2" className="text-xl">Priority Action Queue</CardTitle>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-haven-danger-soft text-haven-danger border border-haven-danger-border">
                  {MOCK_PRIORITY_ACTIONS.length} Pending Exceptions
                </span>
              </div>
              <CardDescription>
                Urgent facility exceptions requiring administrative decisions, staffing dispatch, or physician review.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => navigate('/admin/incidents')}
              >
                View Incident Board
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Category Filters */}
        <div className="py-3.5 flex flex-wrap items-center gap-1.5 border-b border-haven-border-light text-xs">
          <span className="text-haven-slate-500 flex items-center gap-1 mr-2 text-[11px] font-semibold uppercase tracking-wider">
            <Filter className="w-3 h-3" />
            Filter by:
          </span>

          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer',
              selectedCategory === 'all'
                ? 'bg-haven-blue-700 text-white shadow-haven-sm'
                : 'bg-haven-slate-50 text-haven-slate-700 hover:bg-haven-slate-100 hover:text-haven-slate-900 border border-haven-border'
            )}
          >
            All Exceptions ({categoryCounts.all ?? 0})
          </button>

          {(['incident', 'medication', 'staffing', 'access', 'inventory'] as ActionCategory[]).map((cat) => {
            const count = categoryCounts[cat] ?? 0;
            const Icon = CATEGORY_ICONS[cat];
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg font-medium capitalize flex items-center gap-1.5 transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-haven-blue-700 text-white shadow-haven-sm'
                    : 'bg-haven-slate-50 text-haven-slate-700 hover:bg-haven-slate-100 hover:text-haven-slate-900 border border-haven-border'
                )}
              >
                <Icon className={cn('w-3.5 h-3.5', isSelected ? 'text-white' : 'text-haven-slate-500')} />
                <span>{cat}</span>
                <span className={cn('text-[11px] px-1.5 py-0.2 rounded-full', isSelected ? 'bg-white/20 text-white' : 'bg-haven-slate-100 text-haven-slate-700')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Queue List */}
        <CardContent className="p-0 pt-4 space-y-3">
          {sortedAndFilteredItems.length > 0 ? (
            sortedAndFilteredItems.map((item) => {
              const Icon = CATEGORY_ICONS[item.category];

              return (
                <div
                  key={item.id}
                  className={cn(
                    'p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4',
                    item.priority === 'critical'
                      ? 'bg-haven-danger-soft/30 border-haven-danger-border/60 hover:border-haven-danger'
                      : item.priority === 'high'
                      ? 'bg-haven-warning-soft/20 border-haven-warning-border/60 hover:border-haven-warning'
                      : 'bg-white border-haven-border hover:border-haven-blue-500/40 hover:bg-haven-blue-50/20'
                  )}
                >
                  {/* Left Column: Icon + Core Content */}
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-haven-sm mt-0.5',
                        item.priority === 'critical'
                          ? 'bg-haven-danger text-white'
                          : item.priority === 'high'
                          ? 'bg-haven-warning text-white'
                          : 'bg-haven-blue-100 text-haven-blue-700'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-haven-slate-900">
                          {item.title}
                        </span>

                        <Badge
                          variant={
                            item.priority === 'critical'
                              ? 'danger'
                              : item.priority === 'high'
                              ? 'warning'
                              : item.priority === 'medium'
                              ? 'info'
                              : 'secondary'
                          }
                          size="sm"
                          dot
                        >
                          {item.priority.toUpperCase()}
                        </Badge>

                        <span className="text-[11px] font-mono text-haven-slate-500">
                          {item.id}
                        </span>
                      </div>

                      <p className="text-xs text-haven-slate-700 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Context Pills */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-haven-slate-500">
                        {item.context.residentName && (
                          <span className="inline-flex items-center gap-1">
                            <span className="font-medium text-haven-slate-900">Resident:</span>
                            {item.context.residentName} {item.context.room && `(${item.context.room})`}
                          </span>
                        )}

                        {item.context.medicineName && (
                          <span className="inline-flex items-center gap-1">
                            <span className="font-medium text-haven-slate-900">Medication:</span>
                            {item.context.medicineName}
                          </span>
                        )}

                        {item.context.staffName && (
                          <span className="inline-flex items-center gap-1">
                            <span className="font-medium text-haven-slate-900">Staff:</span>
                            {item.context.staffName}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 text-haven-slate-500 ml-auto sm:ml-0">
                          <Clock className="w-3 h-3 text-haven-slate-500" />
                          <span>{item.timestamp}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 self-end sm:self-center">
                    <Button
                      variant={item.priority === 'critical' ? 'danger' : 'outline'}
                      size="sm"
                      onClick={() => handleActionExecute(item)}
                    >
                      {item.actionLabel}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedItem(item)}
                      aria-label={`View details for ${item.title}`}
                    >
                      <ChevronRight className="w-4 h-4 text-haven-slate-500" />
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              compact
              icon={<CheckCircle2 className="w-6 h-6 text-haven-success" />}
              title="No Actions Pending in This Category"
              description="All operational exceptions under this filter have been addressed or resolved."
              action={
                <Button variant="outline" size="sm" onClick={() => setSelectedCategory('all')}>
                  Reset Filter
                </Button>
              }
            />
          )}
        </CardContent>
      </Card>

      {/* DETAIL MODAL FOR QUEUE ITEMS */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent maxWidth="lg">
          {selectedItem && (
            <div>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          selectedItem.priority === 'critical'
                            ? 'danger'
                            : selectedItem.priority === 'high'
                            ? 'warning'
                            : 'info'
                        }
                        size="sm"
                        dot
                      >
                        {selectedItem.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <span className="text-xs font-mono text-haven-slate-500">
                        {selectedItem.id} · Category: {selectedItem.category.toUpperCase()}
                      </span>
                    </div>
                    <DialogTitle>{selectedItem.title}</DialogTitle>
                    <DialogDescription>
                      Reported {selectedItem.timestamp} · Current Status: {selectedItem.status.toUpperCase()}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="py-4 space-y-4 text-xs">
                {actionSuccessMessage && (
                  <div className="p-3 rounded-xl bg-haven-success-soft border border-haven-success-border text-haven-success flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{actionSuccessMessage}</span>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-2">
                  <h4 className="font-bold text-haven-slate-900 text-xs">Clinical &amp; Operational Assessment</h4>
                  <p className="text-haven-slate-700 leading-relaxed">{selectedItem.summary}</p>
                  <p className="text-haven-slate-500 leading-relaxed border-t border-haven-border-light pt-2">
                    <strong>Administrative Protocol Note:</strong> {selectedItem.actionDetails}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-haven-border space-y-1.5">
                    <span className="font-semibold text-haven-slate-900">Contextual Entities</span>
                    <ul className="space-y-1 text-haven-slate-500">
                      {selectedItem.context.residentName && (
                        <li>• Resident: <strong className="text-haven-slate-900">{selectedItem.context.residentName}</strong></li>
                      )}
                      {selectedItem.context.room && (
                        <li>• Location: <strong className="text-haven-slate-900">{selectedItem.context.room}</strong></li>
                      )}
                      {selectedItem.context.medicineName && (
                        <li>• Medication: <strong className="text-haven-slate-900">{selectedItem.context.medicineName}</strong></li>
                      )}
                      {selectedItem.context.staffName && (
                        <li>• Lead Staff: <strong className="text-haven-slate-900">{selectedItem.context.staffName}</strong></li>
                      )}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-haven-border space-y-1.5">
                    <span className="font-semibold text-haven-slate-900">Governance &amp; Authorization</span>
                    <p className="text-haven-slate-500 leading-relaxed">
                      All administrative authorizations require audit signature countersign. Prescriptions and medical orders cannot be altered without a licensed physician order.
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => {
                    setSelectedItem(null);
                    navigate(selectedItem.navigationPath);
                  }}
                >
                  Navigate to Module →
                </Button>
                <Button
                  variant={selectedItem.priority === 'critical' ? 'danger' : 'primary'}
                  size="sm"
                  onClick={() => handleDialogApprove(selectedItem)}
                >
                  Execute: {selectedItem.actionLabel}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
