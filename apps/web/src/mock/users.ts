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
    fullName: 'Devika Ramanathan',
    preferredName: 'Devika',
    title: 'Facility Administrator',
    email: 'devika.ramanathan@haven-care.in.example',
    phone: '+91 98450 14229',
    employeeId: 'ADM-0007',
    facility: 'HAVEN Anandam Care Residence, Bengaluru',
    shift: 'Office hours · 08:00 – 17:00',
    initials: 'DR',
  },
  caregiver: {
    id: 'USR-C-0142',
    role: 'caregiver',
    fullName: 'Priya Shetty, RN',
    preferredName: 'Priya',
    title: 'Senior Caregiver, RN',
    email: 'priya.shetty@haven-care.in.example',
    phone: '+91 98860 17834',
    employeeId: 'CG-0142',
    facility: 'HAVEN Anandam Care Residence, Bengaluru',
    shift: 'Day shift · Garden Terrace · 07:00 – 15:00',
    initials: 'PS',
  },
  doctor: {
    id: 'USR-D-0031',
    role: 'doctor',
    fullName: 'Dr. Anita Mehta',
    preferredName: 'Dr. Anita',
    title: 'Consultant Geriatrician',
    email: 'anita.mehta@haven-care.in.example',
    phone: '+91 94480 12471',
    employeeId: 'DR-0031',
    facility: 'HAVEN Anandam Care Residence, Bengaluru',
    shift: 'Visiting · Mon, Wed, Fri · On call weekends',
    initials: 'AM',
  },
};
