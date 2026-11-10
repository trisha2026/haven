import {
  AlertTriangle,
  Bell,
  FileHeart,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  NotebookPen,
  Pill,
  SlidersHorizontal,
  UserRound,
  Users,
} from 'lucide-react';
import type { RoleNavigation } from '../../types/navigation.ts';

export const DOCTOR_NAVIGATION: RoleNavigation = {
  role: 'doctor',
  groups: [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        {
          id: 'dashboard',
          label: 'Doctor Command Centre',
          path: '/doctor/dashboard',
          icon: LayoutDashboard,
          description: 'Clinical overview of your residents, reviews and pending requests.',
        },
      ],
    },
    {
      id: 'clinical',
      label: 'Clinical Care',
      items: [
        {
          id: 'residents',
          label: 'My Residents & Clinical Access',
          path: '/doctor/residents',
          icon: Users,
          description: 'Residents under your care and your current access permissions.',
        },
        {
          id: 'records',
          label: 'Resident Medical Records',
          path: '/doctor/records',
          icon: FileHeart,
          description: 'Medical histories, diagnoses, allergies, vitals and lab results.',
        },
        {
          id: 'prescriptions',
          label: 'Medication & Prescription Management',
          path: '/doctor/prescriptions',
          icon: Pill,
          description: 'Prescribe, adjust and review medication regimens.',
        },
        {
          id: 'notes',
          label: 'Clinical Notes & Assessments',
          path: '/doctor/notes',
          icon: NotebookPen,
          description: 'Consultation notes, assessments and care recommendations.',
        },
      ],
    },
    {
      id: 'review',
      label: 'Review & Access',
      items: [
        {
          id: 'incidents',
          label: 'Incident & Clinical Review',
          path: '/doctor/incidents',
          icon: AlertTriangle,
          description: 'Clinical review of incidents, falls and changes in condition.',
          badge: { label: '1', variant: 'danger' },
        },
        {
          id: 'access-requests',
          label: 'Doctor Access Requests',
          path: '/doctor/access-requests',
          icon: KeyRound,
          description: 'Request and track access to resident medical records.',
        },
      ],
    },
    {
      id: 'workflow',
      label: 'Workflow',
      items: [
        {
          id: 'tasks',
          label: 'Clinical Tasks & Follow-ups',
          path: '/doctor/tasks',
          icon: ListChecks,
          description: 'Scheduled reviews, lab follow-ups and referrals.',
          badge: { label: '3', variant: 'default' },
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
          path: '/doctor/notifications',
          icon: Bell,
          description: 'Your notifications, profile and practising credentials.',
        },
      ],
    },
  ],
  hidden: [
    {
      id: 'profile',
      label: 'My Profile',
      path: '/doctor/profile',
      icon: UserRound,
      description: 'Your account details, contact information and credentials.',
    },
    {
      id: 'preferences',
      label: 'Preferences',
      path: '/doctor/preferences',
      icon: SlidersHorizontal,
      description: 'Display, notification and accessibility preferences.',
    },
  ],
};
