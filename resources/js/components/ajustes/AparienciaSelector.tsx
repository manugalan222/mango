import { ManoIcon, type NombreIcono } from '@/components/marca/ManoIcon';
import { type Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

const OPCIONES: { valor: Appearance; icono: NombreIcono; texto: string }[] = [
    { valor: 'light', icono: 'sol', texto: 'Claro' },
    { valor: 'dark', icono: 'luna', texto: 'Oscuro' },
    { valor: 'system', icono: 'pantalla', texto: 'Como el sistema' },
];

/**
 * Claro, oscuro o como el sistema. La lámpara de la barra sólo alterna entre
 * claro y oscuro; seguir al sistema se elige acá.
 */
export function AparienciaSelector() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div role="group" aria-label="Apariencia" className="bg-muted inline-flex flex-wrap gap-1 self-start rounded-lg p-1">
            {OPCIONES.map(({ valor, icono, texto }) => (
                <button
                    key={valor}
                    type="button"
                    aria-pressed={appearance === valor}
                    onClick={() => updateAppearance(valor)}
                    className={cn(
                        'focus-visible:ring-ring flex min-h-11 items-center gap-1.5 rounded-md px-3.5 text-sm font-semibold transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:outline-hidden',
                        appearance === valor ? 'bg-card text-tinta shadow-xs' : 'text-tinta-2 hover:bg-card/60 hover:text-tinta',
                    )}
                >
                    <ManoIcon nombre={icono} className="size-4" aria-hidden />
                    {texto}
                </button>
            ))}
        </div>
    );
}
