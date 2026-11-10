import { useMemo } from 'react';
import { useLocation } from 'react-router';
import type { UserRole } from '../types/navigation.ts';
import { ROLE_META } from '../config/roles.ts';
import { resolveNavEntry } from '../config/navigation/index.ts';

export interface BreadcrumbItem {
  label: string;
  /** Omitted for non-navigable crumbs (groups) and the current page. */
  href?: string;
  current?: boolean;
}

/** Derives breadcrumbs for the current route from the role's navigation config. */
export function useBreadcrumbs(role: UserRole): BreadcrumbItem[] {
  const { pathname } = useLocation();

  return useMemo(() => {
    const meta = ROLE_META[role];
    const root: BreadcrumbItem = { label: meta.workspace, href: meta.homePath };
    const entry = resolveNavEntry(role, pathname);

    if (!entry) {
      return [root, { label: 'Page not found', current: true }];
    }

    // The role home is the root itself.
    if (entry.item.path === meta.homePath) {
      return [{ ...root, href: undefined }, { label: entry.item.label, current: true }];
    }

    const crumbs: BreadcrumbItem[] = [root];
    if (entry.group && entry.group.id !== 'overview') {
      crumbs.push({ label: entry.group.label });
    }
    crumbs.push({ label: entry.item.label, current: true });
    return crumbs;
  }, [role, pathname]);
}
