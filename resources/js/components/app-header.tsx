import AppLogo from '@/components/app-logo';
import { ManoIcon } from '@/components/mango/ManoIcon';
import { ModoToggle } from '@/components/mango/ModoToggle';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Link } from '@inertiajs/react';

/**
 * La barra de arriba, como Netflix: la marca pegada a la esquina izquierda,
 * los tres destinos de la casa con aire entre sí, y a la derecha la luz, el
 * perfil y —bien a la vista, sin esconderlo en un menú— cerrar sesión.
 *
 * Mismo fondo que la página y fijo al viewport (`.mat-fondo`: yeso de día,
 * verde de noche): barra y página son un solo fondo, separados sólo por una
 * línea de `fondo-tinta` al 14%. Vive en el layout persistente, así que no se vuelve a montar al navegar.
 */
export function AppHeader() {
    return (
        <header className="mat-fondo border-fondo-tinta/14 sticky top-0 z-40 border-b">
            <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6">
                <Link
                    href="/dashboard"
                    prefetch
                    className="focus-visible:ring-ring flex shrink-0 items-center rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                >
                    <AppLogo />
                </Link>

                <NavMain />

                <div className="ml-auto flex shrink-0 items-center gap-2">
                    <ModoToggle variante="fondo" />
                    <NavUser />
                    <span aria-hidden className="bg-fondo-tinta/15 mx-1 h-6 w-px" />
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        aria-label="Cerrar sesión"
                        className="text-fondo-tinta/75 hover:bg-fondo-tinta/10 hover:text-fondo-tinta focus-visible:ring-ring focus-visible:ring-offset-fondo grid size-11 shrink-0 place-items-center rounded-lg transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                    >
                        <ManoIcon nombre="salir" className="size-[18px]" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
