import { useCallback, useMemo, useState } from 'react';
import type { UserRole } from '../types/navigation.ts';
import { MOCK_NOTIFICATIONS, type AppNotification } from '../mock/notifications.ts';

export interface NotificationsState {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
  /** Restores the sample notifications (handy for UI review after clearing). */
  restoreSamples: () => void;
}

/**
 * Client-side notification state seeded from role-scoped mock data.
 * Will be backed by a real-time source once backend integration begins.
 */
export function useNotifications(role: UserRole): NotificationsState {
  const [notifications, setNotifications] = useState<AppNotification[]>(
    () => MOCK_NOTIFICATIONS[role]
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  const restoreSamples = useCallback(() => setNotifications(MOCK_NOTIFICATIONS[role]), [role]);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  return { notifications, unreadCount, markAsRead, markAllAsRead, dismiss, clearAll, restoreSamples };
}
