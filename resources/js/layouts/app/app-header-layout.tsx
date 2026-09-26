import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PanelFondo } from '@/components/mango/PanelFondo';
import { type BreadcrumbItem } from '@/types';

/**
 * Toda la app se apoya sobre `PanelFondo` (yeso texturado de día, verde de
 * noche), y cada página pone encima sus hojas. Lo que va suelto sobre el
 * fondo —migas de pan, el saludo— va en `text-fondo-tinta`; lo demás, sobre papel.
 */
export default function AppHeaderLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <PanelFondo className="flex min-h-screen w-full flex-col">
            <AppHeader />
            <AppContent>
                {breadcrumbs.length > 0 && (
                    <div className="px-4 pt-4 md:px-6">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}
                {children}
            </AppContent>
        </PanelFondo>
    );
}
