import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/**
 * Lista de filas separadas por línea punteada. Es el patrón de fila de MANGO:
 * tareas, pagos, movimientos. La punteada separa sin dibujar una tabla.
 */
export function FilasList({ children, className }: { children: ReactNode; className?: string }) {
    return <ul className={cn('flex flex-col', className)}>{children}</ul>;
}
