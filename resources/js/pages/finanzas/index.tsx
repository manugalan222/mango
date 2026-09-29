import { AnotadorCard } from '@/components/mango/AnotadorCard';
import { CategoriasChart } from '@/components/mango/CategoriasChart';
import { DeudaRow } from '@/components/mango/DeudaRow';
import { EstadoBadge } from '@/components/mango/EstadoBadge';
import { FilaItem } from '@/components/mango/FilaItem';
import { FilasList } from '@/components/mango/FilasList';
import { MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { PlataText } from '@/components/mango/PlataText';
import { ProgresoMeter } from '@/components/mango/ProgresoMeter';
import { Pestana, SeccionTabs } from '@/components/mango/SeccionTabs';
import { SelloBadge } from '@/components/mango/SelloBadge';
import AppLayout from '@/layouts/app-layout';
import { AHORROS, BALANCE_MES, CONVIVIENTES, DEUDAS, GASTOS, GASTOS_POR_CATEGORIA } from '@/lib/muestra';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

// MUESTRA: todo lo que se ve sale de `lib/muestra.ts`, datos inventados.

const totalDeudas = DEUDAS.reduce((s, d) => s + d.monto, 0);

const pestanas: Pestana[] = [
    {
        valor: 'gastos',
        titulo: 'Gastos',
        contenido: (
            <div className="grid items-start gap-8 pt-3 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <AnotadorCard titulo="Septiembre" sujecion="espiral" giro={-0.8}>
                    <div className="flex flex-col gap-1">
                        <PlataText monto={BALANCE_MES.gastos} tono="egreso" grande />
                        <p className="text-tinta-2 text-sm">gastados entre los cuatro</p>
                    </div>
                    <CategoriasChart categorias={GASTOS_POR_CATEGORIA} />
                </AnotadorCard>

                <AnotadorCard titulo="Últimos movimientos" giro={0.5}>
                    <FilasList>
                        {GASTOS.map((g) => (
                            <FilaItem key={g.id} className="flex items-center gap-3 py-2.5 text-sm">
                                <span className="text-tinta-2 w-14 shrink-0 text-[0.7rem] font-bold tracking-wider uppercase tabular-nums">
                                    {g.fecha}
                                </span>
                                <MiembroAvatar nombre={CONVIVIENTES[g.quien].nombre} color={CONVIVIENTES[g.quien].color} mini />
                                <span className="min-w-0 flex-1 truncate">{g.descripcion}</span>
                                <EstadoBadge className="hidden sm:inline-flex">{g.categoria}</EstadoBadge>
                                <PlataText monto={g.monto} tono="egreso" />
                            </FilaItem>
                        ))}
                    </FilasList>
                </AnotadorCard>
            </div>
        ),
    },
    {
        valor: 'deudas',
        titulo: 'Deudas',
        contenido: (
            <div className="grid items-start gap-8 pt-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                {/* Nota adhesiva: sólo texto neutro sobre el pastel. */}
                <AnotadorCard tono="mango" giro={-1.6} className="md:mt-4">
                    <p className="text-tinta-2 text-sm">Quedan por saldar</p>
                    <PlataText monto={totalDeudas} grande />
                    <p className="text-tinta-2 text-sm">entre {DEUDAS.length} cuentas abiertas.</p>
                </AnotadorCard>

                <AnotadorCard titulo="Quién le debe a quién" giro={0.6}>
                    <ul className="flex flex-col gap-2">
                        {DEUDAS.map((d) => (
                            <DeudaRow
                                key={d.id}
                                texto={d.texto}
                                monto={d.monto}
                                quien={CONVIVIENTES[d.quien].nombre}
                                color={CONVIVIENTES[d.quien].color}
                            />
                        ))}
                    </ul>
                </AnotadorCard>
            </div>
        ),
    },
    {
        valor: 'ahorros',
        titulo: 'Ahorros',
        contenido: (
            <ul className="grid items-start gap-8 pt-3 sm:grid-cols-2 lg:grid-cols-3">
                {AHORROS.map((a, i) => {
                    const casi = a.ahorrado / a.meta >= 0.9;
                    return (
                        <li key={a.id}>
                            <AnotadorCard
                                titulo={a.nombre}
                                giro={[-1, 0.8, -0.4][i % 3]}
                                accion={<span className="text-tinta-2 shrink-0 text-xs">{a.fecha}</span>}
                            >
                                <PlataText monto={a.ahorrado} grande />
                                <ProgresoMeter parte={a.ahorrado} total={a.meta} />
                                <p className="text-tinta-2 text-sm">
                                    de <PlataText monto={a.meta} /> · faltan <PlataText monto={a.meta - a.ahorrado} />
                                </p>
                                {casi && <SelloBadge className="self-start">¡Casi llegamos!</SelloBadge>}
                            </AnotadorCard>
                        </li>
                    );
                })}
            </ul>
        ),
    },
];

export default function FinanzasIndex() {
    return (
        <>
            <Head title="Finanzas" />
            <div className="flex flex-1 flex-col p-4 pt-6 md:p-6 md:pt-8">
                <SeccionTabs titulo="Finanzas" descripcion="Gastos, deudas entre convivientes y metas de ahorro de la casa." pestanas={pestanas} />
            </div>
        </>
    );
}

FinanzasIndex.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
