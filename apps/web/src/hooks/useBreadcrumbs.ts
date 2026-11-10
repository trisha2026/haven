import { useMemo } from 'react';
import { useLocation } from 'react-router';
import type { UserRole } from '../types/navigation.ts';
import { ROLE_META } from '../config/roles.ts';
import { resolveNavEntry } from '../config/navigation/index.ts';
import { MOCK_FULL_RESIDENTS } from '../mock/residentsData.ts';

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

    // Check if this is a resident detail route (e.g. /doctor/residents/:id, /caregiver/residents/:id, /admin/residents/:id)
    const residentMatch = pathname.match(new RegExp(`^/${role}/residents/([^/]+)`));
    if (residentMatch) {
      const residentId = residentMatch[1];
      const resident = MOCK_FULL_RESIDENTS.find((r) => r.id === residentId);
      const residentName = resident ? resident.fullName : 'Resident Profile';

      // For doctor: "Clinical > My Residents > Ashok Gokhale"
      if (role === 'doctor') {
        crumbs.push({ label: 'My Residents', href: entry.item.path });
        crumbs.push({ label: residentName, current: true });
        return crumbs;
      }

      // For caregiver: "Care Team > My Residents > Ashok Gokhale"
      if (role === 'caregiver') {
        crumbs.push({ label: entry.item.label, href: entry.item.path });
        crumbs.push({ label: residentName, current: true });
        return crumbs;
      }

      // For admin: "Administration > People & Care > Resident Management > Ashok Gokhale"
      if (entry.group && entry.group.id !== 'overview') {
        crumbs.push({ label: entry.group.label });
      }
      crumbs.push({ label: entry.item.label, href: entry.item.path });
      crumbs.push({ label: residentName, current: true });
      return crumbs;
    }

    if (entry.group && entry.group.id !== 'overview') {
      crumbs.push({ label: entry.group.label });
    }

    if (pathname !== entry.item.path) {
      crumbs.push({ label: entry.item.label, href: entry.item.path });
      crumbs.push({ label: 'Resident Profile', current: true });
    } else {
      crumbs.push({ label: entry.item.label, current: true });
    }

    return crumbs;
  }, [role, pathname]);
}
