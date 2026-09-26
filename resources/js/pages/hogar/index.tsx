import { EstadoVacio } from '@/components/mango/EstadoVacio';
import { Pestana, SeccionTabs } from '@/components/mango/SeccionTabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

const pestanas: Pestana[] = [
    {
        valor: 'tareas',
        titulo: 'Tareas',
        contenido: (
            <EstadoVacio
                icono="lista"
                titulo="Sin quehaceres cargados"
                descripcion="Los quehaceres de la casa y quién los tiene asignados van a aparecer acá."
            />
        ),
    },
    {
        valor: 'notas',
        titulo: 'Notas',
        contenido: (
            <EstadoVacio
                icono="cuaderno"
                titulo="Sin notas todavía"
                descripcion="Avisos y recordatorios compartidos entre convivientes van a vivir acá."
            />
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
