import { type ColorMiembro } from '@/components/mango/MiembroAvatar';
import { type Perfil } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const FORM_VACIO = {
    nombre: '',
    color: '' as ColorMiembro | '',
    pin: '',
};

/**
 * CRUD de perfiles de la casa. Un mismo formulario sirve para crear y editar:
 * `editar` lo precarga con un perfil existente, `cancelar` lo vuelve a dejar
 * vacío. El PIN nunca llega del servidor (el modelo lo oculta), así que
 * editar un perfil siempre empieza con el campo en blanco — si se manda vacío,
 * el perfil queda sin PIN.
 */
export function usePerfiles({ alGuardar }: { alGuardar?: () => void } = {}) {
    const [editando, setEditando] = useState<Perfil | null>(null);
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(FORM_VACIO);

    const editar = (perfil: Perfil) => {
        setEditando(perfil);
        clearErrors();
        setData({ nombre: perfil.nombre, color: perfil.color, pin: '' });
    };

    const cancelar = () => {
        setEditando(null);
        clearErrors();
        reset();
    };

    const guardar: FormEventHandler = (e) => {
        e.preventDefault();

        const alExito = () => {
            cancelar();
            alGuardar?.();
        };

        if (editando) {
            put(route('perfiles.update', editando.id), { onSuccess: alExito });
        } else {
            post(route('perfiles.store'), { onSuccess: alExito });
        }
    };

    const eliminar = (perfil: Perfil) => {
        router.delete(route('perfiles.destroy', perfil.id), { preserveScroll: true });
    };

    return { data, setData, processing, errors, editando, editar, cancelar, guardar, eliminar };
}
