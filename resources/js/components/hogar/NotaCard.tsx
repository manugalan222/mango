import { MiembroAvatar } from '@/components/compartidos/MiembroAvatar';
import { AnotadorCard, TONO_DE_MIEMBRO } from '@/components/papel/AnotadorCard';
import { type Conviviente } from '@/lib/muestra';

/**
 * Una nota adhesiva del color de quien la escribió: se sabe de quién es antes
 * de leer la firma. Sobre el pastel, sólo texto neutro.
 */
export function NotaCard({ texto, cuando, autor, giro }: { texto: string; cuando: string; autor: Conviviente; giro: number }) {
    return (
        <AnotadorCard tono={TONO_DE_MIEMBRO[autor.color]} giro={giro} className="min-h-40">
            <p className="font-display flex-1 text-lg leading-snug font-semibold tracking-[-0.01em]">{texto}</p>
            <footer className="flex items-center gap-2 text-sm">
                <MiembroAvatar nombre={autor.nombre} color={autor.color} mini />
                <span className="font-bold">{autor.nombre}</span>
                <span className="text-tinta-2 ml-auto">{cuando}</span>
            </footer>
        </AnotadorCard>
    );
}
