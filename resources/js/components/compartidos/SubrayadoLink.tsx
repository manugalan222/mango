import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

/** El link de texto: mango y subrayado, que se afirma al pasar el mouse. */
export function SubrayadoLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'text-mango-texto decoration-mango-texto/35 focus-visible:ring-ring font-semibold underline underline-offset-4 transition-colors duration-150 ease-out hover:decoration-current! focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
