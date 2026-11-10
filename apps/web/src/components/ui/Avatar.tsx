import React from 'react';
import { cn } from '../../utils/cn.ts';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Initials shown when no image is provided. */
  initials?: string;
  /** Full name to derive initials from if initials are not provided. */
  name?: string;
  size?: AvatarSize;
  /** Optional decorative presence indicator. */
  status?: 'online' | 'away';
}

const SIZES: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-12 w-12 text-sm',
  xl: 'h-16 w-16 text-base',
};

/** Initials avatar in HAVEN's Royal Blue palette. */
export function Avatar({ initials, name, size = 'md', status, className, ...props }: AvatarProps) {
  const displayInitials =
    initials ||
    (name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : 'H');

  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center rounded-full',
        'bg-haven-blue-700 font-semibold tracking-wide text-white ring-2 ring-white shadow-sm',
        SIZES[size],
        className
      )}
      {...props}
    >
      {displayInitials}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white',
            status === 'online' ? 'bg-haven-success' : 'bg-haven-warning'
          )}
        />
      )}
    </span>
  );
}
