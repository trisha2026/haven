import React from 'react';
import { cn } from '../../utils/cn.ts';

export type CardVariant = 'default' | 'outlined' | 'subtle' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = 'default',
      padding = 'md',
      interactive = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'rounded-2xl transition-all duration-200 text-haven-slate-900 relative overflow-hidden';

    const variants: Record<CardVariant, string> = {
      // Default: Crisp white surface with #E6ECF4 border and subtle calm shadow
      default:
        'bg-white border border-haven-border shadow-haven-card',
      // Outlined: Flat clean white surface with subtle boundary
      outlined:
        'bg-white border border-haven-border',
      // Subtle: Light slate-50 section surface
      subtle:
        'bg-haven-slate-50 border border-haven-border-light',
      // Elevated: Premium white surface with gentle elevation
      elevated:
        'bg-white border border-haven-border shadow-haven-hover',
    };

    const paddings: Record<CardPadding, string> = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactiveStyles = interactive
      ? 'cursor-pointer hover:shadow-haven-hover hover:border-haven-blue-500/50 hover:-translate-y-0.5 active:translate-y-0'
      : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], interactiveStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between gap-4 pb-4', className)}
        {...props}
      >
        <div className="space-y-1">{children}</div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, as = 'h3', ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(
          'text-lg font-semibold tracking-tight text-haven-slate-900 leading-snug',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-haven-slate-500 leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
});
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('text-sm text-haven-slate-700', className)} {...props}>
      {children}
    </div>
  );
});
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between pt-4 mt-4 border-t border-haven-border-light text-sm text-haven-slate-500',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
CardFooter.displayName = 'CardFooter';
