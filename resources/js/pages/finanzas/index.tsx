import { AhorrosTab } from '@/components/finanzas/AhorrosTab';
import { DeudasTab } from '@/components/finanzas/DeudasTab';
import { GastosTab } from '@/components/finanzas/GastosTab';
import { Pestana, SeccionTabs } from '@/components/papel/SeccionTabs';
import { CasaLayout } from '@/layouts/CasaLayout';
import { AHORROS, BALANCE_MES, DEUDAS, GASTOS, GASTOS_POR_CATEGORIA } from '@/lib/muestra';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

// MUESTRA: todo lo que se ve sale de `lib/muestra.ts`, datos inventados.

const pestanas: Pestana[] = [
    {
        valor: 'gastos',
        titulo: 'Gastos',
        contenido: <GastosTab mes="Septiembre" total={BALANCE_MES.gastos} categorias={GASTOS_POR_CATEGORIA} gastos={GASTOS} />,
    },
    { valor: 'deudas', titulo: 'Deudas', contenido: <DeudasTab deudas={DEUDAS} /> },
    { valor: 'ahorros', titulo: 'Ahorros', contenido: <AhorrosTab ahorros={AHORROS} /> },
];

export default function FinanzasIndex() {
    return (
        <>
            <Head title="Finanzas" />
            <SeccionTabs titulo="Finanzas" descripcion="Gastos, deudas entre convivientes y metas de ahorro de la casa." pestanas={pestanas} />
        </>
    );
}

FinanzasIndex.layout = (page: ReactNode) => <CasaLayout>{page}</CasaLayout>;
