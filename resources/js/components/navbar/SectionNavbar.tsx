import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CSSProperties } from 'react';

/**
 * Los tres destinos de la casa. El límite no es estético: una barra
 * sobrecargada obliga a leerla cada vez en lugar de apuntar de memoria.
 *
 * Sin íconos: son tres nombres de una palabra que nadie reconoce antes por el
 * dibujo que por el texto, y el subrayado es el único adorno de la barra.
 */
const navPrincipal: NavItem[] = [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Finanzas', url: '/finanzas' },
    { title: 'Hogar', url: '/hogar' },
];

/**
 * Un zigzag distinto por destino —no la misma línea repetida tres veces—
 * para que se sienta un trazo de verdad y no un asset reciclado. Las esquinas
 * están redondeadas (cada vértice es el control de una curva entre los puntos
 * medios de sus tramos), y cada uno tiene sus keyframes `trazo-*` en
 * `app.css`, medidos sobre este mismo path: si se cambia uno, hay que volver
 * a medir sus paradas.
 */
const TRAZOS: Record<string, { d: string; animacion: string }> = {
    Dashboard: {
        d: 'M3,9 L16.5,6 Q30,3 22,7 Q14,11 31,6.5 Q48,2 37,6 Q26,10 45,7 Q64,4 53,8 Q42,12 61,7.5 Q80,3 69,6.5 Q58,10 77.5,7.5 L97,5',
        animacion: 'trazo-dashboard',
    },
    Finanzas: {
        d: 'M2,5 L14,8 Q26,11 18,6.5 Q10,2 28,6 Q46,10 35,6.5 Q24,3 45,7 Q66,11 53,7.5 Q40,4 61,7 Q82,10 71,6.5 Q60,3 79,5.5 L98,8',
        animacion: 'trazo-finanzas',
    },
    Hogar: {
        d: 'M2,11 L13,6.5 Q24,2 16,5.5 Q8,9 26,6 Q44,3 32,7 Q20,11 41,6.5 Q62,2 49,6 Q36,10 57,6.5 Q78,3 66,7 Q54,11 75,7.5 L96,4',
        animacion: 'trazo-hogar',
    },
};

export function SectionNavbar() {
    const page = usePage();

    return (
        <nav aria-label="Secciones de la casa" className="ml-8 flex min-w-0 flex-1 items-center gap-3 overflow-x-auto md:ml-12">
            {navPrincipal.map((item) => {
                const activo = page.url === item.url || page.url.startsWith(`${item.url}?`);
                const trazo = TRAZOS[item.title];

                return (
                    <Link
                        key={item.title}
                        href={item.url}
                        prefetch
                        data-active={activo}
                        aria-current={activo ? 'page' : undefined}
                        className="focus-visible:ring-ring focus-visible:ring-offset-fondo text-fondo-tinta/75 hover:text-fondo-tinta data-[active=true]:text-fondo-tinta font-display relative flex shrink-0 items-center rounded-lg px-3 pt-[10px] pb-[14px] text-[0.95rem] font-bold tracking-[-0.015em] transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden data-[active=true]:font-extrabold"
                    >
                        {item.title}
                        <svg className="subrayado" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden>
                            <path pathLength="1" d={trazo.d} style={{ '--trazo': trazo.animacion } as CSSProperties} />
                        </svg>
                    </Link>
                );
            })}
        </nav>
    );
}
