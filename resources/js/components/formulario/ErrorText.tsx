import { ManoIcon } from '@/components/marca/ManoIcon';
import { cn } from '@/lib/utils';

/**
 * El error de un campo: debajo del campo, con ícono y `role="alert"`. Dice qué
 * pasó y cómo arreglarlo — nunca "Ups". El `id` es para que el campo lo enlace
 * con `aria-describedby`.
 */
export function ErrorText({ id, mensaje, className }: { id?: string; mensaje?: string; className?: string }) {
    if (!mensaje) return null;

    return (
        <p id={id} role="alert" className={cn('text-mango-texto flex items-start gap-1.5 text-sm font-semibold', className)}>
            <ManoIcon nombre="alerta" className="mt-px size-4 shrink-0" aria-hidden />
            {mensaje}
        </p>
    );
}
