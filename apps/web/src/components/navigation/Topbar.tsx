import { useRef, useState, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import type { UserRole } from '../../types/navigation.ts';
import type { AppUser } from '../../types/user.ts';
import type { NotificationsState } from '../../hooks/useNotifications.ts';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs.ts';
import { Breadcrumbs } from './Breadcrumbs.tsx';
import { Avatar } from '../ui/Avatar.tsx';
import { SearchDialog } from '../search/SearchDialog.tsx';
import { NotificationPanel } from '../notifications/NotificationPanel.tsx';
import { ProfileDropdown } from '../profile/ProfileDropdown.tsx';
import { HelpDialog } from '../help/HelpDialog.tsx';
import { DevRoleSwitcher } from './DevRoleSwitcher.tsx';
import { cn } from '../../utils/cn.ts';

export interface TopbarProps {
  role: UserRole;
  user: AppUser;
  notificationsState: NotificationsState;
  onOpenMobileSidebar: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export function Topbar({
  role,
  user,
  notificationsState,
  onOpenMobileSidebar,
}: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const notificationBtnRef = useRef<HTMLButtonElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);

  const breadcrumbItems = useBreadcrumbs(role);

  // Global keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-topbar shrink-0 bg-haven-cream/90 backdrop-blur-md border-b border-haven-border shadow-haven-sm">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Left Section: Mobile Menu Trigger + Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl text-haven-charcoal hover:bg-haven-greige-soft transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Center/Search Bar Trigger (Desktop / Tablet) */}
        <div className="hidden sm:flex items-center flex-1 max-w-md mx-4">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl text-xs font-normal text-left transition-all cursor-pointer',
              'bg-haven-offwhite border border-haven-border hover:bg-haven-greige-soft/50 hover:border-haven-taupe',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-mocha/40'
            )}
            aria-label="Search residents, wings, staff, modules"
          >
            <div className="flex items-center gap-2.5 text-haven-charcoal-muted">
              <Search className="w-4 h-4 text-haven-taupe shrink-0" />
              <span className="truncate">Search records, rooms, protocols...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-haven-cream border border-haven-border font-mono text-[10px] text-haven-charcoal-muted">
              <span>⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right Section: Role Switcher, Mobile Search Icon, Notifications, Help, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Dev Role Switcher */}
          <DevRoleSwitcher currentRole={role} variant="topbar" />

          {/* Mobile search button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2 rounded-xl text-haven-charcoal hover:bg-haven-greige-soft transition-colors cursor-pointer"
            aria-label="Open search dialog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Help Action */}
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="p-2 rounded-xl text-haven-charcoal-muted hover:text-haven-charcoal hover:bg-haven-greige-soft transition-colors cursor-pointer"
            aria-label="Help and facility support directory"
            title="Help and emergency directory"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notification Bell with Badge & Dropdown */}
          <div className="relative">
            <button
              ref={notificationBtnRef}
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              aria-expanded={notificationsOpen}
              aria-haspopup="true"
              className="relative p-2 rounded-xl text-haven-charcoal-muted hover:text-haven-charcoal hover:bg-haven-greige-soft transition-colors cursor-pointer"
              aria-label={`Notifications, ${notificationsState.unreadCount} unread`}
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationsState.unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-haven-mocha text-[10px] font-bold text-haven-offwhite px-1 shadow-sm ring-2 ring-haven-cream">
                  {notificationsState.unreadCount}
                </span>
              )}
            </button>

            <NotificationPanel
              open={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
              notificationsState={notificationsState}
              triggerRef={notificationBtnRef}
            />
          </div>

          <div className="h-6 w-px bg-haven-border-light hidden sm:block" aria-hidden="true" />

          {/* User Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              ref={profileBtnRef}
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              aria-expanded={profileOpen}
              aria-haspopup="true"
              className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-haven-greige-soft transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-mocha/40"
              aria-label={`User menu for ${user.fullName}`}
            >
              <Avatar initials={user.initials} size="sm" status="online" />
              <div className="hidden lg:block text-left text-xs leading-tight pr-1">
                <p className="font-semibold text-haven-charcoal truncate max-w-[120px]">
                  {user.preferredName}
                </p>
                <p className="text-[10px] text-haven-charcoal-muted truncate max-w-[120px]">
                  {user.title.split(',')[0]}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-haven-charcoal-muted hidden sm:block" />
            </button>

            <ProfileDropdown
              open={profileOpen}
              onClose={() => setProfileOpen(false)}
              user={user}
              triggerRef={profileBtnRef}
            />
          </div>
        </div>
      </div>

      {/* Global Search Dialog Modal */}
      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        role={role}
      />

      {/* Help Modal */}
      <HelpDialog
        open={helpOpen}
        onOpenChange={setHelpOpen}
      />
    </header>
  );
}
