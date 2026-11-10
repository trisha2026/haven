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
      'rounded-2xl transition-all duration-200 text-haven-charcoal relative overflow-hidden';

    const variants: Record<CardVariant, string> = {
      // Default: Clean off-white surface with warm greige border and delicate diffuse shadow
      default:
        'bg-haven-cream border border-haven-border/80 shadow-haven-card',
      // Outlined: Flat surface with crisp greige boundary
      outlined:
        'bg-haven-offwhite border border-haven-border',
      // Subtle: Tinted surface blending with greige tones
      subtle:
        'bg-haven-greige-soft/50 border border-haven-border-light',
      // Elevated: Premium floating surface with deeper calm shadow
      elevated:
        'bg-white border border-haven-border/60 shadow-haven-hover',
    };

    const paddings: Record<CardPadding, string> = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactiveStyles = interactive
      ? 'cursor-pointer hover:shadow-haven-hover hover:border-haven-taupe hover:-translate-y-0.5 active:translate-y-0'
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
          'text-lg font-semibold tracking-tight text-haven-charcoal leading-snug',
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
      className={cn('text-sm text-haven-charcoal-muted leading-relaxed', className)}
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
    <div ref={ref} className={cn('text-sm text-haven-charcoal', className)} {...props}>
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
        'flex items-center justify-between pt-4 mt-4 border-t border-haven-border-light text-sm text-haven-charcoal-muted',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
CardFooter.displayName = 'CardFooter';
