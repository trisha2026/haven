import React from 'react';
import { cn } from '../../utils/cn.ts';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
  | 'critical'
  | 'info'
  | 'information'
  | 'neutral';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      icon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center font-medium transition-colors select-none rounded-full';

    const variants: Record<BadgeVariant, string> = {
      // Default: Royal blue-100 / blue-700
      default:
        'bg-haven-blue-100 text-haven-blue-700 border border-haven-blue-100',

      // Secondary: Neutral slate-100 / slate-500
      secondary:
        'bg-haven-slate-100 text-haven-slate-500 border border-haven-border',

      // Neutral alias: #F1F5F9 / #64748B
      neutral:
        'bg-haven-slate-100 text-haven-slate-500 border border-haven-border',

      // Outline: clean white with border and slate text
      outline:
        'bg-white text-haven-slate-700 border border-haven-border',

      // Success: #E8F5EF / #16856B
      success:
        'bg-haven-success-soft text-haven-success border border-haven-success-border',

      // Warning: #FFF5E5 / #A96B12
      warning:
        'bg-haven-warning-soft text-haven-warning border border-haven-warning-border',

      // Danger / Critical: #FDEDEC / #C84D45
      danger:
        'bg-haven-danger-soft text-haven-danger border border-haven-danger-border',

      critical:
        'bg-haven-danger-soft text-haven-danger border border-haven-danger-border',

      // Information / Info: #EAF2FF / #2457C5
      info:
        'bg-haven-info-soft text-haven-info border border-haven-info-border',

      information:
        'bg-haven-info-soft text-haven-info border border-haven-info-border',
    };

    const dotColors: Record<BadgeVariant, string> = {
      default: 'bg-haven-blue-700',
      secondary: 'bg-haven-slate-500',
      neutral: 'bg-haven-slate-500',
      outline: 'bg-haven-slate-700',
      success: 'bg-haven-success',
      warning: 'bg-haven-warning',
      danger: 'bg-haven-danger',
      critical: 'bg-haven-danger',
      info: 'bg-haven-info',
      information: 'bg-haven-info',
    };

    const sizes: Record<BadgeSize, string> = {
      sm: 'text-[11px] px-2 py-0.5 gap-1.5',
      md: 'text-xs px-2.5 py-1 gap-1.5',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full shrink-0',
              dotColors[variant]
            )}
            aria-hidden="true"
          />
        )}
        {icon && <span className="inline-flex shrink-0 -ml-0.5">{icon}</span>}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
