import { PlataText } from '@/components/compartidos/PlataText';
import { DeudasList } from '@/components/finanzas/DeudasList';
import { AnotadorCard } from '@/components/papel/AnotadorCard';
import { type DeudaMuestra } from '@/lib/muestra';

/** Finanzas → Deudas: lo que queda por saldar, en una nota adhesiva, y el detalle de quién le debe a quién. */
export function DeudasTab({ deudas }: { deudas: DeudaMuestra[] }) {
    const total = deudas.reduce((s, d) => s + d.monto, 0);

    return (
        <div className="grid items-start gap-8 pt-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            {/* Nota adhesiva: sólo texto neutro sobre el pastel. */}
            <AnotadorCard tono="mango" giro={-1.6} className="md:mt-4">
                <p className="text-tinta-2 text-sm">Quedan por saldar</p>
                <PlataText monto={total} grande />
                <p className="text-tinta-2 text-sm">entre {deudas.length} cuentas abiertas.</p>
            </AnotadorCard>

            <AnotadorCard titulo="Quién le debe a quién" giro={0.6}>
                <DeudasList deudas={deudas} />
            </AnotadorCard>
        </div>
    );
}
