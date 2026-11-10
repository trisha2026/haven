import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  CheckCircle2,
  AlertTriangle,
  Pill,
  ArrowRight,
  Filter,
  CheckCheck,
  Stethoscope,
  Info,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';

interface DoctorNotification {
  id: string;
  category: 'clinical_review' | 'med_exception' | 'specialist_grant' | 'system';
  title: string;
  message: string;
  residentName?: string;
  residentId?: string;
  timestamp: string;
  isRead: boolean;
  priority: 'urgent' | 'high' | 'normal';
  actionUrl: string;
  actionLabel: string;
}

const INITIAL_NOTIFICATIONS: DoctorNotification[] = [
  {
    id: 'NOTIF-01',
    category: 'clinical_review',
    title: 'Physician Post-Incident Review Required',
    message: 'Resident Raghavendra Kulkarni experienced an unassisted transfer slip in Room 108-A (INC-2026-088). Clinical physical assessment and sign-off required.',
    residentName: 'Raghavendra Kulkarni',
    residentId: 'RES-044',
    timestamp: 'Today · 09:30 AM IST',
    isRead: false,
    priority: 'urgent',
    actionUrl: '/doctor/incidents',
    actionLabel: 'Review Incident Record',
  },
  {
    id: 'NOTIF-02',
    category: 'med_exception',
    title: 'Caregiver eMAR Medication Exception Logged',
    message: 'Morning dose of Lisinopril 10mg was rescheduled to 14:00 by Caregiver Priya Shetty due to resident report of nausea. Review blood pressure and authorize directive.',
    residentName: 'Ananya Sharma',
    residentId: 'RES-041',
    timestamp: 'Today · 08:15 AM IST',
    isRead: false,
    priority: 'high',
    actionUrl: '/doctor/prescriptions',
    actionLabel: 'Review Med Exception',
  },
  {
    id: 'NOTIF-03',
    category: 'specialist_grant',
    title: 'Specialist Consultation Access Active',
    message: 'Access Grant GRT-2026-08 for Aarav Deshmukh is active. Memory care psychotropic and sundowning behavioral review due.',
    residentName: 'Aarav Deshmukh',
    residentId: 'RES-004',
    timestamp: 'Yesterday · 11:30 AM IST',
    isRead: false,
    priority: 'high',
    actionUrl: '/doctor/residents/RES-004',
    actionLabel: 'Open Memory Profile',
  },
  {
    id: 'NOTIF-04',
    category: 'clinical_review',
    title: 'Upcoming 6-Month Prescription Renewal',
    message: 'Atorvastatin 10mg prescription for Nandini Iyer expires in 20 days. Recent lipid panel ready for clinical review.',
    residentName: 'Nandini Iyer',
    residentId: 'RES-043',
    timestamp: 'Nov 08, 2026 · 14:20 IST',
    isRead: true,
    priority: 'normal',
    actionUrl: '/doctor/prescriptions',
    actionLabel: 'Renew Prescription',
  },
  {
    id: 'NOTIF-05',
    category: 'system',
    title: 'HAVEN Clinical Directorate Update',
    message: 'Karnataka Medical Council geriatric pharmacotherapy guidelines v2.4 adopted. Digital countersignatures active on all SOAP notes.',
    timestamp: 'Nov 07, 2026 · 10:00 IST',
    isRead: true,
    priority: 'normal',
    actionUrl: '/doctor/notes',
    actionLabel: 'Clinical Notes',
  },
];

export function DoctorNotificationsPage() {
  useDocumentTitle('Notifications & Clinical Alerts — Doctor');
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<DoctorNotification[]>(INITIAL_NOTIFICATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Toggle single notification read
  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;
      const matchesUnread = !unreadOnly || !n.isRead;
      return matchesCategory && matchesUnread;
    });
  }, [notifications, selectedCategory, unreadOnly]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
              Clinical Alerts & Notifications
            </h1>
            {unreadCount > 0 && (
              <Badge variant="warning" className="font-semibold text-xs">
                {unreadCount} Unread
              </Badge>
            )}
          </div>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Real-time clinical alerts, medication exceptions, incident referrals, and specialist grant notifications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUnreadOnly((prev) => !prev)}
            className={unreadOnly ? 'border-haven-royal-blue text-haven-royal-blue bg-haven-ice-blue' : ''}
          >
            <Filter className="w-4 h-4 mr-1.5" />
            {unreadOnly ? 'Showing Unread' : 'Filter Unread'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="w-4 h-4 mr-1.5" /> Mark All as Read
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {[
          { id: 'all', label: 'All Notifications' },
          { id: 'clinical_review', label: 'Clinical Reviews' },
          { id: 'med_exception', label: 'Medication Exceptions' },
          { id: 'specialist_grant', label: 'Specialist Grants' },
          { id: 'system', label: 'System & Policy' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
              selectedCategory === tab.id
                ? 'bg-haven-royal-blue text-white shadow-xs font-semibold'
                : 'bg-white border border-haven-neutral-200 text-haven-neutral-600 hover:bg-haven-ice-blue/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.map((notif) => {
          const Icon =
            notif.category === 'clinical_review'
              ? AlertTriangle
              : notif.category === 'med_exception'
              ? Pill
              : notif.category === 'specialist_grant'
              ? Stethoscope
              : Info;

          return (
            <Card
              key={notif.id}
              className={`border transition-all ${
                !notif.isRead
                  ? 'border-haven-blue-200 bg-white shadow-xs'
                  : 'border-haven-neutral-200 bg-white opacity-85'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      notif.priority === 'urgent'
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : notif.priority === 'high'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-haven-ice-blue text-haven-royal-blue border border-haven-blue-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-haven-royal-blue shrink-0" />
                        )}
                        <h3 className="text-sm font-bold text-haven-navy-900">
                          {notif.title}
                        </h3>
                        <Badge
                          variant={
                            notif.priority === 'urgent'
                              ? 'danger'
                              : notif.priority === 'high'
                              ? 'warning'
                              : 'secondary'
                          }
                          className="text-[10px] uppercase font-bold"
                        >
                          {notif.priority}
                        </Badge>
                      </div>

                      <span className="text-[11px] font-mono text-haven-neutral-400">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-haven-neutral-700 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-haven-neutral-100">
                      {notif.residentName ? (
                        <span className="text-haven-neutral-600">
                          Resident: <strong>{notif.residentName}</strong> ({notif.residentId})
                        </span>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleRead(notif.id)}
                          className="text-xs text-haven-neutral-500 hover:text-haven-navy-900"
                        >
                          {notif.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        </Button>

                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(notif.actionUrl)}
                        >
                          {notif.actionLabel} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredNotifications.length === 0 && (
          <Card className="p-8 text-center border-dashed border-haven-neutral-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-haven-navy-900">No Notifications</h4>
            <p className="text-xs text-haven-neutral-500 mt-1">
              You are all caught up on your clinical alerts and notifications.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
