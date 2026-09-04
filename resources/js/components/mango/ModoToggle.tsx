import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Lamp } from 'lucide-react';

interface ModoToggleProps {
    /** Sobre qué material se apoya el botón, para elegir un color legible. */
    variante?: 'papel' | 'panel';
    className?: string;
}

/**
 * El interruptor de luz de la casa: prendida es modo oscuro, apagada es modo claro.
 * Alterna sólo entre esos dos —el selector de "system" queda en Ajustes.
 */
export function ModoToggle({ variante = 'papel', className }: ModoToggleProps) {
    const { appearance, updateAppearance } = useAppearance();
    const encendida = appearance === 'dark' || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <button
            type="button"
            role="switch"
            aria-checked={encendida}
            aria-label={encendida ? 'Apagar la luz: pasar a modo claro' : 'Encender la luz: pasar a modo oscuro'}
            onClick={() => updateAppearance(encendida ? 'light' : 'dark')}
            className={cn(
                'focus-visible:ring-ring relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
                encendida ? 'text-mango-texto' : variante === 'panel' ? 'text-panel-ink/65 hover:text-panel-ink' : 'text-tinta-2 hover:text-tinta',
                className,
            )}
        >
            <span
                aria-hidden
                className={cn('bg-mango absolute inset-2 rounded-full blur-md transition-opacity duration-150', encendida ? 'opacity-35' : 'opacity-0')}
            />
            <Lamp aria-hidden className="relative h-5 w-5" strokeWidth={2} fill={encendida ? 'currentColor' : 'none'} fillOpacity={encendida ? 0.3 : 0} />
        </button>
    );
}
