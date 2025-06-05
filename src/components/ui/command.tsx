import { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import * as React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Command = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, React.ComponentPropsWithoutRef<typeof CommandPrimitive>>(({ className, ...props }, ref) => <CommandPrimitive ref={ref} className={cn('cps-flex cps-h-full cps-w-full cps-flex-col cps-overflow-hidden cps-rounded-md cps-bg-white cps-text-slate-950 dark:cps-bg-slate-950 dark:cps-text-slate-50', className)} {...props} />);
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="cps-overflow-hidden cps-p-0 cps-shadow-lg md:cps-max-w-2xl cps-border-gray-200 dark:cps-border-gray-700">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Configure your snippet settings below.</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <Command className="[&_[cmdk-group-heading]]:cps-px-2 [&_[cmdk-group-heading]]:cps-font-medium [&_[cmdk-group-heading]]:cps-text-slate-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:cps-pt-0 [&_[cmdk-group]]:cps-px-2 [&_[cmdk-input-wrapper]_svg]:cps-h-5 [&_[cmdk-input-wrapper]_svg]:cps-w-5 [&_[cmdk-input]]:cps-h-12 [&_[cmdk-item]]:cps-px-2 [&_[cmdk-item]]:cps-py-3 [&_[cmdk-item]_svg]:cps-h-5 [&_[cmdk-item]_svg]:cps-w-5 dark:[&_[cmdk-group-heading]]:cps-text-slate-400">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Input>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>(({ className, ...props }, ref) => (
  <div className="cps-flex cps-items-center cps-border-b cps-px-3 cps-border-gray-200 dark:cps-border-gray-700" cmdk-input-wrapper="">
    <Search className="cps-mr-2 cps-h-4 cps-w-4 cps-shrink-0 cps-opacity-50" />
    <CommandPrimitive.Input ref={ref} className={cn('cps-flex cps-h-11 cps-w-full cps-rounded-md cps-bg-transparent cps-py-3 cps-text-sm cps-outline-none placeholder:cps-text-slate-500 disabled:cps-cursor-not-allowed disabled:cps-opacity-50 dark:placeholder:cps-text-slate-400', className)} {...props} />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<React.ElementRef<typeof CommandPrimitive.List>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>>(({ className, ...props }, ref) => <CommandPrimitive.List ref={ref} className={cn('cps-max-h-[300px] cps-overflow-y-auto cps-overflow-x-hidden', className)} {...props} />);
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Empty>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>((props, ref) => <CommandPrimitive.Empty ref={ref} className="cps-py-6 cps-text-center cps-text-sm" {...props} />);
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Group>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group ref={ref} className={cn('cps-overflow-hidden cps-p-1 cps-text-slate-950 [&_[cmdk-group-heading]]:cps-px-2 [&_[cmdk-group-heading]]:cps-py-1.5 [&_[cmdk-group-heading]]:cps-text-xs [&_[cmdk-group-heading]]:cps-font-medium [&_[cmdk-group-heading]]:cps-text-slate-500 dark:cps-text-slate-50 dark:[&_[cmdk-group-heading]]:cps-text-slate-400', className)} {...props} />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>>(({ className, ...props }, ref) => <CommandPrimitive.Separator ref={ref} className={cn('cps--mx-1 cps-h-px cps-bg-slate-200 dark:cps-bg-slate-800', className)} {...props} />);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Item>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item ref={ref} className={cn('cps-relative cps-flex cps-cursor-default cps-select-none cps-items-center cps-rounded-sm cps-px-2 cps-py-1.5 cps-text-sm cps-outline-none aria-selected:cps-bg-slate-100 aria-selected:cps-text-slate-900 data-[disabled]:cps-pointer-events-none data-[disabled]:cps-opacity-50 dark:aria-selected:cps-bg-slate-800 dark:aria-selected:cps-text-slate-50', className)} {...props} />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn('cps-ml-auto cps-text-xs cps-tracking-widest cps-text-slate-500 dark:cps-text-slate-400', className)} {...props} />;
};
CommandShortcut.displayName = 'CommandShortcut';

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator };
