import { EstadoBadge } from '@/components/compartidos/EstadoBadge';
import { FilaItem } from '@/components/compartidos/FilaItem';
import { FilasList } from '@/components/compartidos/FilasList';
import { TareaRow } from '@/components/hogar/TareaRow';
import { AnotadorCard } from '@/components/papel/AnotadorCard';
import { CONVIVIENTES, type TareaMuestra } from '@/lib/muestra';
import { useState } from 'react';

/**
 * Hogar → Tareas: dos anotadores, por hacer y hechas. Marcar una tarea la pasa
 * de uno al otro: la lista de pendientes se achica a la vista, que es lo que
 * se siente como avanzar.
 */
export function TareasTab({ tareas: iniciales }: { tareas: TareaMuestra[] }) {
    const [tareas, setTareas] = useState(iniciales);
    const alternar = (id: number) => setTareas((ts) => ts.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
    const pendientes = tareas.filter((t) => !t.hecha);
    const hechas = tareas.filter((t) => t.hecha);

    const fila = (t: TareaMuestra) => (
        <FilaItem key={t.id} className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
                <TareaRow
                    texto={t.texto}
                    hecha={t.hecha}
                    quien={CONVIVIENTES[t.quien].nombre}
                    color={CONVIVIENTES[t.quien].color}
                    onToggle={() => alternar(t.id)}
                />
            </div>
            {!t.hecha && (
                <EstadoBadge estado={t.estado} punto className="w-20 shrink-0 justify-center">
                    {t.cuando}
                </EstadoBadge>
            )}
        </FilaItem>
    );

    return (
        <div className="grid items-start gap-8 pt-3 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <AnotadorCard
                titulo="Por hacer"
                sujecion="espiral"
                giro={-0.6}
                accion={<span className="text-tinta-2 text-sm tabular-nums">{pendientes.length} pendientes</span>}
            >
                {pendientes.length > 0 ? (
                    <FilasList>{pendientes.map(fila)}</FilasList>
                ) : (
                    <p className="text-tinta-2 py-4 text-sm">No queda nada por hacer esta semana.</p>
                )}
            </AnotadorCard>

            <AnotadorCard
                titulo="Hechas"
                giro={1}
                className="md:mt-6"
                accion={
                    <span className="text-tinta-2 text-sm tabular-nums">
                        {hechas.length} de {tareas.length}
                    </span>
                }
            >
                {hechas.length > 0 ? <FilasList>{hechas.map(fila)}</FilasList> : <p className="text-tinta-2 py-4 text-sm">Todavía nada tachado.</p>}
            </AnotadorCard>
        </div>
    );
}
