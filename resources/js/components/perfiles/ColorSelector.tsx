import { ErrorText } from '@/components/formulario/ErrorText';
import { COLORES_MIEMBRO, FONDOS, type ColorMiembro } from '@/components/mango/MiembroAvatar';
import { cn } from '@/lib/utils';

interface ColorSelectorProps {
    valor: ColorMiembro | '';
    onElegir: (color: ColorMiembro) => void;
    /** Los colores que ya tiene otro conviviente: cada color es de una sola persona. */
    usados: Set<ColorMiembro>;
    error?: string;
}

/** Los cinco colores de la casa, como botones con `aria-pressed`. Los ocupados quedan deshabilitados. */
export function ColorSelector({ valor, onElegir, usados, error }: ColorSelectorProps) {
    return (
        <div className="grid gap-1.5">
            <span className="text-sm font-medium">Color</span>

            <div role="group" aria-label="Color del perfil" className="flex gap-2">
                {COLORES_MIEMBRO.map((c) => (
                    <button
                        key={c}
                        type="button"
                        disabled={usados.has(c)}
                        aria-pressed={valor === c}
                        aria-label={c}
                        onClick={() => onElegir(c)}
                        className={cn(
                            'rounded-hoja ring-offset-background size-11 ring-offset-2 transition-transform disabled:cursor-not-allowed disabled:opacity-30',
                            FONDOS[c],
                            valor === c ? 'ring-ring scale-105 ring-2' : 'ring-border ring-1',
                        )}
                    />
                ))}
            </div>

            <ErrorText mensaje={error} />
        </div>
    );
}
