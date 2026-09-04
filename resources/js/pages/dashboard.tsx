import { BentoGrid } from '@/components/mango/BentoGrid';
import { Categoria, CategoriasChart } from '@/components/mango/CategoriasChart';
import { DeudaRow } from '@/components/mango/DeudaRow';
import { EstadoBadge } from '@/components/mango/EstadoBadge';
import { FilasList } from '@/components/mango/FilasList';
import { ColorMiembro, MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { PagoRow } from '@/components/mango/PagoRow';
import { PanelCard } from '@/components/mango/PanelCard';
import { PlataText } from '@/components/mango/PlataText';
import { ProgresoMeter } from '@/components/mango/ProgresoMeter';
import { RachaMeter } from '@/components/mango/RachaMeter';
import { SelloBadge } from '@/components/mango/SelloBadge';
import { TareaRow } from '@/components/mango/TareaRow';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Inicio', href: '/dashboard' }];

/**
 * EJEMPLO TEMPORAL — no forma parte del código real. Muestra los componentes
 * de `components/mango/` con datos falsos para verlos armados en pantalla.
 * `dashboard.tsx` vuelve al placeholder después.
 */

const CONVIVIENTES: { nombre: string; color: ColorMiembro }[] = [
    { nombre: 'Manu', color: 'mango' },
    { nombre: 'Cande', color: 'verde' },
    { nombre: 'Tomi', color: 'ambar' },
    { nombre: 'Sofi', color: 'ciruela' },
    { nombre: 'Guille', color: 'arcilla' },
];

const TAREAS_INICIALES = [
    { id: 1, texto: 'Sacar la basura', hecha: true, quien: 'Manu', color: 'mango' as ColorMiembro },
    { id: 2, texto: 'Comprar papel higiénico', hecha: false, quien: 'Cande', color: 'verde' as ColorMiembro },
    { id: 3, texto: 'Regar las plantas', hecha: false, quien: 'Tomi', color: 'ambar' as ColorMiembro },
    { id: 4, texto: 'Pasar la aspiradora', hecha: true, quien: 'Sofi', color: 'ciruela' as ColorMiembro },
];

const CATEGORIAS: Categoria[] = [
    { nombre: 'Supermercado', monto: 84500, color: 'var(--chart-1)' },
    { nombre: 'Servicios', monto: 61200, color: 'var(--chart-2)' },
    { nombre: 'Salidas', monto: 38900, color: 'var(--chart-3)' },
    { nombre: 'Transporte', monto: 22300, color: 'var(--chart-4)' },
    { nombre: 'Otros', monto: 11000, color: 'var(--chart-5)' },
];

export default function Dashboard() {
    const [tareas, setTareas] = useState(TAREAS_INICIALES);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl">Hola, casa</h1>
                        <p className="text-tinta-2 text-sm">Así viene armado el panel con los componentes de MANGO.</p>
                    </div>
                    <div className="flex -space-x-2">
                        {CONVIVIENTES.map((c) => (
                            <MiembroAvatar key={c.nombre} nombre={c.nombre} color={c.color} className="ring-background ring-2" />
                        ))}
                    </div>
                </div>

                <BentoGrid>
                    <PanelCard titulo="Tareas de la semana" ancho={4}>
                        <FilasList>
                            {tareas.map((t) => (
                                <TareaRow
                                    key={t.id}
                                    texto={t.texto}
                                    hecha={t.hecha}
                                    quien={t.quien}
                                    color={t.color}
                                    onToggle={() =>
                                        setTareas((prev) => prev.map((x) => (x.id === t.id ? { ...x, hecha: !x.hecha } : x)))
                                    }
                                />
                            ))}
                        </FilasList>
                    </PanelCard>

                    <PanelCard titulo="Racha de la casa" ancho={2} oscura>
                        <RachaMeter semanas={9} total={14} />
                        <SelloBadge className="mt-1 self-start">3 semanas seguidas</SelloBadge>
                    </PanelCard>

                    <PanelCard titulo="Gastos por categoría" ancho={3}>
                        <CategoriasChart categorias={CATEGORIAS} />
                    </PanelCard>

                    <PanelCard titulo="Próximos pagos" ancho={3}>
                        <FilasList>
                            <PagoRow fecha="05 SEP" nombre="Alquiler" monto={210000} estado="vencida" cuando="Venció" />
                            <PagoRow fecha="12 SEP" nombre="Luz" monto={18400} estado="pronto" cuando="En 3 días" />
                            <PagoRow fecha="20 SEP" nombre="Internet" monto={12900} estado="ok" cuando="Al día" />
                        </FilasList>
                    </PanelCard>

                    <PanelCard titulo="Deudas entre convivientes" ancho={2}>
                        <ul className="flex flex-col gap-2">
                            <DeudaRow texto="Te debe el super" monto={7300} quien="Tomi" color="ambar" />
                            <DeudaRow texto="Le debés el Uber" monto={2150} quien="Sofi" color="ciruela" />
                        </ul>
                    </PanelCard>

                    <PanelCard titulo="Balance del mes" ancho={4}>
                        <div className="flex items-baseline gap-3">
                            <PlataText monto={318400} tono="egreso" grande />
                            <span className="text-tinta-2 text-sm">gastado de</span>
                            <PlataText monto={400000} tono="neutro" />
                        </div>
                        <ProgresoMeter parte={318400} total={400000} />
                        <div className="mt-1 flex flex-wrap gap-2">
                            <EstadoBadge estado="ok" punto>
                                Al día
                            </EstadoBadge>
                            <EstadoBadge estado="pronto" punto>
                                Vence pronto
                            </EstadoBadge>
                            <EstadoBadge estado="vencida" punto>
                                Vencida
                            </EstadoBadge>
                            <EstadoBadge estado="mia" punto>
                                Es tuya
                            </EstadoBadge>
                            <EstadoBadge estado="neutra">Neutra</EstadoBadge>
                        </div>
                    </PanelCard>
                </BentoGrid>
            </div>
        </AppLayout>
    );
}
