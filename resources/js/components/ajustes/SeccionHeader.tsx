/** El encabezado de una sección de Ajustes, debajo del título de la hoja. */
export function SeccionHeader({ titulo, descripcion }: { titulo: string; descripcion?: string }) {
    return (
        <header>
            <h2 className="mb-0.5 text-lg leading-tight">{titulo}</h2>
            {descripcion && <p className="text-tinta-2 text-sm">{descripcion}</p>}
        </header>
    );
}
