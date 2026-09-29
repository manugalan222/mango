import { ManoIcon } from '@/components/mango/ManoIcon';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

interface DarkModeButtonProps {
    /** Sobre qué material se apoya el botón, para elegir un color legible. */
    variante?: 'papel' | 'panel' | 'fondo';
    className?: string;
}

/**
 * El interruptor de luz de la casa: prendida es modo oscuro, apagada es modo claro.
 * Alterna sólo entre esos dos —el selector de "system" queda en Ajustes.
 */
export function DarkModeButton({ variante = 'papel', className }: DarkModeButtonProps) {
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
                encendida
                    ? 'text-mango-texto'
                    : variante === 'panel'
                      ? 'text-panel-ink/65 hover:text-panel-ink'
                      : variante === 'fondo'
                        ? 'text-fondo-tinta/65 hover:text-fondo-tinta'
                        : 'text-tinta-2 hover:text-tinta',
                className,
            )}
        >
            <span
                aria-hidden
                className={cn(
                    'bg-mango absolute inset-2 rounded-full blur-md transition-opacity duration-150',
                    encendida ? 'opacity-35' : 'opacity-0',
                )}
            />
            <ManoIcon nombre="lampara" className="relative h-5 w-5" fill={encendida ? 'currentColor' : 'none'} fillOpacity={encendida ? 0.3 : 0} />
        </button>
    );
}
