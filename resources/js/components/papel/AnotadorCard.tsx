import { type ColorMiembro } from '@/components/compartidos/MiembroAvatar';
import { cn } from '@/lib/utils';
import { type CSSProperties, ReactNode } from 'react';

const TONOS = {
    papel: '',
    mango: 'bg-mango-suave',
    verde: 'bg-ok-bg',
    ambar: 'bg-warn-bg',
    ciruela: 'bg-mia-bg',
    arcilla: 'bg-muted',
} as const;

export type TonoAnotador = keyof typeof TONOS;

/**
 * El pastel de nota adhesiva de cada conviviente: sale de su color, así una
 * nota de Sofi se reconoce por el papel antes de leer la firma.
 */
export const TONO_DE_MIEMBRO: Record<ColorMiembro, TonoAnotador> = {
    mango: 'mango',
    verde: 'verde',
    ambar: 'ambar',
    ciruela: 'ciruela',
    arcilla: 'arcilla',
};

/**
 * Anotador suelto apoyado sobre la `HojaBoard` de una sección: papel liso
 * encima de la hoja rayada, para que lo escrito no se pierda entre renglones.
 *
 * `sujecion`: `espiral` es el anotador anillado —acento, uno por pantalla—;
 * `cinta` lo pega a la hoja con cinta de papel. `giro` (en grados, chico:
 * entre −2 y 2) lo deja tirado a mano; alternarlo entre vecinos evita que un
 * muro de anotadores se vea impreso.
 *
 * `tono` distinto de `papel` es nota adhesiva: ahí sólo texto `tinta` o
 * `tinta-2`. Un monto de ingreso/egreso va en papel —medido en `app.css`—.
 */
export function AnotadorCard({
    titulo,
    accion,
    sujecion = 'cinta',
    tono = 'papel',
    giro = 0,
    children,
    className,
}: {
    titulo?: string;
    accion?: ReactNode;
    sujecion?: 'espiral' | 'cinta' | 'ninguna';
    tono?: TonoAnotador;
    giro?: number;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            style={{ '--giro': `${giro}deg` } as CSSProperties}
            className={cn('mat-anotador flex flex-col gap-3 rounded-lg px-4 pb-4', sujecion === 'espiral' ? 'pt-7' : 'pt-5', TONOS[tono], className)}
        >
            {sujecion === 'espiral' && <span aria-hidden className="anotador-espiral" />}
            {sujecion === 'cinta' && <span aria-hidden className="anotador-cinta" />}
            {(titulo || accion) && (
                <header className="flex items-baseline justify-between gap-2">
                    {titulo && <h2 className="text-lg leading-tight">{titulo}</h2>}
                    {accion}
                </header>
            )}
            {children}
        </section>
    );
}
