import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * Estado vacío: todavía no hay datos reales y no se los inventa. Un ícono,
 * qué falta y, cuando existe, la acción para cargarlo. `oscuro` la pasa a
 * texto de panel, para cuando vive dentro de una `PanelCard oscura`.
 */
export function EstadoVacio({
    icon: Icon,
    titulo,
    descripcion,
    accion,
    oscuro = false,
    className,
}: {
    icon: LucideIcon;
    titulo: string;
    descripcion: string;
    accion?: ReactNode;
    oscuro?: boolean;
    className?: string;
}) {
    return (
        <div className={cn('flex flex-col items-center gap-2 py-8 text-center', className)}>
            <span
                aria-hidden
                className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-full',
                    oscuro ? 'bg-panel-ink/10 text-panel-ink' : 'bg-muted text-tinta-3',
                )}
            >
                <Icon className="size-5" />
            </span>
            <p className={cn('font-display text-base font-bold', oscuro && 'text-panel-ink')}>{titulo}</p>
            <p className={cn('max-w-xs text-sm', oscuro ? 'text-panel-ink/70' : 'text-tinta-2')}>{descripcion}</p>
            {accion}
        </div>
    );
}
