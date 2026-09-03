import { EstadoBadge, type Estado } from './EstadoBadge';
import { FilaItem } from './FilaItem';
import { PlataText } from './PlataText';

/**
 * Pago próximo. La fecha va en ancho fijo y tabular para que la columna se
 * alinee aunque los meses tengan largos distintos.
 */
export function PagoRow({ fecha, nombre, monto, estado, cuando }: { fecha: string; nombre: string; monto: number; estado: Estado; cuando: string }) {
    return (
        <FilaItem className="flex items-center gap-3 py-2.5 text-sm">
            <span className="text-tinta-2 w-14 shrink-0 text-[0.7rem] font-bold tracking-wider uppercase tabular-nums">{fecha}</span>
            <span>{nombre}</span>
            <EstadoBadge estado={estado} punto>
                {cuando}
            </EstadoBadge>
            <PlataText monto={monto} className="ml-auto" />
        </FilaItem>
    );
}
