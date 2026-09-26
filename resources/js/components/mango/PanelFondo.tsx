import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

/**
 * El verde de la casa como fondo: `mat-panel-liso` —fibra, grano y la luz de
 * la repisa arriba a la izquierda—. Es la misma receta en la puerta de auth y
 * en el escritorio donde se apoya el cuaderno de Finanzas y Hogar; por eso es
 * un componente y no una clase copiada en cada layout.
 *
 * Todo texto suelto encima va en `text-panel-ink`: `--tinta` sobre este verde
 * no llega a contraste en modo claro. Lo que va sobre papel ya trae su color.
 */
export function PanelFondo({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('mat-panel-liso', className)} {...props} />;
}
