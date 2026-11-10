import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn.ts';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-mocha/40 focus-visible:ring-offset-2 focus-visible:ring-offset-haven-offwhite ' +
      'disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]';

    const variants: Record<ButtonVariant, string> = {
      // Primary: Rich Mocha background with off-white text - warm, authoritative yet welcoming
      primary:
        'bg-haven-mocha text-haven-offwhite shadow-sm hover:bg-haven-mocha-dark active:bg-haven-charcoal ' +
        'border border-haven-mocha-dark/20',
      
      // Secondary: Soft taupe background with charcoal text
      secondary:
        'bg-haven-greige/60 text-haven-charcoal hover:bg-haven-greige hover:text-haven-charcoal-dark ' +
        'border border-haven-greige active:bg-haven-taupe/30',

      // Outline: Greige border with charcoal text on clean surface
      outline:
        'bg-transparent text-haven-charcoal border border-haven-border hover:bg-haven-greige/40 ' +
        'hover:border-haven-taupe active:bg-haven-greige/60',

      // Ghost: Borderless, lightweight action
      ghost:
        'bg-transparent text-haven-charcoal hover:bg-haven-greige/40 hover:text-haven-charcoal-dark active:bg-haven-greige/60',

      // Danger: Soft yet distinct warm brick/crimson
      danger:
        'bg-haven-danger text-white shadow-sm hover:bg-haven-danger/90 active:bg-haven-danger ' +
        'focus-visible:ring-haven-danger/40',

      // Subtle: Off-white / Cream elevated tile
      subtle:
        'bg-haven-cream text-haven-charcoal border border-haven-border-light shadow-haven-sm ' +
        'hover:border-haven-border hover:bg-haven-offwhite',
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'text-xs h-8 px-3 rounded-md gap-1.5',
      md: 'text-sm h-10 px-4 rounded-lg gap-2',
      lg: 'text-base h-12 px-6 rounded-xl gap-2.5',
      icon: 'h-10 w-10 p-0 rounded-lg justify-center',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], widthStyle, className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
