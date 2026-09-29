import { FilasList } from '@/components/compartidos/FilasList';
import { PlataText } from '@/components/compartidos/PlataText';
import { CategoriasChart, type Categoria } from '@/components/finanzas/CategoriasChart';
import { GastoRow } from '@/components/finanzas/GastoRow';
import { AnotadorCard } from '@/components/papel/AnotadorCard';
import { CONVIVIENTES, type GastoMuestra } from '@/lib/muestra';

interface GastosTabProps {
    mes: string;
    total: number;
    categorias: Categoria[];
    gastos: GastoMuestra[];
}

/** Finanzas → Gastos: el total del mes por categoría (el anotador con espiral) y los últimos movimientos. */
export function GastosTab({ mes, total, categorias, gastos }: GastosTabProps) {
    return (
        <div className="grid items-start gap-8 pt-3 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <AnotadorCard titulo={mes} sujecion="espiral" giro={-0.8}>
                <div className="flex flex-col gap-1">
                    <PlataText monto={total} tono="egreso" grande />
                    <p className="text-tinta-2 text-sm">gastados entre los cuatro</p>
                </div>
                <CategoriasChart categorias={categorias} />
            </AnotadorCard>

            <AnotadorCard titulo="Últimos movimientos" giro={0.5}>
                <FilasList>
                    {gastos.map((g) => (
                        <GastoRow
                            key={g.id}
                            fecha={g.fecha}
                            descripcion={g.descripcion}
                            categoria={g.categoria}
                            monto={g.monto}
                            quien={CONVIVIENTES[g.quien]}
                        />
                    ))}
                </FilasList>
            </AnotadorCard>
        </div>
    );
}
