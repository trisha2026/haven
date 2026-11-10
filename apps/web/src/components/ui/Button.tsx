import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn.ts';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle' | 'default';
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
      'inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-blue-700/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
      'disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]';

    const variants: Record<ButtonVariant, string> = {
      // Primary: #2457C5 with white accessible text
      primary:
        'bg-haven-blue-700 text-white shadow-sm hover:bg-haven-navy-900 active:bg-haven-navy-900 ' +
        'border border-haven-blue-700',

      default:
        'bg-haven-blue-700 text-white shadow-sm hover:bg-haven-navy-900 active:bg-haven-navy-900 ' +
        'border border-haven-blue-700',
      
      // Secondary: #E4EDFF with #2457C5 text
      secondary:
        'bg-haven-blue-100 text-haven-blue-700 hover:bg-haven-blue-100/80 active:bg-haven-blue-100 ' +
        'border border-haven-blue-100',

      // Outline: white surface, #E6ECF4 border, slate-700 text
      outline:
        'bg-white text-haven-slate-700 border border-haven-border hover:bg-haven-slate-50 ' +
        'hover:text-haven-slate-900 hover:border-haven-blue-500/40 active:bg-haven-slate-100',

      // Ghost: borderless, slate text
      ghost:
        'bg-transparent text-haven-slate-700 hover:bg-haven-slate-100 hover:text-haven-slate-900 active:bg-haven-blue-100/50',

      // Danger / Critical: #C84D45 with white text
      danger:
        'bg-haven-danger text-white shadow-sm hover:bg-haven-danger/90 active:bg-haven-danger ' +
        'focus-visible:ring-haven-danger/40',

      // Subtle: white surface, #E6ECF4 border, slate-700 text
      subtle:
        'bg-white text-haven-slate-700 border border-haven-border shadow-haven-sm ' +
        'hover:border-haven-blue-500/40 hover:bg-haven-slate-50',
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
