import { NotasTab } from '@/components/hogar/NotasTab';
import { TareasTab } from '@/components/hogar/TareasTab';
import { Pestana, SeccionTabs } from '@/components/papel/SeccionTabs';
import { CasaLayout } from '@/layouts/CasaLayout';
import { NOTAS, TAREAS } from '@/lib/muestra';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

// MUESTRA: todo lo que se ve sale de `lib/muestra.ts`, datos inventados.

const pestanas: Pestana[] = [
    { valor: 'tareas', titulo: 'Tareas', contenido: <TareasTab tareas={TAREAS} /> },
    { valor: 'notas', titulo: 'Notas', contenido: <NotasTab notas={NOTAS} /> },
];

export default function HogarIndex() {
    return (
        <>
            <Head title="Hogar" />
            <SeccionTabs titulo="Hogar" descripcion="Quehaceres y notas compartidas de la casa." pestanas={pestanas} />
        </>
    );
}

HogarIndex.layout = (page: ReactNode) => <CasaLayout>{page}</CasaLayout>;
