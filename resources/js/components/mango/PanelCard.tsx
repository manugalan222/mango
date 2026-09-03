import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const ANCHOS = {
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
} as const;

/**
 * Papel: mate absoluto, hairline y una sombra larga y baja.
 * `oscura` la pasa a panel verde — para la única tarjeta de logro por pantalla.
 */
export function PanelCard({
    titulo,
    accion,
    ancho = 3,
    oscura = false,
    children,
    className,
}: {
    titulo?: string;
    accion?: ReactNode;
    ancho?: keyof typeof ANCHOS;
    oscura?: boolean;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            className={cn(
                'rounded-placa flex flex-col gap-3 p-4',
                oscura ? 'mat-panel-liso border border-transparent' : 'mat-papel',
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
