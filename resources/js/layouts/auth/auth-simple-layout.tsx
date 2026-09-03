import { MangoLogo } from '@/components/mango/MangoLogo';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

/**
 * La puerta.
 *
 * Fondo verde plano — sin fibra, sin caída de luz, sin trama: es lo único de
 * todo el sistema que no lleva material, porque acá no estás adentro de la casa
 * todavía. El formulario vive dentro de un arco de luz cálida: una puerta
 * abierta vista desde afuera.
 *
 * El slogan va arriba, como el cartel sobre la puerta.
 */
export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="bg-panel flex min-h-svh flex-col px-5 py-10">
            {/* `m-auto` en vez de `justify-center`: centra igual, y si el formulario
                es más alto que la pantalla no recorta el borde de arriba. */}
            <div className="m-auto flex w-full flex-col items-center gap-8">
                <p className="font-display text-panel-ink max-w-[18ch] text-center text-2xl leading-[1.12] font-extrabold tracking-[0.015em] uppercase sm:text-[1.75rem]">
                    Que en tu casa nunca falte un mango
                </p>

                <div className="bg-background w-full max-w-[23rem] rounded-[11.5rem_11.5rem_1rem_1rem] px-8 pt-[4.5rem] pb-9 shadow-[0_28px_64px_-32px_rgb(0_0_0/0.65)]">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Link
                                href={route('home')}
                                className="focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                            >
                                <MangoLogo className="text-xl" />
                                <span className="sr-only">Ir al inicio</span>
                            </Link>
                            <h1 className="mt-2 text-3xl">{title}</h1>
                            <p className="text-tinta-2 text-balance">{description}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
