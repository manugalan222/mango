import { PlataText } from '@/components/compartidos/PlataText';
import { ProgresoMeter } from '@/components/compartidos/ProgresoMeter';
import { SelloBadge } from '@/components/compartidos/SelloBadge';
import { AnotadorCard } from '@/components/papel/AnotadorCard';
import { type AhorroMuestra } from '@/lib/muestra';

/**
 * Una meta de ahorro en su anotador. Al pasar el 90% lleva el sello: el
 * único logro de la pestaña, así que no aparece siempre.
 */
export function AhorroCard({ ahorro, giro }: { ahorro: AhorroMuestra; giro: number }) {
    const casi = ahorro.ahorrado / ahorro.meta >= 0.9;

    return (
        <AnotadorCard titulo={ahorro.nombre} giro={giro} accion={<span className="text-tinta-2 shrink-0 text-xs">{ahorro.fecha}</span>}>
            <PlataText monto={ahorro.ahorrado} grande />
            <ProgresoMeter parte={ahorro.ahorrado} total={ahorro.meta} />
            <p className="text-tinta-2 text-sm">
                de <PlataText monto={ahorro.meta} /> · faltan <PlataText monto={ahorro.meta - ahorro.ahorrado} />
            </p>
            {casi && <SelloBadge className="self-start">¡Casi llegamos!</SelloBadge>}
        </AnotadorCard>
    );
}
