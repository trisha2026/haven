import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Bell,
  CheckCircle2,
  Pill,
  ListChecks,
  X,
  ExternalLink,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { MOCK_NOTIFICATIONS, type AppNotification } from '../../mock/notifications.ts';
import { ACTIVE_CAREGIVER } from '../../mock/caregiverWorkspaceData.ts';

export function CaregiverNotificationsPage() {
  useDocumentTitle('Notifications & Alerts — Caregiver');
  const navigate = useNavigate();

  // Caregiver notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>([
    ...MOCK_NOTIFICATIONS.caregiver,
    {
      id: 'ntf-c-4',
      category: 'incident',
      priority: 'high',
      title: 'Incident Standby: Raghavendra Kulkarni',
      message: 'Emergency assignment EMG-2026-004 active. Perform secondary vitals observation for Room 108-A.',
      timeAgo: '45 min ago',
      read: false,
      href: '/caregiver/residents/RES-044',
    },
    {
      id: 'ntf-c-5',
      category: 'staffing',
      priority: 'normal',
      title: 'Shift Handover Reminder',
      message: 'Evening shift lead Rahul Patil arrives at 14:45 PM for Garden Terrace clinical continuity briefing.',
      timeAgo: '1 hr ago',
      read: true,
      href: '/caregiver/handover',
    },
    {
      id: 'ntf-c-6',
      category: 'system',
      priority: 'normal',
      title: 'Floor Stock Restocked: Gloves (M)',
      message: 'Central Pharmacy delivered 5 boxes of Nitrile Gloves to Garden Terrace supply cabinet.',
      timeAgo: '2 hr ago',
      read: true,
      href: '/caregiver/inventory',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered list
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;
      const matchesUnread = !unreadOnly || !n.read;
      return matchesCategory && matchesUnread;
    });
  }, [notifications, selectedCategory, unreadOnly]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Notification dismissed.');
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
              <Bell className="h-3.5 w-3.5 text-[#2457C5]" />
              Staff Alert Stream
            </span>
            <span className="text-xs text-[#64748B]">
              Caregiver: {ACTIVE_CAREGIVER.fullName}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Notifications & Shift Alerts
          </h1>
          <p className="text-sm text-[#4A5568]">
            Stay updated on pending medication rounds, urgent task escalations, and cross-coverage assignments.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[#2457C5] text-[#2457C5] hover:bg-[#F4F8FF]"
            onClick={handleMarkAllRead}
          >
            Mark All as Read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Categories Toolbar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Alerts' },
              { id: 'medication', label: 'Medications' },
              { id: 'task', label: 'Care Tasks' },
              { id: 'staffing', label: 'Staffing & Shifts' },
              { id: 'incident', label: 'Incidents' },
              { id: 'system', label: 'System & Stock' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#173B70] text-white shadow-xs'
                    : 'bg-[#F4F8FF] text-[#173B70] hover:bg-[#E4EDFF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-[#334155] cursor-pointer">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => setUnreadOnly(e.target.checked)}
              className="rounded border-[#E6ECF4] text-[#2457C5] focus:ring-[#2457C5]"
            />
            <span>Show unread only</span>
          </label>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
        <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
          <CardTitle className="text-base font-bold text-[#173B70]">
            Alerts Feed ({filteredNotifications.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E6ECF4]">
            {filteredNotifications.map((ntf) => (
              <div
                key={ntf.id}
                className={`flex items-start justify-between p-4.5 transition-colors gap-3 ${
                  !ntf.read ? 'bg-[#F4F8FF]/60' : 'hover:bg-[#F4F8FF]/20'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`mt-0.5 rounded-lg p-2.5 shrink-0 ${
                      ntf.priority === 'urgent'
                        ? 'bg-rose-50 text-rose-700'
                        : ntf.category === 'medication'
                        ? 'bg-blue-50 text-[#2457C5]'
                        : ntf.category === 'task'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {ntf.category === 'medication' ? (
                      <Pill className="h-4 w-4" />
                    ) : ntf.category === 'task' ? (
                      <ListChecks className="h-4 w-4" />
                    ) : (
                      <Bell className="h-4 w-4" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[#173B70]">{ntf.title}</span>
                      {!ntf.read && (
                        <span className="h-2 w-2 rounded-full bg-[#2457C5]" />
                      )}
                      <Badge
                        variant={
                          ntf.priority === 'urgent'
                            ? 'danger'
                            : ntf.priority === 'high'
                            ? 'warning'
                            : 'secondary'
                        }
                        className="text-[9px] uppercase"
                      >
                        {ntf.priority}
                      </Badge>
                      <span className="text-[11px] text-[#64748B]">{ntf.timeAgo}</span>
                    </div>

                    <p className="text-xs text-[#4A5568]">{ntf.message}</p>

                    {ntf.href && (
                      <Button
                        variant="subtle"
                        size="sm"
                        className="h-6 text-[11px] px-2 text-[#2457C5] hover:bg-[#E4EDFF] mt-1"
                        onClick={() => navigate(ntf.href!)}
                      >
                        Open Record
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    variant="subtle"
                    size="sm"
                    className="h-7 text-xs text-[#64748B]"
                    onClick={() => handleToggleRead(ntf.id)}
                  >
                    {ntf.read ? 'Mark unread' : 'Mark read'}
                  </Button>
                  <button
                    onClick={() => handleDismiss(ntf.id)}
                    className="rounded p-1 text-[#64748B] hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="p-8 text-center text-xs text-[#64748B]">
                No notifications found matching your filter criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
