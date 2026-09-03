import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Inicio', href: '/dashboard' }];

/**
 * Página de aterrizaje después de entrar. Está vacía a propósito: la maqueta con
 * datos de ejemplo se desarmó en componentes reutilizables (`components/mango/`)
 * y el panel real se arma cuando haya datos que mostrar.
 *
 * No se puede borrar el archivo: `route('dashboard')` es el destino al que
 * Laravel manda después del login y del registro.
 */
export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h1 className="text-2xl">Inicio</h1>
                <p className="text-tinta-2">Acá va el panel de la casa.</p>
            </div>
        </AppLayout>
    );
}
