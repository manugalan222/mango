import { EstadoVacio } from '@/components/mango/EstadoVacio';
import { Pestana, SeccionTabs } from '@/components/mango/SeccionTabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

const pestanas: Pestana[] = [
    {
        valor: 'gastos',
        titulo: 'Gastos',
        contenido: (
            <EstadoVacio
                icono="recibo"
                titulo="Todavía no hay gastos cargados"
                descripcion="Cuando la casa empiece a anotar gastos, van a aparecer acá agrupados por categoría."
            />
        ),
    },
    {
        valor: 'deudas',
        titulo: 'Deudas',
        contenido: (
            <EstadoVacio
                icono="intercambio"
                titulo="Nadie le debe nada a nadie"
                descripcion="Las deudas entre convivientes van a aparecer acá apenas se registre un gasto compartido."
            />
        ),
    },
    {
        valor: 'ahorros',
        titulo: 'Ahorros',
        contenido: (
            <EstadoVacio
                icono="chanchito"
                titulo="Sin metas de ahorro todavía"
                descripcion="Armá una meta para la casa y acá vas a ver cuánto falta para llegar."
            />
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
