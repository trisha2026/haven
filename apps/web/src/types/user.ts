import type { UserRole } from './navigation.ts';

/** Shape of the signed-in user consumed by the application shell. */
export interface AppUser {
  id: string;
  role: UserRole;
  fullName: string;
  preferredName: string;
  /** Job title shown in the profile menu. */
  title: string;
  email: string;
  phone: string;
  employeeId: string;
  facility: string;
  /** Current shift or availability summary. */
  shift: string;
  initials: string;
}
