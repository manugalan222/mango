import { AparienciaSelector } from '@/components/ajustes/AparienciaSelector';
import { SeccionHeader } from '@/components/ajustes/SeccionHeader';
import { AjustesLayout } from '@/layouts/AjustesLayout';
import { CasaLayout } from '@/layouts/CasaLayout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

const migas: BreadcrumbItem[] = [{ title: 'Apariencia', href: '/settings/appearance' }];

export default function Appearance() {
    return (
        <>
            <Head title="Apariencia" />

            <div className="flex flex-col gap-6">
                <SeccionHeader titulo="Apariencia" descripcion="Se guarda en este dispositivo: cada uno ve la casa como prefiere." />
                <AparienciaSelector />
            </div>
        </>
    );
}

Appearance.layout = (page: ReactNode) => (
    <CasaLayout migas={migas}>
        <AjustesLayout>{page}</AjustesLayout>
    </CasaLayout>
);
