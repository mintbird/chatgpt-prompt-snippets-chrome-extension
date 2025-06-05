import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'cps-flex cps-min-h-[80px] cps-w-full cps-rounded-md cps-border cps-border-slate-200 cps-bg-white cps-px-3 cps-py-2 cps-text-sm cps-ring-offset-white cps-placeholder:text-slate-500 focus-visible:cps-outline-none focus-visible:cps-ring-2 focus-visible:cps-ring-slate-950 focus-visible:cps-ring-offset-2 disabled:cps-cursor-not-allowed disabled:cps-opacity-50 dark:cps-border-slate-800 dark:cps-bg-slate-950 dark:cps-ring-offset-slate-950 dark:cps-placeholder:text-slate-400 dark:focus-visible:cps-ring-slate-300',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
