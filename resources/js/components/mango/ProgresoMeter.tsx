import { cn } from '@/lib/utils';
import { formatearPesos } from './PlataText';

/** ProgresoMeter de una sola serie. La etiqueta va siempre, nunca sólo el color. */
export function ProgresoMeter({ parte, total, className }: { parte: number; total: number; className?: string }) {
    const pct = total > 0 ? Math.min(100, Math.max(0, (parte / total) * 100)) : 0;

    return (
        <div
            className={cn('bg-border h-2.5 w-full overflow-hidden rounded-full', className)}
            role="meter"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${formatearPesos(parte)} de ${formatearPesos(total)}`}
        >
            <div className="bg-mango h-full rounded-full" style={{ width: `${pct}%` }} />
        </div>
    );
}
