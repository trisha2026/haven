import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  CheckSquare,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/Dialog.tsx';
import {
  MOCK_DOCTOR_TASKS,
  getDoctorAuthorizedResidents,
  ACTIVE_DOCTOR,
  type DoctorTask,
} from '../../mock/doctorWorkspaceData.ts';

export function DoctorTasksPage() {
  useDocumentTitle('Clinical Tasks & Follow-ups — Doctor');
  const navigate = useNavigate();

  const authorizedResidents = useMemo(() => getDoctorAuthorizedResidents(), []);
  const [tasks, setTasks] = useState<DoctorTask[]>(MOCK_DOCTOR_TASKS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modals
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<DoctorTask | null>(null);
  const [completionNotes, setCompletionNotes] = useState('');

  // New task form state
  const [newTaskResidentId, setNewTaskResidentId] = useState(authorizedResidents[0]?.id || 'RES-044');
  const [newTaskCategory, setNewTaskCategory] = useState<DoctorTask['category']>('Resident Review');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<DoctorTask['priority']>('normal');
  const [newTaskDueDate, setNewTaskDueDate] = useState('Today · 17:00 PM');

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.residentName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [tasks, searchQuery, selectedCategory, selectedStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const urgent = tasks.filter((t) => t.priority === 'urgent' && t.status !== 'completed').length;
    return { total, pending, inProgress, completed, urgent };
  }, [tasks]);

  // Handle Complete Task
  const handleConfirmComplete = () => {
    if (!selectedTask) return;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === selectedTask.id) {
          return {
            ...t,
            status: 'completed',
            completedAt: '15:15 IST',
            completedNotes: completionNotes.trim() || 'Clinical evaluation completed and care plan verified.',
          };
        }
        return t;
      })
    );

    setIsCompleteModalOpen(false);
    setSelectedTask(null);
    setCompletionNotes('');
  };

  // Handle Create Task
  const handleCreateTask = () => {
    if (!newTaskTitle.trim() || !newTaskDescription.trim()) return;

    const res = authorizedResidents.find((r) => r.id === newTaskResidentId);
    if (!res) return;

    const newTaskItem: DoctorTask = {
      id: `DOC-TSK-${Math.floor(100 + Math.random() * 900)}`,
      residentId: res.id,
      residentName: res.fullName,
      room: res.placement.room,
      wing: res.placement.wing,
      category: newTaskCategory,
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      priority: newTaskPriority,
      dueDate: newTaskDueDate.trim(),
      status: 'pending',
      assignedDoctor: ACTIVE_DOCTOR.fullName,
      relatedRecordUrl: `/doctor/residents/${res.id}`,
    };

    setTasks((prev) => [newTaskItem, ...prev]);
    setIsNewTaskOpen(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
            Clinical Tasks & Follow-ups
          </h1>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Prioritized clinical work queue, resident evaluations, lab follow-ups, and prescription renewals
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsNewTaskOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" /> Add Clinical Task
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-haven-blue-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Total Tasks
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                {stats.total}
              </span>
              <span className="text-[11px] text-haven-neutral-500 block mt-0.5">
                Active clinical backlog
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-haven-ice-blue border border-haven-blue-100 flex items-center justify-center text-haven-royal-blue">
              <CheckSquare className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Pending Actions
              </span>
              <span className="text-2xl font-bold text-amber-700 mt-1 block">
                {stats.pending + stats.inProgress}
              </span>
              <span className="text-[11px] text-amber-800 block mt-0.5">
                Requires clinical attention
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Urgent Follow-ups
              </span>
              <span className="text-2xl font-bold text-red-700 mt-1 block">
                {stats.urgent}
              </span>
              <span className="text-[11px] text-red-800 block mt-0.5">
                Time-critical actions
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-haven-neutral-500 uppercase tracking-wider block">
                Completed Today
              </span>
              <span className="text-2xl font-bold text-emerald-700 mt-1 block">
                {stats.completed}
              </span>
              <span className="text-[11px] text-emerald-800 block mt-0.5">
                Evaluated and resolved
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-haven-neutral-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search task, resident, or details..."
            className="pl-8 text-xs h-8"
          />
        </div>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs h-8"
        >
          <option value="all">All Task Categories</option>
          <option value="Resident Review">Resident Review</option>
          <option value="Prescription Review">Prescription Review</option>
          <option value="Medication Exception">Medication Exception</option>
          <option value="Incident Review">Incident Review</option>
          <option value="Lab Follow-up">Lab Follow-up</option>
          <option value="Consultation">Consultation</option>
        </Select>

        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="text-xs h-8"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
      </div>

      {/* Task List Feed */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className={`border transition-colors ${
              task.status === 'completed'
                ? 'border-haven-neutral-200 bg-white opacity-80'
                : task.priority === 'urgent'
                ? 'border-red-300 bg-red-50/15'
                : 'border-haven-neutral-200 bg-white hover:border-haven-blue-300'
            }`}
          >
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-haven-navy-900">
                      {task.title}
                    </span>
                    <Badge variant="outline" className="font-mono text-xs">
                      {task.id}
                    </Badge>
                    <Badge
                      variant={
                        task.priority === 'urgent'
                          ? 'danger'
                          : task.priority === 'high'
                          ? 'warning'
                          : 'secondary'
                      }
                      className="uppercase text-[10px] font-bold"
                    >
                      {task.priority}
                    </Badge>
                    <Badge
                      variant={
                        task.status === 'completed'
                          ? 'success'
                          : task.status === 'in_progress'
                          ? 'info'
                          : 'outline'
                      }
                      className="capitalize text-[10px]"
                    >
                      {task.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-[11px] font-medium text-haven-royal-blue bg-haven-ice-blue px-2 py-0.5 rounded border border-haven-blue-100">
                      {task.category}
                    </span>
                  </div>

                  <p className="text-xs text-haven-neutral-600 flex flex-wrap items-center gap-x-2">
                    <strong className="text-haven-navy-900">{task.residentName}</strong>
                    <span>({task.room} · {task.wing})</span>
                    <span>•</span>
                    <span className="text-haven-neutral-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Due: {task.dueDate}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {task.status !== 'completed' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedTask(task);
                        setCompletionNotes('');
                        setIsCompleteModalOpen(true);
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark Resolved
                    </Button>
                  ) : (
                    <span className="text-emerald-700 font-medium text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolved at {task.completedAt}
                    </span>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(task.relatedRecordUrl)}
                  >
                    Open Record <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>

              <p className="text-haven-neutral-700 leading-relaxed bg-haven-neutral-50 p-2.5 rounded-lg border border-haven-neutral-100">
                {task.description}
              </p>

              {task.completedNotes && (
                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs">
                  <strong>Resolution Findings:</strong> {task.completedNotes}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DIALOG 1: Complete Task Modal */}
      <Dialog open={isCompleteModalOpen} onOpenChange={setIsCompleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Complete Clinical Task
            </DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100">
                <span className="font-bold text-haven-navy-900 block">{selectedTask.title}</span>
                <span className="text-haven-neutral-600 block mt-0.5">
                  Resident: {selectedTask.residentName} ({selectedTask.room})
                </span>
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">
                  Physician Resolution Notes & Directives:
                </label>
                <textarea
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  placeholder="Summarize actions taken, clinical findings, or orders issued..."
                  rows={3}
                  className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsCompleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmComplete}>
              Confirm Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: Create New Clinical Task */}
      <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900">
              Create New Clinical Task
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Target Resident:</label>
                <Select
                  value={newTaskResidentId}
                  onChange={(e) => setNewTaskResidentId(e.target.value)}
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
                <label className="font-semibold text-haven-navy-900 block mb-1">Task Category:</label>
                <Select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as DoctorTask['category'])}
                  className="text-xs"
                >
                  <option value="Resident Review">Resident Review</option>
                  <option value="Prescription Review">Prescription Review</option>
                  <option value="Medication Exception">Medication Exception</option>
                  <option value="Incident Review">Incident Review</option>
                  <option value="Lab Follow-up">Lab Follow-up</option>
                  <option value="Consultation">Consultation</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">Task Title:</label>
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. Comprehensive Geriatric Assessment Review"
                className="text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">Task Description:</label>
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Detail the clinical assessment required, vitals to check, or team members to consult..."
                rows={3}
                className="w-full rounded-lg border border-haven-neutral-300 p-2.5 text-xs text-haven-navy-900 focus:outline-none focus:ring-2 focus:ring-haven-royal-blue/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Priority:</label>
                <Select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as DoctorTask['priority'])}
                  className="text-xs"
                >
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="routine">Routine</option>
                </Select>
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Due By:</label>
                <Input
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  placeholder="e.g. Today · 17:00 PM"
                  className="text-xs"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsNewTaskOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateTask}
              disabled={!newTaskTitle.trim() || !newTaskDescription.trim()}
            >
              Add to Work Queue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
