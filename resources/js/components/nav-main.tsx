import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Sofa, Wallet } from 'lucide-react';

/**
 * Los tres destinos de la casa. El límite no es estético: una barra
 * sobrecargada obliga a leerla cada vez en lugar de apuntar de memoria.
 */
const navPrincipal: NavItem[] = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Finanzas', url: '/finanzas', icon: Wallet },
    { title: 'Hogar', url: '/hogar', icon: Sofa },
];

/**
 * Un zigzag distinto por destino —no la misma línea repetida tres veces—
 * para que se sienta un trazo de verdad y no un asset reciclado.
 */
const ZIGZAGS: Record<string, string> = {
    Dashboard: 'M3,9 L30,3 L14,11 L48,2 L26,10 L64,4 L42,12 L80,3 L58,10 L97,5',
    Finanzas: 'M2,5 L26,11 L10,2 L46,10 L24,3 L66,11 L40,4 L82,10 L60,3 L98,8',
    Hogar: 'M2,11 L24,2 L8,9 L44,3 L20,11 L62,2 L36,10 L78,3 L54,11 L96,4',
};

export function NavMain() {
    const page = usePage();

    return (
        <nav aria-label="Secciones de la casa" className="ml-8 flex min-w-0 flex-1 items-center gap-3 overflow-x-auto md:ml-12">
            {navPrincipal.map((item) => {
                const activo = page.url === item.url || page.url.startsWith(`${item.url}?`);

                return (
                    <Link
                        key={item.title}
                        href={item.url}
                        prefetch
                        data-active={activo}
                        className="focus-visible:ring-ring focus-visible:ring-offset-panel text-panel-ink/75 hover:text-panel-ink data-[active=true]:text-panel-ink relative flex shrink-0 items-center gap-2 rounded-lg px-3.5 pt-[10px] pb-[14px] text-sm font-semibold transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden data-[active=true]:font-bold"
                    >
                        {item.icon && <item.icon aria-hidden className="size-4" />}
                        <span>{item.title}</span>
                        <svg className="subrayado" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden>
                            <path pathLength="1" d={ZIGZAGS[item.title]} />
                        </svg>
                    </Link>
                );
            })}
        </nav>
    );
}
