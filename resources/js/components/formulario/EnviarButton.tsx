import { ManoIcon } from '@/components/mango/ManoIcon';
import { Button, type ButtonProps } from '@/components/ui/button';
import { ReactNode } from 'react';

/**
 * El botón que manda un formulario. Mientras `procesando`, se deshabilita, gira
 * el ícono de carga y —si se le pasa— dice lo que está pasando ("Entrando").
 */
export function EnviarButton({
    procesando,
    textoProcesando,
    children,
    disabled,
    ...props
}: ButtonProps & { procesando: boolean; textoProcesando?: ReactNode }) {
    return (
        <Button type="submit" disabled={procesando || disabled} {...props}>
            {procesando && <ManoIcon nombre="cargando" className="animate-spin" aria-hidden />}
            {procesando && textoProcesando ? textoProcesando : children}
        </Button>
    );
}
