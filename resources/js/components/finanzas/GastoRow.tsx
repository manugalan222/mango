import { EstadoBadge } from '@/components/compartidos/EstadoBadge';
import { FilaItem } from '@/components/compartidos/FilaItem';
import { MiembroAvatar } from '@/components/compartidos/MiembroAvatar';
import { PlataText } from '@/components/compartidos/PlataText';
import { type Conviviente } from '@/lib/muestra';

interface GastoRowProps {
    fecha: string;
    descripcion: string;
    categoria: string;
    monto: number;
    quien: Conviviente;
}

/** Un movimiento: fecha tabular, quién pagó (sólo el color), qué fue, la categoría y el monto. */
export function GastoRow({ fecha, descripcion, categoria, monto, quien }: GastoRowProps) {
    return (
        <FilaItem className="flex items-center gap-3 py-2.5 text-sm">
            <span className="text-tinta-2 w-14 shrink-0 text-[0.7rem] font-bold tracking-wider uppercase tabular-nums">{fecha}</span>
            <MiembroAvatar nombre={quien.nombre} color={quien.color} mini />
            <span className="min-w-0 flex-1 truncate">{descripcion}</span>
            <EstadoBadge className="hidden sm:inline-flex">{categoria}</EstadoBadge>
            <PlataText monto={monto} tono="egreso" />
        </FilaItem>
    );
}
