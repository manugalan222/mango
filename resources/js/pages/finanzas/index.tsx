import { BentoGrid } from '@/components/mango/BentoGrid';
import { EstadoVacio } from '@/components/mango/EstadoVacio';
import { PanelCard } from '@/components/mango/PanelCard';
import { Pestana, SeccionTabs } from '@/components/mango/SeccionTabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { HandCoins, PiggyBank, Receipt } from 'lucide-react';

const pestanas: Pestana[] = [
    {
        valor: 'gastos',
        titulo: 'Gastos',
        contenido: (
            <BentoGrid>
                <PanelCard ancho={4}>
                    <EstadoVacio
                        icon={Receipt}
                        titulo="Todavía no hay gastos cargados"
                        descripcion="Cuando la casa empiece a anotar gastos, van a aparecer acá agrupados por categoría."
                    />
                </PanelCard>
            </BentoGrid>
        ),
    },
    {
        valor: 'deudas',
        titulo: 'Deudas',
        contenido: (
            <BentoGrid>
                <PanelCard ancho={4}>
                    <EstadoVacio
                        icon={HandCoins}
                        titulo="Nadie le debe nada a nadie"
                        descripcion="Las deudas entre convivientes van a aparecer acá apenas se registre un gasto compartido."
                    />
                </PanelCard>
            </BentoGrid>
        ),
    },
    {
        valor: 'ahorros',
        titulo: 'Ahorros',
        contenido: (
            <BentoGrid>
                <PanelCard ancho={4}>
                    <EstadoVacio
                        icon={PiggyBank}
                        titulo="Sin metas de ahorro todavía"
                        descripcion="Armá una meta para la casa y acá vas a ver cuánto falta para llegar."
                    />
                </PanelCard>
            </BentoGrid>
        ),
    },
];

export default function FinanzasIndex() {
    return (
        <AppLayout>
            <Head title="Finanzas" />
            <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl">Finanzas</h1>
                    <p className="text-tinta-2 text-sm">Gastos, deudas entre convivientes y metas de ahorro de la casa.</p>
                </div>

                <SeccionTabs pestanas={pestanas} />
            </div>
        </AppLayout>
    );
}
