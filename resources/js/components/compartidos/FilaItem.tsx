import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/** Fila de una `FilasList`. La punteada la pone el ítem, no la lista. */
export function FilaItem({ children, className }: { children: ReactNode; className?: string }) {
    return <li className={cn('border-border border-b border-dashed last:border-b-0', className)}>{children}</li>;
}
