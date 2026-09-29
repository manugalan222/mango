import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { SubrayadoLink } from '@/components/compartidos/SubrayadoLink';
import { AvisoBanner } from '@/components/formulario/AvisoBanner';
import { EnviarButton } from '@/components/formulario/EnviarButton';
import { TextInput } from '@/components/formulario/TextInput';
import { PuertaLayout } from '@/layouts/PuertaLayout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const enviar: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <PuertaLayout titulo="¿Te olvidaste la contraseña?" descripcion="Escribí el correo de la casa y te mandamos un enlace para elegir una nueva.">
            <Head title="Recuperar la contraseña" />

            {status && <AvisoBanner>{status}</AvisoBanner>}

            <form className="flex flex-col gap-5" onSubmit={enviar}>
                <TextInput
                    id="email"
                    label="Correo de la casa"
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    placeholder="vos@ejemplo.com"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    disabled={processing}
                />

                <EnviarButton procesando={processing} textoProcesando="Mandando el enlace" className="w-full">
                    Mandame el enlace
                </EnviarButton>
            </form>

            <p className="text-tinta-2 text-center text-sm">
                ¿Te acordaste? <SubrayadoLink href={route('login')}>Entrá</SubrayadoLink>
            </p>
        </PuertaLayout>
    );
}
