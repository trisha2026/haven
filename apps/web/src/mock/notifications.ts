import type { UserRole } from '../types/navigation.ts';

export type NotificationCategory =
  | 'alert'
  | 'medication'
  | 'incident'
  | 'staffing'
  | 'access'
  | 'task'
  | 'system';

export type NotificationPriority = 'urgent' | 'high' | 'normal';

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string;
  /** Human-readable relative time for display. */
  timeAgo: string;
  read: boolean;
  /** Optional in-app destination. */
  href?: string;
}

/** Role-scoped sample notifications. Mock data only. */
export const MOCK_NOTIFICATIONS: Record<UserRole, AppNotification[]> = {
  admin: [
    {
      id: 'ntf-a-1',
      category: 'incident',
      priority: 'urgent',
      title: 'Fall reported — Room 108-A',
      message: 'Raghavendra Kulkarni was assisted after a fall in Orchard Meadow (INC-2026-088). Incident form awaiting review.',
      timeAgo: '1h 45m ago',
      read: false,
      href: '/admin/incidents',
    },
    {
      id: 'ntf-a-2',
      category: 'staffing',
      priority: 'high',
      title: 'Night shift coverage gap',
      message: 'Sunrise Pavilion is one caregiver short for tonight (23:00 – 07:00).',
      timeAgo: '24 min ago',
      read: false,
      href: '/admin/emergency-assignments',
    },
    {
      id: 'ntf-a-3',
      category: 'access',
      priority: 'normal',
      title: 'New doctor access request',
      message: 'Dr. Arjun Rao requested record access for Ananya Sharma (cardiology review).',
      timeAgo: '1 hr ago',
      read: false,
      href: '/admin/access-requests',
    },
    {
      id: 'ntf-a-4',
      category: 'medication',
      priority: 'normal',
      title: 'Low stock: Metformin 500 mg',
      message: 'Pharmacy stock is below the reorder threshold (18 tablets remaining).',
      timeAgo: '3 hr ago',
      read: true,
      href: '/admin/pharmacy',
    },
    {
      id: 'ntf-a-5',
      category: 'system',
      priority: 'normal',
      title: 'Monthly compliance report ready',
      message: 'The October care quality and compliance report is available to download.',
      timeAgo: 'Yesterday',
      read: true,
      href: '/admin/reports',
    },
  ],
  caregiver: [
    {
      id: 'ntf-c-1',
      category: 'medication',
      priority: 'urgent',
      title: 'Medication due — Ananya Sharma',
      message: 'Lisinopril 10 mg is due at 14:00 for Room 204-B.',
      timeAgo: '2 min ago',
      read: false,
      href: '/caregiver/medications',
    },
    {
      id: 'ntf-c-2',
      category: 'task',
      priority: 'high',
      title: 'Hydration check requested',
      message: 'Vikram Hegde’s family asked for an extra hydration round this afternoon.',
      timeAgo: '18 min ago',
      read: false,
      href: '/caregiver/tasks',
    },
    {
      id: 'ntf-c-3',
      category: 'staffing',
      priority: 'normal',
      title: 'Temporary assignment offered',
      message: 'Cover Sunrise Pavilion 15:00 – 19:00 on Thursday. Scan the QR code to accept.',
      timeAgo: '1 hr ago',
      read: false,
      href: '/caregiver/assignments',
    },
    {
      id: 'ntf-c-4',
      category: 'system',
      priority: 'normal',
      title: 'Leave request approved',
      message: 'Your leave for 22–24 November has been approved by Devika Ramanathan.',
      timeAgo: 'Yesterday',
      read: true,
      href: '/caregiver/leave',
    },
  ],
  doctor: [
    {
      id: 'ntf-d-1',
      category: 'incident',
      priority: 'urgent',
      title: 'Clinical review required',
      message: 'Post-fall assessment requested for Raghavendra Kulkarni (Room 108-A, INC-2026-088).',
      timeAgo: '1h 45m ago',
      read: false,
      href: '/doctor/incidents',
    },
    {
      id: 'ntf-d-2',
      category: 'access',
      priority: 'normal',
      title: 'Access request approved',
      message: 'You now have clinical access to Nandini Iyer’s records until 30 November.',
      timeAgo: '45 min ago',
      read: false,
      href: '/doctor/access-requests',
    },
    {
      id: 'ntf-d-3',
      category: 'task',
      priority: 'normal',
      title: 'Lab results available',
      message: 'HbA1c results for Vikram Hegde have been uploaded.',
      timeAgo: '2 hr ago',
      read: true,
      href: '/doctor/records',
    },
  ],
};
