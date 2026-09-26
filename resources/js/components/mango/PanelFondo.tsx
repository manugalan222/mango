import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

/**
 * El fondo texturado de la casa —luz, grano y fibra, fijo al viewport—. Es
 * un componente y no una clase copiada en cada layout para que cambiarlo sea
 * tocar un solo lugar.
 *
 * - `casa` (por defecto, `.mat-fondo`): sigue al modo. Yeso con la luz de la
 *   ventana de día, verde con la lámpara de noche. Toda la app y la selección
 *   de perfil. Texto suelto encima: `text-fondo-tinta`.
 * - `puerta` (`.mat-panel-liso`): verde en los dos modos. Sólo auth: es el
 *   momento de marca, con el slogan. Texto suelto encima: `text-panel-ink`.
 */
export function PanelFondo({ tono = 'casa', className, ...props }: { tono?: 'casa' | 'puerta' } & ComponentProps<'div'>) {
    return <div className={cn(tono === 'puerta' ? 'mat-panel-liso' : 'mat-fondo', className)} {...props} />;
}
