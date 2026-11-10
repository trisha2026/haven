import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn.ts';

export type TooltipSide = 'right' | 'bottom';

export interface TooltipProps {
  /** Tooltip text. Keep short; it supplements, never replaces, an accessible name. */
  content: React.ReactNode;
  side?: TooltipSide;
  /** When true the tooltip never appears (e.g. sidebar expanded, label already visible). */
  disabled?: boolean;
  /** Class names for the wrapping element. */
  className?: string;
  children: React.ReactNode;
}

interface TooltipPosition {
  top: number;
  left: number;
}

/**
 * Lightweight tooltip rendered in a portal with fixed positioning so it is never
 * clipped by scrolling containers. Appears on hover and on keyboard focus.
 * Purely visual: triggers must carry their own accessible label.
 */
export function Tooltip({ content, side = 'right', disabled = false, className, children }: TooltipProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  const show = () => {
    const trigger = triggerRef.current;
    if (disabled || !trigger) return;
    const rect = trigger.getBoundingClientRect();
    setPosition(
      side === 'right'
        ? { top: rect.top + rect.height / 2, left: rect.right + 10 }
        : { top: rect.bottom + 8, left: rect.left + rect.width / 2 }
    );
  };

  const hide = () => setPosition(null);

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    // Only show for keyboard focus, not for mouse clicks.
    if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) show();
  };

  return (
    <div
      ref={triggerRef}
      className={className}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={handleFocus}
      onBlur={hide}
      onKeyDown={(event) => {
        if (event.key === 'Escape') hide();
      }}
      onClick={hide}
    >
      {children}
      {position && !disabled &&
        createPortal(
          <div
            role="tooltip"
            aria-hidden="true"
            style={{ top: position.top, left: position.left }}
            className={cn(
              'pointer-events-none fixed z-[80] whitespace-nowrap rounded-md bg-haven-charcoal px-2.5 py-1.5',
              'text-xs font-medium text-haven-offwhite shadow-haven-popover animate-fade-in',
              side === 'right' ? '-translate-y-1/2' : '-translate-x-1/2'
            )}
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
}
