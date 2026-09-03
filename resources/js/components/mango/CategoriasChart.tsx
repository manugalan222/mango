import { formatearPesos } from './PlataText';

export type Categoria = { nombre: string; monto: number; color: string };

/**
 * Barras por categoría con etiqueta directa en cada una: nadie tiene que cruzar
 * una leyenda para leer un gasto, y el color deja de ser el único portador del
 * significado.
 */
export function CategoriasChart({ categorias }: { categorias: Categoria[] }) {
    const mayor = Math.max(...categorias.map((c) => c.monto), 1);

    return (
        <ul className="flex flex-col gap-2.5">
            {categorias.map((c) => (
                <li key={c.nombre} className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-1 text-sm">
                    <span className="text-tinta-2">{c.nombre}</span>
                    <span data-money className="font-semibold tabular-nums">
                        {formatearPesos(c.monto)}
                    </span>
                    <span className="bg-border col-span-2 block h-2 overflow-hidden rounded-full">
                        <span className="block h-full rounded-full" style={{ width: `${(c.monto / mayor) * 100}%`, backgroundColor: c.color }} />
                    </span>
                </li>
            ))}
        </ul>
    );
}
