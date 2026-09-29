import { BentoGrid } from '@/components/mango/BentoGrid';
import { CategoriasChart } from '@/components/mango/CategoriasChart';
import { DeudaRow } from '@/components/mango/DeudaRow';
import { FilaItem } from '@/components/mango/FilaItem';
import { FilasList } from '@/components/mango/FilasList';
import { MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { PagoRow } from '@/components/mango/PagoRow';
import { PanelCard } from '@/components/mango/PanelCard';
import { PlataText } from '@/components/mango/PlataText';
import { ProgresoMeter } from '@/components/mango/ProgresoMeter';
import { RachaMeter } from '@/components/mango/RachaMeter';
import { TareaRow } from '@/components/mango/TareaRow';
import AppLayout from '@/layouts/app-layout';
import { AHORROS, BALANCE_MES, CONVIVIENTES, DEUDAS, GASTOS_POR_CATEGORIA, RACHA, TAREAS, VENCIMIENTOS } from '@/lib/muestra';
import { Head } from '@inertiajs/react';
import { type ReactNode, useState } from 'react';

/**
 * Resumen de la casa: tareas pendientes, cumplimiento de la semana y
 * finanzas, todo junto —sin pestañas—, tal como pidió Manu. Un muro de hojas
 * chicas sobre el fondo de la casa, del mismo papel que la hoja de Finanzas y Hogar.
 *
 * MUESTRA: todo lo que se ve sale de `lib/muestra.ts`, datos inventados para
 * ver la web armada mientras no exista el modelo de tareas y gastos.
 */
export default function Dashboard() {
    const [tareas, setTareas] = useState(() => TAREAS.slice(0, 5));
    const alternar = (id: number) => setTareas((ts) => ts.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
    const pendientes = tareas.filter((t) => !t.hecha).length;
    const meta = AHORROS[0];

    return (
        <>
            <Head title="Inicio" />
            <div className="flex flex-1 flex-col gap-5 p-4 pt-6 md:p-6 md:pt-8">
                {/* Suelto sobre el fondo: `fondo-tinta` (tinta de día, panel-ink de noche). */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-fondo-tinta text-3xl md:text-4xl">Hola, casa</h1>
                        <p className="text-fondo-tinta/80 text-sm">Así viene el resumen de la semana.</p>
                    </div>

                    <div className="flex -space-x-2">
                        {Object.values(CONVIVIENTES).map((c) => (
                            <MiembroAvatar key={c.nombre} nombre={c.nombre} color={c.color} className="ring-fondo ring-2" />
                        ))}
                    </div>
                </div>

                <BentoGrid className="gap-5">
                    <PanelCard
                        titulo="Tareas pendientes"
                        ancho={4}
                        accion={<span className="text-tinta-2 text-sm tabular-nums">{pendientes} por hacer</span>}
                    >
                        <FilasList>
                            {tareas.map((t) => (
                                <FilaItem key={t.id}>
                                    <TareaRow
                                        texto={t.texto}
                                        hecha={t.hecha}
                                        quien={CONVIVIENTES[t.quien].nombre}
                                        color={CONVIVIENTES[t.quien].color}
                                        onToggle={() => alternar(t.id)}
                                    />
                                </FilaItem>
                            ))}
                        </FilasList>
                    </PanelCard>

                    <PanelCard titulo="Cumplimiento" ancho={2} oscura textura="liso">
                        <RachaMeter semanas={RACHA.semanas} total={RACHA.total} />
                    </PanelCard>

                    <PanelCard titulo="Balance del mes" ancho={3}>
                        <div className="flex flex-col gap-1">
                            <PlataText monto={BALANCE_MES.ingresos - BALANCE_MES.gastos} grande />
                            <p className="text-tinta-2 text-sm">
                                Entraron <PlataText monto={BALANCE_MES.ingresos} tono="ingreso" /> y salieron{' '}
                                <PlataText monto={BALANCE_MES.gastos} tono="egreso" />.
                            </p>
                        </div>
                        <CategoriasChart categorias={GASTOS_POR_CATEGORIA} />
                    </PanelCard>

                    <PanelCard titulo="Próximos vencimientos" ancho={3}>
                        <FilasList>
                            {VENCIMIENTOS.map((p) => (
                                <PagoRow key={p.id} fecha={p.fecha} nombre={p.nombre} monto={p.monto} estado={p.estado} cuando={p.cuando} />
                            ))}
                        </FilasList>
                    </PanelCard>

                    <PanelCard titulo="Cuentas entre convivientes" ancho={3} textura="liso">
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
                    </PanelCard>

                    <PanelCard titulo="Ahorro de la casa" ancho={3} textura="liso">
                        <div className="flex flex-col gap-2">
                            <p className="font-display text-lg font-bold">{meta.nombre}</p>
                            <ProgresoMeter parte={meta.ahorrado} total={meta.meta} />
                            <p className="text-tinta-2 text-sm">
                                <PlataText monto={meta.ahorrado} /> de <PlataText monto={meta.meta} /> · {meta.fecha.toLowerCase()}
                            </p>
                        </div>
                    </PanelCard>
                </BentoGrid>
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
