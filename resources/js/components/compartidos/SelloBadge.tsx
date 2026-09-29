import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/** Sello: usa la forma de hoja. Sólo para logro, nunca para estado corriente. */
export function SelloBadge({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={cn(
                'rounded-hoja text-mango-texto inline-flex items-center px-3 py-1 text-xs font-bold',
                'shadow-[inset_0_0_0_1.5px_var(--mango)]',
                className,
            )}
        >
            {children}
        </span>
    );
}
