import { BrandLogo } from '@/components/navbar/BrandLogo';
import { DarkModeButton } from '@/components/navbar/DarkModeButton';
import { LogoutButton } from '@/components/navbar/LogoutButton';
import { SectionNavbar } from '@/components/navbar/SectionNavbar';
import { UserMenu } from '@/components/navbar/UserMenu';
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
export function Navbar() {
    return (
        <header className="mat-fondo border-fondo-tinta/14 sticky top-0 z-40 border-b">
            <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6">
                <Link
                    href="/dashboard"
                    prefetch
                    className="focus-visible:ring-ring flex shrink-0 items-center rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                >
                    <BrandLogo />
                </Link>

                <SectionNavbar />

                <div className="ml-auto flex shrink-0 items-center gap-2">
                    <DarkModeButton variante="fondo" />
                    <UserMenu />
                    <span aria-hidden className="bg-fondo-tinta/15 mx-1 h-6 w-px" />
                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
