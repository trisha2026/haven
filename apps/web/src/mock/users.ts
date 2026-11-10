import type { UserRole } from '../types/navigation.ts';
import type { AppUser } from '../types/user.ts';

/**
 * Mock users for UI development only.
 * These will be replaced by the authenticated user once Firebase auth is integrated.
 */
export const MOCK_USERS: Record<UserRole, AppUser> = {
  admin: {
    id: 'USR-A-0007',
    role: 'admin',
    fullName: 'Margaret Okafor',
    preferredName: 'Margaret',
    title: 'Facility Administrator',
    email: 'margaret.okafor@haven-care.example',
    phone: '+1 (555) 014-2290',
    employeeId: 'ADM-0007',
    facility: 'HAVEN Willow Creek Residence',
    shift: 'Office hours · 08:00 – 17:00',
    initials: 'MO',
  },
  caregiver: {
    id: 'USR-C-0142',
    role: 'caregiver',
    fullName: 'Sarah Chen',
    preferredName: 'Sarah',
    title: 'Senior Caregiver, RN',
    email: 'sarah.chen@haven-care.example',
    phone: '+1 (555) 017-8834',
    employeeId: 'CG-0142',
    facility: 'HAVEN Willow Creek Residence',
    shift: 'Day shift · Garden Terrace · 07:00 – 15:00',
    initials: 'SC',
  },
  doctor: {
    id: 'USR-D-0031',
    role: 'doctor',
    fullName: 'Dr. Rahul Mehta',
    preferredName: 'Dr. Mehta',
    title: 'Consultant Geriatrician',
    email: 'rahul.mehta@haven-care.example',
    phone: '+1 (555) 012-4471',
    employeeId: 'DR-0031',
    facility: 'HAVEN Willow Creek Residence',
    shift: 'Visiting · Mon, Wed, Fri · On call weekends',
    initials: 'RM',
  },
};
