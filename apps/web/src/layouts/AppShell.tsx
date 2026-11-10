import { useState } from 'react';
import { Outlet } from 'react-router';
import type { UserRole } from '../types/navigation.ts';
import { getRoleNavigation } from '../config/navigation/index.ts';
import { useCurrentUser } from '../hooks/useCurrentUser.ts';
import { useNotifications } from '../hooks/useNotifications.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { Sidebar, MobileSidebar } from '../components/navigation/Sidebar.tsx';
import { Topbar } from '../components/navigation/Topbar.tsx';
import { cn } from '../utils/cn.ts';

export interface AppShellProps {
  role: UserRole;
}

export function AppShell({ role }: AppShellProps) {
  const [collapsed, setCollapsed] = useLocalStorage<boolean>(
    `haven-sidebar-collapsed-${role}`,
    false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = getRoleNavigation(role);
  const user = useCurrentUser(role);
  const notificationsState = useNotifications(role);

  return (
    <div className="min-h-screen bg-haven-offwhite text-haven-charcoal flex flex-col font-sans selection:bg-haven-taupe/30 selection:text-haven-charcoal">
      {/* Persistent Sidebar (Tablet / Desktop) */}
      <Sidebar
        navigation={navigation}
        user={user}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(!collapsed)}
        onNavigate={() => setMobileOpen(false)}
      />

      {/* Mobile Off-canvas Drawer Navigation */}
      <MobileSidebar
        navigation={navigation}
        user={user}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content Layout Wrapper with dynamic left margin for Sidebar */}
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-[padding-left] duration-200 ease-out',
          collapsed ? 'md:pl-sidebar-collapsed' : 'md:pl-sidebar'
        )}
      >
        {/* Sticky Topbar */}
        <Topbar
          role={role}
          user={user}
          notificationsState={notificationsState}
          onOpenMobileSidebar={() => setMobileOpen(true)}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed(!collapsed)}
        />

        {/* Page Content Outlet */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <Outlet />
        </main>

        {/* Shell Footer */}
        <footer className="mt-auto border-t border-haven-border bg-haven-cream py-6 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-haven-charcoal-muted">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-haven-charcoal">HAVEN</span>
              <span>— Elderly Care &amp; Facility Management</span>
            </div>
            <p className="italic text-center sm:text-right">
              &ldquo;A safer, smarter and more caring place for every resident.&rdquo;
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
