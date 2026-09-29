import { AnotadorCard, TONO_DE_MIEMBRO } from '@/components/mango/AnotadorCard';
import { EstadoBadge } from '@/components/mango/EstadoBadge';
import { FilaItem } from '@/components/mango/FilaItem';
import { FilasList } from '@/components/mango/FilasList';
import { MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { Pestana, SeccionTabs } from '@/components/mango/SeccionTabs';
import { TareaRow } from '@/components/mango/TareaRow';
import AppLayout from '@/layouts/app-layout';
import { CONVIVIENTES, NOTAS, TAREAS, type TareaMuestra } from '@/lib/muestra';
import { Head } from '@inertiajs/react';
import { type ReactNode, useState } from 'react';

// MUESTRA: todo lo que se ve sale de `lib/muestra.ts`, datos inventados.

function TareasMuestra() {
    const [tareas, setTareas] = useState(TAREAS);
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

    // Marcar una tarea la pasa de un anotador al otro: la lista de pendientes
    // se achica a la vista, que es lo que se siente como avanzar.
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

const GIROS_NOTA = [-1.8, 1.2, -0.6, 1.6, -1.2, 0.8];

const pestanas: Pestana[] = [
    {
        valor: 'tareas',
        titulo: 'Tareas',
        contenido: <TareasMuestra />,
    },
    {
        valor: 'notas',
        titulo: 'Notas',
        contenido: (
            // Notas adhesivas del color de quien las escribió: se sabe de quién es
            // antes de leer la firma. Sobre el pastel, sólo texto neutro.
            <ul className="grid items-start gap-x-6 gap-y-9 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                {NOTAS.map((n, i) => {
                    const autor = CONVIVIENTES[n.quien];
                    return (
                        <li key={n.id}>
                            <AnotadorCard tono={TONO_DE_MIEMBRO[autor.color]} giro={GIROS_NOTA[i % GIROS_NOTA.length]} className="min-h-40">
                                <p className="font-display flex-1 text-lg leading-snug font-semibold tracking-[-0.01em]">{n.texto}</p>
                                <footer className="flex items-center gap-2 text-sm">
                                    <MiembroAvatar nombre={autor.nombre} color={autor.color} mini />
                                    <span className="font-bold">{autor.nombre}</span>
                                    <span className="text-tinta-2 ml-auto">{n.cuando}</span>
                                </footer>
                            </AnotadorCard>
                        </li>
                    );
                })}
            </ul>
        ),
    },
];

export default function HogarIndex() {
    return (
        <>
            <Head title="Hogar" />
            <div className="flex flex-1 flex-col p-4 pt-6 md:p-6 md:pt-8">
                <SeccionTabs titulo="Hogar" descripcion="Quehaceres y notas compartidas de la casa." pestanas={pestanas} />
            </div>
        </>
    );
}

HogarIndex.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
