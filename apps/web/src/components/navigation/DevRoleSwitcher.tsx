import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  ShieldAlert,
  ChevronDown,
  Check,
  Sparkles,
  Users,
  Stethoscope,
  HeartHandshake,
  Palette,
} from 'lucide-react';
import type { UserRole } from '../../types/navigation.ts';
import { ROLE_META, USER_ROLES } from '../../config/roles.ts';
import { MOCK_USERS } from '../../mock/users.ts';
import { useEscapeKey, useOnClickOutside } from '../../hooks/useDismiss.ts';
import { cn } from '../../utils/cn.ts';

export interface DevRoleSwitcherProps {
  currentRole: UserRole;
  variant?: 'topbar' | 'floating';
}

const ROLE_ICONS: Record<UserRole, React.ElementType> = {
  admin: Users,
  caregiver: HeartHandshake,
  doctor: Stethoscope,
};

export function DevRoleSwitcher({ currentRole, variant = 'topbar' }: DevRoleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useOnClickOutside([containerRef], () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  const handleRoleSelect = (role: UserRole) => {
    setOpen(false);
    navigate(ROLE_META[role].homePath);
  };

  const handleDesignSystem = () => {
    setOpen(false);
    navigate('/design-system');
  };

  const currentMeta = ROLE_META[currentRole];
  const CurrentIcon = ROLE_ICONS[currentRole];

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      {variant === 'topbar' ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true"
          className={cn(
            'flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer',
            'bg-haven-cream border-haven-border hover:bg-haven-greige-soft hover:border-haven-taupe',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-mocha/40'
          )}
          title="Switch role for UI development preview"
        >
          <span className="flex items-center gap-1.5 text-haven-mocha font-semibold">
            <CurrentIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{currentMeta.label}</span>
          </span>
          <span className="px-1.5 py-0.2 rounded text-[10px] uppercase font-bold tracking-wider bg-haven-warning-soft text-haven-warning border border-haven-warning-border">
            Dev Role
          </span>
          <ChevronDown className="w-3 h-3 text-haven-charcoal-muted" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true"
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-full border shadow-haven-hover text-xs font-semibold transition-all cursor-pointer',
            'bg-haven-cream border-haven-border hover:bg-haven-greige-soft',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-mocha/40'
          )}
        >
          <ShieldAlert className="w-4 h-4 text-haven-warning" />
          <span>Role: {currentMeta.label}</span>
          <ChevronDown className="w-3 h-3 text-haven-charcoal-muted" />
        </button>
      )}

      {/* Dropdown Menu */}
      {open && (
        <div
          role="menu"
          aria-label="Development role switcher"
          className={cn(
            'absolute right-0 top-full mt-2 w-72 bg-haven-cream rounded-2xl border border-haven-border shadow-haven-popover z-50',
            'overflow-hidden text-haven-charcoal animate-pop-in p-1.5 focus:outline-none'
          )}
        >
          {/* Disclaimer Header */}
          <div className="p-3 bg-haven-warning-soft/70 rounded-xl border border-haven-warning-border mb-1.5">
            <div className="flex items-center gap-1.5 text-haven-warning font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UI Development Preview</span>
            </div>
            <p className="text-[11px] text-haven-charcoal-muted mt-1 leading-normal">
              Temporary role switcher for previewing layout configurations. Replace with Firebase Auth in production.
            </p>
          </div>

          {/* Role options */}
          <div className="space-y-0.5">
            {USER_ROLES.map((role) => {
              const meta = ROLE_META[role];
              const mockUser = MOCK_USERS[role];
              const Icon = ROLE_ICONS[role];
              const isSelected = role === currentRole;

              return (
                <button
                  key={role}
                  type="button"
                  role="menuitem"
                  onClick={() => handleRoleSelect(role)}
                  className={cn(
                    'flex items-center justify-between w-full p-2.5 rounded-xl text-left transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-haven-greige-soft text-haven-charcoal font-semibold'
                      : 'hover:bg-haven-greige-soft/60 text-haven-charcoal-light'
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={cn(
                        'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                        isSelected ? 'bg-haven-mocha text-haven-offwhite' : 'bg-haven-greige/40 text-haven-mocha'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-haven-charcoal truncate">
                        {meta.label}
                      </p>
                      <p className="text-[11px] text-haven-charcoal-muted truncate">
                        {mockUser.fullName} ({mockUser.title})
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-haven-mocha shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Design System Link */}
          <div className="mt-1 pt-1 border-t border-haven-border-light">
            <button
              type="button"
              role="menuitem"
              onClick={handleDesignSystem}
              className="flex items-center gap-2 w-full p-2.5 rounded-xl text-left text-xs font-medium text-haven-mocha hover:bg-haven-greige-soft transition-colors cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-haven-mocha" />
              <span>Design System Showcase Gallery</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
