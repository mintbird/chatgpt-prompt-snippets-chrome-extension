import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva('cps-inline-flex cps-items-center cps-justify-center cps-whitespace-nowrap cps-rounded-md cps-text-sm cps-font-medium cps-ring-offset-white cps-transition-colors focus-visible:cps-outline-none focus-visible:cps-ring-2 focus-visible:cps-ring-slate-950 focus-visible:cps-ring-offset-2 disabled:cps-pointer-events-none disabled:cps-opacity-50 dark:cps-ring-offset-slate-950 dark:focus-visible:cps-ring-slate-300', {
  variants: {
    variant: {
      default: 'cps-bg-slate-900 cps-text-slate-50 hover:cps-bg-slate-900/90 dark:cps-bg-slate-50 dark:cps-text-slate-900 dark:hover:cps-bg-slate-50/90',
      destructive: 'cps-bg-red-500 cps-text-slate-50 hover:cps-bg-red-500/90 dark:cps-bg-red-900 dark:cps-text-slate-50 dark:hover:cps-bg-red-900/90',
      outline: 'cps-border cps-border-slate-200 cps-bg-white hover:cps-bg-slate-100 hover:cps-text-slate-900 dark:cps-border-slate-800 dark:cps-bg-slate-950 dark:hover:cps-bg-slate-800 dark:hover:cps-text-slate-50',
      secondary: 'cps-bg-slate-100 cps-text-slate-900 hover:cps-bg-slate-100/80 dark:cps-bg-slate-800 dark:cps-text-slate-50 dark:hover:cps-bg-slate-800/80',
      ghost: 'hover:cps-bg-slate-100 hover:cps-text-slate-900 dark:hover:cps-bg-slate-800 dark:hover:cps-text-slate-50',
      link: 'cps-text-slate-900 cps-underline-offset-4 hover:cps-underline dark:cps-text-slate-50',
    },
    size: {
      default: 'cps-h-10 cps-px-4 cps-py-2',
      sm: 'cps-h-8 cps-rounded-md cps-px-3',
      lg: 'cps-h-11 cps-rounded-md cps-px-8',
      icon: 'cps-h-10 cps-w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
