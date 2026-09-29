import { cn } from '@/lib/utils';
import { SVGAttributes } from 'react';

/**
 * La hoja partida — símbolo de MANGO.
 *
 * BORRADOR. La forma y los colores están pendientes de rediseño; se aisló acá a
 * propósito para que iterarla sea cambiar un solo archivo. Todo lo que la usa
 * (avatar, pestaña activa, sello, logotipo) la toma de acá.
 */
export function HojaIcon({ className, ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg viewBox="0 0 100 100" aria-hidden="true" className={cn('block', className)} {...props}>
            <path d="M6 94C6 42 42 6 94 6 94 58 58 94 6 94Z" fill="var(--verde)" />
            <path d="M94 6C94 58 58 94 6 94L94 6Z" fill="var(--mango)" />
        </svg>
    );
}
