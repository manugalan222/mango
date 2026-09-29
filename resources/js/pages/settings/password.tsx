import { SeccionHeader } from '@/components/ajustes/SeccionHeader';
import { EnviarButton } from '@/components/formulario/EnviarButton';
import { GuardadoText } from '@/components/formulario/GuardadoText';
import { TextInput } from '@/components/formulario/TextInput';
import { AjustesLayout } from '@/layouts/AjustesLayout';
import { CasaLayout } from '@/layouts/CasaLayout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, type ReactNode } from 'react';

const migas: BreadcrumbItem[] = [{ title: 'Contraseña de la casa', href: '/settings/password' }];

export default function Password() {
    const inputNueva = useRef<HTMLInputElement>(null);
    const inputActual = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const guardar: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    inputNueva.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    inputActual.current?.focus();
                }
            },
        });
    };

    return (
        <>
            <Head title="Contraseña de la casa" />

            <div className="flex flex-col gap-6">
                <SeccionHeader titulo="Contraseña" descripcion="La comparten todos los que viven en la casa. Mejor larga y difícil de adivinar." />

                <form onSubmit={guardar} className="flex flex-col gap-5">
                    <TextInput
                        id="current_password"
                        label="Contraseña actual"
                        type="password"
                        ref={inputActual}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        error={errors.current_password}
                    />

                    <TextInput
                        id="password"
                        label="Contraseña nueva"
                        type="password"
                        ref={inputNueva}
                        ayuda="Al menos 8 caracteres."
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        error={errors.password}
                    />

                    <TextInput
                        id="password_confirmation"
                        label="Repetí la contraseña nueva"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        error={errors.password_confirmation}
                    />

                    <div className="flex items-center gap-4">
                        <EnviarButton procesando={processing} textoProcesando="Guardando">
                            Guardar la contraseña
                        </EnviarButton>
                        <GuardadoText visible={recentlySuccessful} />
                    </div>
                </form>
            </div>
        </>
    );
}

Password.layout = (page: ReactNode) => (
    <CasaLayout migas={migas}>
        <AjustesLayout>{page}</AjustesLayout>
    </CasaLayout>
);
