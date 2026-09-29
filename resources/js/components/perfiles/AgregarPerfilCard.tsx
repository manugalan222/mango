import { ManoIcon } from '@/components/marca/ManoIcon';

/** El lugar vacío al final de la fila, punteado: abre el alta de un perfil nuevo. */
export function AgregarPerfilCard({ onAgregar }: { onAgregar: () => void }) {
    return (
        <li className="rounded-placa border-fondo-tinta/35 text-fondo-tinta/75 hover:border-fondo-tinta hover:text-fondo-tinta flex w-40 flex-col items-center gap-3 border-2 border-dashed p-5 transition-colors duration-150">
            <button type="button" onClick={onAgregar} aria-label="Crear un perfil nuevo" className="flex flex-col items-center gap-2">
                <span className="rounded-hoja grid size-20 place-items-center border-2 border-dashed border-current">
                    <ManoIcon nombre="mas" className="size-8" />
                </span>
                <span className="text-sm font-semibold">Agregar perfil</span>
            </button>
        </li>
    );
}
