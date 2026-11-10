import {
  Bell,
  Boxes,
  CalendarClock,
  CalendarX,
  ClipboardCheck,
  Clock,
  LayoutDashboard,
  ListChecks,
  Pill,
  QrCode,
  SlidersHorizontal,
  UserRound,
  Users,
} from 'lucide-react';
import type { RoleNavigation } from '../../types/navigation.ts';

export const CAREGIVER_NAVIGATION: RoleNavigation = {
  role: 'caregiver',
  groups: [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        {
          id: 'dashboard',
          label: 'Caregiver Command Centre',
          path: '/caregiver/dashboard',
          icon: LayoutDashboard,
          description: 'Your shift at a glance: residents, due medications and open tasks.',
        },
      ],
    },
    {
      id: 'care',
      label: 'Resident Care',
      items: [
        {
          id: 'residents',
          label: 'My Residents',
          path: '/caregiver/residents',
          icon: Users,
          description: 'Residents assigned to you, with care notes and preferences.',
        },
        {
          id: 'medications',
          label: 'Medication Administration',
          path: '/caregiver/medications',
          icon: Pill,
          description: 'Record administered doses and follow the medication round.',
          badge: { label: '4', variant: 'warning' },
        },
        {
          id: 'tasks',
          label: 'Care Tasks & Follow-ups',
          path: '/caregiver/tasks',
          icon: ListChecks,
          description: 'Personal care, hydration, mobility and follow-up tasks.',
          badge: { label: '6', variant: 'default' },
        },
      ],
    },
    {
      id: 'work',
      label: 'My Work',
      items: [
        {
          id: 'schedule',
          label: 'My Schedule & Shifts',
          path: '/caregiver/schedule',
          icon: CalendarClock,
          description: 'Upcoming shifts, swaps and handover times.',
        },
        {
          id: 'attendance',
          label: 'Attendance',
          path: '/caregiver/attendance',
          icon: Clock,
          description: 'Clock in, clock out and review your attendance history.',
        },
        {
          id: 'leave',
          label: 'Leave Management',
          path: '/caregiver/leave',
          icon: CalendarX,
          description: 'Request leave and track approval status.',
        },
      ],
    },
    {
      id: 'operations',
      label: 'Operations',
      items: [
        {
          id: 'inventory',
          label: 'Inventory & Stock Handling',
          path: '/caregiver/inventory',
          icon: Boxes,
          description: 'Record supply usage and report low stock on your floor.',
        },
        {
          id: 'assignments',
          label: 'QR & Temporary Assignments',
          path: '/caregiver/assignments',
          icon: QrCode,
          description: 'Scan resident QR codes and accept temporary cover assignments.',
        },
      ],
    },
    {
      id: 'account',
      label: 'Account',
      items: [
        {
          id: 'notifications',
          label: 'Notifications & My Profile',
          path: '/caregiver/notifications',
          icon: Bell,
          description: 'Your notifications, profile details and certifications.',
        },
      ],
    },
  ],
  hidden: [
    {
      id: 'profile',
      label: 'My Profile',
      path: '/caregiver/profile',
      icon: UserRound,
      description: 'Your account details, contact information and certifications.',
    },
    {
      id: 'preferences',
      label: 'Preferences',
      path: '/caregiver/preferences',
      icon: SlidersHorizontal,
      description: 'Display, notification and accessibility preferences.',
    },
    {
      id: 'handover',
      label: 'Shift Handover',
      path: '/caregiver/handover',
      icon: ClipboardCheck,
      description: 'Structured handover notes for the incoming shift.',
    },
  ],
};
