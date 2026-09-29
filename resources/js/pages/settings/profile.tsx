import { EliminarCasaDialog } from '@/components/ajustes/EliminarCasaDialog';
import { SeccionHeader } from '@/components/ajustes/SeccionHeader';
import { SubrayadoLink } from '@/components/compartidos/SubrayadoLink';
import { AvisoBanner } from '@/components/formulario/AvisoBanner';
import { EnviarButton } from '@/components/formulario/EnviarButton';
import { GuardadoText } from '@/components/formulario/GuardadoText';
import { TextInput } from '@/components/formulario/TextInput';
import { AjustesLayout } from '@/layouts/AjustesLayout';
import { CasaLayout } from '@/layouts/CasaLayout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, type ReactNode } from 'react';

const migas: BreadcrumbItem[] = [{ title: 'Ajustes de la casa', href: '/settings/profile' }];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const guardar: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <>
            <Head title="Ajustes de la casa" />

            <div className="flex flex-col gap-6">
                <SeccionHeader titulo="La casa" descripcion="El nombre del hogar y el correo con el que entran todos." />

                <form onSubmit={guardar} className="flex flex-col gap-5">
                    <TextInput
                        id="name"
                        label="Cómo se llama la casa"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        error={errors.name}
                    />

                    <TextInput
                        id="email"
                        label="Correo de la casa"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                        error={errors.email}
                    />

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div className="flex flex-col gap-2">
                            <p className="text-tinta-2 text-sm">
                                El correo todavía no está verificado.{' '}
                                <SubrayadoLink href={route('verification.send')} method="post" as="button">
                                    Mandar el enlace de nuevo
                                </SubrayadoLink>
                            </p>

                            {status === 'verification-link-sent' && <AvisoBanner>Te mandamos un enlace nuevo al correo de la casa.</AvisoBanner>}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <EnviarButton procesando={processing} textoProcesando="Guardando">
                            Guardar
                        </EnviarButton>
                        <GuardadoText visible={recentlySuccessful} />
                    </div>
                </form>
            </div>

            <EliminarCasaDialog />
        </>
    );
}

Profile.layout = (page: ReactNode) => (
    <CasaLayout migas={migas}>
        <AjustesLayout>{page}</AjustesLayout>
    </CasaLayout>
);
