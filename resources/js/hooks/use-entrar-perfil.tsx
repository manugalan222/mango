import { type Perfil } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

/**
 * Entrar como un perfil desde "¿Quién anda por casa?". Sin PIN, elegir ya
 * entra. Con PIN, `elegir` deja el perfil `pidiendo` para que la página abra
 * el pedido, y `entrar` lo manda al servidor, que es el único que puede
 * chequearlo (el hash no viaja al frontend).
 */
export function useEntrarPerfil() {
    const [pidiendo, setPidiendo] = useState<Perfil | null>(null);
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({ pin: '' });

    const cerrar = () => {
        setPidiendo(null);
        clearErrors();
        reset();
    };

    const elegir = (perfil: Perfil) => {
        if (perfil.tiene_pin) {
            clearErrors();
            reset();
            setPidiendo(perfil);
            return;
        }

        post(route('perfiles.entrar', perfil.id));
    };

    const entrar: FormEventHandler = (e) => {
        e.preventDefault();
        if (!pidiendo) return;

        post(route('perfiles.entrar', pidiendo.id), {
            onError: () => setData('pin', ''),
        });
    };

    return { data, setData, processing, errors, pidiendo, elegir, entrar, cerrar };
}
