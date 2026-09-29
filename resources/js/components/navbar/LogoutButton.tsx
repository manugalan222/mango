import { ManoIcon } from '@/components/marca/ManoIcon';
import { Link } from '@inertiajs/react';

/** Cerrar sesión de la casa, a la vista en la barra: sólo el ícono, con nombre accesible. */
export function LogoutButton() {
    return (
        <Link
            href={route('logout')}
            method="post"
            as="button"
            aria-label="Cerrar sesión"
            className="text-fondo-tinta/75 hover:bg-fondo-tinta/10 hover:text-fondo-tinta focus-visible:ring-ring focus-visible:ring-offset-fondo grid size-11 shrink-0 place-items-center rounded-lg transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
        >
            <ManoIcon nombre="salir" className="size-[18px]" />
        </Link>
    );
}
