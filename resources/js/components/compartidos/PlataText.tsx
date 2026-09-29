import { cn } from '@/lib/utils';

const PESOS = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
});

export function formatearPesos(monto: number): string {
    return PESOS.format(monto);
}

type Tono = 'neutro' | 'ingreso' | 'egreso';

const TONOS: Record<Tono, string> = {
    neutro: 'text-foreground',
    ingreso: 'text-verde-dato',
    egreso: 'text-mango-texto',
};

/**
 * Todo monto pasa por acá. Dos razones: `tabular-nums` para que las columnas
 * de plata se alineen, y una sola regla de tono — el estilo toca el marco,
 * nunca el número, así que el color sólo distingue entrada de salida.
 */
export function PlataText({
    monto,
    tono = 'neutro',
    grande = false,
    className,
}: {
    monto: number;
    tono?: Tono;
    grande?: boolean;
    className?: string;
}) {
    return (
        <span
            data-money
            className={cn(
                'font-semibold tabular-nums',
                grande && 'font-display text-4xl leading-none font-bold tracking-[-0.035em]',
                TONOS[tono],
                className,
            )}
        >
            {formatearPesos(monto)}
        </span>
    );
}
