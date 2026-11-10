import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Bell,
  CheckCheck,
  RotateCcw,
  AlertTriangle,
  Pill,
  Users,
  KeyRound,
  ListChecks,
  Info,
  X,
} from 'lucide-react';
import type { NotificationsState } from '../../hooks/useNotifications.ts';
import type { NotificationCategory } from '../../mock/notifications.ts';
import { useEscapeKey, useOnClickOutside } from '../../hooks/useDismiss.ts';
import { cn } from '../../utils/cn.ts';

export interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  notificationsState: NotificationsState;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const CATEGORY_ICONS: Record<NotificationCategory, React.ElementType> = {
  alert: AlertTriangle,
  incident: AlertTriangle,
  medication: Pill,
  staffing: Users,
  access: KeyRound,
  task: ListChecks,
  system: Info,
};

const CATEGORY_COLORS: Record<NotificationCategory, string> = {
  alert: 'bg-haven-danger-soft text-haven-danger border-haven-danger-border',
  incident: 'bg-haven-danger-soft text-haven-danger border-haven-danger-border',
  medication: 'bg-haven-warning-soft text-haven-warning border-haven-warning-border',
  staffing: 'bg-haven-info-soft text-haven-info border-haven-info-border',
  access: 'bg-haven-slate-100 text-haven-blue-700 border-haven-border',
  task: 'bg-haven-success-soft text-haven-success border-haven-success-border',
  system: 'bg-haven-slate-100 text-haven-slate-500 border-haven-border',
};

export function NotificationPanel({
  open,
  onClose,
  notificationsState,
  triggerRef,
}: NotificationPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismiss,
    clearAll,
    restoreSamples,
  } = notificationsState;

  useOnClickOutside([panelRef, triggerRef], () => onClose(), open);
  useEscapeKey(() => onClose(), open);

  if (!open) return null;

  const filteredNotifications = notifications.filter((item) => {
    if (filter === 'unread') return !item.read;
    return true;
  });

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Notifications Panel"
      className={cn(
        'absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm',
        'bg-white rounded-2xl border border-haven-border shadow-haven-popover z-50',
        'flex flex-col overflow-hidden text-haven-slate-900 animate-pop-in focus:outline-none'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-haven-border px-4 py-3 bg-white">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-haven-slate-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-haven-blue-700 text-white">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="p-1.5 rounded-lg text-haven-slate-500 hover:text-haven-slate-900 hover:bg-haven-slate-100 transition-colors cursor-pointer"
              title="Mark all as read"
              aria-label="Mark all notifications as read"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-haven-slate-500 hover:text-haven-slate-900 hover:bg-haven-slate-100 transition-colors cursor-pointer"
            aria-label="Close notification panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-haven-border-light bg-haven-slate-50/60 text-xs">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={cn(
            'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer',
            filter === 'all'
              ? 'bg-haven-blue-100 text-haven-blue-700 font-semibold shadow-haven-sm'
              : 'text-haven-slate-500 hover:text-haven-slate-900'
          )}
        >
          All ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('unread')}
          className={cn(
            'px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer',
            filter === 'unread'
              ? 'bg-haven-blue-100 text-haven-blue-700 font-semibold shadow-haven-sm'
              : 'text-haven-slate-500 hover:text-haven-slate-900'
          )}
        >
          Unread ({unreadCount})
        </button>
        {notifications.length > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto text-[11px] text-haven-slate-500 hover:text-haven-danger transition-colors cursor-pointer"
          >
            Clear all
          </button>
        ) : (
          <button
            type="button"
            onClick={restoreSamples}
            className="ml-auto flex items-center gap-1 text-[11px] text-haven-blue-700 hover:text-haven-navy-900 transition-colors cursor-pointer font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            Reset demo
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto haven-scroll divide-y divide-haven-border-light">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((ntf) => {
            const Icon = CATEGORY_ICONS[ntf.category];
            const colorClass = CATEGORY_COLORS[ntf.category];

            return (
              <div
                key={ntf.id}
                onClick={() => {
                  markAsRead(ntf.id);
                  if (ntf.href) {
                    onClose();
                    navigate(ntf.href);
                  }
                }}
                className={cn(
                  'group flex items-start gap-3 p-3.5 transition-colors cursor-pointer relative text-left',
                  ntf.read
                    ? 'bg-white hover:bg-haven-slate-50 text-haven-slate-700'
                    : 'bg-haven-blue-50/50 hover:bg-haven-blue-100/40 text-haven-slate-900'
                )}
              >
                {/* Status Icon */}
                <div
                  className={cn(
                    'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border mt-0.5',
                    colorClass
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <p
                      className={cn(
                        'text-xs tracking-tight line-clamp-1',
                        ntf.read ? 'font-medium text-haven-slate-700' : 'font-bold text-haven-slate-900'
                      )}
                    >
                      {ntf.title}
                    </p>
                    <span className="text-[10px] text-haven-slate-500 shrink-0">
                      {ntf.timeAgo}
                    </span>
                  </div>
                  <p className="text-xs text-haven-slate-500 line-clamp-2 leading-relaxed">
                    {ntf.message}
                  </p>
                </div>

                {/* Unread dot or dismiss */}
                <div className="flex items-center shrink-0 self-center">
                  {!ntf.read && (
                    <span
                      aria-hidden="true"
                      className="w-2 h-2 rounded-full bg-haven-blue-700 shrink-0 group-hover:hidden"
                    />
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dismiss(ntf.id);
                    }}
                    className="p-1 rounded text-haven-slate-500 hover:text-haven-slate-900 hover:bg-haven-slate-100 transition-colors cursor-pointer hidden group-hover:inline-flex"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-haven-slate-100 text-haven-slate-500 flex items-center justify-center mx-auto">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-haven-slate-900">No notifications</p>
              <p className="text-[11px] text-haven-slate-500 mt-0.5">
                {filter === 'unread'
                  ? 'All pending notifications have been marked as read.'
                  : 'Your notification inbox is currently clear.'}
              </p>
            </div>
            {notifications.length === 0 && (
              <button
                type="button"
                onClick={restoreSamples}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-haven-border text-haven-blue-700 hover:bg-haven-slate-50 cursor-pointer mx-auto transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Restore sample notifications
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-haven-border bg-haven-slate-50 text-center">
        <button
          type="button"
          onClick={() => {
            onClose();
            const role = filteredNotifications[0]?.href?.split('/')[1] || 'admin';
            navigate(`/${role}/notifications`);
          }}
          className="text-xs font-medium text-haven-blue-700 hover:text-haven-navy-900 transition-colors cursor-pointer"
        >
          View all notifications &amp; audit history →
        </button>
      </div>
    </div>
  );
}
