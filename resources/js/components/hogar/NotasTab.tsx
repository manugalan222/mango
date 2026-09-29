import { NotaCard } from '@/components/hogar/NotaCard';
import { CONVIVIENTES, type NotaMuestra } from '@/lib/muestra';

const GIROS = [-1.8, 1.2, -0.6, 1.6, -1.2, 0.8];

/** Hogar → Notas: las notas adhesivas de la casa, tiradas sobre la hoja. */
export function NotasTab({ notas }: { notas: NotaMuestra[] }) {
    return (
        <ul className="grid items-start gap-x-6 gap-y-9 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {notas.map((n, i) => (
                <li key={n.id}>
                    <NotaCard texto={n.texto} cuando={n.cuando} autor={CONVIVIENTES[n.quien]} giro={GIROS[i % GIROS.length]} />
                </li>
            ))}
        </ul>
    );
}
