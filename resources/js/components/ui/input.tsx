import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                'flex h-11 w-full rounded-lg border-[1.5px] border-input bg-background px-3 py-2 text-base text-foreground',
                'shadow-[inset_0_2px_4px_rgb(0_0_0/0.07)] transition-colors duration-150 ease-out',
                'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
                'placeholder:text-tinta-3 focus-visible:border-mango-texto focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden',
                'aria-invalid:border-mango-texto aria-invalid:bg-mango-suave',
                'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export { Input };
