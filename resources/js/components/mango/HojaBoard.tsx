import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/**
 * La hoja de una página: una sola hoja rayada que ocupa la pantalla, apoyada
 * sobre `PanelFondo`, con el título escrito arriba como el encabezado de una
 * página de cuaderno. Es el board de toda la app —dashboard, Finanzas, Hogar,
 * ajustes—: cambia lo que está anotado, no el papel.
 *
 * `hoja-fija`: no se levanta al pasar el mouse. Ocupa la página y en
 * `SeccionTabs` lleva marcadores montados en el borde; si se despegara, se
 * separaría de ellos. `accion` va a la derecha del título (avatares, un botón).
 */
export function HojaBoard({
    titulo,
    descripcion,
    accion,
    children,
    className,
}: {
    titulo: string;
    descripcion?: string;
    accion?: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('mat-hoja hoja-fija hoja-rayado rounded-placa flex-1 px-5 pt-6 pb-6 md:px-8 md:pt-8', className)}>
            <header className="flex flex-wrap items-start justify-between gap-3 pb-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl md:text-4xl">{titulo}</h1>
                    {descripcion && <p className="text-tinta-2 text-sm">{descripcion}</p>}
                </div>
                {accion}
            </header>
            {children}
        </div>
    );
}
