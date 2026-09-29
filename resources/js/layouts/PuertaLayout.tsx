import { MangoLogo } from '@/components/mango/MangoLogo';
import { PanelFondo } from '@/components/mango/PanelFondo';
import { DarkModeButton } from '@/components/navbar/DarkModeButton';
import { Link } from '@inertiajs/react';

interface PuertaLayoutProps {
    children: React.ReactNode;
    titulo: string;
    descripcion: string;
}

/**
 * La puerta: el layout de todas las páginas de auth (entrar, armar la casa,
 * recuperar la contraseña, verificar el correo).
 *
 * `PanelFondo`: el mismo material del verde que la barra superior —fibra,
 * grano y la luz de la repisa, anclada arriba a la izquierda—. De día es
 * ventana; de noche la misma luz se calienta a mango, sin moverse de lugar.
 * El formulario vive en una hoja de cuaderno a medio llenar —rayado tenue, la
 * misma tarjeta que el resto de la casa— apoyada sobre esa luz, no en un arco.
 *
 * El slogan va arriba, como el cartel sobre la puerta.
 */
export function PuertaLayout({ children, titulo, descripcion }: PuertaLayoutProps) {
    return (
        <PanelFondo tono="puerta" className="relative flex min-h-svh flex-col px-5 py-10">
            <DarkModeButton variante="panel" className="absolute top-5 right-5" />

            {/* `m-auto` en vez de `justify-center`: centra igual, y si el formulario
                es más alto que la pantalla no recorta el borde de arriba. */}
            <div className="m-auto flex w-full flex-col items-center gap-8">
                <p className="font-display text-panel-ink max-w-[18ch] text-center text-2xl leading-[1.12] font-extrabold tracking-[0.015em] uppercase sm:text-[1.75rem]">
                    Que en tu casa nunca falte un mango
                </p>

                <div className="mat-hoja hoja-rayado rounded-placa w-full max-w-[23rem] px-8 py-9">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Link
                                href={route('home')}
                                className="focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                            >
                                <MangoLogo className="text-xl" />
                                <span className="sr-only">Ir al inicio</span>
                            </Link>
                            <h1 className="mt-2 text-3xl">{titulo}</h1>
                            <p className="text-tinta-2 text-balance">{descripcion}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </PanelFondo>
    );
}
