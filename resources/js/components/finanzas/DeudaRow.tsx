import { MiembroAvatar, type ColorMiembro } from '@/components/compartidos/MiembroAvatar';
import { PlataText } from '@/components/compartidos/PlataText';

/**
 * Deuda entre convivientes. Fondo mango suave porque es lo único de la pantalla
 * que espera una acción de otra persona, no tuya.
 */
export function DeudaRow({ texto, monto, quien, color }: { texto: string; monto: number; quien: string; color: ColorMiembro }) {
    return (
        <li className="bg-mango-suave flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm">
            <MiembroAvatar nombre={quien} color={color} mini />
            <span>{texto}</span>
            <PlataText monto={monto} className="ml-auto" />
        </li>
    );
}
