import { DeudaRow } from '@/components/finanzas/DeudaRow';
import { CONVIVIENTES, type DeudaMuestra } from '@/lib/muestra';

/** Quién le debe a quién: la misma lista en el dashboard y en Finanzas → Deudas. */
export function DeudasList({ deudas }: { deudas: DeudaMuestra[] }) {
    return (
        <ul className="flex flex-col gap-2">
            {deudas.map((d) => (
                <DeudaRow key={d.id} texto={d.texto} monto={d.monto} quien={CONVIVIENTES[d.quien].nombre} color={CONVIVIENTES[d.quien].color} />
            ))}
        </ul>
    );
}
