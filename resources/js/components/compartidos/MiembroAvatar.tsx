import { cn } from '@/lib/utils';

/**
 * Los cinco colores de la casa. Son los mismos de la paleta categórica de
 * gráficos: si ves una barra ciruela en el gasto del mes, ya sabés de quién es
 * antes de leer la etiqueta.
 */
export const COLORES_MIEMBRO = ['mango', 'verde', 'ambar', 'ciruela', 'arcilla'] as const;
export type ColorMiembro = (typeof COLORES_MIEMBRO)[number];

export const FONDOS: Record<ColorMiembro, string> = {
    mango: 'bg-mango',
    verde: 'bg-verde',
    ambar: 'bg-ambar',
    ciruela: 'bg-ciruela',
    arcilla: 'bg-arcilla',
};

/**
 * Avatar en forma de hoja, no en círculo: un círculo es de cualquier app.
 *
 * La inicial va en 20px/800 por una razón medida — espresso sobre verde da
 * 3,71:1, insuficiente para texto normal pero por encima del umbral 3:1 de
 * texto grande en negrita. El tamaño es lo que habilita el color pleno.
 * En `mini` no entra una inicial legible, así que queda sólo el color.
 */
export function MiembroAvatar({
    nombre,
    color,
    mini = false,
    className,
}: {
    nombre: string;
    color: ColorMiembro;
    mini?: boolean;
    className?: string;
}) {
    const inicial = nombre.trim().charAt(0).toUpperCase();

    return (
        <span
            title={nombre}
            aria-label={nombre}
            role="img"
            className={cn(
                'rounded-hoja font-display grid shrink-0 place-items-center font-extrabold tracking-[-0.02em] text-[#2A1F18]',
                mini ? 'size-6 text-[0px]' : 'size-11 text-xl',
                FONDOS[color],
                className,
            )}
        >
            {mini ? '' : inicial}
        </span>
    );
}
