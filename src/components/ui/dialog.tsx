import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn('cps-fixed cps-inset-0 cps-z-50 cps-bg-white/80 cps-backdrop-blur-sm data-[state=open]:cps-animate-in data-[state=closed]:cps-animate-out data-[state=closed]:cps-fade-out-0 data-[state=open]:cps-fade-in-0 dark:cps-bg-slate-950/80', className)} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'cps-fixed cps-left-[50%] cps-top-[50%] cps-z-50 cps-grid cps-w-full cps-max-w-lg cps-translate-x-[-50%] cps-translate-y-[-50%] cps-gap-4 cps-border cps-border-slate-200 cps-bg-white cps-p-6 cps-shadow-lg cps-duration-200 data-[state=open]:cps-animate-in data-[state=closed]:cps-animate-out data-[state=closed]:cps-fade-out-0 data-[state=open]:cps-fade-in-0 data-[state=closed]:cps-zoom-out-95 data-[state=open]:cps-zoom-in-95 data-[state=closed]:cps-slide-out-to-left-1/2 data-[state=closed]:cps-slide-out-to-top-[48%] data-[state=open]:cps-slide-in-from-left-1/2 data-[state=open]:cps-slide-in-from-top-[48%] sm:cps-rounded-lg md:cps-w-full dark:cps-border-slate-800 dark:cps-bg-slate-950',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="cps-absolute cps-right-4 cps-top-4 cps-rounded-sm cps-opacity-70 cps-ring-offset-white cps-transition-opacity hover:cps-opacity-100 focus:cps-outline-none focus:cps-ring-2 focus:cps-ring-slate-950 focus:cps-ring-offset-2 disabled:cps-pointer-events-none data-[state=open]:cps-bg-slate-100 data-[state=open]:cps-text-slate-500 dark:cps-ring-offset-slate-950 dark:focus:cps-ring-slate-300 dark:data-[state=open]:cps-bg-slate-800 dark:data-[state=open]:cps-text-slate-400">
        <X className="cps-h-4 cps-w-4" />
        <span className="cps-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('cps-flex cps-flex-col cps-space-y-1.5 cps-text-center sm:cps-text-left', className)} {...props} />;
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('cps-flex cps-flex-col-reverse sm:cps-flex-row sm:cps-justify-end sm:cps-space-x-2', className)} {...props} />;
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn('cps-text-lg cps-font-semibold cps-leading-none cps-tracking-tight', className)} {...props} />);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({ className, ...props }, ref) => <DialogPrimitive.Description ref={ref} className={cn('cps-text-sm cps-text-slate-500 dark:cps-text-slate-400', className)} {...props} />);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
