import { HojaBoard } from '@/components/mango/HojaBoard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';

export interface Pestana {
    valor: string;
    titulo: string;
    contenido: ReactNode;
}

function leerValorDeUrl(param: string): string | null {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get(param);
}

/**
 * La `HojaBoard` de una sección con sus marcadores: las subsecciones de lo que la
 * barra superior eligió (Finanzas → Gastos, Deudas, Ahorros). Cambiar de
 * sección es trabajo de la barra; acá sólo se hojea dentro de la misma.
 *
 * Los marcadores están montados en el borde de la hoja: los inactivos quedan
 * metidos detrás —el contorno de la hoja les pasa por encima— y asoman un
 * poco al pasar el mouse. El activo sale por delante con el mismo papel que
 * la hoja y le tapa el contorno: hoja y marcador son un solo objeto, no una
 * barra pegada arriba. La marca de selección es la franja mango del borde
 * —mango es seleccionado; verde sería completado—.
 *
 * Sincroniza con `?tab=` para que la pestaña abierta se pueda compartir o
 * recargar sin perderse.
 */
export function SeccionTabs({
    titulo,
    descripcion,
    pestanas,
    paramNombre = 'tab',
    className,
}: {
    titulo: string;
    descripcion?: string;
    pestanas: Pestana[];
    paramNombre?: string;
    className?: string;
}) {
    const porDefecto = pestanas[0]?.valor ?? '';
    const [activa, setActiva] = useState(() => {
        const desdeUrl = leerValorDeUrl(paramNombre);
        return desdeUrl && pestanas.some((p) => p.valor === desdeUrl) ? desdeUrl : porDefecto;
    });

    const cambiar = (valor: string) => {
        setActiva(valor);
        const url = new URL(window.location.href);
        url.searchParams.set(paramNombre, valor);
        window.history.replaceState(window.history.state, '', url);
    };

    return (
        <Tabs value={activa} onValueChange={cambiar} className={cn('flex flex-1 flex-col', className)}>
            <TabsList
                aria-label={`Secciones de ${titulo}`}
                className="flex h-auto items-end justify-start gap-1 self-start rounded-none bg-transparent p-0 pl-5"
            >
                {pestanas.map((p) => (
                    <TabsTrigger
                        key={p.valor}
                        value={p.valor}
                        className={cn(
                            // `rounded-b-none` explícito: el `TabsTrigger` de shadcn trae `rounded-sm`
                            // y `rounded-t-lg` sólo pisa las esquinas de arriba; sin esto las de abajo
                            // se redondean justo donde el marcador se funde con la hoja.
                            'border-tinta relative -mb-[2.5px] min-h-11 rounded-t-lg rounded-b-none border-[2.5px] border-b-0 px-4 pt-1 text-[0.78rem] font-bold tracking-[0.03em] uppercase',
                            'bg-muted text-tinta-2 z-0 translate-y-1 shadow-none transition-[transform,background-color,color] duration-150 ease-out',
                            'hover:text-tinta hover:translate-y-0',
                            'data-[state=active]:bg-lino data-[state=active]:text-tinta data-[state=active]:z-20 data-[state=active]:translate-y-0 data-[state=active]:shadow-[inset_0_4px_0_0_var(--mango)]',
                            'focus-visible:ring-ring focus-visible:ring-offset-panel focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
                        )}
                    >
                        {p.titulo}
                    </TabsTrigger>
                ))}
            </TabsList>

            <HojaBoard titulo={titulo} descripcion={descripcion} className="z-10">
                {pestanas.map((p) => (
                    <TabsContent key={p.valor} value={p.valor} className="hoja-entra focus-visible:ring-offset-lino mt-0 rounded-lg">
                        {p.contenido}
                    </TabsContent>
                ))}
            </HojaBoard>
        </Tabs>
    );
}
