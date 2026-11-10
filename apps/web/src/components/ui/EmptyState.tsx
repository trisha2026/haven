import React from 'react';
import { cn } from '../../utils/cn.ts';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  compact?: boolean;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      children,
      className,
      icon,
      title,
      description,
      action,
      secondaryAction,
      compact = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-haven-border bg-haven-offwhite/50',
          compact ? 'p-6 gap-3' : 'p-10 sm:p-12 gap-4',
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              'rounded-full bg-haven-greige/40 text-haven-mocha flex items-center justify-center border border-haven-border',
              compact ? 'w-10 h-10 [&>svg]:w-5 [&>svg]:h-5' : 'w-14 h-14 [&>svg]:w-7 [&>svg]:h-7'
            )}
          >
            {icon}
          </div>
        )}

        <div className={cn('space-y-1', compact ? 'max-w-xs' : 'max-w-md')}>
          <h3
            className={cn(
              'font-semibold text-haven-charcoal tracking-tight',
              compact ? 'text-base' : 'text-lg'
            )}
          >
            {title}
          </h3>
          {description && (
            <p
              className={cn(
                'text-haven-charcoal-muted leading-relaxed',
                compact ? 'text-xs' : 'text-sm'
              )}
            >
              {description}
            </p>
          )}
        </div>

        {(action || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {action}
            {secondaryAction}
          </div>
        )}

        {children}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
