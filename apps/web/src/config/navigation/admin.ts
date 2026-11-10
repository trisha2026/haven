import {
  AlertTriangle,
  BedDouble,
  Bell,
  CalendarClock,
  CalendarX,
  ChartColumn,
  FileClock,
  HeartHandshake,
  KeyRound,
  LayoutDashboard,
  Package,
  Pill,
  Settings,
  SlidersHorizontal,
  Siren,
  Stethoscope,
  UserRound,
  Users,
} from 'lucide-react';
import type { RoleNavigation } from '../../types/navigation.ts';

export const ADMIN_NAVIGATION: RoleNavigation = {
  role: 'admin',
  groups: [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        {
          id: 'dashboard',
          label: 'Command Centre',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
          description: 'Facility-wide overview of residents, staffing, alerts and operations.',
        },
      ],
    },
    {
      id: 'people',
      label: 'Residents & Staff',
      items: [
        {
          id: 'residents',
          label: 'Residents',
          path: '/admin/residents',
          icon: Users,
          description: 'Resident profiles, admissions, care plans and family contacts.',
        },
        {
          id: 'caregivers',
          label: 'Caregivers',
          path: '/admin/caregivers',
          icon: HeartHandshake,
          description: 'Caregiver profiles, certifications, assignments and workload.',
        },
        {
          id: 'doctors',
          label: 'Doctors',
          path: '/admin/doctors',
          icon: Stethoscope,
          description: 'Visiting and on-call physicians, specialities and availability.',
        },
        {
          id: 'rooms',
          label: 'Rooms & Beds',
          path: '/admin/rooms',
          icon: BedDouble,
          description: 'Wings, rooms, bed occupancy, transfers and housekeeping status.',
        },
      ],
    },
    {
      id: 'medication',
      label: 'Medication & Supplies',
      items: [
        {
          id: 'medications',
          label: 'Medication Oversight',
          path: '/admin/medications',
          icon: Pill,
          description: 'Facility-wide medication schedules, adherence and missed doses.',
          badge: { label: '3', variant: 'warning' },
        },
        {
          id: 'pharmacy',
          label: 'Pharmacy & Inventory',
          path: '/admin/pharmacy',
          icon: Package,
          description: 'Pharmacy stock, reorder levels, expiry tracking and suppliers.',
        },
      ],
    },
    {
      id: 'workforce',
      label: 'Workforce',
      items: [
        {
          id: 'attendance',
          label: 'Attendance & Shifts',
          path: '/admin/attendance',
          icon: CalendarClock,
          description: 'Shift rosters, clock-ins, coverage gaps and overtime.',
        },
        {
          id: 'leave-requests',
          label: 'Leave Requests',
          path: '/admin/leave-requests',
          icon: CalendarX,
          description: 'Review, approve and plan cover for staff leave.',
          badge: { label: '5', variant: 'default' },
        },
        {
          id: 'emergency-assignments',
          label: 'Emergency Assignments',
          path: '/admin/emergency-assignments',
          icon: Siren,
          description: 'Rapid reassignment of staff during emergencies and absences.',
        },
      ],
    },
    {
      id: 'safety',
      label: 'Safety & Compliance',
      items: [
        {
          id: 'incidents',
          label: 'Incident Management',
          path: '/admin/incidents',
          icon: AlertTriangle,
          description: 'Falls, behavioural events and safety incidents with follow-up actions.',
          badge: { label: '2', variant: 'danger' },
        },
        {
          id: 'access-requests',
          label: 'Doctor Access Requests',
          path: '/admin/access-requests',
          icon: KeyRound,
          description: 'Approve or decline physician requests to access resident records.',
        },
      ],
    },
    {
      id: 'insights',
      label: 'Communication & Insights',
      items: [
        {
          id: 'notifications',
          label: 'Notifications',
          path: '/admin/notifications',
          icon: Bell,
          description: 'Facility announcements, alerts and notification history.',
        },
        {
          id: 'reports',
          label: 'Reports & Analytics',
          path: '/admin/reports',
          icon: ChartColumn,
          description: 'Occupancy, care quality, staffing and compliance reporting.',
        },
        {
          id: 'audit-trail',
          label: 'Audit Trail',
          path: '/admin/audit-trail',
          icon: FileClock,
          description: 'Immutable log of record access and changes across HAVEN.',
        },
      ],
    },
    {
      id: 'system',
      label: 'System',
      items: [
        {
          id: 'settings',
          label: 'Settings',
          path: '/admin/settings',
          icon: Settings,
          description: 'Facility configuration, roles, integrations and policies.',
        },
      ],
    },
  ],
  hidden: [
    {
      id: 'profile',
      label: 'My Profile',
      path: '/admin/profile',
      icon: UserRound,
      description: 'Your account details, contact information and credentials.',
    },
    {
      id: 'preferences',
      label: 'Preferences',
      path: '/admin/preferences',
      icon: SlidersHorizontal,
      description: 'Display, notification and accessibility preferences.',
    },
  ],
};
