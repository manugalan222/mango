import { HojaBoard } from '@/components/papel/HojaBoard';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

const secciones: NavItem[] = [
    { title: 'La casa', url: '/settings/profile' },
    { title: 'Contraseña', url: '/settings/password' },
    { title: 'Apariencia', url: '/settings/appearance' },
];

/**
 * La hoja de Ajustes: el índice a la izquierda y la sección abierta al lado.
 * Va anidado adentro de `CasaLayout`, también como layout persistente, así el
 * índice no se vuelve a montar al pasar de una sección a otra.
 */
export function AjustesLayout({ children }: { children: ReactNode }) {
    const { url } = usePage();

    return (
        <HojaBoard titulo="Ajustes" descripcion="Los datos de la casa, la contraseña y cómo se ve.">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                <nav aria-label="Secciones de ajustes" className="flex flex-col gap-1 lg:w-48">
                    {secciones.map((item) => {
                        const activa = url.startsWith(item.url);

                        return (
                            <Link
                                key={item.url}
                                href={item.url}
                                prefetch
                                aria-current={activa ? 'page' : undefined}
                                className={cn(
                                    'focus-visible:ring-ring flex min-h-11 items-center rounded-lg px-3 text-sm font-bold transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
                                    activa ? 'bg-muted text-tinta' : 'text-tinta-2 hover:bg-muted/60 hover:text-tinta',
                                )}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                <section className="flex max-w-xl flex-1 flex-col gap-12">{children}</section>
            </div>
        </HojaBoard>
    );
}
