import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn.ts';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: SelectOption[];
  selectSize?: SelectSize;
  leftIcon?: React.ReactNode;
  placeholder?: string;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id: customId,
      label,
      helperText,
      error,
      options,
      selectSize = 'md',
      leftIcon,
      placeholder,
      children,
      disabled,
      required,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = customId || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const sizes: Record<SelectSize, string> = {
      sm: 'h-8 text-xs pl-2.5 pr-8 rounded-md',
      md: 'h-10 text-sm pl-3.5 pr-10 rounded-lg',
      lg: 'h-12 text-base pl-4 pr-11 rounded-xl',
    };

    const hasError = Boolean(error);

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold uppercase tracking-wider text-haven-slate-500 flex items-center gap-1"
          >
            <span>{label}</span>
            {required && <span className="text-haven-danger font-bold">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-haven-slate-500">
              {leftIcon}
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={hasError ? 'true' : undefined}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              'w-full appearance-none bg-white text-haven-slate-900 cursor-pointer',
              'border transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white',
              'disabled:bg-haven-slate-50 disabled:text-haven-slate-500/70 disabled:cursor-not-allowed',
              sizes[selectSize],
              leftIcon ? (selectSize === 'sm' ? 'pl-8' : selectSize === 'lg' ? 'pl-11' : 'pl-10') : '',
              hasError
                ? 'border-haven-danger text-haven-slate-900 focus:border-haven-danger focus:ring-haven-danger/30'
                : 'border-haven-border hover:border-haven-blue-500/40 focus:border-haven-blue-700 focus:ring-haven-blue-700/25',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-3 flex items-center pointer-events-none text-haven-slate-500">
            <ChevronDown className={cn(selectSize === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
          </div>
        </div>

        {error && (
          <p id={errorId} className="text-xs text-haven-danger font-medium flex items-center gap-1">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-haven-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
