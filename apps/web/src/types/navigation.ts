import type { LucideIcon } from 'lucide-react';
import type { BadgeVariant } from '../components/ui/Badge.tsx';

/** Application roles supported by the HAVEN shell. */
export type UserRole = 'admin' | 'caregiver' | 'doctor';

export interface NavItemBadge {
  label: string;
  variant: BadgeVariant;
}

/** A single navigable destination in the application shell. */
export interface NavItem {
  /** Stable identifier, unique within a role. */
  id: string;
  /** Visible label in the sidebar, breadcrumbs and page header. */
  label: string;
  /** Absolute route path, e.g. `/admin/residents`. */
  path: string;
  icon: LucideIcon;
  /** Short description of the module, used on placeholder pages and in search. */
  description: string;
  badge?: NavItemBadge;
}

/** A labelled group of navigation items rendered as a sidebar section. */
export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

/** Complete navigation definition for one role. */
export interface RoleNavigation {
  role: UserRole;
  groups: NavGroup[];
  /**
   * Routable destinations that are not shown in the sidebar
   * (e.g. profile and preferences, reached from the profile menu).
   */
  hidden: NavItem[];
}

/** A resolved navigation entry with its parent group, used for breadcrumbs. */
export interface ResolvedNavEntry {
  item: NavItem;
  group?: NavGroup;
}
