import { HojaIcon } from '@/components/mango/HojaIcon';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    // El usuario ES la casa: `auth.user.name` es el nombre del hogar, no el de
    // la persona. La persona se elige después, en el selector de perfil.
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <HojaIcon className="size-7 shrink-0" />
            <div className="ml-1.5 grid flex-1 text-left">
                <span className="font-display truncate text-lg leading-none font-extrabold tracking-[-0.045em]">MANGO</span>
                {auth?.user?.name && <span className="text-sidebar-foreground/60 mt-0.5 truncate text-[0.68rem] leading-none">{auth.user.name}</span>}
            </div>
        </>
    );
}
