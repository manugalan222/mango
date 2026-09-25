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
 * El board con pestañas: subsecciones dentro de una misma vista, como
 * Finanzas (Gastos, Deudas, Ahorros). La activa toma mango de relleno —
 * selección—, nunca verde: verde es completado, mango es seleccionado, y acá
 * no se mezclan. Sincroniza con `?tab=` para que la pestaña abierta se pueda
 * compartir o recargar sin perderse.
 */
export function SeccionTabs({ pestanas, paramNombre = 'tab', className }: { pestanas: Pestana[]; paramNombre?: string; className?: string }) {
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
        <Tabs value={activa} onValueChange={cambiar} className={cn('flex flex-col gap-4', className)}>
            <TabsList className="bg-muted h-auto w-fit flex-wrap gap-1 rounded-lg p-1">
                {pestanas.map((p) => (
                    <TabsTrigger
                        key={p.valor}
                        value={p.valor}
                        className={cn(
                            'text-tinta-2 hover:text-tinta min-h-9 rounded-lg px-4 py-2 text-[0.8rem] font-bold tracking-[0.03em] uppercase',
                            'transition-colors duration-150 ease-out',
                            'data-[state=active]:bg-mango-boton data-[state=active]:text-on-mango',
                            'data-[state=active]:shadow-[inset_0_1px_1px_rgb(255_255_255/0.25),inset_0_-3px_5px_-3px_rgb(0_0_0/0.25)]',
                            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
                        )}
                    >
                        {p.titulo}
                    </TabsTrigger>
                ))}
            </TabsList>

            {pestanas.map((p) => (
                <TabsContent key={p.valor} value={p.valor} className="mt-0 focus-visible:outline-hidden">
                    {p.contenido}
                </TabsContent>
            ))}
        </Tabs>
    );
}
