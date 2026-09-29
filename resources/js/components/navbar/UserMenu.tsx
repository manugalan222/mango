import { ManoIcon } from '@/components/mango/ManoIcon';
import { UserInfo } from '@/components/navbar/UserInfo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

/**
 * El desplegable de la casa: Ajustes y Cerrar sesión. Hoy muestra la casa;
 * va a ser el cambiador de perfil.
 */
export function UserMenu() {
    const { auth } = usePage<SharedData>().props;
    const cleanup = useMobileNavigation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="hover:bg-fondo-tinta/10 focus-visible:ring-ring focus-visible:ring-offset-fondo flex h-11 items-center gap-1.5 rounded-lg py-1 pr-2 pl-1 transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                >
                    <UserInfo user={auth.user} />
                    <ManoIcon nombre="abajo" className="text-fondo-tinta/60 size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserInfo user={auth.user} showEmail />
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                            <ManoIcon nombre="ajustes" className="mr-2" />
                            Ajustes
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={cleanup}>
                        <ManoIcon nombre="salir" className="mr-2" />
                        Cerrar sesión
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
