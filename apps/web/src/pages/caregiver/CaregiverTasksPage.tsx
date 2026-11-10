import { useState, useMemo } from 'react';
import {
  ListChecks,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Flame,
  ShieldAlert,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import {
  MOCK_CAREGIVER_TASKS,
  ACTIVE_CAREGIVER,
  type CaregiverTask,
} from '../../mock/caregiverWorkspaceData.ts';

export function CaregiverTasksPage() {
  useDocumentTitle('Care Tasks & Follow-ups — Caregiver');

  const [tasks, setTasks] = useState<CaregiverTask[]>(MOCK_CAREGIVER_TASKS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Task Execution Modal
  const [selectedTask, setSelectedTask] = useState<CaregiverTask | null>(null);
  const [outcomeAction, setOutcomeAction] = useState<'complete' | 'unable'>('complete');
  const [taskNotes, setTaskNotes] = useState('');
  const [observationValue, setObservationValue] = useState('');
  const [clinicalEscalation, setClinicalEscalation] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending' || t.status === 'in_progress').length;
  const urgentCount = tasks.filter((t) => (t.priority === 'urgent' || t.priority === 'high') && t.status !== 'completed').length;

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.residentName.toLowerCase().includes(q) ||
        t.room.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);

      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesPriority = selectedPriority === 'all' || t.priority === selectedPriority;
      const matchesStatus =
        selectedStatus === 'all'
          ? true
          : selectedStatus === 'completed'
          ? t.status === 'completed'
          : selectedStatus === 'pending'
          ? t.status === 'pending' || t.status === 'in_progress'
          : t.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, selectedCategory, selectedPriority, selectedStatus]);

  // Open modal
  const handleOpenTask = (task: CaregiverTask) => {
    setSelectedTask(task);
    setOutcomeAction('complete');
    setTaskNotes(task.notes || '');
    setObservationValue(task.observationValue || '');
    setClinicalEscalation(task.clinicalEscalationFlag || false);
    setEscalationReason(task.escalationReason || '');
  };

  // Submit task update
  const handleSubmitTask = () => {
    if (!selectedTask) return;

    if (outcomeAction === 'unable' && !taskNotes.trim()) {
      showToast('Please specify the reason why the care task could not be completed.');
      return;
    }

    const timestamp = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id
          ? {
              ...t,
              status: outcomeAction === 'complete' ? 'completed' : 'unable_to_complete',
              completedAt: `${timestamp} IST`,
              completedBy: ACTIVE_CAREGIVER.fullName,
              notes: taskNotes,
              observationValue: observationValue || undefined,
              clinicalEscalationFlag: clinicalEscalation,
              escalationReason: clinicalEscalation ? escalationReason : undefined,
            }
          : t
      )
    );

    showToast(
      outcomeAction === 'complete'
        ? `Task ${selectedTask.id} (${selectedTask.title}) marked as COMPLETED.`
        : `Task ${selectedTask.id} marked as UNABLE TO COMPLETE.`
    );
    setSelectedTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#173B70] px-4 py-3 text-sm font-medium text-white shadow-xl animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <ListChecks className="h-3.5 w-3.5 text-[#2457C5]" />
              Caseload Care Activities
            </span>
            <span className="text-xs text-[#64748B]">
              Caregiver: {ACTIVE_CAREGIVER.fullName}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Care Tasks & Routine Follow-ups
          </h1>
          <p className="text-sm text-[#4A5568]">
            Complete scheduled hygiene, mobility, nutrition and comfort activities for residents in your caseload.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Total Tasks</span>
            <ListChecks className="h-4 w-4 text-[#2457C5]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalCount}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Assigned for today</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-700">{completedCount}</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Recorded with observations</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Pending Action</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-700">{pendingCount}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Due during shift</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Urgent / High Priority</span>
            <Flame className="h-4 w-4 text-orange-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-orange-700">{urgentCount}</div>
          <div className="text-[11px] text-orange-700 mt-0.5">High clinical priority</div>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748B]" />
              <Input
                placeholder="Search tasks, residents, rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <div>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs"
              >
                <option value="all">All Categories</option>
                <option value="Hydration">Hydration</option>
                <option value="Mobility Assistance">Mobility Assistance</option>
                <option value="Meal Assistance">Meal Assistance</option>
                <option value="Personal Hygiene">Personal Hygiene</option>
                <option value="Bathing Assistance">Bathing Assistance</option>
                <option value="Position Changes">Position Changes</option>
                <option value="Routine Observations">Routine Observations</option>
                <option value="Comfort & Wellbeing">Comfort & Wellbeing</option>
                <option value="Follow-up Reminders">Follow-up Reminders</option>
              </Select>
            </div>

            <div>
              <Select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="text-xs"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="routine">Routine</option>
              </Select>
            </div>

            <div>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="unable_to_complete">Unable to Complete</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="border-b border-[#E6ECF4] bg-[#F4F8FF] text-[#173B70] font-semibold">
              <tr>
                <th className="p-3.5">Resident</th>
                <th className="p-3.5">Care Activity & Details</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Time</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECF4]">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="hover:bg-[#F4F8FF]/30 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={t.residentName} size="sm" />
                      <div>
                        <div className="font-bold text-[#173B70]">{t.residentName}</div>
                        <div className="text-[11px] text-[#64748B]">{t.room} · {t.wing}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 max-w-sm">
                    <div className="font-bold text-[#173B70]">{t.title}</div>
                    <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">{t.description}</p>
                    {t.observationValue && (
                      <div className="text-[10px] text-emerald-700 mt-1 font-medium">
                        Observation: {t.observationValue}
                      </div>
                    )}
                    {t.clinicalEscalationFlag && (
                      <div className="text-[10px] text-rose-700 mt-0.5 font-bold flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Clinical Escalation: {t.escalationReason}
                      </div>
                    )}
                  </td>

                  <td className="p-3.5">
                    <Badge variant="outline" className="text-[10px]">
                      {t.category}
                    </Badge>
                  </td>

                  <td className="p-3.5 font-semibold text-[#173B70]">
                    {t.scheduledTime}
                  </td>

                  <td className="p-3.5">
                    <Badge
                      variant={
                        t.priority === 'urgent'
                          ? 'danger'
                          : t.priority === 'high'
                          ? 'warning'
                          : 'secondary'
                      }
                      className="capitalize text-[10px]"
                    >
                      {t.priority}
                    </Badge>
                  </td>

                  <td className="p-3.5">
                    <Badge
                      variant={
                        t.status === 'completed'
                          ? 'success'
                          : t.status === 'unable_to_complete'
                          ? 'danger'
                          : 'warning'
                      }
                      className="capitalize text-[10px]"
                    >
                      {t.status === 'completed'
                        ? 'Done'
                        : t.status === 'unable_to_complete'
                        ? 'Unable'
                        : 'Pending'}
                    </Badge>
                  </td>

                  <td className="p-3.5 text-right">
                    <Button
                      variant={t.status === 'completed' ? 'outline' : 'default'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleOpenTask(t)}
                    >
                      {t.status === 'completed' ? 'Details' : 'Execute'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="p-8 text-center text-xs text-[#64748B]">
            No care tasks matched your filter criteria.
          </div>
        )}
      </Card>

      {/* TASK WORKFLOW MODAL */}
      <Dialog
        open={Boolean(selectedTask)}
        onOpenChange={(open) => !open && setSelectedTask(null)}
      >
        <DialogContent className="max-w-lg">
          {selectedTask && (
            <div className="space-y-4 py-1 text-xs">
              <DialogHeader>
                <DialogTitle className="text-base text-[#173B70]">
                  Care Task Execution — {selectedTask.id}
                </DialogTitle>
                <DialogDescription>
                  {selectedTask.title} for {selectedTask.residentName} ({selectedTask.room})
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF] p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Category:</span>
                  <span className="font-semibold text-[#173B70]">{selectedTask.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Scheduled Window:</span>
                  <span className="text-[#173B70]">{selectedTask.scheduledTime} (Today)</span>
                </div>
                <div className="pt-1 text-[11px] text-[#4A5568] border-t border-[#E6ECF4]">
                  <span className="font-semibold">Prescribed Protocol:</span> {selectedTask.description}
                </div>
              </div>

              {/* Action Selector */}
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Task Outcome *</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setOutcomeAction('complete')}
                    className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-all ${
                      outcomeAction === 'complete'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300'
                        : 'border-[#E6ECF4] bg-white text-[#64748B]'
                    }`}
                  >
                    Mark as Completed
                  </button>
                  <button
                    type="button"
                    onClick={() => setOutcomeAction('unable')}
                    className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-all ${
                      outcomeAction === 'unable'
                        ? 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-300'
                        : 'border-[#E6ECF4] bg-white text-[#64748B]'
                    }`}
                  >
                    Unable to Complete
                  </button>
                </div>
              </div>

              {/* Observation Value (e.g. 250ml consumed or assisted 10 mins) */}
              {outcomeAction === 'complete' && (
                <div>
                  <label className="text-xs font-semibold text-[#173B70]">
                    Specific Care Observation / Measurement
                  </label>
                  <Input
                    placeholder="e.g. Consumed 300 mL fluid OR 15 mins walking with walker"
                    value={observationValue}
                    onChange={(e) => setObservationValue(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-[#173B70]">
                  {outcomeAction === 'complete' ? 'Caregiver Shift Notes' : 'Reason Unable to Complete *'}
                </label>
                <textarea
                  rows={2}
                  required={outcomeAction === 'unable'}
                  placeholder={
                    outcomeAction === 'complete'
                      ? 'Record notes on resident comfort, skin status, or assistance level...'
                      : 'State clinical reason (e.g. resident was in physical therapy, resident resting, doctor consultation)...'
                  }
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
                />
              </div>

              {/* Clinical Escalation Flag */}
              <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clinicalEscalation}
                    onChange={(e) => setClinicalEscalation(e.target.checked)}
                    className="rounded border-amber-400 text-[#2457C5] focus:ring-[#2457C5]"
                  />
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                    Flag Concern for Clinical Attention / Handover
                  </span>
                </label>

                {clinicalEscalation && (
                  <Input
                    placeholder="Describe clinical symptom requiring doctor or incoming nurse review..."
                    value={escalationReason}
                    onChange={(e) => setEscalationReason(e.target.value)}
                    className="text-xs border-amber-300"
                  />
                )}
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTask(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="bg-[#173B70] text-white hover:bg-[#2457C5]"
                  onClick={handleSubmitTask}
                >
                  Save Task Outcome
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
