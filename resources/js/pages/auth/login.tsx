import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { SubrayadoLink } from '@/components/compartidos/SubrayadoLink';
import { AvisoBanner } from '@/components/formulario/AvisoBanner';
import { EnviarButton } from '@/components/formulario/EnviarButton';
import { TextInput } from '@/components/formulario/TextInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PuertaLayout } from '@/layouts/PuertaLayout';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    // Sin genérico explícito: `useForm` infiere el tipo del estado inicial y así
    // no hay que pelearse con la restricción de índice de FormDataType.
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const enviar: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <PuertaLayout titulo="Entrá a tu casa" descripcion="Una sola cuenta por hogar. Adentro elegís tu perfil.">
            <Head title="Entrar" />

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

                <TextInput
                    id="password"
                    label="Contraseña"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    disabled={processing}
                    accion={canResetPassword ? <SubrayadoLink href={route('password.request')}>La olvidé</SubrayadoLink> : undefined}
                />

                <div className="flex items-center gap-2.5">
                    <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onCheckedChange={(v) => setData('remember', v === true)}
                        disabled={processing}
                    />
                    <Label htmlFor="remember" className="font-normal">
                        No cerrar sesión en este dispositivo
                    </Label>
                </div>

                <EnviarButton procesando={processing} textoProcesando="Entrando" className="w-full">
                    Entrar
                </EnviarButton>
            </form>

            <p className="text-tinta-2 text-center text-sm">
                ¿Todavía no tenés casa acá? <SubrayadoLink href={route('register')}>Armá una</SubrayadoLink>
            </p>
        </PuertaLayout>
    );
}
