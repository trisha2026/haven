import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  UserRound,
  SlidersHorizontal,
  LogOut,
  Building2,
  Clock,
  Palette,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import type { AppUser } from '../../types/user.ts';
import { ROLE_META } from '../../config/roles.ts';
import { Avatar } from '../ui/Avatar.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/Dialog.tsx';
import { Button } from '../ui/Button.tsx';
import { useEscapeKey, useOnClickOutside } from '../../hooks/useDismiss.ts';
import { cn } from '../../utils/cn.ts';

export interface ProfileDropdownProps {
  open: boolean;
  onClose: () => void;
  user: AppUser;
  triggerRef: React.RefObject<HTMLElement | null>;
}

export function ProfileDropdown({ open, onClose, user, triggerRef }: ProfileDropdownProps) {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const roleMeta = ROLE_META[user.role];

  useOnClickOutside([dropdownRef, triggerRef], () => onClose(), open);
  useEscapeKey(() => onClose(), open);

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSignOutConfirm = () => {
    setShowSignOutDialog(false);
    onClose();
    // In mock development, redirect to the role's home or show confirmation
    navigate(`/${user.role}/dashboard`);
  };

  if (!open) return null;

  return (
    <>
      <div
        ref={dropdownRef}
        role="menu"
        aria-orientation="vertical"
        aria-label="User account menu"
        className={cn(
          'absolute right-0 top-full mt-2 w-80 bg-haven-cream rounded-2xl border border-haven-border shadow-haven-popover z-50',
          'overflow-hidden text-haven-charcoal animate-pop-in focus:outline-none'
        )}
      >
        {/* User Card Header */}
        <div className="p-4 bg-haven-offwhite border-b border-haven-border">
          <div className="flex items-start gap-3">
            <Avatar initials={user.initials} size="lg" status="online" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-haven-charcoal truncate">{user.fullName}</p>
              </div>
              <p className="text-xs text-haven-charcoal-muted truncate">{user.email}</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-haven-greige text-haven-mocha-dark">
                  <Shield className="w-3 h-3 text-haven-mocha" />
                  {roleMeta.label}
                </span>
                <span className="text-[10px] font-mono text-haven-charcoal-muted">
                  ID: {user.employeeId}
                </span>
              </div>
            </div>
          </div>

          {/* Facility & Shift info */}
          <div className="mt-3 pt-2.5 border-t border-haven-border-light space-y-1 text-xs text-haven-charcoal-muted">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-haven-taupe shrink-0" />
              <span className="truncate">{user.facility}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-haven-taupe shrink-0" />
              <span className="truncate">{user.shift}</span>
            </div>
          </div>
        </div>

        {/* Action Navigation Links */}
        <div className="p-2 space-y-0.5 text-xs">
          <button
            type="button"
            role="menuitem"
            onClick={() => handleNavigate(`/${user.role}/profile`)}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-haven-charcoal hover:bg-haven-greige-soft transition-colors cursor-pointer text-left"
          >
            <UserRound className="w-4 h-4 text-haven-taupe shrink-0" />
            <span className="font-medium">My Profile &amp; Credentials</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => handleNavigate(`/${user.role}/preferences`)}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-haven-charcoal hover:bg-haven-greige-soft transition-colors cursor-pointer text-left"
          >
            <SlidersHorizontal className="w-4 h-4 text-haven-taupe shrink-0" />
            <span className="font-medium">Preferences &amp; Accessibility</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => handleNavigate('/design-system')}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-haven-mocha hover:bg-haven-greige-soft transition-colors cursor-pointer text-left font-medium"
          >
            <Palette className="w-4 h-4 text-haven-mocha shrink-0" />
            <span>HAVEN Design System Gallery</span>
          </button>
        </div>

        {/* Logout Footer */}
        <div className="p-2 border-t border-haven-border bg-haven-offwhite/50">
          <button
            type="button"
            role="menuitem"
            onClick={() => setShowSignOutDialog(true)}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-haven-danger hover:bg-haven-danger-soft transition-colors cursor-pointer font-medium text-xs text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out ({user.preferredName})</span>
          </button>
        </div>
      </div>

      {/* Mock Sign Out Confirmation Dialog */}
      <Dialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <DialogContent maxWidth="sm">
          <DialogHeader>
            <DialogTitle>Sign Out of HAVEN</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out from the {roleMeta.label} session?
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 text-xs text-haven-charcoal-muted space-y-2">
            <p>
              In production, this invalidates your Firebase authentication session and returns you to the login screen.
            </p>
            <div className="p-2.5 rounded-lg bg-haven-offwhite border border-haven-border text-haven-charcoal flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-haven-success shrink-0" />
              <span>Current mock user: {user.fullName} ({roleMeta.label})</span>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </DialogClose>
            <Button
              variant="danger"
              size="sm"
              onClick={handleSignOutConfirm}
            >
              Confirm Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
