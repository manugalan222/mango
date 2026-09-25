import { BentoGrid } from '@/components/mango/BentoGrid';
import { EstadoVacio } from '@/components/mango/EstadoVacio';
import { MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { PanelCard } from '@/components/mango/PanelCard';
import AppLayout from '@/layouts/app-layout';
import { type Perfil } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarClock, ClipboardList, ListChecks, Wallet } from 'lucide-react';

/**
 * Resumen de la casa: tareas pendientes, cumplimiento de la semana y
 * finanzas, todo junto —sin pestañas—, tal como pidió Manu. Sin datos de
 * quehaceres ni de gastos todavía, así que cada panel muestra su estado
 * vacío real en lugar de una maqueta.
 */
export default function Dashboard({ perfiles }: { perfiles: Perfil[] }) {
    return (
        <AppLayout>
            <Head title="Inicio" />
            <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl">Hola, casa</h1>
                        <p className="text-tinta-2 text-sm">Así viene el resumen de la semana.</p>
                    </div>

                    {perfiles.length > 0 && (
                        <div className="flex -space-x-2">
                            {perfiles.map((perfil) => (
                                <MiembroAvatar key={perfil.id} nombre={perfil.nombre} color={perfil.color} className="ring-background ring-2" />
                            ))}
                        </div>
                    )}
                </div>

                <BentoGrid>
                    <PanelCard titulo="Tareas pendientes" ancho={4}>
                        <EstadoVacio
                            icon={ListChecks}
                            titulo="Sin tareas cargadas"
                            descripcion="Cuando la casa cargue quehaceres, acá vas a ver cuáles quedan pendientes y a quién le tocan."
                        />
                    </PanelCard>

                    <PanelCard titulo="Cumplimiento de la semana" ancho={2} oscura>
                        <EstadoVacio
                            oscuro
                            icon={ClipboardList}
                            titulo="Todavía sin datos"
                            descripcion="La racha de la casa arranca en cuanto se cierre la primera semana de quehaceres."
                        />
                    </PanelCard>

                    <PanelCard titulo="Balance del mes" ancho={3}>
                        <EstadoVacio
                            icon={Wallet}
                            titulo="Sin movimientos"
                            descripcion="El balance y los gastos por categoría van a aparecer acá apenas se cargue un gasto."
                        />
                    </PanelCard>

                    <PanelCard titulo="Próximos vencimientos" ancho={3}>
                        <EstadoVacio
                            icon={CalendarClock}
                            titulo="Nada vencido ni por vencer"
                            descripcion="Los pagos de la casa con su fecha van a aparecer acá."
                        />
                    </PanelCard>
                </BentoGrid>
            </div>
        </AppLayout>
    );
}
