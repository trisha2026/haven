import React from 'react';
import { cn } from '../../utils/cn.ts';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Initials shown when no image is provided. */
  initials: string;
  size?: AvatarSize;
  /** Optional decorative presence indicator. */
  status?: 'online' | 'away';
}

const SIZES: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-12 w-12 text-sm',
};

/** Initials avatar in HAVEN's Royal Blue palette. */
export function Avatar({ initials, size = 'md', status, className, ...props }: AvatarProps) {
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
      {initials}
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
