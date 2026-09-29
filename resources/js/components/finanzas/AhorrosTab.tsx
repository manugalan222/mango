import { AhorroCard } from '@/components/finanzas/AhorroCard';
import { type AhorroMuestra } from '@/lib/muestra';

/** Alternar el giro entre vecinos evita que el muro de anotadores se vea impreso. */
const GIROS = [-1, 0.8, -0.4];

/** Finanzas → Ahorros: una meta por anotador. */
export function AhorrosTab({ ahorros }: { ahorros: AhorroMuestra[] }) {
    return (
        <ul className="grid items-start gap-8 pt-3 sm:grid-cols-2 lg:grid-cols-3">
            {ahorros.map((a, i) => (
                <li key={a.id}>
                    <AhorroCard ahorro={a} giro={GIROS[i % GIROS.length]} />
                </li>
            ))}
        </ul>
    );
}
