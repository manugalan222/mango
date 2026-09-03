import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-[transform,box-shadow,filter,background-color,color] duration-150 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                // Primario. Tejido de nudo, costura y punto de presión.
                default: 'mat-almohadon hunde rounded-almohadon hover:brightness-105',
                almohadon: 'mat-almohadon hunde rounded-almohadon hover:brightness-105',
                // Secundario. La pana del sillón: cede menos y vuelve antes.
                pana: 'mat-pana hunde hunde-pana rounded-almohadon hover:brightness-110',
                // Alternativa al primario, guardada: menos volumen, vidriado de torno.
                ceramica: 'mat-ceramica rounded-lg hover:brightness-105 active:translate-y-px',
                outline: 'rounded-lg border-[1.5px] border-input bg-transparent text-foreground hover:border-mango-texto hover:bg-accent hover:text-accent-foreground',
                ghost: 'rounded-lg text-mango-texto hover:bg-accent',
                destructive: 'rounded-lg bg-destructive text-destructive-foreground hover:brightness-110',
                link: 'text-mango-texto underline-offset-4 hover:underline',
                // Conservados por compatibilidad con el starter kit.
                secondary: 'mat-pana hunde hunde-pana rounded-almohadon hover:brightness-110',
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

/** Variantes cuyo hundimiento sigue al puntero. */
const SIGUE_AL_DEDO = new Set(['default', 'almohadon', 'pana', 'secondary']);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, onPointerDown, onKeyDown, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        const hunde = SIGUE_AL_DEDO.has(variant ?? 'default');

        // Se escribe una sola vez por pulsación: mover el gradiente repinta, así que
        // seguir el puntero cuadro a cuadro sacaría el efecto del compositor.
        // Después sólo se anima `opacity`.
        const marcarPunto = React.useCallback(
            (event: React.PointerEvent<HTMLButtonElement>) => {
                if (hunde) {
                    const caja = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty('--px', `${(event.clientX - caja.left).toFixed(1)}px`);
                    event.currentTarget.style.setProperty('--py', `${(event.clientY - caja.top).toFixed(1)}px`);
                }
                onPointerDown?.(event);
            },
            [hunde, onPointerDown],
        );

        // Con teclado no hay coordenada: el hundimiento cae en el centro, que ahí es lo correcto.
        const centrarPunto = React.useCallback(
            (event: React.KeyboardEvent<HTMLButtonElement>) => {
                if (hunde && (event.key === ' ' || event.key === 'Enter')) {
                    event.currentTarget.style.removeProperty('--px');
                    event.currentTarget.style.removeProperty('--py');
                }
                onKeyDown?.(event);
            },
            [hunde, onKeyDown],
        );

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                onPointerDown={marcarPunto}
                onKeyDown={centrarPunto}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
