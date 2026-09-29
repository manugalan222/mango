import { ManoIcon } from '@/components/mango/ManoIcon';
import { MiembroAvatar } from '@/components/mango/MiembroAvatar';
import { EliminarPerfilDialog } from '@/components/perfiles/EliminarPerfilDialog';
import { Button } from '@/components/ui/button';
import { type Perfil } from '@/types';

interface PerfilCardProps {
    perfil: Perfil;
    entrando: boolean;
    onElegir: (perfil: Perfil) => void;
    onEditar: (perfil: Perfil) => void;
    onEliminar: (perfil: Perfil) => void;
}

/** Un conviviente en "¿Quién anda por casa?": el avatar entra; abajo, editar y eliminar. */
export function PerfilCard({ perfil, entrando, onElegir, onEditar, onEliminar }: PerfilCardProps) {
    return (
        <li className="mat-hoja rounded-placa flex w-40 flex-col items-center gap-3 p-5">
            <button
                type="button"
                onClick={() => onElegir(perfil)}
                disabled={entrando}
                aria-label={`Entrar como ${perfil.nombre}${perfil.tiene_pin ? ', pide PIN' : ''}`}
                className="rounded-hoja focus-visible:ring-ring flex flex-col items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
            >
                <MiembroAvatar nombre={perfil.nombre} color={perfil.color} className="size-20" />
                <span className="flex max-w-28 items-center gap-1 text-sm font-semibold">
                    <span className="truncate">{perfil.nombre}</span>
                    {perfil.tiene_pin && <ManoIcon nombre="candado" className="size-3.5 shrink-0" aria-hidden />}
                </span>
            </button>

            <div className="flex gap-1">
                <Button type="button" variant="ghost" size="icon" aria-label={`Editar a ${perfil.nombre}`} onClick={() => onEditar(perfil)}>
                    <ManoIcon nombre="lapiz" className="size-4" />
                </Button>

                <EliminarPerfilDialog perfil={perfil} onEliminar={onEliminar} />
            </div>
        </li>
    );
}
