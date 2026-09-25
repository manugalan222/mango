import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-[transform,box-shadow,filter,background-color,color] duration-150 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                // Primario. Pastilla de tinta y sombra dura, se levanta al pasar el mouse.
                default: 'mat-pegatina mat-pegatina-mango rounded-full',
                almohadon: 'mat-pegatina mat-pegatina-mango rounded-full',
                // Secundario. Mismo trato, relleno verde.
                pana: 'mat-pegatina mat-pegatina-verde rounded-full',
                // Alternativa al primario, guardada: relleno papel.
                ceramica: 'mat-pegatina mat-pegatina-lino rounded-full',
                outline: 'rounded-lg border-[1.5px] border-input bg-transparent text-foreground hover:border-mango-texto hover:bg-accent hover:text-accent-foreground',
                ghost: 'rounded-lg text-mango-texto hover:bg-accent',
                destructive: 'rounded-lg bg-destructive text-destructive-foreground hover:brightness-110',
                link: 'text-mango-texto underline-offset-4 hover:underline',
                // Conservados por compatibilidad con el starter kit.
                secondary: 'mat-pegatina mat-pegatina-verde rounded-full',
            },
            size: {
                default: 'h-11 px-[1.25rem] py-2',
                sm: 'h-9 px-3.5 text-[0.8125rem]',
                lg: 'h-12 px-8 text-base',
                icon: 'size-11',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
