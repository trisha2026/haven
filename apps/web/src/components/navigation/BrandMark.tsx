import { Heart } from 'lucide-react';
import { cn } from '../../utils/cn.ts';

export interface BrandMarkProps {
  /** Workspace label shown under the wordmark (e.g. "Administration"). */
  workspace?: string;
  /** Show only the logo tile (collapsed sidebar). */
  compact?: boolean;
  className?: string;
}

/** HAVEN logo tile and wordmark. */
export function BrandMark({ workspace, compact = false, className }: BrandMarkProps) {
  return (
    <div className={cn('flex min-w-0 items-center gap-3', className)}>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-haven-mocha text-haven-offwhite shadow-haven-sm"
      >
        <Heart className="h-5 w-5 stroke-[2.2]" />
      </span>
      {compact ? (
        <span className="sr-only">HAVEN{workspace ? ` — ${workspace}` : ''}</span>
      ) : (
        <span className="min-w-0 leading-tight">
          <span className="block text-base font-bold tracking-[0.14em] text-haven-charcoal">HAVEN</span>
          {workspace && (
            <span className="block truncate text-[11px] font-medium text-haven-charcoal-muted">
              {workspace}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
