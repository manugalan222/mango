import { cn } from '@/lib/utils';

/**
 * Logotipo: la palabra con la O reemplazada por un mango cuyo contrapunzón es
 * una hoja. Se dibuja, no se setea con la fuente del sistema, para que el logo
 * no cambie si mañana cambiamos de tipografía.
 */
export function MangoLogo({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                'font-display text-foreground inline-flex items-baseline text-2xl leading-none font-extrabold tracking-[-0.055em]',
                className,
            )}
        >
            MANG
            <svg viewBox="0 0 100 100" aria-hidden="true" className="mx-[-0.012em] mb-[-0.022em] block size-[0.8em]">
                <path
                    fillRule="evenodd"
                    d="M50 4a46 46 0 1 0 0 92a46 46 0 1 0 0-92ZM22 78C22 44 44 22 78 22 78 56 56 78 22 78Z"
                    fill="var(--mango)"
                />
            </svg>
            <span className="sr-only">O</span>
        </span>
    );
}
