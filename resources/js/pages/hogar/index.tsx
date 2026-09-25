import { BentoGrid } from '@/components/mango/BentoGrid';
import { EstadoVacio } from '@/components/mango/EstadoVacio';
import { PanelCard } from '@/components/mango/PanelCard';
import { Pestana, SeccionTabs } from '@/components/mango/SeccionTabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ListChecks, NotebookPen } from 'lucide-react';

const pestanas: Pestana[] = [
    {
        valor: 'tareas',
        titulo: 'Tareas',
        contenido: (
            <BentoGrid>
                <PanelCard ancho={4}>
                    <EstadoVacio
                        icon={ListChecks}
                        titulo="Sin quehaceres cargados"
                        descripcion="Los quehaceres de la casa y quién los tiene asignados van a aparecer acá."
                    />
                </PanelCard>
            </BentoGrid>
        ),
    },
    {
        valor: 'notas',
        titulo: 'Notas',
        contenido: (
            <BentoGrid>
                <PanelCard ancho={4}>
                    <EstadoVacio
                        icon={NotebookPen}
                        titulo="Sin notas todavía"
                        descripcion="Avisos y recordatorios compartidos entre convivientes van a vivir acá."
                    />
                </PanelCard>
            </BentoGrid>
        ),
    },
];

export default function HogarIndex() {
    return (
        <AppLayout>
            <Head title="Hogar" />
            <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl">Hogar</h1>
                    <p className="text-tinta-2 text-sm">Quehaceres y notas compartidas de la casa.</p>
                </div>

                <SeccionTabs pestanas={pestanas} />
            </div>
        </AppLayout>
    );
}
