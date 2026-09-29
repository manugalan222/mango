import { MigasBreadcrumb } from '@/components/compartidos/MigasBreadcrumb';
import { Navbar } from '@/components/navbar/Navbar';
import { PanelFondo } from '@/components/papel/PanelFondo';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

/**
 * Adentro de la casa: la barra arriba y la página debajo, todo sobre
 * `PanelFondo` (yeso texturado de día, verde de noche). Cada página pone
 * encima sus hojas. Lo que va suelto sobre el fondo —migas de pan, el saludo—
 * va en `text-fondo-tinta`; lo demás, sobre papel.
 *
 * Es layout persistente: la página lo declara con `Pagina.layout = (page) =>
 * <CasaLayout>{page}</CasaLayout>`, nunca envolviéndose adentro, para que la
 * barra no se desmonte al navegar. El margen de la página lo pone este layout.
 */
export function CasaLayout({ children, migas = [] }: { children: ReactNode; migas?: BreadcrumbItem[] }) {
    return (
        <PanelFondo className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4 pt-6 md:p-6 md:pt-8">
                {migas.length > 0 && <MigasBreadcrumb migas={migas} />}
                {children}
            </main>
        </PanelFondo>
    );
}
