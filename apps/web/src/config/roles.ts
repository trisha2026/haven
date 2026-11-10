import type { UserRole } from '../types/navigation.ts';

export interface RoleMeta {
  role: UserRole;
  /** Full role name, e.g. "Administrator". */
  label: string;
  /** Workspace name shown under the HAVEN wordmark. */
  workspace: string;
  /** Route prefix, e.g. `/admin`. */
  basePath: string;
  /** Default landing route for the role. */
  homePath: string;
}

export const ROLE_META: Record<UserRole, RoleMeta> = {
  admin: {
    role: 'admin',
    label: 'Administrator',
    workspace: 'Administration',
    basePath: '/admin',
    homePath: '/admin/dashboard',
  },
  caregiver: {
    role: 'caregiver',
    label: 'Caregiver',
    workspace: 'Care Team',
    basePath: '/caregiver',
    homePath: '/caregiver/dashboard',
  },
  doctor: {
    role: 'doctor',
    label: 'Doctor',
    workspace: 'Clinical',
    basePath: '/doctor',
    homePath: '/doctor/dashboard',
  },
};

export const USER_ROLES: readonly UserRole[] = ['admin', 'caregiver', 'doctor'];
