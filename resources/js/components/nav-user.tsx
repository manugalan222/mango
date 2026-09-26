import { ManoIcon } from '@/components/mango/ManoIcon';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;

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
                <UserMenuContent user={auth.user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
