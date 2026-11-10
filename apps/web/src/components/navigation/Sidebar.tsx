import { useRef } from 'react';
import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import type { RoleNavigation } from '../../types/navigation.ts';
import type { AppUser } from '../../types/user.ts';
import { ROLE_META } from '../../config/roles.ts';
import { BrandMark } from './BrandMark.tsx';
import { SidebarNav } from './SidebarNav.tsx';
import { Tooltip } from '../ui/Tooltip.tsx';
import { cn } from '../../utils/cn.ts';
import { useFocusTrap } from '../../hooks/useFocusTrap.ts';
import { useBodyScrollLock, useEscapeKey } from '../../hooks/useDismiss.ts';

const ICON_BUTTON =
  'inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-haven-charcoal-muted transition-colors ' +
  'hover:bg-haven-greige-soft hover:text-haven-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-mocha/40';

interface SidebarFooterProps {
  user: AppUser;
  collapsed: boolean;
}

function SidebarFooter({ user, collapsed }: SidebarFooterProps) {
  if (collapsed) {
    return (
      <div className="flex justify-center border-t border-haven-border-light p-3">
        <span
          className="h-2.5 w-2.5 rounded-full bg-haven-success ring-4 ring-haven-success-soft"
          title="Facility systems normal"
        >
          <span className="sr-only">Facility systems normal</span>
        </span>
      </div>
    );
  }

  return (
    <div className="border-t border-haven-border-light p-3">
      <div className="rounded-xl border border-haven-border-light bg-haven-offwhite px-3 py-2.5">
        <p className="truncate text-xs font-semibold text-haven-charcoal">{user.facility}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-haven-charcoal-muted">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-haven-success" />
          Facility systems normal
        </p>
      </div>
    </div>
  );
}

export interface SidebarProps {
  navigation: RoleNavigation;
  user: AppUser;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  /** Called after a navigation link is activated (used to close overlays). */
  onNavigate?: () => void;
}

/** Persistent sidebar rail for tablet and desktop. */
export function Sidebar({ navigation, user, collapsed, onToggleCollapsed, onNavigate }: SidebarProps) {
  const meta = ROLE_META[navigation.role];

  return (
    <aside
      aria-label={`${meta.label} sidebar`}
      className={cn(
        'fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-haven-border bg-haven-cream md:flex',
        'transition-[width,box-shadow] duration-200 ease-out',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'
      )}
    >
      <div
        className={cn(
          'flex h-topbar shrink-0 items-center border-b border-haven-border-light',
          collapsed ? 'justify-center px-2' : 'justify-between gap-2 pl-5 pr-3'
        )}
      >
        <BrandMark workspace={meta.workspace} compact={collapsed} />
        {!collapsed && (
          <button
            type="button"
            onClick={onToggleCollapsed}
            className={ICON_BUTTON}
            aria-label="Collapse sidebar"
            aria-expanded="true"
          >
            <PanelLeftClose className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center pt-3">
          <Tooltip content="Expand sidebar">
            <button
              type="button"
              onClick={onToggleCollapsed}
              className={ICON_BUTTON}
              aria-label="Expand sidebar"
              aria-expanded="false"
            >
              <PanelLeftOpen className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </Tooltip>
        </div>
      )}

      <SidebarNav groups={navigation.groups} collapsed={collapsed} onNavigate={onNavigate} />
      <SidebarFooter user={user} collapsed={collapsed} />
    </aside>
  );
}

export interface MobileSidebarProps {
  navigation: RoleNavigation;
  user: AppUser;
  open: boolean;
  onClose: () => void;
}

/** Off-canvas navigation drawer for mobile viewports. */
export function MobileSidebar({ navigation, user, open, onClose }: MobileSidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const meta = ROLE_META[navigation.role];

  useFocusTrap(panelRef, open);
  useBodyScrollLock(open);
  useEscapeKey(onClose, open);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-haven-charcoal/40 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label={`${meta.label} navigation`}
        tabIndex={-1}
        className="absolute inset-y-0 left-0 flex w-[min(86vw,300px)] flex-col bg-haven-cream shadow-haven-modal animate-slide-in-left focus:outline-none"
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-haven-border-light pl-4 pr-2">
          <BrandMark workspace={meta.workspace} />
          <button type="button" onClick={onClose} className={cn(ICON_BUTTON, 'h-11 w-11')} aria-label="Close navigation">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <SidebarNav groups={navigation.groups} collapsed={false} onNavigate={onClose} />
        <SidebarFooter user={user} collapsed={false} />
      </div>
    </div>
  );
}
