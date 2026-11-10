import React, { createContext, useContext, useEffect, useRef, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn.ts';
import { useFocusTrap } from '../../hooks/useFocusTrap.ts';

interface DialogContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog compound components must be used within a <Dialog />');
  }
  return context;
}

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const titleId = useId();
  const descriptionId = useId();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    controlledOnOpenChange?.(nextOpen);
  };

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        onOpenChange: handleOpenChange,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, onClick, asChild = false, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onOpenChange(true);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          (children as React.ReactElement<{ onClick?: React.MouseEventHandler }>).props.onClick?.(e);
          handleClick(e);
        },
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DialogTrigger.displayName = 'DialogTrigger';

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      children,
      className,
      maxWidth = 'md',
      showCloseButton = true,
      ...props
    },
    ref
  ) => {
    const { isOpen, onOpenChange, titleId, descriptionId } = useDialog();
    const overlayRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onOpenChange(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onOpenChange]);

    // Prevent body scrolling when open
    useEffect(() => {
      if (!isOpen) return;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [isOpen]);

    // Keep keyboard focus inside the dialog and restore it on close
    useFocusTrap(overlayRef, isOpen);

    if (!isOpen) return null;

    const maxWidths: Record<string, string> = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    const dialogContent = (
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        role="presentation"
      >
        {/* Scrim / Backdrop */}
        <div
          className="fixed inset-0 bg-haven-slate-900/40 backdrop-blur-xs animate-fade-in"
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />

        {/* Dialog Card */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={cn(
            'relative w-full z-10 bg-white rounded-2xl border border-haven-border shadow-haven-modal',
            'max-h-[calc(100dvh-2rem)] overflow-y-auto haven-scroll focus:outline-none',
            'p-6 sm:p-7 text-haven-slate-900 animate-scale-in',
            maxWidths[maxWidth],
            className
          )}
          {...props}
        >
          {children}
          {/* Rendered after content so initial focus lands on the first meaningful control */}
          {showCloseButton && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-haven-slate-500 hover:text-haven-slate-900 hover:bg-haven-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-blue-700/30 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );

    return createPortal(dialogContent, document.body);
  }
);
DialogContent.displayName = 'DialogContent';

export const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-1.5 pb-4 pr-8', className)} {...props}>
      {children}
    </div>
  );
});
DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  const { titleId } = useDialog();
  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn('text-xl font-semibold text-haven-slate-900 tracking-tight', className)}
      {...props}
    >
      {children}
    </h2>
  );
});
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  const { descriptionId } = useDialog();
  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn('text-sm text-haven-slate-500 leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
});
DialogDescription.displayName = 'DialogDescription';

export const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 pt-4 mt-4 border-t border-haven-border-light',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DialogFooter.displayName = 'DialogFooter';

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogCloseProps
>(({ children, onClick, asChild = false, ...props }, ref) => {
  const { onOpenChange } = useDialog();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        (children as React.ReactElement<{ onClick?: React.MouseEventHandler }>).props.onClick?.(e);
        handleClick(e);
      },
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});
DialogClose.displayName = 'DialogClose';
