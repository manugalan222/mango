import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const ANCHOS = {
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
} as const;

/**
 * Hoja de cuaderno: rectángulo sobrio, contorno de tinta, sombra dura que se
 * despega al pasar el mouse. `oscura` la pasa a panel verde — para la única
 * tarjeta de logro por pantalla. `textura` es liso por defecto; rayado es la
 * única otra opción, y una sección usa una sola, nunca las dos mezcladas.
 */
export function PanelCard({
    titulo,
    accion,
    ancho = 3,
    oscura = false,
    textura = 'liso',
    children,
    className,
}: {
    titulo?: string;
    accion?: ReactNode;
    ancho?: keyof typeof ANCHOS;
    oscura?: boolean;
    textura?: 'liso' | 'rayado';
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            className={cn(
                'rounded-placa flex flex-col gap-3 p-4',
                oscura ? 'mat-hoja-oscura' : 'mat-hoja',
                textura === 'rayado' && 'hoja-rayado',
                ANCHOS[ancho],
                className,
            )}
        >
            {(titulo || accion) && (
                <header className="flex items-center justify-between gap-2">
                    {titulo && (
                        <h2 className={cn('text-[0.7rem] font-bold tracking-[0.11em] uppercase', oscura ? 'text-ambar' : 'text-tinta-3')}>
                            {titulo}
                        </h2>
                    )}
                    {accion}
                </header>
            )}
            {children}
        </section>
    );
}
