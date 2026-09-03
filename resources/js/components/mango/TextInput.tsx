import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { TriangleAlert } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';

/**
 * TextInput de formulario.
 *
 * El label va siempre visible arriba, nunca sólo de placeholder: el placeholder
 * desaparece al escribir y la persona pierde la referencia justo cuando la
 * necesita. El error va debajo del campo, no en un resumen arriba, y dice qué
 * pasó — nunca "Ups".
 */
export function TextInput({
    id,
    label,
    error,
    ayuda,
    accion,
    className,
    ...props
}: ComponentProps<'input'> & {
    id: string;
    label: string;
    error?: string;
    ayuda?: string;
    accion?: ReactNode;
}) {
    const idAyuda = ayuda ? `${id}-ayuda` : undefined;
    const idError = error ? `${id}-error` : undefined;
    const descrito = [idAyuda, idError].filter(Boolean).join(' ') || undefined;

    return (
        <div className="grid gap-1.5">
            <div className="flex items-baseline gap-2">
                <Label htmlFor={id}>{label}</Label>
                {accion && <span className="ml-auto text-sm">{accion}</span>}
            </div>

            <Input id={id} aria-invalid={error ? true : undefined} aria-describedby={descrito} className={cn(className)} {...props} />

            {ayuda && (
                <p id={idAyuda} className="text-tinta-2 text-xs">
                    {ayuda}
                </p>
            )}

            {error && (
                <p id={idError} role="alert" className="text-mango-texto flex items-start gap-1.5 text-sm font-semibold">
                    <TriangleAlert aria-hidden className="mt-px size-4 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}
