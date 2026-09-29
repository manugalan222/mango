import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { EnviarButton } from '@/components/formulario/EnviarButton';
import { TextInput } from '@/components/formulario/TextInput';
import { PuertaLayout } from '@/layouts/PuertaLayout';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const enviar: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'), { onFinish: () => reset('password') });
    };

    return (
        <PuertaLayout titulo="Confirmá la contraseña" descripcion="Esta parte de la casa pide la contraseña otra vez antes de seguir.">
            <Head title="Confirmar la contraseña" />

            <form className="flex flex-col gap-5" onSubmit={enviar}>
                <TextInput
                    id="password"
                    label="Contraseña"
                    type="password"
                    required
                    autoFocus
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    disabled={processing}
                />

                <EnviarButton procesando={processing} textoProcesando="Confirmando" className="w-full">
                    Confirmar
                </EnviarButton>
            </form>
        </PuertaLayout>
    );
}
