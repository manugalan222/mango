import { BentoGrid } from '@/components/mango/BentoGrid';
import { EstadoVacio } from '@/components/mango/EstadoVacio';
import { MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { PanelCard } from '@/components/mango/PanelCard';
import AppLayout from '@/layouts/app-layout';
import { type Perfil } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

/**
 * Resumen de la casa: tareas pendientes, cumplimiento de la semana y
 * finanzas, todo junto —sin pestañas—, tal como pidió Manu. Un muro de hojas
 * chicas sobre el verde, del mismo papel que la hoja de Finanzas y Hogar. Sin
 * datos de quehaceres ni de gastos todavía, así que cada hoja muestra su
 * estado vacío real en lugar de una maqueta.
 */
export default function Dashboard({ perfiles }: { perfiles: Perfil[] }) {
    return (
        <>
            <Head title="Inicio" />
            <div className="flex flex-1 flex-col gap-5 p-4 pt-6 md:p-6 md:pt-8">
                {/* Suelto sobre el verde: `panel-ink`, no `tinta`, o no llega a contraste. */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-panel-ink text-3xl md:text-4xl">Hola, casa</h1>
                        <p className="text-panel-ink/80 text-sm">Así viene el resumen de la semana.</p>
                    </div>

                    {perfiles.length > 0 && (
                        <div className="flex -space-x-2">
                            {perfiles.map((perfil) => (
                                <MiembroAvatar key={perfil.id} nombre={perfil.nombre} color={perfil.color} className="ring-panel ring-2" />
                            ))}
                        </div>
                    )}
                </div>

                <BentoGrid className="gap-5">
                    <PanelCard titulo="Tareas pendientes" ancho={4}>
                        <EstadoVacio
                            icono="lista"
                            titulo="Sin tareas cargadas"
                            descripcion="Cuando la casa cargue quehaceres, acá vas a ver cuáles quedan pendientes y a quién le tocan."
                        />
                    </PanelCard>

                    <PanelCard titulo="Cumplimiento de la semana" ancho={2}>
                        <EstadoVacio
                            icono="planilla"
                            titulo="Todavía sin datos"
                            descripcion="La racha de la casa arranca en cuanto se cierre la primera semana de quehaceres."
                        />
                    </PanelCard>

                    <PanelCard titulo="Balance del mes" ancho={3}>
                        <EstadoVacio
                            icono="billetera"
                            titulo="Sin movimientos"
                            descripcion="El balance y los gastos por categoría van a aparecer acá apenas se cargue un gasto."
                        />
                    </PanelCard>

                    <PanelCard titulo="Próximos vencimientos" ancho={3}>
                        <EstadoVacio
                            icono="calendario"
                            titulo="Nada vencido ni por vencer"
                            descripcion="Los pagos de la casa con su fecha van a aparecer acá."
                        />
                    </PanelCard>
                </BentoGrid>
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
