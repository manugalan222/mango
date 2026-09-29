import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { EnviarButton } from '@/components/formulario/EnviarButton';
import { TextInput } from '@/components/formulario/TextInput';
import { PuertaLayout } from '@/layouts/PuertaLayout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const enviar: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <PuertaLayout titulo="Elegí una contraseña nueva" descripcion="Es la que van a usar todos los que viven en la casa.">
            <Head title="Contraseña nueva" />

            <form className="flex flex-col gap-5" onSubmit={enviar}>
                <TextInput id="email" label="Correo de la casa" type="email" autoComplete="email" value={data.email} readOnly error={errors.email} />

                <TextInput
                    id="password"
                    label="Contraseña nueva"
                    type="password"
                    required
                    autoFocus
                    autoComplete="new-password"
                    ayuda="Al menos 8 caracteres."
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    disabled={processing}
                />

                <TextInput
                    id="password_confirmation"
                    label="Repetí la contraseña"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    disabled={processing}
                />

                <EnviarButton procesando={processing} textoProcesando="Guardando" className="w-full">
                    Guardar la contraseña
                </EnviarButton>
            </form>
        </PuertaLayout>
    );
}
