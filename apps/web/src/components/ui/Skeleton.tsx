import React from 'react';
import { cn } from '../../utils/cn.ts';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, style, ...props }, ref) => {
    const variants: Record<SkeletonVariant, string> = {
      text: 'h-4 w-full rounded-md',
      circular: 'rounded-full aspect-square',
      rectangular: 'rounded-xl w-full',
    };

    const inlineStyles: React.CSSProperties = {
      ...style,
      width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : style?.width,
      height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : style?.height,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={inlineStyles}
        className={cn(
          'animate-pulse bg-haven-greige/50',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
