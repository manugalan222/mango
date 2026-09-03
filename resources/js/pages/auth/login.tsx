import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { TextInput } from '@/components/mango/TextInput';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

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
        <AuthLayout title="Entrá a tu casa" description="Una sola cuenta por hogar. Adentro elegís tu perfil.">
            <Head title="Entrar" />

            {status && (
                <p role="status" className="bg-ok-bg text-ok-ink rounded-lg px-3 py-2.5 text-sm font-semibold">
                    {status}
                </p>
            )}

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
                    accion={canResetPassword ? <TextLink href={route('password.request')}>La olvidé</TextLink> : undefined}
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

                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle aria-hidden className="animate-spin" />}
                    {processing ? 'Entrando' : 'Entrar'}
                </Button>
            </form>

            <p className="text-tinta-2 text-center text-sm">
                ¿Todavía no tenés casa acá? <TextLink href={route('register')}>Armá una</TextLink>
            </p>
        </AuthLayout>
    );
}
