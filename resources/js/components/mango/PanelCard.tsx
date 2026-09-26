import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const ANCHOS = {
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
} as const;

/**
 * Hoja de cuaderno chica: el mismo papel que la `HojaBoard` de Finanzas y
 * Hogar —rayado, contorno de tinta, sombra dura, título escrito arriba como
 * encabezado de página— en tamaño tarjeta, para un muro de `BentoGrid`. A
 * diferencia de la hoja grande, ésta sí se despega al pasar el mouse.
 *
 * `oscura` la pasa a panel verde —para la única tarjeta de logro por
 * pantalla—; `textura="liso"` le saca el rayado. Una sección usa una sola
 * textura, nunca las dos mezcladas.
 */
export function PanelCard({
    titulo,
    accion,
    ancho = 3,
    oscura = false,
    textura = 'rayado',
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
                'rounded-placa flex flex-col gap-3 px-5 pt-5 pb-4',
                oscura ? 'mat-hoja-oscura' : 'mat-hoja',
                textura === 'rayado' && 'hoja-rayado',
                ANCHOS[ancho],
                className,
            )}
        >
            {(titulo || accion) && (
                <header className="flex items-start justify-between gap-2">
                    {titulo && <h2 className={cn('text-xl leading-tight', oscura && 'text-panel-ink')}>{titulo}</h2>}
                    {accion}
                </header>
            )}
            {children}
        </section>
    );
}
