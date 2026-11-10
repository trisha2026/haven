import type {
  NavItem,
  ResolvedNavEntry,
  RoleNavigation,
  UserRole,
} from '../../types/navigation.ts';
import { ADMIN_NAVIGATION } from './admin.ts';
import { CAREGIVER_NAVIGATION } from './caregiver.ts';
import { DOCTOR_NAVIGATION } from './doctor.ts';

export { ADMIN_NAVIGATION, CAREGIVER_NAVIGATION, DOCTOR_NAVIGATION };

const NAVIGATION_BY_ROLE: Record<UserRole, RoleNavigation> = {
  admin: ADMIN_NAVIGATION,
  caregiver: CAREGIVER_NAVIGATION,
  doctor: DOCTOR_NAVIGATION,
};

/** Returns the navigation configuration for a single role only. */
export function getRoleNavigation(role: UserRole): RoleNavigation {
  return NAVIGATION_BY_ROLE[role];
}

/** All sidebar items for a role, flattened in display order. */
export function getSidebarItems(role: UserRole): NavItem[] {
  return NAVIGATION_BY_ROLE[role].groups.flatMap((group) => group.items);
}

/** Every routable destination for a role (sidebar + hidden routes). */
export function getRoutableItems(role: UserRole): NavItem[] {
  const navigation = NAVIGATION_BY_ROLE[role];
  return [...getSidebarItems(role), ...navigation.hidden];
}

/** Normalises a pathname by removing any trailing slash. */
function normalisePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

/** Resolves a pathname to its navigation item and parent group, if any. */
export function resolveNavEntry(role: UserRole, pathname: string): ResolvedNavEntry | undefined {
  const path = normalisePath(pathname);
  const navigation = NAVIGATION_BY_ROLE[role];

  for (const group of navigation.groups) {
    const item = group.items.find((candidate) => candidate.path === path);
    if (item) return { item, group };
  }

  const hidden = navigation.hidden.find((candidate) => candidate.path === path);
  return hidden ? { item: hidden } : undefined;
}

/** Converts an absolute item path to a route segment relative to the role prefix. */
export function toRouteSegment(role: UserRole, path: string): string {
  return path.replace(new RegExp(`^/${role}/`), '');
}
