import { NavLink } from 'react-router';
import type { NavGroup, NavItem } from '../../types/navigation.ts';
import { Tooltip } from '../ui/Tooltip.tsx';
import { cn } from '../../utils/cn.ts';

const BADGE_TONES: Record<NonNullable<NavItem['badge']>['variant'], string> = {
  default: 'bg-haven-blue-100 text-haven-blue-700',
  secondary: 'bg-haven-slate-100 text-haven-slate-500',
  outline: 'border border-haven-border bg-white text-haven-slate-700',
  success: 'bg-haven-success-soft text-haven-success',
  warning: 'bg-haven-warning-soft text-haven-warning',
  danger: 'bg-haven-danger-soft text-haven-danger',
  critical: 'bg-haven-danger-soft text-haven-danger',
  info: 'bg-haven-info-soft text-haven-info',
  information: 'bg-haven-info-soft text-haven-info',
  neutral: 'bg-haven-slate-100 text-haven-slate-500',
};

const DOT_TONES: Record<NonNullable<NavItem['badge']>['variant'], string> = {
  default: 'bg-haven-blue-700',
  secondary: 'bg-haven-slate-500',
  outline: 'bg-haven-slate-700',
  success: 'bg-haven-success',
  warning: 'bg-haven-warning',
  danger: 'bg-haven-danger',
  critical: 'bg-haven-danger',
  info: 'bg-haven-info',
  information: 'bg-haven-info',
  neutral: 'bg-haven-slate-500',
};

interface SidebarNavLinkProps {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}

function SidebarNavLink({ item, collapsed, onNavigate }: SidebarNavLinkProps) {
  const Icon = item.icon;
  const badgeText = item.badge ? `, ${item.badge.label} pending` : '';

  return (
    <Tooltip content={item.label} disabled={!collapsed} className="w-full">
      <NavLink
        to={item.path}
        end
        onClick={onNavigate}
        aria-label={collapsed ? `${item.label}${badgeText}` : undefined}
        className={({ isActive }) =>
          cn(
            'group relative flex w-full items-center gap-3 rounded-lg text-sm transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-blue-700/30 focus-visible:ring-offset-1 focus-visible:ring-offset-white',
            collapsed ? 'h-11 justify-center px-0' : 'min-h-10 px-3 py-2',
            isActive
              ? 'bg-haven-blue-100 font-semibold text-haven-blue-700'
              : 'font-medium text-haven-slate-700 hover:bg-haven-slate-100 hover:text-haven-slate-900'
          )
        }
      >
        {({ isActive }) => (
          <>
            {/* Active indicator bar */}
            <span
              aria-hidden="true"
              className={cn(
                'absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-haven-blue-700 transition-opacity',
                isActive ? 'opacity-100' : 'opacity-0'
              )}
            />
            <span className="relative flex shrink-0">
              <Icon
                aria-hidden="true"
                className={cn(
                  'h-[18px] w-[18px] transition-colors',
                  isActive ? 'text-haven-blue-700' : 'text-haven-slate-500 group-hover:text-haven-blue-700'
                )}
              />
              {collapsed && item.badge && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -right-1 -top-1 h-2 w-2 rounded-full ring-2 ring-white',
                    DOT_TONES[item.badge.variant]
                  )}
                />
              )}
            </span>
            {!collapsed && (
              <>
                <span className="min-w-0 flex-1 leading-snug">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      'ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
                      BADGE_TONES[item.badge.variant]
                    )}
                  >
                    {item.badge.label}
                    <span className="sr-only"> pending</span>
                  </span>
                )}
              </>
            )}
          </>
        )}
      </NavLink>
    </Tooltip>
  );
}

export interface SidebarNavProps {
  groups: NavGroup[];
  collapsed: boolean;
  onNavigate?: () => void;
}

/** Grouped, scrollable list of role navigation links with approved Blue theme. */
export function SidebarNav({ groups, collapsed, onNavigate }: SidebarNavProps) {
  return (
    <nav aria-label="Main navigation" className="haven-scroll flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
      <div className="space-y-5">
        {groups.map((group, index) => {
          const headingId = `nav-group-${group.id}`;
          return (
            <section key={group.id} aria-labelledby={headingId}>
              {collapsed ? (
                <>
                  <h2 id={headingId} className="sr-only">
                    {group.label}
                  </h2>
                  {index > 0 && <div aria-hidden="true" className="mx-auto mb-3 h-px w-8 bg-haven-border-light" />}
                </>
              ) : (
                <h2
                  id={headingId}
                  className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-haven-slate-500"
                >
                  {group.label}
                </h2>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <SidebarNavLink item={item} collapsed={collapsed} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </nav>
  );
}
