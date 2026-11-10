import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  CheckCheck,
  Trash2,
  Pill,
  Users,
  KeyRound,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { MOCK_NOTIFICATIONS, type AppNotification } from '../../mock/notifications.ts';

const EXTENDED_ADMIN_NOTIFICATIONS: AppNotification[] = [
  ...MOCK_NOTIFICATIONS.admin,
  {
    id: 'ntf-a-6',
    category: 'incident',
    priority: 'urgent',
    title: 'Fall Risk Assessment Required — Room 104',
    message: 'Aarav Deshmukh experienced evening sundowning agitation (INC-2026-088). Clinical review sign-off pending.',
    timeAgo: '45 min ago',
    read: false,
    href: '/admin/incidents',
  },
  {
    id: 'ntf-a-7',
    category: 'staffing',
    priority: 'high',
    title: 'Unplanned Leave Request Submitted',
    message: 'Karan Verma LPN requested medical emergency leave for 11-13 Nov. Shift coverage assessment required.',
    timeAgo: '2 hrs ago',
    read: false,
    href: '/admin/leave-requests',
  },
  {
    id: 'ntf-a-8',
    category: 'medication',
    priority: 'high',
    title: 'eMAR Dose Exception: Enoxaparin 40mg',
    message: 'Sneha Joshi RN recorded dose withheld due to pre-procedure hold for Kavya Reddy (Room 201).',
    timeAgo: '3 hrs ago',
    read: true,
    href: '/admin/medications',
  },
  {
    id: 'ntf-a-9',
    category: 'access',
    priority: 'normal',
    title: 'Specialist Access Request: Dr. Meenakshi Sundaram',
    message: 'Geriatric psychiatrist requested 48-hour clinical access for Aarav Deshmukh (REQ-2026-042).',
    timeAgo: '4 hrs ago',
    read: false,
    href: '/admin/access-requests',
  },
  {
    id: 'ntf-a-10',
    category: 'system',
    priority: 'normal',
    title: 'Automated Bed Census Audit Completed',
    message: 'Daily census reconciliation matched 58 occupied beds and 4 available beds with RFID badges.',
    timeAgo: '6 hrs ago',
    read: true,
    href: '/admin/rooms',
  },
];

export function AdminNotificationsPage() {
  useDocumentTitle('Notification Centre — Administrator');

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>(EXTENDED_ADMIN_NOTIFICATIONS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterReadStatus, setFilterReadStatus] = useState<'all' | 'unread' | 'read'>('all');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const criticalCount = notifications.filter((n) => n.priority === 'urgent').length;

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
      const matchesRead =
        filterReadStatus === 'all' ||
        (filterReadStatus === 'unread' && !n.read) ||
        (filterReadStatus === 'read' && n.read);

      return matchesSearch && matchesCat && matchesRead;
    });
  }, [notifications, searchQuery, selectedCategory, filterReadStatus]);

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // Toggle single read status
  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  // Delete notification
  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Notification dismissed.');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'incident':
        return <AlertTriangle className="h-4 w-4 text-rose-600" />;
      case 'medication':
        return <Pill className="h-4 w-4 text-[#2457C5]" />;
      case 'staffing':
        return <Users className="h-4 w-4 text-amber-600" />;
      case 'access':
        return <KeyRound className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4 text-[#3979D8]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#173B70] px-4 py-3 text-sm font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-[#3979D8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Bell className="h-3.5 w-3.5 text-[#2457C5]" />
              Facility Alert Dispatch & Feed
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Notification & Alert Centre
          </h1>
          <p className="text-sm text-[#4A5568]">
            Urgent safety incidents, medication alerts, staffing shortages, and access authorization requests.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            disabled={unreadCount === 0}
            onClick={handleMarkAllAsRead}
          >
            <CheckCheck className="mr-1.5 h-3.5 w-3.5" />
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Unread Alerts</span>
              <Bell className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{unreadCount}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Awaiting Acknowledgment</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Critical Severity</span>
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-700">{criticalCount}</div>
            <div className="mt-0.5 text-xs text-rose-700">Immediate Action Required</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Staffing & Shift Alerts</span>
              <Users className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">2 Alerts</div>
            <div className="mt-0.5 text-xs text-amber-700">Coverage Dispatches</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Total Notifications</span>
              <FileText className="h-4 w-4 text-[#3979D8]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalCount}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Feed History</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
              <Input
                placeholder="Search alerts, messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Notification Categories</option>
              <option value="incident">Incidents & Falls</option>
              <option value="medication">Medication & eMAR</option>
              <option value="staffing">Staffing & Shifts</option>
              <option value="access">Doctor Access</option>
              <option value="system">System & Compliance</option>
            </Select>

            <Select
              value={filterReadStatus}
              onChange={(e) => setFilterReadStatus(e.target.value as 'all' | 'unread' | 'read')}
              className="text-xs"
            >
              <option value="all">All (Read & Unread)</option>
              <option value="unread">Unread Only ({unreadCount})</option>
              <option value="read">Read Only</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Stream List */}
      <div className="space-y-3">
        {filteredNotifications.map((ntf) => {
          const isUrgent = ntf.priority === 'urgent';
          const isHigh = ntf.priority === 'high';

          return (
            <Card
              key={ntf.id}
              className={`transition-all hover:shadow-xs border ${
                !ntf.read
                  ? 'border-[#2457C5]/30 bg-[#F4F8FF]'
                  : 'border-[#E6ECF4] bg-white opacity-85'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-lg p-2 ${
                        isUrgent
                          ? 'bg-rose-100 text-rose-700'
                          : isHigh
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-[#E4EDFF] text-[#2457C5]'
                      }`}
                    >
                      {getCategoryIcon(ntf.category)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {!ntf.read && (
                          <span className="h-2 w-2 rounded-full bg-[#2457C5]" title="Unread" />
                        )}
                        <h4 className="font-semibold text-sm text-[#173B70]">{ntf.title}</h4>
                        <Badge
                          variant={isUrgent ? 'danger' : isHigh ? 'warning' : 'secondary'}
                          className="text-[10px] uppercase"
                        >
                          {ntf.priority}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {ntf.category}
                        </Badge>
                      </div>

                      <p className="text-xs text-[#4A5568]">{ntf.message}</p>

                      <div className="flex items-center gap-3 pt-1 text-[11px] text-[#718096]">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {ntf.timeAgo}
                        </span>

                        {ntf.href && (
                          <Link
                            to={ntf.href}
                            className="font-medium text-[#2457C5] hover:underline flex items-center gap-0.5"
                          >
                            Open Module <ChevronRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-[#718096] hover:text-[#173B70]"
                      onClick={() => handleToggleRead(ntf.id)}
                    >
                      {ntf.read ? 'Mark Unread' : 'Mark Read'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-rose-600 hover:bg-rose-50"
                      onClick={() => handleDeleteNotification(ntf.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#E6ECF4] bg-white p-12 text-center">
            <Bell className="h-8 w-8 text-[#718096]" />
            <h3 className="mt-2 text-sm font-semibold text-[#173B70]">No notifications matching filter</h3>
            <p className="mt-1 text-xs text-[#718096]">Check back later or adjust your filter parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
