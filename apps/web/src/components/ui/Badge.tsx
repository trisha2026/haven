import React from 'react';
import { cn } from '../../utils/cn.ts';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

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
      // Default: Warm Mocha/Taupe aesthetic
      default:
        'bg-haven-greige-soft text-haven-mocha-dark border border-haven-border',

      // Secondary: Soft greige
      secondary:
        'bg-haven-offwhite text-haven-charcoal-muted border border-haven-border-light',

      // Outline: Greige border with charcoal text
      outline:
        'bg-transparent text-haven-charcoal border border-haven-taupe',

      // Calming Warm Statuses (avoiding harsh hospital neon)
      success:
        'bg-haven-success-soft text-haven-success border border-haven-success-border',

      warning:
        'bg-haven-warning-soft text-haven-warning border border-haven-warning-border',

      danger:
        'bg-haven-danger-soft text-haven-danger border border-haven-danger-border',

      info:
        'bg-haven-info-soft text-haven-info border border-haven-info-border',
    };

    const dotColors: Record<BadgeVariant, string> = {
      default: 'bg-haven-mocha',
      secondary: 'bg-haven-taupe',
      outline: 'bg-haven-charcoal',
      success: 'bg-haven-success',
      warning: 'bg-haven-warning',
      danger: 'bg-haven-danger',
      info: 'bg-haven-info',
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
