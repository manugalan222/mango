import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { MiembroAvatar, type ColorMiembro } from './MiembroAvatar';

/**
 * Fila de tarea.
 *
 * Es un `button` con `aria-pressed`, no un div con un cuadradito: un control que
 * parece marcable tiene que ser operable con teclado y anunciar su estado.
 * Y el target es la fila entera, no el cuadrado — esto se marca parado en la
 * cocina, con una mano.
 */
export function TareaRow({
    texto,
    hecha,
    quien,
    color,
    onToggle,
}: {
    texto: string;
    hecha: boolean;
    quien: string;
    color: ColorMiembro;
    onToggle: () => void;
}) {
    return (
        <button
            type="button"
            aria-pressed={hecha}
            aria-label={`${texto} — le toca a ${quien}`}
            onClick={onToggle}
            className={cn(
                'flex min-h-11 w-full items-center gap-2.5 rounded-lg px-1 text-left text-sm',
                'hover:bg-accent/60 transition-colors duration-150 ease-out',
                'focus-visible:ring-ring focus-visible:ring-offset-card focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
            )}
        >
            <span
                aria-hidden
                className={cn(
                    'grid size-[18px] shrink-0 place-items-center rounded-[5px]',
                    hecha ? 'bg-verde-dato text-on-mango' : 'border-input border-[1.5px]',
                )}
            >
                {hecha && <Check className="size-3" strokeWidth={3.5} />}
            </span>
            <span className={hecha ? 'text-tinta-3 line-through' : ''}>{texto}</span>
            <MiembroAvatar nombre={quien} color={color} mini className="ml-auto" />
        </button>
    );
}
