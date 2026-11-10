import React, { useId } from 'react';
import { cn } from '../../utils/cn.ts';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: InputSize;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id: customId,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      disabled,
      required,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const sizes: Record<InputSize, string> = {
      sm: 'h-8 text-xs px-2.5 rounded-md',
      md: 'h-10 text-sm px-3.5 rounded-lg',
      lg: 'h-12 text-base px-4 rounded-xl',
    };

    const hasError = Boolean(error);

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-haven-charcoal-muted flex items-center gap-1"
          >
            <span>{label}</span>
            {required && <span className="text-haven-danger font-bold">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-haven-charcoal-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={hasError ? 'true' : undefined}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              'w-full bg-haven-cream text-haven-charcoal placeholder:text-haven-charcoal-muted/60',
              'border transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-haven-offwhite',
              'disabled:bg-haven-greige-soft/60 disabled:text-haven-charcoal-muted/70 disabled:cursor-not-allowed',
              sizes[inputSize],
              leftIcon ? (inputSize === 'sm' ? 'pl-8' : inputSize === 'lg' ? 'pl-11' : 'pl-10') : '',
              rightIcon ? (inputSize === 'sm' ? 'pr-8' : inputSize === 'lg' ? 'pr-11' : 'pr-10') : '',
              hasError
                ? 'border-haven-danger text-haven-charcoal focus:border-haven-danger focus:ring-haven-danger/30'
                : 'border-haven-border hover:border-haven-taupe focus:border-haven-mocha focus:ring-haven-mocha/30',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 flex items-center text-haven-charcoal-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs text-haven-danger font-medium flex items-center gap-1">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-haven-charcoal-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
