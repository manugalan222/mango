import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/**
 * El panel es un muro de galería: seis columnas y sólo tres anchos de cuadro.
 * Limitar los anchos es lo que hace que un muro desordenado se lea ordenado.
 */
export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('grid grid-cols-1 items-start gap-4 md:grid-cols-6', className)}>{children}</div>;
}
