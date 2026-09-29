import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { SubrayadoLink } from '@/components/compartidos/SubrayadoLink';
import { AvisoBanner } from '@/components/formulario/AvisoBanner';
import { EnviarButton } from '@/components/formulario/EnviarButton';
import { PuertaLayout } from '@/layouts/PuertaLayout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const enviar: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <PuertaLayout titulo="Verificá el correo" descripcion="Te mandamos un enlace al correo de la casa. Abrilo para terminar de entrar.">
            <Head title="Verificar el correo" />

            {status === 'verification-link-sent' && <AvisoBanner>Te mandamos un enlace nuevo al correo con el que armaste la casa.</AvisoBanner>}

            <form onSubmit={enviar} className="flex flex-col items-center gap-5">
                <EnviarButton procesando={processing} textoProcesando="Mandando" variant="pana" className="w-full">
                    Mandar el enlace de nuevo
                </EnviarButton>

                <SubrayadoLink href={route('logout')} method="post" as="button" className="text-sm">
                    Cerrar sesión
                </SubrayadoLink>
            </form>
        </PuertaLayout>
    );
}
