import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export type Estado = 'neutra' | 'ok' | 'pronto' | 'vencida' | 'mia';

const ESTADOS: Record<Estado, string> = {
    neutra: 'bg-muted text-tinta-2',
    ok: 'bg-ok-bg text-ok-ink',
    pronto: 'bg-warn-bg text-warn-ink',
    vencida: 'bg-mango-suave text-mango-texto',
    mia: 'bg-mia-bg text-mia-ink',
};

/**
 * EstadoBadge de lino: trama cruzada y sombra interior, para que se lea cosida a la
 * tarjeta y no apoyada encima. Es lo único que comunica estado; la pertenencia
 * la dice el avatar.
 */
export function EstadoBadge({
    estado = 'neutra',
    punto = false,
    children,
    className,
}: {
    estado?: Estado;
    punto?: boolean;
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-[0.02em]',
                'shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)]',
                ESTADOS[estado],
                className,
            )}
        >
            {punto && <i className="block size-[7px] shrink-0 rounded-[2px] bg-current" />}
            {children}
        </span>
    );
}
