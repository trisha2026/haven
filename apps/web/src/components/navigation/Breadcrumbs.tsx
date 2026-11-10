import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '../../hooks/useBreadcrumbs.ts';
import { cn } from '../../utils/cn.ts';

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Route-derived breadcrumb trail.
 * Below the `lg` breakpoint only the current page is shown to save space.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const current = items[items.length - 1];

  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      {/* Compact: current page only */}
      <p className="truncate text-sm font-semibold text-haven-charcoal lg:hidden" aria-current="page">
        {current?.label}
      </p>

      {/* Full trail */}
      <ol className="hidden min-w-0 items-center gap-1.5 text-sm lg:flex">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-haven-taupe" />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="truncate rounded-sm text-haven-charcoal-muted transition-colors hover:text-haven-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-mocha/40"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    'truncate',
                    isLast ? 'font-semibold text-haven-charcoal' : 'text-haven-charcoal-muted'
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
